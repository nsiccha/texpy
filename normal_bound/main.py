from tree_sitter import Language, Parser

with open('proof_normal_bound.md', 'r') as fd:
    raw = fd.read()


lib_path = 'build/my-languages.so'
Language.build_library(
    lib_path,
    [
        '../tree-sitter-mson'
    ]
)
MSON_LANGUAGE = Language(lib_path, 'mson')
parser = Parser()
parser.set_language(MSON_LANGUAGE)


tree = parser.parse(bytes(raw, 'utf8'))
lines = raw.splitlines()

def fmt_node(node):
    if node.type == 'comment': return ''
    if node.type == 'code': return ''
    if node.type in ['source_file', 'structure']: return ''.join(map(fmt_node, node.children))
    if node.type in ['atom', 'myword', 'nonword', 'punctuation', 'math_operator', '-', '+', 'heading']: return node.text.decode('utf-8')
    if node.type == 'bracket': return '{}[{}]'.format(*map(fmt_node, [node.children[0], node.children[2]]))
    if node.type == 'call': return '{}({})'.format(*map(fmt_node, [node.children[0], node.children[2]]))
    if node.type == 'binary_operation':
        return ' '.join(map(fmt_node, node.children))
    if node.type == 'unary_operation':
        return ''.join(map(fmt_node, node.children))
    if node.type == 'pair':
        return '({}, {})'.format(*map(fmt_node, [node.children[1], node.children[3]]))
    if node.type == 'parenthesised':
        return '({})'.format(fmt_node(node.children[1]))
    if node.type == 'comma_separated_expressions':
        return ', '.join(map(fmt_node, node.children[::2]))
    # if node.children:
    if node.type in ['text', 'nonmath', 'implicit_math']:
        return ' '.join(map(fmt_node, node.children))
    if node.type == 'math':
        return '\n\\[\n{}\n\\]\n'.format(fmt_node(node.children[0]))
    return (f'{node.type}\n' + '\n'.join(map(fmt_node, node.children))).replace('\n','\n  ')
    # return node.type
with open('pmain.md', 'w') as fd:
    fd.write(fmt_node(tree.root_node))
exit()

processed = raw

rules = {
    'an RV': 'a random variable',
    'PDF': 'probability density function',
    '([\S]+) (<|=) ([\S]+)': r'$\1 \2 \3$'
}

for key, val in rules.items():
    processed, n = re.subn(key, val, processed)
    print(key, val, n)
    # processed = processed.replace(key, val)

with open('processed_proof_normal_bound.md', 'w') as fd:
    fd.write(processed)
