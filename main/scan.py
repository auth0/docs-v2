import os
from pathlib import Path
import re
import frontmatter

# --- CONFIGURAÇÕES ---
SOURCE_DIR = 'docs'
TRANSLATED_DIRS = ['docs/fr-ca', 'docs/ja-jp']

def analyze_mdx_structure(content):
    """Conta os elementos estruturais importantes em um conteúdo MDX."""
    counts = {
        'headings': len(re.findall(r'^#+\s', content, re.MULTILINE)),
        'tables': len(re.findall(r'<table', content, re.IGNORECASE)),
        # Conta os marcadores de início/fim e divide por 2
        'code_blocks': len(re.findall(r'```', content)) // 2,
        'list_items': len(re.findall(r'^\s*[\*\-]\s', content, re.MULTILINE)),
    }
    return counts

def main():
    print("Iniciando a comparação estrutural entre os arquivos em inglês e suas traduções...")
    
    source_path = Path(SOURCE_DIR)
    english_files = list(source_path.rglob('*.mdx'))
    
    found_problems = False

    for english_path in english_files:
        # Ignora as próprias pastas de tradução se estiverem dentro de 'docs'
        if any(part in [d.replace('docs/','') for d in TRANSLATED_DIRS] for part in english_path.parts):
            continue

        try:
            with open(english_path, 'r', encoding='utf-8') as f:
                english_post = frontmatter.load(f)
            english_structure = analyze_mdx_structure(english_post.content)

            # Só analisa arquivos que têm alguma estrutura relevante
            if sum(english_structure.values()) == 0:
                continue

            for trans_dir in TRANSLATED_DIRS:
                translated_path = Path(trans_dir) / english_path.relative_to(source_path)

                if translated_path.exists():
                    with open(translated_path, 'r', encoding='utf-8') as f:
                        translated_post = frontmatter.load(f)
                    translated_structure = analyze_mdx_structure(translated_post.content)

                    # Compara as estruturas. Se houver divergência em tabelas, código ou
                    # uma grande diferença em cabeçalhos/listas, marca como problema.
                    if (english_structure['tables'] != translated_structure['tables'] or
                        english_structure['code_blocks'] != translated_structure['code_blocks'] or
                        translated_structure['headings'] < english_structure['headings'] / 2 or
                        translated_structure['list_items'] < english_structure['list_items'] / 2):
                        
                        if not found_problems:
                            print("\n--- Relatório de Inconsistências ---")
                        
                        print(f"\n[PROBLEMA] Inconsistência estrutural em: {translated_path}")
                        print(f"  - EN: {english_structure}")
                        print(f"  - {trans_dir.split('/')[1].upper()}: {translated_structure}")
                        found_problems = True

        except Exception as e:
            print(f"  - Erro ao processar o arquivo {english_path}: {e}")

    if not found_problems:
        print("\n--- ✅ Nenhuma inconsistência estrutural grave foi encontrada! ---")
    else:
        print("\n--- Fim do Relatório ---")

if __name__ == '__main__':
    main()