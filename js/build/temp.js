/* global $ JS_PAGE Cookies */

var getAllArticles = '\n    query AllArticles {\n        allArticles {\n            id,\n            title,\n            content\n        }\n    }\n';

var getArticle = '\n    query GetArticle($id: ID) {\n        Article(id: $id) {\n            title,\n            content\n        }\n    }\n';

var CreateArticle = '\n    mutation CreateArticle($authorId: ID!, $title: String!, $content: String) {\n        createArticle(authorId: $authorId, title: $title, content: $content) {\n            id,\n            title\n        }\n    }\n';

$(document).ready(function () {
    // List View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'list_view') {
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
            data: JSON.stringify({
                query: getAllArticles
            }),
            success: function success(response) {
                var articles = response.data.allArticles;
                var html = '';
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var article = _step.value;

                        html += '\n                        <h2>\n                            <a href="article_detail.html#' + article.id + '">\n                                ' + article.title + '\n                            </a>\n                        </h2>\n                        <p>' + article.content + '</p>\n                    ';
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
    }

    // Detail View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'detail_view') {
        var article_id = window.location.hash.substring(1);
        console.log('Article id is? ' + article_id);
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
            data: JSON.stringify({
                query: getArticle,
                variables: {
                    id: article_id
                }
            }),
            success: function success(response) {
                var article = response.data.Article;
                $('#article-title').html(article.title);
                $('#article-content').html(article.content);
            },
            contentType: 'application/json'
        });
    }

    // Form View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'form_view') {
        $('#save-article-button').on('click', function (event) {
            event.preventDefault();
            var title = $('#title').val(),
                content = $('#content').val(),
                authorId = Cookies.get('authorId');

            $.post({
                url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
                data: JSON.stringify({
                    query: CreateArticle,
                    variables: {
                        title: title,
                        content: content,
                        authorId: authorId
                    }
                }),
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token')
                },
                success: function success(response) {
                    var article = response.data.createArticle;
                    window.location = 'article_detail.html#' + article.id;
                },
                contentType: 'application/json'
            });
        });
    }
});

/* global $ JS_PAGE Cookies */

var loginMutation = '\n    mutation AuthenticateUser($email: String!, $password: String!) {\n        authenticateUser(email: $email, password: $password) {\n            id,\n            token\n        }\n    }';

$(document).ready(function () {
    // Login View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'login_view') {
        $('#login-button').on('click', function (event) {
            event.preventDefault();
            var username = $('#username').val(),
                password = $('#password').val();

            $.post({
                url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
                data: JSON.stringify({
                    query: loginMutation,
                    variables: {
                        email: username,
                        password: password
                    }
                }),
                success: function success(response) {
                    var user = response.data.authenticateUser;
                    if (user === null) {
                        alert('Login failed! Try again.');
                    } else {
                        Cookies.set('authorId', user.id, { expires: 7 });
                        Cookies.set('token', user.token, { expires: 7 });
                        // Redirect 
                        window.location = 'article_form.html';
                    }
                },
                contentType: 'application/json'
            });
        });
    }
});
