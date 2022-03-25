module.exports = grammar({
  name: 'mson',
  conflicts: $ => [
  ],
  extras: $ => [],
  rules: {
    source: $ => repeat($._block),
    _block: $ => choice(
        $.code, $._text_line
    ),

    code: $ => seq(
      $.fence, repeat($._anyline), $.fence
    ),
    fence: $ => seq('```', optional($.fence_tag), $._lineend),
    fence_tag: $ => /[a-z]+/,
    code_line: $ => $._anyline,

    _text_line: $ => seq(optional($._text_inline), $._linebreak),
    _text_inline: $ => seq(
      $._first_text_token, repeat(seq($._text_separator, $._text_token))
    ),
    _first_text_token: $ => seq(optional($._iw), $._text_token),
    plain_text_inline: $ => seq(
      $._text_word, repeat(seq($._text_separator, $._text_word))
    ),
    _text_token: $ => seq(
      choice(
        $._text_word,
        $.markdown_token,
        $.latex_math,
        $.parse_token,
      ),
      optional($._text_punctuation)
    ),
    markdown_token: $ => choice(
      seq('*', $.plain_text_inline, '*'),
      seq('_', $.plain_text_inline, '_'),
      seq('**', $.plain_text_inline, '**'),
      seq('__', $.plain_text_inline, '__'),
      seq('***', $.plain_text_inline, '***'),
      seq('___', $.plain_text_inline, '___'),
      seq('~~', $.plain_text_inline, '~~'),
      /`[^`]+`/,
      /\[[^\]]+\]\([^)]+\)/
    ),
    // any_word: $ => /\S+/,
    _text_word: $ => /[a-zA-Z#()"'@.-]+/,
    _text_punctuation: $ => /[,.?:;]+/,
    _text_separator: $ => $._iw,

    parse_token: $ => choice(
      $.inline_parse, $.block_parse
    ),
    inline_parse: $ => choice(
      $.explicit_inline_parse, //$.implicit_inline_parse
    ),
    block_parse: $ => choice(
      $.explicit_block_parse//, $.implicit_block_parse
    ),
    explicit_inline_parse: $ => seq('{',
      optional($._iw), $.expression, optional($._iw),
    '}'),
    // implicit_inline_parse: $ => choice(
    //   $.implicit_binary_operation,
    //   // $.implicit_container,
    //   $.call
    // ),
    explicit_block_parse: $ => seq('{',
      $._lineend, optional($._w), $.expression, $._lineend,
    '}'),
    // implicit_block_parse: $ => 'TO DO',
    // implicit_binary_operation: $ => 'a+b',
    // implicit_container: $ => choice(
    //   seq('(',
    //     repeat1(seq($._wexpressionw, ',')), optional($._wexpressionw),
    //   ')'),
    //   seq('[',
    //     repeat1(seq($._wexpressionw, ',')), optional($._wexpressionw),
    //   ']'),
    //   seq('{',
    //     repeat1(seq($._wexpressionw, ',')), optional($._wexpressionw),
    //   '}'),
    // ),
    wcommaw: $ => prec(-100, seq(optional($._w), ',', optional($._w))),
    wcomma: $ => prec(0, seq(optional($._w), ',')),
    comma_separated_expressions: $ => choice(
      seq($.expression, $.wcomma),
      seq($.expression, repeat(seq($.wcommaw, $.expression)), optional($.wcomma))
    ),
    container: $ => choice(
      seq('(', optional($._w), $.comma_separated_expressions, ')'),
      // seq('(', optional($._w),
      //   $.comma_separated_expressions, $.wcomma,
      // optional($._w), ')'),
      // seq('[', optional($._w),
      //   $.comma_separated_expressions, $.wcomma,
      // optional($._w), ']'),
      // seq('{', optional($._w),
      //   $.comma_separated_expressions, $.wcomma,
      // optional($._w), '}'),
    ),
    call: $ => prec(1, seq(
      $.expression, choice(
        seq('(', $._wexpressionw, ')'),
        seq('[', $._wexpressionw, ']'),
        seq('{', $._wexpressionw, '}')
      )
    )),
    operation: $ => choice(
      $.unary_operation,
      $.binary_operation
    ),
    unary_operator: $ => choice('-', '+'),
    binary_operator: $ => choice(
      /[-+*/@|=<>%^]/,
      '!=', '>=', '<=',
      // seq($._w, choice('approx', 'not in', 'in'), $._w)
    ),
    unary_operation: $ => prec(2,
      seq($.unary_operator, optional($._w), $.expression)
    ),
    binary_operation: $ => prec.left(
      1,
      seq(
        $.expression,
        optional($._w), $.binary_operator, optional($._w),
        $.expression
      )
    ),
    // _oiw: $ => /[ ]*/,
    // _wcommaw: $ => seq($._ow, ',', $._ow)
    // _wexpression: $ => seq(optional($._w), $.expression),
    // _expressionw: $ => prec(-1, seq($.expression, optional($._w))),
    _wexpressionw: $ => seq(optional($._w), $.expression, optional($._w)),
    expression: $ => choice(
      $._atom,
      $.container,
      $.call,
      $.operation
    ),
    _atom: $ => choice($.identifier, $.literal),
    identifier: $ => /[a-z]/,
    literal: $ => /[0-9]+/,

    latex_math: $ => choice(
      $.inline_latex_math, $.block_latex_math
    ),
    inline_latex_math: $ => /\\\(.*\\\)/, //IMPROVE
    block_latex_math: $ => /\\\[.*\\\]/, //IMPROVE


    // _anyinline: $ => /.*/,
    _anyline: $ => seq(optional(/.+/), $._linebreak),
    _w: $ => /\s+/,
    _iw: $ => /[ ]+/,
    _linebreak: $ => '\n',
    _lineend: $ => seq(optional($._iw), $._linebreak)

  }
});
