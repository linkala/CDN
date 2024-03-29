/* Files App 0.2.1 - https://files.photo.gallery/ */ ! function(e) {
	function t(e) {
		return e ? e.replace(/"/g, "&quot;") : ""
	}

	function i(e) {
		return e ? e.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
	}

	function a(e, t, i, a) {
		return e && e.exif && e.exif.gps && Array.isArray(e.exif.gps) ? g(E.get_svg("marker") + U("google maps", i), "a", t, U("google maps", a), (n = e.exif.gps, Array.isArray(n) ? "https://www.google.com/maps/search/?api=1&query=" + n : "#")) : "";
		var n
	}

	function n(e, t) {
		var i = !!e.url_path && encodeURI(e.url_path);
		return "dir" === e.filetype ? i || "#" : !i || t && ["php", "htaccess"].includes(e.ext) || _c.load_files_proxy_php ? _c.script + (t ? "?download=" : "?file=") + encodeURIComponent(e.path) : i
	}

	function o(e) {
		var t = new URL(e, location);
		return !!t && x(t.href)
	}

	function l(e) {
		for (; e.firstChild;) e.removeChild(e.firstChild)
	}

	function p(e, t) {
		e.length && V(e, (function(e) {
			(t || e.parentNode).removeChild(e)
		}))
	}

	function s(e, t, i) {
		b(e, (function(e) {
			var i = e.target.dataset.action;
			i && t(i, e)
		}), "click", !1, i)
	}

	function c(e, t, i, a) {
		if (!e || !e.width || !e.height) return "";
		var n = e.width + " x " + e.height;
		return a && (n = g(n, "span", !1, G("image dimensions"))), g(n, t, i)
	}

	function r(e, t, i, a) {
		var n = e.dirsize || e.filesize;
		if (!n) return "";
		var o = filesize(n);
		return a && (o = g(o, "span", !1, G("file size"))), g(o, t, i)
	}

	function d(e, t, i) {
		return _c.context_menu && e ? '<button class="context-button' + (t ? " " + t : "") + '" data-action="context"' + f(!!i && G("options")) + ">" + E.get_svg_multi("dots", "minus") + "</button>" : ""
	}

	function m(e, t, i, a) {
		if (!e || !e.iptc) return "";
		var n = M(a || ["title", "description", "keywords"], (function(i, a) {
			var n = e.iptc[i];
			if (n) return "keywords" === i && Array.isArray(n) && (n = n.join(", ")), g(n, "div", t ? t + "-" + i : i)
		}));
		return i ? g(n, "div", t + "-iptc") : n
	}
	var u = ["Model", "ApertureFNumber", "FocalLength", "ExposureTime", "ISOSpeedRatings", "gps"];

	function v(e, t, i, n) {
		return e && e.exif ? g(M(u, (function(t) {
			var i = e.exif[t];
			if (!i) return "";
			if ("Model" === t) i = E.get_svg(i.toLowerCase().indexOf("phone") > -1 ? "cellphone" : "camera") + i;
			else if ("FocalLength" === t) {
				var o = i.split("/");
				2 === o.length && (i = (o[0] / o[1]).toFixed(1) + "<small>mm</small>")
			} else "ISOSpeedRatings" === t ? i = "<small>ISO</small>" + i : "gps" === t && (i = a(e, "google-maps-link", !1, !0));
			return n && "gps" !== t && (i = g(i, "span", null, G(t))), g(i, "span", "exif-item exif-" + t)
		})), t, i) : ""
	}

	function f(e) {
		return e && W.is_pointer ? ' data-tooltip="' + e + '"' : ""
	}

	function g(e, t, i, a, n, o) {
		return e ? t ? "<" + t + (p = "class", (l = i) ? " " + p + '="' + l + '"' : "") + f(a) + (n ? ' href="' + n + '" target="_blank"' + (o ? " download" : "") : "") + ">" + e + "</" + t + ">" : e : "";
		var l, p
	}

	function x(e) {
		if (navigator.clipboard) return navigator.clipboard.writeText(e);
		var t = document.createElement("span");
		t.textContent = e, t.style.whiteSpace = "pre", document.body.appendChild(t);
		var i = window.getSelection(),
			a = window.document.createRange();
		i.removeAllRanges(), a.selectNode(t), i.addRange(a);
		var n = !1;
		try {
			n = window.document.execCommand("copy")
		} catch (e) {
			console.log("error", e)
		}
		return i.removeAllRanges(), window.document.body.removeChild(t), n ? Promise.resolve() : Promise.reject()
	}

	function h(e, t, i, a, n) {
		e.classList.add(t), i && (e.disabled = i), setTimeout((function() {
			e.classList.remove([t]), i && (e.disabled = !1)
		}), a || 2e3)
	}

	function _(e, t, i) {
		if (i || e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
			var a = !!t && t.getAttribute("href");
			if (a && "#" !== a) return t.contains(e.target) || t.click(), !0
		}
		e.preventDefault()
	}

	function b(e, t, i, a, n) {
		e.addEventListener(i || "click", w(t, n)), a && t()
	}

	function w(e, t) {
		return t ? function(a) {
			i || (e.apply(this, arguments), i = setTimeout((function() {
				i = null
			}), t))
		} : e;
		var i
	}

	function y(e, t) {
		var i;
		return function(a) {
			i && clearTimeout(i), i = setTimeout(e, t || 1e3, a)
		}
	}

	function H(e, t, i, a) {
		return a && (i = y(i, a)), e.addEventListener(t, i), {
			remove: function() {
				e.removeEventListener(t, i)
			}
		}
	}

	function k(e, t, i) {
		var a = i ? "add" : "remove";
		V(L(e, t, !i), (function(e) {
			e.classList[a](t)
		}))
	}

	function L(e, t, i) {
		return e.filter((function(e) {
			return i == e.classList.contains(t)
		}))
	}

	function V(e, t) {
		for (var i = e.length, a = 0; a < i; a++) t(e[a], a)
	}

	function M(e, t) {
		for (var i = "", a = e.length, n = 0; n < a; n++) i += t(e[n], n) || "";
		return i
	}

	function C(e, t) {
		for (var i = [], a = e.length, n = 0; n < a; n++) {
			var o = t(e[n], n);
			o && i.push(o)
		}
		return i
	}

	function z(e, t, i) {
		var a = new RegExp("[" + (i ? "#" : "?") + "&]" + e + (t ? "=([^&]*)" : "($|&|=)")),
			n = location[i ? "hash" : "search"].match(a);
		return !!n && (!t || n[1])
	}

	function j(e) {
		_c.debug && console.log.apply(this, arguments)
	}

	function A(e, t, i) {
		!!e.offsetParent != !!t && (e.style.display = t ? i ? "" : "block" : "none")
	}

	function T(e, t, i) {
		N.plugins.mousetrap.loaded && Mousetrap[3 === arguments.length ? "bind" : "unbind"].apply(null, arguments)
	}

	function S(e, t, i) {
		return !!W.local_storage && (void 0 === t ? localStorage.getItem(e) : !0 === t ? localStorage.removeItem(e) : void setTimeout((function() {
			try {
				localStorage.setItem(e, t)
			} catch (e) {
				j("failed to write localstorage", e, "warn")
			}
		}), i || 0))
	}

	function q(e) {
		var t = new XMLHttpRequest;
		t.onreadystatechange = function() {
			if (4 == t.readyState)
				if (200 == t.status) {
					var i = t.responseText,
						a = e.json_response,
						n = e.json_response ? function() {
							try {
								return JSON.parse(i)
							} catch (e) {
								return a = !1, i
							}
						}() : i;
					if (a && n.error && "login" === n.error) return confirm(G("You have been logged out.")), void location.reload();
					e.complete && e.complete(n, i, a);
					var o = !e.url && t.getResponseHeader("files-msg");
					o && j("XHR: files-msg: " + o)
				} else e.fail && e.fail(t)
		};
		var i = e.params ? e.params + (!e.url && _c.post_hash ? "&post_hash=" + _c.post_hash : "") : null;
		return t.open(i ? "POST" : "GET", e.url || _c.script), i && t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.url || t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.json_response && t.setRequestHeader("Accept", "application/json"), t.send(i || null), t
	}

	function I(e) {
		return _c.server_exif && e && e.exif && e.exif.Orientation && e.exif.Orientation > 4 && e.exif.Orientation < 9
	}

	function O(e) {
		return atob(e)
	}

	function Z(e, t, i, a) {
		var n = '<div class="modal fade" id="' + e + '" tabindex="-1" aria-labelledby="' + e + '-label" aria-hidden="true">\t\t  <div class="modal-dialog">\t\t    <div class="modal-content">\t\t      <div class="modal-body">' + i + "</div>\t\t      " + (a ? '<div class="modal-footer">' + a + "</div>" : "") + "\t\t    </div>\t\t  </div>\t\t</div>";
		document.body.insertAdjacentHTML("beforeend", n);
		var o = _id(e),
			l = new bootstrap.Modal(o);
		return b(o, (function(e) {
			l.dispose(), document.body.removeChild(o)
		}), "hidden.bs.modal"), l.show(), l
	}
	_id = document.getElementById.bind(document), _class = function(e, t) {
		return Array.from((t || document).getElementsByClassName(e))
	}, _tag = function(e, t) {
		return Array.from((t || document).getElementsByTagName(e))
	}, _query = function(e, t) {
		return (t || document).querySelector(e)
	}, _querya = function(e, t) {
		return Array.from((t || document).querySelectorAll(e))
	}, _c.debug = z("debug") || 0 === location.host.indexOf("localhost"), _c.files = {}, j("_c", _c);
	var E = {},
		N = {},
		R = {
			main: _id("main"),
			topbar: _id("topbar"),
			list: _id("list"),
			list_ul: _id("list-ul"),
			topbar_info: _id("topbar-info"),
			filter: _id("search"),
			pswp: _id("pswp"),
			modal: _id("files_modal"),
			modal_bg: _id("modal-bg")
		},
		W = {};

	function F(e, t) {
			if (t) {
				var i = t.split("/");
				if (!(i.length < 2 || i[0] !== e)) return W.hasOwnProperty(e) || (W[e] = function() {
					if ("audio" === e && !window.Audio) return !1;
					var t = "audio" === e ? ["mpeg", "mp4", "x-aiff", "ogg", "x-m4a", "aac", "webm", "wave", "wav", "x-wav", "x-pn-wav", "flac"] : ["mp4", "webm", "ogg", "3gp", "m4v", "x-m4v"];
					try {
						var i = document.createElement(e);
						if (!i.canPlayType) return !1;
						var a = t.filter((function(t) {
							return i.canPlayType(e + "/" + t).replace(/no/, "")
						}));
						return !!a.length && a
					} catch (e) {
						return !1
					}
				}()), !(!W[e] || !W[e].includes("x-flac" === i[1] ? "flac" : i[1])) && i[1]
			}
		}! function() {
			var e = W,
				t = document,
				i = navigator,
				a = window;
			e.explorer = /MSIE /.test(i.userAgent) || /Trident\//.test(i.userAgent);
			var n = !!(a.CSS && a.CSS.supports || a.supportsCSS);
			!e.explorer && n && CSS.supports("color", "var(--fake-var)") || (document.body.innerHTML = '<div class="alert alert-danger" role="alert"><h4 class="alert-heading">' + (e.explorer ? "Internet Explorer" : "This browser is") + ' not supported.</h4>Please use a modern browser like <a href="https://www.microsoft.com/en-us/windows/microsoft-edge" class="alert-link">Edge</a>, <a href="https://www.google.com/chrome/" class="alert-link">Chrome</a>, <a href="https://www.mozilla.org/firefox/" class="alert-link">Firefox</a>, <a href="https://www.opera.com/" class="alert-link">Opera</a> or <a href="https://www.apple.com/safari/" class="alert-link">Safari</a>.</div>', document.body.classList.remove("body-loading"), fail), e.local_storage = !!a.localStorage && function() {
				try {
					var e = "_t";
					return a.localStorage.setItem(e, e), a.localStorage.removeItem(e), !0
				} catch (e) {
					return !1
				}
			}(), e.is_touch = "ontouchstart" in a || i.maxTouchPoints > 0 || i.msMaxTouchPoints > 0 || window.DocumentTouch && document instanceof DocumentTouch || a.matchMedia("(any-pointer: coarse)").matches, e.is_pointer = !e.is_touch || matchMedia("(pointer:fine)").matches, e.pointer_events = !!("PointerEvent" in window), e.is_mac = i.platform.toUpperCase().indexOf("MAC") >= 0, e.scrollbar_width = e.is_pointer ? function() {
				R.modal_bg.style.cssText = "overflow:scroll;display:block";
				var e = R.modal_bg.offsetWidth - R.modal_bg.clientWidth;
				return R.modal_bg.style.cssText = "", e && document.documentElement.classList.add("has-scrollbars"), e
			}() : 0, e.pixel_ratio = a.devicePixelRatio || 1, e.download = "download" in t.createElement("a"), e.clipboard = !(!t.queryCommandSupported || !t.queryCommandSupported("copy")), e.url = !("function" != typeof URL), e.fullscreen = screenfull.isEnabled, e.image_orientation = CSS.supports("image-orientation", "from-image"), e.browser_images = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "svg+xml", "ico", "vnd.microsoft.icon", "x-icon"];
			var o = new Image;
			o.onload = o.onerror = function() {
				2 == o.height && e.browser_images.push("webp"), e.webp = 2 == o.height
			}, o.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA", e.history = !(!a.history || !history.pushState), e.history || (_c.history = !1)
		}(), j("tests", W),
		function() {
			if (W.local_storage) {
				var e = z("clearall", !0),
					t = !e && z("clear", !0),
					i = e || t;
				if (E.clean_localstorage = function() {
					if (!i) {
						var e = Object.keys(localStorage);
						e.length && V(e, (function(e) {
							if (e.startsWith("files:menu:")) localStorage.removeItem(e);
							else if (e.startsWith("files:dir:"))
								if (e.startsWith("files:dir:" + _c.dirs_hash)) {
									if (_c.menu_enabled) {
										var t = e.split(":"),
											i = t[3];
										if (_c.menu_max_depth && i.split("/").length >= _c.menu_max_depth) return;
										var a = parseInt(t[4]);
										_c.dirs[i] && _c.dirs[i].mtime == a || localStorage.removeItem(e)
									}
								} else localStorage.removeItem(e)
						}))
					}
				}, i) {
					var a = 0;
					V(Object.keys(localStorage), (function(t) {
						(e && t.startsWith("files:") || t.startsWith("files:menu:") || t.startsWith("files:dir:")) && (localStorage.removeItem(t), a++)
					})), j(a + " localStorage items cleared")
				} else _c.menu_enabled || E.clean_localstorage()
			}
		}(),
		function() {
			function e(e) {
				var t = S(e);
				if (t) try {
					return JSON.parse(t)
				} catch (e) {
					return
				}
			}
			var t = ["layout", "image_cover", "sort", "menu_show"],
				i = {};
			V(t, (function(e) {
				i[e] = _c[e]
			}));
			var a = e("files:options:" + _c.location_hash);
			a && V(Object.keys(a), (function(e) {
				_c.hasOwnProperty(e) && (_c[e] = a[e])
			})), E.set_option = function(e, a) {
				if (_c[e] !== a && (_c[e] = a, W.local_storage)) {
					var n = {};
					V(t, (function(e) {
						_c[e] !== i[e] && (n[e] = _c[e])
					})), S("files:options:" + _c.location_hash, !Object.keys(n).length || JSON.stringify(n), 100)
				}
			}, N.ls_options = e("files:ls_options") || {}, E.ls_option = function(e, t) {
				N.ls_options[e] = t, S("files:ls_options", !Object.keys(N.ls_options).length || JSON.stringify(N.ls_options), 100)
			}
		}();
	var P, B, D = {};

	function U(e, t) {
		return t ? G(e) : ""
	}

	function G(e, t, i) {
		return t && 1 === i && (e = t), D[e] || e
	}

	function X(e, t) {
			return "" === e && (e = "ROOT"), "files:dir:" + _c.dirs_hash + ":" + (e || _c.current_dir.path) + ":" + (t || _c.current_dir.mtime)
		}! function() {
			var e = "https://cdn.jsdelivr.net/npm/",
				t = "codemirror@5.57.0",
				i = "headroom.js@0.11.0",
				a = "mousetrap@1.6.5";

			function n(e) {
				e.loading = !1, e.loaded = !0, V(e.complete, (function(e) {
					e()
				})), delete e.complete, delete e.src
			}

			function o(t, i, a) {
				var n = 0;
				V(t, (function(o) {
					! function(t, i, a) {
						var n = "js" == a.type || "js" == t.slice(-2),
							o = document.createElement(n ? "script" : "link");
						o[n ? "src" : "href"] = t.startsWith("http") ? t : e + t, i && (o.onload = i);
						a.error && (o.onerror = a.error);
						n ? document.body.appendChild(o) : (o.type = "text/css", o.rel = "stylesheet", document.head.insertBefore(o, _tag("link", document.head)[0]))
					}(o, (function() {
						++n === t.length && i && i()
					}), a)
				}))
			}
			N.plugins = {
				codemirror: {
					src: [
						[t + "/lib/codemirror.min.js", t + "/lib/codemirror.css"],
						[t + "/mode/meta.js", t + "/addon/mode/loadmode.js"]
					],
					complete: [
						function() {
							CodeMirror.modeURL = e + t + "/mode/%N/%N.js"
						}
					]
				},
				headroom: {
					src: [i + "/dist/headroom.min.js"]
				},
				mousetrap: {
					src: [a + "/mousetrap.min.js"]
				},
				cGF5cGFs: {
					src: [O("aHR0cHM6Ly93d3cucGF5cGFsLmNvbS9zZGsvanM/Y2xpZW50LWlkPQ==") + (location.search.includes("sandbox") ? O("QWRETjBCNzJWSUlHQk5HZnpOTHpfT0YtVGJ6MkxYcnhQeFNTamduUllmVUJFRnJZckp3eWV4cGsyM1VsZHh4ZnNmN3FSU2dvZG9OS3g1bTY=") : O("QVJFNEg3UWNvWG1LS1dUZktrLXBYQW5zSWZXMVpveDNidXdLbWFfeS1tbjRSalFaalM4R2hwMS1KVXhjZXZua2w1S0kwdkwtVUlKLXVFZlU="))],
					type: "js"
				}
			}, E.load_plugin = function(e, t, i) {
				N.plugins[e] || (N.plugins[e] = {});
				var a = i ? Object.assign(N.plugins[e], i) : N.plugins[e];
				if (a.loaded) t && t();
				else if (a.loading) t && a.complete.push(t);
				else {
					a.loading = !0, a.complete || (a.complete = []), t && a.complete.push(t);
					var l = Array.isArray(a.src[0]);
					o(l ? a.src[0] : a.src, (function() {
						l ? o(a.src[1], (function() {
							n(a)
						}), a) : n(a)
					}), a)
				}
			}, E.load_plugin("mousetrap", (function() {
				Mousetrap.bind(["mod+f"], (function(e) {
					e.preventDefault(), N.headroom.pin(), R.filter.focus()
				}))
			})), "scroll" === _c.topbar_sticky && getComputedStyle(R.topbar).position.match("sticky") && E.load_plugin("headroom", (function() {
				Headroom.cutsTheMustard && (N.headroom = new Headroom(R.topbar, {
					tolerance: {
						down: 10,
						up: 20
					},
					offset: R.topbar.clientHeight
				}), N.headroom.init())
			}))
		}(),
		function() {
			var e = {
				application: '<path d="M35 14C36.11 14 37 14.9 37 16V28A2 2 0 0 1 35 30H21C19.89 30 19 29.1 19 28V16A2 2 0 0 1 21 14H35M35 28V18H21V28H35z"/>',
				archive: '<path d="M28.5,24v-2h2v-2h-2v-2h2v-2h-2v-2h2v-2h-2v-2h2V8h-2V6h-2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2 h-4v5c0,2.757,2.243,5,5,5s5-2.243,5-5v-5H28.5z M30.5,29c0,1.654-1.346,3-3,3s-3-1.346-3-3v-3h6V29z"/><path d="M26.5,30h2c0.552,0,1-0.447,1-1s-0.448-1-1-1h-2c-0.552,0-1,0.447-1,1S25.948,30,26.5,30z"/></g>',
				audio: '<path d="M35.67,14.986c-0.567-0.796-1.3-1.543-2.308-2.351c-3.914-3.131-4.757-6.277-4.862-6.738V5 c0-0.553-0.447-1-1-1s-1,0.447-1,1v1v8.359v9.053h-3.706c-3.882,0-6.294,1.961-6.294,5.117c0,3.466,2.24,5.706,5.706,5.706 c3.471,0,6.294-2.823,6.294-6.294V16.468l0.298,0.243c0.34,0.336,0.861,0.72,1.521,1.205c2.318,1.709,6.2,4.567,5.224,7.793 C35.514,25.807,35.5,25.904,35.5,26c0,0.43,0.278,0.826,0.71,0.957C36.307,26.986,36.404,27,36.5,27c0.43,0,0.826-0.278,0.957-0.71 C39.084,20.915,37.035,16.9,35.67,14.986z M26.5,27.941c0,2.368-1.926,4.294-4.294,4.294c-2.355,0-3.706-1.351-3.706-3.706 c0-2.576,2.335-3.117,4.294-3.117H26.5V27.941z M31.505,16.308c-0.571-0.422-1.065-0.785-1.371-1.081l-1.634-1.34v-3.473 c0.827,1.174,1.987,2.483,3.612,3.783c0.858,0.688,1.472,1.308,1.929,1.95c0.716,1.003,1.431,2.339,1.788,3.978 C34.502,18.515,32.745,17.221,31.505,16.308z"/>',
				cd: '<circle cx="27.5" cy="21" r="12"/><circle style="fill:#e9e9e0" cx="27.5" cy="21" r="3"/><path style="fill:#d3ccc9" d="M25.379,18.879c0.132-0.132,0.276-0.245,0.425-0.347l-2.361-8.813 c-1.615,0.579-3.134,1.503-4.427,2.796c-1.294,1.293-2.217,2.812-2.796,4.427l8.813,2.361 C25.134,19.155,25.247,19.011,25.379,18.879z"/><path style="fill:#d3ccc9" d="M30.071,23.486l2.273,8.483c1.32-0.582,2.56-1.402,3.641-2.484c1.253-1.253,2.16-2.717,2.743-4.275 l-8.188-2.194C30.255,22.939,29.994,23.2,30.071,23.486z"/>',
				code: '<path d="M15.5,24c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6-6 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-6,6C16.012,23.902,15.756,24,15.5,24z"/><path d="M21.5,30c-0.256,0-0.512-0.098-0.707-0.293l-6-6c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l6,6c0.391,0.391,0.391,1.023,0,1.414C22.012,29.902,21.756,30,21.5,30z"/><path d="M33.5,30c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6-6 c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-6,6C34.012,29.902,33.756,30,33.5,30z"/><path d="M39.5,24c-0.256,0-0.512-0.098-0.707-0.293l-6-6c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l6,6c0.391,0.391,0.391,1.023,0,1.414C40.012,23.902,39.756,24,39.5,24z"/><path d="M24.5,32c-0.11,0-0.223-0.019-0.333-0.058c-0.521-0.184-0.794-0.755-0.61-1.276l6-17 c0.185-0.521,0.753-0.795,1.276-0.61c0.521,0.184,0.794,0.755,0.61,1.276l-6,17C25.298,31.744,24.912,32,24.5,32z"/>',
				font: '<path d="M33 18H36V30H37V31H33V30H34V27H30L28.5 30H30V31H26V30H27L33 18M34 19L30.5 26H34V19M21 13H26C27.11 13 28 13.89 28 15V26H25V21H22V26H19V15C19 13.89 19.89 13 21 13M22 15V19H25V15H22z"/>',
				excel: '<path style="fill:#c8bdb8" d="M23.5,16v-4h-12v4v2v2v2v2v2v2v2v4h10h2h21v-4v-2v-2v-2v-2v-2v-4H23.5z M13.5,14h8v2h-8V14z M13.5,18h8v2h-8V18z M13.5,22h8v2h-8V22z M13.5,26h8v2h-8V26z M21.5,32h-8v-2h8V32z M42.5,32h-19v-2h19V32z M42.5,28h-19v-2h19V28 z M42.5,24h-19v-2h19V24z M23.5,20v-2h19v2H23.5z"/>',
				image: '<circle style="fill:#f3d55b" cx="18.931" cy="14.431" r="4.569"/><polygon style="fill:#88c057" points="6.5,39 17.5,39 49.5,39 49.5,28 39.5,18.5 29,30 23.517,24.517"/>',
				pdf: '<path d="M19.514,33.324L19.514,33.324c-0.348,0-0.682-0.113-0.967-0.326 c-1.041-0.781-1.181-1.65-1.115-2.242c0.182-1.628,2.195-3.332,5.985-5.068c1.504-3.296,2.935-7.357,3.788-10.75 c-0.998-2.172-1.968-4.99-1.261-6.643c0.248-0.579,0.557-1.023,1.134-1.215c0.228-0.076,0.804-0.172,1.016-0.172 c0.504,0,0.947,0.649,1.261,1.049c0.295,0.376,0.964,1.173-0.373,6.802c1.348,2.784,3.258,5.62,5.088,7.562 c1.311-0.237,2.439-0.358,3.358-0.358c1.566,0,2.515,0.365,2.902,1.117c0.32,0.622,0.189,1.349-0.39,2.16 c-0.557,0.779-1.325,1.191-2.22,1.191c-1.216,0-2.632-0.768-4.211-2.285c-2.837,0.593-6.15,1.651-8.828,2.822 c-0.836,1.774-1.637,3.203-2.383,4.251C21.273,32.654,20.389,33.324,19.514,33.324z M22.176,28.198 c-2.137,1.201-3.008,2.188-3.071,2.744c-0.01,0.092-0.037,0.334,0.431,0.692C19.685,31.587,20.555,31.19,22.176,28.198z M35.813,23.756c0.815,0.627,1.014,0.944,1.547,0.944c0.234,0,0.901-0.01,1.21-0.441c0.149-0.209,0.207-0.343,0.23-0.415 c-0.123-0.065-0.286-0.197-1.175-0.197C37.12,23.648,36.485,23.67,35.813,23.756z M28.343,17.174 c-0.715,2.474-1.659,5.145-2.674,7.564c2.09-0.811,4.362-1.519,6.496-2.02C30.815,21.15,29.466,19.192,28.343,17.174z M27.736,8.712c-0.098,0.033-1.33,1.757,0.096,3.216C28.781,9.813,27.779,8.698,27.736,8.712z"/>',
				powerpoint: '<path style="fill:#c8bdb8" d="M39.5,30h-24V14h24V30z M17.5,28h20V16h-20V28z"/><path style="fill:#c8bdb8" d="M20.499,35c-0.175,0-0.353-0.046-0.514-0.143c-0.474-0.284-0.627-0.898-0.343-1.372l3-5 c0.284-0.474,0.898-0.627,1.372-0.343c0.474,0.284,0.627,0.898,0.343,1.372l-3,5C21.17,34.827,20.839,35,20.499,35z"/><path style="fill:#c8bdb8" d="M34.501,35c-0.34,0-0.671-0.173-0.858-0.485l-3-5c-0.284-0.474-0.131-1.088,0.343-1.372 c0.474-0.283,1.088-0.131,1.372,0.343l3,5c0.284,0.474,0.131,1.088-0.343,1.372C34.854,34.954,34.676,35,34.501,35z"/><path style="fill:#c8bdb8" d="M27.5,16c-0.552,0-1-0.447-1-1v-3c0-0.553,0.448-1,1-1s1,0.447,1,1v3C28.5,15.553,28.052,16,27.5,16 z"/><rect x="17.5" y="16" style="fill:#d3ccc9" width="20" height="12"/>',
				text: '<path d="M12.5,13h6c0.553,0,1-0.448,1-1s-0.447-1-1-1h-6c-0.553,0-1,0.448-1,1S11.947,13,12.5,13z"/><path d="M12.5,18h9c0.553,0,1-0.448,1-1s-0.447-1-1-1h-9c-0.553,0-1,0.448-1,1S11.947,18,12.5,18z"/><path d="M25.5,18c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 c-0.38-0.37-1.04-0.37-1.42,0c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71C24.979,17.89,25.24,18,25.5,18z"/><path d="M29.5,18h8c0.553,0,1-0.448,1-1s-0.447-1-1-1h-8c-0.553,0-1,0.448-1,1S28.947,18,29.5,18z"/><path d="M11.79,31.29c-0.181,0.19-0.29,0.44-0.29,0.71s0.109,0.52,0.29,0.71 C11.979,32.89,12.229,33,12.5,33c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.26-0.11-0.52-0.29-0.71 C12.84,30.92,12.16,30.92,11.79,31.29z"/><path d="M24.5,31h-8c-0.553,0-1,0.448-1,1s0.447,1,1,1h8c0.553,0,1-0.448,1-1S25.053,31,24.5,31z"/><path d="M41.5,18h2c0.553,0,1-0.448,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1S40.947,18,41.5,18z"/><path d="M12.5,23h22c0.553,0,1-0.448,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.448-1,1S11.947,23,12.5,23z"/><path d="M43.5,21h-6c-0.553,0-1,0.448-1,1s0.447,1,1,1h6c0.553,0,1-0.448,1-1S44.053,21,43.5,21z"/><path d="M12.5,28h4c0.553,0,1-0.448,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1S11.947,28,12.5,28z"/><path d="M30.5,26h-10c-0.553,0-1,0.448-1,1s0.447,1,1,1h10c0.553,0,1-0.448,1-1S31.053,26,30.5,26z"/><path d="M43.5,26h-9c-0.553,0-1,0.448-1,1s0.447,1,1,1h9c0.553,0,1-0.448,1-1S44.053,26,43.5,26z"/>',
				video: '<path d="M24.5,28c-0.166,0-0.331-0.041-0.481-0.123C23.699,27.701,23.5,27.365,23.5,27V13 c0-0.365,0.199-0.701,0.519-0.877c0.321-0.175,0.71-0.162,1.019,0.033l11,7C36.325,19.34,36.5,19.658,36.5,20 s-0.175,0.66-0.463,0.844l-11,7C24.874,27.947,24.687,28,24.5,28z M25.5,14.821v10.357L33.637,20L25.5,14.821z"/><path d="M28.5,35c-8.271,0-15-6.729-15-15s6.729-15,15-15s15,6.729,15,15S36.771,35,28.5,35z M28.5,7 c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S35.668,7,28.5,7z"/>'
			};

			function t(e, t, i, a) {
				return '<svg viewBox="0 0 48 48" class="' + (e ? "img-svg svg-folder-icon" : "svg-icon") + (t ? " " + t : "") + '"><path class="svg-folder-icon-bg" d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"/><path class="svg-folder-icon-fg" d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"/>' + (i ? '<path class="svg-folder-icon-symlink" d="M 39.231 23.883 L 28.485 32.862 L 28.485 14.902 Z"/><path class="svg-folder-icon-symlink" d="M 10.065 30.022 L 10.065 40 L 16.205 40 L 16.205 30.022 C 16.205 28.334 17.587 26.953 19.275 26.953 L 32.323 26.953 L 32.323 20.812 L 19.275 20.812 C 14.21 20.812 10.065 24.956 10.065 30.022 Z"/>' : "") + (a ? "" : '<path class="svg-icon-no" d="M 34.441 26.211 C 34.441 31.711 29.941 36.211 24.441 36.211 C 18.941 36.211 14.441 31.711 14.441 26.211 C 14.441 20.711 18.941 16.211 24.441 16.211 C 29.941 16.211 34.441 20.711 34.441 26.211"/><path style="fill:#FFF;" d="M 22.941 19.211 L 25.941 19.211 L 25.941 28.211 L 22.941 28.211 Z M 22.941 19.211"/><path style="fill:#FFF;" d="M 22.941 30.211 L 25.941 30.211 L 25.941 33.211 L 22.941 33.211 Z M 22.941 30.211"/>') + "</svg>"
			}
			e.word = e.text;
			var i = {
					application: ["app", "exe"],
					archive: ["gz", "zip", "7z", "7zip", "arj", "rar", "gzip", "bz2", "bzip2", "tar", "x-gzip"],
					cd: ["dmg", "iso", "bin", "cd", "cdr", "cue", "disc", "disk", "dsk", "dvd", "dvdr", "hdd", "hdi", "hds", "hfs", "hfv", "ima", "image", "imd", "img", "mdf", "mdx", "nrg", "omg", "toast", "cso", "mds"],
					code: ["php", "x-php", "js", "css", "xml", "json", "html", "htm", "py", "jsx", "scss", "clj", "less", "rb", "sql", "ts", "yml"],
					excel: ["xls", "xlt", "xlm", "xlsx", "xlsm", "xltx", "xltm", "xlsb", "xla", "xlam", "xll", "xlw", "csv"],
					font: ["ttf", "otf", "woff", "woff2", "eot", "ttc"],
					image: ["wbmp", "tiff", "webp", "psd", "ai", "eps", "jpg", "jpeg", "webp", "png", "gif", "bmp"],
					pdf: ["pdf"],
					powerpoint: ["ppt", "pot", "pps", "pptx", "pptm", "potx", "potm", "ppam", "ppsx", "ppsm", "sldx", "sldm"],
					text: ["epub", "rtf"],
					word: ["doc", "dot", "docx", "docm", "dotx", "dotm", "docb", "odt", "wbk"]
				},
				a = {};
			V(Object.keys(i), (function(e) {
				V(i[e], (function(t) {
					a[t] = e
				}))
			})), E.get_file_type = function(e) {
				return e.icon || (e.icon = function(e) {
					var t = !!e.mime && e.mime.split("/"),
						i = !!t && t[0],
						n = !!t && t[1];
					if (t) {
						if (["archive", "audio", "image", "video"].includes(i)) return i;
						var o = !!n && a[n];
						if (o) return o
					}
					return !!e.ext && a[e.ext] || "text" === i && "text"
				}(e))
			}, E.get_file_icon = function(i, a) {
				if ("dir" === i.filetype) return t(!0, a, i.is_link, i.is_readable);
				var n = E.get_file_type(i),
					o = !!(i.ext && i.ext.length < 6) && i.ext;
				return o || "image" !== n || (o = i.mime.split("/")[1] || !1), '<svg viewBox="0 0 56 56" class="img-svg svg-file-icon' + (n ? " svg-icon-" + n : "") + (a ? " " + a : "") + '"><path class="svg-file-icon-bg" d="M36.985,0H7.963C7.155,0,6.5,0.655,6.5,1.926V55c0,0.345,0.655,1,1.463,1h40.074 c0.808,0,1.463-0.655,1.463-1V12.978c0-0.696-0.093-0.92-0.257-1.085L37.607,0.257C37.442,0.093,37.218,0,36.985,0z"/><polygon  class="svg-file-icon-flip" points="37.5,0.151 37.5,12 49.349,12"/>' + (n ? '<g class="svg-file-icon-icon">' + e[n] + "</g>" : "") + (o ? '<path class="svg-file-icon-text-bg" d="M48.037,56H7.963C7.155,56,6.5,55.345,6.5,54.537V39h43v15.537C49.5,55.345,48.845,56,48.037,56z"/><text class="svg-file-icon-ext' + (o.length > 3 ? " f_" + (15 - o.length) : "") + '" x="28" y="51.5">' + o + "</text>" : "") + (i.is_readable ? "" : '<path class="svg-icon-no" d="M 40.691 24.958 C 40.691 31.936 34.982 37.645 28.003 37.645 C 21.026 37.645 15.317 31.936 15.317 24.958 C 15.317 17.98 21.026 12.271 28.003 12.271 C 34.982 12.271 40.691 17.98 40.691 24.958"/><path style="fill: #FFF;" d="M 26.101 16.077 L 29.907 16.077 L 29.907 27.495 L 26.101 27.495 Z M 26.101 16.077"/><path style="fill: #FFF;" d="M 26.101 30.033 L 29.907 30.033 L 29.907 33.839 L 26.101 33.839 Z M 26.101 30.033"/>') + "</svg>"
			};
			var n = {
				bell: "M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z",
				check: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
				close: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
				dots: "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",
				expand: "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
				collapse: "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
				zoom_in: "M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z",
				zoom_out: "M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z",
				arrow_left: "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",
				arrow_right: "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",
				link: "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z",
				logout: "M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z",
				download: "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z",
				clipboard: "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z",
				save_edit: "M10,19L10.14,18.86C8.9,18.5 8,17.36 8,16A3,3 0 0,1 11,13C12.36,13 13.5,13.9 13.86,15.14L20,9V7L16,3H4C2.89,3 2,3.9 2,5V19A2,2 0 0,0 4,21H10V19M4,5H14V9H4V5M20.04,12.13C19.9,12.13 19.76,12.19 19.65,12.3L18.65,13.3L20.7,15.35L21.7,14.35C21.92,14.14 21.92,13.79 21.7,13.58L20.42,12.3C20.31,12.19 20.18,12.13 20.04,12.13M18.07,13.88L12,19.94V22H14.06L20.12,15.93L18.07,13.88Z",
				marker: "M15.5,4.5C15.5,5.06 15.7,5.54 16.08,5.93C16.45,6.32 16.92,6.5 17.5,6.5C18.05,6.5 18.5,6.32 18.91,5.93C19.3,5.54 19.5,5.06 19.5,4.5C19.5,3.97 19.3,3.5 18.89,3.09C18.5,2.69 18,2.5 17.5,2.5C16.95,2.5 16.5,2.69 16.1,3.09C15.71,3.5 15.5,3.97 15.5,4.5M22,4.5C22,5.5 21.61,6.69 20.86,8.06C20.11,9.44 19.36,10.56 18.61,11.44L17.5,12.75C17.14,12.38 16.72,11.89 16.22,11.3C15.72,10.7 15.05,9.67 14.23,8.2C13.4,6.73 13,5.5 13,4.5C13,3.25 13.42,2.19 14.3,1.31C15.17,0.44 16.23,0 17.5,0C18.73,0 19.8,0.44 20.67,1.31C21.55,2.19 22,3.25 22,4.5M21,11.58V19C21,19.5 20.8,20 20.39,20.39C20,20.8 19.5,21 19,21H5C4.5,21 4,20.8 3.61,20.39C3.2,20 3,19.5 3,19V5C3,4.5 3.2,4 3.61,3.61C4,3.2 4.5,3 5,3H11.2C11.08,3.63 11,4.13 11,4.5C11,5.69 11.44,7.09 12.28,8.7C13.13,10.3 13.84,11.5 14.41,12.21C15,12.95 15.53,13.58 16.03,14.11L17.5,15.7L19,14.11C20.27,12.5 20.94,11.64 21,11.58M9,14.5V15.89H11.25C11,17 10.25,17.53 9,17.53C8.31,17.53 7.73,17.28 7.27,16.78C6.8,16.28 6.56,15.69 6.56,15C6.56,14.31 6.8,13.72 7.27,13.22C7.73,12.72 8.31,12.47 9,12.47C9.66,12.47 10.19,12.67 10.59,13.08L11.67,12.05C10.92,11.36 10.05,11 9.05,11H9C7.91,11 6.97,11.41 6.19,12.19C5.41,12.97 5,13.91 5,15C5,16.09 5.41,17.03 6.19,17.81C6.97,18.59 7.91,19 9,19C10.16,19 11.09,18.63 11.79,17.91C12.5,17.19 12.84,16.25 12.84,15.09C12.84,14.81 12.83,14.61 12.8,14.5H9Z",
				info: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
				folder: "M4 5v14h16V7h-8.414l-2-2H4zm8.414 0H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z",
				folder_plus: "M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z",
				folder_minus: "M7.874 12h8v2h-8z",
				folder_forbid: "M22 11.255a6.972 6.972 0 0 0-2-.965V7h-8.414l-2-2H4v14h7.29a6.96 6.96 0 0 0 .965 2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H21a1 1 0 0 1 1 1v5.255zM18 22a5 5 0 1 1 0-10a5 5 0 0 1 0 10zm-1.293-2.292a3 3 0 0 0 4.001-4.001l-4.001 4zm-1.415-1.415l4.001-4a3 3 0 0 0-4.001 4.001z",
				folder_link: "M22 13h-2V7h-8.414l-2-2H4v14h9v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H21a1 1 0 0 1 1 1v7zm-4 4v-3.5l5 4.5l-5 4.5V19h-3v-2h3z",
				folder_open: "M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm8 7V9l4 4l-4 4v-3H8v-2h4z",
				folder_move_outline: "M20 18H4V8H20V18M12 6L10 4H4C2.9 4 2 4.89 2 6V18C2 19.11 2.9 20 4 20H20C21.11 20 22 19.11 22 18V8C22 6.9 21.11 6 20 6H12M11 14V12H15V9L19 13L15 17V14H11Z",
				alert_circle_outline: "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",
				date: "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
				camera: "M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z",
				cellphone: "M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z",
				plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
				minus: "M19,13H5V11H19V13Z",
				menu: "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
				menu_back: "M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z",
				sort_name: "M9.25,5L12.5,1.75L15.75,5H9.25M15.75,19L12.5,22.25L9.25,19H15.75M8.89,14.3H6L5.28,17H2.91L6,7H9L12.13,17H9.67L8.89,14.3M6.33,12.68H8.56L7.93,10.56L7.67,9.59L7.42,8.63H7.39L7.17,9.6L6.93,10.58L6.33,12.68M13.05,17V15.74L17.8,8.97V8.91H13.5V7H20.73V8.34L16.09,15V15.08H20.8V17H13.05Z",
				sort_kind: "M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z",
				sort_filesize: "M10,13V11H18V13H10M10,19V17H14V19H10M10,7V5H22V7H10M6,17H8.5L5,20.5L1.5,17H4V7H1.5L5,3.5L8.5,7H6V17Z",
				sort_date: "M7.78,7C9.08,7.04 10,7.53 10.57,8.46C11.13,9.4 11.41,10.56 11.39,11.95C11.4,13.5 11.09,14.73 10.5,15.62C9.88,16.5 8.95,16.97 7.71,17C6.45,16.96 5.54,16.5 4.96,15.56C4.38,14.63 4.09,13.45 4.09,12C4.09,10.55 4.39,9.36 5,8.44C5.59,7.5 6.5,7.04 7.78,7M7.75,8.63C7.31,8.63 6.96,8.9 6.7,9.46C6.44,10 6.32,10.87 6.32,12C6.31,13.15 6.44,14 6.69,14.54C6.95,15.1 7.31,15.37 7.77,15.37C8.69,15.37 9.16,14.24 9.17,12C9.17,9.77 8.7,8.65 7.75,8.63M13.33,17V15.22L13.76,15.24L14.3,15.22L15.34,15.03C15.68,14.92 16,14.78 16.26,14.58C16.59,14.35 16.86,14.08 17.07,13.76C17.29,13.45 17.44,13.12 17.53,12.78L17.5,12.77C17.05,13.19 16.38,13.4 15.47,13.41C14.62,13.4 13.91,13.15 13.34,12.65C12.77,12.15 12.5,11.43 12.46,10.5C12.47,9.5 12.81,8.69 13.47,8.03C14.14,7.37 15,7.03 16.12,7C17.37,7.04 18.29,7.45 18.88,8.24C19.47,9 19.76,10 19.76,11.19C19.75,12.15 19.61,13 19.32,13.76C19.03,14.5 18.64,15.13 18.12,15.64C17.66,16.06 17.11,16.38 16.47,16.61C15.83,16.83 15.12,16.96 14.34,17H13.33M16.06,8.63C15.65,8.64 15.32,8.8 15.06,9.11C14.81,9.42 14.68,9.84 14.68,10.36C14.68,10.8 14.8,11.16 15.03,11.46C15.27,11.77 15.63,11.92 16.11,11.93C16.43,11.93 16.7,11.86 16.92,11.74C17.14,11.61 17.3,11.46 17.41,11.28C17.5,11.17 17.53,10.97 17.53,10.71C17.54,10.16 17.43,9.69 17.2,9.28C16.97,8.87 16.59,8.65 16.06,8.63M9.25,5L12.5,1.75L15.75,5H9.25M15.75,19L12.5,22.25L9.25,19H15.75Z",
				filesize: "M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z",
				layout_list: "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9",
				layout_blocks: "M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10",
				layout_grid: "M3,9H7V5H3V9M3,14H7V10H3V14M8,14H12V10H8V14M13,14H17V10H13V14M8,9H12V5H8V9M13,5V9H17V5H13M18,14H22V10H18V14M3,19H7V15H3V19M8,19H12V15H8V19M13,19H17V15H13V19M18,19H22V15H18V19M18,5V9H22V5H18Z",
				layout_rows: "M3,19H9V12H3V19M10,19H22V12H10V19M3,5V11H22V5H3Z",
				layout_columns: "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z",
				layout_small: "M16.59,5.41L15.17,4L12,7.17L8.83,4L7.41,5.41L12,10M7.41,18.59L8.83,20L12,16.83L15.17,20L16.58,18.59L12,14L7.41,18.59Z",
				layout_large: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z",
				lock_outline: "M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z",
				lock_open_outline: "M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17Z",
				open_in_new: "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z",
				play: "M8,5.14V19.14L19,12.14L8,5.14Z",
				pause: "M14,19H18V5H14M6,19H10V5H6V19Z",
				menu_down: "M7,13L12,18L17,13H7Z",
				menu_up: "M7,12L12,7L17,12H7Z",
				home: "M20 6H12L10 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8A2 2 0 0 0 20 6M17 13V17H15V14H13V17H11V13H9L14 9L19 13Z",
				image_search_outline: "M15.5,9C16.2,9 16.79,8.76 17.27,8.27C17.76,7.79 18,7.2 18,6.5C18,5.83 17.76,5.23 17.27,4.73C16.79,4.23 16.2,4 15.5,4C14.83,4 14.23,4.23 13.73,4.73C13.23,5.23 13,5.83 13,6.5C13,7.2 13.23,7.79 13.73,8.27C14.23,8.76 14.83,9 15.5,9M19.31,8.91L22.41,12L21,13.41L17.86,10.31C17.08,10.78 16.28,11 15.47,11C14.22,11 13.16,10.58 12.3,9.7C11.45,8.83 11,7.77 11,6.5C11,5.27 11.45,4.2 12.33,3.33C13.2,2.45 14.27,2 15.5,2C16.77,2 17.83,2.45 18.7,3.33C19.58,4.2 20,5.27 20,6.5C20,7.33 19.78,8.13 19.31,8.91M16.5,18H5.5L8.25,14.5L10.22,16.83L12.94,13.31L16.5,18M18,13L20,15V20C20,20.55 19.81,21 19.41,21.4C19,21.79 18.53,22 18,22H4C3.45,22 3,21.79 2.6,21.4C2.21,21 2,20.55 2,20V6C2,5.47 2.21,5 2.6,4.59C3,4.19 3.45,4 4,4H9.5C9.2,4.64 9.03,5.31 9,6H4V20H18V13Z",
				file: "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z",
				file_hidden: "M13,9H14V11H11V7H13V9M18.5,9L16.38,6.88L17.63,5.63L20,8V10H18V11H15V9H18.5M13,3.5V2H12V4H13V6H11V4H9V2H8V4H6V5H4V4C4,2.89 4.89,2 6,2H14L16.36,4.36L15.11,5.61L13,3.5M20,20A2,2 0 0,1 18,22H16V20H18V19H20V20M18,15H20V18H18V15M12,22V20H15V22H12M8,22V20H11V22H8M6,22C4.89,22 4,21.1 4,20V18H6V20H7V22H6M4,14H6V17H4V14M4,10H6V13H4V10M18,11H20V14H18V11M4,6H6V9H4V6Z",
				application: "M19,4C20.11,4 21,4.9 21,6V18A2,2 0 0,1 19,20H5C3.89,20 3,19.1 3,18V6A2,2 0 0,1 5,4H19M19,18V8H5V18H19Z",
				archive: "M14,17H12V15H10V13H12V15H14M14,9H12V11H14V13H12V11H10V9H12V7H10V5H12V7H14M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
				audio: "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z",
				cd: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z",
				code: "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z",
				excel: "M16.2,17H14.2L12,13.2L9.8,17H7.8L11,12L7.8,7H9.8L12,10.8L14.2,7H16.2L13,12M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
				font: "M17,8H20V20H21V21H17V20H18V17H14L12.5,20H14V21H10V20H11L17,8M18,9L14.5,16H18V9M5,3H10C11.11,3 12,3.89 12,5V16H9V11H6V16H3V5C3,3.89 3.89,3 5,3M6,5V9H9V5H6Z",
				image: "M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z",
				pdf: "M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19M10.59,10.08C10.57,10.13 10.3,11.84 8.5,14.77C8.5,14.77 5,16.58 5.83,17.94C6.5,19 8.15,17.9 9.56,15.27C9.56,15.27 11.38,14.63 13.79,14.45C13.79,14.45 17.65,16.19 18.17,14.34C18.69,12.5 15.12,12.9 14.5,13.09C14.5,13.09 12.46,11.75 12,9.89C12,9.89 13.13,5.95 11.38,6C9.63,6.05 10.29,9.12 10.59,10.08M11.4,11.13C11.43,11.13 11.87,12.33 13.29,13.58C13.29,13.58 10.96,14.04 9.9,14.5C9.9,14.5 10.9,12.75 11.4,11.13M15.32,13.84C15.9,13.69 17.64,14 17.58,14.32C17.5,14.65 15.32,13.84 15.32,13.84M8.26,15.7C7.73,16.91 6.83,17.68 6.6,17.67C6.37,17.66 7.3,16.07 8.26,15.7M11.4,8.76C11.39,8.71 11.03,6.57 11.4,6.61C11.94,6.67 11.4,8.71 11.4,8.76Z",
				powerpoint: "M9.8,13.4H12.3C13.8,13.4 14.46,13.12 15.1,12.58C15.74,12.03 16,11.25 16,10.23C16,9.26 15.75,8.5 15.1,7.88C14.45,7.29 13.83,7 12.3,7H8V17H9.8V13.4M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M9.8,12V8.4H12.1C12.76,8.4 13.27,8.65 13.6,9C13.93,9.35 14.1,9.72 14.1,10.24C14.1,10.8 13.92,11.19 13.6,11.5C13.28,11.81 12.9,12 12.22,12H9.8Z",
				text: "M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
				video: "M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z",
				word: "M15.5,17H14L12,9.5L10,17H8.5L6.1,7H7.8L9.34,14.5L11.3,7H12.7L14.67,14.5L16.2,7H17.9M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
			};
			E.get_svg = function(e) {
				return '<svg viewBox="0 0 24 24" class="svg-icon svg-icon-' + e + '"><path d="' + n[e] + '" /></svg>'
			}, E.get_svg_file_icon = function(e) {
				if ("dir" === e.filetype) return t(!1, !1, e.is_link, e.is_readable);
				var i = E.get_file_type(e) || (e.ext ? "file" : "file_hidden");
				return E.get_svg(i)
			}, E.get_svg_multi = function() {
				return '<svg viewBox="0 0 24 24" class="svg-icon svg-icon-' + arguments[0] + '">' + M(arguments, (function(e) {
					return '<path class="svg-path-' + e + '" d="' + n[e] + '" />'
				})) + "</svg>"
			}
		}(),
		function() {
			function e(e) {
				R.breadcrumbs.dataset.info = e, R.breadcrumbs.classList.toggle("breadcrumbs-info", !!e)
			}
			if (E.breadcrumbs_info = function() {
				e(_c.files_count + " " + (_c.current_dir.images_count === _c.files_count ? G("images", "image", _c.files_count) : _c.current_dir.files_count === _c.files_count ? G("files", "file", _c.files_count) : !_c.current_dir.files_count && _c.files_count ? G("folders", "folder", _c.files_count) : G("items", "item", _c.files_count)) + (_c.current_dir.dirsize ? "  " + filesize(_c.current_dir.dirsize) : ""))
			}, _c.breadcrumbs) {
				E.async_breadcrumb_links = function() {
					V(_querya('.crumb-link[href="#"]', R.breadcrumbs), (function(e, t) {
						var i = o(e.dataset.path);
						"#" !== i && (e.href = i)
					}))
				}, R.breadcrumbs = _id("breadcrumbs");
				var a = [],
					n = [];
				R.breadcrumbs.innerHTML = l("", E.get_svg("home")), E.set_breadcrumbs = function(t) {
					if (e(""), a = t.split("/").filter(Boolean), n.length) {
						var i = [];
						V(n, (function(e, t) {
							(i.length || e !== a[t]) && i.unshift(R.breadcrumbs.children[t + 1])
						})), i.length ? s(i, !0) : (R.breadcrumbs.lastChild.classList.remove("crumb-active"), c())
					} else c()
				}, b(R.breadcrumbs, (function(e) {
					"A" !== e.target.nodeName || _(e, e.target) || E.get_files(e.target.dataset.path, "push")
				}))
			}

			function o(e) {
				var t = !!_c.dirs[e] && _c.dirs[e].url_path;
				return t ? encodeURI(t) : "#"
			}

			function l(e, i) {
				return '<li class="crumb"><a href="' + o(e) + '" data-path="' + t(e) + '" class="crumb-link"' + (e ? "" : ' title="' + G("home") + '"') + ">" + i + "</a></li>"
			}

			function s(e, t) {
				var i = {
					targets: e,
					translateX: t ? [0, -2] : [-2, 0],
					opacity: t ? [1, 0] : [0, 1],
					easing: "easeOutQuad",
					duration: 150,
					delay: anime.stagger(Math.round(100 / e.length))
				};
				t && (i.complete = function() {
					p(e, R.breadcrumbs), c()
				}), anime(i)
			}

			function c() {
				var e = "",
					t = [],
					o = "";
				a.length && V(a, (function(a, p) {
					e += e ? "/" + a : a, (t.length || a !== n[p]) && (o += l(e, i(a)), t.push(p + 1))
				})), t.length && (R.breadcrumbs.insertAdjacentHTML("beforeend", o), s(C(t, (function(e) {
					return R.breadcrumbs.children[e]
				})))), n = a.slice(0), R.breadcrumbs.lastChild != R.breadcrumbs.firstChild && R.breadcrumbs.lastChild.classList.add("crumb-active")
			}
		}(), _c.prevent_right_click && (b(document, (function(e) {
			("IMG" === e.target.nodeName || "VIDEO" === e.target.nodeName || e.target.closest(".menu-li") || e.target.closest(".files-li")) && e.preventDefault()
		}), "contextmenu"), document.documentElement.style.setProperty("--touch-callout", "none")),
		function() {
			function e(e, t, i, a) {
				return a ? '<button class="dropdown-item" data-action="' + i + '">' + E.get_svg(t) + G(e) + "</button>" : ""
			}

			function l() {
				N.contextmenu.is_open && p()
			}

			function p(e, t) {
				if (e != N.contextmenu.is_open) {
					var i = (e ? "add" : "remove") + "EventListener";
					document.documentElement[i]("click", l), document[i]("contextmenu", l), document[i]("visibilitychange", l), window[i]("blur", l), window[i]("scroll", l), R.sidebar_menu && R.sidebar_menu[i]("scroll", l), N.contextmenu.is_open = e
				}
				N.contextmenu.el.classList.toggle("cm-active", e), N.contextmenu.li && N.contextmenu.li.classList.toggle("cm-active", e), anime.remove(R.contextmenu), anime({
					targets: R.contextmenu,
					opacity: e ? [0, 1] : 0,
					translateY: e ? [t ? -5 : 5, 0] : null,
					easing: "easeOutQuint",
					duration: e ? 200 : 150,
					complete: e ? null : function() {
						R.contextmenu.style.cssText = null
					}
				})
			}
			R.contextmenu = _id("contextmenu"), N.contextmenu = {}, E.create_contextmenu = function(o, l, s, c) {
				if (_c.context_menu) {
					var r = "files" === c && "LI" !== s.nodeName && o.target.closest("li"),
						d = s || r || o.target.closest("li");
					if (d) {
						var m = d !== N.contextmenu.el;
						if (N.contextmenu.is_open) {
							if (!m) return o.preventDefault();
							N.contextmenu.el.classList.remove("cm-active"), N.contextmenu.li && N.contextmenu.li.classList.remove("cm-active")
						}
						N.contextmenu.el = d, N.contextmenu.li = r;
						var u = N.contextmenu.item !== l,
							v = l ? l.path : d.dataset["sidebar" === c ? "path" : "name"];
						if (N.contextmenu.item = l || _c["sidebar" === c ? "dirs" : "files"][v], N.contextmenu.item) {
							o.stopPropagation(), (m || u) && (R.contextmenu.innerHTML = '<h6 class="dropdown-header" title="' + t(N.contextmenu.item.basename) + '">' + E.get_svg_file_icon(N.contextmenu.item) + i(N.contextmenu.item.basename) + "</h6>" + e("zoom", "zoom_in", "popup", "popup" !== c && N.contextmenu.item.is_browser_image && N.contextmenu.item.is_readable) + e("open", "folder_open", "folder", "sidebar" !== c && "dir" === N.contextmenu.item.filetype) + e("show info", "info", "modal", !["modal", "popup"].includes(c)) + function(e, t, i, a) {
								if (!e) return "";
								var o = n(e);
								return o && "#" !== o ? g(E.get_svg("open_in_new") + U("open in new tab", i), "a", t, U("open in new tab", a), o) : ""
							}(N.contextmenu.item, "dropdown-item", !0) + e("copy link", "clipboard", "clipboard", W.url && W.clipboard && N.contextmenu.item.url_path) + function(e, t, i, a) {
								return W.download && "dir" !== e.filetype && e.is_readable ? g(E.get_svg("download") + U("download", i), "a", t, U("download", a), n(e, !0), !0) : ""
							}(N.contextmenu.item, "dropdown-item", !0) + a(N.contextmenu.item.image, "dropdown-item", !0)), R.contextmenu.style.display = "block";
							var f = d.getBoundingClientRect(),
								x = f.top - R.contextmenu.clientHeight - 10,
								h = f.bottom + 10,
								_ = x >= 0,
								b = !_ && h + R.contextmenu.clientHeight <= document.documentElement.clientHeight;
							R.contextmenu.style.top = Math.round(b ? h : Math.max(0, x)) + "px";
							var w = (d.clientWidth > 500 || "sidebar" === c ? o.clientX : f.left + d.offsetWidth / 2) - R.contextmenu.clientWidth / 2,
								y = Math.max(10, Math.min(document.documentElement.clientWidth - R.contextmenu.clientWidth - 10, w));
							R.contextmenu.style.left = Math.round(y) + "px", R.contextmenu.style.setProperty("--offset", Math.round(Math.max(10, Math.min(R.contextmenu.clientWidth - 10, R.contextmenu.clientWidth / 2 - y + w))) + "px"), R.contextmenu.classList.toggle("cm-top", _), R.contextmenu.classList.toggle("cm-bottom", b), R.contextmenu.classList.toggle("cm-border", "sidebar" === c), p(!0, b), o.preventDefault()
						}
					}
				}
			}, _c.prevent_right_click || R.list_ul.addEventListener("contextmenu", E.create_contextmenu), s(R.contextmenu, (function(e, t) {
				"popup" === e ? (_c.history && N.modal.open && N.modal.popstate.remove(), E.open_popup(N.contextmenu.item.path)) : "folder" === e ? E.get_files(N.contextmenu.item.path, "push") : "modal" === e ? E.open_modal(N.contextmenu.item, !0) : "clipboard" === e && o(n(N.contextmenu.item))
			}))
		}(),
		function() {
			function e(e, t, i) {
				return e.format(t) + (i ? '<span class="relative-time">' + e.fromNow() + "</span>" : "")
			}
			E.get_time = function(t, i, a, n) {
				var o = dayjs.unix(t.mtime);
				return '<time datetime="' + o.format() + '" data-time="' + t.mtime + '" data-format="' + i + '"' + (a && W.is_pointer ? ' data-tooltip="' + o.format(a) + '" data-tooltip-format="' + a + '"' : "") + ">" + e(o, i, n) + "</time>"
			}, dayjs.extend(dayjs_plugin_localizedFormat), dayjs.extend(dayjs_plugin_relativeTime);
			var t = navigator.languages || !!navigator.language && [navigator.language];
			if (t && t.length) {
				var i = ["af", "ar", "ar-dz", "ar-kw", "ar-ly", "ar-ma", "ar-sa", "ar-tn", "az", "be", "bg", "bm", "bn", "bo", "br", "bs", "ca", "cs", "cv", "cy", "da", "de", "de-at", "de-ch", "dv", "el", "en", "en-au", "en-ca", "en-gb", "en-ie", "en-il", "en-nz", "en-SG", "eo", "es", "es-do", "es-us", "et", "eu", "fa", "fi", "fo", "fr", "fr-ca", "fr-ch", "fy", "ga", "gd", "gl", "gom-latn", "gu", "he", "hi", "hr", "hu", "hy-am", "id", "is", "it", "it-ch", "ja", "jv", "ka", "kk", "km", "kn", "ko", "ku", "ky", "lb", "lo", "lt", "lv", "me", "mi", "mk", "ml", "mn", "mr", "ms", "ms-my", "mt", "my", "nb", "ne", "nl", "nl-be", "nn", "oc-lnc", "pa-in", "pl", "pt", "pt-br", "ro", "ru", "sd", "se", "si", "sk", "sl", "sq", "sr", "sr-cyrl", "ss", "sv", "sw", "ta", "te", "tet", "tg", "th", "tl-ph", "tlh", "tr", "tzl", "tzm", "tzm-latn", "ug-cn", "uk", "ur", "uz", "uz-latn", "vi", "x-pseudo", "yo", "zh-cn", "zh-hk", "zh-tw"];
				t.some((function(e) {
					return n(e = e.toLowerCase()) || e.includes("-") && n(e.split("-")[0])
				}))
			}

			function a(t) {
				if (t) return E.load_plugin("dayjs_locale", (function() {
					dayjs.locale(t), V(_tag("time"), (function(t) {
						if (t.dataset.time) {
							var i = dayjs.unix(t.dataset.time);
							t.innerHTML = e(i, t.dataset.format, t.children[0]), t.dataset.tooltipFormat && (t.dataset.tooltip = i.format(t.dataset.tooltipFormat))
						}
					})), _c.current_dir && (_c.current_dir.html = !1)
				}), {
					src: ["dayjs@1.8.34/locale/" + t + ".js"]
				}), !0
			}

			function n(e) {
				return !!["en", "en-us"].includes(e) || ("zn" === e ? a("zh-cn") : "no" === e ? a("nb") : i.includes(e) ? a(e) : void 0)
			}
		}(), N.dropdown = {}, P = W.pointer_events ? "pointerup" : "click", B = W.pointer_events ? "pointerdown" : "mousedown", E.dropdown = function(e, t, i) {
			var a;
			b(t, (function(t) {
				"mouse" === t.pointerType ? i && i() : (e.classList.contains("touch-open") ? a.remove() : a = H(document, B, (function(t) {
					t.target.closest(".dropdown") !== e && (a.remove(), e.classList.remove("touch-open"))
				})), e.classList.toggle("touch-open"))
			}), P), W.is_pointer && (W.is_touch ? W.pointer_events && b(t, (function(t) {
				e.classList.toggle("mouse-hover", "mouse" === t.pointerType)
			}), "pointerover") : e.classList.add("mouse-hover"))
		},
		function() {
			var e = !1,
				o = W.pixel_ratio >= 1.5 && _c.image_resize_dimensions_retina ? _c.image_resize_dimensions_retina : _c.image_resize_dimensions,
				p = Math.max(_c.image_resize_min_ratio, 1);

			function u(t, i) {
				if (e) return e.abort(), e = !1, void(i && i());
				if (_c.transitions && _c.files_count) {
					if ("list" === _c.layout) {
						anime.remove(R.list_ul);
						var a = {
							targets: R.list_ul,
							translateY: t ? [-3, 0] : [0, 3],
							opacity: t ? 1 : 0,
							easing: "easeOutQuint",
							duration: 250
						};
						return i && (a.complete = i), void anime(a)
					}
					for (var n = R.list_ul.children, o = n.length, l = [], p = window.innerHeight, s = 0; s < o; s++) {
						var c = n[s],
							r = c.getBoundingClientRect();
						if (!(r.bottom < 0))
							if (r.top < p - 10) l.push(c);
							else if ("columns" !== _c.layout) break
					}
					var d = Math.min(Math.round(300 / l.length), 30);
					a = {
						targets: l,
						scale: t ? [.95, 1] : [1, .98],
						opacity: t ? [0, 1] : [1, 0],
						easing: "easeOutQuint",
						duration: t ? 200 : 100,
						delay: anime.stagger(d)
					};
					i && (a.complete = i), anime(a)
				} else i && i()
			}

			function f(e, t) {
				if ("replace" === e) {
					if (_c.query_path || !t) return location.href
				} else if (!t) return "//" + location.host + location.pathname;
				return "?" + encodeURI(t).replace(/&/g, "%26")
			}

			function x() {
				N.list && N.list.clear(), l(R.list_ul), window.scrollY && window.scroll({
					top: 0
				})
			}

			function h(e) {
				var t = N.list.search(e, ["basename", "filetype", "mime", "features", "icon"]).length;
				A(R.list_ul, t, !0), E.topbar_info_search(e, t), window.scrollY && window.scroll({
					top: 0
				})
			}

			function w() {
				return _c.current_dir.html = M(_c.file_names, (function(e, l) {
					var s = _c.files[e],
						u = 1,
						f = !1,
						x = !1,
						h = "dir" === s.filetype;
					if (h || s.mime || !s.ext || (s.mime = Q[s.ext]), !h && s.mime) {
						var _ = s.mime.split("/");
						if ("image" === _[0]) {
							s.is_image = !0;
							var b = _[1];
							W.browser_images.includes(b) && (s.is_browser_image = b, _c.resize_image_types.includes(b) ? s.is_resize_image = !0 : "svg+xml" === b ? s.is_browser_image = "svg" : "vnd.microsoft.icon" !== b && "x-icon" !== b || (s.is_browser_image = "ico"))
						}
					}
					if (_c.load_images && s.is_readable && s.is_browser_image && ("svg" === s.is_browser_image ? s.filesize < _c.load_svg_max_filesize && (f = "svg") : "ico" === s.is_browser_image ? f = "svg" : (s.is_resize_image && function(e) {
						if (_c.image_resize_enabled && e && e.width && e.height) {
							var t = Math.max(e.width, e.height) / o,
								i = e.width * e.height;
							if (!(t < p || _c.image_resize_max_pixels && i > _c.image_resize_max_pixels)) {
								if (_c.image_resize_memory_limit) {
									var a = e.width / t,
										n = e.height / t;
									if ((i * (e.bits ? e.bits / 8 : 1) * (e.channels || 3) * 1.33 + a * n * 4) / 1048576 > _c.image_resize_memory_limit) return
								}
								return !0
							}
						}
					}(s.image) && (x = o), (x || s.filesize <= _c.load_images_max_filesize) && (f = "img", s.image && (u = s.image.width / s.image.height)))), f) var w = '<img class="img img-' + f + ' lazy" data-src="' + function() {
						if (x && s.image["resize" + x]) return encodeURI(s.image["resize" + x]);
						if (x || _c.load_files_proxy_php || !s.url_path) {
							var e = s.mtime + "." + s.filesize;
							return _c.script + "?file=" + encodeURIComponent(s.path) + (x ? "&resize=" + x + "&" + _c.image_cache_hash + "." + e : "&" + e)
						}
						return t(s.url_path)
					}() + '">';
					else {
						f = h ? "folder" : "file";
						w = E.get_file_icon(s)
					}
					var y = "img-wrapper img-wrapper-" + f + ("img" === f || "svg" === f ? " img-bg" : ""),
						H = "files-li li-" + f;
					return function(e) {
						var t = "dir" == e.filetype ? "folders" : "files",
							i = e.image;
						if (i) {
							t += ",image";
							var a = i.width,
								n = i.height,
								o = i.exif,
								l = i.iptc;
							a && n && (t += a === n ? ",square" : a > n ? ",landscape,horizontal" : "portrait,vertical"), o && (t += ",exif", o.gps && (t += ",gps,maps"), t += M(["Make", "Model", "Software"], (function(e) {
								if (o[e]) return "," + o[e]
							}))), l && (t += ",iptc", (l.title || l.description) && (t += ",caption", l.title && (t += ",title"), l.description && (t += ",description")), l.keywords && (t += ",keywords"))
						}
						e.features = t
					}(s), s.sort_name = s.basename.toLowerCase(), s.DateTimeOriginal && (s.mtime = s.DateTimeOriginal), '<li class="' + H + '" style="--ratio:' + u + '" data-name="' + t(s.basename) + '">' + g(w, "a", y, !1, n(s, "download" === _c.click), !h && "download" === _c.click) + '<div class="data">' + a(s.image, "gps", !1, !0) + g(i(s.basename), "span", "name") + m(s.image, !1, !1, ["title"]) + g(E.get_svg_file_icon(s), "span", "icon") + g(!h && s.mime, "span", "mime") + c(s.image, "span", "dimensions") + r(s, "span", "size") + v(s.image, "span", "exif", !0) + (h ? "" : '<span class="ext">' + g(s.ext, "span", "ext-inner") + "</span>") + g(E.get_time(s, "ll", "llll", !1), "span", "date") + '<span class="flex"></span></div>' + d("menu" !== _c.click || h, "files-context") + "</li>"
				})), _c.current_dir.html
			}

			function y(e, t, i) {
				J(), R.topbar.classList.remove("topbar-spinner"), 0, _c.current_dir = _c.dirs[e];
				var a = e ? _c.current_dir.basename : "/";
				document.title = a, t && _c.history && history[t + "State"]({
					path: e
				}, a, f(t, e)), _c.files = _c.current_dir.files, j(i + " :", e, _c.current_dir), _c.file_names = Object.keys(_c.files), _c.files_count = _c.file_names.length, _c.breadcrumbs && E.breadcrumbs_info(), A(R.list_ul, _c.files_count, !0), _c.files_count || E.topbar_info(E.get_svg("alert_circle_outline") + G("Directory is empty"), "warning"), _c.files_count && (R.filter.disabled = !1), _c.files_count && (R.list_ul.innerHTML = _c.current_dir.html || w(), N.list = new List(R.list, {}), V(_c.file_names, (function(e, t) {
					N.list.items[t]._values = _c.files[e]
				})), E.set_sort(), u(!0), "replace" === t && function(e) {
					if (!_c.history || !location.hash) return;
					var t = z("pid", !0, !0),
						i = t || location.hash.replace("#", "");
					if (!i) return;
					var a = _c.files[decodeURIComponent(i)];
					if (!a) return;
					t && a.is_browser_image ? E.open_popup(a.path, !0) : E.open_modal(a)
				}())
			}

			function H(e, t) {
				return _c.dirs[e] ? t ? _c.dirs[e].mtime > t.mtime ? _c.dirs[e] = Object.assign(t, _c.dirs[e]) : Object.assign(_c.dirs[e], t) : _c.dirs[e] : _c.dirs[e] = t || {}
			}

			function k(e, t, i) {
				E.topbar_info(E.get_svg("alert_circle_outline") + "<strong>" + G("Error") + "</strong>" + (e ? ": " + e : "."), "error"), i && _c.history && history[i + "State"]({
					path: t
				}, G("Error") + (e ? ": " + e : "."), f(i, t))
			}
			b(R.filter, (function() {
				h(this.value)
			}), "input"), E.get_files = function(t, i) {
				if (t !== _c.current_path) {
					_c.current_path = t, E.topbar_info(), R.filter.value = null, R.filter.disabled = !0, R.filter.classList.remove("nomatches"), _c.breadcrumbs && E.set_breadcrumbs(t), _c.menu_enabled && E.set_menu_active(t);
					var a = _c.dirs[t];
					if (a) {
						if (a.files) return void u(!1, (function() {
							x(), y(t, i, "files from JS")
						}));
						var n = S(X(t, a.mtime));
						if (n) return H(t, JSON.parse(n)), void u(!1, (function() {
							x(), y(t, i, "files from localStorage")
						}))
					}
					_c.menu_enabled && E.menu_loading(!1, !0), R.topbar.classList.add("topbar-spinner");
					var o = 0,
						l = !(!a || !a.json_cache) && a.json_cache;
					u(!1, (function() {
						x(), p()
					})), e = q({
						params: !l && "action=files&dir=" + encodeURIComponent(t),
						url: l,
						json_response: !0,
						complete: function(a, n, o) {
							if (e = !1, _c.menu_enabled && E.menu_loading(!1, !1), !o || !a || a.error) return k((a.error || "") + " " + t, t, i), R.topbar.classList.remove("topbar-spinner"), void j("files error", a.error || "Error");
							H(t, a), S(X(t, a.mtime), n, 1e3), p()
						}
					})
				}

				function p(e) {
					1 == o++ && y(t, i, l ? "files from JSON " + l : "files from xmlhttp")
				}
			}, E.init_files = function() {
				if (_c.query_path) return _c.query_path_valid ? E.get_files(_c.query_path, "replace") : k("Invalid directory path <strong>" + _c.query_path + "</strong>", _c.query_path, "replace");
				if (location.search) {
					var e = location.search.split("&")[0].replace("?", "");
					if (e && "debug" !== e && (-1 === e.indexOf("=") || e.indexOf("/") > -1)) {
						_c.query_path = decodeURIComponent(e);
						var t = !(-1 !== e.indexOf("/") || !_c.dirs[""].files) && _c.dirs[""].files[_c.query_path];
						return void(t || !_c.menu_enabled ? (t && H(_c.query_path, t), E.get_files(_c.query_path, "replace")) : E.menu_init_files(_c.query_path))
					}
				}
				E.get_files(_c.init_path, "replace")
			};
			var L = !1;
			E.menu_init_files = function(e) {
				if (e) {
					if (_c.dir_paths) return E.get_files(e, "replace");
					L = e
				} else L && E.get_files(L, "replace")
			}, s(R.topbar_info, (function(e, t) {
				"reset" === e && (R.filter.value = null, h())
			})), b(R.list_ul, (function(e) {
				if ("UL" !== e.target.nodeName && ("A" !== e.target.nodeName || e.target.classList.contains("img-wrapper"))) {
					var t = e.target.closest("li"),
						i = _c.files[t.dataset.name];
					if (i) {
						if (e.target.classList.contains("context-button")) return E.create_contextmenu(e, i, e.target, "files");
						var a = "dir" === i.filetype;
						if (N.contextmenu.is_open && ("menu" !== _c.click || a)) return e.preventDefault();
						_(e, t.firstChild, !a && ["download", "window"].includes(_c.click)) || (a ? (H(i.path, i), E.get_files(i.path, "push")) : "menu" === _c.click ? E.create_contextmenu(e, i, t, "files") : "popup" === _c.click && i.is_browser_image && i.is_readable ? E.open_popup(i.path) : E.open_modal(i, !0))
					}
				}
			}))
		}(),
		function() {
			function e(e, t) {
				Object.assign(N.layout, {
					layout: e,
					index: N.layout.keys.indexOf(e),
					subindex: t,
					current: N.layout.layouts[e],
					classes: N.layout.layouts[e][t]
				})
			}

			function t() {
				var e = ["blocks", "grid"].includes(N.layout.layout) || "list-list-big" === N.layout.classes;
				R.list_ul.className = "list " + N.layout.classes + (!_c.image_cover && e ? " img-contain" : ""), l.style.display = e ? "block" : "none"
			}
			N.layout = {
				layouts: {
					list: ["list-list", "list-list-big"],
					blocks: ["list-blocks"],
					grid: ["list-grid list-large", "list-grid"],
					rows: ["list-rows list-large", "list-rows"],
					columns: ["list-columns"]
				}
			}, N.layout.keys = Object.keys(N.layout.layouts), e(N.layout.keys.includes(_c.layout) ? _c.layout : "grid", N.ls_options.layout_subindex || 0);
			var i = _id("change-layout");
			i.innerHTML = '<button type="button" class="btn-icon btn-topbar">' + E.get_svg("layout_" + N.layout.layout) + '</button><div class="dropdown-menu dropdown-menu-right"><h6 class="dropdown-header">' + G("layout") + "</h6>" + M(N.layout.keys, (function(e) {
				return '<button class="dropdown-item' + (e === N.layout.layout ? " active" + (N.layout.subindex ? " subindex" + N.layout.subindex : "") : "") + '" data-action="' + e + '">' + (N.layout.layouts[e].length > 1 ? E.get_svg_multi("layout_large", "layout_small") : "") + E.get_svg("layout_" + e) + G(e) + "</button>"
			})) + '<div class="form-check form-switch cover-toggle">\t  <input class="form-check-input" type="checkbox" id="covertoggle"' + (_c.image_cover ? " checked" : "") + '>\t  <label class="form-check-label" for="covertoggle">' + G("cover") + "</label>\t</div></div>";
			var a = i.firstChild,
				n = i.lastChild,
				o = _class("dropdown-item", n),
				l = n.lastChild,
				p = l.children[0];

			function c(i) {
				N.layout.layout !== i ? (o[N.layout.index].className = "dropdown-item", e(i, 0), t(), a.innerHTML = E.get_svg("layout_" + N.layout.layout), o[N.layout.index].className = "dropdown-item active", R.sortbar.className = "sortbar-" + N.layout.layout, E.set_option("layout", N.layout.layout), E.ls_option("layout_subindex", 0)) : N.layout.current.length < 2 || (N.layout.subindex = N.layout.classes === N.layout.current[0] ? 1 : 0, N.layout.classes = N.layout.current[N.layout.subindex], o[N.layout.index].className = "dropdown-item active subindex" + N.layout.subindex, t(), R.sortbar.className = "sortbar-" + N.layout.layout + ("list" === N.layout.layout && N.layout.subindex ? "-big" : ""), E.ls_option("layout_subindex", N.layout.subindex))
			}

			function r() {
				E.set_option("image_cover", !!p.checked), R.list_ul.classList.toggle("img-contain", !p.checked)
			}
			t(), b(p, r, "change"), b(l, (function(e) {
				e.target.classList.contains("cover-toggle") && (p.checked = !p.checked, r())
			}), "click"), s(n, c), E.dropdown(i, a, (function() {
				var e = N.layout.index + (N.layout.current.length < 2 || N.layout.subindex > 0 ? 1 : 0);
				c(N.layout.keys[e >= N.layout.keys.length ? 0 : e])
			})), W.is_touch && b(document, (function() {}), "touchstart")
		}();
	var Y = _c.menu_enabled ? 2 : 1;

	function J() {
		if (Y--) return !Y && setTimeout(J, 1e3);
		var e, t, i = O("ZmlsZXM6cXJ4"),
			a = O("ZmlsZXM6cHVyY2hhc2Vk"),
			n = location.hostname,
			o = S(i);
		if (!o || o != _c.qrx && O(o) != n) return _c.qrx || !n || n.includes(".") ? !_c.qrx || "string" == typeof _c.qrx && /^[a-f0-9]{32}$/.test(_c.qrx) ? (e = _c.qrx ? "key=" + _c.qrx + "&" : "", t = function(e) {
			if (!e.status) return p(_c.qrx);
			S(i, _c.qrx || btoa(n))
		}, void q({
			complete: function(e, i, a) {
				a && e && e.hasOwnProperty("status") && t(e)
			}
		})) : p(!0) : p();

		function p(e) {
			if (e && (_c.qrx = !1), S(a)) return l(e);
			E.load_plugin("cGF5cGFs", (function(t) {
			}), {
				error: function() {
					l(e)
				}
			})
		}
	}
	window.onpopstate = function(e) {
		_c.history && e.state && e.state.hasOwnProperty("path") && E.get_files(e.state.path)
	};
	var Q = {
		123: "application/vnd.lotus-1-2-3",
		ez: "application/andrew-inset",
		aw: "application/applixware",
		atom: "application/atom+xml",
		atomcat: "application/atomcat+xml",
		atomdeleted: "application/atomdeleted+xml",
		atomsvc: "application/atomsvc+xml",
		dwd: "application/atsc-dwd+xml",
		held: "application/atsc-held+xml",
		rsat: "application/atsc-rsat+xml",
		bdoc: "application/x-bdoc",
		xcs: "application/calendar+xml",
		ccxml: "application/ccxml+xml",
		cdfx: "application/cdfx+xml",
		cdmia: "application/cdmi-capability",
		cdmic: "application/cdmi-container",
		cdmid: "application/cdmi-domain",
		cdmio: "application/cdmi-object",
		cdmiq: "application/cdmi-queue",
		cu: "application/cu-seeme",
		mpd: "application/dash+xml",
		davmount: "application/davmount+xml",
		dbk: "application/docbook+xml",
		dssc: "application/dssc+der",
		xdssc: "application/dssc+xml",
		ecma: "application/ecmascript",
		es: "application/ecmascript",
		emma: "application/emma+xml",
		emotionml: "application/emotionml+xml",
		epub: "application/epub+zip",
		exi: "application/exi",
		fdt: "application/fdt+xml",
		pfr: "application/font-tdpfr",
		geojson: "application/geo+json",
		gml: "application/gml+xml",
		gpx: "application/gpx+xml",
		gxf: "application/gxf",
		gz: "application/gzip",
		hjson: "application/hjson",
		stk: "application/hyperstudio",
		ink: "application/inkml+xml",
		inkml: "application/inkml+xml",
		ipfix: "application/ipfix",
		its: "application/its+xml",
		jar: "application/java-archive",
		war: "application/java-archive",
		ear: "application/java-archive",
		ser: "application/java-serialized-object",
		class: "application/java-vm",
		js: "application/javascript",
		mjs: "application/javascript",
		json: "application/json",
		map: "application/json",
		json5: "application/json5",
		jsonml: "application/jsonml+json",
		jsonld: "application/ld+json",
		lgr: "application/lgr+xml",
		lostxml: "application/lost+xml",
		hqx: "application/mac-binhex40",
		cpt: "application/mac-compactpro",
		mads: "application/mads+xml",
		webmanifest: "application/manifest+json",
		mrc: "application/marc",
		mrcx: "application/marcxml+xml",
		ma: "application/mathematica",
		nb: "application/mathematica",
		mb: "application/mathematica",
		mathml: "application/mathml+xml",
		mbox: "application/mbox",
		mscml: "application/mediaservercontrol+xml",
		metalink: "application/metalink+xml",
		meta4: "application/metalink4+xml",
		mets: "application/mets+xml",
		maei: "application/mmt-aei+xml",
		musd: "application/mmt-usd+xml",
		mods: "application/mods+xml",
		m21: "application/mp21",
		mp21: "application/mp21",
		mp4s: "application/mp4",
		m4p: "application/mp4",
		xdf: "application/xcap-diff+xml",
		doc: "application/msword",
		dot: "application/msword",
		mxf: "application/mxf",
		nq: "application/n-quads",
		nt: "application/n-triples",
		cjs: "application/node",
		bin: "application/octet-stream",
		dms: "application/octet-stream",
		lrf: "application/octet-stream",
		mar: "application/octet-stream",
		so: "application/octet-stream",
		dist: "application/octet-stream",
		distz: "application/octet-stream",
		pkg: "application/octet-stream",
		bpk: "application/octet-stream",
		dump: "application/octet-stream",
		elc: "application/octet-stream",
		deploy: "application/octet-stream",
		exe: "application/x-msdownload",
		dll: "application/x-msdownload",
		deb: "application/x-debian-package",
		dmg: "application/x-apple-diskimage",
		iso: "application/x-iso9660-image",
		img: "application/octet-stream",
		msi: "application/x-msdownload",
		msp: "application/octet-stream",
		msm: "application/octet-stream",
		buffer: "application/octet-stream",
		oda: "application/oda",
		opf: "application/oebps-package+xml",
		ogx: "application/ogg",
		omdoc: "application/omdoc+xml",
		onetoc: "application/onenote",
		onetoc2: "application/onenote",
		onetmp: "application/onenote",
		onepkg: "application/onenote",
		oxps: "application/oxps",
		relo: "application/p2p-overlay+xml",
		xer: "application/xcap-error+xml",
		pdf: "application/pdf",
		pgp: "application/pgp-encrypted",
		asc: "application/pgp-signature",
		sig: "application/pgp-signature",
		prf: "application/pics-rules",
		p10: "application/pkcs10",
		p7m: "application/pkcs7-mime",
		p7c: "application/pkcs7-mime",
		p7s: "application/pkcs7-signature",
		p8: "application/pkcs8",
		ac: "application/vnd.nokia.n-gage.ac+xml",
		cer: "application/pkix-cert",
		crl: "application/pkix-crl",
		pkipath: "application/pkix-pkipath",
		pki: "application/pkixcmp",
		pls: "application/pls+xml",
		ai: "application/postscript",
		eps: "application/postscript",
		ps: "application/postscript",
		provx: "application/provenance+xml",
		cww: "application/prs.cww",
		pskcxml: "application/pskc+xml",
		raml: "application/raml+yaml",
		rdf: "application/rdf+xml",
		owl: "application/rdf+xml",
		rif: "application/reginfo+xml",
		rnc: "application/relax-ng-compact-syntax",
		rl: "application/resource-lists+xml",
		rld: "application/resource-lists-diff+xml",
		rs: "application/rls-services+xml",
		rapd: "application/route-apd+xml",
		sls: "application/route-s-tsid+xml",
		rusd: "application/route-usd+xml",
		gbr: "application/rpki-ghostbusters",
		mft: "application/rpki-manifest",
		roa: "application/rpki-roa",
		rsd: "application/rsd+xml",
		rss: "application/rss+xml",
		rtf: "text/rtf",
		sbml: "application/sbml+xml",
		scq: "application/scvp-cv-request",
		scs: "application/scvp-cv-response",
		spq: "application/scvp-vp-request",
		spp: "application/scvp-vp-response",
		sdp: "application/sdp",
		senmlx: "application/senml+xml",
		sensmlx: "application/sensml+xml",
		setpay: "application/set-payment-initiation",
		setreg: "application/set-registration-initiation",
		shf: "application/shf+xml",
		siv: "application/sieve",
		sieve: "application/sieve",
		smi: "application/smil+xml",
		smil: "application/smil+xml",
		rq: "application/sparql-query",
		srx: "application/sparql-results+xml",
		gram: "application/srgs",
		grxml: "application/srgs+xml",
		sru: "application/sru+xml",
		ssdl: "application/ssdl+xml",
		ssml: "application/ssml+xml",
		swidtag: "application/swid+xml",
		tei: "application/tei+xml",
		teicorpus: "application/tei+xml",
		tfi: "application/thraud+xml",
		tsd: "application/timestamped-data",
		toml: "application/toml",
		ttml: "application/ttml+xml",
		rsheet: "application/urc-ressheet+xml",
		"1km": "application/vnd.1000minds.decision-model+xml",
		plb: "application/vnd.3gpp.pic-bw-large",
		psb: "application/vnd.3gpp.pic-bw-small",
		pvb: "application/vnd.3gpp.pic-bw-var",
		tcap: "application/vnd.3gpp2.tcap",
		pwn: "application/vnd.3m.post-it-notes",
		aso: "application/vnd.accpac.simply.aso",
		imp: "application/vnd.accpac.simply.imp",
		acu: "application/vnd.acucobol",
		atc: "application/vnd.acucorp",
		acutc: "application/vnd.acucorp",
		air: "application/vnd.adobe.air-application-installer-package+zip",
		fcdt: "application/vnd.adobe.formscentral.fcdt",
		fxp: "application/vnd.adobe.fxp",
		fxpl: "application/vnd.adobe.fxp",
		xdp: "application/vnd.adobe.xdp+xml",
		xfdf: "application/vnd.adobe.xfdf",
		ahead: "application/vnd.ahead.space",
		azf: "application/vnd.airzip.filesecure.azf",
		azs: "application/vnd.airzip.filesecure.azs",
		azw: "application/vnd.amazon.ebook",
		acc: "application/vnd.americandynamics.acc",
		ami: "application/vnd.amiga.ami",
		apk: "application/vnd.android.package-archive",
		cii: "application/vnd.anser-web-certificate-issue-initiation",
		fti: "application/vnd.anser-web-funds-transfer-initiation",
		atx: "application/vnd.antix.game-component",
		mpkg: "application/vnd.apple.installer+xml",
		keynote: "application/vnd.apple.keynote",
		m3u8: "application/vnd.apple.mpegurl",
		numbers: "application/vnd.apple.numbers",
		pages: "application/vnd.apple.pages",
		pkpass: "application/vnd.apple.pkpass",
		swi: "application/vnd.aristanetworks.swi",
		iota: "application/vnd.astraea-software.iota",
		aep: "application/vnd.audiograph",
		bmml: "application/vnd.balsamiq.bmml+xml",
		mpm: "application/vnd.blueice.multipass",
		bmi: "application/vnd.bmi",
		rep: "application/vnd.businessobjects",
		cdxml: "application/vnd.chemdraw+xml",
		mmd: "application/vnd.chipnuts.karaoke-mmd",
		cdy: "application/vnd.cinderella",
		csl: "application/vnd.citationstyles.style+xml",
		cla: "application/vnd.claymore",
		rp9: "application/vnd.cloanto.rp9",
		c4g: "application/vnd.clonk.c4group",
		c4d: "application/vnd.clonk.c4group",
		c4f: "application/vnd.clonk.c4group",
		c4p: "application/vnd.clonk.c4group",
		c4u: "application/vnd.clonk.c4group",
		c11amc: "application/vnd.cluetrust.cartomobile-config",
		c11amz: "application/vnd.cluetrust.cartomobile-config-pkg",
		csp: "application/vnd.commonspace",
		cdbcmsg: "application/vnd.contact.cmsg",
		cmc: "application/vnd.cosmocaller",
		clkx: "application/vnd.crick.clicker",
		clkk: "application/vnd.crick.clicker.keyboard",
		clkp: "application/vnd.crick.clicker.palette",
		clkt: "application/vnd.crick.clicker.template",
		clkw: "application/vnd.crick.clicker.wordbank",
		wbs: "application/vnd.criticaltools.wbs+xml",
		pml: "application/vnd.ctc-posml",
		ppd: "application/vnd.cups-ppd",
		car: "application/vnd.curl.car",
		pcurl: "application/vnd.curl.pcurl",
		dart: "application/vnd.dart",
		rdz: "application/vnd.data-vision.rdz",
		uvf: "application/vnd.dece.data",
		uvvf: "application/vnd.dece.data",
		uvd: "application/vnd.dece.data",
		uvvd: "application/vnd.dece.data",
		uvt: "application/vnd.dece.ttml+xml",
		uvvt: "application/vnd.dece.ttml+xml",
		uvx: "application/vnd.dece.unspecified",
		uvvx: "application/vnd.dece.unspecified",
		uvz: "application/vnd.dece.zip",
		uvvz: "application/vnd.dece.zip",
		fe_launch: "application/vnd.denovo.fcselayout-link",
		dna: "application/vnd.dna",
		mlp: "application/vnd.dolby.mlp",
		dpg: "application/vnd.dpgraph",
		dfac: "application/vnd.dreamfactory",
		kpxx: "application/vnd.ds-keypoint",
		ait: "application/vnd.dvb.ait",
		svc: "application/vnd.dvb.service",
		geo: "application/vnd.dynageo",
		mag: "application/vnd.ecowin.chart",
		nml: "application/vnd.enliven",
		esf: "application/vnd.epson.esf",
		msf: "application/vnd.epson.msf",
		qam: "application/vnd.epson.quickanime",
		slt: "application/vnd.epson.salt",
		ssf: "application/vnd.epson.ssf",
		es3: "application/vnd.eszigno3+xml",
		et3: "application/vnd.eszigno3+xml",
		ez2: "application/vnd.ezpix-album",
		ez3: "application/vnd.ezpix-package",
		fdf: "application/vnd.fdf",
		mseed: "application/vnd.fdsn.mseed",
		seed: "application/vnd.fdsn.seed",
		dataless: "application/vnd.fdsn.seed",
		gph: "application/vnd.flographit",
		ftc: "application/vnd.fluxtime.clip",
		fm: "application/vnd.framemaker",
		frame: "application/vnd.framemaker",
		maker: "application/vnd.framemaker",
		book: "application/vnd.framemaker",
		fnc: "application/vnd.frogans.fnc",
		ltf: "application/vnd.frogans.ltf",
		fsc: "application/vnd.fsc.weblaunch",
		oas: "application/vnd.fujitsu.oasys",
		oa2: "application/vnd.fujitsu.oasys2",
		oa3: "application/vnd.fujitsu.oasys3",
		fg5: "application/vnd.fujitsu.oasysgp",
		bh2: "application/vnd.fujitsu.oasysprs",
		ddd: "application/vnd.fujixerox.ddd",
		xdw: "application/vnd.fujixerox.docuworks",
		xbd: "application/vnd.fujixerox.docuworks.binder",
		fzs: "application/vnd.fuzzysheet",
		txd: "application/vnd.genomatix.tuxedo",
		ggb: "application/vnd.geogebra.file",
		ggt: "application/vnd.geogebra.tool",
		gex: "application/vnd.geometry-explorer",
		gre: "application/vnd.geometry-explorer",
		gxt: "application/vnd.geonext",
		g2w: "application/vnd.geoplan",
		g3w: "application/vnd.geospace",
		gmx: "application/vnd.gmx",
		gdoc: "application/vnd.google-apps.document",
		gslides: "application/vnd.google-apps.presentation",
		gsheet: "application/vnd.google-apps.spreadsheet",
		kml: "application/vnd.google-earth.kml+xml",
		kmz: "application/vnd.google-earth.kmz",
		gqf: "application/vnd.grafeq",
		gqs: "application/vnd.grafeq",
		gac: "application/vnd.groove-account",
		ghf: "application/vnd.groove-help",
		gim: "application/vnd.groove-identity-message",
		grv: "application/vnd.groove-injector",
		gtm: "application/vnd.groove-tool-message",
		tpl: "application/vnd.groove-tool-template",
		vcg: "application/vnd.groove-vcard",
		hal: "application/vnd.hal+xml",
		zmm: "application/vnd.handheld-entertainment+xml",
		hbci: "application/vnd.hbci",
		les: "application/vnd.hhe.lesson-player",
		hpgl: "application/vnd.hp-hpgl",
		hpid: "application/vnd.hp-hpid",
		hps: "application/vnd.hp-hps",
		jlt: "application/vnd.hp-jlyt",
		pcl: "application/vnd.hp-pcl",
		pclxl: "application/vnd.hp-pclxl",
		"sfd-hdstx": "application/vnd.hydrostatix.sof-data",
		mpy: "application/vnd.ibm.minipay",
		afp: "application/vnd.ibm.modcap",
		listafp: "application/vnd.ibm.modcap",
		list3820: "application/vnd.ibm.modcap",
		irm: "application/vnd.ibm.rights-management",
		sc: "application/vnd.ibm.secure-container",
		icc: "application/vnd.iccprofile",
		icm: "application/vnd.iccprofile",
		igl: "application/vnd.igloader",
		ivp: "application/vnd.immervision-ivp",
		ivu: "application/vnd.immervision-ivu",
		igm: "application/vnd.insors.igm",
		xpw: "application/vnd.intercon.formnet",
		xpx: "application/vnd.intercon.formnet",
		i2g: "application/vnd.intergeo",
		qbo: "application/vnd.intu.qbo",
		qfx: "application/vnd.intu.qfx",
		rcprofile: "application/vnd.ipunplugged.rcprofile",
		irp: "application/vnd.irepository.package+xml",
		xpr: "application/vnd.is-xpr",
		fcs: "application/vnd.isac.fcs",
		jam: "application/vnd.jam",
		rms: "application/vnd.jcp.javame.midlet-rms",
		jisp: "application/vnd.jisp",
		joda: "application/vnd.joost.joda-archive",
		ktz: "application/vnd.kahootz",
		ktr: "application/vnd.kahootz",
		karbon: "application/vnd.kde.karbon",
		chrt: "application/vnd.kde.kchart",
		kfo: "application/vnd.kde.kformula",
		flw: "application/vnd.kde.kivio",
		kon: "application/vnd.kde.kontour",
		kpr: "application/vnd.kde.kpresenter",
		kpt: "application/vnd.kde.kpresenter",
		ksp: "application/vnd.kde.kspread",
		kwd: "application/vnd.kde.kword",
		kwt: "application/vnd.kde.kword",
		htke: "application/vnd.kenameaapp",
		kia: "application/vnd.kidspiration",
		kne: "application/vnd.kinar",
		knp: "application/vnd.kinar",
		skp: "application/vnd.koan",
		skd: "application/vnd.koan",
		skt: "application/vnd.koan",
		skm: "application/vnd.koan",
		sse: "application/vnd.kodak-descriptor",
		lasxml: "application/vnd.las.las+xml",
		lbd: "application/vnd.llamagraphics.life-balance.desktop",
		lbe: "application/vnd.llamagraphics.life-balance.exchange+xml",
		apr: "application/vnd.lotus-approach",
		pre: "application/vnd.lotus-freelance",
		nsf: "application/vnd.lotus-notes",
		org: "text/x-org",
		scm: "application/vnd.lotus-screencam",
		lwp: "application/vnd.lotus-wordpro",
		portpkg: "application/vnd.macports.portpkg",
		mcd: "application/vnd.mcd",
		mc1: "application/vnd.medcalcdata",
		cdkey: "application/vnd.mediastation.cdkey",
		mwf: "application/vnd.mfer",
		mfm: "application/vnd.mfmp",
		flo: "application/vnd.micrografx.flo",
		igx: "application/vnd.micrografx.igx",
		mif: "application/vnd.mif",
		daf: "application/vnd.mobius.daf",
		dis: "application/vnd.mobius.dis",
		mbk: "application/vnd.mobius.mbk",
		mqy: "application/vnd.mobius.mqy",
		msl: "application/vnd.mobius.msl",
		plc: "application/vnd.mobius.plc",
		txf: "application/vnd.mobius.txf",
		mpn: "application/vnd.mophun.application",
		mpc: "application/vnd.mophun.certificate",
		xul: "application/vnd.mozilla.xul+xml",
		cil: "application/vnd.ms-artgalry",
		cab: "application/vnd.ms-cab-compressed",
		xls: "application/vnd.ms-excel",
		xlm: "application/vnd.ms-excel",
		xla: "application/vnd.ms-excel",
		xlc: "application/vnd.ms-excel",
		xlt: "application/vnd.ms-excel",
		xlw: "application/vnd.ms-excel",
		xlam: "application/vnd.ms-excel.addin.macroenabled.12",
		xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
		xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
		xltm: "application/vnd.ms-excel.template.macroenabled.12",
		eot: "application/vnd.ms-fontobject",
		chm: "application/vnd.ms-htmlhelp",
		ims: "application/vnd.ms-ims",
		lrm: "application/vnd.ms-lrm",
		thmx: "application/vnd.ms-officetheme",
		msg: "application/vnd.ms-outlook",
		cat: "application/vnd.ms-pki.seccat",
		stl: "model/stl",
		ppt: "application/vnd.ms-powerpoint",
		pps: "application/vnd.ms-powerpoint",
		pot: "application/vnd.ms-powerpoint",
		ppam: "application/vnd.ms-powerpoint.addin.macroenabled.12",
		pptm: "application/vnd.ms-powerpoint.presentation.macroenabled.12",
		sldm: "application/vnd.ms-powerpoint.slide.macroenabled.12",
		ppsm: "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
		potm: "application/vnd.ms-powerpoint.template.macroenabled.12",
		mpp: "application/vnd.ms-project",
		mpt: "application/vnd.ms-project",
		docm: "application/vnd.ms-word.document.macroenabled.12",
		dotm: "application/vnd.ms-word.template.macroenabled.12",
		wps: "application/vnd.ms-works",
		wks: "application/vnd.ms-works",
		wcm: "application/vnd.ms-works",
		wdb: "application/vnd.ms-works",
		wpl: "application/vnd.ms-wpl",
		xps: "application/vnd.ms-xpsdocument",
		mseq: "application/vnd.mseq",
		mus: "application/vnd.musician",
		msty: "application/vnd.muvee.style",
		taglet: "application/vnd.mynfc",
		nlu: "application/vnd.neurolanguage.nlu",
		ntf: "application/vnd.nitf",
		nitf: "application/vnd.nitf",
		nnd: "application/vnd.noblenet-directory",
		nns: "application/vnd.noblenet-sealer",
		nnw: "application/vnd.noblenet-web",
		ngdat: "application/vnd.nokia.n-gage.data",
		"n-gage": "application/vnd.nokia.n-gage.symbian.install",
		rpst: "application/vnd.nokia.radio-preset",
		rpss: "application/vnd.nokia.radio-presets",
		edm: "application/vnd.novadigm.edm",
		edx: "application/vnd.novadigm.edx",
		ext: "application/vnd.novadigm.ext",
		odc: "application/vnd.oasis.opendocument.chart",
		otc: "application/vnd.oasis.opendocument.chart-template",
		odb: "application/vnd.oasis.opendocument.database",
		odf: "application/vnd.oasis.opendocument.formula",
		odft: "application/vnd.oasis.opendocument.formula-template",
		odg: "application/vnd.oasis.opendocument.graphics",
		otg: "application/vnd.oasis.opendocument.graphics-template",
		odi: "application/vnd.oasis.opendocument.image",
		oti: "application/vnd.oasis.opendocument.image-template",
		odp: "application/vnd.oasis.opendocument.presentation",
		otp: "application/vnd.oasis.opendocument.presentation-template",
		ods: "application/vnd.oasis.opendocument.spreadsheet",
		ots: "application/vnd.oasis.opendocument.spreadsheet-template",
		odt: "application/vnd.oasis.opendocument.text",
		odm: "application/vnd.oasis.opendocument.text-master",
		ott: "application/vnd.oasis.opendocument.text-template",
		oth: "application/vnd.oasis.opendocument.text-web",
		xo: "application/vnd.olpc-sugar",
		dd2: "application/vnd.oma.dd2+xml",
		obgx: "application/vnd.openblox.game+xml",
		oxt: "application/vnd.openofficeorg.extension",
		osm: "application/vnd.openstreetmap.data+xml",
		pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		sldx: "application/vnd.openxmlformats-officedocument.presentationml.slide",
		ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
		potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
		xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
		docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
		mgp: "application/vnd.osgeo.mapguide.package",
		dp: "application/vnd.osgi.dp",
		esa: "application/vnd.osgi.subsystem",
		pdb: "application/x-pilot",
		pqa: "application/vnd.palm",
		oprc: "application/vnd.palm",
		paw: "application/vnd.pawaafile",
		str: "application/vnd.pg.format",
		ei6: "application/vnd.pg.osasli",
		efif: "application/vnd.picsel",
		wg: "application/vnd.pmi.widget",
		plf: "application/vnd.pocketlearn",
		pbd: "application/vnd.powerbuilder6",
		box: "application/vnd.previewsystems.box",
		mgz: "application/vnd.proteus.magazine",
		qps: "application/vnd.publishare-delta-tree",
		ptid: "application/vnd.pvi.ptid1",
		qxd: "application/vnd.quark.quarkxpress",
		qxt: "application/vnd.quark.quarkxpress",
		qwd: "application/vnd.quark.quarkxpress",
		qwt: "application/vnd.quark.quarkxpress",
		qxl: "application/vnd.quark.quarkxpress",
		qxb: "application/vnd.quark.quarkxpress",
		bed: "application/vnd.realvnc.bed",
		mxl: "application/vnd.recordare.musicxml",
		musicxml: "application/vnd.recordare.musicxml+xml",
		cryptonote: "application/vnd.rig.cryptonote",
		cod: "application/vnd.rim.cod",
		rm: "application/vnd.rn-realmedia",
		rmvb: "application/vnd.rn-realmedia-vbr",
		link66: "application/vnd.route66.link66+xml",
		st: "application/vnd.sailingtracker.track",
		see: "application/vnd.seemail",
		sema: "application/vnd.sema",
		semd: "application/vnd.semd",
		semf: "application/vnd.semf",
		ifm: "application/vnd.shana.informed.formdata",
		itp: "application/vnd.shana.informed.formtemplate",
		iif: "application/vnd.shana.informed.interchange",
		ipk: "application/vnd.shana.informed.package",
		twd: "application/vnd.simtech-mindmapper",
		twds: "application/vnd.simtech-mindmapper",
		mmf: "application/vnd.smaf",
		teacher: "application/vnd.smart.teacher",
		fo: "application/vnd.software602.filler.form+xml",
		sdkm: "application/vnd.solent.sdkm+xml",
		sdkd: "application/vnd.solent.sdkm+xml",
		dxp: "application/vnd.spotfire.dxp",
		sfs: "application/vnd.spotfire.sfs",
		sdc: "application/vnd.stardivision.calc",
		sda: "application/vnd.stardivision.draw",
		sdd: "application/vnd.stardivision.impress",
		smf: "application/vnd.stardivision.math",
		sdw: "application/vnd.stardivision.writer",
		vor: "application/vnd.stardivision.writer",
		sgl: "application/vnd.stardivision.writer-global",
		smzip: "application/vnd.stepmania.package",
		sm: "application/vnd.stepmania.stepchart",
		wadl: "application/vnd.sun.wadl+xml",
		sxc: "application/vnd.sun.xml.calc",
		stc: "application/vnd.sun.xml.calc.template",
		sxd: "application/vnd.sun.xml.draw",
		std: "application/vnd.sun.xml.draw.template",
		sxi: "application/vnd.sun.xml.impress",
		sti: "application/vnd.sun.xml.impress.template",
		sxm: "application/vnd.sun.xml.math",
		sxw: "application/vnd.sun.xml.writer",
		sxg: "application/vnd.sun.xml.writer.global",
		stw: "application/vnd.sun.xml.writer.template",
		sus: "application/vnd.sus-calendar",
		susp: "application/vnd.sus-calendar",
		svd: "application/vnd.svd",
		sis: "application/vnd.symbian.install",
		sisx: "application/vnd.symbian.install",
		xsm: "application/vnd.syncml+xml",
		bdm: "application/vnd.syncml.dm+wbxml",
		xdm: "application/vnd.syncml.dm+xml",
		ddf: "application/vnd.syncml.dmddf+xml",
		tao: "application/vnd.tao.intent-module-archive",
		pcap: "application/vnd.tcpdump.pcap",
		cap: "application/vnd.tcpdump.pcap",
		dmp: "application/vnd.tcpdump.pcap",
		tmo: "application/vnd.tmobile-livetv",
		tpt: "application/vnd.trid.tpt",
		mxs: "application/vnd.triscape.mxs",
		tra: "application/vnd.trueapp",
		ufd: "application/vnd.ufdl",
		ufdl: "application/vnd.ufdl",
		utz: "application/vnd.uiq.theme",
		umj: "application/vnd.umajin",
		unityweb: "application/vnd.unity",
		uoml: "application/vnd.uoml+xml",
		vcx: "application/vnd.vcx",
		vsd: "application/vnd.visio",
		vst: "application/vnd.visio",
		vss: "application/vnd.visio",
		vsw: "application/vnd.visio",
		vis: "application/vnd.visionary",
		vsf: "application/vnd.vsf",
		wbxml: "application/vnd.wap.wbxml",
		wmlc: "application/vnd.wap.wmlc",
		wmlsc: "application/vnd.wap.wmlscriptc",
		wtb: "application/vnd.webturbo",
		nbp: "application/vnd.wolfram.player",
		wpd: "application/vnd.wordperfect",
		wqd: "application/vnd.wqd",
		stf: "application/vnd.wt.stf",
		xar: "application/vnd.xara",
		xfdl: "application/vnd.xfdl",
		hvd: "application/vnd.yamaha.hv-dic",
		hvs: "application/vnd.yamaha.hv-script",
		hvp: "application/vnd.yamaha.hv-voice",
		osf: "application/vnd.yamaha.openscoreformat",
		osfpvg: "application/vnd.yamaha.openscoreformat.osfpvg+xml",
		saf: "application/vnd.yamaha.smaf-audio",
		spf: "application/vnd.yamaha.smaf-phrase",
		cmp: "application/vnd.yellowriver-custom-menu",
		zir: "application/vnd.zul",
		zirz: "application/vnd.zul",
		zaz: "application/vnd.zzazz.deck+xml",
		vxml: "application/voicexml+xml",
		wasm: "application/wasm",
		wgt: "application/widget",
		hlp: "application/winhlp",
		wsdl: "application/wsdl+xml",
		wspolicy: "application/wspolicy+xml",
		"7z": "application/x-7z-compressed",
		abw: "application/x-abiword",
		ace: "application/x-ace-compressed",
		arj: "application/x-arj",
		aab: "application/x-authorware-bin",
		x32: "application/x-authorware-bin",
		u32: "application/x-authorware-bin",
		vox: "application/x-authorware-bin",
		aam: "application/x-authorware-map",
		aas: "application/x-authorware-seg",
		bcpio: "application/x-bcpio",
		torrent: "application/x-bittorrent",
		blb: "application/x-blorb",
		blorb: "application/x-blorb",
		bz: "application/x-bzip",
		bz2: "application/x-bzip2",
		boz: "application/x-bzip2",
		cbr: "application/x-cbr",
		cba: "application/x-cbr",
		cbt: "application/x-cbr",
		cbz: "application/x-cbr",
		cb7: "application/x-cbr",
		vcd: "application/x-cdlink",
		cfs: "application/x-cfs-compressed",
		chat: "application/x-chat",
		pgn: "application/x-chess-pgn",
		crx: "application/x-chrome-extension",
		cco: "application/x-cocoa",
		nsc: "application/x-conference",
		cpio: "application/x-cpio",
		csh: "application/x-csh",
		udeb: "application/x-debian-package",
		dgc: "application/x-dgc-compressed",
		dir: "application/x-director",
		dcr: "application/x-director",
		dxr: "application/x-director",
		cst: "application/x-director",
		cct: "application/x-director",
		cxt: "application/x-director",
		w3d: "application/x-director",
		fgd: "application/x-director",
		swa: "application/x-director",
		wad: "application/x-doom",
		ncx: "application/x-dtbncx+xml",
		dtb: "application/x-dtbook+xml",
		res: "application/x-dtbresource+xml",
		dvi: "application/x-dvi",
		evy: "application/x-envoy",
		eva: "application/x-eva",
		bdf: "application/x-font-bdf",
		gsf: "application/x-font-ghostscript",
		psf: "application/x-font-linux-psf",
		pcf: "application/x-font-pcf",
		snf: "application/x-font-snf",
		pfa: "application/x-font-type1",
		pfb: "application/x-font-type1",
		pfm: "application/x-font-type1",
		afm: "application/x-font-type1",
		arc: "application/x-freearc",
		spl: "application/x-futuresplash",
		gca: "application/x-gca-compressed",
		ulx: "application/x-glulx",
		gnumeric: "application/x-gnumeric",
		gramps: "application/x-gramps-xml",
		gtar: "application/x-gtar",
		hdf: "application/x-hdf",
		php: "application/x-httpd-php",
		install: "application/x-install-instructions",
		jardiff: "application/x-java-archive-diff",
		jnlp: "application/x-java-jnlp-file",
		kdbx: "application/x-keepass2",
		latex: "application/x-latex",
		luac: "application/x-lua-bytecode",
		lzh: "application/x-lzh-compressed",
		lha: "application/x-lzh-compressed",
		run: "application/x-makeself",
		mie: "application/x-mie",
		prc: "application/x-pilot",
		mobi: "application/x-mobipocket-ebook",
		application: "application/x-ms-application",
		lnk: "application/x-ms-shortcut",
		wmd: "application/x-ms-wmd",
		wmz: "application/x-msmetafile",
		xbap: "application/x-ms-xbap",
		mdb: "application/x-msaccess",
		obd: "application/x-msbinder",
		crd: "application/x-mscardfile",
		clp: "application/x-msclip",
		com: "application/x-msdownload",
		bat: "application/x-msdownload",
		mvb: "application/x-msmediaview",
		m13: "application/x-msmediaview",
		m14: "application/x-msmediaview",
		wmf: "image/wmf",
		emf: "image/emf",
		emz: "application/x-msmetafile",
		mny: "application/x-msmoney",
		pub: "application/x-mspublisher",
		scd: "application/x-msschedule",
		trm: "application/x-msterminal",
		wri: "application/x-mswrite",
		nc: "application/x-netcdf",
		cdf: "application/x-netcdf",
		pac: "application/x-ns-proxy-autoconfig",
		nzb: "application/x-nzb",
		pl: "application/x-perl",
		pm: "application/x-perl",
		p12: "application/x-pkcs12",
		pfx: "application/x-pkcs12",
		p7b: "application/x-pkcs7-certificates",
		spc: "application/x-pkcs7-certificates",
		p7r: "application/x-pkcs7-certreqresp",
		rar: "application/x-rar-compressed",
		rpm: "application/x-redhat-package-manager",
		ris: "application/x-research-info-systems",
		sea: "application/x-sea",
		sh: "application/x-sh",
		shar: "application/x-shar",
		swf: "application/x-shockwave-flash",
		xap: "application/x-silverlight-app",
		sql: "application/x-sql",
		sit: "application/x-stuffit",
		sitx: "application/x-stuffitx",
		srt: "application/x-subrip",
		sv4cpio: "application/x-sv4cpio",
		sv4crc: "application/x-sv4crc",
		t3: "application/x-t3vm-image",
		gam: "application/x-tads",
		tar: "application/x-tar",
		tcl: "application/x-tcl",
		tk: "application/x-tcl",
		tex: "application/x-tex",
		tfm: "application/x-tex-tfm",
		texinfo: "application/x-texinfo",
		texi: "application/x-texinfo",
		obj: "model/obj",
		ustar: "application/x-ustar",
		hdd: "application/x-virtualbox-hdd",
		ova: "application/x-virtualbox-ova",
		ovf: "application/x-virtualbox-ovf",
		vbox: "application/x-virtualbox-vbox",
		"vbox-extpack": "application/x-virtualbox-vbox-extpack",
		vdi: "application/x-virtualbox-vdi",
		vhd: "application/x-virtualbox-vhd",
		vmdk: "application/x-virtualbox-vmdk",
		src: "application/x-wais-source",
		webapp: "application/x-web-app-manifest+json",
		der: "application/x-x509-ca-cert",
		crt: "application/x-x509-ca-cert",
		pem: "application/x-x509-ca-cert",
		fig: "application/x-xfig",
		xlf: "application/xliff+xml",
		xpi: "application/x-xpinstall",
		xz: "application/x-xz",
		z1: "application/x-zmachine",
		z2: "application/x-zmachine",
		z3: "application/x-zmachine",
		z4: "application/x-zmachine",
		z5: "application/x-zmachine",
		z6: "application/x-zmachine",
		z7: "application/x-zmachine",
		z8: "application/x-zmachine",
		xaml: "application/xaml+xml",
		xav: "application/xcap-att+xml",
		xca: "application/xcap-caps+xml",
		xel: "application/xcap-el+xml",
		xns: "application/xcap-ns+xml",
		xenc: "application/xenc+xml",
		xhtml: "application/xhtml+xml",
		xht: "application/xhtml+xml",
		xml: "text/xml",
		xsl: "application/xml",
		xsd: "application/xml",
		rng: "application/xml",
		dtd: "application/xml-dtd",
		xop: "application/xop+xml",
		xpl: "application/xproc+xml",
		xslt: "application/xslt+xml",
		xspf: "application/xspf+xml",
		mxml: "application/xv+xml",
		xhvml: "application/xv+xml",
		xvml: "application/xv+xml",
		xvm: "application/xv+xml",
		yang: "application/yang",
		yin: "application/yin+xml",
		zip: "application/zip",
		"3gpp": "video/3gpp",
		adp: "audio/adpcm",
		au: "audio/basic",
		snd: "audio/basic",
		mid: "audio/midi",
		midi: "audio/midi",
		kar: "audio/midi",
		rmi: "audio/midi",
		mxmf: "audio/mobile-xmf",
		mp3: "audio/mpeg",
		m4a: "audio/x-m4a",
		mp4a: "audio/mp4",
		mpga: "audio/mpeg",
		mp2: "audio/mpeg",
		mp2a: "audio/mpeg",
		m2a: "audio/mpeg",
		m3a: "audio/mpeg",
		oga: "audio/ogg",
		ogg: "audio/ogg",
		spx: "audio/ogg",
		s3m: "audio/s3m",
		sil: "audio/silk",
		uva: "audio/vnd.dece.audio",
		uvva: "audio/vnd.dece.audio",
		eol: "audio/vnd.digital-winds",
		dra: "audio/vnd.dra",
		dts: "audio/vnd.dts",
		dtshd: "audio/vnd.dts.hd",
		lvp: "audio/vnd.lucent.voice",
		pya: "audio/vnd.ms-playready.media.pya",
		ecelp4800: "audio/vnd.nuera.ecelp4800",
		ecelp7470: "audio/vnd.nuera.ecelp7470",
		ecelp9600: "audio/vnd.nuera.ecelp9600",
		rip: "audio/vnd.rip",
		wav: "audio/x-wav",
		weba: "audio/webm",
		aac: "audio/x-aac",
		aif: "audio/x-aiff",
		aiff: "audio/x-aiff",
		aifc: "audio/x-aiff",
		caf: "audio/x-caf",
		flac: "audio/x-flac",
		mka: "audio/x-matroska",
		m3u: "audio/x-mpegurl",
		wax: "audio/x-ms-wax",
		wma: "audio/x-ms-wma",
		ram: "audio/x-pn-realaudio",
		ra: "audio/x-realaudio",
		rmp: "audio/x-pn-realaudio-plugin",
		xm: "audio/xm",
		cdx: "chemical/x-cdx",
		cif: "chemical/x-cif",
		cmdf: "chemical/x-cmdf",
		cml: "chemical/x-cml",
		csml: "chemical/x-csml",
		xyz: "chemical/x-xyz",
		ttc: "font/collection",
		otf: "font/otf",
		ttf: "font/ttf",
		woff: "font/woff",
		woff2: "font/woff2",
		exr: "image/aces",
		apng: "image/apng",
		bmp: "image/x-ms-bmp",
		cgm: "image/cgm",
		drle: "image/dicom-rle",
		fits: "image/fits",
		g3: "image/g3fax",
		gif: "image/gif",
		heic: "image/heic",
		heics: "image/heic-sequence",
		heif: "image/heif",
		heifs: "image/heif-sequence",
		hej2: "image/hej2k",
		hsj2: "image/hsj2",
		ief: "image/ief",
		jls: "image/jls",
		jp2: "image/jp2",
		jpg2: "image/jp2",
		jpeg: "image/jpeg",
		jpg: "image/jpeg",
		jpe: "image/jpeg",
		jph: "image/jph",
		jhc: "image/jphc",
		jpm: "video/jpm",
		jpx: "image/jpx",
		jpf: "image/jpx",
		jxr: "image/jxr",
		jxra: "image/jxra",
		jxrs: "image/jxrs",
		jxs: "image/jxs",
		jxsc: "image/jxsc",
		jxsi: "image/jxsi",
		jxss: "image/jxss",
		ktx: "image/ktx",
		png: "image/png",
		btif: "image/prs.btif",
		pti: "image/prs.pti",
		sgi: "image/sgi",
		svg: "image/svg+xml",
		svgz: "image/svg+xml",
		t38: "image/t38",
		tif: "image/tiff",
		tiff: "image/tiff",
		tfx: "image/tiff-fx",
		psd: "image/vnd.adobe.photoshop",
		azv: "image/vnd.airzip.accelerator.azv",
		uvi: "image/vnd.dece.graphic",
		uvvi: "image/vnd.dece.graphic",
		uvg: "image/vnd.dece.graphic",
		uvvg: "image/vnd.dece.graphic",
		djvu: "image/vnd.djvu",
		djv: "image/vnd.djvu",
		sub: "text/vnd.dvb.subtitle",
		dwg: "image/vnd.dwg",
		dxf: "image/vnd.dxf",
		fbs: "image/vnd.fastbidsheet",
		fpx: "image/vnd.fpx",
		fst: "image/vnd.fst",
		mmr: "image/vnd.fujixerox.edmics-mmr",
		rlc: "image/vnd.fujixerox.edmics-rlc",
		ico: "image/x-icon",
		dds: "image/vnd.ms-dds",
		mdi: "image/vnd.ms-modi",
		wdp: "image/vnd.ms-photo",
		npx: "image/vnd.net-fpx",
		tap: "image/vnd.tencent.tap",
		vtf: "image/vnd.valve.source.texture",
		wbmp: "image/vnd.wap.wbmp",
		xif: "image/vnd.xiff",
		pcx: "image/x-pcx",
		webp: "image/webp",
		"3ds": "image/x-3ds",
		ras: "image/x-cmu-raster",
		cmx: "image/x-cmx",
		fh: "image/x-freehand",
		fhc: "image/x-freehand",
		fh4: "image/x-freehand",
		fh5: "image/x-freehand",
		fh7: "image/x-freehand",
		jng: "image/x-jng",
		sid: "image/x-mrsid-image",
		pic: "image/x-pict",
		pct: "image/x-pict",
		pnm: "image/x-portable-anymap",
		pbm: "image/x-portable-bitmap",
		pgm: "image/x-portable-graymap",
		ppm: "image/x-portable-pixmap",
		rgb: "image/x-rgb",
		tga: "image/x-tga",
		xbm: "image/x-xbitmap",
		xpm: "image/x-xpixmap",
		xwd: "image/x-xwindowdump",
		"disposition-notification": "message/disposition-notification",
		u8msg: "message/global",
		u8dsn: "message/global-delivery-status",
		u8mdn: "message/global-disposition-notification",
		u8hdr: "message/global-headers",
		eml: "message/rfc822",
		mime: "message/rfc822",
		wsc: "message/vnd.wfa.wsc",
		"3mf": "model/3mf",
		gltf: "model/gltf+json",
		glb: "model/gltf-binary",
		igs: "model/iges",
		iges: "model/iges",
		msh: "model/mesh",
		mesh: "model/mesh",
		silo: "model/mesh",
		mtl: "model/mtl",
		dae: "model/vnd.collada+xml",
		dwf: "model/vnd.dwf",
		gdl: "model/vnd.gdl",
		gtw: "model/vnd.gtw",
		mts: "model/vnd.mts",
		ogex: "model/vnd.opengex",
		x_b: "model/vnd.parasolid.transmit.binary",
		x_t: "model/vnd.parasolid.transmit.text",
		usdz: "model/vnd.usdz+zip",
		bsp: "model/vnd.valve.source.compiled-map",
		vtu: "model/vnd.vtu",
		wrl: "model/vrml",
		vrml: "model/vrml",
		x3db: "model/x3d+fastinfoset",
		x3dbz: "model/x3d+binary",
		x3dv: "model/x3d-vrml",
		x3dvz: "model/x3d+vrml",
		x3d: "model/x3d+xml",
		x3dz: "model/x3d+xml",
		appcache: "text/cache-manifest",
		manifest: "text/cache-manifest",
		ics: "text/calendar",
		ifb: "text/calendar",
		coffee: "text/coffeescript",
		litcoffee: "text/coffeescript",
		css: "text/css",
		csv: "text/csv",
		html: "text/html",
		htm: "text/html",
		shtml: "text/html",
		jade: "text/jade",
		jsx: "text/jsx",
		less: "text/less",
		markdown: "text/markdown",
		md: "text/markdown",
		mml: "text/mathml",
		mdx: "text/mdx",
		n3: "text/n3",
		txt: "text/plain",
		text: "text/plain",
		conf: "text/plain",
		def: "text/plain",
		list: "text/plain",
		log: "text/plain",
		in : "text/plain",
		ini: "text/plain",
		dsc: "text/prs.lines.tag",
		rtx: "text/richtext",
		sgml: "text/sgml",
		sgm: "text/sgml",
		shex: "text/shex",
		slim: "text/slim",
		slm: "text/slim",
		stylus: "text/stylus",
		styl: "text/stylus",
		tsv: "text/tab-separated-values",
		t: "text/troff",
		tr: "text/troff",
		roff: "text/troff",
		man: "text/troff",
		me: "text/troff",
		ms: "text/troff",
		ttl: "text/turtle",
		uri: "text/uri-list",
		uris: "text/uri-list",
		urls: "text/uri-list",
		vcard: "text/vcard",
		curl: "text/vnd.curl",
		dcurl: "text/vnd.curl.dcurl",
		mcurl: "text/vnd.curl.mcurl",
		scurl: "text/vnd.curl.scurl",
		fly: "text/vnd.fly",
		flx: "text/vnd.fmi.flexstor",
		gv: "text/vnd.graphviz",
		"3dml": "text/vnd.in3d.3dml",
		spot: "text/vnd.in3d.spot",
		jad: "text/vnd.sun.j2me.app-descriptor",
		wml: "text/vnd.wap.wml",
		wmls: "text/vnd.wap.wmlscript",
		vtt: "text/vtt",
		s: "text/x-asm",
		asm: "text/x-asm",
		c: "text/x-c",
		cc: "text/x-c",
		cxx: "text/x-c",
		cpp: "text/x-c",
		h: "text/x-c",
		hh: "text/x-c",
		dic: "text/x-c",
		htc: "text/x-component",
		f: "text/x-fortran",
		for: "text/x-fortran",
		f77: "text/x-fortran",
		f90: "text/x-fortran",
		hbs: "text/x-handlebars-template",
		java: "text/x-java-source",
		lua: "text/x-lua",
		mkd: "text/x-markdown",
		nfo: "text/x-nfo",
		opml: "text/x-opml",
		p: "text/x-pascal",
		pas: "text/x-pascal",
		pde: "text/x-processing",
		sass: "text/x-sass",
		scss: "text/x-scss",
		etx: "text/x-setext",
		sfv: "text/x-sfv",
		ymp: "text/x-suse-ymp",
		uu: "text/x-uuencode",
		vcs: "text/x-vcalendar",
		vcf: "text/x-vcard",
		yaml: "text/yaml",
		yml: "text/yaml",
		"3gp": "video/3gpp",
		"3g2": "video/3gpp2",
		h261: "video/h261",
		h263: "video/h263",
		h264: "video/h264",
		jpgv: "video/jpeg",
		jpgm: "video/jpm",
		mj2: "video/mj2",
		mjp2: "video/mj2",
		ts: "video/mp2t",
		mp4: "video/mp4",
		mp4v: "video/mp4",
		mpg4: "video/mp4",
		mpeg: "video/mpeg",
		mpg: "video/mpeg",
		mpe: "video/mpeg",
		m1v: "video/mpeg",
		m2v: "video/mpeg",
		ogv: "video/ogg",
		qt: "video/quicktime",
		mov: "video/quicktime",
		uvh: "video/vnd.dece.hd",
		uvvh: "video/vnd.dece.hd",
		uvm: "video/vnd.dece.mobile",
		uvvm: "video/vnd.dece.mobile",
		uvp: "video/vnd.dece.pd",
		uvvp: "video/vnd.dece.pd",
		uvs: "video/vnd.dece.sd",
		uvvs: "video/vnd.dece.sd",
		uvv: "video/vnd.dece.video",
		uvvv: "video/vnd.dece.video",
		dvb: "video/vnd.dvb.file",
		fvt: "video/vnd.fvt",
		mxu: "video/vnd.mpegurl",
		m4u: "video/vnd.mpegurl",
		pyv: "video/vnd.ms-playready.media.pyv",
		uvu: "video/vnd.uvvu.mp4",
		uvvu: "video/vnd.uvvu.mp4",
		viv: "video/vnd.vivo",
		webm: "video/webm",
		f4v: "video/x-f4v",
		fli: "video/x-fli",
		flv: "video/x-flv",
		m4v: "video/x-m4v",
		mkv: "video/x-matroska",
		mk3d: "video/x-matroska",
		mks: "video/x-matroska",
		mng: "video/x-mng",
		asf: "video/x-ms-asf",
		asx: "video/x-ms-asf",
		vob: "video/x-ms-vob",
		wm: "video/x-ms-wm",
		wmv: "video/x-ms-wmv",
		wmx: "video/x-ms-wmx",
		wvx: "video/x-ms-wvx",
		avi: "video/x-msvideo",
		movie: "video/x-sgi-movie",
		smv: "video/x-smv",
		ice: "x-conference/x-cooltalk"
	};
	! function() {
		var e = _c.qrx && _c.code_allow_edit,
			t = {};
		R.modal.innerHTML = '<div class="modal-dialog" role="document">\t  <div class="modal-content">\t    <div class="modal-header">\t      <h5 class="modal-title"></h5>\t      <div class="modal-buttons">\t      \t<div class="modal-code-buttons" style="display: none">' + (e ? '<button type="button" class="btn btn-1 is-icon" data-action="save" data-tooltip="' + G("save") + '">' + E.get_svg("save_edit") + "</button>" : "") + '<button type="button" class="btn btn-1 is-icon" data-action="copy" data-tooltip="' + G("copy code") + '">' + E.get_svg("clipboard") + '</button><button type="button" class="btn btn-1 is-icon" data-action="fullscreen" data-tooltip="' + G("fullscreen") + '">' + E.get_svg_multi("expand", "collapse") + '</button></div><button class="btn btn-1 is-icon" data-action="close" data-tooltip="' + G("close") + '">' + E.get_svg("close") + '</button>\t      </div>\t    </div>\t    <div class="modal-body"></div>\t  </div>\t</div>';
		var a = R.modal.children[0],
			u = a.children[0],
			f = u.children[0],
			b = f.children[0],
			k = f.children[1].children[0],
			L = !!e && k.children[0],
			V = u.children[1];
		N.modal = {};
		var M = y((function() {
			N.modal.code_mirror && N.modal.code_mirror.refresh()
		}), 500);

		function C(e) {
			if (N.modal.open = !1, t.file && t.file.abort(), T("esc", "keyup"), N.modal.resize_listener && N.modal.resize_listener.remove(), j(R.modal_bg, [.8, 0]), j(u, [1, 0], [1, .98], (function() {
				R.modal.scrollTop = 0, document.body.style.paddingRight = "", z(), l(V), l(b), R.modal.classList.remove("modal-code-fullscreen"), u.classList.remove("modal-content-" + N.modal.type), N.modal.code_mirror = !1, "code" === N.modal.type && (k.style.display = "none")
			})), _c.history && N.modal.popstate) {
				if (N.modal.popstate.remove(), "popstate" === e.type) return;
				history.state ? history.replaceState({
					path: _c.current_path
				}, _c.current_dir.basename || "/", location.pathname + location.search) : history.back()
			}
		}

		function z(e) {
			R.modal.style.display = e ? "block" : "none", R.modal_bg.style.display = e ? "block" : "none", document.body.classList[e ? "add" : "remove"]("modal-open")
		}

		function j(e, t, i, a) {
			var n = {
				targets: e,
				opacity: t,
				easing: "easeOutQuint",
				duration: 250
			};
			i && (n.scale = i), a && (n.complete = a), anime(n)
		}

		function A(e, t, i, a, n) {
			t && e.classList.toggle(t), i && e.classList.toggle(i), !0 !== n && !1 !== n || (e.disabled = n), a && (e.dataset.tooltip_original || (e.dataset.tooltip_original = e.dataset.tooltip), e.dataset.tooltip = a == e.dataset.tooltip ? e.dataset.tooltip_original : a)
		}

		function O(e, t, i, a, n, o) {
			A(e, t, i, a, n), setTimeout((function() {
				A(e, t, i, a, !n && null), e.classList.remove("show-tooltip")
			}), o)
		}
		E.open_modal = function(o, l) {
			var s = "",
				f = !1;
			if (Object.assign(N.modal, {
				file: o,
				code: !1,
				resize_listener: !1,
				type: "dir" === o.filetype ? "dir" : "file"
			}), "dir" !== o.filetype && o.is_readable)
				if (o.is_browser_image) {
					N.modal.type = "image", o.image && o.image.width > 800 && o.image.width > o.image.height && document.documentElement.clientWidth >= 1600 && (f = !0);
					var x = !(!(o.image && o.image.width && o.image.height && "ico" != o.is_browser_image) || !_c.server_exif && W.image_orientation || !W.image_orientation && I(o.image)) && o.image.height / Math.max(o.image.width, 500) * 100;
					s = (x ? '<div style="padding-bottom:' + x + '%">' : "") + '<img data-action="zoom" src="' + n(o) + '" class="modal-image modal-image-' + o.is_browser_image + (x ? " modal-image-intrinsic" : "") + '"></img>' + (x ? "</div>" : "")
				} else F("video", o.mime) ? (N.modal.type = "video", s = '<video src="' + n(o) + '" type="' + o.mime + '" class="modal-video" controls playsinline disablepictureinpicture controlslist="nodownload"></video>') : F("audio", o.mime) ? (N.modal.type = "audio", s = E.get_file_icon(o, "modal-file-icon") + '<audio src="' + n(o) + '" type="' + o.mime + '" class="modal-audio" controls playsinline controlslist="nodownload"></audio>') : (N.modal.code = function(e) {
					if (e && !(e.filesize > _c.code_max_load)) {
						if (e.ext && "htaccess" === e.ext) return CodeMirror.findModeByName("nginx");
						var t = !!e.mime && CodeMirror.findModeByMIME(e.mime);
						return t && "null" !== t.mode || !e.ext || (t = CodeMirror.findModeByExtension(e.ext) || t), t
					}
				}(o), N.modal.code && (N.modal.type = "code", o.filesize > 1e3 && (f = !0), E.load_plugin("codemirror"), s = '<div class="spinner-border modal-preview-spinner"></div>' + E.get_file_icon(o, "modal-file-icon")));
			s || (s = E.get_file_icon(o, "modal-file-icon"));
			var h, _, w, y, L, A, S = ["image", "file"].includes(N.modal.type) || "dir" === N.modal.type && o.url_path ? "a" : "div",
				O = "<" + ("a" === S ? 'a href="' + n(o) + '" target="_blank" title="' + G("image" === N.modal.type ? "zoom" : "open in new tab") + '"' : "div") + ' class="modal-preview modal-preview-' + N.modal.type + '">' + s + "</" + S + '><div class="modal-info">' + d(!0, "modal-info-context") + g(i(o.basename), "div", "modal-info-name") + '<div class="modal-info-meta">' + (o.mime ? g(E.get_svg_file_icon(o) + o.mime, "div", "modal-info-mime") : "") + c(o.image, "div", "modal-info-dimensions") + r(o, "div", "modal-info-filesize") + (_ = "div", w = "modal-info-permissions", y = (h = o).is_readable && h.is_writeable, L = G("file permissions") + ": " + h.fileperms, A = g(E.get_svg(y ? "lock_open_outline" : "lock_outline") + h.fileperms, "span", y ? "is-readwrite" : "not-readwrite", L), g(A, _, w) + "</div>") + g(E.get_svg("date") + E.get_time(o, "llll", !1, !0), "div", "modal-info-date") + v(o.image, "div", "modal-info-exif", !0) + m(o.image, "modal-info", !0) + "</div>";
			a.classList.toggle("modal-lg", f), u.classList.add("modal-content-" + N.modal.type), b.innerText = o.basename, V.innerHTML = O, _c.history && (l && history.pushState(null, o.basename, "#" + encodeURIComponent(o.basename)), N.modal.popstate = H(window, "popstate", C)),
				function(e) {
					N.modal.open = Math.random(), T("esc", C, "keyup");
					var t = document.body.clientWidth;
					z(!0), document.body.clientWidth > t && (document.body.style.paddingRight = document.body.clientWidth - t + "px");
					j(R.modal_bg, [0, .8]), j(u, [0, 1], [.98, 1], e)
				}((function() {
					if (N.modal.code) {
						var i = N.modal.open;
						t.file = q({
							params: "action=file&file=" + encodeURIComponent(o.path),
							complete: function(a) {
								t.file = !1, E.load_plugin("codemirror", (function() {
									if (N.modal.open === i) {
										p(_class("modal-preview-spinner", V));
										var t = _class("modal-preview-code", V)[0];
										t && (p(_class("modal-file-icon", V)), N.modal.code_mirror = CodeMirror(t, {
											value: a,
											lineWrapping: !0,
											lineNumbers: !0,
											readOnly: !e,
											mode: N.modal.code.mode,
											viewportMargin: 1 / 0,
											extraKeys: Object.assign({
												F11: B,
												Esc: B
											}, e ? {
												"Ctrl-S": P,
												"Cmd-S": P
											} : {})
										}), CodeMirror.autoLoadMode(N.modal.code_mirror, N.modal.code.mode), N.modal.resize_listener = H(window, "resize", M), k.style.display = "")
									}
								}))
							}
						})
					}
				}))
		};
		var Z = w((function(e) {
			var t = N.modal.code_mirror.getValue(),
				i = t && x(t);
			O(e.target, "btn-1", i ? "btn-success" : "btn-danger", G(i ? "code copied" : "failed to copy code"), !0, 2e3)
		}), 2e3);

		function P(e) {
			if (!L.disabled) {
				if (!N.modal.file.is_writeable) return O(L, "btn-1", "btn-danger", G("file is not writeable"), !0, 2e3);
				e && L.classList.add("show-tooltip"), A(L, null, null, G("saving..."), !0), q({
					params: "action=file&file=" + N.modal.file.path + "&write=" + N.modal.code_mirror.getValue(),
					json_response: !0,
					complete: function(e) {
						O(L, "btn-1", e.success ? "btn-success" : "btn-danger", G(e.success ? "saved" : "failed to save"), !0, 2e3), e.success && S(X(), !0)
					}
				})
			}
		}

		function B() {
			R.modal.classList.toggle("modal-code-fullscreen"), M()
		}
		s(R.modal, (function(e, t) {
			if ("context" === e) E.create_contextmenu(t, N.modal.file, t.target, "modal");
			else if ("close" === e) C(t);
			else if ("zoom" === e) {
				if (N.contextmenu.is_open) return t.preventDefault();
				if (_(t, t.target.closest(".modal-preview"))) return;
				N.modal.popstate.remove(), E.open_popup(N.modal.file.path)
			} else "clipboard" === e ? h(t.target, o(N.modal.file.path) ? "btn-success" : "btn-danger", !0) : "copy" === e ? Z(t) : "fullscreen" === e ? B() : "save" === e && P()
		}))
	}();
	var K = function(e, t) {
		var i, a, n, o, l, p, s, c, r, d, m, u, v, f = this,
			g = !1,
			x = !0,
			h = {
				barsSize: {
					top: 0,
					bottom: 0
				},
				closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
				timeToIdle: 3e3,
				timeToIdleOutside: 1e3,
				loadingIndicatorDelay: 1e3,
				closeEl: !0,
				captionEl: !0,
				zoomEl: !0,
				counterEl: !0,
				arrowEl: !0,
				preloaderEl: !0,
				tapToClose: !1,
				tapToToggleControls: !0,
				clickToCloseNonZoomable: !0,
				indexIndicatorSep: " / ",
				fitControlsWidth: 1200
			},
			_ = function(e) {
				if (m) return !0;
				e = e || window.event, d.timeToIdle && d.mouseUsed && !o && k();
				for (var i, a, n = (e.target || e.srcElement).getAttribute("class") || "", l = 0; l < C.length; l++)(i = C[l]).onTap && n.indexOf("pswp__" + i.name) > -1 && (i.onTap(), a = !0);
				if (a) {
					e.stopPropagation && e.stopPropagation(), m = !0;
					var p = t.features.isOldAndroid ? 600 : 30;
					setTimeout((function() {
						m = !1
					}), p)
				}
			},
			b = function(e, i, a) {
				t[(a ? "add" : "remove") + "Class"](e, "pswp__" + i)
			},
			w = function() {
				var e = 1 === d.getNumItemsFn();
				e !== r && (b(i, "ui--one-slide", e), r = e)
			},
			y = function(e) {
				for (var i = 0; i < d.closeElClasses.length; i++)
					if (t.hasClass(e, "pswp__" + d.closeElClasses[i])) return !0
			},
			H = 0,
			k = function() {
				clearTimeout(v), H = 0, o && f.setIdle(!1)
			},
			L = function(e) {
				var t = (e = e || window.event).relatedTarget || e.toElement;
				t && "HTML" !== t.nodeName || (clearTimeout(v), v = setTimeout((function() {
					f.setIdle(!0)
				}), d.timeToIdleOutside))
			},
			V = function(e) {
				s !== e && (b(p, "preloader--active", !e), s = e)
			},
			M = function(t) {
				var i = t.vGap;
				if (!e.likelyTouchDevice || d.mouseUsed || screen.width > d.fitControlsWidth) {
					var a = d.barsSize;
					i.bottom = a.bottom, i.top = a.top
				} else i.top = i.bottom = 0
			},
			C = [{
				name: "play",
				onTap: E.toggle_play
			}, {
				name: "contextmenu",
				onTap: function() {}
			}, {
				name: "fullscreen",
				onTap: function() {
					screenfull.toggle()
				}
			}, {
				name: "caption",
				option: "captionEl",
				onInit: function(e) {
					a = e
				}
			}, {
				name: "button--zoom",
				option: "zoomEl",
				onTap: e.toggleDesktopZoom
			}, {
				name: "counter",
				option: "counterEl",
				onInit: function(e) {
					n = e
				}
			}, {
				name: "button--close",
				option: "closeEl",
				onTap: e.close
			}, {
				name: "button--arrow--left",
				option: "arrowEl",
				onTap: function() {
					E.popup_transition("prev")
				}
			}, {
				name: "button--arrow--right",
				option: "arrowEl",
				onTap: E.popup_transition
			}, {
				name: "preloader",
				option: "preloaderEl",
				onInit: function(e) {
					p = e
				}
			}];
		f.init = function() {
			var n;
			t.extend(e.options, h, !0), d = e.options, i = t.getChildByClass(e.scrollWrap, "pswp__ui"), (l = e.listen)("onVerticalDrag", (function(e) {
					x && e < .95 ? f.hideControls() : !x && e >= .95 && f.showControls()
				})), l("onPinchClose", (function(e) {
					x && e < .9 ? (f.hideControls(), n = !0) : n && !x && e > .9 && f.showControls()
				})), l("zoomGestureEnded", (function() {
					(n = !1) && !x && f.showControls()
				})), l("beforeChange", f.update), l("doubleTap", (function(t) {
					var i = e.currItem.initialZoomLevel;
					e.getZoomLevel() !== i ? e.zoomTo(i, t, 333) : e.zoomTo(d.getDoubleTapZoom(!1, e.currItem), t, 333)
				})), l("preventDragEvent", (function(e, t, i) {
					var a = e.target || e.srcElement;
					a && a.getAttribute("class") && e.type.indexOf("mouse") > -1 && (a.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(a.tagName)) && (i.prevent = !1)
				})), l("bindEvents", (function() {
					t.bind(i, "pswpTap click", _), t.bind(e.scrollWrap, "pswpTap", f.onGlobalTap), e.likelyTouchDevice || t.bind(e.scrollWrap, "mouseover", f.onMouseOver)
				})), l("unbindEvents", (function() {
					u && clearInterval(u), t.unbind(document, "mouseout", L), t.unbind(document, "mousemove", k), t.unbind(i, "pswpTap click", _), t.unbind(e.scrollWrap, "pswpTap", f.onGlobalTap), t.unbind(e.scrollWrap, "mouseover", f.onMouseOver)
				})), l("destroy", (function() {
					d.captionEl && t.removeClass(a, "pswp__caption--empty"), t.removeClass(i, "pswp__ui--over-close"), t.addClass(i, "pswp__ui--hidden"), f.setIdle(!1)
				})), d.showAnimationDuration || t.removeClass(i, "pswp__ui--hidden"), l("initialZoomIn", (function() {
					d.showAnimationDuration && t.removeClass(i, "pswp__ui--hidden")
				})), l("initialZoomOut", (function() {
					t.addClass(i, "pswp__ui--hidden")
				})), l("parseVerticalMargin", M),
				function() {
					var e, a, n, o = function(t) {
						if (t)
							for (var i = t.length, o = 0; o < i; o++) {
								e = t[o], a = e.className;
								for (var l = 0; l < C.length; l++) n = C[l], a.indexOf("pswp__" + n.name) > -1 && d[n.option] && n.onInit && n.onInit(e)
							}
					};
					o(i.children);
					var l = t.getChildByClass(i, "pswp__top-bar");
					l && o(l.children)
				}(), w(), d.timeToIdle && l("mouseUsed", (function() {
					t.bind(document, "mousemove", k), t.bind(document, "mouseout", L), u = setInterval((function() {
						2 == ++H && f.setIdle(!0)
					}), d.timeToIdle / 2)
				})), d.preloaderEl && (V(!0), l("beforeChange", (function() {
					clearTimeout(c), c = setTimeout((function() {
						e.currItem && e.currItem.loading ? (!e.allowProgressiveImg() || e.currItem.img && !e.currItem.img.naturalWidth) && V(!1) : V(!0)
					}), d.loadingIndicatorDelay)
				})), l("imageLoadComplete", (function(t, i) {
					e.currItem === i && V(!0)
				})))
		}, f.setIdle = function(e) {
			o = e, b(i, "ui--idle", e)
		}, f.update = function() {
			x && e.currItem ? (f.updateIndexIndicator(), d.captionEl && (d.addCaptionHTMLFn(e.currItem, a), b(a, "caption--empty", !e.currItem.title)), g = !0) : g = !1, w()
		}, f.updateIndexIndicator = function() {
			d.counterEl && (n.textContent = e.getCurrentIndex() + 1 + d.indexIndicatorSep + d.getNumItemsFn())
		}, f.onGlobalTap = function(i) {
			var a = (i = i || window.event).target || i.srcElement;
			if (!m)
				if (i.detail && "mouse" === i.detail.pointerType) {
					if (y(a)) return void e.close();
					t.hasClass(a, "pswp__img") && (1 === e.getZoomLevel() && e.getZoomLevel() <= e.currItem.fitRatio ? d.clickToCloseNonZoomable && e.close() : e.toggleDesktopZoom(i.detail.releasePoint))
				} else if (d.tapToToggleControls && (x ? f.hideControls() : f.showControls()), d.tapToClose && (t.hasClass(a, "pswp__img") || y(a))) return void e.close()
		}, f.onMouseOver = function(e) {
			var t = (e = e || window.event).target || e.srcElement;
			b(i, "ui--over-close", y(t))
		}, f.hideControls = function() {
			t.addClass(i, "pswp__ui--hidden"), x = !1
		}, f.showControls = function() {
			x = !0, g || f.update(), t.removeClass(i, "pswp__ui--hidden")
		}
	};

	function $() {
			yall({
				observeChanges: !0,
				observeRootSelector: "#list-ul",
				threshold: 300,
				events: {
					load: function(e) {
						e.target.parentNode.parentNode.classList.add("img-loaded"), e.target.parentNode.classList.remove("img-bg")
					}
				}
			}), document.body.classList.remove("body-loading"), anime({
				targets: document.body,
				opacity: [0, 1],
				duration: 500,
				easing: "easeOutQuad",
				complete: E.init_files
			})
		}! function() {
			function e(e) {
				e || (R.pswp.style.width = window.getComputedStyle(R.pswp).width), document.body.style.width = e ? window.getComputedStyle(document.body).width : "", document.body.style.overflow = e ? "hidden" : "", N.popup.overflow_hidden = !!e
			}

			function t(e) {
				!N.popup.is_open || x.items.length < 2 || (T(["left", "right"], (function(e) {
					e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault(), E.popup_transition(37 === e.keyCode))
				}), "keyup"), T("space", E.toggle_play, "keyup"))
			}

			function a(e) {
				return e && e.src && !e.classList.contains("img-svg") && e.offsetParent && e.naturalWidth
			}

			function o(e) {
				anime.remove(V), anime({
					targets: V,
					scaleX: e ? [0, 1] : 0,
					easing: e ? "easeInOutQuad" : "easeOutQuint",
					duration: e ? _c.popup_interval : 200
				})
			}

			function p() {
				N.popup.is_timing && (N.popup.is_timing = !1, clearTimeout(N.popup.timer), o())
			}

			function u(e) {
				N.popup.is_playing && (isNaN(e) && (e = x.getCurrentIndex()), x.items[e].loaded && e === x.getCurrentIndex() && (o(!0), N.popup.is_timing = !0, N.popup.timer = setTimeout(E.popup_transition, _c.popup_interval)))
			}
			E.popup_transition = function(e) {
				x[e ? "prev" : "next"](), anime.remove(H), anime({
					targets: H,
					translateX: [e ? -5 : 5, 0],
					opacity: [.5, 1],
					easing: "easeOutQuint",
					duration: 500
				})
			}, E.toggle_play = function() {
				N.popup.is_playing = !N.popup.is_playing, w.classList.toggle("is-playing", N.popup.is_playing), W.is_pointer && (w.dataset.tooltip = G(N.popup.is_playing ? "pause" : "play")), N.popup.is_playing || p(), N.popup.is_playing && u()
			}, R.pswp.innerHTML = '<div class="pswp__bg"></div>\t  <div class="pswp__scroll-wrap">\t    <div class="pswp__container' + (_c.server_exif ? " server-exif" : "") + '">\t      <div class="pswp__item"></div>\t      <div class="pswp__item"></div>\t      <div class="pswp__item"></div>\t    </div>\t    <div class="pswp__ui pswp__ui--hidden">\t      <div class="pswp__top-bar">\t        <div class="pswp__counter"></div>\t        <div class="pswp__search"></div>\t        <button class="pswp__button pswp__button--close"' + f(G("close (esc)")) + ">" + E.get_svg("close") + "</button>" + (W.fullscreen ? '<button class="pswp__button pswp__fullscreen"' + f(G("fullscreen")) + ">" + E.get_svg_multi("expand", "collapse") + "</button>" : "") + '\t        <button class="pswp__button pswp__button--zoom"' + f(G("zoom")) + ">" + E.get_svg_multi("zoom_in", "zoom_out") + '</button>\t        <button class="pswp__button pswp__play"' + f(G("play")) + ">" + E.get_svg_multi("play", "pause") + "</button>" + (!W.is_pointer && W.download ? '<a class="pswp__button pswp__download" href="#"' + f(G("download")) + ' target="_blank" download>' + E.get_svg("download") + "</a>" : "") + d(W.is_pointer, "pswp__button pswp__contextmenu", !0) + '\t        <div class="pswp__preloader"></div>\t      </div>\t      <button class="pswp__button pswp__button--arrow--left" title="' + G("previous") + '">' + E.get_svg("arrow_left") + '</button>\t      <button class="pswp__button pswp__button--arrow--right" title="' + G("next") + '">' + E.get_svg("arrow_right") + '</button>\t      <div class="pswp__caption"><div class="pswp__caption__center"></div></div>\t    </div>\t  </div>\t  <div class="pswp__timer"></div>', N.popup = {}, (isNaN(_c.popup_interval) || _c.popup_interval < 2e3) && (_c.popup_interval = 2e3);
			var x, h = _class("pswp__ui", R.pswp)[0],
				_ = _class("pswp__search", h)[0],
				b = _class("pswp__item", R.pswp),
				w = _class("pswp__play", h)[0],
				y = !W.is_pointer && _class("pswp__download", h)[0],
				H = _class("pswp__container", R.pswp)[0],
				k = _class("pswp__preloader", h)[0],
				L = _class("pswp__caption__center", h)[0],
				V = R.pswp.lastChild,
				M = screen.width < 375 ? "ll" : screen.width < 414 ? "lll" : "llll",
				C = screen.width >= 576;
			E.open_popup = function(o, s) {
				if (o && N.list.items.length) {
					var f = [],
						h = 0,
						w = 0;
					if (N.list.matchingItems.forEach((function(e) {
						var t = e._values;
						if (t.is_browser_image /*!is_browser_image(values)*/ && t.is_readable) {
							var i = _c.load_images && _class("img", e.elm)[0] || !1,
								a = !W.image_orientation && I(t.image);
							e = {
								src: n(t),
								w: t.image ? a ? t.image.height : t.image.width : screen.availHeight,
								h: t.image ? a ? t.image.width : t.image.height : screen.availHeight,
								pid: encodeURIComponent(t.basename),
								title: !0,
								img_el: i,
								item: t
							};
							"ico" === t.ext && e.w < 128 && (e.h = Math.round(e.h / e.w * 128), e.w = 128), i && i.src && !a && (e.msrc = i.src), f.push(e), o === t.path && (w = h, a && (s = !0)), h++
						}
					})), f.length) {
						N.popup.is_open = !0, W.scrollbar_width && window.innerWidth > document.documentElement.clientWidth && e(!0), _.style.display = R.filter.value ? "block" : "none", _.innerHTML = R.filter.value ? E.get_svg("image_search_outline") + '"' + i(R.filter.value) + '"' : "";
						var H = f[w].img_el;
						(x = new PhotoSwipe(R.pswp, K, f, {
							index: w,
							history: _c.history,
							showHideOpacity: s || !a(H),
							arrowKeys: !1,
							addCaptionHTMLFn: function(e, t) {
								var i = e.item;
								if (!i) return !1;
								i.image && i.image.iptc && i.image.iptc, i.image && i.image.exif && i.image.exif;
								if (y && (y.href = n(i, !0)), L.innerHTML = d(W.is_pointer, "popup-context") + g(i.basename, "div", "popup-basename") + c(i.image, "span", "popup-dimensions", !0) + r(i, "span", "popup-filesize", !0) + g(g(E.get_time(i, M, !1, C), "span", !1, i.DateTimeOriginal ? "DateTimeOriginal" : G("modified time")), "span", "popup-date") + v(i.image, "div", "popup-exif", !0) + m(i.image, "popup"), 1 != getComputedStyle(t).getPropertyValue("opacity")) return !0;
								var a = L.children,
									o = Math.round(200 / a.length);
								return anime({
									targets: a,
									translateX: [2, 0],
									opacity: [0, 1],
									easing: "easeOutQuad",
									duration: 333,
									delay: anime.stagger(o)
								}), !0
							},
							getThumbBoundsFn: function(e) {
								if (!s) {
									var t = f[e],
										i = N.modal.open ? N.modal.file === t.item && _class("modal-image", R.modal)[0] : t.img_el;
									if (a(i) && t.msrc) {
										var n = i.getBoundingClientRect(),
											o = t.w / t.h,
											l = n.width / n.height,
											p = window.pageYOffset || document.documentElement.scrollTop,
											c = "cover" === getComputedStyle(i).objectFit ? o < l : o > l,
											r = c ? (i.clientWidth / o - i.clientHeight) / 2 : 0,
											d = c ? 0 : (i.clientHeight * o - i.clientWidth) / 2;
										return {
											x: n.left - d,
											y: n.top - r + p,
											w: n.width + 2 * d
										}
									}
								}
							}
						})).listen("beforeChange", p), x.listen("imageLoadComplete", u), x.listen("afterChange", u), x.listen("close", (function() {
							T(["left", "right"], "keyup"), T("space", "keyup"), k.classList.remove("pswp__preloader--active"), N.popup.is_playing && E.toggle_play(), N.popup.is_open = !1, N.popup.overflow_hidden && e(!1)
						})), x.listen("destroy", (function() {
							b.forEach(l)
						})), x.init(), f.length > 1 && E.load_plugin("mousetrap", t)
					}
				}
			}, s(h, (function(e, t) {
				"context" === e && E.create_contextmenu(t, x.currItem.item, t.target, "popup")
			}))
		}(),
		function() {
			if (_c.menu_enabled) {
				R.sidebar = _id("sidebar"), R.sidebar_inner = _id("sidebar-inner"), R.sidebar_menu = _id("sidebar-menu"), R.sidebar_toggle = _id("sidebar-toggle"), R.sidebar_modal = _id("sidebar-bg"), R.sidebar_topbar = _id("sidebar-topbar");
				var e, a, o, l, p, s, c = !1,
					r = !1,
					d = {},
					m = !1,
					u = !!(s = S("files:menu-expanded:" + _c.location_hash)) && JSON.parse(s),
					v = _c.menu_show && matchMedia("(min-width: 992px)").matches;
				v || document.documentElement.classList.add("sidebar-closed"), E.menu_loading = function(e, t) {
					e || (e = r), e && _class("menu-icon-folder", e)[0].classList.toggle("menu-spinner", t)
				}, E.set_menu_active = function(e) {
					var t = r,
						i = !!_c.dirs[e] && _c.dirs[e].menu_li;
					(r = !!i && i.firstChild) != t && (t && E.menu_loading(t, !1), w(t, !1), w(r, !0))
				}, R.sidebar_toggle.innerHTML = E.get_svg_multi("menu", "menu_back"), b(R.sidebar_toggle, C, "click"), b(R.sidebar_modal, C, "click");
				var f = S("files:menu:" + _c.menu_cache_hash),
					g = !!f && JSON.parse(f),
					x = _c.menu_cache_validate || _c.cache && !_c.menu_cache_file;
				!(!f || x && ! function() {
					for (var e = g.length, t = 0; t < e; t++)
						if (g[t].path.includes("/")) return !1;
					return !0
				}()) ? T(g, "menu from localstorage [" + (_c.menu_cache_validate ? "shallow menu" : "menu cache validation disabled") + "]"): (R.sidebar_menu.classList.add("sidebar-spinner"), R.sidebar_menu.dataset.title = G("loading") + " …", q({
					params: !_c.menu_cache_file && "action=dirs" + (_c.cache ? "&menu_cache_hash=" + _c.menu_cache_hash : "") + (f ? "&localstorage=1" : ""),
					url: _c.menu_cache_file,
					json_response: !0,
					complete: function(e, t, i) {
						if (R.sidebar_menu.classList.remove("sidebar-spinner"), delete R.sidebar_menu.dataset.title, !i || !e || e.error || !Object.keys(e).length) return J(), void j("Error or no dirs!");
						e.localstorage ? T(g, "menu from localstorage") : (T(e, "menu from " + (_c.menu_cache_file ? "JSON cache: " + _c.menu_cache_file : "xmlhttp")), W.local_storage && setTimeout((function() {
							E.clean_localstorage(), S("files:menu:" + _c.menu_cache_hash, t)
						}), 1e3))
					}
				})), _c.prevent_right_click || b(R.sidebar_menu, (function(e) {
					E.create_contextmenu(e, !1, !1, "sidebar")
				}), "contextmenu")
			}

			function w(e, t) {
				if (e) {
					e.classList.toggle("menu-active", t);
					for (var i = e.parentNode.parentNode.parentNode; i.classList.contains("menu-li");) i.classList.toggle("menu-active-ancestor", t), i = i.parentNode.parentNode
				}
			}

			function H(t, i) {
				if ("all" === t) i ? V(o, (function(e) {
					d[e.dataset.path] = !0
				})) : d = {};
				else {
					var a = t.dataset.path;
					i ? d[a] = !0 : d[a] && delete d[a]
				}
				var n = Object.keys(d).length,
					l = n === o.length;
				m !== l && (m = l, e.classList.toggle("is-expanded", m)), W.local_storage && (c && clearTimeout(c), c = setTimeout((function() {
					S("files:menu-expanded:" + _c.location_hash, !n || JSON.stringify(d))
				}), 1e3))
			}

			function M(e, t, i) {
				var a = e.lastChild;
				a.style.display = "block", anime.remove(a);
				var n = {
					targets: a,
					translateY: t ? [-5, 0] : -5,
					height: [a.clientHeight + "px", t ? a.scrollHeight + "px" : 0],
					opacity: t ? 1 : 0,
					easing: "easeOutQuint",
					duration: 250,
					complete: function() {
						a.style.cssText = null, i && i()
					}
				};
				anime(n), e.classList.toggle("is-open", t)
			}

			function C(e) {
				E.set_option("menu_show", !_c.menu_show), document.documentElement.classList.toggle("sidebar-closed"), v = !v
			}

			function z(e, t) {
				for (var i = "", a = 0; a < t; a++) i += e;
				return i
			}

			function A(e, a) {
				var o = "menu-li",
					l = e.path ? (e.path.match(/\//g) || []).length + 1 : 0,
					p = "folder" + (e.is_readable ? e.is_link ? "_link" : "" : "_forbid");
				return a ? (o += " has-ul", u && u[e.path] && (o += " is-open", d[e.path] = !0)) : e.is_readable || (o += " li-forbidden"), '<li data-level="' + l + '" data-path="' + t(e.path) + '" class="' + o + '"><a href="' + n(e) + '" class="menu-a menu-a-' + l + '">' + (a ? '<span class="menu-icon-toggle">' + E.get_svg_multi("plus", "minus") + "</span>" : "") + '<span class="menu-icon-folder' + (a ? " menu-icon-folder-toggle" : "") + '">' + (a ? E.get_svg_multi(p, "folder_plus", "folder_minus") : E.get_svg(p)) + "</span>" + i(e.basename) + "</a>"
			}

			function T(t, i) {
				var n, s, c, u, f, g, x, w, T;
				if (J(), j(i, t), _c.dir_paths = [], V(t, (function(e) {
					_c.dir_paths.push(e.path), _c.dirs[e.path] || (_c.dirs[e.path] = e)
				})), E.menu_init_files(), n = "", s = 0, c = 0, u = !1, V(_c.dir_paths, (function(e, t) {
					if (e) {
						var i = (e.match(/\//g) || []).length + 1,
							a = i - s;
						s = i, c += a, u && (n += A(u, a > 0)), n += a > 0 ? '<ul class="menu-' + (u ? "ul" : "root") + '">' : "</li>" + z("</ul></li>", -a), u = _c.dirs[e]
					}
				})), n += A(u, !1) + z("</li></ul>", c), R.sidebar_menu.innerHTML = n, a = R.sidebar_menu.firstChild, o = _class("has-ul", a), l = o.length ? L(Array.from(a.children), "has-ul", !0) : [], f = l, p = o.filter((function(e) {
					return !f.includes(e)
				})), V(_class("menu-li", a), (function(e) {
					var t = _c.dirs[e.dataset.path];
					t && (t.menu_li = e)
				})), E.set_menu_active(_c.current_path || _c.init_path), N.ls_options.menu_scroll && (R.sidebar_menu.scrollTop = N.ls_options.menu_scroll), W.local_storage && b(R.sidebar_menu, y((function() {
					E.ls_option("menu_scroll", R.sidebar_menu.scrollTop)
				}), 1e3), "scroll"), o.length && (g = !1, m = Object.keys(d).length === o.length, R.sidebar_topbar.innerHTML = '<button id="menu-toggle" type="button" class="btn-icon' + (m ? " is-expanded" : "") + '">' + E.get_svg_multi("plus", "minus") + "</button>", b(e = R.sidebar_topbar.lastChild, (function(e) {
					if (m) {
						var t = [],
							i = [],
							a = !1,
							n = window.innerHeight;
						V(l, (function(e) {
							if (e.classList.contains("is-open"))
								if (a) t.push(e);
								else {
									var o = e.getBoundingClientRect();
									o.top > n || o.bottom - o.top > 2 * n ? (t.push(e), a = !0) : i.push(e)
								}
						})), t.length && V(t, (function(e) {
							e.classList.remove("is-open")
						})), i.length && V(i, (function(e) {
							M(e, !1)
						})), g && clearTimeout(g), g = setTimeout((function() {
							k(p, "is-open", !1)
						}), i.length ? 260 : 10)
					} else o.length > 100 ? k(o, "is-open", !0) : (t = [], i = [], a = !1, n = window.innerHeight, V(o, (function(e) {
						e.classList.contains("is-open") || (a || !e.offsetParent ? t.push(e) : e.getBoundingClientRect().top > n || e.lastChild.childNodes.length > 50 ? (a = !0, t.push(e)) : i.push(e))
					})), t.length && V(t, (function(e) {
						e.classList.add("is-open")
					})), i.length && V(i, (function(e) {
						M(e, !0)
					})));
					H("all", !m)
				}), "click")), _c.breadcrumbs && E.async_breadcrumb_links(), _c.transitions && v) {
					var S = {
						targets: function() {
							for (var e = [], t = a.children, i = t.length, n = R.sidebar_inner.clientHeight, o = 0; o < i; o++) {
								var l = t[o];
								if (l.getBoundingClientRect().top < n) e.push(l);
								else if (e.length) break
							}
							return e
						}(),
						translateY: [-5, 0],
						opacity: [0, 1],
						easing: "easeOutCubic",
						duration: 100
					};
					S.delay = anime.stagger((x = Math.round(200 / S.targets.length), w = 50, T = 20, Math.min(Math.max(x, T), w))), anime(S)
				}
				b(a, (function(e) {
					if (N.contextmenu.is_open) return e.preventDefault();
					if (e.target !== a) {
						var t = "A" === e.target.nodeName,
							i = t ? e.target.parentNode : e.target.closest("li"),
							n = t ? e.target : i.firstChild;
						if (!_(e, n))
							if (t && n !== r) E.get_files(i.dataset.path, "push"), matchMedia("(min-width: 992px)").matches ? _c.menu_show || h(R.sidebar, "sidebar-clicked", null, 1e3) : C();
							else if (!t || i.classList.contains("has-ul")) {
							var o = !i.classList.contains("is-open");
							H(i, o), M(i, o)
						}
					}
				}))
			}
		}(),
		function() {
			function e(e, t) {
				N.sort.keys.includes(e) || (e = "name"), ["asc", "desc"].includes(t) || (t = N.sort.sorting[e].sort), Object.assign(N.sort, {
					sort: e,
					order: t,
					multi: "asc" === t ? 1 : -1,
					index: N.sort.keys.indexOf(e),
					prop: N.sort.sorting[e].prop
				})
			}
			N.sort = {
				sorting: {
					name: {
						prop: "sort_name",
						lang: G("name"),
						order: "asc"
					},
					kind: {
						prop: "ext",
						lang: G("kind"),
						order: "asc"
					},
					filesize: {
						prop: "filesize",
						lang: G("size"),
						order: "desc"
					},
					date: {
						prop: "mtime",
						lang: G("date"),
						order: "desc"
					}
				}
			}, N.sort.keys = Object.keys(N.sort.sorting);
			var t = (_c.sort || "name_asc").split("_");
			e(t[0], t[1]);
			var i = _id("change-sort");
			i.innerHTML = '<button type="button" class="btn-icon btn-topbar">' + E.get_svg("sort_" + N.sort.sort) + '</button><div class="dropdown-menu dropdown-menu-right"><h6 class="dropdown-header">' + G("sort") + "</h6>" + M(N.sort.keys, (function(e) {
				return '<button class="dropdown-item' + (e === N.sort.sort ? " active sort-" + N.sort.order : "") + '" data-action="' + e + '">' + E.get_svg("sort_" + e) + N.sort.sorting[e].lang + E.get_svg_multi("menu_down", "menu_up") + "</button>"
			})) + "</div>";
			var a = i.firstChild,
				n = (i.children[1], i.lastChild),
				o = _class("dropdown-item", n);

			function l(e, t) {
				var i = "dir" === e._values.filetype,
					a = "dir" === t._values.filetype;
				return i ? a ? p(e, t) : -1 * N.sort.multi : a ? 1 * N.sort.multi : p(e, t)
			}

			function p(e, t) {
				return e._values[N.sort.prop] === t._values[N.sort.prop] ? e._values.sort_name < t._values.sort_name ? -1 : 1 : e._values[N.sort.prop] < t._values[N.sort.prop] ? -1 : 1
			}

			function c(e, t, i) {
				var a = i ? "add" : "remove";
				e && (o[N.sort.index].classList[a]("active"), r[N.sort.index].classList[a]("sortbar-active")), (e || t) && (o[N.sort.index].classList[a]("sort-" + N.sort.order), r[N.sort.index].classList[a]("sort-" + N.sort.order))
			}
			E.set_sort = function(t) {
				if (t) {
					var i = t !== N.sort.sort,
						n = i ? N.sort.sorting[t].order : "asc" === N.sort.order ? "desc" : "asc",
						o = n !== N.sort.order;
					c(i, o, !1), e(t, n), i && (a.innerHTML = E.get_svg("sort_" + t)), c(i, o, !0), E.set_option("sort", N.sort.sort + "_" + N.sort.order)
				}
				N.list.sort(N.sort.prop, {
					order: N.sort.order,
					sortFunction: _c.sort_dirs_first ? l : p
				})
			}, E.dropdown(i, a, (function() {
				E.set_sort(N.sort.keys[N.sort.index >= N.sort.keys.length - 1 ? 0 : N.sort.index + 1])
			})), s(n, E.set_sort), R.sortbar = _id("files-sortbar"), R.sortbar.className = "sortbar-" + _c.layout + ("list" === _c.layout && N.ls_options.layout_subindex ? "-big" : ""), R.sortbar.innerHTML = '<div class="sortbar-inner">' + M(N.sort.keys, (function(e) {
				return '<div class="sortbar-item sortbar-' + e + (e === N.sort.sort ? " sortbar-active sort-" + N.sort.order : "") + '" data-action="' + e + '">' + N.sort.sorting[e].lang + E.get_svg_multi("menu_down", "menu_up") + "</div>"
			})) + "</div>";
			var r = R.sortbar.firstChild.children;
			s(R.sortbar, E.set_sort)
		}(), document.addEventListener("mouseover", (function(e) {
			if (e.target.dataset.tooltip) {
				var t = e.target.getBoundingClientRect(),
					i = e.target.className ? C(e.target.className.split(" "), (function(e) {
						if (!e.startsWith("tooltip-")) return e
					})) : [];
				i.push("tooltip-" + (t.top > 100 ? "top" : "bottom")), t.left < 100 ? i.push("tooltip-right") : t.right > document.documentElement.clientWidth - 100 && i.push("tooltip-left");
				var a = i.join(" ");
				e.target.className != a && (e.target.className = a)
			}
		})),
		function() {
			var e;
			if (N.topbar = {
				info: {}
			}, R.filter.placeholder = G("search"), R.filter.title = (e = "F", G("search") + " [" + (W.is_mac ? "⌘" : "ctrl-") + e + "]"), _c.has_login) {
				var t = _id("logout");
				t.innerHTML = E.get_svg("logout"), t.dataset.tooltip = G("logout"), t.classList.add("tooltip-left", "tooltip-bottom"), b(t, (function(e) {
					confirm("are you sure you want to log out?") || e.preventDefault()
				}))
			}
			var i = _id("topbar-fullscreen");
			screenfull.isEnabled ? (i.innerHTML = E.get_svg_multi("expand", "collapse"), i.dataset.tooltip = G("fullscreen"), i.classList.add("tooltip-left", "tooltip-bottom"), i.addEventListener("click", (function() {
				screenfull.toggle()
			})), screenfull.on("change", (function() {
				document.documentElement.classList.toggle("is-fullscreen", screenfull.isFullscreen)
			}))) : i.style.display = "none", E.topbar_info = function(e, t) {
				e ? (R.topbar_info.className = "info-" + t, R.topbar_info.innerHTML = e, N.topbar.info.type = t) : function(e) {
					for (; e.classList.length;) e.classList.remove(e.classList[0])
				}(R.topbar_info)
			}, E.topbar_info_search = function(e, t) {
				if (R.filter.classList.toggle("nomatches", !t), !e) return E.topbar_info();
				R.topbar_info.classList.toggle("nomatches", !t), "search" === N.topbar.info.type ? (R.topbar_info.classList.contains("info-search") || R.topbar_info.classList.add("info-search"), _class("info-search-count", R.topbar_info)[0].innerText = t, _class("info-search-phrase", R.topbar_info)[0].innerText = e) : E.topbar_info('<span class="info-search-count">' + t + "</span>" + G("matches found for") + '<span class="info-search-phrase">' + e + '</span><button class="info-search-reset" title="' + G("remove search") + '" data-action="reset">' + E.get_svg("close") + "</button>", "search")
			}
		}(), "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype ? $() : E.load_plugin("intersection-observer", $, {
			src: ["intersection-observer@0.7.0/intersection-observer.min.js"]
		})
}("undefined" == typeof files ? files = {} : files);