/* global $ */

let getAllArticles = `
    query AllArticles {
      allArticles {
        id,
        title,
        content
      }
    }
`;

$(document).ready(function() {
    // List View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'list_view') {
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
            data: JSON.stringify({
                query: getAllArticles
            }),
            success: (response) => {
                let articles = response.data.allArticles;
                console.log(articles);
                let html = '';
                for (let article of articles) {
                    html += `<h2>${article.title}</h2>
                             <p>${article.content}</p>`;
                }
                $('#main-content').html(html);
            },
            contentType: 'application/json'
        });
    }
});
