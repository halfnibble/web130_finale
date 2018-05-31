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
    $.post({
        type: "POST",
        url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
        data: JSON.stringify({
            query: getAllArticles
        }),
        success: (response) => {
            console.log(response);
        },
        contentType: 'application/json'
    });
});