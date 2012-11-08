(function(a, b, c) {
    "use strict";
    var d = a.document,
        e = a.Modernizr,
        f = function(a) {
            return a.charAt(0)
                .toUpperCase() + a.slice(1)
        }, g = "Moz Webkit O Ms".split(" "),
        h = function(a) {
            var b = d.documentElement.style,
                c;
            if (typeof b[a] == "string") return a;
            a = f(a);
            for (var e = 0, h = g.length; e < h; e++) {
                c = g[e] + a;
                if (typeof b[c] == "string") return c
            }
        }, i = h("transform"),
        j = h("transitionProperty"),
        k = {
            csstransforms: function() {
                return !!i
            },
            csstransforms3d: function() {
                var a = !! h("perspective");
                if (a) {
                    var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                        d = "@media (" + c.join("transform-3d),(") + "modernizr)",
                        e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>")
                            .appendTo("head"),
                        f = b('<div id="modernizr" />')
                            .appendTo("html");
                    a = f.height() === 3, f.remove(), e.remove()
                }
                return a
            },
            csstransitions: function() {
                return !!j
            }
        }, l;
    if (e) for (l in k) e.hasOwnProperty(l) || e.addTest(l, k[l]);
    else {
        e = a.Modernizr = {
            _version: "1.6ish: miniModernizr for Isotope"
        };
        var m = " ",
            n;
        for (l in k) n = k[l](), e[l] = n, m += " " + (n ? "" : "no-") + l;
        b("html")
            .addClass(m)
    }
    if (e.csstransforms) {
        var o = e.csstransforms3d ? {
            translate: function(a) {
                return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) "
            },
            scale: function(a) {
                return "scale3d(" + a + ", " + a + ", 1) "
            }
        } : {
            translate: function(a) {
                return "translate(" + a[0] + "px, " + a[1] + "px) "
            },
            scale: function(a) {
                return "scale(" + a + ") "
            }
        }, p = function(a, c, d) {
            var e = b.data(a, "isoTransform") || {}, f = {}, g, h = {}, j;
            f[c] = d, b.extend(e, f);
            for (g in e) j = e[g], h[g] = o[g](j);
            var k = h.translate || "",
                l = h.scale || "",
                m = k + l;
            b.data(a, "isoTransform", e), a.style[i] = m
        };
        b.cssNumber.scale = !0, b.cssHooks.scale = {
            set: function(a, b) {
                p(a, "scale", b)
            },
            get: function(a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.scale ? d.scale : 1
            }
        }, b.fx.step.scale = function(a) {
            b.cssHooks.scale.set(a.elem, a.now + a.unit)
        }, b.cssNumber.translate = !0, b.cssHooks.translate = {
            set: function(a, b) {
                p(a, "translate", b)
            },
            get: function(a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.translate ? d.translate : [0, 0]
            }
        }
    }
    var q, r;
    e.csstransitions && (q = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd",
        transitionProperty: "transitionEnd"
    }[j], r = h("transitionDuration"));
    var s = b.event,
        t;
    s.special.smartresize = {
        setup: function() {
            b(this)
                .bind("resize", s.special.smartresize.handler)
        },
        teardown: function() {
            b(this)
                .unbind("resize", s.special.smartresize.handler)
        },
        handler: function(a, b) {
            var c = this,
                d = arguments;
            a.type = "smartresize", t && clearTimeout(t), t = setTimeout(function() {
                jQuery.event.handle.apply(c, d)
            }, b === "execAsap" ? 0 : 100)
        }
    }, b.fn.smartresize = function(a) {
        return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
    }, b.Isotope = function(a, c, d) {
        this.element = b(c), this._create(a), this._init(d)
    };
    var u = ["width", "height"],
        v = b(a);
    b.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {
            opacity: 0,
            scale: .001
        },
        visibleStyle: {
            opacity: 1,
            scale: 1
        },
        containerStyle: {
            position: "relative",
            overflow: "hidden"
        },
        animationEngine: "best-available",
        animationOptions: {
            queue: !1,
            duration: 800
        },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !b.browser.opera,
        itemPositionDataEnabled: !1
    }, b.Isotope.prototype = {
        _create: function(a) {
            this.options = b.extend({}, b.Isotope.settings, a), this.styleQueue = [], this.elemCount = 0;
            var c = this.element[0].style;
            this.originalStyle = {};
            var d = u.slice(0);
            for (var e in this.options.containerStyle) d.push(e);
            for (var f = 0, g = d.length; f < g; f++) e = d[f], this.originalStyle[e] = c[e] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms();
            var h = {
                "original-order": function(a, b) {
                    b.elemCount++;
                    return b.elemCount
                },
                random: function() {
                    return Math.random()
                }
            };
            this.options.getSortData = b.extend(this.options.getSortData, h), this.reloadItems(), this.offset = {
                left: parseInt(this.element.css("padding-left") || 0, 10),
                top: parseInt(this.element.css("padding-top") || 0, 10)
            };
            var i = this;
            setTimeout(function() {
                i.element.addClass(i.options.containerClass)
            }, 0), this.options.resizable && v.bind("smartresize.isotope", function() {
                i.resize()
            }), this.element.delegate("." + this.options.hiddenClass, "click", function() {
                return !1
            })
        },
        _getAtoms: function(a) {
            var b = this.options.itemSelector,
                c = b ? a.filter(b)
                    .add(a.find(b)) : a,
                d = {
                    position: "absolute"
                };
            this.usingTransforms && (d.left = 0, d.top = 0), c.css(d)
                .addClass(this.options.itemClass), this.updateSortData(c, !0);
            return c
        },
        _init: function(a) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(a)
        },
        option: function(a) {
            if (b.isPlainObject(a)) {
                this.options = b.extend(!0, this.options, a);
                var c;
                for (var d in a) c = "_update" + f(d), this[c] && this[c]()
            }
        },
        _updateAnimationEngine: function() {
            var a = this.options.animationEngine.toLowerCase()
                .replace(/[ _\-]/g, ""),
                b;
            switch (a) {
            case "css":
            case "none":
                b = !1;
                break;
            case "jquery":
                b = !0;
                break;
            default:
                b = !e.csstransitions
            }
            this.isUsingJQueryAnimation = b, this._updateUsingTransforms()
        },
        _updateTransformsEnabled: function() {
            this._updateUsingTransforms()
        },
        _updateUsingTransforms: function() {
            var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation;
            a || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = a ? this._translate : this._positionAbs
        },
        _filter: function(a) {
            var b = this.options.filter === "" ? "*" : this.options.filter;
            if (!b) return a;
            var c = this.options.hiddenClass,
                d = "." + c,
                e = a.filter(d),
                f = e;
            if (b !== "*") {
                f = e.filter(b);
                var g = a.not(d)
                    .not(b)
                    .addClass(c);
                this.styleQueue.push({
                    $el: g,
                    style: this.options.hiddenStyle
                })
            }
            this.styleQueue.push({
                $el: f,
                style: this.options.visibleStyle
            }), f.removeClass(c);
            return a.filter(b)
        },
        updateSortData: function(a, c) {
            var d = this,
                e = this.options.getSortData,
                f, g;
            a.each(function() {
                f = b(this), g = {};
                for (var a in e)!c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d);
                b.data(this, "isotope-sort-data", g)
            })
        },
        _sort: function() {
            var a = this.options.sortBy,
                b = this._getSorter,
                c = this.options.sortAscending ? 1 : -1,
                d = function(d, e) {
                    var f = b(d, a),
                        g = b(e, a);
                    f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order"));
                    return (f > g ? 1 : f < g ? -1 : 0) * c
                };
            this.$filteredAtoms.sort(d)
        },
        _getSorter: function(a, c) {
            return b.data(a, "isotope-sort-data")[c]
        },
        _translate: function(a, b) {
            return {
                translate: [a, b]
            }
        },
        _positionAbs: function(a, b) {
            return {
                left: a,
                top: b
            }
        },
        _pushPosition: function(a, b, c) {
            b = Math.round(b + this.offset.left), c = Math.round(c + this.offset.top);
            var d = this.getPositionStyles(b, c);
            this.styleQueue.push({
                $el: a,
                style: d
            }), this.options.itemPositionDataEnabled && a.data("isotope-item-position", {
                x: b,
                y: c
            })
        },
        layout: function(a, b) {
            var c = this.options.layoutMode;
            this["_" + c + "Layout"](a);
            if (this.options.resizesContainer) {
                var d = this["_" + c + "GetContainerSize"]();
                this.styleQueue.push({
                    $el: this.element,
                    style: d
                })
            }
            this._processStyleQueue(a, b), this.isLaidOut = !0
        },
        _processStyleQueue: function(a, c) {
            var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css",
                f = this.options.animationOptions,
                g = this.options.onLayout,
                h, i, j, k;
            i = function(a, b) {
                b.$el[d](b.style, f)
            };
            if (this._isInserting && this.isUsingJQueryAnimation) i = function(a, b) {
                h = b.$el.hasClass("no-transition") ? "css" : d, b.$el[h](b.style, f)
            };
            else if (c || g || f.complete) {
                var l = !1,
                    m = [c, g, f.complete],
                    n = this;
                j = !0, k = function() {
                    if (!l) {
                        var b;
                        for (var c = 0, d = m.length; c < d; c++) b = m[c], typeof b == "function" && b.call(n.element, a, n);
                        l = !0
                    }
                };
                if (this.isUsingJQueryAnimation && d === "animate") f.complete = k, j = !1;
                else if (e.csstransitions) {
                    var o = 0,
                        p = this.styleQueue[0],
                        s = p && p.$el,
                        t;
                    while (!s || !s.length) {
                        t = this.styleQueue[o++];
                        if (!t) return;
                        s = t.$el
                    }
                    var u = parseFloat(getComputedStyle(s[0])[r]);
                    u > 0 && (i = function(a, b) {
                        b.$el[d](b.style, f)
                            .one(q, k)
                    }, j = !1)
                }
            }
            b.each(this.styleQueue, i), j && k(), this.styleQueue = []
        },
        resize: function() {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        },
        reLayout: function(a) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, a)
        },
        addItems: function(a, b) {
            var c = this._getAtoms(a);
            this.$allAtoms = this.$allAtoms.add(c), b && b(c)
        },
        insert: function(a, b) {
            this.element.append(a);
            var c = this;
            this.addItems(a, function(a) {
                var d = c._filter(a);
                c._addHideAppended(d), c._sort(), c.reLayout(), c._revealAppended(d, b)
            })
        },
        appended: function(a, b) {
            var c = this;
            this.addItems(a, function(a) {
                c._addHideAppended(a), c.layout(a), c._revealAppended(a, b)
            })
        },
        _addHideAppended: function(a) {
            this.$filteredAtoms = this.$filteredAtoms.add(a), a.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({
                $el: a,
                style: this.options.hiddenStyle
            })
        },
        _revealAppended: function(a, b) {
            var c = this;
            setTimeout(function() {
                a.removeClass("no-transition"), c.styleQueue.push({
                    $el: a,
                    style: c.options.visibleStyle
                }), c._isInserting = !1, c._processStyleQueue(a, b)
            }, 10)
        },
        reloadItems: function() {
            this.$allAtoms = this._getAtoms(this.element.children())
        },
        remove: function(a, b) {
            var c = this,
                d = function() {
                    c.$allAtoms = c.$allAtoms.not(a), a.remove(), b && b.call(this.element)
                };
            a.filter(":not(." + this.options.hiddenClass + ")")
                .length ? (this.styleQueue.push({
                $el: a,
                style: this.options.hiddenStyle
            }), this.$filteredAtoms = this.$filteredAtoms.not(a), this._sort(), this.reLayout(d)) : d()
        },
        shuffle: function(a) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(a)
        },
        destroy: function() {
            var a = this.usingTransforms,
                b = this.options;
            this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass)
                .each(function() {
                var b = this.style;
                b.position = "", b.top = "", b.left = "", b.opacity = "", a && (b[i] = "")
            });
            var c = this.element[0].style;
            for (var d in this.originalStyle) c[d] = this.originalStyle[d];
            this.element.unbind(".isotope")
                .undelegate("." + b.hiddenClass, "click")
                .removeClass(b.containerClass)
                .removeData("isotope"), v.unbind(".isotope")
        },
        _getSegments: function(a) {
            var b = this.options.layoutMode,
                c = a ? "rowHeight" : "columnWidth",
                d = a ? "height" : "width",
                e = a ? "rows" : "cols",
                g = this.element[d](),
                h, i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g;
            h = Math.floor(g / i), h = Math.max(h, 1), this[b][e] = h, this[b][c] = i
        },
        _checkIfSegmentsChanged: function(a) {
            var b = this.options.layoutMode,
                c = a ? "rows" : "cols",
                d = this[b][c];
            this._getSegments(a);
            return this[b][c] !== d
        },
        _masonryReset: function() {
            this.masonry = {}, this._getSegments();
            var a = this.masonry.cols;
            this.masonry.colYs = [];
            while (a--) this.masonry.colYs.push(0)
        },
        _masonryLayout: function(a) {
            var c = this,
                d = c.masonry;
            a.each(function() {
                var a = b(this),
                    e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
                e = Math.min(e, d.cols);
                if (e === 1) c._masonryPlaceBrick(a, d.colYs);
                else {
                    var f = d.cols + 1 - e,
                        g = [],
                        h, i;
                    for (i = 0; i < f; i++) h = d.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryPlaceBrick(a, g)
                }
            })
        },
        _masonryPlaceBrick: function(a, b) {
            var c = Math.min.apply(Math, b),
                d = 0;
            for (var e = 0, f = b.length; e < f; e++) if (b[e] === c) {
                d = e;
                break
            }
            var g = this.masonry.columnWidth * d,
                h = c;
            this._pushPosition(a, g, h);
            var i = c + a.outerHeight(!0),
                j = this.masonry.cols + 1 - f;
            for (e = 0; e < j; e++) this.masonry.colYs[d + e] = i
        },
        _masonryGetContainerSize: function() {
            var a = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: a
            }
        },
        _masonryResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _fitRowsReset: function() {
            this.fitRows = {
                x: 0,
                y: 0,
                height: 0
            }
        },
        _fitRowsLayout: function(a) {
            var c = this,
                d = this.element.width(),
                e = this.fitRows;
            a.each(function() {
                var a = b(this),
                    f = a.outerWidth(!0),
                    g = a.outerHeight(!0);
                e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height), c._pushPosition(a, e.x, e.y), e.height = Math.max(e.y + g, e.height), e.x += f
            })
        },
        _fitRowsGetContainerSize: function() {
            return {
                height: this.fitRows.height
            }
        },
        _fitRowsResizeChanged: function() {
            return !0
        },
        _cellsByRowReset: function() {
            this.cellsByRow = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByRowLayout: function(a) {
            var c = this,
                d = this.cellsByRow;
            a.each(function() {
                var a = b(this),
                    e = d.index % d.cols,
                    f = Math.floor(d.index / d.cols),
                    g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2,
                    h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++
            })
        },
        _cellsByRowGetContainerSize: function() {
            return {
                height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
            }
        },
        _cellsByRowResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _straightDownReset: function() {
            this.straightDown = {
                y: 0
            }
        },
        _straightDownLayout: function(a) {
            var c = this;
            a.each(function(a) {
                var d = b(this);
                c._pushPosition(d, 0, c.straightDown.y), c.straightDown.y += d.outerHeight(!0)
            })
        },
        _straightDownGetContainerSize: function() {
            return {
                height: this.straightDown.y
            }
        },
        _straightDownResizeChanged: function() {
            return !0
        },
        _masonryHorizontalReset: function() {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var a = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = [];
            while (a--) this.masonryHorizontal.rowXs.push(0)
        },
        _masonryHorizontalLayout: function(a) {
            var c = this,
                d = c.masonryHorizontal;
            a.each(function() {
                var a = b(this),
                    e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
                e = Math.min(e, d.rows);
                if (e === 1) c._masonryHorizontalPlaceBrick(a, d.rowXs);
                else {
                    var f = d.rows + 1 - e,
                        g = [],
                        h, i;
                    for (i = 0; i < f; i++) h = d.rowXs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryHorizontalPlaceBrick(a, g)
                }
            })
        },
        _masonryHorizontalPlaceBrick: function(a, b) {
            var c = Math.min.apply(Math, b),
                d = 0;
            for (var e = 0, f = b.length; e < f; e++) if (b[e] === c) {
                d = e;
                break
            }
            var g = c,
                h = this.masonryHorizontal.rowHeight * d;
            this._pushPosition(a, g, h);
            var i = c + a.outerWidth(!0),
                j = this.masonryHorizontal.rows + 1 - f;
            for (e = 0; e < j; e++) this.masonryHorizontal.rowXs[d + e] = i
        },
        _masonryHorizontalGetContainerSize: function() {
            var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: a
            }
        },
        _masonryHorizontalResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _fitColumnsReset: function() {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            }
        },
        _fitColumnsLayout: function(a) {
            var c = this,
                d = this.element.height(),
                e = this.fitColumns;
            a.each(function() {
                var a = b(this),
                    f = a.outerWidth(!0),
                    g = a.outerHeight(!0);
                e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0), c._pushPosition(a, e.x, e.y), e.width = Math.max(e.x + f, e.width), e.y += g
            })
        },
        _fitColumnsGetContainerSize: function() {
            return {
                width: this.fitColumns.width
            }
        },
        _fitColumnsResizeChanged: function() {
            return !0
        },
        _cellsByColumnReset: function() {
            this.cellsByColumn = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByColumnLayout: function(a) {
            var c = this,
                d = this.cellsByColumn;
            a.each(function() {
                var a = b(this),
                    e = Math.floor(d.index / d.rows),
                    f = d.index % d.rows,
                    g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2,
                    h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++
            })
        },
        _cellsByColumnGetContainerSize: function() {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            }
        },
        _cellsByColumnResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _straightAcrossReset: function() {
            this.straightAcross = {
                x: 0
            }
        },
        _straightAcrossLayout: function(a) {
            var c = this;
            a.each(function(a) {
                var d = b(this);
                c._pushPosition(d, c.straightAcross.x, 0), c.straightAcross.x += d.outerWidth(!0)
            })
        },
        _straightAcrossGetContainerSize: function() {
            return {
                width: this.straightAcross.x
            }
        },
        _straightAcrossResizeChanged: function() {
            return !0
        }
    }, b.fn.imagesLoaded = function(a) {
        function i(a) {
            var c = a.target;
            c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)))
        }
        function h() {
            a.call(c, d)
        }
        var c = this,
            d = c.find("img")
                .add(c.filter("img")),
            e = d.length,
            f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            g = [];
        e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i)
            .each(function() {
            var a = this.src;
            this.src = f, this.src = a
        });
        return c
    };
    var w = function(b) {
        a.console && a.console.error(b)
    };
    b.fn.isotope = function(a, c) {
        if (typeof a == "string") {
            var d = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var c = b.data(this, "isotope");
                if (!c) w("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'");
                else {
                    if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
                        w("no such method '" + a + "' for isotope instance");
                        return
                    }
                    c[a].apply(c, d)
                }
            })
        } else this.each(function() {
            var d = b.data(this, "isotope");
            d ? (d.option(a), d._init(c)) : b.data(this, "isotope", new b.Isotope(a, this, c))
        });
        return this
    }
})(window, jQuery);
(function() {
    var e = this,
        t = e._,
        n = {}, r = Array.prototype,
        i = Object.prototype,
        s = Function.prototype,
        o = r.push,
        u = r.slice,
        a = r.concat,
        f = r.unshift,
        l = i.toString,
        c = i.hasOwnProperty,
        h = r.forEach,
        p = r.map,
        d = r.reduce,
        v = r.reduceRight,
        m = r.filter,
        g = r.every,
        y = r.some,
        b = r.indexOf,
        w = r.lastIndexOf,
        E = Array.isArray,
        S = Object.keys,
        x = s.bind,
        T = function(e) {
            if (e instanceof T) return e;
            if (!(this instanceof T)) return new T(e);
            this._wrapped = e
        };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = T), exports._ = T) : e._ = T, T.VERSION = "1.4.2";
    var N = T.each = T.forEach = function(e, t, r) {
        if (e == null) return;
        if (h && e.forEach === h) e.forEach(t, r);
        else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++) if (t.call(r, e[i], i, e) === n) return
        } else for (var o in e) if (T.has(e, o) && t.call(r, e[o], o, e) === n) return
    };
    T.map = T.collect = function(e, t, n) {
        var r = [];
        return e == null ? r : p && e.map === p ? e.map(t, n) : (N(e, function(e, i, s) {
            r[r.length] = t.call(n, e, i, s)
        }), r)
    }, T.reduce = T.foldl = T.inject = function(e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (d && e.reduce === d) return r && (t = T.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        N(e, function(e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
        });
        if (!i) throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, T.reduceRight = T.foldr = function(e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (v && e.reduceRight === v) return r && (t = T.bind(t, r)), arguments.length > 2 ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var o = T.keys(e);
            s = o.length
        }
        N(e, function(u, a, f) {
            a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
        });
        if (!i) throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, T.find = T.detect = function(e, t, n) {
        var r;
        return C(e, function(e, i, s) {
            if (t.call(n, e, i, s)) return r = e, !0
        }), r
    }, T.filter = T.select = function(e, t, n) {
        var r = [];
        return e == null ? r : m && e.filter === m ? e.filter(t, n) : (N(e, function(e, i, s) {
            t.call(n, e, i, s) && (r[r.length] = e)
        }), r)
    }, T.reject = function(e, t, n) {
        var r = [];
        return e == null ? r : (N(e, function(e, i, s) {
            t.call(n, e, i, s) || (r[r.length] = e)
        }), r)
    }, T.every = T.all = function(e, t, r) {
        t || (t = T.identity);
        var i = !0;
        return e == null ? i : g && e.every === g ? e.every(t, r) : (N(e, function(e, s, o) {
            if (!(i = i && t.call(r, e, s, o))) return n
        }), !! i)
    };
    var C = T.some = T.any = function(e, t, r) {
        t || (t = T.identity);
        var i = !1;
        return e == null ? i : y && e.some === y ? e.some(t, r) : (N(e, function(e, s, o) {
            if (i || (i = t.call(r, e, s, o))) return n
        }), !! i)
    };
    T.contains = T.include = function(e, t) {
        var n = !1;
        return e == null ? n : b && e.indexOf === b ? e.indexOf(t) != -1 : (n = C(e, function(e) {
            return e === t
        }), n)
    }, T.invoke = function(e, t) {
        var n = u.call(arguments, 2);
        return T.map(e, function(e) {
            return (T.isFunction(t) ? t : e[t])
                .apply(e, n)
        })
    }, T.pluck = function(e, t) {
        return T.map(e, function(e) {
            return e[t]
        })
    }, T.where = function(e, t) {
        return T.isEmpty(t) ? [] : T.filter(e, function(e) {
            for (var n in t) if (t[n] !== e[n]) return !1;
            return !0
        })
    }, T.max = function(e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
        if (!t && T.isEmpty(e)) return -Infinity;
        var r = {
            computed: -Infinity
        };
        return N(e, function(e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o >= r.computed && (r = {
                value: e,
                computed: o
            })
        }), r.value
    }, T.min = function(e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
        if (!t && T.isEmpty(e)) return Infinity;
        var r = {
            computed: Infinity
        };
        return N(e, function(e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = {
                value: e,
                computed: o
            })
        }), r.value
    }, T.shuffle = function(e) {
        var t, n = 0,
            r = [];
        return N(e, function(e) {
            t = T.random(n++), r[n - 1] = r[t], r[t] = e
        }), r
    };
    var k = function(e) {
        return T.isFunction(e) ? e : function(t) {
            return t[e]
        }
    };
    T.sortBy = function(e, t, n) {
        var r = k(t);
        return T.pluck(T.map(e, function(e, t, i) {
            return {
                value: e,
                index: t,
                criteria: r.call(n, e, t, i)
            }
        })
            .sort(function(e, t) {
            var n = e.criteria,
                r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0) return 1;
                if (n < r || r === void 0) return -1
            }
            return e.index < t.index ? -1 : 1
        }), "value")
    };
    var L = function(e, t, n, r) {
        var i = {}, s = k(t);
        return N(e, function(t, o) {
            var u = s.call(n, t, o, e);
            r(i, u, t)
        }), i
    };
    T.groupBy = function(e, t, n) {
        return L(e, t, n, function(e, t, n) {
            (T.has(e, t) ? e[t] : e[t] = [])
                .push(n)
        })
    }, T.countBy = function(e, t, n) {
        return L(e, t, n, function(e, t, n) {
            T.has(e, t) || (e[t] = 0), e[t]++
        })
    }, T.sortedIndex = function(e, t, n, r) {
        n = n == null ? T.identity : k(n);
        var i = n.call(r, t),
            s = 0,
            o = e.length;
        while (s < o) {
            var u = s + o >>> 1;
            n.call(r, e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }, T.toArray = function(e) {
        return e ? e.length === +e.length ? u.call(e) : T.values(e) : []
    }, T.size = function(e) {
        return e.length === +e.length ? e.length : T.keys(e)
            .length
    }, T.first = T.head = T.take = function(e, t, n) {
        return t != null && !n ? u.call(e, 0, t) : e[0]
    }, T.initial = function(e, t, n) {
        return u.call(e, 0, e.length - (t == null || n ? 1 : t))
    }, T.last = function(e, t, n) {
        return t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
    }, T.rest = T.tail = T.drop = function(e, t, n) {
        return u.call(e, t == null || n ? 1 : t)
    }, T.compact = function(e) {
        return T.filter(e, function(e) {
            return !!e
        })
    };
    var A = function(e, t, n) {
        return N(e, function(e) {
            T.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
        }), n
    };
    T.flatten = function(e, t) {
        return A(e, t, [])
    }, T.without = function(e) {
        return T.difference(e, u.call(arguments, 1))
    }, T.uniq = T.unique = function(e, t, n, r) {
        var i = n ? T.map(e, n, r) : e,
            s = [],
            o = [];
        return N(i, function(n, r) {
            if (t ? !r || o[o.length - 1] !== n : !T.contains(o, n)) o.push(n), s.push(e[r])
        }), s
    }, T.union = function() {
        return T.uniq(a.apply(r, arguments))
    }, T.intersection = function(e) {
        var t = u.call(arguments, 1);
        return T.filter(T.uniq(e), function(e) {
            return T.every(t, function(t) {
                return T.indexOf(t, e) >= 0
            })
        })
    }, T.difference = function(e) {
        var t = a.apply(r, u.call(arguments, 1));
        return T.filter(e, function(e) {
            return !T.contains(t, e)
        })
    }, T.zip = function() {
        var e = u.call(arguments),
            t = T.max(T.pluck(e, "length")),
            n = new Array(t);
        for (var r = 0; r < t; r++) n[r] = T.pluck(e, "" + r);
        return n
    }, T.object = function(e, t) {
        var n = {};
        for (var r = 0, i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, T.indexOf = function(e, t, n) {
        if (e == null) return -1;
        var r = 0,
            i = e.length;
        if (n) {
            if (typeof n != "number") return r = T.sortedIndex(e, t), e[r] === t ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if (b && e.indexOf === b) return e.indexOf(t, n);
        for (; r < i; r++) if (e[r] === t) return r;
        return -1
    }, T.lastIndexOf = function(e, t, n) {
        if (e == null) return -1;
        var r = n != null;
        if (w && e.lastIndexOf === w) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        var i = r ? n : e.length;
        while (i--) if (e[i] === t) return i;
        return -1
    }, T.range = function(e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0),
            i = 0,
            s = new Array(r);
        while (i < r) s[i++] = e, e += n;
        return s
    };
    var O = function() {};
    T.bind = function(t, n) {
        var r, i;
        if (t.bind === x && x) return x.apply(t, u.call(arguments, 1));
        if (!T.isFunction(t)) throw new TypeError;
        return i = u.call(arguments, 2), r = function() {
            if (this instanceof r) {
                O.prototype = t.prototype;
                var e = new O,
                    s = t.apply(e, i.concat(u.call(arguments)));
                return Object(s) === s ? s : e
            }
            return t.apply(n, i.concat(u.call(arguments)))
        }
    }, T.bindAll = function(e) {
        var t = u.call(arguments, 1);
        return t.length == 0 && (t = T.functions(e)), N(t, function(t) {
            e[t] = T.bind(e[t], e)
        }), e
    }, T.memoize = function(e, t) {
        var n = {};
        return t || (t = T.identity),
        function() {
            var r = t.apply(this, arguments);
            return T.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }, T.delay = function(e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, n)
        }, t)
    }, T.defer = function(e) {
        return T.delay.apply(T, [e, 1].concat(u.call(arguments, 1)))
    }, T.throttle = function(e, t) {
        var n, r, i, s, o, u, a = T.debounce(function() {
            o = s = !1
        }, t);
        return function() {
            n = this, r = arguments;
            var f = function() {
                i = null, o && (u = e.apply(n, r)), a()
            };
            return i || (i = setTimeout(f, t)), s ? o = !0 : (s = !0, u = e.apply(n, r)), a(), u
        }
    }, T.debounce = function(e, t, n) {
        var r, i;
        return function() {
            var s = this,
                o = arguments,
                u = function() {
                    r = null, n || (i = e.apply(s, o))
                }, a = n && !r;
            return clearTimeout(r), r = setTimeout(u, t), a && (i = e.apply(s, o)), i
        }
    }, T.once = function(e) {
        var t = !1,
            n;
        return function() {
            return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
        }
    }, T.wrap = function(e, t) {
        return function() {
            var n = [e];
            return o.apply(n, arguments), t.apply(this, n)
        }
    }, T.compose = function() {
        var e = arguments;
        return function() {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
            return t[0]
        }
    }, T.after = function(e, t) {
        return e <= 0 ? t() : function() {
            if (--e < 1) return t.apply(this, arguments)
        }
    }, T.keys = S || function(e) {
        if (e !== Object(e)) throw new TypeError("Invalid object");
        var t = [];
        for (var n in e) T.has(e, n) && (t[t.length] = n);
        return t
    }, T.values = function(e) {
        var t = [];
        for (var n in e) T.has(e, n) && t.push(e[n]);
        return t
    }, T.pairs = function(e) {
        var t = [];
        for (var n in e) T.has(e, n) && t.push([n, e[n]]);
        return t
    }, T.invert = function(e) {
        var t = {};
        for (var n in e) T.has(e, n) && (t[e[n]] = n);
        return t
    }, T.functions = T.methods = function(e) {
        var t = [];
        for (var n in e) T.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, T.extend = function(e) {
        return N(u.call(arguments, 1), function(t) {
            for (var n in t) e[n] = t[n]
        }), e
    }, T.pick = function(e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        return N(n, function(n) {
            n in e && (t[n] = e[n])
        }), t
    }, T.omit = function(e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        for (var i in e) T.contains(n, i) || (t[i] = e[i]);
        return t
    }, T.defaults = function(e) {
        return N(u.call(arguments, 1), function(t) {
            for (var n in t) e[n] == null && (e[n] = t[n])
        }), e
    }, T.clone = function(e) {
        return T.isObject(e) ? T.isArray(e) ? e.slice() : T.extend({}, e) : e
    }, T.tap = function(e, t) {
        return t(e), e
    };
    var M = function(e, t, n, r) {
        if (e === t) return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null) return e === t;
        e instanceof T && (e = e._wrapped), t instanceof T && (t = t._wrapped);
        var i = l.call(e);
        if (i != l.call(t)) return !1;
        switch (i) {
        case "[object String]":
            return e == String(t);
        case "[object Number]":
            return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
        case "[object Date]":
        case "[object Boolean]":
            return +e == +t;
        case "[object RegExp]":
            return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object") return !1;
        var s = n.length;
        while (s--) if (n[s] == e) return r[s] == t;
        n.push(e), r.push(t);
        var o = 0,
            u = !0;
        if (i == "[object Array]") {
            o = e.length, u = o == t.length;
            if (u) while (o--) if (!(u = M(e[o], t[o], n, r))) break
        } else {
            var a = e.constructor,
                f = t.constructor;
            if (a !== f && !(T.isFunction(a) && a instanceof a && T.isFunction(f) && f instanceof f)) return !1;
            for (var c in e) if (T.has(e, c)) {
                o++;
                if (!(u = T.has(t, c) && M(e[c], t[c], n, r))) break
            }
            if (u) {
                for (c in t) if (T.has(t, c) && !o--) break;
                u = !o
            }
        }
        return n.pop(), r.pop(), u
    };
    T.isEqual = function(e, t) {
        return M(e, t, [], [])
    }, T.isEmpty = function(e) {
        if (e == null) return !0;
        if (T.isArray(e) || T.isString(e)) return e.length === 0;
        for (var t in e) if (T.has(e, t)) return !1;
        return !0
    }, T.isElement = function(e) {
        return !!e && e.nodeType === 1
    }, T.isArray = E || function(e) {
        return l.call(e) == "[object Array]"
    }, T.isObject = function(e) {
        return e === Object(e)
    }, N(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
        T["is" + e] = function(t) {
            return l.call(t) == "[object " + e + "]"
        }
    }), T.isArguments(arguments) || (T.isArguments = function(e) {
        return !!e && !! T.has(e, "callee")
    }), typeof / . / != "function" && (T.isFunction = function(e) {
        return typeof e == "function"
    }), T.isFinite = function(e) {
        return T.isNumber(e) && isFinite(e)
    }, T.isNaN = function(e) {
        return T.isNumber(e) && e != +e
    }, T.isBoolean = function(e) {
        return e === !0 || e === !1 || l.call(e) == "[object Boolean]"
    }, T.isNull = function(e) {
        return e === null
    }, T.isUndefined = function(e) {
        return e === void 0
    }, T.has = function(e, t) {
        return c.call(e, t)
    }, T.noConflict = function() {
        return e._ = t, this
    }, T.identity = function(e) {
        return e
    }, T.times = function(e, t, n) {
        for (var r = 0; r < e; r++) t.call(n, r)
    }, T.random = function(e, t) {
        return t == null && (t = e, e = 0), e + (0 | Math.random() * (t - e + 1))
    };
    var _ = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    _.unescape = T.invert(_.escape);
    var D = {
        escape: new RegExp("[" + T.keys(_.escape)
            .join("") + "]", "g"),
        unescape: new RegExp("(" + T.keys(_.unescape)
            .join("|") + ")", "g")
    };
    T.each(["escape", "unescape"], function(e) {
        T[e] = function(t) {
            return t == null ? "" : ("" + t)
                .replace(D[e], function(t) {
                return _[e][t]
            })
        }
    }), T.result = function(e, t) {
        if (e == null) return null;
        var n = e[t];
        return T.isFunction(n) ? n.call(e) : n
    }, T.mixin = function(e) {
        N(T.functions(e), function(t) {
            var n = T[t] = e[t];
            T.prototype[t] = function() {
                var e = [this._wrapped];
                return o.apply(e, arguments), F.call(this, n.apply(T, e))
            }
        })
    };
    var P = 0;
    T.uniqueId = function(e) {
        var t = P++;
        return e ? e + t : t
    }, T.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var H = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    T.template = function(e, t, n) {
        n = T.defaults({}, n, T.templateSettings);
        var r = new RegExp([(n.escape || H)
            .source, (n.interpolate || H)
            .source, (n.evaluate || H)
            .source].join("|") + "|$", "g"),
            i = 0,
            s = "__p+='";
        e.replace(r, function(t, n, r, o, u) {
            s += e.slice(i, u)
                .replace(j, function(e) {
                return "\\" + B[e]
            }), s += n ? "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o ? "';\n" + o + "\n__p+='" : "", i = u + t.length
        }), s += "';\n", n.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
        try {
            var o = new Function(n.variable || "obj", "_", s)
        } catch (u) {
            throw u.source = s, u
        }
        if (t) return o(t, T);
        var a = function(e) {
            return o.call(this, e, T)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + s + "}", a
    }, T.chain = function(e) {
        return T(e)
            .chain()
    };
    var F = function(e) {
        return this._chain ? T(e)
            .chain() : e
    };
    T.mixin(T), N(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = r[e];
        T.prototype[e] = function() {
            var n = this._wrapped;
            return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], F.call(this, n)
        }
    }), N(["concat", "join", "slice"], function(e) {
        var t = r[e];
        T.prototype[e] = function() {
            return F.call(this, t.apply(this._wrapped, arguments))
        }
    }), T.extend(T.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    })
})
    .call(this);
