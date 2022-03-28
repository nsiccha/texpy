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

    // parse_token: $ => seq('{', optional($.label),  $._expression, '}'),
    parse_token: $ => choice(
      $.inline_parse_token,
      $.block_parse_token
    ),
    inline_parse_token: $ => seq('{', optional($.label), $._expression, '}'),
    block_parse_token: $ => seq('{', optional($.label), '\n', $._expression, '}'),
    label: $ => seq($.identifier, ':'),
    _expression: $ => choice(
      $.call,
      $.parenthesised_expression,
      $.container,
      $.operation,
      $.identifier,
      $.literal
    ),
    call: $ => seq($._expression, choice(
        seq('(', optional($.comma_separated_expressions), ')'),
        seq('[', optional($.comma_separated_expressions), ']'),
        seq('{', optional($.comma_separated_expressions), '}')
    )),
    parenthesised_expression: $ => seq('(', $._expression, ')'),
    // call_args: $ => seq($.comma_separated_expressions, optional(',')),
    comma_separated_expressions: $ => seq(
        $._expression, repeat(seq(',', $._expression))
    ),
    container: $ => choice($.tuple, $.list, $.set),
    tuple: $ => seq('(', ochoice(
      seq($._expression, ','),
      seq($._expression, repeat1(seq(',', $._expression)), optional(','))
    ), ')'),
    list: $ => seq('[', ochoice(
      seq($._expression, repeat(seq(',', $._expression)), optional(','))
    ), ']'),
    set: $ => seq('{', ochoice(
      seq($._expression, repeat(seq(',', $._expression)), optional(','))
    ), '}'),
    operation: $ => choice($.unary_operation, $.binary_operation),
    unary_operation: $ => prec.left(2, seq(
      $.unary_operator, $._expression
    )),
    unary_operator: $ => choice('-', '+'),
    binary_operation: $ => prec.left(1, seq(
      $._expression, $.binary_operator, $._expression
    )),
    binary_operator: $ => choice(
      /[-+*/@|=<>%\\^]/,
      '**',
      ':=', '->',
      '!=', '>=', '<=', '<<', '>>',
      '//', '/*', '/@',
      // seq($._w, choice('approx', 'not in', 'in'), $._w)
    ),
    identifier: $ => /[a-z]+/,
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
