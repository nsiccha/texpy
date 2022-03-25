import os
import pathlib

base = pathlib.Path('examples')

changed = []



rv = os.system('tree-sitter generate')
print(rv)
for in_path in base.glob('*.md'):
    out_path = in_path.with_suffix('.out')
    mson_path = in_path.with_suffix('.mson')
    html_path = in_path.with_suffix('.html')
    ihtml_path = html_path.with_suffix('.htm')
    cmd = f'tree-sitter parse {in_path} > {out_path}'
    if not out_path.exists():
        print(cmd)
        os.system(cmd)
    with open(out_path, 'r') as fd:
        old = fd.read()
    print(cmd)
    rv = os.system(cmd)
    print(rv)
    with open(out_path, 'r') as fd:
        new = fd.read()
    if old != new:
        print(f'{in_path} > {out_path}: CHANGED!')
    else:
        print(f'{in_path} > {out_path}: OK!')
    os.system(f'cp {in_path} {mson_path}')
    cmd = f'tree-sitter highlight -H --scope source.mson {mson_path} > {html_path}'
    print(cmd)
    os.system(cmd)
    with open(ihtml_path, 'w') as fd:
        fd.write(f'''
<iframe src="{html_path.relative_to(base)}" width=49% height=100%></iframe>
<iframe src="{out_path.relative_to(base)}" width=49% height=100%/></iframe>''')
