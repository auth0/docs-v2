import json, ijson
import os
from pathlib import Path
import frontmatter
from bs4 import BeautifulSoup
import argparse
import re

# Tenta importar o mapa de um arquivo separado. Se não existir, usa um mapa vazio.
try:
    from map import URL_CORRECTION_MAP
except ImportError:
    print("Aviso: Arquivo 'map.py' não encontrado. Usando um mapa de correção vazio.")
    URL_CORRECTION_MAP = {}

# --- CONFIGURAÇÕES ---
TRANSLATIONS_FILE = 'mapeamento_paginas_corrigido.json'
SOURCE_DIR = 'docs'
TARGET_LANGUAGES = {'fr': 'fr-ca', 'ja': 'ja-jp'}
CANONICAL_LOCALE = 'en-US'

# --- CLASSES AUXILIARES (Completas) ---

class PathResolver:
    """Constrói e armazena em cache os caminhos de URL das entradas."""
    def __init__(self, all_entries):
        self.all_entries = all_entries
        self.cache = {}

    def get_path(self, entry_id):
        if entry_id in self.cache: return self.cache[entry_id]
        if entry_id not in self.all_entries: return f"/not-found/{entry_id}"
        
        entry = self.all_entries[entry_id]
        fields = entry.get('fields', {})
        
        slug_obj = fields.get('urlSlug', {})
        slug = slug_obj.get(CANONICAL_LOCALE) if isinstance(slug_obj, dict) else (slug_obj or entry_id)
        
        parent_field = fields.get('parent', {}).get(CANONICAL_LOCALE)
        if parent_field and parent_field.get('sys', {}).get('id'):
            parent_id = parent_field['sys']['id']
            path = f"{self.get_path(parent_id).rstrip('/')}/{slug}"
        else:
            path = f"/{slug}"
            
        self.cache[entry_id] = path
        return path

# --- LÓGICA PRINCIPAL ---

def get_url_key_from_path(filepath, source_dir):
    """Converte um caminho de arquivo em uma chave de URL formatada."""
    relative_path = filepath.relative_to(source_dir)
    url_key = '/' + str(relative_path.with_suffix('')).replace(os.path.sep, '/')
    if url_key.endswith('/index'):
        url_key = url_key[:-5] or '/'
    return url_key

def translate_article_page(post, page_translations, lang_code):
    """Trata páginas 'article' com substituição de conteúdo simples."""
    translated_content = page_translations.get('content', {}).get(lang_code)
    if translated_content:
        post.content = translated_content
    return post

def translate_navigation_item_page(post, nav_item_entry, lang_code, all_entries, path_resolver):
    """
    Usa o MDX original como template e traduz as peças internas, como
    o parágrafo de introdução e o conteúdo da tabela.
    """
    working_content = post.content
    
    lang_full_code_map = {'fr': 'fr-CA', 'ja': 'ja-JP', 'en': 'en-US'}
    lang_full_code = lang_full_code_map.get(lang_code, CANONICAL_LOCALE)
    
    translated_intro = nav_item_entry.get('fields', {}).get('description', {}).get(lang_full_code)
    if not translated_intro:
        translated_intro = nav_item_entry.get('fields', {}).get('description', {}).get(CANONICAL_LOCALE, '')
    
    if translated_intro:
        first_paragraph_match = re.search(r"^(?!<|#|\*|-|\s>|---)(.*)", working_content, re.MULTILINE)
        if first_paragraph_match:
            original_intro = first_paragraph_match.group(1).strip()
            if original_intro: # Evita substituir linhas vazias
                working_content = working_content.replace(original_intro, translated_intro.strip())

    soup = BeautifulSoup(working_content, 'lxml')
    table = soup.find('table')
    if not table:
        post.content = working_content
        return post

    topic_list = nav_item_entry.get('fields', {}).get('topicList', {}).get(CANONICAL_LOCALE, [])
    table_rows = table.find_all('tr')
    
    for i, row in enumerate(table_rows[1:]):
        if i >= len(topic_list): break
            
        linked_entry_id = topic_list[i].get('sys', {}).get('id')
        if not linked_entry_id or linked_entry_id not in all_entries: continue
            
        linked_entry = all_entries[linked_entry_id]
        
        linked_title_obj = linked_entry.get('fields', {}).get('title', {})
        linked_desc_obj = linked_entry.get('fields', {}).get('description', {})
        
        translated_link_title = linked_title_obj.get(lang_full_code, linked_title_obj.get(CANONICAL_LOCALE, ''))
        translated_link_desc = linked_desc_obj.get(lang_full_code, linked_desc_obj.get(CANONICAL_LOCALE, ''))
        translated_link_url = path_resolver.get_path(linked_entry_id)

        cells = row.find_all('td')
        if len(cells) == 2:
            link_tag = cells[0].find('a')
            if link_tag and translated_link_title:
                link_tag.string = translated_link_title
                link_tag['href'] = translated_link_url
            
            if translated_link_desc:
                cells[1].string = translated_link_desc

    if soup.body:
        post.content = soup.body.decode_contents(formatter=None)
    else:
        post.content = str(soup)
        
    return post

