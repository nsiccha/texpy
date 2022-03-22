module.exports = grammar({
  name: 'mson',
  conflicts: $ => [
    // [$.text, $.rule_rhs],
    // [$.text, $.text],
  ],
  extras: $ => [' ', '\n'],
  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat($._block),
    _block: $ => choice($.comment, $.code, $.structure, $.text),

    comment: $ => /<!--(\s|\S)*-->/,
    code: $ => seq('```', repeat($.rule), '```'),
    rule: $ => seq(/[a-zA-Z.]+/, ':', /.+/),
    // rule_lhs: $ => prec(-1, ),
    // rule_rhs: $ => prec(-1, ),
    structure: $ => choice($.heading),
    heading: $ => seq(repeat1('#'), $.text),

    text: $ => prec.right(repeat1(choice($.math, $.nonmath))),
    math: $ => choice($.explicit_math, $.implicit_math),

    explicit_math: $ => seq('{', $._expression, '}'),
    implicit_math: $ => prec(-1, choice($.binary_operation, $.call, $.bracket, $.pair)),
    // maths: $ => seq($._expression, $.math_operator, $._expression),
    unary_operation: $ => prec(1, seq(choice('-', '+'), $._expression)),
    binary_operation: $ => prec.left(
      seq($._expression, $.math_operator, $._expression)
    ),
    _expression: $ => choice(
      $.parenthesised,
      $.call, $.bracket,
      $.binary_operation, $.unary_operation, $.pair,
      $.atom
    ),
    parenthesised: $ => seq('(', $._expression, ')'),
    // comma_separated_expressions: $ => choice(
    //   $._expression,
    //   seq($._expression, ',', $.comma_separated_expressions)
    // ),
    comma_separated_expressions: $ => seq(
      $._expression, repeat(seq(',', $._expression))
    ),
    pair: $ => seq('(', $._expression, ',', $._expression, ')'),
    call: $ => prec(2,
      seq($._expression, token.immediate('('), $.comma_separated_expressions, ')')
    ),
    math_operator: $ => choice('<', '>', '=', '!=', '>=', '<=', '-', '+', '/', '*', ':='),//, ':=','+','-','*'),
    atom: $ => choice($.identifier, $.literal),
    identifier: $ => prec(1, choice($.myword, $.nonword)),
    literal: $ => /[0-9]+/,

    bracket: $ => seq($._expression, token.immediate('['), $._expression, ']'),

    nonmath: $ => choice($.myword, $.nonword, $.punctuation),
    nonword: $ => seq($.myword, '_', $.myword),
    myword: $ => /[a-zA-Z]+/,
    punctuation: $ => /[.,;:?!"]/,
    // _word: $ => prec(-1, /\S+/),
  }
});
