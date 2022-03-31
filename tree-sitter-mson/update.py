import sys
import os
import pathlib

from funpy.tex import *

argc = len(sys.argv[1:])
print(sys.argv)


base = pathlib.Path('examples')

System('tree-sitter generate').print()

for in_path in base.glob('*.md'):

    out_path = in_path.with_suffix('.out')
    mtime = max([
        File(path).mtime
        for path in [in_path, 'update.py', 'funpy/tex.py']
    ])
    if argc > 0:
        if in_path.name not in sys.argv: continue
    elif File(out_path).mtime > mtime:
        print(f'Skipping {in_path}.')
        continue
    mson_path = in_path.with_suffix('.mson')
    html_path = in_path.with_suffix('.html')
    ihtml_path = html_path.with_suffix('.htm')
    rv = System(f'tree-sitter parse {in_path} > {out_path}').print()
    if rv == 0:
        stem = in_path.stem
        proof_path = pathlib.Path(f'../../proofs/{stem}')
        readme_path = proof_path / f'README.md'
        gfm_path = proof_path / f'github_{stem}.md'
        md_path = proof_path / f'mathjax_{stem}.md'
        pandoc_path = proof_path / f'pandoc_{stem}.md'
        pdf_path = proof_path / f'{stem}.pdf'
        html_path = proof_path / f'{stem}.html'
        File(readme_path).write(f"""
Please see either
* [{gfm_path.name}]({gfm_path.name}) for a semi-nice github-compatible markdown version,
* [{md_path.name}]({md_path.name}) for a slightly better, not github-compatible but mathjax compatible markdown version or
* [{pdf_path.name}]({pdf_path.name}) for a slightly worse pdf version.
""")
        parser = Parser(figs_base=proof_path/'figs', format='gfm')
        File(gfm_path).write(parser.process(in_path))
        parser = parser.copy(format='md')
        File(md_path).write(parser.process(in_path))
        rv = System(f'pandoc --standalone --mathjax -fmarkdown-implicit_figures -t html5 -o {html_path} {pandoc_path}').print_on_failure()
        parser = parser.copy(format='pandoc')
        File(pandoc_path).write(parser.process(in_path))
        rv = System(f'pandoc -f markdown -fmarkdown-implicit_figures -t pdf -o {pdf_path} {pandoc_path}').print_on_failure()
        if rv != 0:
            print(File(pandoc_path).content)
        exit()

        parser = Parser(figs_base='examples/processed/figs', format='md')
        md_path = in_path.parent / 'processed' / in_path.name
        File(md_path).write(
            parser.process(in_path)
        )
        out_path = md_path.with_suffix('.html')
        System(f'pandoc --standalone -f markdown -fmarkdown-implicit_figures -t html5 -o {out_path} {md_path}').print()
    System(f'cp {in_path} {mson_path}').print()
    System(f'tree-sitter highlight -H --scope source.mson {mson_path} > {html_path}').print()
    File(ihtml_path).write(f'''
<iframe src="{html_path.relative_to(base)}" width=49% height=100%></iframe>
<iframe src="{out_path.relative_to(base)}" width=49% height=100%/></iframe>
''')
