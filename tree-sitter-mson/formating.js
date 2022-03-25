module.exports = grammar({
  name: 'mson',
  conflicts: $ => [
  ],
  extras: $ => [],
  rules: {
    // TODO: add the actual grammar rules
    // source_file: $ => repeat($._block),
    source_file: $ => choice('', seq(
      $._block, repeat(seq($._blank, $._block))
    )),
    _block: $ => choice($.code, $.text),
    code: $ => seq($.fence, repeat($.code_line), $.fence),
    fence: $ => "```\n",
    code_line: $ => $._any_line,

    text: $ => (
      repeat1($._text_element)
    ),

    _text_element: $ => seq(choice(
      $.hline,
      $.heading,
      $.reference,
      $.list,
      // $.quote,
      $._singleline_text,
    ), $._linebreak),
    hline: $ => /-+/,
    heading: $ => seq(/#+/, optional($._iwspace), $._singleline_text),
    reference: $ => seq($._simple_bracket, ':', $._any_inline),

    list: $ => seq(optional($._iwspace), '* ', $._singleline_text),
    // list_element: $ => seq(optional($._iwspace), '* ', $._singleline_text),
    // quote: $ => seq('>', optional($._iwspace), $.text),

    multiline_text: $ => prec.left(seq(
      $._singleline_text, repeat(seq($._linebreak, $._singleline_text))
    )),
    _singleline_text: $ => seq(
      $._formatted_text, repeat(seq(optional($._iwspace), $._formatted_text))
    ),
    _formatted_text: $ => choice(
      $.plain,
      $.italic,
      $.bold,
      $.bolditalic,
      $.strikethrough,
      $.verbatim,
      $.link,
      $.image,
      $.interjection,
    ),
    _myword: $ => /[a-zA-Z,.]+/,
    // _punctuation: $ => /[,.]/,
    plain: $ => $._myword,
    italic: $ => choice(
      seq('*', /[a-z][^\n*]*/, '*'),
      seq('_', /[a-z][^\n_]*/, '_')
    ),
    bold: $ => choice(
      seq('**', /[a-z][^\n*]*/, '**'),
      seq('__', /[a-z][^\n_]*/, '__')
    ),
    bolditalic: $ => choice(
      seq('***', /[a-z][^\n*]*/, '***'),
      seq('___', /[a-z][^\n_]*/, '___')
    ),
    strikethrough: $ => choice(
      seq('~~', /[a-z][^\n~]*/, '~~'),
    ),
    verbatim: $ => choice(
      seq('`', /[a-z][^\n`]*/, '`'),
    ),
    link: $ => seq(
      $._simple_bracket,
      choice($._simple_bracket, $._simple_parenthesis)
    ),
    image: $ => seq(
      '!',
      $._simple_bracket,
      $._simple_parenthesis
    ),

    interjection: $ => $._simple_parenthesis,

    _simple_bracket: $ => seq('[', /[^\]]+/, ']'),
    _simple_parenthesis: $ => seq('(', /[^)]+/, ')'),
    _any_inline: $ => /.*/,
    _any_line: $ => seq($._any_inline, $._linebreak),
    _linebreak: $ => "\n",
    _iwspace: $ => /[ ]+/,
    _blank: $ => repeat1(/[ ]*\n/),
    // _doubleblank: $ => seq($._blank, $._blank)

  }
});
