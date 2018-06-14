/* global $ JS_PAGE Cookies */

var getAllArticles = '\n    query AllArticles {\n        allArticles {\n            id,\n            title,\n            createdAt,\n            updatedAt,\n            content\n        }\n    }\n';

var getArticle = '\n    query GetArticle($id: ID) {\n        Article(id: $id) {\n            title,\n            createdAt,\n            updatedAt,\n            content\n        }\n    }\n';

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
                var articles = response.data.allArticles.reverse();
                var html = '<div class="row">',
                    counter = 1;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var article = _step.value;

                        if (counter == 1) {
                            html += '\n                            <div class="col-md-8">\n                                <h2>\n                                    <a href="article_detail.html#' + article.id + '">\n                                        ' + article.title + '\n                                    </a>\n                                </h2>\n                                <p>' + article.content + '</p>\n                            </div>\n                        ';
                        } else if (counter == 2) {
                            html += '\n                            <div class="col-md-4">\n                                <h2>\n                                    <a href="article_detail.html#' + article.id + '">\n                                        ' + article.title + '\n                                    </a>\n                                </h2>\n                                <p>' + article.content + '</p>\n                            </div>\n                        ';
                        } else {
                            html += '\n                            <div class="col-md-6">\n                                <h2>\n                                    <a href="article_detail.html#' + article.id + '">\n                                        ' + article.title + '\n                                    </a>\n                                </h2>\n                                <p>' + article.content + '</p>\n                            </div>\n                        ';
                        }
                        if (counter % 2 == 0) {
                            html += '</div><div class="row">';
                        }
                        counter++;
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

                html += '</div>';
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

    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'logout_view') {
        Cookies.remove('authorId');
        Cookies.remove('token');
    }
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/*
 Copyright (C) Federico Zivolo 2018
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */var e = 'undefined' != typeof window && 'undefined' != typeof document;var t = ['Edge', 'Trident', 'Firefox'];var o = 0;for (var _n = 0; _n < t.length; _n += 1) {
  if (e && 0 <= navigator.userAgent.indexOf(t[_n])) {
    o = 1;break;
  }
}function n(e) {
  var t = !1;return function () {
    t || (t = !0, window.Promise.resolve().then(function () {
      t = !1, e();
    }));
  };
}function i(e) {
  var t = !1;return function () {
    t || (t = !0, setTimeout(function () {
      t = !1, e();
    }, o));
  };
}var r = e && window.Promise;var p = r ? n : i;function d(e) {
  return e && '[object Function]' === {}.toString.call(e);
}function s(e, t) {
  if (1 !== e.nodeType) return [];var o = getComputedStyle(e, null);return t ? o[t] : o;
}function f(e) {
  return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
}function a(e) {
  if (!e) return document.body;switch (e.nodeName) {case 'HTML':case 'BODY':
      return e.ownerDocument.body;case '#document':
      return e.body;}
  var _s = s(e),
      t = _s.overflow,
      o = _s.overflowX,
      n = _s.overflowY;

  return (/(auto|scroll|overlay)/.test(t + n + o) ? e : a(f(e))
  );
}var l = e && !!(window.MSInputMethodContext && document.documentMode);
var m = e && /MSIE 10/.test(navigator.userAgent);function h(e) {
  return 11 === e ? l : 10 === e ? m : l || m;
}function c(e) {
  if (!e) return document.documentElement;var t = h(10) ? document.body : null;var o = e.offsetParent;for (; o === t && e.nextElementSibling;) {
    o = (e = e.nextElementSibling).offsetParent;
  }var n = o && o.nodeName;return n && 'BODY' !== n && 'HTML' !== n ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === s(o, 'position') ? c(o) : o : e ? e.ownerDocument.documentElement : document.documentElement;
}function u(e) {
  var t = e.nodeName;
  return 'BODY' !== t && ('HTML' === t || c(e.firstElementChild) === e);
}function g(e) {
  return null === e.parentNode ? e : g(e.parentNode);
}function b(e, t) {
  if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      n = o ? e : t,
      i = o ? t : e,
      r = document.createRange();r.setStart(n, 0), r.setEnd(i, 0);var p = r.commonAncestorContainer;
  if (e !== p && t !== p || n.contains(i)) return u(p) ? p : c(p);var d = g(e);return d.host ? b(d.host, t) : b(e, g(t).host);
}function w(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var o = 'top' === t ? 'scrollTop' : 'scrollLeft',
      n = e.nodeName;if ('BODY' === n || 'HTML' === n) {
    var _t = e.ownerDocument.documentElement,
        _n2 = e.ownerDocument.scrollingElement || _t;return _n2[o];
  }return e[o];
}function y(e, t) {
  var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  var n = w(t, 'top'),
      i = w(t, 'left'),
      r = o ? -1 : 1;return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e;
}function E(e, t) {
  var o = 'x' === t ? 'Left' : 'Top',
      n = 'Left' == o ? 'Right' : 'Bottom';return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10);
}function x(e, t, o, n) {
  return Math.max(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], h(10) ? o['offset' + e] + n['margin' + ('Height' === e ? 'Top' : 'Left')] + n['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0);
}function v() {
  var e = document.body,
      t = document.documentElement,
      o = h(10) && getComputedStyle(t);return { height: x('Height', e, t, o), width: x('Width', e, t, o) };
}var O = Object.assign || function (e) {
  for (var t, o = 1; o < arguments.length; o++) {
    for (var n in t = arguments[o], t) {
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
  }return e;
};function L(e) {
  return O({}, e, { right: e.left + e.width, bottom: e.top + e.height });
}function S(e) {
  var t = {};try {
    if (h(10)) {
      t = e.getBoundingClientRect();var _o = w(e, 'top'),
          _n3 = w(e, 'left');t.top += _o, t.left += _n3, t.bottom += _o, t.right += _n3;
    } else t = e.getBoundingClientRect();
  } catch (t) {}var o = { left: t.left, top: t.top, width: t.right - t.left, height: t.bottom - t.top },
      n = 'HTML' === e.nodeName ? v() : {},
      i = n.width || e.clientWidth || o.right - o.left,
      r = n.height || e.clientHeight || o.bottom - o.top;var p = e.offsetWidth - i,
      d = e.offsetHeight - r;if (p || d) {
    var _t2 = s(e);p -= E(_t2, 'x'), d -= E(_t2, 'y'), o.width -= p, o.height -= d;
  }return L(o);
}function T(e, t) {
  var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  var n = Math.max;var i = h(10),
      r = 'HTML' === t.nodeName,
      p = S(e),
      d = S(t),
      f = a(e),
      l = s(t),
      m = parseFloat(l.borderTopWidth, 10),
      c = parseFloat(l.borderLeftWidth, 10);o && 'HTML' === t.nodeName && (d.top = n(d.top, 0), d.left = n(d.left, 0));var u = L({ top: p.top - d.top - m, left: p.left - d.left - c, width: p.width, height: p.height });if (u.marginTop = 0, u.marginLeft = 0, !i && r) {
    var _e = parseFloat(l.marginTop, 10),
        _t3 = parseFloat(l.marginLeft, 10);u.top -= m - _e, u.bottom -= m - _e, u.left -= c - _t3, u.right -= c - _t3, u.marginTop = _e, u.marginLeft = _t3;
  }return (i && !o ? t.contains(f) : t === f && 'BODY' !== f.nodeName) && (u = y(u, t)), u;
}function D(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var o = Math.max;var n = e.ownerDocument.documentElement,
      i = T(e, n),
      r = o(n.clientWidth, window.innerWidth || 0),
      p = o(n.clientHeight, window.innerHeight || 0),
      d = t ? 0 : w(n),
      s = t ? 0 : w(n, 'left'),
      f = { top: d - i.top + i.marginTop, left: s - i.left + i.marginLeft, width: r, height: p };return L(f);
}function N(e) {
  var t = e.nodeName;return 'BODY' === t || 'HTML' === t ? !1 : !('fixed' !== s(e, 'position')) || N(f(e));
}function C(e) {
  if (!e || !e.parentElement || h()) return document.documentElement;var t = e.parentElement;for (; t && 'none' === s(t, 'transform');) {
    t = t.parentElement;
  }return t || document.documentElement;
}function P(e, t, o, n) {
  var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
  var r = { top: 0, left: 0 };var p = i ? C(e) : b(e, t);if ('viewport' === n) r = D(p, i);else {
    var _o2 = void 0;'scrollParent' === n ? (_o2 = a(f(t)), 'BODY' === _o2.nodeName && (_o2 = e.ownerDocument.documentElement)) : 'window' === n ? _o2 = e.ownerDocument.documentElement : _o2 = n;var _d = T(_o2, p, i);if ('HTML' === _o2.nodeName && !N(p)) {
      var _v = v(),
          _e2 = _v.height,
          _t4 = _v.width;

      r.top += _d.top - _d.marginTop, r.bottom = _e2 + _d.top, r.left += _d.left - _d.marginLeft, r.right = _t4 + _d.left;
    } else r = _d;
  }return r.left += o, r.top += o, r.right -= o, r.bottom -= o, r;
}function B(_ref) {
  var e = _ref.width,
      t = _ref.height;
  return e * t;
}function H(e, t, o, n, i) {
  var r = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  if (-1 === e.indexOf('auto')) return e;var p = P(o, n, r, i),
      d = { top: { width: p.width, height: t.top - p.top }, right: { width: p.right - t.right, height: p.height }, bottom: { width: p.width, height: p.bottom - t.bottom }, left: { width: t.left - p.left, height: p.height } },
      s = Object.keys(d).map(function (e) {
    return O({ key: e }, d[e], { area: B(d[e]) });
  }).sort(function (e, t) {
    return t.area - e.area;
  }),
      f = s.filter(function (_ref2) {
    var e = _ref2.width,
        t = _ref2.height;
    return e >= o.clientWidth && t >= o.clientHeight;
  }),
      a = 0 < f.length ? f[0].key : s[0].key,
      l = e.split('-')[1];return a + (l ? '-' + l : '');
}function W(e, t, o) {
  var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var i = n ? C(t) : b(t, o);return T(o, i, n);
}function k(e) {
  var t = getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      n = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      i = { width: e.offsetWidth + n, height: e.offsetHeight + o };return i;
}function A(e) {
  var t = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };return e.replace(/left|right|bottom|top/g, function (e) {
    return t[e];
  });
}function M(e, t, o) {
  o = o.split('-')[0];var n = k(e),
      i = { width: n.width, height: n.height },
      r = -1 !== ['right', 'left'].indexOf(o),
      p = r ? 'top' : 'left',
      d = r ? 'left' : 'top',
      s = r ? 'height' : 'width',
      f = r ? 'width' : 'height';return i[p] = t[p] + t[s] / 2 - n[s] / 2, i[d] = o === d ? t[d] - n[f] : t[A(d)], i;
}function F(e, t) {
  return Array.prototype.find ? e.find(t) : e.filter(t)[0];
}function I(e, t, o) {
  if (Array.prototype.findIndex) return e.findIndex(function (e) {
    return e[t] === o;
  });var n = F(e, function (e) {
    return e[t] === o;
  });return e.indexOf(n);
}function R(e, t, o) {
  var n = void 0 === o ? e : e.slice(0, I(e, 'name', o));return n.forEach(function (e) {
    e['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var o = e['function'] || e.fn;e.enabled && d(o) && (t.offsets.popper = L(t.offsets.popper), t.offsets.reference = L(t.offsets.reference), t = o(t, e));
  }), t;
}function U() {
  if (this.state.isDestroyed) return;var e = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };e.offsets.reference = W(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = H(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = M(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = R(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
}function Y(e, t) {
  return e.some(function (_ref3) {
    var e = _ref3.name,
        o = _ref3.enabled;
    return o && e === t;
  });
}function K(e) {
  var t = [!1, 'ms', 'Webkit', 'Moz', 'O'],
      o = e.charAt(0).toUpperCase() + e.slice(1);for (var _n4 = 0; _n4 < t.length; _n4++) {
    var _i = t[_n4],
        _r = _i ? '' + _i + o : e;if ('undefined' != typeof document.body.style[_r]) return _r;
  }return null;
}function j() {
  return this.state.isDestroyed = !0, Y(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[K('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}function q(e) {
  var t = e.ownerDocument;return t ? t.defaultView : window;
}function G(e, t, o, n) {
  var i = 'BODY' === e.nodeName,
      r = i ? e.ownerDocument.defaultView : e;r.addEventListener(t, o, { passive: !0 }), i || G(a(r.parentNode), t, o, n), n.push(r);
}function z(e, t, o, n) {
  o.updateBound = n, q(e).addEventListener('resize', o.updateBound, { passive: !0 });var i = a(e);return G(i, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = i, o.eventsEnabled = !0, o;
}function V() {
  this.state.eventsEnabled || (this.state = z(this.reference, this.options, this.state, this.scheduleUpdate));
}function _(e, t) {
  return q(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
    e.removeEventListener('scroll', t.updateBound);
  }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
}function X() {
  this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = _(this.reference, this.state));
}function Q(e) {
  return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
}function J(e, t) {
  Object.keys(t).forEach(function (o) {
    var n = '';-1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Q(t[o]) && (n = 'px'), e.style[o] = t[o] + n;
  });
}function Z(e, t) {
  Object.keys(t).forEach(function (o) {
    var n = t[o];!1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
  });
}function $$1(e) {
  return J(e.instance.popper, e.styles), Z(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && J(e.arrowElement, e.arrowStyles), e;
}function ee(e, t, o, n, i) {
  var r = W(i, t, e, o.positionFixed),
      p = H(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);return t.setAttribute('x-placement', p), J(t, { position: o.positionFixed ? 'fixed' : 'absolute' }), o;
}function te(e, t) {
  var o = Math.round,
      n = Math.floor;var i = t.x,
      r = t.y,
      p = e.offsets.popper,
      d = F(e.instance.modifiers, function (e) {
    return 'applyStyle' === e.name;
  }).gpuAcceleration;
  void 0 !== d && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s = void 0 === d ? t.gpuAcceleration : d,
      f = c(e.instance.popper),
      a = S(f),
      l = { position: p.position },
      m = { left: n(p.left), top: o(p.top), bottom: o(p.bottom), right: n(p.right) },
      h = 'bottom' === i ? 'top' : 'bottom',
      u = 'right' === r ? 'left' : 'right',
      g = K('transform');var b = void 0,
      w = void 0;if (w = 'bottom' == h ? -a.height + m.bottom : m.top, b = 'right' == u ? -a.width + m.right : m.left, s && g) l[g] = 'translate3d(' + b + 'px, ' + w + 'px, 0)', l[h] = 0, l[u] = 0, l.willChange = 'transform';else {
    var _e3 = 'bottom' == h ? -1 : 1,
        _t5 = 'right' == u ? -1 : 1;l[h] = w * _e3, l[u] = b * _t5, l.willChange = h + ', ' + u;
  }var y = { "x-placement": e.placement };return e.attributes = O({}, y, e.attributes), e.styles = O({}, l, e.styles), e.arrowStyles = O({}, e.offsets.arrow, e.arrowStyles), e;
}function oe(e, t, o) {
  var n = F(e, function (_ref4) {
    var e = _ref4.name;
    return e === t;
  }),
      i = !!n && e.some(function (e) {
    return e.name === o && e.enabled && e.order < n.order;
  });if (!i) {
    var _e4 = '`' + t + '`',
        _n5 = '`' + o + '`';console.warn(_n5 + ' modifier is required by ' + _e4 + ' modifier in order to work, be sure to include it before ' + _e4 + '!');
  }return i;
}function ne(e, t) {
  var _e$offsets$arrow;

  if (!oe(e.instance.modifiers, 'arrow', 'keepTogether')) return e;var o = t.element;if ('string' == typeof o) {
    if (o = e.instance.popper.querySelector(o), !o) return e;
  } else if (!e.instance.popper.contains(o)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;var n = e.placement.split('-')[0],
      _e$offsets = e.offsets,
      i = _e$offsets.popper,
      r = _e$offsets.reference,
      p = -1 !== ['left', 'right'].indexOf(n),
      d = p ? 'height' : 'width',
      f = p ? 'Top' : 'Left',
      a = f.toLowerCase(),
      l = p ? 'left' : 'top',
      m = p ? 'bottom' : 'right',
      h = k(o)[d];r[m] - h < i[a] && (e.offsets.popper[a] -= i[a] - (r[m] - h)), r[a] + h > i[m] && (e.offsets.popper[a] += r[a] + h - i[m]), e.offsets.popper = L(e.offsets.popper);var c = r[a] + r[d] / 2 - h / 2,
      u = s(e.instance.popper),
      g = parseFloat(u['margin' + f], 10),
      b = parseFloat(u['border' + f + 'Width'], 10);var w = c - e.offsets.popper[a] - g - b;return w = Math.max(Math.min(i[d] - h, w), 0), e.arrowElement = o, e.offsets.arrow = (_e$offsets$arrow = {}, defineProperty(_e$offsets$arrow, a, Math.round(w)), defineProperty(_e$offsets$arrow, l, ''), _e$offsets$arrow), e;
}function ie(e) {
  if ('end' === e) return 'start';return 'start' === e ? 'end' : e;
}var re = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];var pe = re.slice(3);function de(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var o = pe.indexOf(e),
      n = pe.slice(o + 1).concat(pe.slice(0, o));return t ? n.reverse() : n;
}var se = { FLIP: 'flip', CLOCKWISE: 'clockwise', COUNTERCLOCKWISE: 'counterclockwise' };function fe(e, t) {
  if (Y(e.instance.modifiers, 'inner')) return e;if (e.flipped && e.placement === e.originalPlacement) return e;var o = P(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed);var n = e.placement.split('-')[0],
      i = A(n),
      r = e.placement.split('-')[1] || '',
      p = [];switch (t.behavior) {case se.FLIP:
      p = [n, i];break;case se.CLOCKWISE:
      p = de(n);break;case se.COUNTERCLOCKWISE:
      p = de(n, !0);break;default:
      p = t.behavior;}return p.forEach(function (d, s) {
    if (n !== d || p.length === s + 1) return e;n = e.placement.split('-')[0], i = A(n);var f = e.offsets.popper,
        a = e.offsets.reference,
        l = Math.floor,
        m = 'left' === n && l(f.right) > l(a.left) || 'right' === n && l(f.left) < l(a.right) || 'top' === n && l(f.bottom) > l(a.top) || 'bottom' === n && l(f.top) < l(a.bottom),
        h = l(f.left) < l(o.left),
        c = l(f.right) > l(o.right),
        u = l(f.top) < l(o.top),
        g = l(f.bottom) > l(o.bottom),
        b = 'left' === n && h || 'right' === n && c || 'top' === n && u || 'bottom' === n && g,
        w = -1 !== ['top', 'bottom'].indexOf(n),
        y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && u || !w && 'end' === r && g);(m || b || y) && (e.flipped = !0, (m || b) && (n = p[s + 1]), y && (r = ie(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = O({}, e.offsets.popper, M(e.instance.popper, e.offsets.reference, e.placement)), e = R(e.instance.modifiers, e, 'flip'));
  }), e;
}function ae(e) {
  var _e$offsets2 = e.offsets,
      t = _e$offsets2.popper,
      o = _e$offsets2.reference,
      n = e.placement.split('-')[0],
      i = Math.floor,
      r = -1 !== ['top', 'bottom'].indexOf(n),
      p = r ? 'right' : 'bottom',
      d = r ? 'left' : 'top',
      s = r ? 'width' : 'height';
  return t[p] < i(o[d]) && (e.offsets.popper[d] = i(o[d]) - t[s]), t[d] > i(o[p]) && (e.offsets.popper[d] = i(o[p])), e;
}function le(e, t, o, n) {
  var i = Math.max;var r = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      p = +r[1],
      d = r[2];if (!p) return e;if (0 === d.indexOf('%')) {
    var _e5 = void 0;switch (d) {case '%p':
        _e5 = o;break;case '%':case '%r':default:
        _e5 = n;}var _i2 = L(_e5);return _i2[t] / 100 * p;
  }if ('vh' === d || 'vw' === d) {
    var _e6 = void 0;return _e6 = 'vh' === d ? i(document.documentElement.clientHeight, window.innerHeight || 0) : i(document.documentElement.clientWidth, window.innerWidth || 0), _e6 / 100 * p;
  }return p;
}function me(e, t, o, n) {
  var i = [0, 0],
      r = -1 !== ['right', 'left'].indexOf(n),
      p = e.split(/(\+|\-)/).map(function (e) {
    return e.trim();
  }),
      d = p.indexOf(F(p, function (e) {
    return -1 !== e.search(/,|\s/);
  }));p[d] && -1 === p[d].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var s = /\s*,\s*|\s+/;var f = -1 === d ? [p] : [p.slice(0, d).concat([p[d].split(s)[0]]), [p[d].split(s)[1]].concat(p.slice(d + 1))];return f = f.map(function (e, n) {
    var i = (1 === n ? !r : r) ? 'height' : 'width';var p = !1;return e.reduce(function (e, t) {
      return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
    }, []).map(function (e) {
      return le(e, i, t, o);
    });
  }), f.forEach(function (e, t) {
    e.forEach(function (o, n) {
      Q(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1));
    });
  }), i;
}function he(e, _ref5) {
  var t = _ref5.offset;
  var o = e.placement,
      _e$offsets3 = e.offsets,
      n = _e$offsets3.popper,
      i = _e$offsets3.reference,
      r = o.split('-')[0];
  var p = void 0;return p = Q(+t) ? [+t, 0] : me(t, n, i, r), 'left' === r ? (n.top += p[0], n.left -= p[1]) : 'right' === r ? (n.top += p[0], n.left += p[1]) : 'top' === r ? (n.left += p[0], n.top -= p[1]) : 'bottom' === r && (n.left += p[0], n.top += p[1]), e.popper = n, e;
}function ce(e, t) {
  var o = t.boundariesElement || c(e.instance.popper);e.instance.reference === o && (o = c(o));var n = K('transform'),
      i = e.instance.popper.style,
      r = i.top,
      p = i.left,
      d = i[n];i.top = '', i.left = '', i[n] = '';var s = P(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);i.top = r, i.left = p, i[n] = d, t.boundaries = s;var f = t.priority;var a = e.offsets.popper;var l = {
    primary: function primary(e) {
      var o = a[e];return a[e] < s[e] && !t.escapeWithReference && (o = Math.max(a[e], s[e])), defineProperty({}, e, o);
    },
    secondary: function secondary(e) {
      var o = 'right' === e ? 'left' : 'top';var n = a[o];return a[e] > s[e] && !t.escapeWithReference && (n = Math.min(a[o], s[e] - ('right' === e ? a.width : a.height))), defineProperty({}, o, n);
    }
  };return f.forEach(function (e) {
    var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';a = O({}, a, l[t](e));
  }), e.offsets.popper = a, e;
}function ue(e) {
  var t = e.placement,
      o = t.split('-')[0],
      n = t.split('-')[1];if (n) {
    var _e$offsets4 = e.offsets,
        _t6 = _e$offsets4.reference,
        _i3 = _e$offsets4.popper,
        _r2 = -1 !== ['bottom', 'top'].indexOf(o),
        _p = _r2 ? 'left' : 'top',
        _d2 = _r2 ? 'width' : 'height',
        _s2 = { start: defineProperty({}, _p, _t6[_p]), end: defineProperty({}, _p, _t6[_p] + _t6[_d2] - _i3[_d2]) };

    e.offsets.popper = O({}, _i3, _s2[n]);
  }return e;
}function ge(e) {
  if (!oe(e.instance.modifiers, 'hide', 'preventOverflow')) return e;var t = e.offsets.reference,
      o = F(e.instance.modifiers, function (e) {
    return 'preventOverflow' === e.name;
  }).boundaries;if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
    if (!0 === e.hide) return e;e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
  } else {
    if (!1 === e.hide) return e;e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
  }return e;
}function be(e) {
  var t = e.placement,
      o = t.split('-')[0],
      _e$offsets5 = e.offsets,
      n = _e$offsets5.popper,
      i = _e$offsets5.reference,
      r = -1 !== ['left', 'right'].indexOf(o),
      p = -1 === ['top', 'left'].indexOf(o);return n[r ? 'left' : 'top'] = i[o] - (p ? n[r ? 'width' : 'height'] : 0), e.placement = A(t), e.offsets.popper = L(n), e;
}var we = { shift: { order: 100, enabled: !0, fn: ue }, offset: { order: 200, enabled: !0, fn: he, offset: 0 }, preventOverflow: { order: 300, enabled: !0, fn: ce, priority: ['left', 'right', 'top', 'bottom'], padding: 5, boundariesElement: 'scrollParent' }, keepTogether: { order: 400, enabled: !0, fn: ae }, arrow: { order: 500, enabled: !0, fn: ne, element: '[x-arrow]' }, flip: { order: 600, enabled: !0, fn: fe, behavior: 'flip', padding: 5, boundariesElement: 'viewport' }, inner: { order: 700, enabled: !1, fn: be }, hide: { order: 800, enabled: !0, fn: ge }, computeStyle: { order: 850, enabled: !0, fn: te, gpuAcceleration: !0, x: 'bottom', y: 'right' }, applyStyle: { order: 900, enabled: !0, fn: $$1, onLoad: ee, gpuAcceleration: void 0 } };
var ye = { placement: 'bottom', positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function onCreate() {}, onUpdate: function onUpdate() {}, modifiers: we };
var Ee = function () {
  function Ee(e, t) {
    var _this = this;

    var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Ee);
    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }, this.update = p(this.update.bind(this)), this.options = O({}, Ee.Defaults, o), this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }, this.reference = e && e.jquery ? e[0] : e, this.popper = t && t.jquery ? t[0] : t, this.options.modifiers = {}, Object.keys(O({}, Ee.Defaults.modifiers, o.modifiers)).forEach(function (e) {
      _this.options.modifiers[e] = O({}, Ee.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {});
    }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
      return O({ name: e }, _this.options.modifiers[e]);
    }).sort(function (e, t) {
      return e.order - t.order;
    }), this.modifiers.forEach(function (e) {
      e.enabled && d(e.onLoad) && e.onLoad(_this.reference, _this.popper, _this.options, e, _this.state);
    }), this.update();var n = this.options.eventsEnabled;n && this.enableEventListeners(), this.state.eventsEnabled = n;
  }

  createClass(Ee, [{
    key: 'update',
    value: function update() {
      return U.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      return j.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners() {
      return V.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners() {
      return X.call(this);
    }
  }]);
  return Ee;
}();

Ee.Utils = ('undefined' == typeof window ? global : window).PopperUtils, Ee.placements = re, Ee.Defaults = ye;

/* global $ JS_PAGE Cookies */

$(document).ready(function () {
    var authorId = Cookies.get('authorId');
    if (typeof authorId !== 'undefined') {
        $('#login-logout').attr('href', 'logout.html').html('Logout');
    } else {
        $('#submit-article-link').attr('href', 'login.html');
    }
});

// import DarkSkyApi from '../node_modules/dark-sky-api/src/dark-sky-api';
