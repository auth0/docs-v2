import json
import os
from pathlib import Path
import frontmatter

# --- CONFIGURAÇÕES ---
TRANSLATIONS_FILE = 'mapeamento_paginas_corrigido.json'
SOURCE_DIR = 'docs'

def get_url_key_from_path(filepath, source_dir):
    """Converte um caminho de arquivo em uma chave de URL formatada."""
    relative_path = filepath.relative_to(source_dir)
    url_key = '/' + str(relative_path.with_suffix('')).replace(os.path.sep, '/')
    if url_key.endswith('/index'):
        url_key = url_key[:-5] or '/'
    return url_key

def main():
    print("Iniciando o detetive de mapeamento de URLs...")

    # --- PASSO 1: Criar um índice reverso de Título -> URL a partir do JSON ---
    title_to_url_map = {}
    seen_titles = set()
    try:
        with open(TRANSLATIONS_FILE, 'r', encoding='utf-8') as f:
            translations_data = json.load(f)
    except FileNotFoundError:
        print(f"ERRO: Arquivo de traduções '{TRANSLATIONS_FILE}' não encontrado!")
        return

    print("Construindo índice de títulos a partir do JSON...")
    for url_key, page_data in translations_data.items():
        english_title = page_data.get('title', {}).get('en')
        if english_title:
            clean_title = english_title.strip().lower()
            if clean_title in seen_titles:
                print(f"  - Aviso: Título duplicado no JSON: '{english_title}' (URL: {url_key})")
            else:
                title_to_url_map[clean_title] = url_key
                seen_titles.add(clean_title)
    print(f"Índice construído com {len(title_to_url_map)} títulos únicos.")

    # --- PASSO 2: Ler os arquivos MDX e encontrar correspondências pelo título ---
    source_path = Path(SOURCE_DIR)
    mdx_files = list(source_path.rglob('*.mdx'))
    print(f"Analisando {len(mdx_files)} arquivos .mdx para encontrar correspondências...")
    
    correction_map = {}
    found_count = 0
    not_found_count = 0

    for mdx_path in mdx_files:
        # Ignora as pastas de tradução para não se auto-referenciar
        if any(part in ['fr-ca', 'ja-jp'] for part in mdx_path.parts):
            continue

        try:
            post = frontmatter.load(mdx_path)
            mdx_title = post.metadata.get('title')

            if mdx_title:
                clean_mdx_title = mdx_title.strip().lower()
                
                # Procura o título do arquivo no nosso índice
                correct_url = title_to_url_map.get(clean_mdx_title)
                
                if correct_url:
                    found_count += 1
                    file_url_key = get_url_key_from_path(mdx_path, source_path)
                    
                    # Se a URL do arquivo é diferente da URL correta do JSON, é uma correção!
                    if file_url_key != correct_url:
                        correction_map[file_url_key] = correct_url
                else:
                    not_found_count += 1
            else:
                not_found_count += 1
        except Exception:
            # Ignora arquivos que não podem ser lidos
            not_found_count += 1
            continue

    print("\n--- Análise Concluída ---")
    print(f"✅ Correspondências encontradas pelo título: {found_count}")
    print(f"❌ Arquivos sem correspondência de título: {not_found_count}")
    print(f"💡 Regras de correção sugeridas: {len(correction_map)}")

    # --- PASSO 3: Imprimir o mapa de correção pronto para ser copiado ---
    print("\n\nCOPIE E COLE O BLOCO ABAIXO NO SEU SCRIPT 'tradutor_final.py':")
    print("-" * 60)
    print("URL_CORRECTION_MAP = {")
    
    # Ordena o dicionário para uma saída mais limpa
    sorted_corrections = sorted(correction_map.items())
    
    for file_url, correct_url in sorted_corrections:
        print(f'    "{file_url}": "{correct_url}",')
        
    print("}")
    print("-" * 60)

if __name__ == '__main__':
    main()