(function () {
    var e = window.AmCharts;
    e.AmSerialChart = e.Class({
        inherits: e.AmRectangularChart, construct: function (a) {
            this.type = "serial";
            e.AmSerialChart.base.construct.call(this, a);
            this.cname = "AmSerialChart";
            this.theme = a;
            this.createEvents("changed");
            this.columnSpacing = 5;
            this.columnSpacing3D = 0;
            this.columnWidth = .8;
            this.updateScrollbar = !0;
            var b = new e.CategoryAxis(a);
            b.chart = this;
            this.categoryAxis = b;
            this.zoomOutOnDataUpdate = !0;
            this.mouseWheelZoomEnabled = this.mouseWheelScrollEnabled = this.rotate = this.skipZoom =
                !1;
            this.minSelectedTime = 0;
            e.applyTheme(this, a, this.cname)
        }, initChart: function () {
            e.AmSerialChart.base.initChart.call(this);
            this.updateCategoryAxis(this.categoryAxis, this.rotate, "categoryAxis");
            this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
            var a = this.chartCursor;
            a && (a.updateData(), a.fullWidth && (a.fullRectSet = this.cursorLineSet));
            var a = this.countColumns(), b = this.graphs, c;
            for (c = 0; c < b.length; c++) b[c].columnCount = a;
            this.updateScrollbar = !0;
            this.drawChart();
            this.autoMargins &&
            !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins())
        }, handleWheelReal: function (a, b) {
            if (!this.wheelBusy) {
                var c = this.categoryAxis, d = c.parseDates, g = c.minDuration(), e = c = 1;
                this.mouseWheelZoomEnabled ? b || (c = -1) : b && (c = -1);
                var f = this.chartData.length, m = this.lastTime, l = this.firstTime;
                0 > a ? d ? (f = this.endTime - this.startTime, d = this.startTime + c * g, g = this.endTime + e * g, 0 < e && 0 < c && g >= m && (g = m, d = m - f), this.zoomToDates(new Date(d), new Date(g))) : (0 < e && 0 < c && this.end >= f - 1 && (c = e = 0), d = this.start + c, g = this.end + e,
                    this.zoomToIndexes(d, g)) : d ? (f = this.endTime - this.startTime, d = this.startTime - c * g, g = this.endTime - e * g, 0 < e && 0 < c && d <= l && (d = l, g = l + f), this.zoomToDates(new Date(d), new Date(g))) : (0 < e && 0 < c && 1 > this.start && (c = e = 0), d = this.start - c, g = this.end - e, this.zoomToIndexes(d, g))
            }
        }, validateData: function (a) {
            this.marginsUpdated = !1;
            this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN);
            e.AmSerialChart.base.validateData.call(this)
        }, drawChart: function () {
            e.AmSerialChart.base.drawChart.call(this);
            var a =
                this.chartData;
            if (e.ifArray(a)) {
                var b = this.chartScrollbar;
                b && b.draw();
                if (0 < this.realWidth && 0 < this.realHeight) {
                    var a = a.length - 1, c, b = this.categoryAxis;
                    if (b.parseDates && !b.equalSpacing) {
                        if (b = this.startTime, c = this.endTime, isNaN(b) || isNaN(c)) b = this.firstTime, c = this.lastTime
                    } else if (b = this.start, c = this.end, isNaN(b) || isNaN(c)) b = 0, c = a;
                    this.endTime = this.startTime = this.end = this.start = void 0;
                    this.zoom(b, c)
                }
            } else this.cleanChart();
            this.dispDUpd();
            this.chartCreated = !0
        }, cleanChart: function () {
            e.callMethod("destroy",
                [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor])
        }, updateCategoryAxis: function (a, b, c) {
            a.chart = this;
            a.id = c;
            a.rotate = b;
            a.axisRenderer = e.RecAxis;
            a.guideFillRenderer = e.RecFill;
            a.axisItemRenderer = e.RecItem;
            a.setOrientation(!this.rotate);
            a.x = this.marginLeftReal;
            a.y = this.marginTopReal;
            a.dx = this.dx;
            a.dy = this.dy;
            a.width = this.plotAreaWidth - 1;
            a.height = this.plotAreaHeight - 1;
            a.viW = this.plotAreaWidth - 1;
            a.viH = this.plotAreaHeight - 1;
            a.viX = this.marginLeftReal;
            a.viY = this.marginTopReal;
            a.marginsChanged = !0
        }, updateValueAxes: function () {
            e.AmSerialChart.base.updateValueAxes.call(this);
            var a = this.valueAxes, b;
            for (b = 0; b < a.length; b++) {
                var c = a[b], d = this.rotate;
                c.rotate = d;
                c.setOrientation(d);
                d = this.categoryAxis;
                if (!d.startOnAxis || d.parseDates) c.expandMinMax = !0
            }
        }, updateData: function () {
            this.parseData();
            var a = this.graphs, b, c = this.chartData;
            for (b = 0; b < a.length; b++) a[b].data = c;
            0 < c.length && (this.firstTime = this.getStartTime(c[0].time), this.lastTime = this.getEndTime(c[c.length - 1].time))
        }, getStartTime: function (a) {
            var b =
                this.categoryAxis;
            return e.resetDateToMin(new Date(a), b.minPeriod, 1, b.firstDayOfWeek).getTime()
        }, getEndTime: function (a) {
            var b = e.extractPeriod(this.categoryAxis.minPeriod);
            return e.changeDate(new Date(a), b.period, b.count, !0).getTime() - 1
        }, updateMargins: function () {
            e.AmSerialChart.base.updateMargins.call(this);
            var a = this.chartScrollbar;
            a && (this.getScrollbarPosition(a, this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate))
        }, updateScrollbars: function () {
            e.AmSerialChart.base.updateScrollbars.call(this);
            this.updateChartScrollbar(this.chartScrollbar, this.rotate)
        }, zoom: function (a, b) {
            var c = this.categoryAxis;
            c.parseDates && !c.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b);
            this.updateLegendValues()
        }, timeZoom: function (a, b) {
            var c = this.maxSelectedTime;
            isNaN(c) || (b != this.endTime && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.startTime && b - a > c && (b = a + c, this.updateScrollbar = !0));
            var d = this.minSelectedTime;
            if (0 < d && b - a < d) {
                var g = Math.round(a + (b - a) / 2), d = Math.round(d / 2);
                a = g - d;
                b = g + d
            }
            var h = this.chartData, g = this.categoryAxis;
            if (e.ifArray(h) && (a != this.startTime || b != this.endTime)) {
                var f = g.minDuration(), d = this.firstTime, m = this.lastTime;
                a || (a = d, isNaN(c) || (a = m - c));
                b || (b = m);
                a > m && (a = m);
                b < d && (b = d);
                a < d && (a = d);
                b > m && (b = m);
                b < a && (b = a + f);
                b - a < f / 5 && (b < m ? b = a + f / 5 : a = b - f / 5);
                this.startTime = a;
                this.endTime = b;
                c = h.length - 1;
                f = this.getClosestIndex(h, "time", a, !0, 0, c);
                h = this.getClosestIndex(h, "time", b, !1, f, c);
                g.timeZoom(a, b);
                g.zoom(f, h);
                this.start = e.fitToBounds(f, 0, c);
                this.end = e.fitToBounds(h, 0, c);
                this.zoomAxesAndGraphs();
                this.zoomScrollbar();
                a !=
                d || b != m ? this.showZB(!0) : this.showZB(!1);
                this.updateColumnsDepth();
                this.dispatchTimeZoomEvent()
            }
        }, updateAfterValueZoom: function () {
            this.zoomAxesAndGraphs();
            this.zoomScrollbar();
            this.updateColumnsDepth()
        }, indexZoom: function (a, b) {
            var c = this.maxSelectedSeries;
            isNaN(c) || (b != this.end && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.start && b - a > c && (b = a + c, this.updateScrollbar = !0));
            if (a != this.start || b != this.end) {
                var d = this.chartData.length - 1;
                isNaN(a) && (a = 0, isNaN(c) || (a = d - c));
                isNaN(b) && (b = d);
                b < a && (b = a);
                b > d && (b =
                    d);
                a > d && (a = d - 1);
                0 > a && (a = 0);
                this.start = a;
                this.end = b;
                this.categoryAxis.zoom(a, b);
                this.zoomAxesAndGraphs();
                this.zoomScrollbar();
                0 !== a || b != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1);
                this.updateColumnsDepth();
                this.dispatchIndexZoomEvent()
            }
        }, updateGraphs: function () {
            e.AmSerialChart.base.updateGraphs.call(this);
            var a = this.graphs, b;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                c.columnWidthReal = this.columnWidth;
                c.categoryAxis = this.categoryAxis;
                e.isString(c.fillToGraph) && (c.fillToGraph = this.getGraphById(c.fillToGraph))
            }
        },
        updateColumnsDepth: function () {
            var a, b = this.graphs, c;
            e.remove(this.columnsSet);
            this.columnsArray = [];
            for (a = 0; a < b.length; a++) {
                c = b[a];
                var d = c.columnsArray;
                if (d) {
                    var g;
                    for (g = 0; g < d.length; g++) this.columnsArray.push(d[g])
                }
            }
            this.columnsArray.sort(this.compareDepth);
            if (0 < this.columnsArray.length) {
                b = this.container.set();
                this.columnSet.push(b);
                for (a = 0; a < this.columnsArray.length; a++) b.push(this.columnsArray[a].column.set);
                c && b.translate(c.x, c.y);
                this.columnsSet = b
            }
        }, compareDepth: function (a, b) {
            return a.depth > b.depth ?
                1 : -1
        }, zoomScrollbar: function () {
            var a = this.chartScrollbar, b = this.categoryAxis;
            a && this.updateScrollbar && a.enabled && (a.dragger.stop(), b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end), this.updateScrollbar = !0)
        }, updateTrendLines: function () {
            var a = this.trendLines, b;
            for (b = 0; b < a.length; b++) {
                var c = a[b], c = e.processObject(c, e.TrendLine, this.theme);
                a[b] = c;
                c.chart = this;
                c.id || (c.id = "trendLineAuto" + b + "_" + (new Date).getTime());
                e.isString(c.valueAxis) && (c.valueAxis = this.getValueAxisById(c.valueAxis));
                c.valueAxis || (c.valueAxis = this.valueAxes[0]);
                c.categoryAxis = this.categoryAxis
            }
        }, zoomAxesAndGraphs: function () {
            if (!this.scrollbarOnly) {
                var a = this.valueAxes, b;
                for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
                a = this.graphs;
                for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
                this.zoomTrendLines();
                (b = this.chartCursor) && b.zoom(this.start, this.end, this.startTime, this.endTime)
            }
        }, countColumns: function () {
            var a = 0, b = this.valueAxes.length, c = this.graphs.length, d, e, h = !1, f, m;
            for (m = 0; m < b; m++) {
                e = this.valueAxes[m];
                var l = e.stackType;
                if ("100%" == l || "regular" == l) for (h = !1, f = 0; f < c; f++) d = this.graphs[f], d.tcc = 1, d.valueAxis == e && "column" == d.type && (!h && d.stackable && (a++, h = !0), (!d.stackable && d.clustered || d.newStack) && a++, d.columnIndex = a - 1, d.clustered || (d.columnIndex = 0));
                if ("none" == l || "3d" == l) {
                    h = !1;
                    for (f = 0; f < c; f++) d = this.graphs[f], d.valueAxis == e && "column" == d.type && (d.clustered ? (d.tcc = 1, d.newStack && (a = 0), d.hidden || (d.columnIndex = a, a++)) : d.hidden || (h = !0, d.tcc = 1, d.columnIndex = 0));
                    h && 0 === a && (a = 1)
                }
                if ("3d" == l) {
                    e = 1;
                    for (m = 0; m <
                    c; m++) d = this.graphs[m], d.newStack && e++, d.depthCount = e, d.tcc = a;
                    a = e
                }
            }
            return a
        }, parseData: function () {
            e.AmSerialChart.base.parseData.call(this);
            this.parseSerialData(this.dataProvider)
        }, getCategoryIndexByValue: function (a) {
            var b = this.chartData, c, d;
            for (d = 0; d < b.length; d++) b[d].category == a && (c = d);
            return c
        }, handleCursorChange: function (a) {
            this.updateLegendValues(a.index)
        }, handleCursorZoom: function (a) {
            this.updateScrollbar = !0;
            this.zoom(a.start, a.end)
        }, handleScrollbarZoom: function (a) {
            this.updateScrollbar = !1;
            this.zoom(a.start,
                a.end)
        }, dispatchTimeZoomEvent: function () {
            if (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime) {
                var a = {type: "zoomed"};
                a.startDate = new Date(this.startTime);
                a.endDate = new Date(this.endTime);
                a.startIndex = this.start;
                a.endIndex = this.end;
                this.startIndex = this.start;
                this.endIndex = this.end;
                this.startDate = a.startDate;
                this.endDate = a.endDate;
                this.prevStartTime = this.startTime;
                this.prevEndTime = this.endTime;
                var b = this.categoryAxis, c = e.extractPeriod(b.minPeriod).period, b = b.dateFormatsObject[c];
                a.startValue =
                    e.formatDate(a.startDate, b, this);
                a.endValue = e.formatDate(a.endDate, b, this);
                a.chart = this;
                a.target = this;
                this.fire(a.type, a)
            }
        }, dispatchIndexZoomEvent: function () {
            if (this.prevStartIndex != this.start || this.prevEndIndex != this.end) {
                this.startIndex = this.start;
                this.endIndex = this.end;
                var a = this.chartData;
                if (e.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
                    var b = {chart: this, target: this, type: "zoomed"};
                    b.startIndex = this.start;
                    b.endIndex = this.end;
                    b.startValue = a[this.start].category;
                    b.endValue = a[this.end].category;
                    this.categoryAxis.parseDates && (this.startTime = a[this.start].time, this.endTime = a[this.end].time, b.startDate = new Date(this.startTime), b.endDate = new Date(this.endTime));
                    this.prevStartIndex = this.start;
                    this.prevEndIndex = this.end;
                    this.fire(b.type, b)
                }
            }
        }, updateLegendValues: function (a) {
            var b = this.graphs, c;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                isNaN(a) ? d.currentDataItem = void 0 : d.currentDataItem = this.chartData[a].axes[d.valueAxis.id].graphs[d.id]
            }
            this.legend && this.legend.updateValues()
        }, getClosestIndex: function (a,
                                      b, c, d, e, h) {
            0 > e && (e = 0);
            h > a.length - 1 && (h = a.length - 1);
            var f = e + Math.round((h - e) / 2), m = a[f][b];
            if (c == m) return f;
            if (1 >= h - e) {
                if (d) return e;
                d = a[h][b];
                return Math.abs(a[e][b] - c) < Math.abs(d - c) ? e : h
            }
            return c == m ? f : c < m ? this.getClosestIndex(a, b, c, d, e, f) : this.getClosestIndex(a, b, c, d, f, h)
        }, zoomToIndexes: function (a, b) {
            this.updateScrollbar = !0;
            var c = this.chartData;
            if (c) {
                var d = c.length;
                0 < d && (0 > a && (a = 0), b > d - 1 && (b = d - 1), d = this.categoryAxis, d.parseDates && !d.equalSpacing ? this.zoom(c[a].time, this.getEndTime(c[b].time)) : this.zoom(a,
                    b))
            }
        }, zoomToDates: function (a, b) {
            this.updateScrollbar = !0;
            var c = this.chartData;
            if (this.categoryAxis.equalSpacing) {
                var d = this.getClosestIndex(c, "time", a.getTime(), !0, 0, c.length);
                b = e.resetDateToMin(b, this.categoryAxis.minPeriod, 1);
                c = this.getClosestIndex(c, "time", b.getTime(), !1, 0, c.length);
                this.zoom(d, c)
            } else this.zoom(a.getTime(), b.getTime())
        }, zoomToCategoryValues: function (a, b) {
            this.updateScrollbar = !0;
            this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b))
        }, formatPeriodString: function (a,
                                         b) {
            if (b) {
                var c = ["value", "open", "low", "high", "close"],
                    d = "value open low high close average sum count".split(" "), g = b.valueAxis, h = this.chartData,
                    f = b.numberFormatter;
                f || (f = this.nf);
                for (var m = 0; m < c.length; m++) {
                    for (var l = c[m], k = 0, p = 0, n, x, A, u, v, t = 0, q = 0, r, w, z, B, F, G = this.start; G <= this.end; G++) {
                        var y = h[G];
                        if (y && (y = y.axes[g.id].graphs[b.id])) {
                            if (y.values) {
                                var C = y.values[l];
                                if (this.rotate) {
                                    if (0 > y.x || y.x > y.graph.height) C = NaN
                                } else if (0 > y.x || y.x > y.graph.width) C = NaN;
                                if (!isNaN(C)) {
                                    isNaN(n) && (n = C);
                                    x = C;
                                    if (isNaN(A) ||
                                        A > C) A = C;
                                    if (isNaN(u) || u < C) u = C;
                                    v = e.getDecimals(k);
                                    var E = e.getDecimals(C), k = k + C, k = e.roundTo(k, Math.max(v, E));
                                    p++;
                                    v = k / p
                                }
                            }
                            if (y.percents && (y = y.percents[l], !isNaN(y))) {
                                isNaN(r) && (r = y);
                                w = y;
                                if (isNaN(z) || z > y) z = y;
                                if (isNaN(B) || B < y) B = y;
                                F = e.getDecimals(t);
                                C = e.getDecimals(y);
                                t += y;
                                t = e.roundTo(t, Math.max(F, C));
                                q++;
                                F = t / q
                            }
                        }
                    }
                    t = {open: r, close: w, high: B, low: z, average: F, sum: t, count: q};
                    a = e.formatValue(a, {
                        open: n,
                        close: x,
                        high: u,
                        low: A,
                        average: v,
                        sum: k,
                        count: p
                    }, d, f, l + "\\.", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
                    a = e.formatValue(a, t, d, this.pf, "percents\\." + l + "\\.")
                }
            }
            return a = e.cleanFromEmpty(a)
        }, formatString: function (a, b, c) {
            var d = b.graph;
            if (-1 != a.indexOf("[[category]]")) {
                var g = b.serialDataItem.category;
                if (this.categoryAxis.parseDates) {
                    var h = this.balloonDateFormat, f = this.chartCursor;
                    f && (h = f.categoryBalloonDateFormat);
                    -1 != a.indexOf("[[category]]") && (h = e.formatDate(g, h, this), -1 != h.indexOf("fff") && (h = e.formatMilliseconds(h, g)), g = h)
                }
                a = a.replace(/\[\[category\]\]/g, String(g))
            }
            g = d.numberFormatter;
            g || (g = this.nf);
            h = b.graph.valueAxis;
            (f = h.duration) && !isNaN(b.values.value) && (f = e.formatDuration(b.values.value, f, "", h.durationUnits, h.maxInterval, g), a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), f));
            "date" == h.type && (h = e.formatDate(new Date(b.values.value), d.dateFormat, this), f = RegExp("\\[\\[value\\]\\]", "g"), a = a.replace(f, h), h = e.formatDate(new Date(b.values.open), d.dateFormat, this), f = RegExp("\\[\\[open\\]\\]", "g"), a = a.replace(f, h));
            d = "value open low high close total".split(" ");
            h = this.pf;
            a = e.formatValue(a, b.percents,
                d, h, "percents\\.");
            a = e.formatValue(a, b.values, d, g, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
            a = e.formatValue(a, b.values, ["percents"], h);
            -1 != a.indexOf("[[") && (a = e.formatDataContextValue(a, b.dataContext));
            -1 != a.indexOf("[[") && b.graph.customData && (a = e.formatDataContextValue(a, b.graph.customData));
            return a = e.AmSerialChart.base.formatString.call(this, a, b, c)
        }, addChartScrollbar: function (a) {
            e.callMethod("destroy", [this.chartScrollbar]);
            a && (a.chart = this, this.listenTo(a, "zoomed",
                this.handleScrollbarZoom));
            this.rotate ? void 0 === a.width && (a.width = a.scrollbarHeight) : void 0 === a.height && (a.height = a.scrollbarHeight);
            this.chartScrollbar = a
        }, removeChartScrollbar: function () {
            e.callMethod("destroy", [this.chartScrollbar]);
            this.chartScrollbar = null
        }, handleReleaseOutside: function (a) {
            e.AmSerialChart.base.handleReleaseOutside.call(this, a);
            e.callMethod("handleReleaseOutside", [this.chartScrollbar])
        }, update: function () {
            e.AmSerialChart.base.update.call(this);
            this.chartScrollbar && this.chartScrollbar.update &&
            this.chartScrollbar.update()
        }
    })
})();
(function () {
    var e = window.AmCharts;
    e.Cuboid = e.Class({
        construct: function (a, b, c, d, e, h, f, m, l, k, p, n, x, A, u, v, t) {
            this.set = a.set();
            this.container = a;
            this.h = Math.round(c);
            this.w = Math.round(b);
            this.dx = d;
            this.dy = e;
            this.colors = h;
            this.alpha = f;
            this.bwidth = m;
            this.bcolor = l;
            this.balpha = k;
            this.dashLength = A;
            this.topRadius = v;
            this.pattern = u;
            this.rotate = x;
            this.bcn = t;
            x ? 0 > b && 0 === p && (p = 180) : 0 > c && 270 == p && (p = 90);
            this.gradientRotation = p;
            0 === d && 0 === e && (this.cornerRadius = n);
            this.draw()
        }, draw: function () {
            var a = this.set;
            a.clear();
            var b = this.container, c = b.chart, d = this.w, g = this.h, h = this.dx, f = this.dy, m = this.colors,
                l = this.alpha, k = this.bwidth, p = this.bcolor, n = this.balpha, x = this.gradientRotation,
                A = this.cornerRadius, u = this.dashLength, v = this.pattern, t = this.topRadius, q = this.bcn, r = m,
                w = m;
            "object" == typeof m && (r = m[0], w = m[m.length - 1]);
            var z, B, F, G, y, C, E, L, M, Q = l;
            v && (l = 0);
            var D, H, I, J, K = this.rotate;
            if (0 < Math.abs(h) || 0 < Math.abs(f)) if (isNaN(t)) E = w, w = e.adjustLuminosity(r, -.2), w = e.adjustLuminosity(r, -.2), z = e.polygon(b, [0, h, d + h, d, 0], [0, f, f, 0, 0],
                w, l, 1, p, 0, x), 0 < n && (M = e.line(b, [0, h, d + h], [0, f, f], p, n, k, u)), B = e.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], w, l, 1, p, 0, x), B.translate(h, f), 0 < n && (F = e.line(b, [h, h], [f, f + g], p, n, k, u)), G = e.polygon(b, [0, 0, h, h, 0], [0, g, g + f, f, 0], w, l, 1, p, 0, x), y = e.polygon(b, [d, d, d + h, d + h, d], [0, g, g + f, f, 0], w, l, 1, p, 0, x), 0 < n && (C = e.line(b, [d, d + h, d + h, d], [0, f, g + f, g], p, n, k, u)), w = e.adjustLuminosity(E, .2), E = e.polygon(b, [0, h, d + h, d, 0], [g, g + f, g + f, g, g], w, l, 1, p, 0, x), 0 < n && (L = e.line(b, [0, h, d + h], [g, g + f, g + f], p, n, k, u)); else {
                var N, O, P;
                K ? (N = g / 2, w = h / 2, P = g / 2, O =
                    d + h / 2, H = Math.abs(g / 2), D = Math.abs(h / 2)) : (w = d / 2, N = f / 2, O = d / 2, P = g + f / 2 + 1, D = Math.abs(d / 2), H = Math.abs(f / 2));
                I = D * t;
                J = H * t;
                .1 < D && .1 < D && (z = e.circle(b, D, r, l, k, p, n, !1, H), z.translate(w, N));
                .1 < I && .1 < I && (E = e.circle(b, I, e.adjustLuminosity(r, .5), l, k, p, n, !1, J), E.translate(O, P))
            }
            l = Q;
            1 > Math.abs(g) && (g = 0);
            1 > Math.abs(d) && (d = 0);
            !isNaN(t) && (0 < Math.abs(h) || 0 < Math.abs(f)) ? (m = [r], m = {
                fill: m,
                stroke: p,
                "stroke-width": k,
                "stroke-opacity": n,
                "fill-opacity": l
            }, K ? (l = "M0,0 L" + d + "," + (g / 2 - g / 2 * t), k = " B", 0 < d && (k = " A"), e.VML ? (l += k + Math.round(d -
                I) + "," + Math.round(g / 2 - J) + "," + Math.round(d + I) + "," + Math.round(g / 2 + J) + "," + d + ",0," + d + "," + g, l = l + (" L0," + g) + (k + Math.round(-D) + "," + Math.round(g / 2 - H) + "," + Math.round(D) + "," + Math.round(g / 2 + H) + ",0," + g + ",0,0")) : (l += "A" + I + "," + J + ",0,0,0," + d + "," + (g - g / 2 * (1 - t)) + "L0," + g, l += "A" + D + "," + H + ",0,0,1,0,0"), D = 90) : (k = d / 2 - d / 2 * t, l = "M0,0 L" + k + "," + g, e.VML ? (l = "M0,0 L" + k + "," + g, k = " B", 0 > g && (k = " A"), l += k + Math.round(d / 2 - I) + "," + Math.round(g - J) + "," + Math.round(d / 2 + I) + "," + Math.round(g + J) + ",0," + g + "," + d + "," + g, l += " L" + d + ",0", l += k + Math.round(d /
                2 + D) + "," + Math.round(H) + "," + Math.round(d / 2 - D) + "," + Math.round(-H) + "," + d + ",0,0,0") : (l += "A" + I + "," + J + ",0,0,0," + (d - d / 2 * (1 - t)) + "," + g + "L" + d + ",0", l += "A" + D + "," + H + ",0,0,1,0,0"), D = 180), b = b.path(l).attr(m), b.gradient("linearGradient", [r, e.adjustLuminosity(r, -.3), e.adjustLuminosity(r, -.3), r], D), K ? b.translate(h / 2, 0) : b.translate(0, f / 2)) : b = 0 === g ? e.line(b, [0, d], [0, 0], p, n, k, u) : 0 === d ? e.line(b, [0, 0], [0, g], p, n, k, u) : 0 < A ? e.rect(b, d, g, m, l, k, p, n, A, x, u) : e.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], m, l, k, p, n, x, !1, u);
            d = isNaN(t) ? 0 > g ? [z,
                M, B, F, G, y, C, E, L, b] : [E, L, B, F, G, y, z, M, C, b] : K ? 0 < d ? [z, b, E] : [E, b, z] : 0 > g ? [z, b, E] : [E, b, z];
            e.setCN(c, b, q + "front");
            e.setCN(c, B, q + "back");
            e.setCN(c, E, q + "top");
            e.setCN(c, z, q + "bottom");
            e.setCN(c, G, q + "left");
            e.setCN(c, y, q + "right");
            for (z = 0; z < d.length; z++) if (B = d[z]) a.push(B), e.setCN(c, B, q + "element");
            v && b.pattern(v, NaN, c.path)
        }, width: function (a) {
            isNaN(a) && (a = 0);
            this.w = Math.round(a);
            this.draw()
        }, height: function (a) {
            isNaN(a) && (a = 0);
            this.h = Math.round(a);
            this.draw()
        }, animateHeight: function (a, b) {
            var c = this;
            c.easing = b;
            c.totalFrames = Math.round(1E3 * a / e.updateRate);
            c.rh = c.h;
            c.frame = 0;
            c.height(1);
            setTimeout(function () {
                c.updateHeight.call(c)
            }, e.updateRate)
        }, updateHeight: function () {
            var a = this;
            a.frame++;
            var b = a.totalFrames;
            a.frame <= b && (b = a.easing(0, a.frame, 1, a.rh - 1, b), a.height(b), setTimeout(function () {
                a.updateHeight.call(a)
            }, e.updateRate))
        }, animateWidth: function (a, b) {
            var c = this;
            c.easing = b;
            c.totalFrames = Math.round(1E3 * a / e.updateRate);
            c.rw = c.w;
            c.frame = 0;
            c.width(1);
            setTimeout(function () {
                c.updateWidth.call(c)
            }, e.updateRate)
        },
        updateWidth: function () {
            var a = this;
            a.frame++;
            var b = a.totalFrames;
            a.frame <= b && (b = a.easing(0, a.frame, 1, a.rw - 1, b), a.width(b), setTimeout(function () {
                a.updateWidth.call(a)
            }, e.updateRate))
        }
    })
})();
(function () {
    var e = window.AmCharts;
    e.CategoryAxis = e.Class({
        inherits: e.AxisBase, construct: function (a) {
            this.cname = "CategoryAxis";
            e.CategoryAxis.base.construct.call(this, a);
            this.minPeriod = "DD";
            this.equalSpacing = this.parseDates = !1;
            this.position = "bottom";
            this.startOnAxis = !1;
            this.firstDayOfWeek = 1;
            this.gridPosition = "middle";
            this.markPeriodChange = this.boldPeriodBeginning = !0;
            this.safeDistance = 30;
            this.centerLabelOnFullPeriod = !0;
            e.applyTheme(this, a, this.cname)
        }, draw: function () {
            e.CategoryAxis.base.draw.call(this);
            this.generateDFObject();
            var a = this.chart.chartData;
            this.data = a;
            if (e.ifArray(a)) {
                var b, c = this.chart;
                "scrollbar" != this.id ? (e.setCN(c, this.set, "category-axis"), e.setCN(c, this.labelsSet, "category-axis"), e.setCN(c, this.axisLine.axisSet, "category-axis")) : this.bcn = this.id + "-";
                var d = this.start, g = this.labelFrequency, h = 0, f = this.end - d + 1, m = this.gridCountR,
                    l = this.showFirstLabel, k = this.showLastLabel, p, n = "", n = e.extractPeriod(this.minPeriod),
                    x = e.getPeriodDuration(n.period, n.count), A, u, v, t, q;
                A = this.rotate;
                b = this.firstDayOfWeek;
                p = this.boldPeriodBeginning;
                var r = e.resetDateToMin(new Date(a[a.length - 1].time + 1.05 * x), this.minPeriod, 1, b).getTime();
                this.firstTime = c.firstTime;
                this.endTime > r && (this.endTime = r);
                q = this.minorGridEnabled;
                var w, r = this.gridAlpha;
                if (this.parseDates && !this.equalSpacing) this.lastTime = a[a.length - 1].time, this.maxTime = e.resetDateToMin(new Date(this.lastTime + 1.05 * x), this.minPeriod, 1, b).getTime(), this.timeDifference = this.endTime - this.startTime, this.parseDatesDraw(); else if (!this.parseDates) {
                    if (this.cellWidth = this.getStepWidth(f),
                    f < m && (m = f), h += this.start, this.stepWidth = this.getStepWidth(f), 0 < m) {
                        m = Math.floor(f / m);
                        w = this.chooseMinorFrequency(m);
                        f = h;
                        f / 2 == Math.round(f / 2) && f--;
                        0 > f && (f = 0);
                        var z = 0;
                        this.end - f + 1 >= this.autoRotateCount && (this.labelRotation = this.autoRotateAngle);
                        for (b = f; b <= this.end + 2; b++) {
                            p = !1;
                            0 <= b && b < this.data.length ? (u = this.data[b], n = u.category, p = u.forceShow) : n = "";
                            if (q && !isNaN(w)) if (b / w == Math.round(b / w) || p) b / m == Math.round(b / m) || p || (this.gridAlpha = this.minorGridAlpha, n = void 0); else continue; else if (b / m != Math.round(b /
                                m) && !p) continue;
                            f = this.getCoordinate(b - h);
                            v = 0;
                            "start" == this.gridPosition && (f -= this.cellWidth / 2, v = this.cellWidth / 2);
                            p = !0;
                            a = v;
                            "start" == this.tickPosition && (a = 0, p = !1, v = 0);
                            if (b == d && !l || b == this.end && !k) n = void 0;
                            Math.round(z / g) != z / g && (n = void 0);
                            z++;
                            var B = this.cellWidth;
                            A && (B = NaN);
                            this.labelFunction && u && (n = this.labelFunction(n, u, this));
                            n = e.fixBrakes(n);
                            x = !1;
                            this.boldLabels && (x = !0);
                            b > this.end && "start" == this.tickPosition && (n = " ");
                            v = new this.axisItemRenderer(this, f, n, p, B, v, void 0, x, a, !1, u.labelColor, u.className);
                            v.serialDataItem = u;
                            this.pushAxisItem(v);
                            this.gridAlpha = r
                        }
                    }
                } else if (this.parseDates && this.equalSpacing) {
                    h = this.start;
                    this.startTime = this.data[this.start].time;
                    this.endTime = this.data[this.end].time;
                    this.timeDifference = this.endTime - this.startTime;
                    d = this.choosePeriod(0);
                    g = d.period;
                    A = d.count;
                    a = e.getPeriodDuration(g, A);
                    a < x && (g = n.period, A = n.count, a = x);
                    u = g;
                    "WW" == u && (u = "DD");
                    this.stepWidth = this.getStepWidth(f);
                    m = Math.ceil(this.timeDifference / a) + 1;
                    n = e.resetDateToMin(new Date(this.startTime - a), g, A, b).getTime();
                    this.cellWidth = this.getStepWidth(f);
                    f = Math.round(n / a);
                    d = -1;
                    f / 2 == Math.round(f / 2) && (d = -2, n -= a);
                    f = this.start;
                    f / 2 == Math.round(f / 2) && f--;
                    0 > f && (f = 0);
                    a = this.end + 2;
                    a >= this.data.length && (a = this.data.length);
                    B = !1;
                    B = !l;
                    this.previousPos = -1E3;
                    20 < this.labelRotation && (this.safeDistance = 5);
                    var F = f;
                    if (this.data[f].time != e.resetDateToMin(new Date(this.data[f].time), g, A, b).getTime()) {
                        var x = 0, G = n;
                        for (b = f; b < a; b++) t = this.data[b].time, this.checkPeriodChange(g, A, t, G) && (x++, 2 <= x && (F = b, b = a), G = t)
                    }
                    q && 1 < A && (w = this.chooseMinorFrequency(A),
                        e.getPeriodDuration(g, w));
                    if (0 < this.gridCountR) for (b = f; b < a; b++) if (t = this.data[b].time, this.checkPeriodChange(g, A, t, n) && b >= F) {
                        f = this.getCoordinate(b - this.start);
                        q = !1;
                        this.nextPeriod[u] && (q = this.checkPeriodChange(this.nextPeriod[u], 1, t, n, u));
                        x = !1;
                        q && this.markPeriodChange ? (q = this.dateFormatsObject[this.nextPeriod[u]], x = !0) : q = this.dateFormatsObject[u];
                        n = e.formatDate(new Date(t), q, c);
                        if (b == d && !l || b == m && !k) n = " ";
                        B ? B = !1 : (p || (x = !1), f - this.previousPos > this.safeDistance * Math.cos(this.labelRotation * Math.PI /
                            180) && (this.labelFunction && (n = this.labelFunction(n, new Date(t), this, g, A, v)), this.boldLabels && (x = !0), v = new this.axisItemRenderer(this, f, n, void 0, void 0, void 0, void 0, x), q = v.graphics(), this.pushAxisItem(v), q = q.getBBox().width, e.isModern || (q -= f), this.previousPos = f + q));
                        v = n = t
                    } else isNaN(w) || (this.checkPeriodChange(g, w, t, z) && (this.gridAlpha = this.minorGridAlpha, f = this.getCoordinate(b - this.start), q = new this.axisItemRenderer(this, f), this.pushAxisItem(q), z = t), this.gridAlpha = r)
                }
                for (b = 0; b < this.data.length; b++) if (l =
                    this.data[b]) k = this.parseDates && !this.equalSpacing ? Math.round((l.time - this.startTime) * this.stepWidth + this.cellWidth / 2) : this.getCoordinate(b - h), l.x[this.id] = k;
                l = this.guides.length;
                for (b = 0; b < l; b++) k = this.guides[b], q = p = q = r = d = NaN, w = k.above, k.toCategory && (p = c.getCategoryIndexByValue(k.toCategory), isNaN(p) || (d = this.getCoordinate(p - h), k.expand && (d += this.cellWidth / 2), v = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(v, w))), k.category && (q = c.getCategoryIndexByValue(k.category), isNaN(q) ||
                (r = this.getCoordinate(q - h), k.expand && (r -= this.cellWidth / 2), q = (d - r) / 2, v = new this.axisItemRenderer(this, r, k.label, !0, NaN, q, k), this.pushAxisItem(v, w))), q = c.dataDateFormat, k.toDate && (k.toDate = e.getDate(k.toDate, q, this.minPeriod), this.equalSpacing ? (p = c.getClosestIndex(this.data, "time", k.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(p) || (d = this.getCoordinate(p - h))) : d = (k.toDate.getTime() - this.startTime) * this.stepWidth, v = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(v, w)), k.date &&
                (k.date = e.getDate(k.date, q, this.minPeriod), this.equalSpacing ? (q = c.getClosestIndex(this.data, "time", k.date.getTime(), !1, 0, this.data.length - 1), isNaN(q) || (r = this.getCoordinate(q - h))) : r = (k.date.getTime() - this.startTime) * this.stepWidth, q = (d - r) / 2, p = !0, k.toDate && (p = !1), v = "H" == this.orientation ? new this.axisItemRenderer(this, r, k.label, p, 2 * q, NaN, k) : new this.axisItemRenderer(this, r, k.label, !1, NaN, q, k), this.pushAxisItem(v, w)), (0 < d || 0 < r) && (d < this.width || r < this.width) && (d = new this.guideFillRenderer(this, r, d, k),
                    r = d.graphics(), this.pushAxisItem(d, w), k.graphics = r, r.index = b, k.balloonText && this.addEventListeners(r, k))
            }
            this.axisCreated = !0;
            c = this.x;
            h = this.y;
            this.set.translate(c, h);
            this.labelsSet.translate(c, h);
            this.positionTitle();
            (c = this.axisLine.set) && c.toFront();
            c = this.getBBox().height;
            2 < c - this.previousHeight && this.autoWrap && !this.parseDates && (this.axisCreated = this.chart.marginsUpdated = !1);
            this.previousHeight = c
        }, xToIndex: function (a) {
            var b = this.data, c = this.chart, d = c.rotate, g = this.stepWidth;
            this.parseDates &&
            !this.equalSpacing ? (a = this.startTime + Math.round(a / g) - this.minDuration() / 2, c = c.getClosestIndex(b, "time", a, !1, this.start, this.end + 1)) : (this.startOnAxis || (a -= g / 2), c = this.start + Math.round(a / g));
            var c = e.fitToBounds(c, 0, b.length - 1), h;
            b[c] && (h = b[c].x[this.id]);
            d ? h > this.height + 1 && c-- : h > this.width + 1 && c--;
            0 > h && c++;
            return c = e.fitToBounds(c, 0, b.length - 1)
        }, dateToCoordinate: function (a) {
            return this.parseDates && !this.equalSpacing ? (a.getTime() - this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data,
                "time", a.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
        }, categoryToCoordinate: function (a) {
            return this.chart ? (a = this.chart.getCategoryIndexByValue(a), this.getCoordinate(a - this.start)) : NaN
        }, coordinateToDate: function (a) {
            return this.equalSpacing ? (a = this.xToIndex(a), new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
        }, getCoordinate: function (a) {
            a *= this.stepWidth;
            this.startOnAxis || (a += this.stepWidth / 2);
            return Math.round(a)
        }
    })
})();