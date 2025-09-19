import json
import os
from pathlib import Path
import frontmatter
import argparse
import re

# Tenta importar o mapa de um arquivo separado.
try:
    from map import URL_CORRECTION_MAP
except ImportError:
    print("Aviso: Arquivo 'map.py' não encontrado. Usando um mapa de correção vazio.")
    URL_CORRECTION_MAP = {}

# --- CONFIGURAÇÕES ---
TRANSLATIONS_FILE = 'mapeamento_paginas_corrigido.json'
SOURCE_DIR = 'docs'
TARGET_LANGUAGES = {'fr': 'fr-ca', 'ja': 'ja-jp'}

def get_url_key_from_path(filepath, source_dir):
    """Converte um caminho de arquivo em uma chave de URL formatada."""
    relative_path = filepath.relative_to(source_dir)
    url_key = '/' + str(relative_path.with_suffix('')).replace(os.path.sep, '/')
    if url_key.endswith('/index'):
        url_key = url_key[:-5] or '/'
    return url_key

def extract_text_snippets(markdown_content):
    """Extrai uma lista ordenada de todos os trechos de texto traduzíveis."""
    if not markdown_content: return []
    # Remove blocos de código e URLs para não extrair texto deles
    content_no_code = re.sub(r'```.*?```', '', markdown_content, flags=re.DOTALL)
    content_no_urls = re.sub(r'https?://[^\s)]+', '', content_no_code)

    # Padrão aprimorado para capturar texto de forma mais eficaz
    pattern = re.compile(
        r'^#+\s+(.*)|'                  # Cabeçalhos
        r'^\s*[\*\-]\s+(.*)|'         # Itens de lista
        r'>\s*([^<\n]+?)\s*<|'           # Conteúdo de tags HTML (não ganancioso)
        r'^(?![<`\s\-|\[\d])(.{10,})' # Parágrafos com pelo menos 10 caracteres
        , re.MULTILINE
    )
    
    snippets = []
    for match in pattern.finditer(content_no_urls):
        snippet = next((g for g in match.groups() if g is not None), None)
        if snippet and snippet.strip():
            snippets.append(snippet.strip())
            
    return snippets

def create_translation_map(english_content, translated_content):
    """Cria um dicionário de tradução {'texto em inglês': 'texto traduzido'}."""
    english_snippets = extract_text_snippets(english_content)
    translated_snippets = extract_text_snippets(translated_content)
    
    if not english_snippets or not translated_snippets:
        return {}
        
    return dict(zip(english_snippets, translated_snippets))

def apply_translations(original_mdx_content, translation_map):
    """Aplica o mapa de traduções ao conteúdo MDX original."""
    translated_mdx = original_mdx_content
    # Itera do trecho mais longo para o mais curto para evitar substituições parciais incorretas
    for eng_text, trans_text in sorted(translation_map.items(), key=lambda item: len(item[0]), reverse=True):
        # Garante que não estamos substituindo parte de uma URL ou de um componente
        # Usando regex para substituir apenas o texto completo, evitando substrings
        try:
            translated_mdx = re.sub(r'(?<!\S)' + re.escape(eng_text) + r'(?!\S)', trans_text, translated_mdx)
        except re.error:
             # Fallback para substituição simples se o regex falhar (caracteres especiais)
             translated_mdx = translated_mdx.replace(eng_text, trans_text)
    return translated_mdx

def main():
    print("Iniciando tradução híbrida e segura...")
    
    try:
        with open(TRANSLATIONS_FILE, 'r', encoding='utf-8') as f:
            translations_data = json.load(f)
        print(f"'{TRANSLATIONS_FILE}' carregado com sucesso.")
    except FileNotFoundError:
        print(f"ERRO: '{TRANSLATIONS_FILE}' não encontrado!")
        return

    source_path = Path(SOURCE_DIR)
    english_files = list(source_path.rglob('*.mdx'))

    for english_path in english_files:
        if any(part in TARGET_LANGUAGES.values() for part in english_path.parts):
            continue
            
        url_key = get_url_key_from_path(english_path, source_path)
        corrected_url_key = URL_CORRECTION_MAP.get(url_key, url_key)
        page_translations = translations_data.get(corrected_url_key)
        
        if not page_translations:
            continue

        print(f"\n🔄 Processando '{english_path}' (URL: {corrected_url_key})")
        
        try:
            post = frontmatter.load(english_path)
            # Salva o estado original para resetar a cada loop de idioma
            original_content = post.content
            original_metadata = post.metadata.copy()

        except Exception as e:
            print(f"   - ❌ Erro ao ler o arquivo: {e}")
            continue

        for lang_code, target_dir in TARGET_LANGUAGES.items():
            # Sempre começa com o post original em inglês
            post.content = original_content
            post.metadata = original_metadata.copy()

            english_content_from_json = page_translations.get('content', {}).get('en')
            translated_content_from_json = page_translations.get('content', {}).get(lang_code)
            translated_title = page_translations.get('title', {}).get(lang_code)

            if not translated_content_from_json and not translated_title:
                print(f"   - ⏭️  Ignorando idioma '{lang_code}' (sem dados de tradução).")
                continue

            # LÓGICA HÍBRIDA
            if english_content_from_json and translated_content_from_json:
                translation_map = create_translation_map(english_content_from_json, translated_content_from_json)
                post.content = apply_translations(post.content, translation_map)
            
            # Atualiza o cabeçalho
            if translated_title:
                post.metadata['title'] = translated_title
                if 'sidebarTitle' in post.metadata: post.metadata['sidebarTitle'] = translated_title
                if 'og:title' in post.metadata: post.metadata['og:title'] = translated_title
                if 'twitter:title' in post.metadata: post.metadata['twitter:title'] = translated_title
            
            # Salva o arquivo
            translated_path = source_path / target_dir / english_path.relative_to(source_path)
            translated_path.parent.mkdir(parents=True, exist_ok=True)
            with open(translated_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter.dumps(post, handler=frontmatter.YAMLHandler()))
            print(f"   - ✅ Salvo em: '{translated_path}'")

if __name__ == '__main__':
    main()