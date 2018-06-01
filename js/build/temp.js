/* global $ */

var getAllArticles = '\n    query AllArticles {\n      allArticles {\n        id,\n        title,\n        content\n      }\n    }\n';

$(document).ready(function () {
    $.post({
        url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
        data: JSON.stringify({
            query: getAllArticles
        }),
        success: function success(response) {
            var articles = response.data.allArticles;
            console.log(articles);
            var html = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var article = _step.value;

                    html += '<h2>' + article.title + '</h2>\n                         <p>' + article.content + '</p>';
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            $('#main-content').html(html);
        },
        contentType: 'application/json'
    });
});
