/*
 * Levenshtein.js unit tests
 */

var strComparer = new Levenshtein(),
    wordComparer = new Levenshtein({compare: 'words'});


test('distance (strings)', function () {
  equal(strComparer.distance(3, '3'), 0);
  equal(strComparer.distance(null, ''), 0);
  equal(strComparer.distance(undefined, ''), 0);
  equal(strComparer.distance([], ''), 0);
  equal(strComparer.distance([1, 2], '1,2'), 0);
  equal(strComparer.distance({}, '[object Object]'), 0);
  equal(strComparer.distance(null, '3'), 1);
  equal(strComparer.distance(undefined, '3'), 1);
  equal(strComparer.distance([], '3'), 1);
  equal(strComparer.distance([1, 2], '3'), 3);

  equal(strComparer.distance('', ''), 0);
  equal(strComparer.distance('foo', 'foo'), 0);
  equal(strComparer.distance('foo   ', 'foo   '), 0);

  equal(strComparer.distance('', ' '), 1);
  equal(strComparer.distance('foo', 'fo!'), 1);
  equal(strComparer.distance('foo', 'foo!'), 1);
  equal(strComparer.distance('foo!', 'foo'), 1);

  equal(strComparer.distance('foo', 'foo!!'), 2);
  equal(strComparer.distance('!!foo', 'foo'), 2);
  equal(strComparer.distance('foo!!', 'foo'), 2);
  equal(strComparer.distance(' foo ', 'foo'), 2);

  equal(strComparer.distance('foo ', ''), 4);
  equal(strComparer.distance('foo ', 'bar'), 4);
});


test('distance (words)', function () {
  equal(wordComparer.distance('', ''), 0);
  equal(wordComparer.distance(' ', ' '), 0);
  equal(wordComparer.distance('     ', '     '), 0);
  equal(wordComparer.distance('fo   o', 'fo o'), 0);
  equal(wordComparer.distance('    fo   o', ' fo o'), 0);
  equal(wordComparer.distance('    fo   o  ', ' fo o    '), 0);
  equal(wordComparer.distance('foo      bar', 'foo    bar'), 0);

  equal(wordComparer.distance('foo', 'bar'), 1);
  equal(wordComparer.distance('foo', 'foo  '), 1);
  equal(wordComparer.distance('foo bar', 'bar'), 1);
  equal(wordComparer.distance('foo      bar', 'foo'), 1);

  equal(wordComparer.distance(' foo ', 'foo'), 2);
  equal(wordComparer.distance('foo      bar', 'foo '), 1);
  equal(wordComparer.distance('foo bar', ' bar '), 2);
});


test('similarity (words)', function () {
  equal(wordComparer.similarity('a b c d e f g h', ''), 0);
  equal(wordComparer.similarity('a b c d e f g h', 'a'), 0.125);
  equal(wordComparer.similarity('a b c d e f g h', 'a b'), 0.25);
  equal(wordComparer.similarity('a b c d e f g h', 'a b c'), 0.375);
  equal(wordComparer.similarity('a b c d e f g h', 'a b c d'), 0.5);
  equal(wordComparer.similarity('a b c d e f g h', 'a b c d e'), 0.625);
  equal(wordComparer.similarity('a b c d e f g h', 'a b c d e f'), 0.75);
  equal(wordComparer.similarity('a b c d e f g h', 'a b c d e f g'), 0.875);
  equal(wordComparer.similarity('a b c d e f g h', 'a b c d e f g h'), 1);

  equal(wordComparer.similarity('foo', 'bar'), 0);
  equal(wordComparer.similarity('foo ', ' bar'), 0);
  equal(wordComparer.similarity('foo bar baz blah', '      '), 0);

  equal(wordComparer.similarity(' a b c d e f g h', ' '),
                                0.11111111111111116);

  equal(wordComparer.similarity('foo bar baz ', ' '), 0.25);
  equal(wordComparer.similarity('foo bar baz blah', 'foo'), 0.25);
  equal(wordComparer.similarity('foo bar    baz ', '     '), 0.25);

  equal(wordComparer.similarity('foo bar      ', 'foo foo'),
                                0.33333333333333337);

  equal(wordComparer.similarity('foo bar', 'bar'), 0.5);
  equal(wordComparer.similarity('foo bar', 'foo foo'), 0.5);
  equal(wordComparer.similarity(' foo ', ' bar    baz '), 0.5);

  equal(wordComparer.similarity(' foo ', ' bar '), 0.6666666666666667);
  equal(wordComparer.similarity('foo bar      ', 'foo foo '),
                                0.6666666666666667);
  equal(wordComparer.similarity('foo bar baz blah',
                                '      foo bar   baz      blah     '),
        0.6666666666666667);

  equal(wordComparer.similarity('foo bar baz blah', 'foo bar baz'), 0.75);

  equal(wordComparer.similarity('foo', 'foo'), 1);
  equal(wordComparer.similarity('  foo ', ' foo          '), 1);
});
