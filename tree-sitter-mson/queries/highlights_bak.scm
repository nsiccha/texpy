"```" @tag
[
  ":"
  ","
  "{"
  "}"
  "("
  ")"
  "["
  "]"
] @punctuation.delimiter

(comment) @comment

(heading) @bold
(interjection) @comment
(italic) @italic
(bold) @bold

(rule_lhs) @variable.parameter
(rule_rhs) @string


(math) @string.special
(unary_operator) @operator
(binary_operator) @operator
