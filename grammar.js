// https://github.com/tree-sitter/tree-sitter-python/blob/master/grammar.js
const PREC = {
  // this resolves a conflict between the usage of ':' in a lambda vs in a
  // typed parameter. In the case of a lambda, we don't allow typed parameters.
  lambda: -2,
  typed_parameter: -1,
  conditional: -1,

  parenthesized_expression: 1,
  parenthesized_list_splat: 1,
  not: 1,
  compare: 2,
  or: 10,
  and: 11,
  bitwise_or: 12,
  bitwise_and: 13,
  xor: 14,
  shift: 15,
  plus: 16,
  times: 17,
  unary: 18,
  power: 19,
  call: 20,
}

module.exports = grammar({
  name: 'mson',
  externals: $ => [
    $._newline,
    $._indent,
    $._dedent,
    $._string_start,
    $._string_content,
    $._string_end,
    $.text_token
  ],
  rules: {
    source: $ => repeat($._token),
    _token: $ => choice(
        $.code_token, $.parse_token,
        $.text_token,
        $.markdown_token,
        $.latex_token
    ),

    code_token: $ => seq(
      $.fence, repeat($._anyword), $.fence
    ),
    fence: $ => seq('```', optional(/[a-z]+/)),
    // fence_tag: $ => /[a-z]+/,

    // parse_token: $ => seq('{', optional($.label),  $.expression, '}'),
    parse_token: $ => choice(
      $.inline_parse_token,
      $.block_parse_token
    ),
    inline_parse_token: $ => seq('{',
      field('label', optional($.label)), field('expression', $.expression),
    '}'),
    block_parse_token: $ => seq('{',
      field('label', optional($.label)), '\n',
      field('expression', $.expression), optional($.punctuation),
    '}'),
    label: $ => seq($.identifier, ':'),
    punctuation: $ => /[,.?]/,
    expression: $ => choice(
      $.call,
      $.parenthesised_expression,
      $.dot_expression,
      $.container,
      $.operation,
      $.identifier,
      $.literal
    ),
    call: $ => prec(PREC.call, seq($.expression, choice(
        seq('(', optional($.comma_separated_expressions), ')'),
        seq('[', optional($.comma_separated_expressions), ']'),
        seq('{', optional($.comma_separated_expressions), '}')
    ))),
    parenthesised_expression: $ => seq('(', $.expression, ')'),
    dot_expression: $ => seq('<', $.expression, ',', $.expression, '>'),
    // call_args: $ => seq($.comma_separated_expressions, optional(',')),
    comma_separated_expressions: $ => seq(
        $.expression, repeat(seq(',', $.expression))
    ),
    container: $ => choice($.tuple, $.list, $.set),
    tuple: $ => seq('(', ochoice(
      seq($.expression, ','),
      seq($.expression, repeat1(seq(',', $.expression)), optional(','))
    ), ')'),
    list: $ => seq('[', ochoice(
      seq($.expression, repeat(seq(',', $.expression)), optional(','))
    ), ']'),
    set: $ => seq('{', ochoice(
      seq($.expression, repeat(seq(',', $.expression)), optional(','))
    ), '}'),
    operation: $ => choice($.unary_operation, $.binary_operation),
    unary_operation: $ => prec.left(PREC.unary, seq(
      $.unary_operator, $.expression
    )),
    unary_operator: $ => choice('-', '+'),
    binary_operation: $ => choice(
      prec.left(PREC.compare, seq(
        $.expression, choice('=', '<', '>', '~', ':=', '!=', '>=', '<=', '<<', '>>'), $.expression
      )),
      prec.left(PREC.plus, seq(
        $.expression, choice('+', '-'), $.expression
      )),
      prec.left(PREC.times, seq(
        $.expression, choice('*', '/', '\\', '@', '%'), $.expression
      )),
      prec.left(PREC.power, seq(
        $.expression, choice('^', '**'), $.expression
      )),
      prec.left(1, seq(
        $.expression, $.binary_operator, $.expression
      ))
    ),
    // binary_operation: $ => prec.left(1, seq(
    //   $.expression, $.binary_operator, $.expression
    // )),
    binary_operator: $ => choice(
      '|',
      // '**',
      '->',
      // '!=', '>=', '<=', '<<', '>>',
      '//', '/*', '/@',
      'approx', 'in', 'not in', 'iff', '::'
      // seq($._w, choice('approx', 'not in', 'in'), $._w)
    ),
    // attribute: $ => seq($.identifier, '.', $.identifier),
    identifier: $ => /[a-zA-Z_]+/,
    literal: $ => /[0-9]+/,

    // text_token: $ => $._anyword,
    // _text_token: $ => choice(
    //   $.parse_token,
    //   $.latex_token,
    //   $.markdown_token,
    //   // /[^{]+/
    //   $._anyword
    // ),

    // parse_token: $ => 'PARSE',
    markdown_token: $ => choice(
      sseq('`', $.text_token),
    ),
    latex_token: $ => choice(
      $.inline_latex_token,
      $.block_latex_token,
    ),
    inline_latex_token: $ => /\\\(.*\\\)/,
    block_latex_token: $ => /\\\[.*\\\]/,

    _anyword: $ => /\S+/
  }
});
function sseq(w, ...args){
  return seq(w, ...args, w);
}
function ochoice(...args){return optional(choice(...args));}
