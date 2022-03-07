import re


with open('proof_normal_bound.md', 'r') as fd:
    raw = fd.read()

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