def main(debug_file=None):
    print("Iniciando tradução avançada...")
    
    try:
        with open(TRANSLATIONS_FILE, 'r', encoding='utf-8') as f:
            translations_data = json.load(f)
        print(f"'{TRANSLATIONS_FILE}' carregado com sucesso.")
    except FileNotFoundError:
        print(f"ERRO: '{TRANSLATIONS_FILE}' não encontrado!")
        return

    all_entries_map = {}
    print("Mapeando todas as entradas do export.json...")
    try:
        with open('export.json', 'rb') as f:
            for entry in ijson.items(f, 'entries.item'):
                if entry.get('sys', {}).get('id'):
                    all_entries_map[entry['sys']['id']] = entry
        print("Mapeamento de entradas concluído.")
    except FileNotFoundError:
        print("\nERRO CRÍTICO: O arquivo 'export.json' não foi encontrado na raiz do projeto.")
        print("Por favor, coloque o export gigante do Contentful nesta pasta e tente novamente.")
        return

    path_resolver = PathResolver(all_entries_map)
    source_path = Path(SOURCE_DIR)
    
    files_to_process = [Path(debug_file)] if debug_file else list(source_path.rglob('*.mdx'))
    
    if debug_file:
         print(f"\n--- MODO DE DEPURAÇÃO ATIVADO PARA: {debug_file} ---")
    else:
        print(f"\nEncontrados {len(files_to_process)} arquivos .mdx para processar.")

    processed_count = 0
    skipped_count = 0

    for english_path in files_to_process:
        if any(part in TARGET_LANGUAGES.values() for part in english_path.parts):
            continue
            
        url_key = get_url_key_from_path(english_path, source_path)
        corrected_url_key = URL_CORRECTION_MAP.get(url_key, url_key)
        
        page_translations = translations_data.get(corrected_url_key)
        
        entry_id_from_url = next((eid for eid, data in all_entries_map.items() if path_resolver.get_path(eid) == corrected_url_key), None)
        
        if not page_translations or not entry_id_from_url:
            skipped_count += 1
            continue
            
        entry_data = all_entries_map[entry_id_from_url]
        content_type = entry_data.get('sys',{}).get('contentType',{}).get('sys',{}).get('id')

        print(f"\n🔄 Processando '{english_path}' (URL: {corrected_url_key}, Tipo: {content_type})")
        processed_count += 1
        
        try:
            post = frontmatter.load(english_path)
            original_content = post.content
            original_metadata = post.metadata.copy()
        except Exception as e:
            print(f"   - ❌ Erro ao ler o arquivo: {e}")
            skipped_count += 1
            continue

        for lang_code, target_dir in TARGET_LANGUAGES.items():
            post.content = original_content
            post.metadata = original_metadata.copy()

            if content_type == 'navigationItem':
                final_post = translate_navigation_item_page(post, entry_data, lang_code, all_entries_map, path_resolver)
            else:
                final_post = translate_article_page(post, page_translations, lang_code)
            
            translated_title = page_translations.get('title', {}).get(lang_code)
            if translated_title:
                final_post.metadata['title'] = translated_title
                if 'sidebarTitle' in final_post.metadata: final_post.metadata['sidebarTitle'] = translated_title
                if 'og:title' in final_post.metadata: final_post.metadata['og:title'] = translated_title
                if 'twitter:title' in final_post.metadata: final_post.metadata['twitter:title'] = translated_title

            try:
                final_mdx_output = frontmatter.dumps(final_post, handler=frontmatter.YAMLHandler())
            except Exception as e:
                print(f"   - ❌ Erro ao formatar o conteúdo para '{lang_code}': {e}")
                continue

            if debug_file:
                print("\n" + "-"*15 + f" [DEBUG] OUTPUT PARA '{lang_code}' " + "-"*15)
                print(final_mdx_output)
            else:
                translated_path = source_path / target_dir / english_path.relative_to(source_path)
                translated_path.parent.mkdir(parents=True, exist_ok=True)
                with open(translated_path, 'w', encoding='utf-8') as f:
                    f.write(final_mdx_output)
                print(f"   - ✅ Salvo em: '{translated_path}'")

    if not debug_file:
        print("\n--- Processo Concluído ---")
        print(f"📄 Arquivos Processados: {processed_count}")
        print(f"⏭️ Arquivos Ignorados (URL não encontrada): {len(files_to_process) - processed_count}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Traduz arquivos MDX usando um JSON de mapeamento.")
    parser.add_argument('--debug', help="Caminho para um único arquivo .mdx para depurar.", type=str)
    args = parser.parse_args()
    main(debug_file=args.debug)