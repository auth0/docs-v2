import json
import os
from pathlib import Path

# --- CONFIGURAÇÕES ---
# Certifique-se de que este é o nome do seu arquivo JSON de traduções
TRANSLations_FILE = 'mapeamento_paginas_corrigido.json'
# Pasta onde estão seus arquivos .mdx em inglês
SOURCE_DIR = 'docs'

def get_url_key_from_path(filepath, source_dir):
    """Converte um caminho de arquivo em uma chave de URL formatada."""
    relative_path = filepath.relative_to(source_dir)
    # Constrói a URL a partir do caminho do arquivo
    url_key = '/' + str(relative_path.with_suffix('')).replace(os.path.sep, '/')
    
    # Trata o caso especial de 'index.mdx' que corresponde à raiz da pasta
    if url_key.endswith('/index'):
        url_key = url_key[:-5] or '/'
        
    return url_key

def main():
    """Função principal que gera e imprime as duas listas de URLs para comparação."""
    
    # Carrega as URLs que temos no nosso banco de dados de tradução
    try:
        with open(TRANSLations_FILE, 'r', encoding='utf-8') as f:
            translations_data = json.load(f)
        available_urls = list(translations_data.keys())
        available_urls.sort()
    except FileNotFoundError:
        print(f"ERRO: Arquivo de traduções '{TRANSLATIONS_FILE}' não encontrado!")
        print("Certifique-se de que o arquivo gerado na etapa anterior está na mesma pasta.")
        return

    # Gera as URLs a partir da estrutura de arquivos .mdx
    source_path = Path(SOURCE_DIR)
    if not source_path.is_dir():
        print(f"ERRO: A pasta de origem '{SOURCE_DIR}' não foi encontrada!")
        return
        
    generated_urls = []
    for mdx_file in source_path.rglob('*.mdx'):
        # Ignora as pastas de tradução para não se auto-referenciar
        if any(part in ['fr-ca', 'ja-jp'] for part in mdx_file.parts):
            continue
        url_key = get_url_key_from_path(mdx_file, source_path)
        generated_urls.append(url_key)
    generated_urls.sort()

    # --- Imprime as duas listas para comparação ---

    print("--- URLs Geradas a partir dos Arquivos .mdx na pasta 'docs' ---")
    print(f"(Total: {len(generated_urls)})\n")
    for url in generated_urls:
        print(url)

    print("\n" + "="*60 + "\n")

    print("--- URLs Disponíveis no JSON de Tradução ---")
    print(f"(Total: {len(available_urls)})\n")
    for url in available_urls:
        print(url)
        
    print("\n--- Fim do Diagnóstico ---")
    print("\nCompare as duas listas para encontrar as diferenças no mapeamento.")
    print("Procure por URLs que parecem ser as mesmas, mas com nomes ou estruturas ligeiramente diferentes.")

if __name__ == '__main__':
    main()