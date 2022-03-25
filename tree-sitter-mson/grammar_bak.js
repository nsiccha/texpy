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
    _block: $ => choice($.comment, $.code, $.text),

    comment: $ => /<!--(\s|\S)*-->/,
    code: $ => seq('```', repeat($.rule), '```'),
    rule: $ => seq($.rule_lhs, optional(seq(':', $.rule_rhs))),
    rule_lhs: $ => /[a-zA-Z.(),]+/,
    rule_rhs: $ => /.+/,
    // rule_lhs: $ => prec(-1, ),
    // rule_rhs: $ => prec(-1, ),
    structure: $ => choice(
      $.heading,
      $.interjection,
      $.bold,
      $.italic
    ),
    heading: $ => prec.right(seq(
      repeat1('#'), repeat1($.myword)
    )),
    interjection: $ => seq('(', $.text, ')'),
    // bold: $ => seq('*', $.text, '*'),
    bold: $ => /\*\*[^*]+\*\*/,
    italic: $ => /_[^_]+_|\*[^*]+\*/,

    text: $ => prec.right(repeat1(choice(
      $.math, $.nonmath, $.structure
    ))),
    math: $ => choice(
      $.explicit_math,
      // $.implicit_math
    ),

    explicit_math: $ => seq('{', $._expression, '}'),
    implicit_math: $ => prec(-1, choice(
      $.binary_operation,// $.call, $.bracket, $.container
    )),
    unary_operator: $ => choice('-', '+'),
    unary_operation: $ => prec(1, seq($.unary_operator, $._expression)),
    binary_operator: $ => choice('<', '>', '=', '!=', '>=', '<=', '-', '+', '/', '*', '@', ':=', "|"),//, ':=','+','-','*'),
    binary_operation: $ => prec.left(
      seq($._expression, $.binary_operator, $._expression)
    ),
    _expression: $ => choice(
      $.parenthesised,
      $.call, $.bracket,
      $.binary_operation, $.unary_operation, $.container,
      $.atom
    ),
    parenthesised: $ => seq('(', $._expression, ')'),
    // comma_separated_expressions: $ => choice(
    //   $._expression,
    //   seq($._expression, ',', $.comma_separated_expressions)
    // ),
    comma_separated_expressions: $ => seq(
      $._expression, repeat(seq(',', $._expression)), optional(','),
    ),
    container: $ => choice(
      $.tuple, $.list, $.set
    ),
    tuple: $ => choice(
      seq('(', $._expression, ',', ')'),
      seq('(', $._expression, ',', $.comma_separated_expressions, ')')
    ),
    list: $ => seq('[', $.comma_separated_expressions, ']'),
    set: $ => choice(
      seq('{', $._expression, ',', '}'),
      seq('{', $._expression, ',', $.comma_separated_expressions, '}')
    ),
    call: $ => prec(2,
      seq(
        $._expression,
        token.immediate('('), $.comma_separated_expressions, ')'
      )
    ),
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