(function() {
    var l = this,
        y = l.Backbone,
        z = Array.prototype.slice,
        A = Array.prototype.splice,
        g;
    g = "undefined" !== typeof exports ? exports : l.Backbone = {};
    g.VERSION = "0.9.2";
    var f = l._;
    !f && "undefined" !== typeof require && (f = require("underscore"));
    var i = l.jQuery || l.Zepto || l.ender;
    g.setDomLibrary = function(a) {
        i = a
    };
    g.noConflict = function() {
        l.Backbone = y;
        return this
    };
    g.emulateHTTP = !1;
    g.emulateJSON = !1;
    var p = /\s+/,
        k = g.Events = {
            on: function(a, b, c) {
                var d, e, f, g, j;
                if (!b) return this;
                a = a.split(p);
                for (d = this._callbacks || (this._callbacks = {}); e = a.shift();) f = (j = d[e]) ? j.tail : {}, f.next = g = {}, f.context = c, f.callback = b, d[e] = {
                    tail: g,
                    next: j ? j.next : f
                };
                return this
            },
            off: function(a, b, c) {
                var d, e, h, g, j, q;
                if (e = this._callbacks) {
                    if (!a && !b && !c) return delete this._callbacks, this;
                    for (a = a ? a.split(p) : f.keys(e); d = a.shift();) if (h = e[d], delete e[d], h && (b || c)) for (g = h.tail;
                    (h = h.next) !== g;) if (j = h.callback, q = h.context, b && j !== b || c && q !== c) this.on(d, j, q);
                    return this
                }
            },
            trigger: function(a) {
                var b, c, d, e, f, g;
                if (!(d = this._callbacks)) return this;
                f = d.all;
                a = a.split(p);
                for (g = z.call(arguments, 1); b = a.shift();) {
                    if (c = d[b]) for (e = c.tail;
                    (c = c.next) !== e;) c.callback.apply(c.context || this, g);
                    if (c = f) {
                        e = c.tail;
                        for (b = [b].concat(g);
                        (c = c.next) !== e;) c.callback.apply(c.context || this, b)
                    }
                }
                return this
            }
        };
    k.bind = k.on;
    k.unbind = k.off;
    var o = g.Model = function(a, b) {
        var c;
        a || (a = {});
        b && b.parse && (a = this.parse(a));
        if (c = n(this, "defaults")) a = f.extend({}, c, a);
        b && b.collection && (this.collection = b.collection);
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = f.uniqueId("c");
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this.set(a, {
            silent: !0
        });
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this._previousAttributes = f.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    f.extend(o.prototype, k, {
        changed: null,
        _silent: null,
        _pending: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return f.clone(this.attributes)
        },
        get: function(a) {
            return this.attributes[a]
        },
        escape: function(a) {
            var b;
            if (b = this._escapedAttributes[a]) return b;
            b = this.get(a);
            return this._escapedAttributes[a] = f.escape(null == b ? "" : "" + b)
        },
        has: function(a) {
            return null != this.get(a)
        },
        set: function(a, b, c) {
            var d, e;
            f.isObject(a) || null == a ? (d = a, c = b) : (d = {}, d[a] = b);
            c || (c = {});
            if (!d) return this;
            d instanceof o && (d = d.attributes);
            if (c.unset) for (e in d) d[e] = void 0;
            if (!this._validate(d, c)) return !1;
            this.idAttribute in d && (this.id = d[this.idAttribute]);
            var b = c.changes = {}, h = this.attributes,
                g = this._escapedAttributes,
                j = this._previousAttributes || {};
            for (e in d) {
                a = d[e];
                if (!f.isEqual(h[e], a) || c.unset && f.has(h, e)) delete g[e], (c.silent ? this._silent : b)[e] = !0;
                c.unset ? delete h[e] : h[e] = a;
                !f.isEqual(j[e], a) || f.has(h, e) != f.has(j, e) ? (this.changed[e] = a, c.silent || (this._pending[e] = !0)) : (delete this.changed[e], delete this._pending[e])
            }
            c.silent || this.change(c);
            return this
        },
        unset: function(a, b) {
            (b || (b = {}))
                .unset = !0;
            return this.set(a, null, b)
        },
        clear: function(a) {
            (a || (a = {}))
                .unset = !0;
            return this.set(f.clone(this.attributes), a)
        },
        fetch: function(a) {
            var a = a ? f.clone(a) : {}, b = this,
                c = a.success;
            a.success = function(d, e, f) {
                if (!b.set(b.parse(d, f), a)) return !1;
                c && c(b, d)
            };
            a.error = g.wrapError(a.error, b, a);
            return (this.sync || g.sync)
                .call(this, "read", this, a)
        },
        save: function(a, b, c) {
            var d, e;
            f.isObject(a) || null == a ? (d = a, c = b) : (d = {}, d[a] = b);
            c = c ? f.clone(c) : {};
            if (c.wait) {
                if (!this._validate(d, c)) return !1;
                e = f.clone(this.attributes)
            }
            a = f.extend({}, c, {
                silent: !0
            });
            if (d && !this.set(d, c.wait ? a : c)) return !1;
            var h = this,
                i = c.success;
            c.success = function(a, b, e) {
                b = h.parse(a, e);
                if (c.wait) {
                    delete c.wait;
                    b = f.extend(d || {}, b)
                }
                if (!h.set(b, c)) return false;
                i ? i(h, a) : h.trigger("sync", h, a, c)
            };
            c.error = g.wrapError(c.error, h, c);
            b = this.isNew() ? "create" : "update";
            b = (this.sync || g.sync)
                .call(this, b, this, c);
            c.wait && this.set(e, a);
            return b
        },
        destroy: function(a) {
            var a = a ? f.clone(a) : {}, b = this,
                c = a.success,
                d = function() {
                    b.trigger("destroy", b, b.collection, a)
                };
            if (this.isNew()) return d(), !1;
            a.success = function(e) {
                a.wait && d();
                c ? c(b, e) : b.trigger("sync", b, e, a)
            };
            a.error = g.wrapError(a.error, b, a);
            var e = (this.sync || g.sync)
                .call(this, "delete", this, a);
            a.wait || d();
            return e
        },
        url: function() {
            var a = n(this, "urlRoot") || n(this.collection, "url") || t();
            return this.isNew() ? a : a + ("/" == a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(a) {
            return a
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return null == this.id
        },
        change: function(a) {
            a || (a = {});
            var b = this._changing;
            this._changing = !0;
            for (var c in this._silent) this._pending[c] = !0;
            var d = f.extend({}, a.changes, this._silent);
            this._silent = {};
            for (c in d) this.trigger("change:" + c, this, this.get(c), a);
            if (b) return this;
            for (; !f.isEmpty(this._pending);) {
                this._pending = {};
                this.trigger("change", this, a);
                for (c in this.changed)!this._pending[c] && !this._silent[c] && delete this.changed[c];
                this._previousAttributes = f.clone(this.attributes)
            }
            this._changing = !1;
            return this
        },
        hasChanged: function(a) {
            return !arguments.length ? !f.isEmpty(this.changed) : f.has(this.changed, a)
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? f.clone(this.changed) : !1;
            var b, c = !1,
                d = this._previousAttributes,
                e;
            for (e in a) if (!f.isEqual(d[e], b = a[e]))(c || (c = {}))[e] = b;
            return c
        },
        previous: function(a) {
            return !arguments.length || !this._previousAttributes ? null : this._previousAttributes[a]
        },
        previousAttributes: function() {
            return f.clone(this._previousAttributes)
        },
        isValid: function() {
            return !this.validate(this.attributes)
        },
        _validate: function(a, b) {
            if (b.silent || !this.validate) return !0;
            var a = f.extend({}, this.attributes, a),
                c = this.validate(a, b);
            if (!c) return !0;
            b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b);
            return !1
        }
    });
    var r = g.Collection = function(a, b) {
        b || (b = {});
        b.model && (this.model = b.model);
        b.comparator && (this.comparator = b.comparator);
        this._reset();
        this.initialize.apply(this, arguments);
        a && this.reset(a, {
            silent: !0,
            parse: b.parse
        })
    };
    f.extend(r.prototype, k, {
        model: o,
        initialize: function() {},
        toJSON: function(a) {
            return this.map(function(b) {
                return b.toJSON(a)
            })
        },
        add: function(a, b) {
            var c, d, e, g, i, j = {}, k = {}, l = [];
            b || (b = {});
            a = f.isArray(a) ? a.slice() : [a];
            c = 0;
            for (d = a.length; c < d; c++) {
                if (!(e = a[c] = this._prepareModel(a[c], b))) throw Error("Can't add an invalid model to a collection");
                g = e.cid;
                i = e.id;
                j[g] || this._byCid[g] || null != i && (k[i] || this._byId[i]) ? l.push(c) : j[g] = k[i] = e
            }
            for (c = l.length; c--;) a.splice(l[c], 1);
            c = 0;
            for (d = a.length; c < d; c++)(e = a[c])
                .on("all", this._onModelEvent, this), this._byCid[e.cid] = e, null != e.id && (this._byId[e.id] = e);
            this.length += d;
            A.apply(this.models, [null != b.at ? b.at : this.models.length, 0].concat(a));
            this.comparator && this.sort({
                silent: !0
            });
            if (b.silent) return this;
            c = 0;
            for (d = this.models.length; c < d; c++) if (j[(e = this.models[c])
                .cid]) b.index = c, e.trigger("add", e, this, b);
            return this
        },
        remove: function(a, b) {
            var c, d, e, g;
            b || (b = {});
            a = f.isArray(a) ? a.slice() : [a];
            c = 0;
            for (d = a.length; c < d; c++) if (g = this.getByCid(a[c]) || this.get(a[c])) delete this._byId[g.id], delete this._byCid[g.cid], e = this.indexOf(g), this.models.splice(e, 1), this.length--, b.silent || (b.index = e, g.trigger("remove", g, this, b)), this._removeReference(g);
            return this
        },
        push: function(a, b) {
            a = this._prepareModel(a, b);
            this.add(a, b);
            return a
        },
        pop: function(a) {
            var b = this.at(this.length - 1);
            this.remove(b, a);
            return b
        },
        unshift: function(a, b) {
            a = this._prepareModel(a, b);
            this.add(a, f.extend({
                at: 0
            }, b));
            return a
        },
        shift: function(a) {
            var b = this.at(0);
            this.remove(b, a);
            return b
        },
        get: function(a) {
            return null == a ? void 0 : this._byId[null != a.id ? a.id : a]
        },
        getByCid: function(a) {
            return a && this._byCid[a.cid || a]
        },
        at: function(a) {
            return this.models[a]
        },
        where: function(a) {
            return f.isEmpty(a) ? [] : this.filter(function(b) {
                for (var c in a) if (a[c] !== b.get(c)) return !1;
                return !0
            })
        },
        sort: function(a) {
            a || (a = {});
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            var b = f.bind(this.comparator, this);
            1 == this.comparator.length ? this.models = this.sortBy(b) : this.models.sort(b);
            a.silent || this.trigger("reset", this, a);
            return this
        },
        pluck: function(a) {
            return f.map(this.models, function(b) {
                return b.get(a)
            })
        },
        reset: function(a, b) {
            a || (a = []);
            b || (b = {});
            for (var c = 0, d = this.models.length; c < d; c++) this._removeReference(this.models[c]);
            this._reset();
            this.add(a, f.extend({
                silent: !0
            }, b));
            b.silent || this.trigger("reset", this, b);
            return this
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {};
            void 0 === a.parse && (a.parse = !0);
            var b = this,
                c = a.success;
            a.success = function(d, e, f) {
                b[a.add ? "add" : "reset"](b.parse(d, f), a);
                c && c(b, d)
            };
            a.error = g.wrapError(a.error, b, a);
            return (this.sync || g.sync)
                .call(this, "read", this, a)
        },
        create: function(a, b) {
            var c = this,
                b = b ? f.clone(b) : {}, a = this._prepareModel(a, b);
            if (!a) return !1;
            b.wait || c.add(a, b);
            var d = b.success;
            b.success = function(e, f) {
                b.wait && c.add(e, b);
                d ? d(e, f) : e.trigger("sync", a, f, b)
            };
            a.save(null, b);
            return a
        },
        parse: function(a) {
            return a
        },
        chain: function() {
            return f(this.models)
                .chain()
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function(a, b) {
            b || (b = {});
            a instanceof o ? a.collection || (a.collection = this) : (b.collection = this, a = new this.model(a, b), a._validate(a.attributes, b) || (a = !1));
            return a
        },
        _removeReference: function(a) {
            this == a.collection && delete a.collection;
            a.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(a, b, c, d) {
            ("add" == a || "remove" == a) && c != this || ("destroy" == a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments))
        }
    });
    f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","), function(a) {
        r.prototype[a] = function() {
            return f[a].apply(f, [this.models].concat(f.toArray(arguments)))
        }
    });
    var u = g.Router = function(a) {
        a || (a = {});
        a.routes && (this.routes = a.routes);
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }, B = /:\w+/g,
        C = /\*\w+/g,
        D = /[-[\]{}()+?.,\\^$|#\s]/g;
    f.extend(u.prototype, k, {
        initialize: function() {},
        route: function(a, b, c) {
            g.history || (g.history = new m);
            f.isRegExp(a) || (a = this._routeToRegExp(a));
            c || (c = this[b]);
            g.history.route(a, f.bind(function(d) {
                d = this._extractParameters(a, d);
                c && c.apply(this, d);
                this.trigger.apply(this, ["route:" + b].concat(d));
                g.history.trigger("route", this, b, d)
            }, this));
            return this
        },
        navigate: function(a, b) {
            g.history.navigate(a, b)
        },
        _bindRoutes: function() {
            if (this.routes) {
                var a = [],
                    b;
                for (b in this.routes) a.unshift([b, this.routes[b]]);
                b = 0;
                for (var c = a.length; b < c; b++) this.route(a[b][0], a[b][1], this[a[b][1]])
            }
        },
        _routeToRegExp: function(a) {
            a = a.replace(D, "\\$&")
                .replace(B, "([^/]+)")
                .replace(C, "(.*?)");
            return RegExp("^" + a + "$")
        },
        _extractParameters: function(a, b) {
            return a.exec(b)
                .slice(1)
        }
    });
    var m = g.History = function() {
        this.handlers = [];
        f.bindAll(this, "checkUrl")
    }, s = /^[#\/]/,
        E = /msie [\w.]+/;
    m.started = !1;
    f.extend(m.prototype, k, {
        interval: 50,
        getHash: function(a) {
            return (a = (a ? a.location : window.location)
                .href.match(/#(.*)$/)) ? a[1] : ""
        },
        getFragment: function(a, b) {
            if (null == a) if (this._hasPushState || b) {
                var a = window.location.pathname,
                    c = window.location.search;
                c && (a += c)
            } else a = this.getHash();
            a.indexOf(this.options.root) || (a = a.substr(this.options.root.length));
            return a.replace(s, "")
        },
        start: function(a) {
            if (m.started) throw Error("Backbone.history has already been started");
            m.started = !0;
            this.options = f.extend({}, {
                root: "/"
            }, this.options, a);
            this._wantsHashChange = !1 !== this.options.hashChange;
            this._wantsPushState = !! this.options.pushState;
            this._hasPushState = !(!this.options.pushState || !window.history || !window.history.pushState);
            var a = this.getFragment(),
                b = document.documentMode;
            if (b = E.exec(navigator.userAgent.toLowerCase()) && (!b || 7 >= b)) this.iframe = i('<iframe src="javascript:0" tabindex="-1" />')
                .hide()
                .appendTo("body")[0].contentWindow, this.navigate(a);
            this._hasPushState ? i(window)
                .bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !b ? i(window)
                .bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval));
            this.fragment = a;
            a = window.location;
            b = a.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
            this._wantsPushState && this._hasPushState && b && a.hash && (this.fragment = this.getHash()
                .replace(s, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment));
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function() {
            i(window)
                .unbind("popstate", this.checkUrl)
                .unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            m.started = !1
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            })
        },
        checkUrl: function() {
            var a = this.getFragment();
            a == this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
            if (a == this.fragment) return !1;
            this.iframe && this.navigate(a);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(a) {
            var b = this.fragment = this.getFragment(a);
            return f.any(this.handlers, function(a) {
                if (a.route.test(b)) return a.callback(b), !0
            })
        },
        navigate: function(a, b) {
            if (!m.started) return !1;
            if (!b || !0 === b) b = {
                trigger: b
            };
            var c = (a || "")
                .replace(s, "");
            this.fragment != c && (this._hasPushState ? (0 != c.indexOf(this.options.root) && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open()
                .close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a))
        },
        _updateHash: function(a, b, c) {
            c ? a.replace(a.toString()
                .replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b
        }
    });
    var v = g.View = function(a) {
        this.cid = f.uniqueId("view");
        this._configure(a || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }, F = /^(\S+)\s*(.*)$/,
        w = "model,collection,el,id,attributes,className,tagName".split(",");
    f.extend(v.prototype, k, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            return this
        },
        make: function(a, b, c) {
            a = document.createElement(a);
            b && i(a)
                .attr(b);
            c && i(a)
                .html(c);
            return a
        },
        setElement: function(a, b) {
            this.$el && this.undelegateEvents();
            this.$el = a instanceof i ? a : i(a);
            this.el = this.$el[0];
            !1 !== b && this.delegateEvents();
            return this
        },
        delegateEvents: function(a) {
            if (a || (a = n(this, "events"))) {
                this.undelegateEvents();
                for (var b in a) {
                    var c = a[b];
                    f.isFunction(c) || (c = this[a[b]]);
                    if (!c) throw Error('Method "' + a[b] + '" does not exist');
                    var d = b.match(F),
                        e = d[1],
                        d = d[2],
                        c = f.bind(c, this),
                        e = e + (".delegateEvents" + this.cid);
                    "" === d ? this.$el.bind(e, c) : this.$el.delegate(d, e, c)
                }
            }
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function(a) {
            this.options && (a = f.extend({}, this.options, a));
            for (var b = 0, c = w.length; b < c; b++) {
                var d = w[b];
                a[d] && (this[d] = a[d])
            }
            this.options = a
        },
        _ensureElement: function() {
            if (this.el) this.setElement(this.el, !1);
            else {
                var a = n(this, "attributes") || {};
                this.id && (a.id = this.id);
                this.className && (a["class"] = this.className);
                this.setElement(this.make(this.tagName, a), !1)
            }
        }
    });
    o.extend = r.extend = u.extend = v.extend = function(a, b) {
        var c = G(this, a, b);
        c.extend = this.extend;
        return c
    };
    var H = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    g.sync = function(a, b, c) {
        var d = H[a];
        c || (c = {});
        var e = {
            type: d,
            dataType: "json"
        };
        c.url || (e.url = n(b, "url") || t());
        if (!c.data && b && ("create" == a || "update" == a)) e.contentType = "application/json", e.data = JSON.stringify(b.toJSON());
        g.emulateJSON && (e.contentType = "application/x-www-form-urlencoded", e.data = e.data ? {
            model: e.data
        } : {});
        if (g.emulateHTTP && ("PUT" === d || "DELETE" === d)) g.emulateJSON && (e.data._method = d), e.type = "POST", e.beforeSend = function(a) {
            a.setRequestHeader("X-HTTP-Method-Override", d)
        };
        "GET" !== e.type && !g.emulateJSON && (e.processData = !1);
        return i.ajax(f.extend(e, c))
    };
    g.wrapError = function(a, b, c) {
        return function(d, e) {
            e = d === b ? e : d;
            a ? a(b, e, c) : b.trigger("error", b, e, c)
        }
    };
    var x = function() {}, G = function(a, b, c) {
        var d;
        d = b && b.hasOwnProperty("constructor") ? b.constructor : function() {
            a.apply(this, arguments)
        };
        f.extend(d, a);
        x.prototype = a.prototype;
        d.prototype = new x;
        b && f.extend(d.prototype, b);
        c && f.extend(d, c);
        d.prototype.constructor = d;
        d.__super__ = a.prototype;
        return d
    }, n = function(a, b) {
        return !a || !a[b] ? null : f.isFunction(a[b]) ? a[b]() : a[b]
    }, t = function() {
        throw Error('A "url" property or function must be specified')
    }
})
    .call(this);
var app = {
    collections: {},
    models: {},
    views: {}
};
app.models.Event = Backbone.Model.extend({
    urlRoot: "http://api.gignal.com/event/api/eventId/",
    idAttribute: "event_id"
});
app.models.Text = Backbone.Model.extend({
    idAttribute: "text_stream_id"
});
app.models.Photo = Backbone.Model.extend({
    idAttribute: "photo_stream_id"
});
app.collections.Stream = Backbone.Collection.extend({
    calling: false,
    parameters: {
        cid: 0,
        limit: 20,
        sinceTimeText: 0,
        sinceTimePhoto: 0
    },
    initialize: function() {
        this.update();
        this.setIntervalUpdate()
    },
    url: function() {
        return app.event.urlRoot + app.event.get("id")
    },
    comparator: function(model) {
        return model.get("created_on")
    },
    parse: function(response) {
        var self = this;
        app.event.set(response.event);
        var models = [];
        _.each(response.text, function(item) {
            var model = self.get(item.text_stream_id);
            if (typeof model !== "undefined") {
                return
            }
            model = new app.models.Text(item);
            models.push(model);
            var view = new app.views.TextBox({
                model: model
            });
            app.view.$el.prepend(view.render()
                .el)
                .isotope("reloadItems")
                .isotope({
                sortBy: "original-order"
            });
            if (model.get("saved_on") > self.parameters.sinceTimeText) {
                self.parameters.sinceTimeText = model.get("saved_on")
            }
        });
        _.each(response.photos, function(item) {
            var model = self.get(item.photo_stream_id);
            if (typeof model !== "undefined") {
                return
            }
            model = new app.models.Photo(item);
            models.push(model);
            var view = new app.views.PhotoBox({
                model: model
            });
            app.view.$el.prepend(view.render()
                .el)
                .isotope("reloadItems")
                .isotope({
                sortBy: "original-order"
            });
            if (model.get("saved_on") > self.parameters.sinceTimePhoto) {
                self.parameters.sinceTimePhoto = model.get("saved_on")
            }
        });
        if (models.length === 0) {
            return []
        }
        app.view.refresh();
        this.parameters.cid = 0;
        return models
    },
    update: function() {
        var self = this;
        if (this.calling) {
            return
        }
        this.calling = true;
        this.fetch({
            add: true,
            cache: true,
            timeout: 1e4,
            data: {
                limit: this.parameters.limit,
                sinceIdPhoto: this.parameters.sinceIdPhoto,
                sinceIdText: this.parameters.sinceIdText,
                cid: this.parameters.cid++
            },
            success: function() {
                self.calling = false
            },
            error: function() {
                self.calling = false
            }
        })
    },
    setIntervalUpdate: function() {
        this.intervalID = window.setInterval(function() {
            app.stream.update()
        }, 4500)
    }
});
app.views.Event = Backbone.View.extend({
    el: "#gignal-stream",
    columnWidth: 250,
    isotoptions: {
        itemSelector: ".gignal-outerbox",
        layoutMode: "masonry",
        sortBy: "savedOn",
        sortAscending: false,
        getSortData: {
            savedOn: function(el) {
                return el.data("saved_on")
            }
        }
    },
    initialize: function() {
        var mainWidth = this.$el.innerWidth();
        var columnsAsInt = parseInt(mainWidth / this.columnWidth);
        this.columnWidth = this.columnWidth + (parseInt((mainWidth - columnsAsInt * this.columnWidth) / columnsAsInt) - 1);
        this.$el.isotope(this.isotoptions)
    },
    refresh: function() {
        var self = this;
        this.$el.imagesLoaded(function() {
            self.$el.isotope(self.isotoptions)
        })
    }
});
app.views.Text = Backbone.View.extend({
    tagName: "p",
    className: "gignal-text",
    re_links: /(\b(https?):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gi,
    render: function() {
        var text = this.model.get("text");
        text = text.replace(this.re_links, '<a href="$1" target="_top">link</a>');
        this.$el.html(text);
        return this
    }
});
app.views.TextBox = Backbone.View.extend({
    tagName: "blockquote",
    className: "gignal-outerbox",
    initialize: function() {
        this.text = new app.views.Text({
            model: this.model
        })
            .render();
        this.footer = new app.views.Footer({
            model: this.model
        })
            .render()
    },
    render: function() {
        this.$el.data("saved_on", this.model.get("saved_on"));
        this.$el.css("width", app.view.columnWidth);
        this.$el.html(this.text.el);
        this.$el.append(this.footer.el);
        return this
    }
});
app.views.PhotoBox = Backbone.View.extend({
    tagName: "blockquote",
    className: "gignal-outerbox gignal-imagebox",
    initialize: function() {
        this.footer = new app.views.Footer({
            model: this.model
        })
            .render()
    },
    render: function() {
        this.$el.data("saved_on", this.model.get("saved_on"));
        this.$el.css("width", app.view.columnWidth);
        this.$el.css("background-image", "url(" + this.model.get("thumb_photo") + ")");
        this.$el.append(this.footer.el);
        return this
    }
});
app.views.Footer = Backbone.View.extend({
    tagName: "div",
    className: "gignal-box-footer",
    initialize: function() {
        this.serviceImg = (new Backbone.View)
            .make("img", {
            src: "images/" + this.model.get("service") + ".png",
            alt: "Service"
        });
        this.avatar = (new Backbone.View)
            .make("img", {
            src: this.model.get("user_image"),
            "class": "gignal-avatar",
            alt: "Avatar"
        });
        this.serviceProfileLink = (new Backbone.View)
            .make("a", {
            href: "http://" + this.model.get("service") + ".com/" + this.model.get("username")
        })
    },
    render: function() {
        $(this.serviceProfileLink)
            .append(this.avatar);
        $(this.serviceProfileLink)
            .append(this.model.get("name"));
        this.$el.html(this.serviceImg);
        this.$el.append(this.serviceProfileLink);
        return this
    }
});
app.Router = Backbone.Router.extend({
    routes: {
        "event/:id": "event",
        ":id": "event"
    },
    event: function(id) {
        app.event = new app.models.Event({
            id: id
        });
        app.stream = new app.collections.Stream
    }
});
jQuery(window)
    .load(function($) {
    app.view = new app.views.Event;
    new app.Router;
    Backbone.history.start({
        pushState: false,
        root: "/widget/"
    })
})
