Levenshtein.js
==============

Levenshtein.js is a JavaScript library implementing the [Levenshtein
distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance).

It can operate on strings or words, and it can calculate the edit distance
as well as a normalized similarity.


Usage
=====

A Levenshtein comparer object needs to be created in order to use the
relevant methods. By default it operates on strings:

```
var strComparer = new Levenshtein();
strComparer.distance('A purple cow', 'A red cow');
5
strComparer.similarity('A purple cow', 'A red cow');
0.5833333333333333
```

But it can be changed to operate on words:

```
var wordComparer = new Levenshtein({compare: 'words'});
wordComparer.distance('A purple cow', 'A red cow');
1
wordComparer.similarity('A purple cow', 'A red cow');
0.66666666666666675833333333333333
```


License
=======

MIT. See the LICENSE file for details.
