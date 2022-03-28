import os
import pathlib

from funpy.tex import *

parser = Parser()

base = pathlib.Path('examples')

System('tree-sitter generate').print()
for in_path in base.glob('*.md'):
    out_path = in_path.with_suffix('.out')
    mson_path = in_path.with_suffix('.mson')
    html_path = in_path.with_suffix('.html')
    ihtml_path = html_path.with_suffix('.htm')
    rv = System(f'tree-sitter parse {in_path} > {out_path}').print()
    if rv == 0:
        md_path = in_path.parent / 'processed' / in_path.name
        File(md_path).write(
            parser.process(in_path)
        )
        out_path = md_path.with_suffix('.html')
        System(f'pandoc -s --mathjax -f markdown -t html5 -o {out_path} {md_path}').print()
    System(f'cp {in_path} {mson_path}').print()
    System(f'tree-sitter highlight -H --scope source.mson {mson_path} > {html_path}').print()
    File(ihtml_path).write(f'''
<iframe src="{html_path.relative_to(base)}" width=49% height=100%></iframe>
<iframe src="{out_path.relative_to(base)}" width=49% height=100%/></iframe>
''')
