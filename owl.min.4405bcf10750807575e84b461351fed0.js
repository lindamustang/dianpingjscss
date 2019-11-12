!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Owl = t() : e.Owl = t()
}(this, function() {
    return function(e) {
        function t(r) {
            if (n[r])
                return n[r].exports;
            var i = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(i.exports, i, i.exports, t),
            i.loaded = !0,
            i.exports
        }
        var n = {};
        return t.m = e,
        t.c = n,
        t.p = "",
        t(0)
    }([function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , o = n(1)
          , a = n(8)
          , s = n(11)
          , c = n(14)
          , u = n(20)
          , g = n(24)
          , f = n(27)
          , p = n(28)
          , l = n(29)
          , h = n(18)
          , d = n(6)
          , v = n(31)
          , m = n(32)
          , y = n(34)
          , w = n(35)
          , b = n(4).version
          , S = n(13)
          , E = n(3)
          , M = n(10)
          , T = n(36)
          , x = function() {
            function e(t, n) {
                r(this, e);
                var i = new o(t);
                this.errManager = new c(i,this),
                this.pageManager = new g(i,this.errManager),
                this.resManager = new u(i,this.errManager),
                this.metricManager = new f(i),
                this.logManager = new p(i),
                this.pvManager = new l(i),
                this.cfgManager = i,
                this.init(),
                n && n.noFilter || a(this.cfgManager)
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
                      , n = t.perf
                      , r = void 0;
                    if (void 0 !== e.duration)
                        r = e;
                    else if (void 0 !== n) {
                        var i = e.timeStamp || +new Date;
                        r = {
                            position: e.position,
                            duration: i - n.navigationStart
                        }
                    }
                    r && (this.pageManager.setUserReady(),
                    this.pageManager.push(r),
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
                          , n = void 0;
                        t = e.networkCode ? e.networkCode : 0 === e.networkCode ? e.networkCode : "",
                        n = e.statusCode ? e.statusCode : 0 === e.statusCode ? e.statusCode : "";
                        var r = {
                            type: "api",
                            connectType: e.connectType || "",
                            resourceUrl: e.name,
                            statusCode: t + "|" + n,
                            responsetime: e.responseTime && e.responseTime.toString() ? e.responseTime.toString() : "0"
                        };
                        e.content && (r.firstCategory = S.AJAX,
                        r.secondCategory = e.secondCategory || e.name,
                        r.logContent = e.content),
                        this.resManager.pushApi(r)
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
                      , n = {
                        pageUrl: e && e.pageUrl || this.cfgManager.get("pageUrl"),
                        project: e && e.project || this.cfgManager.get("project"),
                        pageId: t
                    };
                    this.cfgManager.set({
                        pageId: t
                    }),
                    this.pvManager.report(n)
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
                value: function(e, t, n) {
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
                    var r = function() {
                        try {
                            return e.apply(t, arguments)
                        } catch (e) {
                            k.addError(e, n)
                        }
                    };
                    for (var i in e)
                        e.prototype.hasOwnProperty(i) && (r[i] = e[i]);
                    return r.prototype = e.prototype,
                    e.__owl_wrapper__ = r,
                    r.__owl_wrapper__ = !0,
                    r
                }
            }, {
                key: "setDimension",
                value: function(e) {
                    this.cfgManager.setExtension(e)
                }
            }]),
            e
        }()
          , k = new x({},{
            noFilter: !0
        });
        k.OWL = x,
        k.__version__ = b,
        k.errorModel = s,
        k.MetricManager = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : k.cfgManager
              , t = new f(e);
            return t
        }
        ,
        k.start = function(e) {
            var t = M.getUserAgent()
              , r = !1;
            if (T.forEach(function(e) {
                t.indexOf(e) !== -1 && (r = !0,
                E.ignore("当前环境被判断为爬虫，监控功能关闭"))
            }),
            !r && !this.isStarted) {
                if (this.isStarted = !0,
                k.cfgManager.set({
                    pageUrl: M.getHref()
                }),
                e) {
                    var i = e && e.resource && e.resource.sampleConfigurable;
                    e && e.resource && e.resource.sample && !i && (e.resource.sample = void 0),
                    k.cfgManager.set(e)
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
                a(k.cfgManager),
                y(k.pageManager),
                v(k.errManager),
                m(k.resManager, k.errManager);
                var g = e.preLoadName || "_Owl_";
                if (window[g]) {
                    window[g].isReady = !0;
                    var f = window[g]
                      , p = f.preTasks
                      , l = f.dataSet;
                    p && p.length && (p.forEach(function(e) {
                        k[e.api].apply(k, e.data)
                    }),
                    window[g].preTasks = []),
                    setTimeout(function() {
                        l && l.length && l.forEach(function(e) {
                            e && "jsError" === e.type ? k.errManager.parseWindowError.apply(k.errManager, e.data) : "resError" === e.type ? k.resManager.handleResourceLoadError.apply(k.resManager, e.data) : "resTime" === e.type ? k.resManager.handleResourceTiming.apply(k.resManager, e.data) : "pageTime" === e.type && k.pageManager.parsePageTime.apply(k.pageManager, e.data)
                        }),
                        window[g].dataSet = []
                    }, 0)
                }
                var d = k.cfgManager.get("isSPA") || k.cfgManager.get("onpopstate");
                if (d) {
                    var w = window.onpopstate;
                    window.onpopstate = function(e) {
                        k.cfgManager.set({
                            pageUrl: M.getHref()
                        });
                        var t = k.cfgManager.get("onpopstate");
                        try {
                            t(e)
                        } catch (e) {
                            E.ignore(e)
                        }
                        w && w.apply(window, e)
                    }
                }
                k.errManager.checkCache();
                var b = n(37);
                b("owl_sdk", k),
                k.cfgManager.get("autoCatch") && k.cfgManager.get("autoCatch").pv && k.reportPv()
            }
        }
        ,
        e.exports = k
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
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
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , a = n(2)
          , s = n(3)
          , c = n(4).version
          , u = n(5)
          , g = n(6)
          , f = n(7)
          , p = ["region", "operator", "network", "container", "os", "unionId"]
          , l = f + "//catfront.dianping.com"
          , h = f + "//catfront.51ping.com"
          , d = function() {
            function e(t) {
                r(this, e),
                this.url = l,
                this.filters = [],
                this._config = {
                    devMode: !1,
                    project: "",
                    webVersion: "",
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
                        fstPerfAnalysis: !1,
                        logSlowView: !1,
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
                    pageId: "owl-" + g()
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
                    pv: "/api/pv",
                    fstInfo: "/raptorapi/fstSpeed",
                    fstLog: "/raptorapi/fstLog"
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
                        var n = this.filters[t];
                        if (n.key === e)
                            return void this.filters.splice(t, 1)
                    }
                }
            }, {
                key: "addFilter",
                value: function(e, t) {
                    if (e && t instanceof Function && this.config.disabledFilters && this.config.disabledFilters.indexOf(e) === -1) {
                        for (var n = -1, r = 0; r < this.filters.length; r++) {
                            var i = this.filters[r];
                            i.key === e && (n = r,
                            i.fn = t)
                        }
                        n === -1 && this.filters.push({
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
                            "webVersion" === t && e[t] && (this.baseQuery.webVersion = e[t]),
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
                            var n = e[t];
                            "latlng" === t ? (this.extensions.region = n,
                            this.baseQuery.useLatlng = !0) : p.indexOf(t) !== -1 && (this.extensions[t] = n)
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
            var n = {}
              , r = void 0;
            for (r in e)
                n[r] = e[r];
            for (r in t)
                t.hasOwnProperty(r) && void 0 !== t[r] && (n[r] = t[r]);
            return n
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
        t.version = "1.8.13"
    }
    , function(e, t) {
        "use strict";
        e.exports = {
            stringify: function(e, t) {
                if (!t)
                    return e;
                var n = [];
                for (var r in t)
                    t.hasOwnProperty(r) && n.push(r + "=" + t[r]);
                return ~e.indexOf("?") ? e + "&" + n.join("&") : e + "?" + n.join("&")
            }
        }
    }
    , function(e, t) {
        "use strict";
        function n() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        function r() {
            return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n()
        }
        e.exports = r
    }
    , function(e, t) {
        "use strict";
        var n = window.location.protocol ? window.location.protocol : "http:";
        n = new RegExp("http").test(n) ? n : "http:",
        e.exports = n
    }
    , function(e, t, n) {
        "use strict";
        var r = n(9)
          , i = n(10);
        e.exports = function(e) {
            var t = i.getUserAgent();
            e.get("devMode") || (e.addFilter("base", r.base),
            /MicroMessenger/.test(t) ? e.addFilter("weixin", r.weixin) : /dp\/com\.dianping/.test(t) && e.addFilter("dianping", r.dianping))
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
        var n = {
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
        e.exports = n
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , o = n(2)
          , a = n(12)
          , s = n(13)
          , c = ["project", "pageUrl", "realUrl", "resourceUrl", "category", "sec_category", "level", "unionId", "timestamp", "content"]
          , u = ["rowNum", "colNum", "tags"].concat(c)
          , g = function() {
            function e(t) {
                if (r(this, e),
                t) {
                    var n = void 0;
                    for (n in t)
                        t.hasOwnProperty(n) && (this[n] = t[n]);
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
                      , n = this.colNum
                      , r = {};
                    return c.map(function(t) {
                        void 0 !== e[t] && (r[t] = e[t])
                    }),
                    r.category === s.SCRIPT && t && n && (r.dynamicMetric = {
                        rowNum: t,
                        colNum: n
                    }),
                    this.tags && (r.dynamicMetric = o(r.dynamicMetric || {}, this.tags)),
                    r
                }
            }]),
            e
        }();
        g.LEVEL = a,
        g.CATEGORY = s,
        e.exports = g
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
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
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
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , a = n(15)
          , s = n(2)
          , c = n(11)
          , u = n(16)
          , g = n(13)
          , f = n(3)
          , p = n(10)
          , l = n(5)
          , h = n(18)
          , d = "error"
          , v = function(e) {
            return e && e.stack || ""
        }
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
            function e(t, n) {
                r(this, e),
                this.parent = n,
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
                        f.ignore("onErrorPush方法返回结果有误")
                    } catch (t) {
                        return f.ignore("onErrorPush方法处理有误", t),
                        e
                    }
                }
            }, {
                key: "parseWindowError",
                value: function(e, t, n, r, i) {
                    try {
                        i && i.stack ? this.push(i) : "string" == typeof e && this._push({
                            category: g.SCRIPT,
                            sec_category: e,
                            resourceUrl: t,
                            rowNum: n,
                            colNum: r
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
                                category: g.SCRIPT,
                                sec_category: "unhandledrejection",
                                content: t
                            }))
                        } catch (e) {
                            f.ignore(e)
                        }
                }
            }, {
                key: "parseConsoleError",
                value: function() {
                    try {
                        var e = [].slice.call(arguments);
                        if (!e || !e.length)
                            return;
                        for (var t = [], n = 0; n < e.length; n++) {
                            var r = e[n];
                            "string" != typeof e[n] && (r = e[n]instanceof window.Error ? JSON.stringify(e[n].stack) : JSON.stringify(e[n])),
                            t.push(r)
                        }
                        t && t.length && this._push({
                            category: g.SCRIPT,
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
                        var n = window.onbeforeunload;
                        window.onbeforeunload = function() {
                            var r = e.addCacheExtension()
                              , i = e.cacheSending
                              , o = void 0;
                            if (Object.keys(i))
                                for (var a in i)
                                    if (i.hasOwnProperty(a) && void 0 !== i[a]) {
                                        var s = i[a]
                                          , c = s.xhr
                                          , g = s.cache;
                                        try {
                                            c.abort()
                                        } catch (e) {
                                            f.ignore(e)
                                        }
                                        o = r.concat(g)
                                    }
                            if (o && o.length)
                                if (window.navigator && window.navigator.sendBeacon && e.cfgManager.get("useSendBeacon")) {
                                    var p = e.cfgManager.getApiPath(d)
                                      , h = l.stringify(p, {
                                        pageId: e.cfgManager.get("pageId"),
                                        beacon: 1
                                    });
                                    window.navigator.sendBeacon(h, m(o))
                                } else
                                    e.cfgManager.get("disableCache") || u.add(o);
                            n && n.apply(e, t)
                        }
                    } catch (e) {
                        f.ignore(e)
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
                                url: e.cfgManager.getApiPath(d),
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
                            category: g.SCRIPT,
                            sec_category: "Invalid_Error",
                            content: t
                        }
                    }
                      , n = function(e) {
                        var n = e.line
                          , r = e.column
                          , i = e.message || e.name || "";
                        if (e.stack) {
                            var o = e.stack.match("https?://[^\n]+");
                            o = o ? o[0] : "";
                            var a = /https?:\/\/(\S)*\.js/
                              , s = "";
                            a.test(o) && (s = o.match(a)[0]);
                            var c = o.match(":(\\d+):(\\d+)");
                            c || (c = [0, 0, 0]);
                            var u = v(e);
                            return {
                                category: g.SCRIPT,
                                sec_category: i,
                                content: u,
                                rowNum: void 0 !== n ? n : c[1],
                                colNum: void 0 !== r ? r : c[2],
                                resourceUrl: s
                            }
                        }
                        return t(e)
                    };
                    try {
                        return n(e)
                    } catch (n) {
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
                      , n = this.cfgManager;
                    if (e && !(Math.random() > n.get(d).sample)) {
                        if (e instanceof c || (e instanceof Error ? e = this._processError(e) : "string" == typeof e ? e = {
                            sec_category: e
                        } : "object" === ("undefined" == typeof e ? "undefined" : i(e)) && (e = {
                            sec_category: e.name,
                            content: e.msg
                        }),
                        e = this.parse(e),
                        e = new c(e)),
                        e && e.content && e.content.length >= n.get(d).maxSize)
                            return void h.log("[Error]: 错误长度大于" + n.get(d).maxSize);
                        e.update(t),
                        h.log("[Error]: 错误类别->" + e.sec_category + " 错误堆栈->" + e.content);
                        var r = n.filters
                          , o = !0;
                        if (this.cfgManager.get("noScriptError") && 0 === e.sec_category.indexOf("Script error"))
                            return o = !1;
                        if (r && r.length)
                            for (var a = 0; a < r.length; a++) {
                                var s = r[a];
                                if (!s.fn(e))
                                    return o = !1
                            }
                        var u = n.get("ignoreList").js;
                        if (u && u.length)
                            for (var g = 0; g < u.length; g++) {
                                var f = u[g];
                                if (0 === e.sec_category.indexOf(f)) {
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
                        var n = this.cache[t];
                        if (n instanceof c || (n = new c(n)),
                        n.isEqual(e))
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
                      , n = this.cfgManager
                      , r = this.comboTimeout
                      , i = n.get("error").maxNum || 100
                      , o = n.get("error").maxTime || 6e4
                      , a = Date.now() - this.timeLimit;
                    this.isTimeLimit || (this.timeLimit = Date.now()),
                    this.isTimeLimit = !0;
                    var s = function() {
                        if (t.cache.length) {
                            clearTimeout(r),
                            r = 0,
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
                                f.ignore(e)
                            }
                            var c = y({
                                url: t.cfgManager.getApiPath(d) + ("&pageId=" + n.get("pageId")),
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
                      , c = n.get(d).delay;
                    e ? s() : r || c === -1 || (r = setTimeout(s, c))
                }
            }, {
                key: "addCacheExtension",
                value: function() {
                    var e = this.cfgManager
                      , t = this.cache
                      , n = []
                      , r = e.getExtension();
                    if (!t || !t.length)
                        return n;
                    for (var o = 0; o < t.length; o++) {
                        var a = t[o];
                        r && "object" === ("undefined" == typeof r ? "undefined" : i(r)) && (a = s(a.toJson(), r)),
                        n.push(a)
                    }
                    return n
                }
            }]),
            e
        }();
        e.exports = w
    }
    , function(e, t, n) {
        "use strict";
        var r = n(10)
          , i = function() {};
        e.exports = function(e) {
            if (e) {
                var t = r.getUserAgent()
                  , n = r.getAppName()
                  , o = n.indexOf("Microsoft Internet Explorer") !== -1 && (t.indexOf("MSIE 8.0") !== -1 || t.indexOf("MSIE 9.0") !== -1)
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
                        for (var g in e.header)
                            e.header.hasOwnProperty(g) && s.setRequestHeader(g, e.header[g]);
                    s.send(e.data)
                } else
                    s.send();
                return s
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var r = "owl_cache"
          , i = n(17)
          , o = n(3);
        e.exports = {
            isSupport: i(),
            get: function() {
                if (this.isSupport) {
                    var e = [];
                    try {
                        var t = localStorage.getItem(r);
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
                        localStorage.setItem(r, JSON.stringify(e))
                    } catch (e) {
                        o.ignore(e)
                    }
                }
            },
            clear: function() {
                if (this.isSupport)
                    try {
                        localStorage.removeItem(r)
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
    , function(e, t, n) {
        "use strict";
        var r = n(19).loadScript
          , i = void 0
          , o = !1;
        e.exports = {
            queue: [],
            ready: function() {
                var e = this
                  , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , n = t.LoganAPI
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
                if (n)
                    i = n,
                    u();
                else
                    try {
                        window && window.Logan ? (i = window.Logan,
                        u()) : r("//www.dpfile.com/app/dp-logan-web/logan_1.12.10.js", function() {
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
                    var n = "owl";
                    t.noType && (n = "owl"),
                    i ? i.log(e, n) : this.queue.push(e)
                }
            }
        }
    }
    , function(e, t) {
        "use strict";
        var n = [];
        t.loadScript = function(e, t) {
            if (~n.indexOf(e))
                return void t();
            var r = document.createElement("script");
            r.src = e,
            r.onload = function() {
                n.push(e),
                t()
            }
            ,
            document.getElementsByTagName("head")[0].appendChild(r)
        }
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , o = n(15)
          , a = n(21)
          , s = n(13)
          , c = n(22)
          , u = n(3)
          , g = n(10)
          , f = n(18)
          , p = n(7)
          , l = n(23)
          , h = "resource"
          , d = 10
          , v = function(e) {
            var t = e.split("//");
            if (t && t.length > 1)
                return t[0] + "//" + t[1].split("/")[0] + "/images"
        }
          , m = function() {
            function e(t, n) {
                r(this, e),
                this.cfgManager = t,
                this.errManager = n,
                this.cache = [],
                this.entryCache = [],
                this.comboTimeout = 0,
                this.isSupportGetEntry = window.performance && void 0 !== window.performance.getEntries
            }
            return i(e, [{
                key: "parseAjax",
                value: function(e) {
                    var t = void 0
                      , n = void 0
                      , r = void 0
                      , i = void 0
                      , o = void 0
                      , a = void 0;
                    try {
                        t = e.type,
                        n = e.currentTarget.responseURL || e.currentTarget.url,
                        r = e.duration,
                        i = e.total,
                        o = e.currentTarget.status,
                        a = this.getConnectType()
                    } catch (e) {
                        return e
                    }
                    if (void 0 !== r && !isNaN(r)) {
                        var c = "load" === t || "readystatechange" === t && 200 === o;
                        f.log("[加载资源]: [类型]->AJAX [链接]->" + n),
                        0 === n.indexOf("//") ? n = g.getProtocol() + n : 0 === n.indexOf("/") && (n = g.getOrigin() + n),
                        o = (c ? 200 : 500) + "|";
                        var p = this.cfgManager
                          , l = !0;
                        try {
                            var h = p.get("ignoreList").ajax;
                            if (h)
                                for (var d = 0; d < h.length; d++) {
                                    var v = h[d]
                                      , m = new RegExp(v);
                                    if (m.test(n))
                                        return void (l = !1)
                                }
                        } catch (e) {
                            u.ignore(e)
                        }
                        if (l) {
                            var y = p.get("resourceReg")
                              , w = p.get("devMode") || y instanceof RegExp && p.get("resourceReg").test(n);
                            w ? !p.get("ajax").flag || r < p.get("ajax").duration ? this.pushApi({
                                type: "ajax",
                                connectType: a,
                                resourceUrl: n,
                                responsetime: r && r.toString() ? r.toString() : "0",
                                responsebyte: i && i.toString() ? i.toString() : "0",
                                statusCode: o,
                                firstCategory: c ? "" : s.AJAX
                            }) : (this.errManager.push({
                                name: "TIMEOUT_AJAX",
                                msg: "ajax请求时间超过设定" + n
                            }, {
                                category: s.AJAX
                            }),
                            f.log("[加载资源请求超时]: [类型]->AJAX [链接]->" + n)) : p.get("invalid").ajax && p.get("ajax").invalid && Math.random() < p.get("resource").sample && (this.errManager.push({
                                name: "INVALID_AJAX",
                                msg: n
                            }, {
                                category: s.AJAX
                            }),
                            f.log("[资源请求域名非法]: [类型]->AJAX [链接]->" + n))
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
                      , n = this.cfgManager.get("ignoreList").resource;
                    try {
                        for (var r = 0; r < n.length; r++) {
                            var i = n[r]
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
                        for (var t = this.cfgManager, n = this.entryCache, r = 0; r < e.length; r++) {
                            var i = e[r]
                              , o = i.name
                              , a = this.filterResource(o);
                            if (!a)
                                return;
                            if (t.get("devMode") || t.get("resourceReg").test(o)) {
                                n.push(o);
                                var c = "200|"
                                  , u = t.get("image")
                                  , g = !1;
                                if (("img" === i.initiatorType || "css" === i.initiatorType) && u.flag) {
                                    var f = i.name
                                      , p = u.filter;
                                    if ("function" == typeof p && !p(f)) {
                                        var l = i.transferSize
                                          , h = i.duration
                                          , d = void 0;
                                        l && l > 1e3 * u.fileSize ? d = "IMAGE_SIZE_EXCEED" : h && h > u.duration && (d = "IMAGE_DURATION_EXCEED"),
                                        d && (this.errManager._pushResource({
                                            content: f,
                                            sec_category: d
                                        }, {
                                            category: s.RESOURCE
                                        }),
                                        g = !0)
                                    }
                                }
                                g || this.push({
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
                    for (var t = [], n = 0; n < e.length; n++) {
                        var r = e[n];
                        ["link", "script", "img", "css"].indexOf(r.initiatorType) !== -1 && t.push(r)
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
                            var n = new window.PerformanceObserver(function(t) {
                                try {
                                    var n = t.getEntries();
                                    e.doHandlePerformanceEntry(n)
                                } catch (e) {
                                    u.ignore(e)
                                }
                            }
                            );
                            n.observe({
                                entryTypes: ["resource"]
                            })
                        } else
                            c.on("ajaxCall", function() {
                                setTimeout(function() {
                                    var t = e.entryCache
                                      , n = window.performance.getEntries();
                                    if (n.length !== t.length && n.length > t.length) {
                                        for (var r = [], i = 0; i < n.length; i++)
                                            t.indexOf(n[i].name) === -1 && r.push(n[i]);
                                        t = n,
                                        e.doHandlePerformanceEntry(r)
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
                      , n = e.target || e.srcElement
                      , r = function() {
                        var e = n.src || n.href
                          , r = n.nodeName;
                        r && (r = r.toLowerCase());
                        var i = g.getHref();
                        if (i && 0 !== i.indexOf(e)) {
                            var o = e;
                            if ("img" === r && (o = v(e)),
                            o) {
                                var a = t.filterResource(o);
                                a && (t.addLogan(r, e),
                                t.isSupportGetEntry ? t.pushApi({
                                    type: t.parseType(r),
                                    resourceUrl: o,
                                    responsetime: "0",
                                    responsebyte: "0",
                                    statusCode: "500|",
                                    firstCategory: s.RESOURCE,
                                    secondCategory: r,
                                    logContent: e
                                }) : t.errManager._pushResource({
                                    category: s.RESOURCE,
                                    sec_category: r,
                                    content: e
                                }))
                            }
                        }
                    };
                    try {
                        var i = n instanceof HTMLScriptElement || n instanceof HTMLLinkElement || n instanceof HTMLImageElement;
                        if (!i)
                            return;
                        r()
                    } catch (e) {
                        this.errManager.reportSystemError(e)
                    }
                }
            }, {
                key: "addLogan",
                value: function(e, t) {
                    f.log("[加载资源出错]: [类型]->" + e + " [链接]->" + t)
                }
            }, {
                key: "_stringify",
                value: function() {
                    var e = this.cache;
                    if (e && e.length) {
                        for (var t = {}, n = this.cfgManager.getExtension(), r = {}, i = [], o = ["region", "operator", "network", "container", "os", "unionId"], a = 0; a < o.length; a++)
                            r[o[a]] = "";
                        for (var s = 0; s < e.length; s++) {
                            var c = e[s];
                            i.push(c)
                        }
                        for (var u in r)
                            r.hasOwnProperty(u) && (r[u] = n[u] || "");
                        return r.infos = i,
                        t = r
                    }
                }
            }, {
                key: "doBatchPush",
                value: function(e) {
                    e = this.parse(e);
                    var t = new a(e);
                    this.onPush && this.onPush(t);
                    var n = !0
                      , r = this.cfgManager;
                    if ("function" == typeof r.get("onBatchPush")) {
                        var i = r.get("onBatchPush");
                        try {
                            n = i(t)
                        } catch (e) {
                            u.ignore(e)
                        }
                    }
                    n && this.cache.push(t)
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
                      , n = this.cfgManager;
                    if (this.cache.length) {
                        var r = function() {
                            clearTimeout(t.comboTimeout),
                            t.comboTimeout = 0,
                            t.onSubmit && t.onSubmit(t.cache),
                            t.send()
                        }
                          , i = n.get(h).delay;
                        e ? this.send() : this.comboTimeout || i === -1 || (this.comboTimeout = setTimeout(r, i))
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
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , i = ["resourceUrl", "connectType", "type", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "realUrl", "statusCode", "firstCategory", "secondCategory", "logContent"]
          , o = ["resourceUrl", "connectType", "type", "timestamp", "requestbyte", "responsebyte", "responsetime", "project", "pageUrl", "realUrl", "statusCode", "firstCategory", "secondCategory", "logContent"]
          , a = function() {
            function e(t) {
                var r = this;
                n(this, e),
                i.forEach(function(e) {
                    r[e] = t[e]
                }),
                this.parse()
            }
            return r(e, [{
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
                    var n = this._events_;
                    n[e] || (n[e] = []),
                    n[e].push(t)
                }
            },
            trigger: function(e) {
                var t = this._events_;
                if (e && t && t[e])
                    for (var n = t[e], r = n.length, i = Array.prototype.slice.call(arguments, 1), o = 0; o < r; o++)
                        n[o].apply(this, i)
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var r = n(10);
        e.exports = {
            PerformanceObserver: function() {
                if (window.PerformanceObserver)
                    try {
                        var e = /Chrome\/(\d+)/
                          , t = r.getUserAgent();
                        if (!e.test(t))
                            return !0;
                        var n = t.match(e)[1];
                        if (parseInt(n) > 59)
                            return !0
                    } catch (e) {}
            },
            MutationObserver: function() {
                if (window.MutationObserver)
                    try {
                        var e = -1
                          , t = r.getUserAgent();
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
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , o = n(15)
          , a = n(5)
          , s = n(2)
          , c = n(4).version
          , u = n(3)
          , g = n(25)
          , f = Number.parseInt || window.parseInt
          , p = "page"
          , l = function() {
            function e(t, n) {
                r(this, e),
                this.noCache = !1,
                this.points = [],
                this.pointsCustom = [],
                this.cfgManager = t,
                this.errManager = n
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
                    return this.cfgManager.get(p).auto
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
                      , n = [];
                    try {
                        if (!e)
                            return;
                        if ("function" == typeof t) {
                            for (var r = 0; r < e.length; r++) {
                                var i = e[r];
                                t(i) && n.push(i)
                            }
                            return n
                        }
                        for (var o = 0; o < e.length; o++) {
                            var a = e[o];
                            "link" !== a.initiatorType && "script" !== a.initiatorType || n.push(a)
                        }
                        var s = this.cfgManager.get("page").mainResourceNumber;
                        return n.length <= s ? n : n.splice(0, s)
                    } catch (e) {
                        u.ignore(e)
                    }
                }
            }, {
                key: "sensoryObserver",
                value: function() {
                    this.firstScreenManager = new g(this.cfgManager),
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
                                e.parsePageTime(t),
                                e.parseFirstScreenPerf(t)
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
                      , n = t.perf
                      , r = t.paint;
                    if (!n)
                        return this.setReady();
                    var i = n.navigationStart
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
                    for (a in n)
                        0 === n[a] ? this.points[o[a]] = n[a] : this.points[o[a]] = n[a] - i;
                    if (this.points[20] = n.domainLookupEnd - n.domainLookupStart,
                    this.points[21] = n.connectEnd - n.connectStart,
                    this.points[22] = n.responseEnd - n.requestStart,
                    r && r.length)
                        try {
                            for (var s = void 0, c = void 0, g = 0; g < r.length; g++) {
                                var p = r[g];
                                "first-paint" === p.name ? s = f(p.startTime) : "first-contentful-paint" === p.name && (c = f(p.startTime))
                            }
                            s && c && (this.points[23] = s,
                            this.points[24] = c,
                            e && (e.FST && e.FST > c ? this.points[25] = e.FST : this.points[25] = c,
                            this.points[26] = e.FCP || c))
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
                      , n = this.cfgManager;
                    if (this.getReady() && this.getUserReady() && (this.points.length || this.pointsCustom.length) && !(Math.random() > n.get(p).sample)) {
                        this.onSubmit && this.onSubmit(this.points, this.pointsCustom);
                        try {
                            this.timeout ? this.clearTimeout() : this.pendingAjax && this.pendingAjax.abort && this.pendingAjax.abort()
                        } catch (e) {
                            u.ignore(e)
                        }
                        var r = function() {
                            if (t.clearTimeout(),
                            t.points.length || t.pointsCustom.length) {
                                var e = n.getApiPath(p)
                                  , r = a.stringify(e)
                                  , i = n.getExtension()
                                  , u = s({
                                    project: n.get("project"),
                                    pageurl: encodeURIComponent(n.get("pageUrl")),
                                    speed: encodeURIComponent(t.points.join("|")),
                                    customspeed: encodeURIComponent(t.pointsCustom.join("|")),
                                    timestamp: +new Date,
                                    sdk: c,
                                    noCache: t.noCache ? "true" : "false",
                                    pageId: n.get("pageId"),
                                    unionId: n.getExtension("unionId")
                                }, i);
                                r = a.stringify(r, u),
                                t.pendingAjax = o({
                                    method: "GET",
                                    url: r,
                                    success: function() {
                                        t.points = [],
                                        t.pointsCustom = [],
                                        t.pendingAjax = void 0
                                    },
                                    xhrRewritten: !!n.get("autoCatch").ajax
                                })
                            }
                        }
                          , i = n.get(p).delay || 0;
                        e ? r() : i >= 0 && (this.timeout = setTimeout(function() {
                            r()
                        }, i))
                    }
                }
            }, {
                key: "parseFirstScreenPerf",
                value: function(e) {
                    var t = this
                      , n = this.cfgManager
                      , r = n.get(p).delay || 0;
                    setTimeout(function() {
                        if (e && e.FST && n.get(p).fstPerfAnalysis === !0) {
                            var r = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("resource");
                            if (r && r.length) {
                                var i = f(e.FST || 0)
                                  , c = Math.random()
                                  , u = c < n.get(p).sample
                                  , g = i < 2e3 ? .05 : .1
                                  , l = i > 1e3 && c < g && n.get(p).logSlowView === !0;
                                if (u) {
                                    var h = {
                                        picCount: 0,
                                        picSize: 0,
                                        jsCount: 0,
                                        jsSize: 0,
                                        cssCount: 0,
                                        cssSize: 0,
                                        ajaxCount: 0
                                    }
                                      , d = {
                                        img: {},
                                        js: {},
                                        css: {},
                                        ajax: {}
                                    }
                                      , v = /\.js$/i
                                      , m = /\.css$/i
                                      , y = /^(https?:\/\/[^\/\r\n]+)(\/[^\r\n]*)?$/
                                      , w = void 0
                                      , b = void 0
                                      , S = void 0
                                      , E = void 0
                                      , M = void 0
                                      , T = void 0
                                      , x = void 0
                                      , k = void 0;
                                    try {
                                        r.filter(function(e) {
                                            return e.startTime && e.startTime < i
                                        }).forEach(function(e) {
                                            var t = ""
                                              , n = e.initiatorType || ""
                                              , r = f(e.transferSize || 0)
                                              , i = e.name || "";
                                            if ("img" === n ? (h.picCount++,
                                            h.picSize += r,
                                            t = "img") : "script" === n || "link" === n && i && i.match(v) ? (h.jsCount++,
                                            h.jsSize += r,
                                            t = "js") : "css" === n || "link" === n && i && i.match(m) ? (h.cssCount++,
                                            h.cssSize += r,
                                            t = "css") : "xmlhttprequest" !== n && "fetch" !== n && "beacon" !== n || (h.ajaxCount++,
                                            t = "ajax"),
                                            l && t && i) {
                                                var o = i.match(y);
                                                o && o[1] && o[2] && (w = f(e.duration || 0),
                                                b = f(e.startTime || 0),
                                                S = e.domainLookupEnd && e.domainLookupStart ? f(e.domainLookupEnd - e.domainLookupStart) : 0,
                                                E = e.connectEnd && e.connectStart ? f(e.connectEnd - e.connectStart) : 0,
                                                M = e.connectEnd && e.secureConnectionStart ? f(e.connectEnd - e.secureConnectionStart) : 0,
                                                T = e.responseStart && e.requestStart ? f(e.responseStart - e.requestStart) : 0,
                                                x = e.responseEnd && e.responseStart ? f(e.responseEnd - e.responseStart) : 0,
                                                k = "" + r + "," + w + "," + b + "," + S + "," + E + "," + M + "," + T + "," + x,
                                                d[t][o[1]]instanceof Array ? d[t][o[1]].push([o[2], k]) : d[t][o[1]] = [[o[2], k]])
                                            }
                                        });
                                        var C = a.stringify(n.getApiPath("fstInfo"))
                                          , O = s({
                                            p: n.get("project"),
                                            page: encodeURIComponent(n.get("pageUrl")),
                                            ts: Date.now(),
                                            pageId: n.get("pageId"),
                                            unionId: n.getExtension("unionId"),
                                            respTime: i
                                        }, h);
                                        if (o({
                                            type: "POST",
                                            url: C,
                                            header: {
                                                "Content-Type": "application/x-www-form-urlencoded"
                                            },
                                            data: "data=" + encodeURIComponent(JSON.stringify(O))
                                        }),
                                        l) {
                                            var I = a.stringify(n.getApiPath("fstLog"))
                                              , P = {
                                                p: n.get("project"),
                                                page: encodeURIComponent(n.get("pageUrl")),
                                                ts: Date.now(),
                                                pageId: n.get("pageId"),
                                                unionId: n.getExtension("unionId"),
                                                respTime: i,
                                                content: JSON.stringify(d)
                                            };
                                            o({
                                                type: "POST",
                                                url: I,
                                                header: {
                                                    "Content-Type": "application/x-www-form-urlencoded"
                                                },
                                                data: "data=" + encodeURIComponent(JSON.stringify(P))
                                            })
                                        }
                                    } catch (e) {
                                        t.errManager.reportSystemError(e)
                                    }
                                }
                            }
                        }
                    }, r)
                }
            }]),
            e
        }();
        e.exports = l
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(e, t) {
            var n = !1;
            return t && (n = !(!e.closest || !e.closest("[" + t + "]")) || e.hasAttribute && e.hasAttribute(t)),
            n && d.logScreen("忽略元素：", e),
            n
        }
        function o() {
            var e = {
                height: window.outerHeight || screen.height,
                width: window.outerWidth || screen.width
            }
              , t = document.documentElement || document.body
              , n = [window.innerWidth, t.clientWidth].filter(function(t) {
                return t && t > e.width && t / e.width >= 2
            });
            return n.forEach(function(t) {
                var n = t / e.width;
                e.height = e.height * n,
                e.width = e.width * n
            }),
            e
        }
        function a(e, t) {
            y === -1 && (window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("paint") && document && document.body && "" != document.body.innerText ? y = 0 : (e && 3 === e.nodeType || e && "" !== e.innerText || document.querySelector && document.querySelector("img")) && (y = U(t || 0)))
        }
        function s() {
            S || c()
        }
        function c() {
            d.logScreen("DOM有效变更：" + m.length, m);
            var e = [];
            m.forEach(function(t) {
                var n = t.startTime
                  , r = t.nodes
                  , i = [];
                if (r.forEach(function(e) {
                    var t = e.style || {}
                      , n = t.visibility
                      , r = t.display;
                    if ("hidden" !== n && "none" !== r) {
                        var o = e.getBoundingClientRect && e.getBoundingClientRect();
                        o && o.width > 0 && o.height > 0 && o.top <= N && o.left <= D && i.push({
                            node: e,
                            rect: o
                        })
                    }
                }),
                i.length) {
                    var o = f(i);
                    o && e.push({
                        score: o,
                        startTime: n
                    })
                }
            }),
            m = [],
            S = !0,
            d.logScreen("DOM有效首屏变更：", e);
            var t = g(e);
            M = {
                FST: t,
                FCP: y || 0
            },
            d.logScreen("DOM首屏时间", t)
        }
        function u(e, t) {
            var n = h.getImageTimingsInFirstScreen(e, t, k);
            if (M && n.length) {
                var r = Math.round(n[0]);
                M.FST = Math.max(M.FST, r),
                d.logScreen("首屏图片时间", r),
                d.logScreen("最终首屏时间", M.FST)
            }
        }
        function g(e) {
            var t = e.reduce(function(e, t) {
                var n = e[e.length - 1];
                return n && t.startTime - n.startTime < 1 ? n.score += t.score : e.push({
                    score: t.score,
                    startTime: t.startTime
                }),
                e
            }, []);
            d.logScreen("DOM有效首屏变更合并：", t);
            var n = t.reduce(function(e, t) {
                return !e || t.score > Math.min(e.score, _) ? t : e
            }, null);
            return U(n && n.startTime || 0)
        }
        function f(e) {
            return e.reduce(function(e, t) {
                return e + p(t, 0)
            }, 0)
        }
        function p(e, t) {
            var n = e.node
              , r = e.rect
              , i = n.style || {}
              , o = i.visibility
              , a = i.display;
            if ("hidden" === o || "none" === a)
                return 0;
            if (3 === n.nodeType) {
                if (n.textContent) {
                    var s = n.textContent.charCodeAt(0);
                    if (10 !== s && 13 !== s)
                        return t + P
                }
                return 0
            }
            if (n.childNodes.length)
                return A.call(n.childNodes, 0).reduce(function(e, n) {
                    return e + p({
                        node: n
                    }, t + I)
                }, 0);
            var c = r || {
                width: n.clientWidth,
                height: n.clientHeight
            }
              , u = c.width
              , g = c.height;
            return u && g ? t + P : 0
        }
        var l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , h = n(26)
          , d = n(3)
          , v = n(23)
          , m = []
          , y = -1
          , w = !1
          , b = void 0
          , S = !1
          , E = !1
          , M = void 0
          , T = void 0
          , x = void 0
          , k = void 0
          , C = 0
          , O = 15
          , I = 0
          , P = 1
          , _ = 3
          , R = 3e3
          , j = ["HTML", "HEAD", "SCRIPT", "STYLE"]
          , A = Array.prototype.slice
          , U = Number.parseInt || window.parseInt
          , L = o()
          , N = L.height
          , D = L.width
          , F = function() {
            function e(t) {
                r(this, e),
                this.cfgManager = t,
                this.pageData = [],
                this.observer = null,
                this.disableMutaObserver = null;
                var n = U(t.get("page").mutaStopTime);
                this.mutaStopTime = n && n > R ? n : R,
                this.perObserver = null,
                this.ignoreDom = "owl-ignore",
                this.ignoreIframe = t.get("page").ignoreIframe || !0,
                this.pattern = /(\.)(png|jpg|jpeg|gif|webp|ico|bmp|tiff|svg)/i,
                k = t.get("page").scrollDom,
                window._Owl_ && (this.pageData = window._Owl_.pageData,
                this.observer = window._Owl_.observer,
                this.disableMutaObserver = window._Owl_.disableMutaObserver),
                !this.disableMutaObserver && document.body || (S = !0,
                E = !0)
            }
            return l(e, [{
                key: "mutaObserver",
                value: function() {
                    var e = this;
                    if (v.PeformanceNow() && v.MutationObserver()) {
                        if (!S) {
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
                                x = setTimeout(function() {
                                    s()
                                }, this.mutaStopTime);
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
                        var n = setTimeout(function() {
                            e.performanceObserverStop()
                        }, 8e3);
                        this.perObserver = new window.PerformanceObserver(function() {
                            clearTimeout(b),
                            b = setTimeout(function() {
                                clearTimeout(n),
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
                      , n = 0
                      , r = setTimeout(function() {
                        clearInterval(n),
                        t.mutaObserverStop(),
                        t.performanceObserverStop(),
                        e(M)
                    }, 8e3)
                      , i = function() {
                        S && E && (clearInterval(n),
                        M ? (T || u(t.ignoreDom, t.pattern),
                        clearTimeout(r),
                        e(M)) : (clearTimeout(r),
                        e()))
                    };
                    n = setInterval(i, 500)
                }
            }, {
                key: "mutaCallback",
                value: function(e, t) {
                    var n = this;
                    t || (t = performance.now()),
                    x && (x = clearTimeout(x)),
                    w && clearTimeout(w),
                    w = setTimeout(function() {
                        return n.mutaObserverStop()
                    }, this.mutaStopTime),
                    setTimeout(function() {
                        d.logScreen("DOM原始变更：" + e.length, e),
                        e.filter(function(e) {
                            var t = (e.target.nodeName || "").toUpperCase();
                            return "childList" === e.type && e.addedNodes.length && j.indexOf(t) === -1
                        }).forEach(function(e) {
                            var r = A.call(e.addedNodes, 0).filter(function(e) {
                                var t = e.nodeName.toUpperCase();
                                return !(1 !== e.nodeType || j.indexOf(t) != -1 || n.ignoreIframe && "IFRAME" === t || i(e, n.ignoreDom))
                            })
                              , o = r[0];
                            if (o) {
                                a(o, t),
                                m.push({
                                    nodes: r,
                                    startTime: t
                                });
                                var s = o.getBoundingClientRect && o.getBoundingClientRect();
                                s && s.top > N && (++C > O && n.mutaObserverStop(),
                                d.logScreen("首屏外节点检测：" + C + "次")),
                                r.forEach(function(e) {
                                    document.querySelectorAll && n.addEventToStopMutation(e)
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
                        var n = e.getAttribute("interactive") || "click";
                        e.addEventListener(n, function() {
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
    , function(e, t, n) {
        "use strict";
        function r(e) {
            return e && "data:image" === e.slice(0, 10)
        }
        function i(e) {
            var t = document.createElement("a");
            return t.href = e,
            t.href
        }
        function o(e, t) {
            var n = void 0
              , i = e.match(/url\(.*?\)/g);
            if (i && i.length) {
                var o = i[i.length - 1]
                  , a = o.replace(/^url\([\'\"]?/, "").replace(/[\'\"]?\)$/, "");
                t.test(a) && !r(a) && (n = a)
            }
            return n
        }
        function a(e, t) {
            if ("IMG" === e.nodeName.toUpperCase())
                return e.getAttribute("data-srcset") || e.getAttribute("src");
            var n = window.getComputedStyle(e)
              , r = n.getPropertyValue("background-image") || n.getPropertyValue("background");
            return o(r, t)
        }
        function s(e, t, n) {
            var o = [];
            try {
                for (var s = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, function(t) {
                    if (t && t.getAttribute && !t.hasAttribute("" + e))
                        return NodeFilter.FILTER_ACCEPT
                }, !1), u = s.nextNode(); u; ) {
                    var g = a(u, t);
                    g ? (c(u, n) && !r(g) && o.push(i(g)),
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
            var n = e.getBoundingClientRect()
              , r = n.top
              , i = n.left
              , o = n.right
              , a = n.bottom;
            if (!r && !a)
                return !1;
            var s = void 0;
            return s = t ? document.getElementById(t).scrollTop : window.scrollY || window.pageYOffset,
            s + r < window.innerHeight && o > 0 && i < window.innerWidth
        }
        function u(e, t, n) {
            if (!window.performance || !window.performance.getEntriesByType)
                return [];
            var r = [];
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
                  , o = s(e, t, n).join("###");
                return r = i.filter(function(e) {
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
                g.logScreen("首屏内图片的加载时间", r),
                r.map(function(e) {
                    return e.time
                })
            } catch (e) {
                r = []
            }
            return r
        }
        var g = n(3);
        e.exports = {
            getImageTimingsInFirstScreen: u,
            isInFirstScreen: c
        }
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , o = n(2)
          , a = n(15)
          , s = n(3)
          , c = n(5)
          , u = "metric"
          , g = function() {
            function e(t) {
                r(this, e),
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
                    var n = this;
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
                            n.report()
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
                      , n = t.get("project");
                    if (this.kvs && 0 !== Object.keys(this.kvs).length) {
                        var r = {
                            kvs: this.kvs,
                            tags: this.tags,
                            ts: parseInt(+new Date / 1e3),
                            extraData: this.extraData
                        }
                          , i = this.kvs;
                        this.clearMetric();
                        var o = t.getApiPath(u)
                          , s = c.stringify(o, {
                            p: n,
                            pageId: t.get("pageId"),
                            unionId: t.getExtension("unionId")
                        });
                        a({
                            type: "POST",
                            url: s,
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: "data=" + encodeURIComponent(JSON.stringify(r)),
                            fail: function() {
                                e._rollbackMetric(i)
                            }
                        })
                    }
                }
            }]),
            e
        }();
        e.exports = g
    }
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , o = n(18)
          , a = function() {
            function e(t) {
                r(this, e),
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
    , function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , o = n(15)
          , a = n(5)
          , s = n(30)
          , c = "pv"
          , u = function() {
            function e(t) {
                r(this, e),
                this.cfgManager = t
            }
            return i(e, [{
                key: "report",
                value: function(e) {
                    var t = this.cfgManager
                      , n = t.getApiPath(c)
                      , r = t.getExtension()
                      , i = a.stringify(n, {
                        project: e && e.project || t.get("project"),
                        pageurl: encodeURIComponent(e && e.pageUrl || t.get("pageUrl")),
                        pageId: e && e.pageId || t.get("pageId"),
                        timestamp: Date.now(),
                        region: r && r.region || "",
                        operator: r && r.operator || "",
                        network: r && r.network || "",
                        container: r && r.container || "",
                        os: r && r.os || "",
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
            for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
                for (var i = n[r]; " " == i.charAt(0); )
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
                var n = e.cfgManager;
                if (n.get("autoCatch").js !== !1) {
                    window.onerror = function() {
                        e.parseWindowError.apply(e, arguments),
                        t && t.apply(window, arguments)
                    }
                    ;
                    var r = window.addEventListener || window.attachEvent;
                    r("unhandledrejection", function() {
                        e.parsePromiseUnhandled.apply(e, arguments)
                    })
                }
                if (n.get("autoCatch").console === !0) {
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
    , function(e, t, n) {
        "use strict";
        var r = n(22)
          , i = n(33);
        e.exports = function(e) {
            var t = e.cfgManager;
            t.get("autoCatch").ajax && (i(),
            r.on("ajaxCall", function() {
                e.parseAjax.apply(e, arguments)
            }));
            var n = window.addEventListener || window.attachEvent;
            t.get("autoCatch").resource && (document && "complete" === document.readyState ? e.handleResourceTiming.apply(e, arguments) : n("load", function() {
                e.handleResourceTiming.apply(e, arguments)
            }),
            n("error", function(t) {
                t && e.handleResourceLoadError.apply(e, arguments)
            }, !0))
        }
    }
    , function(e, t, n) {
        "use strict";
        var r = window
          , i = r.XMLHttpRequest
          , o = n(22)
          , a = n(3);
        e.exports = function() {
            if (i && !("_owl"in i)) {
                i._owl = !0;
                var e = r.location.protocol;
                if ("file:" !== e) {
                    var t = i.prototype.open
                      , n = i.prototype.send;
                    i.prototype.open = function(e, n) {
                        return this.url = n,
                        this._startTime = +new Date,
                        t.apply(this, arguments)
                    }
                    ,
                    i.prototype.send = function() {
                        var e = this
                          , t = "addEventListener"
                          , r = "onreadystatechange"
                          , i = function(t) {
                            if (t) {
                                var n = +new Date - e._startTime;
                                if (t.duration = n,
                                /catfront.(dianping|51ping).com/.test(e.url)) {
                                    var r = void 0;
                                    try {
                                        e.getAllResponseHeaders("content-type").indexOf("application/json") !== -1 && (r = t.currentTarget.response,
                                        r = JSON.parse(r))
                                    } catch (e) {
                                        a.ignore(e)
                                    }
                                    200 === t.currentTarget.status ? e.success && e.success(r) : e.fail && e.fail(r)
                                } else
                                    o.trigger("ajaxCall", t)
                            }
                        };
                        if (t in this)
                            this[t]("load", i),
                            this[t]("error", i),
                            this[t]("abort", i);
                        else {
                            var s = this[r];
                            this[r] = function(e) {
                                4 === this.readyState && i(e),
                                s && s.apply(this, arguments)
                            }
                        }
                        return n.apply(this, arguments)  
                        #密码加密处理
                        #"countrycode=86&username=18852571801&keepLogin=on&encryptPassword=
                        #X2pRIYMCKSLj18UrT%2FaHbeeJoREA37kFlEwO7xpVaKDEDpNzU69866tmn0r5xNPyPyUfVnXBqqCwTqeFwuo1u7pYUndNL7f0oXb7VusswZeO4dBp4XApxBfEo5oyYYSkfRlMujyXgKIzjWpIVeQCYHpd6K5OCcjYeZ5%2FBDmVzD0%3D&_token=eJyVkmtvokAUhv8LSftFoszADGBiNiBqvRRvoNamaQApggrKxUs3%2B9%2F3MF1t%2B2E32WQSnnOZ855zmJ9c2l1xdQ4JgiCpHM8d%2FbQ0q0KVgpVnXB0RWSQSUgSqiJjnvE8fljAREeI5N50ZXP0ZqwIvyuSldEzAfkYipbxMlRf%2BD2JALMEpc7qQwq3zfJ%2FVazXH85Iizqur0In3YRxUvWR3ddbCt9TZ%2BYMkCOMfnrPduo63abSc7MJcryz6eg0I96dw5TfenG3m3%2B%2FTJE%2B8ZNv40LlP%2FVWYMuNO1O5wG853TXBkaycO1k4I8%2F%2Bzuy3r578qwtg7qxwbSZTHWAaJL6RKPJJFRhQIA2FB4BFVGWEghREBIowUIKkk%2BA2IshsIqlCBEeQR5a9EvxG9EauMZCB8JfY0MAI1ieVh6EpCjEBXZFWwCCTe6CMKvWB2F4MupjciN2LdY9DFTA2DGv64qzCClW3KlcHX%2Bbo6Xrcta2h%2BzsR3zZFtldtTZF4ivFaGqMDLvNGdlWXya5lHeOEQzMIgBvJ7J%2FPdznEQabZmNtVhRzvMW6OpNh4Rvz8ObH3Sj5stZaTNeqfQezgVqVtIHfkgrzcKDQ6LxGxbGnoyp8m5V7GFweKSpX43sPeqH%2FvaPA%2Fc3vlYVI7GST%2FG0SG2yGklEnkqnRebpa9TeRPiaPC%2BIdFONEx10insQ2uytTyp759Dj1iy5i8fvE07GkfmbBLqxaotVLxLrZZpb51zns3Pw248c6PLsOgPBBQt9pXL3p25p%2BYbzmvrXs3IhcdjEj0ZbSOfTSsdXU1dl5AinaPkodsaVCo7e74kB%2B%2BpM9kaZKk3jSRwdWOFR4Len50n7%2BNGg%2Fv1G7pvJp4%3D"
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
                    var n = window.addEventListener || window.attachEvent;
                    n("load", function() {
                        e.parsePageTimeWithDefer()
                    })
                }
        }
    }
    , function(e, t, n) {
        "use strict";
        var r = n(30)
          , i = n(10);
        e.exports = {
            getExt: function() {
                var e = r("network");
                if (!e) {
                    var t = i.getUserAgent()
                      , n = /NetType\/([a-zA-Z0-9]+)/;
                    t && n.test(t) && (e = t.match(n)[1])
                }
                var o = r("uuid") || r("unionid") || r("dpid") || r("_lxsdk_cuid")
                  , a = {};
                return e && (a.network = e),
                o && (a.unionId = o),
                a
            }
        }
    }
    , function(e, t) {
        "use strict";
        var n = ["Baiduspider", "googlebot", "360Spider", "haosouspider", "YoudaoBot", "Sogou News Spider", "Yisouspider", "Googlebot"];
        e.exports = n
    }
    , function(e, t, n) {
        "use strict";
        var r = n(15)
          , i = n(5)
          , o = n(4).version
          , a = n(3)
          , s = .01;
        e.exports = function(e, t) {
            if (e && t && !(Math.random() > s)) {
                var n = function(e, t) {
                    try {
                        e = e.split(".").map(function(e) {
                            return parseInt(e)
                        }),
                        t = t.split(".").map(function(e) {
                            return parseInt(e)
                        });
                        var n = void 0;
                        return n = e[0] !== t[0] ? e[0] - t[0] : e[1] !== t[1] ? e[1] - t[1] : e[2] - t[2],
                        n >= 0
                    } catch (e) {
                        return a.ignore(e),
                        !1
                    }
                };
                if (!n(t.cfgManager.get("version"), o)) {
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
                        r({
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
