/* global $ JS_PAGE Cookies */

import './graphql/articles';
import './graphql/login';
import '../node_modules/popper.js/dist/popper.min.js';

$(document).ready(function() {
    let authorId = Cookies.get('authorId');
    if (typeof authorId !== 'undefined') {
        $('#login-logout').attr('href', 'logout.html').html('Logout');
    } else {
         $('#submit-article-link').attr('href', 'login.html');
    }
});

// import DarkSkyApi from '../node_modules/dark-sky-api/src/dark-sky-api';