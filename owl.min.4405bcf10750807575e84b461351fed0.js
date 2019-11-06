!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Owl = t() : e.Owl = t()
}(this, function() {
    return function(e) {
        function t(n) {
            if (r[n])
                return r[n].exports;
            var i = r[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(i.exports, i, i.exports, t),
            i.loaded = !0,
            i.exports
        }
        var r = {};
        return t.m = e,
        t.c = r,
        t.p = "",
        t(0)
    }([function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , o = r(1)
          , a = r(8)
          , s = r(11)
          , c = r(14)
          , u = r(20)
          , f = r(24)
          , g = r(27)
          , p = r(28)
          , l = r(29)
          , h = r(18)
          , d = r(6)
          , v = r(31)
          , m = r(32)
          , y = r(34)
          , w = r(35)
          , b = r(4).version
          , M = r(13)
          , E = r(3)
          , S = r(10)
          , T = r(36)
          , k = function() {
            function e(t, r) {
                n(this, e);
                var i = new o(t);
                this.errManager = new c(i,this),
                this.pageManager = new f(i),
                this.resManager = new u(i,this.errManager),
                this.metricManager = new g(i),
                this.logManager = new p(i),
                this.pvManager = new l(i),
                this.cfgManager = i,
                this.init(),
                r && r.noFilter || a(this.cfgManager)
            }
            return i(e, [{
                key: "init",
                value: function() {
                    this.cfgManager.setExtension(w.getExt())
                }
            }, {
                key: "config",
                value: function(e) {
                    this.cfgManager.set(e)
                }
            }, {
                key: "debug",
                value: function() {
                    this.cfgManager.set({
                        devMode: !0
                    }),
                    E.setDebug()
                }
            }, {
                key: "addError",
                value: function(e, t) {
                    t && t.combo === !1 ? this.errManager.report(e, t) : this.cfgManager.get("error").combo === !1 ? this.errManager.report(e, t) : this.errManager.push(e, t)
                }
            }, {
                key: "sendErrors",
                value: function() {
                    this.errManager.report()
                }
            }, {
                key: "addPoint",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                      , t = this.pageManager.getPerformaceTiming()
                      , r = t.perf
                      , n = void 0;
                    if (void 0 !== e.duration)
                        n = e;
                    else if (void 0 !== r) {
                        var i = e.timeStamp || +new Date;
                        n = {
                            position: e.position,
                            duration: i - r.navigationStart
                        }
                    }
                    n && (this.pageManager.setUserReady(),
                    this.pageManager.push(n),
                    this.pageManager.report())
                }
            }, {
                key: "sendPoints",
                value: function() {
                    this.pageManager.report(!0)
                }
            }, {
                key: "addApi",
                value: function(e) {
                    if (e) {
                        if (void 0 !== e.networkCode && "number" != typeof e.networkCode)
                            return E.ignore("网络状态码必须为Number类型", JSON.stringify(e));
                        if (void 0 !== e.statusCode && "number" != typeof e.statusCode)
                            return E.ignore("业务状态码必须为Number类型", JSON.stringify(e));
                        var t = void 0
                          , r = void 0;
                        t = e.networkCode ? e.networkCode : 0 === e.networkCode ? e.networkCode : "",
                        r = e.statusCode ? e.statusCode : 0 === e.statusCode ? e.statusCode : "";
                        var n = {
                            type: "api",
                            connectType: e.connectType || "",
                            resourceUrl: e.name,
                            statusCode: t + "|" + r,
                            responsetime: e.responseTime && e.responseTime.toString() ? e.responseTime.toString() : "0"
                        };
                        e.content && (n.firstCategory = M.AJAX,
                        n.secondCategory = e.secondCategory || e.name,
                        n.logContent = e.content),
                        this.resManager.pushApi(n)
                    }
                }
            }, {
                key: "reportApi",
                value: function() {
                    this.addApi.apply(this, arguments)
                }
            }, {
                key: "sendApis",
                value: function() {
                    this.resManager.report()
                }
            }, {
                key: "addLog",
                value: function(e) {
                    return "string" != typeof e ? "addLog只接受string类型的日志" : void this.logManager.addLog(e)
                }
            }, {
                key: "createLog",
                value: function() {
                    var e = this.cfgManager
                      , t = new p(e);
                    return t
                }
            }, {
                key: "resetPv",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                      , t = "owl-" + d()
                      , r = {
                        pageUrl: e && e.pageUrl || this.cfgManager.get("pageUrl"),
                        project: e && e.project || this.cfgManager.get("project"),
                        pageId: t
                    };
                    this.cfgManager.set({
                        pageId: t
                    }),
                    this.pvManager.report(r)
                }
            }, {
                key: "reportPv",
                value: function() {
                    var e = {
                        pageId: this.cfgManager.get("pageId")
                    };
                    this.pvManager.report(e)
                }
            }, {
                key: "updateFilter",
                value: function(e, t) {
                    void 0 === t ? this.cfgManager.removeFilter(e) : this.cfgManager.addFilter(e, t)
                }
            }, {
                key: "wrap",
                value: function(e, t, r) {
                    if ("function" != typeof e)
                        return e;
                    try {
                        if (e.__owl_wrapped__)
                            return e;
                        if (e.__owl_wrapper__)
                            return e.__owl_wrapper__
                    } catch (t) {
                        return e
                    }
                    var n = function() {
                        try {
                            return e.apply(t, arguments)
                        } catch (e) {
                            x.addError(e, r)
                        }
                    };
                    for (var i in e)
                        e.prototype.hasOwnProperty(i) && (n[i] = e[i]);
                    return n.prototype = e.prototype,
                    e.__owl_wrapper__ = n,
                    n.__owl_wrapper__ = !0,
                    n
                }
            }, {
                key: "setDimension",
                value: function(e) {
                    this.cfgManager.setExtension(e)
                }
            }]),
            e
        }()
          , x = new k({},{
            noFilter: !0
        });
        x.OWL = k,
        x.__version__ = b,
        x.errorModel = s,
        x.MetricManager = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : x.cfgManager
              , t = new g(e);
            return t
        }
        ,
        x.start = function(e) {
            var t = S.getUserAgent()
              , n = !1;
            if (T.forEach(function(e) {
                t.indexOf(e) !== -1 && (n = !0,
                E.ignore("当前环境被判断为爬虫，监控功能关闭"))
            }),
            !n && !this.isStarted) {
                if (this.isStarted = !0,
                x.cfgManager.set({
                    pageUrl: S.getHref()
                }),
                e) {
                    var i = e && e.resource && e.resource.sampleConfigurable;
                    e && e.resource && e.resource.sample && !i && (e.resource.sample = void 0),
                    x.cfgManager.set(e)
                }
                if (this.cfgManager.get("logan").enable) {
                    var o = this.cfgManager.get("logan").Logan
                      , s = this.cfgManager.get("project")
                      , c = this.cfgManager.get("pageUrl")
                      , u = this.cfgManager.get("logan").config;
                    h.ready({
                        LoganAPI: o,
                        project: s,
                        pageUrl: c,
                        loganConfig: u
                    })
                }
                a(x.cfgManager),
                y(x.pageManager),
                v(x.errManager),
                m(x.resManager, x.errManager);
                var f = e.preLoadName || "_Owl_";
                if (window[f]) {
                    window[f].isReady = !0;
                    var g = window[f]
                      , p = g.preTasks
                      , l = g.dataSet;
                    p && p.length && (p.forEach(function(e) {
                        x[e.api].apply(x, e.data)
                    }),
                    window[f].preTasks = []),
                    setTimeout(function() {
                        l && l.length && l.forEach(function(e) {
                            e && "jsError" === e.type ? x.errManager.parseWindowError.apply(x.errManager, e.data) : "resError" === e.type ? x.resManager.handleResourceLoadError.apply(x.resManager, e.data) : "resTime" === e.type ? x.resManager.handleResourceTiming.apply(x.resManager, e.data) : "pageTime" === e.type && x.pageManager.parsePageTime.apply(x.pageManager, e.data)
                        }),
                        window[f].dataSet = []
                    }, 0)
                }
                var d = x.cfgManager.get("isSPA") || x.cfgManager.get("onpopstate");
                if (d) {
                    var w = window.onpopstate;
                    window.onpopstate = function(e) {
                        x.cfgManager.set({
                            pageUrl: S.getHref()
                        });
                        var t = x.cfgManager.get("onpopstate");
                        try {
                            t(e)
                        } catch (e) {
                            E.ignore(e)
                        }
                        w && w.apply(window, e)
                    }
                }
                x.errManager.checkCache();
                var b = r(37);
                b("owl_sdk", x),
                x.cfgManager.get("autoCatch") && x.cfgManager.get("autoCatch").pv && x.reportPv()
            }
        }
        ,
        e.exports = x
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , o = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , a = r(2)
          , s = r(3)
          , c = r(4).version
          , u = r(5)
          , f = r(6)
          , g = r(7)
          , p = ["region", "operator", "network", "container", "os", "unionId"]
          , l = g + "//catfront.dianping.com"
          , h = g + "//catfront.51ping.com"
          , d = function() {
            function e(t) {
                n(this, e),
                this.url = l,
                this.filters = [],
                this._config = {
                    devMode: !1,
                    project: "",
                    pageUrl: "",
                    logan: {
                        enable: !1
                    },
                    disabledFilters: [],
                    noScriptError: !0,
                    ignoreList: {
                        js: ["Illegal invocation"],
                        ajax: ["https?://report.meituan.com/"],
                        resource: ["https?://hls.dianping.com/", "https?://frep.meituan.net/"]
                    },
                    resourceReg: /(.51ping|.dianping|.dpfile|.meituan|.sankuai|.kuxun|.maoyan|.neixin|.mobike|.dper.com)/,
                    disableCache: !1,
                    invalid: {
                        ajax: !0
                    },
                    autoCatch: {
                        page: !0,
                        ajax: !0,
                        js: !0,
                        resource: !0,
                        console: !1,
                        pv: !0
                    },
                    ajax: {
                        invalid: !0,
                        flag: !1,
                        duration: 2e3
                    },
                    image: {
                        flag: !1,
                        duration: 5e3,
                        fileSize: 100,
                        filter: function() {
                            return !1
                        }
                    },
                    resource: {
                        sample: .1,
                        sampleConfigurable: !1,
                        sampleApi: .1,
                        combo: !0,
                        delay: 1e3
                    },
                    page: {
                        auto: !0,
                        sample: .5,
                        delay: 0,
                        timeThreshold: 5,
                        mainResourceNumber: 5,
                        sensoryIndex: !0,
                        getFirstScreenTime: !0,
                        disableSensoryImageIndex: !1,
                        ignoreIframe: !0,
                        logFirstScreen: !1,
                        interactToStopMutation: !1
                    },
                    error: {
                        sample: 1,
                        delay: 1e3,
                        combo: !1,
                        maxSize: 10240,
                        maxNum: 100,
                        maxTime: 6e4
                    },
                    metric: {
                        sample: .5,
                        combo: !0,
                        delay: 1500
                    },
                    pageId: "owl-" + f()
                },
                this.baseQuery = {
                    v: 1,
                    sdk: c
                },
                this.apiPaths = {
                    log: "/api/log",
                    error: "/api/log",
                    page: "/api/speed",
                    resource: "/batch",
                    metric: "/api/metric",
                    pv: "/api/pv"
                },
                this.extensions = {},
                this.userConfig = {},
                this.config = {},
                t ? this.set(t) : this.config = this._config
            }
            return o(e, [{
                key: "removeFilter",
                value: function(e) {
                    for (var t = 0; t < this.filters.length; t++) {
                        var r = this.filters[t];
                        if (r.key === e)
                            return void this.filters.splice(t, 1)
                    }
                }
            }, {
                key: "addFilter",
                value: function(e, t) {
                    if (e && t instanceof Function && this.config.disabledFilters && this.config.disabledFilters.indexOf(e) === -1) {
                        for (var r = -1, n = 0; n < this.filters.length; n++) {
                            var i = this.filters[n];
                            i.key === e && (r = n,
                            i.fn = t)
                        }
                        r === -1 && this.filters.push({
                            key: e,
                            fn: t
                        })
                    }
                }
            }, {
                key: "get",
                value: function(e) {
                    return e ? this.config[e] : this.config
                }
            }, {
                key: "set",
                value: function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) {
                            if ("devMode" === t && (this.setApiDomain(e[t]),
                            e[t] && s.setDebug()),
                            "ext" === t && this.setExtension(e[t]),
                            "resourceReg" === t)
                                try {
                                    this.userConfig[t] = new RegExp(e[t])
                                } catch (e) {
                                    s.ignore(e)
                                }
                            "object" !== i(e[t]) || e[t]instanceof RegExp || e[t]instanceof Array ? this.userConfig[t] = e[t] : "pageUrl" !== t && (this.userConfig[t] = a(this.userConfig[t], e[t]))
                        }
                    this.update()
                }
            }, {
                key: "setApiDomain",
                value: function(e) {
                    e ? this.url = h : this.url = l
                }
            }, {
                key: "getExtension",
                value: function(e) {
                    return e ? this.extensions[e] : this.extensions
                }
            }, {
                key: "setExtension",
                value: function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) {
                            var r = e[t];
                            "latlng" === t ? (this.extensions.region = r,
                            this.baseQuery.useLatlng = !0) : p.indexOf(t) !== -1 && (this.extensions[t] = r)
                        }
                }
            }, {
                key: "getApiPath",
                value: function(e) {
                    var t = this.apiPaths[e];
                    return u.stringify(this.url + t, this.baseQuery)
                }
            }, {
                key: "update",
                value: function() {
                    this.config = this._config;
                    for (var e in this.userConfig) {
                        var t = this.userConfig[e];
                        "object" != ("undefined" == typeof t ? "undefined" : i(t)) || t instanceof RegExp || t instanceof Array ? this.config[e] = t : this.config[e] = a(this.config[e], this.userConfig[e])
                    }
                }
            }]),
            e
        }();
        e.exports = d
    }
    , function(e, t) {
        "use strict";
        e.exports = function(e, t) {
            var r = {}
              , n = void 0;
            for (n in e)
                r[n] = e[n];
            for (n in t)
                t.hasOwnProperty(n) && void 0 !== t[n] && (r[n] = t[n]);
            return r
        }
    }
    , function(e, t) {
        "use strict";
        e.exports = {
            devMode: !1,
            setDebug: function() {
                this.devMode = !0
            },
            ignore: function() {
                window.Owl && window.Owl.debugLog && (window.console.log("【OWL日志:】"),
                window.console.log && window.console.log.apply(window.console, arguments))
            },
            log: function() {
                this.devMode && console.log.apply(console, arguments)
            },
            logScreen: function() {
                window.Owl && window.Owl.cfgManager.get("page") && window.Owl.cfgManager.get("page").logFirstScreen && console.log.apply(console, arguments)
            }
        }
    }
    , function(e, t) {
        "use strict";
        t.version = "1.8.12"
    }
    , function(e, t) {
        "use strict";
        e.exports = {
            stringify: function(e, t) {
                if (!t)
                    return e;
                var r = [];
                for (var n in t)
                    t.hasOwnProperty(n) && r.push(n + "=" + t[n]);
                return ~e.indexOf("?") ? e + "&" + r.join("&") : e + "?" + r.join("&")
            }
        }
    }
    , function(e, t) {
        "use strict";
        function r() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        function n() {
            return r() + r() + "-" + r() + "-" + r() + "-" + r() + "-" + r() + r() + r()
        }
        e.exports = n
    }
    , function(e, t) {
        "use strict";
        var r = window.location.protocol ? window.location.protocol : "http:";
        r = new RegExp("http").test(r) ? r : "http:",
        e.exports = r
    }
    , function(e, t, r) {
        "use strict";
        var n = r(9)
          , i = r(10);
        e.exports = function(e) {
            var t = i.getUserAgent();
            e.get("devMode") || (e.addFilter("base", n.base),
            /MicroMessenger/.test(t) ? e.addFilter("weixin", n.weixin) : /dp\/com\.dianping/.test(t) && e.addFilter("dianping", n.dianping))
        }
    }
    , function(e, t) {
        "use strict";
        e.exports = {
            base: function(e) {
                return !e.resourceUrl || /\.(dpfile|dianping|51ping|meituan|sankuai)\.(com|net)/.test(e.resourceUrl)
            },
            weixin: function(e) {
                return !/(WeixinJSBridge|_WXJS|WebViewJavascriptBridge)/.test(e.sec_category)
            },
            dianping: function(e) {
                return !/document.elementFromPoint/.test(e.sec_category)
            }
        }
    }
    , function(e, t) {
        "use strict";
        var r = {
            getInstance: function() {
                return window
            },
            getConstructor: function() {
                return Window
            },
            getOrigin: function() {
                var e = window.location.origin;
                return e || (e = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")),
                e
            },
            getProtocol: function() {
                var e = window.location.protocol;
                return e
            },
            getHref: function() {
                var e = window.location.href;
                return e
            },
            getUserAgent: function() {
                return window.navigator.userAgent
            },
            getAppName: function() {
                return window.navigator.appName
            }
        };
        e.exports = r
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , o = r(2)
          , a = r(12)
          , s = r(13)
          , c = ["project", "pageUrl", "realUrl", "resourceUrl", "category", "sec_category", "level", "unionId", "timestamp", "content"]
          , u = ["rowNum", "colNum", "tags"].concat(c)
          , f = function() {
            function e(t) {
                if (n(this, e),
                t) {
                    var r = void 0;
                    for (r in t)
                        t.hasOwnProperty(r) && (this[r] = t[r]);
                    this.parse(t)
                }
            }
            return i(e, [{
                key: "parse",
                value: function() {
                    this.category || (this.category = s.SCRIPT),
                    this.level || (this.level = a.ERROR),
                    this.timestamp || (this.timestamp = +new Date),
                    this.sec_category || (this.sec_category = "default")
                }
            }, {
                key: "isEqual",
                value: function(e) {
                    return this.sec_category === e.sec_category && this.resourceUrl === e.resourceUrl && this.colNum === e.colNum && this.rowNum === e.rowNum && this.content === e.content
                }
            }, {
                key: "update",
                value: function(e) {
                    for (var t in e)
                        void 0 !== e[t] && u.indexOf(t) !== -1 && (this[t] = e[t]);
                    return this
                }
            }, {
                key: "updateTags",
                value: function(e) {
                    var t = o(this.tags || {}, e);
                    return this.tags = t,
                    this
                }
            }, {
                key: "toJson",
                value: function() {
                    var e = this
                      , t = this.rowNum
                      , r = this.colNum
                      , n = {};
                    return c.map(function(t) {
                        void 0 !== e[t] && (n[t] = e[t])
                    }),
                    n.category === s.SCRIPT && t && r && (n.dynamicMetric = {
                        rowNum: t,
                        colNum: r
                    }),
                    this.tags && (n.dynamicMetric = o(n.dynamicMetric || {}, this.tags)),
                    n
                }
            }]),
            e
        }();
        f.LEVEL = a,
        f.CATEGORY = s,
        e.exports = f
    }
    , function(e, t) {
        "use strict";
        e.exports = {
            ERROR: "error",
            INFO: "info",
            WARN: "warn",
            DEBUG: "debug"
        }
    }
    , function(e, t) {
        "use strict";
        e.exports = {
            SCRIPT: "jsError",
            AJAX: "ajaxError",
            RESOURCE: "resourceError"
        }
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , o = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , a = r(15)
          , s = r(2)
          , c = r(11)
          , u = r(16)
          , f = r(13)
          , g = r(3)
          , p = r(10)
          , l = r(5)
          , h = r(18)
          , d = function(e) {
            return e && e.stack || ""
        }
          , v = "error"
          , m = function(e) {
            return "c=" + encodeURIComponent(JSON.stringify(e))
        }
          , y = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (e && e.data)
                return e.beforeSend && e.beforeSend(),
                a({
                    type: "POST",
                    url: e.url,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: m(e.data),
                    success: e.success,
                    fail: e.fail,
                    xhrRewritten: e.xhrRewritten
                })
        }
          , w = function() {
            function e(t, r) {
                n(this, e),
                this.parent = r,
                this.cfgManager = t,
                this.cache = [],
                this.cacheSending = {},
                this.comboTimeout = 0,
                this.timeLimit = Date.now(),
                this.errorCount = 0,
                this.isTimeLimit = !1,
                this.detectLeave()
            }
            return o(e, [{
                key: "_handleError",
                value: function(e) {
                    try {
                        var t = this.cfgManager.get("onErrorPush");
                        if (t instanceof Function && (e = t(e)),
                        e instanceof c || void 0 === e)
                            return e;
                        g.ignore("onErrorPush方法返回结果有误")
                    } catch (t) {
                        return g.ignore("onErrorPush方法处理有误", t),
                        e
                    }
                }
            }, {
                key: "parseWindowError",
                value: function(e, t, r, n, i) {
                    try {
                        i && i.stack ? this.push(i) : "string" == typeof e && this._push({
                            category: f.SCRIPT,
                            sec_category: e,
                            resourceUrl: t,
                            rowNum: r,
                            colNum: n
                        })
                    } catch (e) {
                        this.reportSystemError(e)
                    }
                }
            }, {
                key: "parsePromiseUnhandled",
                value: function(e) {
                    if (e)
                        try {
                            var t = e.reason;
                            t && (t instanceof Error && (t = t.toString()),
                            this._push({
                                category: f.SCRIPT,
                                sec_category: "unhandledrejection",
                                content: t
                            }))
                        } catch (e) {
                            g.ignore(e)
                        }
                }
            }, {
                key: "parseConsoleError",
                value: function() {
                    try {
                        var e = [].slice.call(arguments);
                        if (!e || !e.length)
                            return;
                        for (var t = [], r = 0; r < e.length; r++) {
                            var n = e[r];
                            "string" != typeof e[r] && (n = e[r]instanceof window.Error ? JSON.stringify(e[r].stack) : JSON.stringify(e[r])),
                            t.push(n)
                        }
                        t && t.length && this._push({
                            category: f.SCRIPT,
                            sec_category: "consoleError",
                            content: t.join(" ")
                        })
                    } catch (e) {
                        this.reportSystemError(e)
                    }
                }
            }, {
                key: "detectLeave",
                value: function() {
                    var e = this
                      , t = arguments;
                    try {
                        var r = window.onbeforeunload;
                        window.onbeforeunload = function() {
                            var n = e.addCacheExtension()
                              , i = e.cacheSending
                              , o = void 0;
                            if (Object.keys(i))
                                for (var a in i)
                                    if (i.hasOwnProperty(a) && void 0 !== i[a]) {
                                        var s = i[a]
                                          , c = s.xhr
                                          , f = s.cache;
                                        try {
                                            c.abort()
                                        } catch (e) {
                                            g.ignore(e)
                                        }
                                        o = n.concat(f)
                                    }
                            if (o && o.length)
                                if (window.navigator.sendBeacon && e.cfgManager.get("useSendBeacon")) {
                                    var p = e.cfgManager.getApiPath(v)
                                      , h = l.stringify(p, {
                                        beacon: 1
                                    });
                                    window.navigator.sendBeacon(h, m(o))
                                } else
                                    e.cfgManager.get("disableCache") || u.add(o);
                            r && r.apply(e, t)
                        }
                    } catch (e) {
                        g.ignore(e)
                    }
                }
            }, {
                key: "checkCache",
                value: function() {
                    var e = this;
                    if (!this.cfgManager.get("disableCache")) {
                        var t = u.get();
                        t && t.length && setTimeout(function() {
                            y({
                                url: e.cfgManager.getApiPath(v),
                                data: t,
                                success: function() {
                                    u.clear()
                                },
                                xhrRewritten: !!e.cfgManager.get("autoCatch").ajax
                            })
                        }, 1500)
                    }
                }
            }, {
                key: "reportSystemError",
                value: function(e) {
                    e && e.stack && (this.cache.push(new c({
                        project: "owl",
                        pageUrl: "default",
                        realUrl: p.getHref(),
                        sec_category: e.msg || e.name || "parseError",
                        content: JSON.stringify(e.stack)
                    })),
                    this.send(!0))
                }
            }, {
                key: "_processError",
                value: function(e) {
                    var t = function(e) {
                        var t = "object" === ("undefined" == typeof e ? "undefined" : i(e)) ? JSON.stringify(e) : e;
                        return {
                            category: f.SCRIPT,
                            sec_category: "Invalid_Error",
                            content: t
                        }
                    }
                      , r = function(e) {
                        var r = e.line
                          , n = e.column
                          , i = e.message || e.name || "";
                        if (e.stack) {
                            var o = e.stack.match("https?://[^\n]+");
                            o = o ? o[0] : "";
                            var a = /https?:\/\/(\S)*\.js/
                              , s = "";
                            a.test(o) && (s = o.match(a)[0]);
                            var c = o.match(":(\\d+):(\\d+)");
                            c || (c = [0, 0, 0]);
                            var u = d(e);
                            return {
                                category: f.SCRIPT,
                                sec_category: i,
                                content: u,
                                rowNum: void 0 !== r ? r : c[1],
                                colNum: void 0 !== n ? n : c[2],
                                resourceUrl: s
                            }
                        }
                        return t(e)
                    };
                    try {
                        return r(e)
                    } catch (r) {
                        return this.reportSystemError(e),
                        t(e)
                    }
                }
            }, {
                key: "_push",
                value: function(e, t) {
                    e = this.parse(e),
                    this.push(new c(e), t)
                }
            }, {
                key: "_pushResource",
                value: function() {
                    var e = this.cfgManager.get("resource").sample;
                    Math.random() > e || this._push.apply(this, arguments)
                }
            }, {
                key: "parse",
                value: function(e) {
                    return e.project || (e.project = this.cfgManager.get("project")),
                    e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl") || "default"),
                    e.unionId || (e.unionId = this.cfgManager.getExtension("unionId")),
                    e.realUrl = p.getHref(),
                    e
                }
            }, {
                key: "push",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                      , r = this.cfgManager;
                    if (e && !(Math.random() > r.get(v).sample)) {
                        if (e instanceof c || (e instanceof Error ? e = this._processError(e) : "string" == typeof e ? e = {
                            sec_category: e
                        } : "object" === ("undefined" == typeof e ? "undefined" : i(e)) && (e = {
                            sec_category: e.name,
                            content: e.msg
                        }),
                        e = this.parse(e),
                        e = new c(e)),
                        e && e.content && e.content.length >= r.get(v).maxSize)
                            return void h.log("[Error]: 错误长度大于" + r.get(v).maxSize);
                        e.update(t),
                        h.log("[Error]: 错误类别->" + e.sec_category + " 错误堆栈->" + e.content);
                        var n = r.filters
                          , o = !0;
                        if (this.cfgManager.get("noScriptError") && 0 === e.sec_category.indexOf("Script error"))
                            return o = !1;
                        if (n && n.length)
                            for (var a = 0; a < n.length; a++) {
                                var s = n[a];
                                if (!s.fn(e))
                                    return o = !1
                            }
                        var u = r.get("ignoreList").js;
                        if (u && u.length)
                            for (var f = 0; f < u.length; f++) {
                                var g = u[f];
                                if (0 === e.sec_category.indexOf(g)) {
                                    o = !1;
                                    break
                                }
                            }
                        o && (this.isExist(e) || (this.onPush && this.onPush(e),
                        e = this._handleError(e),
                        e && (this.cache.push(e),
                        this.send())))
                    }
                }
            }, {
                key: "isExist",
                value: function(e) {
                    for (var t = 0; t < this.cache.length; t++) {
                        var r = this.cache[t];
                        if (r instanceof c || (r = new c(r)),
                        r.isEqual(e))
                            return !0
                    }
                    return !1
                }
            }, {
                key: "report",
                value: function() {
                    this.push.apply(this, arguments),
                    this.send(!0)
                }
            }, {
                key: "send",
                value: function(e) {
                    var t = this
                      , r = this.cfgManager
                      , n = this.comboTimeout
                      , i = r.get("error").maxNum || 100
                      , o = r.get("error").maxTime || 6e4
                      , a = Date.now() - this.timeLimit;
                    this.isTimeLimit || (this.timeLimit = Date.now()),
                    this.isTimeLimit = !0;
                    var s = function() {
                        if (t.cache.length) {
                            clearTimeout(n),
                            n = 0,
                            t.onSubmit && t.onSubmit(t.cache);
                            var e = t.addCacheExtension()
                              , s = +new Date;
                            try {
                                if (t.errorCount = t.errorCount + t.cache.length,
                                a <= o) {
                                    if (t.errorCount >= i)
                                        return
                                } else
                                    t.isTimeLimit = !1,
                                    t.errorCount = 0
                            } catch (e) {
                                g.ignore(e)
                            }
                            var c = y({
                                url: t.cfgManager.getApiPath(v) + ("&pageId=" + r.get("pageId")),
                                data: e,
                                success: function() {
                                    t.nextCache = [],
                                    t.cacheSending[s] = void 0
                                },
                                fail: function() {
                                    t.cfgManager.get("disableCache") || u.add(t.nextCache)
                                },
                                xhrRewritten: !!t.cfgManager.get("autoCatch").ajax
                            });
                            t.cacheSending[s] = {
                                xhr: c,
                                cache: e
                            },
                            t.nextCache = e,
                            t.cache = []
                        }
                    }
                      , c = r.get(v).delay;
                    e ? s() : n || c === -1 || (n = setTimeout(s, c))
                }
            }, {
                key: "addCacheExtension",
                value: function() {
                    var e = this.cfgManager
                      , t = this.cache
                      , r = []
                      , n = e.getExtension();
                    if (!t || !t.length)
                        return r;
                    for (var o = 0; o < t.length; o++) {
                        var a = t[o];
                        n && "object" === ("undefined" == typeof n ? "undefined" : i(n)) && (a = s(a.toJson(), n)),
                        r.push(a)
                    }
                    return r
                }
            }]),
            e
        }();
        e.exports = w
    }
    , function(e, t, r) {
        "use strict";
        var n = r(10)
          , i = function() {};
        e.exports = function(e) {
            if (e) {
                var t = n.getUserAgent()
                  , r = n.getAppName()
                  , o = r.indexOf("Microsoft Internet Explorer") !== -1 && (t.indexOf("MSIE 8.0") !== -1 || t.indexOf("MSIE 9.0") !== -1)
                  , a = o && window.XDomainRequest
                  , s = void 0;
                s = a ? new XDomainRequest : new XMLHttpRequest,
                s.open(e.type || "GET", e.url, !0),
                s.success = e.success || i,
                s.fail = e.fail || i;
                var c = function(t) {
                    t && /catfront.(dianping|51ping).com/.test(e.url) && (200 === t.currentTarget.status ? s.success && s.success() : s.fail && s.fail())
                };
                if (e.xhrRewritten === !1 && !a)
                    if ("addEventListener"in s)
                        s.addEventListener("load", c),
                        s.addEventListener("error", c),
                        s.addEventListener("abort", c);
                    else {
                        var u = s.onreadystatechange;
                        s.onreadystatechange = function(e) {
                            4 === this.readyState && c(e),
                            u && u.apply(this, arguments)
                        }
                    }
                if ("POST" === e.type) {
                    if (e.header && !a)
                        for (var f in e.header)
                            e.header.hasOwnProperty(f) && s.setRequestHeader(f, e.header[f]);
                    s.send(e.data)
                } else
                    s.send();
                return s
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = "owl_cache"
          , i = r(17)
          , o = r(3);
        e.exports = {
            isSupport: i(),
            get: function() {
                if (this.isSupport) {
                    var e = [];
                    try {
                        var t = localStorage.getItem(n);
                        t && (e = JSON.parse(t))
                    } catch (e) {
                        o.ignore(e)
                    }
                    return e
                }
            },
            add: function(e) {
                if (this.isSupport && e instanceof Array) {
                    var t = this.get();
                    e = e.concat(t);
                    try {
                        localStorage.setItem(n, JSON.stringify(e))
                    } catch (e) {
                        o.ignore(e)
                    }
                }
            },
            clear: function() {
                if (this.isSupport)
                    try {
                        localStorage.removeItem(n)
                    } catch (e) {
                        o.ignore(e)
                    }
            }
        }
    }
    , function(e, t) {
        "use strict";
        e.exports = function() {
            var e = "local_test";
            try {
                localStorage.setItem(e, 1),
                localStorage.removeItem(e)
            } catch (e) {
                return !1
            }
            return !0
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(19).loadScript
          , i = void 0
          , o = !1;
        e.exports = {
            queue: [],
            ready: function() {
                var e = this
                  , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , r = t.LoganAPI
                  , a = t.pageUrl
                  , s = t.project
                  , c = t.loganConfig;
                o = !0;
                var u = function() {
                    for (c && (i = i.config(c)),
                    i.log("[新项目]: 项目-> " + s + " 对应的页面-> " + a + " "); e.queue.length; ) {
                        var t = e.queue.shift();
                        i.log(t)
                    }
                };
                if (r)
                    i = r,
                    u();
                else
                    try {
                        window && window.Logan ? (i = window.Logan,
                        u()) : n("//www.dpfile.com/app/dp-logan-web/logan_1.12.5.js", function() {
                            i = window.Logan,
                            u()
                        })
                    } catch (e) {
                        console.log("logan 加载失败")
                    }
            },
            log: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (o) {
                    var r = "owl";
                    t.noType && (r = "owl"),
                    i ? i.log(e, r) : this.queue.push(e)
                }
            }
        }
    }
    , function(e, t) {
        "use strict";
        var r = [];
        t.loadScript = function(e, t) {
            if (~r.indexOf(e))
                return void t();
            var n = document.createElement("script");
            n.src = e,
            n.onload = function() {
                r.push(e),
                t()
            }
            ,
            document.getElementsByTagName("head")[0].appendChild(n)
        }
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , o = r(15)
          , a = r(21)
          , s = r(13)
          , c = r(22)
          , u = r(3)
          , f = r(10)
          , g = r(18)
          , p = r(7)
          , l = r(23)
          , h = "resource"
          , d = 10
          , v = function(e) {
            var t = e.split("//");
            if (t && t.length > 1)
                return t[0] + "//" + t[1].split("/")[0] + "/images"
        }
          , m = function() {
            function e(t, r) {
                n(this, e),
                this.cfgManager = t,
                this.errManager = r,
                this.cache = [],
                this.entryCache = [],
                this.comboTimeout = 0,
                this.isSupportGetEntry = window.performance && void 0 !== window.performance.getEntries
            }
            return i(e, [{
                key: "parseAjax",
                value: function(e) {
                    var t = void 0
                      , r = void 0
                      , n = void 0
                      , i = void 0
                      , o = void 0
                      , a = void 0;
                    try {
                        t = e.type,
                        r = e.currentTarget.responseURL || e.currentTarget.url,
                        n = e.duration,
                        i = e.total,
                        o = e.currentTarget.status,
                        a = this.getConnectType()
                    } catch (e) {
                        return e
                    }
                    if (void 0 !== n && !isNaN(n)) {
                        var c = "load" === t || "readystatechange" === t && 200 === o;
                        g.log("[加载资源]: [类型]->AJAX [链接]->" + r),
                        0 === r.indexOf("//") ? r = f.getProtocol() + r : 0 === r.indexOf("/") && (r = f.getOrigin() + r),
                        o = (c ? 200 : 500) + "|";
                        var p = this.cfgManager
                          , l = !0;
                        try {
                            var h = p.get("ignoreList").ajax;
                            if (h)
                                for (var d = 0; d < h.length; d++) {
                                    var v = h[d]
                                      , m = new RegExp(v);
                                    if (m.test(r))
                                        return void (l = !1)
                                }
                        } catch (e) {
                            u.ignore(e)
                        }
                        if (l) {
                            var y = p.get("resourceReg")
                              , w = p.get("devMode") || y instanceof RegExp && p.get("resourceReg").test(r);
                            w ? !p.get("ajax").flag || n < p.get("ajax").duration ? this.pushApi({
                                type: "ajax",
                                connectType: a,
                                resourceUrl: r,
                                responsetime: n && n.toString() ? n.toString() : "0",
                                responsebyte: i && i.toString() ? i.toString() : "0",
                                statusCode: o,
                                firstCategory: c ? "" : s.AJAX
                            }) : (this.errManager.push({
                                name: "TIMEOUT_AJAX",
                                msg: "ajax请求时间超过设定" + r
                            }, {
                                category: s.AJAX
                            }),
                            g.log("[加载资源请求超时]: [类型]->AJAX [链接]->" + r)) : p.get("invalid").ajax && p.get("ajax").invalid && Math.random() < p.get("resource").sample && (this.errManager.push({
                                name: "INVALID_AJAX",
                                msg: r
                            }, {
                                category: s.AJAX
                            }),
                            g.log("[资源请求域名非法]: [类型]->AJAX [链接]->" + r))
                        }
                    }
                }
            }, {
                key: "parseType",
                value: function(e) {
                    if (!e)
                        return "";
                    switch (e) {
                    case "script":
                        return "js";
                    case "link":
                        return "css";
                    case "img":
                        return "image";
                    default:
                        return e
                    }
                }
            }, {
                key: "filterResource",
                value: function(e) {
                    var t = !0
                      , r = this.cfgManager.get("ignoreList").resource;
                    try {
                        for (var n = 0; n < r.length; n++) {
                            var i = r[n]
                              , o = new RegExp(i);
                            if (o.test(e)) {
                                t = !1;
                                break
                            }
                        }
                        return t
                    } catch (e) {
                        return u.ignore(e),
                        t
                    }
                }
            }, {
                key: "doHandlePerformanceEntry",
                value: function(e) {
                    if (e = this.filterEntry(e),
                    e && e.length) {
                        for (var t = this.cfgManager, r = this.entryCache, n = 0; n < e.length; n++) {
                            var i = e[n]
                              , o = i.name
                              , a = this.filterResource(o);
                            if (!a)
                                return;
                            if (t.get("devMode") || t.get("resourceReg").test(o)) {
                                r.push(o);
                                var c = "200|"
                                  , u = t.get("image")
                                  , f = !1;
                                if (("img" === i.initiatorType || "css" === i.initiatorType) && u.flag) {
                                    var g = i.name
                                      , p = u.filter;
                                    if ("function" == typeof p && !p(g)) {
                                        var l = i.transferSize
                                          , h = i.duration
                                          , d = void 0;
                                        l && l > 1e3 * u.fileSize ? d = "IMAGE_SIZE_EXCEED" : h && h > u.duration && (d = "IMAGE_DURATION_EXCEED"),
                                        d && (this.errManager._pushResource({
                                            content: g,
                                            sec_category: d
                                        }, {
                                            category: s.RESOURCE
                                        }),
                                        f = !0)
                                    }
                                }
                                f || this.push({
                                    type: this.parseType(i.initiatorType),
                                    resourceUrl: "img" === i.initiatorType ? v(o) : o,
                                    responsebyte: i.transferSize && i.transferSize.toString() ? i.transferSize.toString() : "0",
                                    responsetime: i.duration && i.duration.toString() ? i.duration.toString() : "0",
                                    statusCode: c,
                                    logContent: "img" === i.initiatorType ? o : ""
                                })
                            }
                        }
                        this.report()
                    }
                }
            }, {
                key: "filterEntry",
                value: function(e) {
                    for (var t = [], r = 0; r < e.length; r++) {
                        var n = e[r];
                        ["link", "script", "img", "css"].indexOf(n.initiatorType) !== -1 && t.push(n)
                    }
                    return t
                }
            }, {
                key: "observePerformanceChange",
                value: function() {
                    var e = this;
                    if (!this.observePerformance) {
                        this.observePerformance = !0;
                        var t = this.cfgManager.get(h).disablePerformanceObserver || !1;
                        if (l.PerformanceObserver() && t !== !0) {
                            var r = new window.PerformanceObserver(function(t) {
                                try {
                                    var r = t.getEntries();
                                    e.doHandlePerformanceEntry(r)
                                } catch (e) {
                                    u.ignore(e)
                                }
                            }
                            );
                            r.observe({
                                entryTypes: ["resource"]
                            })
                        } else
                            c.on("ajaxCall", function() {
                                setTimeout(function() {
                                    var t = e.entryCache
                                      , r = window.performance.getEntries();
                                    if (r.length !== t.length && r.length > t.length) {
                                        for (var n = [], i = 0; i < r.length; i++)
                                            t.indexOf(r[i].name) === -1 && n.push(r[i]);
                                        t = r,
                                        e.doHandlePerformanceEntry(n)
                                    }
                                }, 1500)
                            })
                    }
                }
            }, {
                key: "handleResourceTiming",
                value: function() {
                    try {
                        if (this.isSupportGetEntry) {
                            var e = window.performance.getEntries();
                            this.doHandlePerformanceEntry(e),
                            this.observePerformanceChange()
                        }
                    } catch (e) {
                        this.errManager.reportSystemError(e)
                    }
                }
            }, {
                key: "handleResourceLoadError",
                value: function(e) {
                    var t = this
                      , r = e.target || e.srcElement
                      , n = function() {
                        var e = r.src || r.href
                          , n = r.nodeName;
                        n && (n = n.toLowerCase());
                        var i = f.getHref();
                        if (i && 0 !== i.indexOf(e)) {
                            var o = e;
                            if ("img" === n && (o = v(e)),
                            o) {
                                var a = t.filterResource(o);
                                a && (t.addLogan(n, e),
                                t.isSupportGetEntry ? t.pushApi({
                                    type: t.parseType(n),
                                    resourceUrl: o,
                                    responsetime: "0",
                                    responsebyte: "0",
                                    statusCode: "500|",
                                    firstCategory: s.RESOURCE,
                                    secondCategory: n,
                                    logContent: e
                                }) : t.errManager._pushResource({
                                    category: s.RESOURCE,
                                    sec_category: n,
                                    content: e
                                }))
                            }
                        }
                    };
                    try {
                        var i = r instanceof HTMLScriptElement || r instanceof HTMLLinkElement || r instanceof HTMLImageElement;
                        if (!i)
                            return;
                        n()
                    } catch (e) {
                        this.errManager.reportSystemError(e)
                    }
                }
            }, {
                key: "addLogan",
                value: function(e, t) {
                    g.log("[加载资源出错]: [类型]->" + e + " [链接]->" + t)
                }
            }, {
                key: "_stringify",
                value: function() {
                    var e = this.cache;
                    if (e && e.length) {
                        for (var t = {}, r = this.cfgManager.getExtension(), n = {}, i = [], o = ["region", "operator", "network", "container", "os", "unionId"], a = 0; a < o.length; a++)
                            n[o[a]] = "";
                        for (var s = 0; s < e.length; s++) {
                            var c = e[s];
                            i.push(c)
                        }
                        for (var u in n)
                            n.hasOwnProperty(u) && (n[u] = r[u] || "");
                        return n.infos = i,
                        t = n
                    }
                }
            }, {
                key: "doBatchPush",
                value: function(e) {
                    e = this.parse(e);
                    var t = new a(e);
                    this.onPush && this.onPush(t);
                    var r = !0
                      , n = this.cfgManager;
                    if ("function" == typeof n.get("onBatchPush")) {
                        var i = n.get("onBatchPush");
                        try {
                            r = i(t)
                        } catch (e) {
                            u.ignore(e)
                        }
                    }
                    r && this.cache.push(t)
                }
            }, {
                key: "push",
                value: function(e) {
                    var t = this.cfgManager;
                    Math.random() > t.get(h).sample || (this.doBatchPush(e),
                    this.cache.length >= d ? this.report(!0) : this.triggerReport())
                }
            }, {
                key: "parse",
                value: function(e) {
                    return e.pageUrl || (e.pageUrl = this.cfgManager.get("pageUrl")),
                    e.project || (e.project = this.cfgManager.get("project")),
                    e.realUrl || (e.realUrl = location.href),
                    e
                }
            }, {
                key: "pushApi",
                value: function(e) {
                    var t = this.cfgManager;
                    Math.random() > t.get(h).sampleApi || (this.doBatchPush(e),
                    this.triggerReport())
                }
            }, {
                key: "report",
                value: function() {
                    this.triggerReport(!0)
                }
            }, {
                key: "triggerReport",
                value: function(e) {
                    var t = this
                      , r = this.cfgManager;
                    if (this.cache.length) {
                        var n = function() {
                            clearTimeout(t.comboTimeout),
                            t.comboTimeout = 0,
                            t.onSubmit && t.onSubmit(t.cache),
                            t.send()
                        }
                          , i = r.get(h).delay;
                        e ? this.send() : this.comboTimeout || i === -1 || (this.comboTimeout = setTimeout(n, i))
                    }
                }
            }, {
                key: "send",
                value: function() {
                    this.onSubmit && this.onSubmit(this.cache);
                    var e = this._stringify();
                    if (e) {
                        var t = this.cfgManager.getApiPath(h);
                        o({
                            type: "POST",
                            url: t + ("&pageId=" + this.cfgManager.get("pageId")),
                            data: JSON.stringify(e)
                        }),
                        this.cache = []
                    }
                }
            }, {
                key: "getConnectType",
                value: function() {
                    return p.indexOf("https") !== -1 ? "https" : "http"
                }
            }]),
            e
        }();
        e.exports = m
    }
    , function(e, t) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , i = ["resourceUrl", "connectType", "type", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "realUrl", "statusCode", "firstCategory", "secondCategory", "logContent"]
          , o = ["resourceUrl", "connectType", "type", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "realUrl", "statusCode", "firstCategory", "secondCategory", "logContent"]
          , a = function() {
            function e(t) {
                var n = this;
                r(this, e),
                i.forEach(function(e) {
                    n[e] = t[e]
                }),
                this.parse()
            }
            return n(e, [{
                key: "update",
                value: function(e) {
                    for (var t in e)
                        e.hasOwnProperty(t) && i.indexOf(t) !== -1 && (this[t] = e[t])
                }
            }, {
                key: "parse",
                value: function() {
                    if (!this.timestamp) {
                        var e = Date.now();
                        this.timestamp = e.toString()
                    }
                    this.requestbyte || (this.requestbyte = "0"),
                    this.responsebyte || (this.responsebyte = "0")
                }
            }, {
                key: "stringify",
                value: function() {
                    var e = this
                      , t = o.map(function(t) {
                        return e[t]
                    });
                    return t.join("\t")
                }
            }]),
            e
        }();
        e.exports = a
    }
    , function(e, t) {
        "use strict";
        e.exports = {
            on: function(e, t) {
                if (e) {
                    this._events_ || (this._events_ = {});
                    var r = this._events_;
                    r[e] || (r[e] = []),
                    r[e].push(t)
                }
            },
            trigger: function(e) {
                var t = this._events_;
                if (e && t && t[e])
                    for (var r = t[e], n = r.length, i = Array.prototype.slice.call(arguments, 1), o = 0; o < n; o++)
                        r[o].apply(this, i)
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(10);
        e.exports = {
            PerformanceObserver: function() {
                if (window.PerformanceObserver)
                    try {
                        var e = /Chrome\/(\d+)/
                          , t = n.getUserAgent();
                        if (!e.test(t))
                            return !0;
                        var r = t.match(e)[1];
                        if (parseInt(r) > 59)
                            return !0
                    } catch (e) {}
            },
            MutationObserver: function() {
                if (window.MutationObserver)
                    try {
                        var e = -1
                          , t = n.getUserAgent();
                        if (t.indexOf("compatible") > -1 && t.indexOf("MSIE") > -1 ? (new RegExp("MSIE (\\d+\\.\\d+);").test(t),
                        e = parseFloat(RegExp.$1)) : t.indexOf("Trident") > -1 && t.indexOf("rv:11.0") > -1 && (e = 11),
                        e === -1 || e > 11)
                            return !0
                    } catch (e) {}
            },
            PeformanceNow: function() {
                if (window.performance && window.performance.now)
                    return !0
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , o = r(15)
          , a = r(5)
          , s = r(2)
          , c = r(4).version
          , u = r(3)
          , f = r(25)
          , g = "page"
          , p = function() {
            function e(t) {
                n(this, e),
                this.noCache = !1,
                this.points = [],
                this.pointsCustom = [],
                this.cfgManager = t
            }
            return i(e, [{
                key: "setUserReady",
                value: function() {
                    this.cfgManager.set({
                        page: {
                            auto: !0
                        }
                    })
                }
            }, {
                key: "getUserReady",
                value: function() {
                    return this.cfgManager.get(g).auto
                }
            }, {
                key: "setReady",
                value: function() {
                    this.isReady = !0
                }
            }, {
                key: "getReady",
                value: function() {
                    return this.isReady
                }
            }, {
                key: "getPerformaceTiming",
                value: function() {
                    return {
                        perf: window.performance && window.performance.timing,
                        paint: window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("paint")
                    }
                }
            }, {
                key: "getMainResourceTiming",
                value: function() {
                    var e = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("resource")
                      , t = this.cfgManager.get("page").isMainResource
                      , r = [];
                    try {
                        if (!e)
                            return;
                        if ("function" == typeof t) {
                            for (var n = 0; n < e.length; n++) {
                                var i = e[n];
                                t(i) && r.push(i)
                            }
                            return r
                        }
                        for (var o = 0; o < e.length; o++) {
                            var a = e[o];
                            "link" !== a.initiatorType && "script" !== a.initiatorType || r.push(a)
                        }
                        var s = this.cfgManager.get("page").mainResourceNumber;
                        return r.length <= s ? r : r.splice(0, s)
                    } catch (e) {
                        u.ignore(e)
                    }
                }
            }, {
                key: "sensoryObserver",
                value: function() {
                    this.firstScreenManager = new f(this.cfgManager),
                    this.firstScreenManager.mutaObserver()
                }
            }, {
                key: "parsePageTimeWithDefer",
                value: function() {
                    var e = this;
                    setTimeout(function() {
                        try {
                            var t = e.cfgManager.get("page");
                            t && t.sensoryIndex && t.getFirstScreenTime ? e.firstScreenManager.getSensoryIndex(function(t) {
                                e.parsePageTime(t)
                            }) : e.parsePageTime()
                        } catch (t) {
                            e.parsePageTime()
                        }
                    }, 0)
                }
            }, {
                key: "parsePageTime",
                value: function(e) {
                    var t = this.getPerformaceTiming()
                      , r = t.perf
                      , n = t.paint;
                    if (!r)
                        return this.setReady();
                    var i = r.navigationStart
                      , o = {
                        unloadEventStart: 1,
                        unloadEventEnd: 2,
                        redirectStart: 3,
                        redirectEnd: 4,
                        fetchStart: 5,
                        domainLookupStart: 6,
                        domainLookupEnd: 7,
                        connectStart: 8,
                        connectEnd: 9,
                        requestStart: 10,
                        responseStart: 11,
                        responseEnd: 12,
                        domLoading: 13,
                        domInteractive: 14,
                        domContentLoadedEventStart: 15,
                        domContentLoadedEventEnd: 16,
                        domComplete: 17,
                        loadEventStart: 18,
                        loadEventEnd: 19
                    }
                      , a = void 0;
                    for (a in r)
                        0 === r[a] ? this.points[o[a]] = r[a] : this.points[o[a]] = r[a] - i;
                    if (this.points[20] = r.domainLookupEnd - r.domainLookupStart,
                    this.points[21] = r.connectEnd - r.connectStart,
                    this.points[22] = r.responseEnd - r.requestStart,
                    n && n.length)
                        try {
                            for (var s = Number.parseInt || window.parseInt, c = void 0, f = void 0, g = 0; g < n.length; g++) {
                                var p = n[g];
                                "first-paint" === p.name ? c = s(p.startTime) : "first-contentful-paint" === p.name && (f = s(p.startTime))
                            }
                            c && f && (this.points[23] = c,
                            this.points[24] = f,
                            e && (e.FST && e.FST > f ? this.points[25] = e.FST : this.points[25] = f,
                            this.points[26] = e.FCP || f))
                        } catch (e) {
                            u.ignore(e)
                        }
                    else
                        e && (this.points[25] = e.FST || 0,
                        this.points[26] = e.FCP || this.points[15]);
                    for (var l = 0; l < this.points.length; l++)
                        isNaN(this.points[l]) && (this.points[l] = 0);
                    var h = this.getMainResourceTiming();
                    if (h) {
                        for (var d = this.noCache, v = 0; v < h.length; v++) {
                            var m = h[v];
                            if (void 0 !== m.transferSize)
                                0 !== m.transferSize && (d = !0);
                            else if (void 0 !== m.duration) {
                                var y = this.cfgManager.get("page").timeThreshold;
                                m.duration > y && (d = !0)
                            }
                        }
                        this.noCache = d
                    }
                    this.setReady(),
                    this.report()
                }
            }, {
                key: "push",
                value: function(e) {
                    this.onPush && this.onPush(e),
                    e && "number" == typeof e.position && (e.position < 0 || e.position > 31 || (this.pointsCustom[e.position] = e.duration,
                    this.report()))
                }
            }, {
                key: "clearTimeout",
                value: function(e) {
                    function t() {
                        return e.apply(this, arguments)
                    }
                    return t.toString = function() {
                        return e.toString()
                    }
                    ,
                    t
                }(function() {
                    clearTimeout(this.timeout),
                    this.timeout = void 0
                })
            }, {
                key: "report",
                value: function(e) {
                    var t = this
                      , r = this.cfgManager;
                    if (this.getReady() && this.getUserReady() && (this.points.length || this.pointsCustom.length) && !(Math.random() > r.get(g).sample)) {
                        this.onSubmit && this.onSubmit(this.points, this.pointsCustom);
                        try {
                            this.timeout ? this.clearTimeout() : this.pendingAjax && this.pendingAjax.abort && this.pendingAjax.abort()
                        } catch (e) {
                            u.ignore(e)
                        }
                        var n = function() {
                            if (t.clearTimeout(),
                            t.testSend && (t.points = [],
                            t.pointsCustom = []),
                            t.points.length || t.pointsCustom.length) {
                                var e = r.getApiPath(g)
                                  , n = a.stringify(e)
                                  , i = r.getExtension()
                                  , u = s({
                                    project: r.get("project"),
                                    pageurl: encodeURIComponent(r.get("pageUrl")),
                                    speed: encodeURIComponent(t.points.join("|")),
                                    customspeed: encodeURIComponent(t.pointsCustom.join("|")),
                                    timestamp: +new Date,
                                    sdk: c,
                                    noCache: t.noCache ? "true" : "false",
                                    pageId: r.get("pageId"),
                                    unionId: r.getExtension("unionId")
                                }, i);
                                n = a.stringify(n, u),
                                t.pendingAjax = o({
                                    method: "GET",
                                    url: n,
                                    success: function() {
                                        t.points = [],
                                        t.pointsCustom = [],
                                        t.pendingAjax = void 0
                                    }
                                })
                            }
                        }
                          , i = r.get(g).delay || 0;
                        e ? n() : i >= 0 && (this.timeout = setTimeout(function() {
                            n()
                        }, i))
                    }
                }
            }]),
            e
        }();
        e.exports = p
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(e, t) {
            var r = !1;
            return t && (r = !(!e.closest || !e.closest("[" + t + "]")) || e.hasAttribute && e.hasAttribute(t)),
            r && d.logScreen("忽略元素：", e),
            r
        }
        function o() {
            var e = {
                height: window.outerHeight || screen.height,
                width: window.outerWidth || screen.width
            }
              , t = document.documentElement || document.body
              , r = [window.innerWidth, t.clientWidth].filter(function(t) {
                return t && t > e.width && t / e.width >= 2
            });
            return r.forEach(function(t) {
                var r = t / e.width;
                e.height = e.height * r,
                e.width = e.width * r
            }),
            e
        }
        function a(e, t) {
            y === -1 && (window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("paint") && document && document.body && "" != document.body.innerText ? y = 0 : (e && 3 === e.nodeType || e && "" !== e.innerText || document.querySelector && document.querySelector("img")) && (y = U(t || 0)))
        }
        function s() {
            M || c()
        }
        function c() {
            d.logScreen("DOM有效变更：" + m.length, m);
            var e = [];
            m.forEach(function(t) {
                var r = t.startTime
                  , n = t.nodes
                  , i = [];
                if (n.forEach(function(e) {
                    var t = e.style || {}
                      , r = t.visibility
                      , n = t.display;
                    if ("hidden" !== r && "none" !== n) {
                        var o = e.getBoundingClientRect && e.getBoundingClientRect();
                        o && o.width > 0 && o.height > 0 && o.top <= N && o.left <= D && i.push({
                            node: e,
                            rect: o
                        })
                    }
                }),
                i.length) {
                    var o = g(i);
                    o && e.push({
                        score: o,
                        startTime: r
                    })
                }
            }),
            m = [],
            M = !0,
            d.logScreen("DOM有效首屏变更：", e);
            var t = f(e);
            S = {
                FST: t,
                FCP: y || 0
            },
            d.logScreen("DOM首屏时间", t)
        }
        function u(e, t) {
            var r = h.getImageTimingsInFirstScreen(e, t, x);
            if (S && r.length) {
                var n = Math.round(r[0]);
                S.FST = Math.max(S.FST, n),
                d.logScreen("首屏图片时间", n),
                d.logScreen("最终首屏时间", S.FST)
            }
        }
        function f(e) {
            var t = e.reduce(function(e, t) {
                var r = e[e.length - 1];
                return r && t.startTime - r.startTime < 1 ? r.score += t.score : e.push({
                    score: t.score,
                    startTime: t.startTime
                }),
                e
            }, []);
            d.logScreen("DOM有效首屏变更合并：", t);
            var r = t.reduce(function(e, t) {
                return !e || t.score > Math.min(e.score, I) ? t : e
            }, null);
            return U(r && r.startTime || 0)
        }
        function g(e) {
            return e.reduce(function(e, t) {
                return e + p(t, 0)
            }, 0)
        }
        function p(e, t) {
            var r = e.node
              , n = e.rect
              , i = r.style || {}
              , o = i.visibility
              , a = i.display;
            if ("hidden" === o || "none" === a)
                return 0;
            if (3 === r.nodeType) {
                if (r.textContent) {
                    var s = r.textContent.charCodeAt(0);
                    if (10 !== s && 13 !== s)
                        return t + _
                }
                return 0
            }
            if (r.childNodes.length)
                return A.call(r.childNodes, 0).reduce(function(e, r) {
                    return e + p({
                        node: r
                    }, t + P)
                }, 0);
            var c = n || {
                width: r.clientWidth,
                height: r.clientHeight
            }
              , u = c.width
              , f = c.height;
            return u && f ? t + _ : 0
        }
        var l = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , h = r(26)
          , d = r(3)
          , v = r(23)
          , m = []
          , y = -1
          , w = !1
          , b = void 0
          , M = !1
          , E = !1
          , S = void 0
          , T = void 0
          , k = void 0
          , x = void 0
          , C = 0
          , O = 15
          , P = 0
          , _ = 1
          , I = 3
          , R = 3e3
          , j = ["HTML", "HEAD", "SCRIPT", "STYLE"]
          , A = Array.prototype.slice
          , U = Number.parseInt || window.parseInt
          , L = o()
          , N = L.height
          , D = L.width
          , F = function() {
            function e(t) {
                n(this, e),
                this.cfgManager = t,
                this.pageData = [],
                this.observer = null,
                this.disableMutaObserver = null,
                this.perObserver = null,
                this.ignoreDom = "owl-ignore",
                this.ignoreIframe = t.get("page").ignoreIframe || !0,
                this.pattern = /(\.)(png|jpg|jpeg|gif|webp|ico|bmp|tiff|svg)/i,
                x = t.get("page").scrollDom,
                window._Owl_ && (this.pageData = window._Owl_.pageData,
                this.observer = window._Owl_.observer,
                this.disableMutaObserver = window._Owl_.disableMutaObserver),
                !this.disableMutaObserver && document.body || (M = !0,
                E = !0)
            }
            return l(e, [{
                key: "mutaObserver",
                value: function() {
                    var e = this;
                    if (v.PeformanceNow() && v.MutationObserver()) {
                        if (!M) {
                            if (this.observer)
                                try {
                                    this.observer.disconnect(),
                                    this.observer = null,
                                    this.pageData && this.pageData.length && this.pageData.forEach(function(t) {
                                        e.mutaCallback(t.mutations, t.startTime)
                                    })
                                } catch (e) {
                                    console.log("observer disconnect err")
                                }
                            try {
                                this.observer = new MutationObserver(function(t) {
                                    e.mutaCallback(t, performance.now())
                                }
                                ),
                                this.observer.observe(document, {
                                    childList: !0,
                                    subtree: !0
                                }),
                                k = setTimeout(function() {
                                    s()
                                }, R);
                                var t = this.cfgManager.get("page").interactToStopMutation;
                                t === !0 && this.addCommonEventToStopMutation()
                            } catch (e) {
                                console.log("observer observe err")
                            }
                        }
                        if (T = this.cfgManager.get("page").disableSensoryImageIndex)
                            return void (E = !0);
                        this.registerPerformanceObserver()
                    }
                }
            }, {
                key: "registerPerformanceObserver",
                value: function() {
                    var e = this
                      , t = this.cfgManager.get("resource").disablePerformanceObserver || !1;
                    if (v.PerformanceObserver() && t !== !0) {
                        var r = setTimeout(function() {
                            e.performanceObserverStop()
                        }, 8e3);
                        this.perObserver = new window.PerformanceObserver(function() {
                            clearTimeout(b),
                            b = setTimeout(function() {
                                clearTimeout(r),
                                e.performanceObserverStop()
                            }, R)
                        }
                        ),
                        this.perObserver.observe({
                            entryTypes: ["resource"]
                        })
                    } else
                        E = !0
                }
            }, {
                key: "getSensoryIndex",
                value: function(e) {
                    var t = this
                      , r = 0
                      , n = setTimeout(function() {
                        clearInterval(r),
                        t.mutaObserverStop(),
                        t.performanceObserverStop(),
                        e(S)
                    }, 8e3)
                      , i = function() {
                        M && E && (clearInterval(r),
                        S ? (T || u(t.ignoreDom, t.pattern),
                        clearTimeout(n),
                        e(S)) : (clearTimeout(n),
                        e()))
                    };
                    r = setInterval(i, 500)
                }
            }, {
                key: "mutaCallback",
                value: function(e, t) {
                    var r = this;
                    t || (t = performance.now()),
                    k && (k = clearTimeout(k)),
                    w && clearTimeout(w),
                    w = setTimeout(function() {
                        return r.mutaObserverStop()
                    }, R),
                    setTimeout(function() {
                        d.logScreen("DOM原始变更：" + e.length, e),
                        e.filter(function(e) {
                            var t = (e.target.nodeName || "").toUpperCase();
                            return "childList" === e.type && e.addedNodes.length && j.indexOf(t) === -1
                        }).forEach(function(e) {
                            var n = A.call(e.addedNodes, 0).filter(function(e) {
                                var t = e.nodeName.toUpperCase();
                                return !(1 !== e.nodeType || j.indexOf(t) != -1 || r.ignoreIframe && "IFRAME" === t || i(e, r.ignoreDom))
                            })
                              , o = n[0];
                            if (o) {
                                a(o, t),
                                m.push({
                                    nodes: n,
                                    startTime: t
                                });
                                var s = o.getBoundingClientRect && o.getBoundingClientRect();
                                s && s.top > N && (++C > O && r.mutaObserverStop(),
                                d.logScreen("首屏外节点检测：" + C + "次")),
                                n.forEach(function(e) {
                                    document.querySelectorAll && r.addEventToStopMutation(e)
                                })
                            }
                        })
                    }, 0)
                }
            }, {
                key: "mutaObserverStop",
                value: function() {
                    this.observer && this.observer.disconnect && (this.observer.disconnect(),
                    this.observer = null,
                    s())
                }
            }, {
                key: "performanceObserverStop",
                value: function() {
                    this.perObserver && this.perObserver.disconnect && (this.perObserver.disconnect(),
                    this.perObserver = null),
                    E = !0
                }
            }, {
                key: "addEventToStopMutation",
                value: function(e) {
                    var t = this;
                    A.call(e.querySelectorAll("[interactive]"), 0).forEach(function(e) {
                        var r = e.getAttribute("interactive") || "click";
                        e.addEventListener(r, function() {
                            t.mutaObserverStop()
                        })
                    })
                }
            }, {
                key: "addCommonEventToStopMutation",
                value: function() {
                    var e = this;
                    document && document.addEventListener && document.addEventListener("DOMContentLoaded", function() {
                        document.addEventListener("click", function() {
                            e.mutaObserverStop()
                        })
                    })
                }
            }]),
            e
        }();
        e.exports = F
    }
    , function(e, t, r) {
        "use strict";
        function n(e) {
            return e && "data:image" === e.slice(0, 10)
        }
        function i(e) {
            var t = document.createElement("a");
            return t.href = e,
            t.href
        }
        function o(e, t) {
            var r = void 0
              , i = e.match(/url\(.*?\)/g);
            if (i && i.length) {
                var o = i[i.length - 1]
                  , a = o.replace(/^url\([\'\"]?/, "").replace(/[\'\"]?\)$/, "");
                t.test(a) && !n(a) && (r = a)
            }
            return r
        }
        function a(e, t) {
            if ("IMG" === e.nodeName.toUpperCase())
                return e.getAttribute("data-srcset") || e.getAttribute("src");
            var r = window.getComputedStyle(e)
              , n = r.getPropertyValue("background-image") || r.getPropertyValue("background");
            return o(n, t)
        }
        function s(e, t, r) {
            var o = [];
            try {
                for (var s = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, function(t) {
                    if (t && t.getAttribute && !t.hasAttribute("" + e))
                        return NodeFilter.FILTER_ACCEPT
                }, !1), u = s.nextNode(); u; ) {
                    var f = a(u, t);
                    f ? (c(u, r) && !n(f) && o.push(i(f)),
                    u = s.nextNode()) : u = s.nextNode()
                }
            } catch (e) {
                console.log("getDomImgs err")
            }
            return o
        }
        function c(e, t) {
            if (!e)
                return !1;
            var r = e.getBoundingClientRect()
              , n = r.top
              , i = r.left
              , o = r.right
              , a = r.bottom;
            if (!n && !a)
                return !1;
            var s = void 0;
            return s = t ? document.getElementById(t).scrollTop : window.scrollY || window.pageYOffset,
            s + n < window.innerHeight && o > 0 && i < window.innerWidth
        }
        function u(e, t, r) {
            if (!window.performance || !window.performance.getEntriesByType)
                return [];
            var n = [];
            try {
                var i = window.performance.getEntriesByType("resource").filter(function(e) {
                    return "img" === e.initiatorType || "css" === e.initiatorType
                }).map(function(e) {
                    return {
                        name: e.name.split(":")[1] || e.name,
                        responseEnd: e.responseEnd,
                        connectEnd: e.connectEnd,
                        duration: e.duration
                    }
                })
                  , o = s(e, t, r).join("###");
                return n = i.filter(function(e) {
                    return o.indexOf(e.name) !== -1
                }).map(function(e) {
                    var t = e.responseEnd || e.connectEnd + e.duration;
                    return {
                        name: e.name,
                        time: t
                    }
                }).sort(function(e, t) {
                    return t.time - e.time
                }),
                f.logScreen("首屏内图片的加载时间", n),
                n.map(function(e) {
                    return e.time
                })
            } catch (e) {
                n = []
            }
            return n
        }
        var f = r(3);
        e.exports = {
            getImageTimingsInFirstScreen: u,
            isInFirstScreen: c
        }
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , o = r(2)
          , a = r(15)
          , s = r(3)
          , c = r(5)
          , u = "metric"
          , f = function() {
            function e(t) {
                n(this, e),
                this.cfgManager = t,
                this.tags = {},
                this.kvs = {},
                this.extraData = "",
                this.random = Math.random()
            }
            return i(e, [{
                key: "setTags",
                value: function(e) {
                    this.tags = o(this.tags, e)
                }
            }, {
                key: "getTags",
                value: function(e) {
                    return e ? this.tags[e] : this.tags
                }
            }, {
                key: "setMetric",
                value: function(e, t) {
                    var r = this;
                    if ("string" != typeof e)
                        return s.ignore("metric名称必须是string类型");
                    if ("number" != typeof t)
                        return s.ignore("metric值必须是number类型,当前为" + e + "-" + t);
                    this.kvs[e] || (this.kvs[e] = []),
                    this.kvs[e].push(t);
                    try {
                        this.cfgManager.get(u).combo && (this.timeout && (clearTimeout(this.timeout),
                        this.timeout = null),
                        this.timeout = setTimeout(function() {
                            r.report()
                        }, this.cfgManager.get(u).delay || 1500))
                    } catch (e) {
                        throw e
                    }
                }
            }, {
                key: "setExtraData",
                value: function(e) {
                    e && (this.extraData = e)
                }
            }, {
                key: "getMetric",
                value: function(e) {
                    return e ? this.kvs[e] : this.kvs
                }
            }, {
                key: "clearMetric",
                value: function() {
                    this.kvs = {}
                }
            }, {
                key: "_rollbackMetric",
                value: function(e) {
                    for (var t in e)
                        e.hasOwnProperty(t) && (this.kvs[t] = e[t].concat(this.kvs[t] || []))
                }
            }, {
                key: "report",
                value: function() {
                    var e = this
                      , t = this.cfgManager
                      , r = t.get("project");
                    if (this.kvs && 0 !== Object.keys(this.kvs).length) {
                        var n = {
                            kvs: this.kvs,
                            tags: this.tags,
                            ts: parseInt(+new Date / 1e3),
                            extraData: this.extraData
                        }
                          , i = this.kvs;
                        this.clearMetric();
                        var o = t.getApiPath(u)
                          , s = c.stringify(o, {
                            p: r,
                            pageId: t.get("pageId"),
                            unionId: t.getExtension("unionId")
                        });
                        a({
                            type: "POST",
                            url: s,
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: "data=" + encodeURIComponent(JSON.stringify(n)),
                            fail: function() {
                                e._rollbackMetric(i)
                            }
                        })
                    }
                }
            }]),
            e
        }();
        e.exports = f
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , o = r(18)
          , a = function() {
            function e(t) {
                n(this, e),
                this.cfgManager = t
            }
            return i(e, [{
                key: "addLog",
                value: function(e) {
                    o.log("[Log]: " + e, {
                        noType: !0
                    })
                }
            }]),
            e
        }();
        e.exports = a
    }
    , function(e, t, r) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r),
                n && e(t, n),
                t
            }
        }()
          , o = r(15)
          , a = r(5)
          , s = r(30)
          , c = "pv"
          , u = function() {
            function e(t) {
                n(this, e),
                this.cfgManager = t
            }
            return i(e, [{
                key: "report",
                value: function(e) {
                    var t = this.cfgManager
                      , r = t.getApiPath(c)
                      , n = t.getExtension()
                      , i = a.stringify(r, {
                        project: e && e.project || t.get("project"),
                        pageurl: encodeURIComponent(e && e.pageUrl || t.get("pageUrl")),
                        pageId: e && e.pageId || t.get("pageId"),
                        timestamp: Date.now(),
                        region: n && n.region || "",
                        operator: n && n.operator || "",
                        network: n && n.network || "",
                        container: n && n.container || "",
                        os: n && n.os || "",
                        unionid: s("uuid") || s("unionid") || s("dpid") || s("_lxsdk_cuid") || ""
                    });
                    o({
                        type: "POST",
                        url: i,
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                }
            }]),
            e
        }();
        e.exports = u
    }
    , function(e, t) {
        "use strict";
        e.exports = function(e) {
            for (var t = e + "=", r = document.cookie.split(";"), n = 0; n < r.length; n++) {
                for (var i = r[n]; " " == i.charAt(0); )
                    i = i.substring(1, i.length);
                if (0 == i.indexOf(t))
                    return i.substring(t.length, i.length)
            }
            return null
        }
    }
    , function(e, t) {
        "use strict";
        e.exports = function(e) {
            var t = window.onerror;
            if (e) {
                var r = e.cfgManager;
                if (r.get("autoCatch").js !== !1) {
                    window.onerror = function() {
                        e.parseWindowError.apply(e, arguments),
                        t && t.apply(window, arguments)
                    }
                    ;
                    var n = window.addEventListener || window.attachEvent;
                    n("unhandledrejection", function() {
                        e.parsePromiseUnhandled.apply(e, arguments)
                    })
                }
                if (r.get("autoCatch").console === !0) {
                    if (!window.console || !window.console.error)
                        return;
                    var i = window.console.error;
                    window.console.error = function() {
                        e.parseConsoleError.apply(e, arguments),
                        i && i.apply(window.console, arguments)
                    }
                }
            }
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(22)
          , i = r(33);
        e.exports = function(e) {
            var t = e.cfgManager;
            t.get("autoCatch").ajax && (i(),
            n.on("ajaxCall", function() {
                e.parseAjax.apply(e, arguments)
            }));
            var r = window.addEventListener || window.attachEvent;
            t.get("autoCatch").resource && (document && "complete" === document.readyState ? e.handleResourceTiming.apply(e, arguments) : r("load", function() {
                e.handleResourceTiming.apply(e, arguments)
            }),
            r("error", function(t) {
                t && e.handleResourceLoadError.apply(e, arguments)
            }, !0))
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = window
          , i = n.XMLHttpRequest
          , o = r(22)
          , a = r(3);
        e.exports = function() {
            if (i && !("_owl"in i)) {
                i._owl = !0;
                var e = n.location.protocol;
                if ("file:" !== e) {
                    var t = i.prototype.open
                      , r = i.prototype.send;
                    i.prototype.open = function(e, r) {
                        return this.url = r,
                        this._startTime = +new Date,
                        t.apply(this, arguments)
                    }
                    ,
                    i.prototype.send = function() {
                        var e = this
                          , t = "addEventListener"
                          , n = "onreadystatechange"
                          , i = function(t) {
                            if (t) {
                                var r = +new Date - e._startTime;
                                if (t.duration = r,
                                /catfront.(dianping|51ping).com/.test(e.url)) {
                                    var n = void 0;
                                    try {
                                        e.getAllResponseHeaders("content-type").indexOf("application/json") !== -1 && (n = t.currentTarget.response,
                                        n = JSON.parse(n))
                                    } catch (e) {
                                        a.ignore(e)
                                    }
                                    200 === t.currentTarget.status ? e.success && e.success(n) : e.fail && e.fail(n)
                                } else
                                    o.trigger("ajaxCall", t)
                            }
                        };
                        if (t in this)
                            this[t]("load", i),
                            this[t]("error", i),
                            this[t]("abort", i);
                        else {
                            var s = this[n];
                            this[n] = function(e) {
                                4 === this.readyState && i(e),
                                s && s.apply(this, arguments)
                            }
                        }
                        return r.apply(this, arguments)
                    }
                }
            }
        }
    }
    , function(e, t) {
        "use strict";
        e.exports = function(e) {
            var t = e.cfgManager;
            if (t.get("page").sensoryIndex && t.get("page").getFirstScreenTime && e.sensoryObserver(),
            t.get("autoCatch").page && !e.getReady())
                if (document && "complete" === document.readyState)
                    e.parsePageTimeWithDefer();
                else {
                    var r = window.addEventListener || window.attachEvent;
                    r("load", function() {
                        e.parsePageTimeWithDefer()
                    })
                }
        }
    }
    , function(e, t, r) {
        "use strict";
        var n = r(30)
          , i = r(10);
        e.exports = {
            getExt: function() {
                var e = n("network");
                if (!e) {
                    var t = i.getUserAgent()
                      , r = /NetType\/([a-zA-Z0-9]+)/;
                    t && r.test(t) && (e = t.match(r)[1])
                }
                var o = n("uuid") || n("unionid") || n("dpid") || n("_lxsdk_cuid")
                  , a = {};
                return e && (a.network = e),
                o && (a.unionId = o),
                a
            }
        }
    }
    , function(e, t) {
        "use strict";
        var r = ["Baiduspider", "googlebot", "360Spider", "haosouspider", "YoudaoBot", "Sogou News Spider", "Yisouspider", "Googlebot"];
        e.exports = r
    }
    , function(e, t, r) {
        "use strict";
        var n = r(15)
          , i = r(5)
          , o = r(4).version
          , a = r(3)
          , s = .01;
        e.exports = function(e, t) {
            if (e && t && !(Math.random() > s)) {
                var r = function(e, t) {
                    try {
                        e = e.split(".").map(function(e) {
                            return parseInt(e)
                        }),
                        t = t.split(".").map(function(e) {
                            return parseInt(e)
                        });
                        var r = void 0;
                        return r = e[0] !== t[0] ? e[0] - t[0] : e[1] !== t[1] ? e[1] - t[1] : e[2] - t[2],
                        r >= 0
                    } catch (e) {
                        return a.ignore(e),
                        !1
                    }
                };
                if (!r(t.cfgManager.get("version"), o)) {
                    var c = {
                        v: 1,
                        rate: s,
                        project: e,
                        version: "v_" + o,
                        pageurl: encodeURIComponent(window.location.href),
                        count: 1
                    }
                      , u = t.cfgManager.url + "/api/version";
                    u = i.stringify(u, c),
                    setTimeout(function() {
                        n({
                            type: "GET",
                            url: u
                        })
                    }, 1500)
                }
            }
        }
    }
    ])
});
