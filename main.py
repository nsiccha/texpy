import re
import os


with open('main.md', 'r') as fd:
    raw = fd.read()

blocks = raw.split('```', 2)
rules = dict()
raw_rules = blocks[1]
lines = raw_rules.splitlines()
ctx = [None]
indent = ''
for line in lines:
    if not line: continue
    sline = line.split(':', 1)
    actx = sline[0].lstrip()
    ctx_depth = (len(sline[0]) - len(actx))//2
    actx = actx.strip()
    # m = re.match(r'', actx)
    ctx = ctx[:ctx_depth] + [actx]
    if len(sline) > 1:
        rules[''.join(ctx)] = sline[1].strip()


kvs = list(rules.items())

for key, value in list(rules.items()):
    bext = key.rsplit('.', 1)
    if len(bext) == 1: continue
    base, ext = bext
    if ext == 'doi':
        kvs.append((base, f'[[{base}]](http://dx.doi.org/{value})'))
        # rules[base] = f'[[{base}]](http://dx.doi.org/{value})'
    elif ext == 'long':
        ikey = base+'.intro'
        tkey = base+'.tex'
        if ikey not in rules:
            if tkey in rules:
                kvs.append((ikey, f'{value} {base}'))
            else:
                kvs.append((ikey, f'{value} ({base})'))
        # rules[base+'.intro'] = f'{value} ({base})'
        # if tkey in rules:
        #     kvs.insert(0, ('the.'+base, f'the {value} {rules[tkey]}'))
    elif ext == 'tex':
        kvs.append((base+'.inline', f'${value}$'))

# kvs = list(rules.items())
#
# for key, value in rules.items():


rules = dict(kvs)

# for key, value in rules.items():
#     print(key)

processed = blocks[2]
plines = []
last_indent = ''
for line in processed.splitlines():
    if not line:
        plines.append(line)
        continue
    ctx = ['.inline', '']
    m = re.match(r'.+ (=|<|~) .+', line)
    if m is not None and not line.lstrip().startswith('*'):
        ctx = ['.tex', '']
        line = f'\({line}\)'
        print(ctx, line)
    for key, value in rules.items():
        skey = key
        for ctxi in ctx:
            skey = skey.replace(ctxi, '')
        rkey = [
            key+ctxi for ctxi in ctx if (key+ctxi) in rules
        ][0]
        line = re.sub(
            f'(?<!\w){re.escape(skey)}(?!\w)',
            rules[rkey].replace('\\', r'\\'),
            line
        )
        # line = line.replace(skey, rules[rkey])
            #     if ctxi != '': print(ckey, value)
            # break
        # line = line.replace(key, value)
    plines.append(line)

processed = '\n'.join(plines)

with open('pmain.md', 'w') as fd:
    fd.write(processed)

os.system('pandoc pmain.md -o pmain.tex')
os.system('pandoc pmain.tex -o asael.pdf')
