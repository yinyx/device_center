AmCharts.AmSerialChart = AmCharts.Class({
    inherits: AmCharts.AmRectangularChart, construct: function (a) {
        this.type = "serial";
        AmCharts.AmSerialChart.base.construct.call(this, a);
        this.cname = "AmSerialChart";
        this.theme = a;
        this.createEvents("changed");
        this.columnSpacing = 5;
        this.columnSpacing3D = 0;
        this.columnWidth = .8;
        this.updateScrollbar = !0;
        var b = new AmCharts.CategoryAxis(a);
        b.chart = this;
        this.categoryAxis = b;
        this.zoomOutOnDataUpdate = !0;
        this.mouseWheelZoomEnabled = this.mouseWheelScrollEnabled = this.rotate = this.skipZoom =
            !1;
        this.minSelectedTime = 0;
        AmCharts.applyTheme(this, a, this.cname)
    }, initChart: function () {
        AmCharts.AmSerialChart.base.initChart.call(this);
        this.updateCategoryAxis(this.categoryAxis, this.rotate, "categoryAxis");
        this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
        var a = this.chartCursor;
        a && (a.updateData(), a.fullWidth && (a.fullRectSet = this.cursorLineSet));
        var a = this.countColumns(), b = this.graphs, c;
        for (c = 0; c < b.length; c++) b[c].columnCount = a;
        this.updateScrollbar = !0;
        this.drawChart();
        this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins());
        (this.mouseWheelScrollEnabled || this.mouseWheelZoomEnabled) && this.addMouseWheel()
    }, handleWheelReal: function (a, b) {
        if (!this.wheelBusy) {
            var c = this.categoryAxis, d = c.parseDates, e = c.minDuration(), f = c = 1;
            this.mouseWheelZoomEnabled ? b || (c = -1) : b && (c = -1);
            var l = this.chartData.length, h = this.lastTime, g = this.firstTime;
            0 > a ? d ? (l = this.endTime - this.startTime, d = this.startTime + c * e, e = this.endTime + f * e, 0 < f && 0 < c && e >= h && (e = h, d = h - l), this.zoomToDates(new Date(d),
                new Date(e))) : (0 < f && 0 < c && this.end >= l - 1 && (c = f = 0), d = this.start + c, e = this.end + f, this.zoomToIndexes(d, e)) : d ? (l = this.endTime - this.startTime, d = this.startTime - c * e, e = this.endTime - f * e, 0 < f && 0 < c && d <= g && (d = g, e = g + l), this.zoomToDates(new Date(d), new Date(e))) : (0 < f && 0 < c && 1 > this.start && (c = f = 0), d = this.start - c, e = this.end - f, this.zoomToIndexes(d, e))
        }
    }, validateData: function (a) {
        this.marginsUpdated = !1;
        this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN);
        AmCharts.AmSerialChart.base.validateData.call(this)
    },
    drawChart: function () {
        AmCharts.AmSerialChart.base.drawChart.call(this);
        var a = this.chartData;
        if (AmCharts.ifArray(a)) {
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
        AmCharts.callMethod("destroy", [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor])
    }, updateCategoryAxis: function (a, b, c) {
        a.chart = this;
        a.id = c;
        a.rotate = b;
        a.axisRenderer = AmCharts.RecAxis;
        a.guideFillRenderer = AmCharts.RecFill;
        a.axisItemRenderer = AmCharts.RecItem;
        a.setOrientation(!this.rotate);
        a.x = this.marginLeftReal;
        a.y = this.marginTopReal;
        a.dx = this.dx;
        a.dy = this.dy;
        a.width = this.plotAreaWidth - 1;
        a.height = this.plotAreaHeight -
            1;
        a.viW = this.plotAreaWidth - 1;
        a.viH = this.plotAreaHeight - 1;
        a.viX = this.marginLeftReal;
        a.viY = this.marginTopReal;
        a.marginsChanged = !0
    }, updateValueAxes: function () {
        AmCharts.AmSerialChart.base.updateValueAxes.call(this);
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
        0 < c.length &&
        (this.firstTime = this.getStartTime(c[0].time), this.lastTime = this.getEndTime(c[c.length - 1].time))
    }, getStartTime: function (a) {
        var b = this.categoryAxis;
        return AmCharts.resetDateToMin(new Date(a), b.minPeriod, 1, b.firstDayOfWeek).getTime()
    }, getEndTime: function (a) {
        var b = AmCharts.extractPeriod(this.categoryAxis.minPeriod);
        return AmCharts.changeDate(new Date(a), b.period, b.count, !0).getTime() - 1
    }, updateMargins: function () {
        AmCharts.AmSerialChart.base.updateMargins.call(this);
        var a = this.chartScrollbar;
        a && (this.getScrollbarPosition(a,
            this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate))
    }, updateScrollbars: function () {
        AmCharts.AmSerialChart.base.updateScrollbars.call(this);
        this.updateChartScrollbar(this.chartScrollbar, this.rotate)
    }, zoom: function (a, b) {
        var c = this.categoryAxis;
        c.parseDates && !c.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b);
        this.updateLegendValues()
    }, timeZoom: function (a, b) {
        var c = this.maxSelectedTime;
        isNaN(c) || (b != this.endTime && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.startTime && b - a > c &&
        (b = a + c, this.updateScrollbar = !0));
        var d = this.minSelectedTime;
        if (0 < d && b - a < d) {
            var e = Math.round(a + (b - a) / 2), d = Math.round(d / 2);
            a = e - d;
            b = e + d
        }
        var f = this.chartData, e = this.categoryAxis;
        if (AmCharts.ifArray(f) && (a != this.startTime || b != this.endTime)) {
            var l = e.minDuration(), d = this.firstTime, h = this.lastTime;
            a || (a = d, isNaN(c) || (a = h - c));
            b || (b = h);
            a > h && (a = h);
            b < d && (b = d);
            a < d && (a = d);
            b > h && (b = h);
            b < a && (b = a + l);
            b - a < l / 5 && (b < h ? b = a + l / 5 : a = b - l / 5);
            this.startTime = a;
            this.endTime = b;
            c = f.length - 1;
            l = this.getClosestIndex(f, "time", a, !0, 0, c);
            f = this.getClosestIndex(f, "time", b, !1, l, c);
            e.timeZoom(a, b);
            e.zoom(l, f);
            this.start = AmCharts.fitToBounds(l, 0, c);
            this.end = AmCharts.fitToBounds(f, 0, c);
            this.zoomAxesAndGraphs();
            this.zoomScrollbar();
            a != d || b != h ? this.showZB(!0) : this.showZB(!1);
            this.updateColumnsDepth();
            this.dispatchTimeZoomEvent()
        }
    }, indexZoom: function (a, b) {
        var c = this.maxSelectedSeries;
        isNaN(c) || (b != this.end && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.start && b - a > c && (b = a + c, this.updateScrollbar = !0));
        if (a != this.start || b != this.end) {
            var d = this.chartData.length -
                1;
            isNaN(a) && (a = 0, isNaN(c) || (a = d - c));
            isNaN(b) && (b = d);
            b < a && (b = a);
            b > d && (b = d);
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
        AmCharts.AmSerialChart.base.updateGraphs.call(this);
        var a = this.graphs, b;
        for (b = 0; b < a.length; b++) {
            var c = a[b];
            c.columnWidthReal = this.columnWidth;
            c.categoryAxis =
                this.categoryAxis;
            AmCharts.isString(c.fillToGraph) && (c.fillToGraph = this.getGraphById(c.fillToGraph))
        }
    }, updateColumnsDepth: function () {
        var a, b = this.graphs, c;
        AmCharts.remove(this.columnsSet);
        this.columnsArray = [];
        for (a = 0; a < b.length; a++) {
            c = b[a];
            var d = c.columnsArray;
            if (d) {
                var e;
                for (e = 0; e < d.length; e++) this.columnsArray.push(d[e])
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
        return a.depth > b.depth ? 1 : -1
    }, zoomScrollbar: function () {
        var a = this.chartScrollbar, b = this.categoryAxis;
        a && this.updateScrollbar && (b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end), this.updateScrollbar = !0)
    }, updateTrendLines: function () {
        var a = this.trendLines, b;
        for (b = 0; b < a.length; b++) {
            var c = a[b], c = AmCharts.processObject(c, AmCharts.TrendLine, this.theme);
            a[b] = c;
            c.chart = this;
            AmCharts.isString(c.valueAxis) &&
            (c.valueAxis = this.getValueAxisById(c.valueAxis));
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
        var a = 0, b = this.valueAxes.length, c = this.graphs.length,
            d, e, f = !1, l, h;
        for (h = 0; h < b; h++) {
            e = this.valueAxes[h];
            var g = e.stackType;
            if ("100%" == g || "regular" == g) for (f = !1, l = 0; l < c; l++) d = this.graphs[l], d.tcc = 1, d.valueAxis == e && "column" == d.type && (!f && d.stackable && (a++, f = !0), (!d.stackable && d.clustered || d.newStack) && a++, d.columnIndex = a - 1, d.clustered || (d.columnIndex = 0));
            if ("none" == g || "3d" == g) {
                f = !1;
                for (l = 0; l < c; l++) d = this.graphs[l], d.valueAxis == e && "column" == d.type && (d.clustered ? (d.tcc = 1, d.newStack && (a = 0), d.hidden || (d.columnIndex = a, a++)) : d.hidden || (f = !0, d.tcc = 1, d.columnIndex =
                    0));
                f && 0 == a && (a = 1)
            }
            if ("3d" == g) {
                e = 1;
                for (h = 0; h < c; h++) d = this.graphs[h], d.newStack && e++, d.depthCount = e, d.tcc = a;
                a = e
            }
        }
        return a
    }, parseData: function () {
        AmCharts.AmSerialChart.base.parseData.call(this);
        this.parseSerialData()
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
        this.updateScrollbar =
            !1;
        this.zoom(a.start, a.end)
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
            var b = this.categoryAxis, c = AmCharts.extractPeriod(b.minPeriod).period,
                b = b.dateFormatsObject[c];
            a.startValue = AmCharts.formatDate(a.startDate, b, this);
            a.endValue = AmCharts.formatDate(a.endDate, b, this);
            a.chart = this;
            a.target = this;
            this.fire(a.type, a)
        }
    }, dispatchIndexZoomEvent: function () {
        if (this.prevStartIndex != this.start || this.prevEndIndex != this.end) {
            this.startIndex = this.start;
            this.endIndex = this.end;
            var a = this.chartData;
            if (AmCharts.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
                var b = {chart: this, target: this, type: "zoomed"};
                b.startIndex = this.start;
                b.endIndex = this.end;
                b.startValue =
                    a[this.start].category;
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
        this.legend &&
        this.legend.updateValues()
    }, getClosestIndex: function (a, b, c, d, e, f) {
        0 > e && (e = 0);
        f > a.length - 1 && (f = a.length - 1);
        var l = e + Math.round((f - e) / 2), h = a[l][b];
        if (1 >= f - e) {
            if (d) return e;
            d = a[f][b];
            return Math.abs(a[e][b] - c) < Math.abs(d - c) ? e : f
        }
        return c == h ? l : c < h ? this.getClosestIndex(a, b, c, d, e, l) : this.getClosestIndex(a, b, c, d, l, f)
    }, zoomToIndexes: function (a, b) {
        this.updateScrollbar = !0;
        var c = this.chartData;
        if (c) {
            var d = c.length;
            0 < d && (0 > a && (a = 0), b > d - 1 && (b = d - 1), d = this.categoryAxis, d.parseDates && !d.equalSpacing ? this.zoom(c[a].time,
                this.getEndTime(c[b].time)) : this.zoom(a, b))
        }
    }, zoomToDates: function (a, b) {
        this.updateScrollbar = !0;
        var c = this.chartData;
        if (this.categoryAxis.equalSpacing) {
            var d = this.getClosestIndex(c, "time", a.getTime(), !0, 0, c.length);
            b = AmCharts.resetDateToMin(b, this.categoryAxis.minPeriod, 1);
            c = this.getClosestIndex(c, "time", b.getTime(), !1, 0, c.length);
            this.zoom(d, c)
        } else this.zoom(a.getTime(), b.getTime())
    }, zoomToCategoryValues: function (a, b) {
        this.updateScrollbar = !0;
        this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b))
    },
    formatPeriodString: function (a, b) {
        if (b) {
            var c = ["value", "open", "low", "high", "close"],
                d = "value open low high close average sum count".split(" "), e = b.valueAxis, f = this.chartData,
                l = b.numberFormatter;
            l || (l = this.nf);
            for (var h = 0; h < c.length; h++) {
                for (var g = c[h], k = 0, m = 0, p, v, r, s, n, w = 0, q = 0, x, t, z, y, B, D = this.start; D <= this.end; D++) {
                    var u = f[D];
                    if (u && (u = u.axes[e.id].graphs[b.id])) {
                        if (u.values) {
                            var A = u.values[g];
                            if (!isNaN(A)) {
                                isNaN(p) && (p = A);
                                v = A;
                                if (isNaN(r) || r > A) r = A;
                                if (isNaN(s) || s < A) s = A;
                                n = AmCharts.getDecimals(k);
                                var H =
                                    AmCharts.getDecimals(A), k = k + A, k = AmCharts.roundTo(k, Math.max(n, H));
                                m++;
                                n = k / m
                            }
                        }
                        if (u.percents && (u = u.percents[g], !isNaN(u))) {
                            isNaN(x) && (x = u);
                            t = u;
                            if (isNaN(z) || z > u) z = u;
                            if (isNaN(y) || y < u) y = u;
                            B = AmCharts.getDecimals(w);
                            A = AmCharts.getDecimals(u);
                            w += u;
                            w = AmCharts.roundTo(w, Math.max(B, A));
                            q++;
                            B = w / q
                        }
                    }
                }
                w = {open: x, close: t, high: y, low: z, average: B, sum: w, count: q};
                a = AmCharts.formatValue(a, {
                    open: p,
                    close: v,
                    high: s,
                    low: r,
                    average: n,
                    sum: k,
                    count: m
                }, d, l, g + "\\.", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
                a = AmCharts.formatValue(a, w, d, this.pf, "percents\\." + g + "\\.")
            }
        }
        return a = AmCharts.cleanFromEmpty(a)
    }, formatString: function (a, b, c) {
        var d = b.graph;
        if (-1 != a.indexOf("[[category]]")) {
            var e = b.serialDataItem.category;
            if (this.categoryAxis.parseDates) {
                var f = this.balloonDateFormat, l = this.chartCursor;
                l && (f = l.categoryBalloonDateFormat);
                -1 != a.indexOf("[[category]]") && (f = AmCharts.formatDate(e, f, this), -1 != f.indexOf("fff") && (f = AmCharts.formatMilliseconds(f, e)), e = f)
            }
            a = a.replace(/\[\[category\]\]/g, String(e))
        }
        d = d.numberFormatter;
        d || (d = this.nf);
        e = b.graph.valueAxis;
        (f = e.duration) && !isNaN(b.values.value) && (e = AmCharts.formatDuration(b.values.value, f, "", e.durationUnits, e.maxInterval, d), a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), e));
        e = "value open low high close total".split(" ");
        f = this.pf;
        a = AmCharts.formatValue(a, b.percents, e, f, "percents\\.");
        a = AmCharts.formatValue(a, b.values, e, d, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
        a = AmCharts.formatValue(a, b.values, ["percents"], f);
        -1 != a.indexOf("[[") && (a =
            AmCharts.formatDataContextValue(a, b.dataContext));
        return a = AmCharts.AmSerialChart.base.formatString.call(this, a, b, c)
    }, addChartScrollbar: function (a) {
        AmCharts.callMethod("destroy", [this.chartScrollbar]);
        a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarZoom));
        this.rotate ? void 0 === a.width && (a.width = a.scrollbarHeight) : void 0 === a.height && (a.height = a.scrollbarHeight);
        this.chartScrollbar = a
    }, removeChartScrollbar: function () {
        AmCharts.callMethod("destroy", [this.chartScrollbar]);
        this.chartScrollbar =
            null
    }, handleReleaseOutside: function (a) {
        AmCharts.AmSerialChart.base.handleReleaseOutside.call(this, a);
        AmCharts.callMethod("handleReleaseOutside", [this.chartScrollbar])
    }
});
AmCharts.Cuboid = AmCharts.Class({
    construct: function (a, b, c, d, e, f, l, h, g, k, m, p, v, r, s, n) {
        this.set = a.set();
        this.container = a;
        this.h = Math.round(c);
        this.w = Math.round(b);
        this.dx = d;
        this.dy = e;
        this.colors = f;
        this.alpha = l;
        this.bwidth = h;
        this.bcolor = g;
        this.balpha = k;
        this.dashLength = r;
        this.topRadius = n;
        this.pattern = s;
        (this.rotate = v) ? 0 > b && 0 === m && (m = 180) : 0 > c && 270 == m && (m = 90);
        this.gradientRotation = m;
        0 === d && 0 === e && (this.cornerRadius = p);
        this.draw()
    }, draw: function () {
        var a = this.set;
        a.clear();
        var b = this.container, c = this.w, d =
                this.h, e = this.dx, f = this.dy, l = this.colors, h = this.alpha, g = this.bwidth, k = this.bcolor,
            m = this.balpha, p = this.gradientRotation, v = this.cornerRadius, r = this.dashLength, s = this.pattern,
            n = this.topRadius, w = l, q = l;
        "object" == typeof l && (w = l[0], q = l[l.length - 1]);
        var x, t, z, y, B, D, u, A, H, M = h;
        s && (h = 0);
        var C, E, F, G, I = this.rotate;
        if (0 < Math.abs(e) || 0 < Math.abs(f)) if (isNaN(n)) u = q, q = AmCharts.adjustLuminosity(w, -.2), q = AmCharts.adjustLuminosity(w, -.2), x = AmCharts.polygon(b, [0, e, c + e, c, 0], [0, f, f, 0, 0], q, h, 1, k, 0, p), 0 < m && (H = AmCharts.line(b,
            [0, e, c + e], [0, f, f], k, m, g, r)), t = AmCharts.polygon(b, [0, 0, c, c, 0], [0, d, d, 0, 0], q, h, 1, k, 0, p), t.translate(e, f), 0 < m && (z = AmCharts.line(b, [e, e], [f, f + d], k, m, g, r)), y = AmCharts.polygon(b, [0, 0, e, e, 0], [0, d, d + f, f, 0], q, h, 1, k, 0, p), B = AmCharts.polygon(b, [c, c, c + e, c + e, c], [0, d, d + f, f, 0], q, h, 1, k, 0, p), 0 < m && (D = AmCharts.line(b, [c, c + e, c + e, c], [0, f, d + f, d], k, m, g, r)), q = AmCharts.adjustLuminosity(u, .2), u = AmCharts.polygon(b, [0, e, c + e, c, 0], [d, d + f, d + f, d, d], q, h, 1, k, 0, p), 0 < m && (A = AmCharts.line(b, [0, e, c + e], [d, d + f, d + f], k, m, g, r)); else {
            var J, K,
                L;
            I ? (J = d / 2, q = e / 2, L = d / 2, K = c + e / 2, E = Math.abs(d / 2), C = Math.abs(e / 2)) : (q = c / 2, J = f / 2, K = c / 2, L = d + f / 2 + 1, C = Math.abs(c / 2), E = Math.abs(f / 2));
            F = C * n;
            G = E * n;
            .1 < C && .1 < C && (x = AmCharts.circle(b, C, w, h, g, k, m, !1, E), x.translate(q, J));
            .1 < F && .1 < F && (u = AmCharts.circle(b, F, AmCharts.adjustLuminosity(w, .5), h, g, k, m, !1, G), u.translate(K, L))
        }
        h = M;
        1 > Math.abs(d) && (d = 0);
        1 > Math.abs(c) && (c = 0);
        !isNaN(n) && (0 < Math.abs(e) || 0 < Math.abs(f)) ? (l = [w], l = {
            fill: l,
            stroke: k,
            "stroke-width": g,
            "stroke-opacity": m,
            "fill-opacity": h
        }, I ? (h = "M0,0 L" + c + "," + (d / 2 - d /
            2 * n), g = " B", 0 < c && (g = " A"), AmCharts.VML ? (h += g + Math.round(c - F) + "," + Math.round(d / 2 - G) + "," + Math.round(c + F) + "," + Math.round(d / 2 + G) + "," + c + ",0," + c + "," + d, h = h + (" L0," + d) + (g + Math.round(-C) + "," + Math.round(d / 2 - E) + "," + Math.round(C) + "," + Math.round(d / 2 + E) + ",0," + d + ",0,0")) : (h += "A" + F + "," + G + ",0,0,0," + c + "," + (d - d / 2 * (1 - n)) + "L0," + d, h += "A" + C + "," + E + ",0,0,1,0,0"), C = 90) : (g = c / 2 - c / 2 * n, h = "M0,0 L" + g + "," + d, AmCharts.VML ? (h = "M0,0 L" + g + "," + d, g = " B", 0 > d && (g = " A"), h += g + Math.round(c / 2 - F) + "," + Math.round(d - G) + "," + Math.round(c / 2 + F) + "," +
            Math.round(d + G) + ",0," + d + "," + c + "," + d, h += " L" + c + ",0", h += g + Math.round(c / 2 + C) + "," + Math.round(E) + "," + Math.round(c / 2 - C) + "," + Math.round(-E) + "," + c + ",0,0,0") : (h += "A" + F + "," + G + ",0,0,0," + (c - c / 2 * (1 - n)) + "," + d + "L" + c + ",0", h += "A" + C + "," + E + ",0,0,1,0,0"), C = 180), b = b.path(h).attr(l), b.gradient("linearGradient", [w, AmCharts.adjustLuminosity(w, -.3), AmCharts.adjustLuminosity(w, -.3), w], C), I ? b.translate(e / 2, 0) : b.translate(0, f / 2)) : b = 0 === d ? AmCharts.line(b, [0, c], [0, 0], k, m, g, r) : 0 === c ? AmCharts.line(b, [0, 0], [0, d], k, m, g, r) : 0 < v ? AmCharts.rect(b,
            c, d, l, h, g, k, m, v, p, r) : AmCharts.polygon(b, [0, 0, c, c, 0], [0, d, d, 0, 0], l, h, g, k, m, p, !1, r);
        c = isNaN(n) ? 0 > d ? [x, H, t, z, y, B, D, u, A, b] : [u, A, t, z, y, B, x, H, D, b] : I ? 0 < c ? [x, b, u] : [u, b, x] : 0 > d ? [x, b, u] : [u, b, x];
        for (d = 0; d < c.length; d++) (e = c[d]) && a.push(e);
        s && b.pattern(s)
    }, width: function (a) {
        this.w = Math.round(a);
        this.draw()
    }, height: function (a) {
        this.h = Math.round(a);
        this.draw()
    }, animateHeight: function (a, b) {
        var c = this;
        c.easing = b;
        c.totalFrames = Math.round(1E3 * a / AmCharts.updateRate);
        c.rh = c.h;
        c.frame = 0;
        c.height(1);
        setTimeout(function () {
                c.updateHeight.call(c)
            },
            AmCharts.updateRate)
    }, updateHeight: function () {
        var a = this;
        a.frame++;
        var b = a.totalFrames;
        a.frame <= b && (b = a.easing(0, a.frame, 1, a.rh - 1, b), a.height(b), setTimeout(function () {
            a.updateHeight.call(a)
        }, AmCharts.updateRate))
    }, animateWidth: function (a, b) {
        var c = this;
        c.easing = b;
        c.totalFrames = Math.round(1E3 * a / AmCharts.updateRate);
        c.rw = c.w;
        c.frame = 0;
        c.width(1);
        setTimeout(function () {
            c.updateWidth.call(c)
        }, AmCharts.updateRate)
    }, updateWidth: function () {
        var a = this;
        a.frame++;
        var b = a.totalFrames;
        a.frame <= b && (b = a.easing(0,
            a.frame, 1, a.rw - 1, b), a.width(b), setTimeout(function () {
            a.updateWidth.call(a)
        }, AmCharts.updateRate))
    }
});
AmCharts.CategoryAxis = AmCharts.Class({
    inherits: AmCharts.AxisBase, construct: function (a) {
        this.cname = "CategoryAxis";
        AmCharts.CategoryAxis.base.construct.call(this, a);
        this.minPeriod = "DD";
        this.equalSpacing = this.parseDates = !1;
        this.position = "bottom";
        this.startOnAxis = !1;
        this.firstDayOfWeek = 1;
        this.gridPosition = "middle";
        this.markPeriodChange = this.boldPeriodBeginning = !0;
        this.safeDistance = 30;
        this.centerLabelOnFullPeriod = !0;
        this.periods = [{period: "ss", count: 1}, {period: "ss", count: 5}, {period: "ss", count: 10}, {
            period: "ss",
            count: 30
        }, {period: "mm", count: 1}, {period: "mm", count: 5}, {period: "mm", count: 10}, {
            period: "mm",
            count: 30
        }, {period: "hh", count: 1}, {period: "hh", count: 3}, {period: "hh", count: 6}, {
            period: "hh",
            count: 12
        }, {period: "DD", count: 1}, {period: "DD", count: 2}, {period: "DD", count: 3}, {
            period: "DD",
            count: 4
        }, {period: "DD", count: 5}, {period: "WW", count: 1}, {period: "MM", count: 1}, {
            period: "MM",
            count: 2
        }, {period: "MM", count: 3}, {period: "MM", count: 6}, {period: "YYYY", count: 1}, {
            period: "YYYY",
            count: 2
        }, {period: "YYYY", count: 5}, {period: "YYYY", count: 10},
            {period: "YYYY", count: 50}, {period: "YYYY", count: 100}];
        this.dateFormats = [{period: "fff", format: "JJ:NN:SS"}, {period: "ss", format: "JJ:NN:SS"}, {
            period: "mm",
            format: "JJ:NN"
        }, {period: "hh", format: "JJ:NN"}, {period: "DD", format: "MMM DD"}, {
            period: "WW",
            format: "MMM DD"
        }, {period: "MM", format: "MMM"}, {period: "YYYY", format: "YYYY"}];
        this.nextPeriod = {};
        this.nextPeriod.fff = "ss";
        this.nextPeriod.ss = "mm";
        this.nextPeriod.mm = "hh";
        this.nextPeriod.hh = "DD";
        this.nextPeriod.DD = "MM";
        this.nextPeriod.MM = "YYYY";
        AmCharts.applyTheme(this,
            a, this.cname)
    }, draw: function () {
        AmCharts.CategoryAxis.base.draw.call(this);
        this.generateDFObject();
        var a = this.chart.chartData;
        this.data = a;
        if (AmCharts.ifArray(a)) {
            var b, c = this.chart, d = this.start, e = this.labelFrequency, f = 0;
            b = this.end - d + 1;
            var l = this.gridCountR, h = this.showFirstLabel, g = this.showLastLabel, k, m = "",
                p = AmCharts.extractPeriod(this.minPeriod);
            k = AmCharts.getPeriodDuration(p.period, p.count);
            var v, r, s, n, w, q;
            v = this.rotate;
            var x = this.firstDayOfWeek, t = this.boldPeriodBeginning, a = AmCharts.resetDateToMin(new Date(a[a.length -
            1].time + 1.05 * k), this.minPeriod, 1, x).getTime(), z;
            this.endTime > a && (this.endTime = a);
            q = this.minorGridEnabled;
            var y, a = this.gridAlpha, B;
            if (this.parseDates && !this.equalSpacing) {
                this.timeDifference = this.endTime - this.startTime;
                d = this.choosePeriod(0);
                e = d.period;
                v = d.count;
                r = AmCharts.getPeriodDuration(e, v);
                r < k && (e = p.period, v = p.count, r = k);
                s = e;
                "WW" == s && (s = "DD");
                this.stepWidth = this.getStepWidth(this.timeDifference);
                var l = Math.ceil(this.timeDifference / r) + 5,
                    D = m = AmCharts.resetDateToMin(new Date(this.startTime - r), e,
                        v, x).getTime();
                s == e && 1 == v && this.centerLabelOnFullPeriod && (w = r * this.stepWidth);
                this.cellWidth = k * this.stepWidth;
                b = Math.round(m / r);
                d = -1;
                b / 2 == Math.round(b / 2) && (d = -2, m -= r);
                var u = c.firstTime, A = 0;
                q && 1 < v && (y = this.chooseMinorFrequency(v), B = AmCharts.getPeriodDuration(e, y));
                if (0 < this.gridCountR) for (b = d; b <= l; b++) {
                    p = u + r * (b + Math.floor((D - u) / r)) - A;
                    "DD" == e && (p += 36E5);
                    p = AmCharts.resetDateToMin(new Date(p), e, v, x).getTime();
                    "MM" == e && (q = (p - m) / r, 1.5 <= (p - m) / r && (p = p - (q - 1) * r + AmCharts.getPeriodDuration("DD", 3), p = AmCharts.resetDateToMin(new Date(p),
                        e, 1).getTime(), A += r));
                    k = (p - this.startTime) * this.stepWidth;
                    q = !1;
                    this.nextPeriod[s] && (q = this.checkPeriodChange(this.nextPeriod[s], 1, p, m, s));
                    z = !1;
                    q && this.markPeriodChange ? (q = this.dateFormatsObject[this.nextPeriod[s]], this.twoLineMode && (q = this.dateFormatsObject[s] + "\n" + q, q = AmCharts.fixBrakes(q)), z = !0) : q = this.dateFormatsObject[s];
                    t || (z = !1);
                    m = AmCharts.formatDate(new Date(p), q, c);
                    if (b == d && !h || b == l && !g) m = " ";
                    this.labelFunction && (m = this.labelFunction(m, new Date(p), this, e, v, n).toString());
                    this.boldLabels &&
                    (z = !0);
                    n = new this.axisItemRenderer(this, k, m, !1, w, 0, !1, z);
                    this.pushAxisItem(n);
                    n = m = p;
                    if (!isNaN(y)) for (k = 1; k < v; k += y) this.gridAlpha = this.minorGridAlpha, q = p + B * k, q = AmCharts.resetDateToMin(new Date(q), e, y, x).getTime(), q = new this.axisItemRenderer(this, (q - this.startTime) * this.stepWidth), this.pushAxisItem(q);
                    this.gridAlpha = a
                }
            } else if (!this.parseDates) {
                if (this.cellWidth = this.getStepWidth(b), b < l && (l = b), f += this.start, this.stepWidth = this.getStepWidth(b), 0 < l) for (t = Math.floor(b / l), y = this.chooseMinorFrequency(t),
                                                                                                                                                     k = f, k / 2 == Math.round(k / 2) && k--, 0 > k && (k = 0), l = 0, this.end - k + 1 >= this.autoRotateCount && (this.labelRotation = this.autoRotateAngle), b = k; b <= this.end + 2; b++) {
                    n = !1;
                    0 <= b && b < this.data.length ? (s = this.data[b], m = s.category, n = s.forceShow) : m = "";
                    if (q && !isNaN(y)) if (b / y == Math.round(b / y) || n) b / t == Math.round(b / t) || n || (this.gridAlpha = this.minorGridAlpha, m = void 0); else continue; else if (b / t != Math.round(b / t) && !n) continue;
                    k = this.getCoordinate(b - f);
                    n = 0;
                    "start" == this.gridPosition && (k -= this.cellWidth / 2, n = this.cellWidth / 2);
                    x = !0;
                    tickShift =
                        n;
                    "start" == this.tickPosition && (tickShift = 0, x = !1, n = 0);
                    if (b == d && !h || b == this.end && !g) m = void 0;
                    Math.round(l / e) != l / e && (m = void 0);
                    l++;
                    D = this.cellWidth;
                    v && (D = NaN);
                    this.labelFunction && s && (m = this.labelFunction(m, s, this));
                    m = AmCharts.fixBrakes(m);
                    z = !1;
                    this.boldLabels && (z = !0);
                    b > this.end && "start" == this.tickPosition && (m = " ");
                    n = new this.axisItemRenderer(this, k, m, x, D, n, void 0, z, tickShift, !1, s.labelColor);
                    n.serialDataItem = s;
                    this.pushAxisItem(n);
                    this.gridAlpha = a
                }
            } else if (this.parseDates && this.equalSpacing) {
                f = this.start;
                this.startTime = this.data[this.start].time;
                this.endTime = this.data[this.end].time;
                this.timeDifference = this.endTime - this.startTime;
                d = this.choosePeriod(0);
                e = d.period;
                v = d.count;
                r = AmCharts.getPeriodDuration(e, v);
                r < k && (e = p.period, v = p.count, r = k);
                s = e;
                "WW" == s && (s = "DD");
                this.stepWidth = this.getStepWidth(b);
                l = Math.ceil(this.timeDifference / r) + 1;
                m = AmCharts.resetDateToMin(new Date(this.startTime - r), e, v, x).getTime();
                this.cellWidth = this.getStepWidth(b);
                b = Math.round(m / r);
                d = -1;
                b / 2 == Math.round(b / 2) && (d = -2, m -= r);
                k = this.start;
                k / 2 == Math.round(k / 2) && k--;
                0 > k && (k = 0);
                w = this.end + 2;
                w >= this.data.length && (w = this.data.length);
                B = !1;
                B = !h;
                this.previousPos = -1E3;
                20 < this.labelRotation && (this.safeDistance = 5);
                r = k;
                if (this.data[k].time != AmCharts.resetDateToMin(new Date(this.data[k].time), e, v, x).getTime()) for (x = 0, z = m, b = k; b < w; b++) p = this.data[b].time, this.checkPeriodChange(e, v, p, z) && (x++, 2 <= x && (r = b, b = w), z = p);
                q && 1 < v && (y = this.chooseMinorFrequency(v), AmCharts.getPeriodDuration(e, y));
                if (0 < this.gridCountR) for (b = k; b < w; b++) if (p = this.data[b].time, this.checkPeriodChange(e,
                    v, p, m) && b >= r) {
                    k = this.getCoordinate(b - this.start);
                    q = !1;
                    this.nextPeriod[s] && (q = this.checkPeriodChange(this.nextPeriod[s], 1, p, m, s));
                    z = !1;
                    q && this.markPeriodChange ? (q = this.dateFormatsObject[this.nextPeriod[s]], z = !0) : q = this.dateFormatsObject[s];
                    m = AmCharts.formatDate(new Date(p), q, c);
                    if (b == d && !h || b == l && !g) m = " ";
                    B ? B = !1 : (t || (z = !1), k - this.previousPos > this.safeDistance * Math.cos(this.labelRotation * Math.PI / 180) && (this.labelFunction && (m = this.labelFunction(m, new Date(p), this, e, v, n)), this.boldLabels && (z = !0), n = new this.axisItemRenderer(this,
                        k, m, void 0, void 0, void 0, void 0, z), x = n.graphics(), this.pushAxisItem(n), n = x.getBBox().width, AmCharts.isModern || (n -= k), this.previousPos = k + n));
                    n = m = p
                } else isNaN(y) || (this.checkPeriodChange(e, y, p, D) && (this.gridAlpha = this.minorGridAlpha, k = this.getCoordinate(b - this.start), q = new this.axisItemRenderer(this, k), this.pushAxisItem(q), D = p), this.gridAlpha = a)
            }
            for (b = 0; b < this.data.length; b++) if (h = this.data[b]) g = this.parseDates && !this.equalSpacing ? Math.round((h.time - this.startTime) * this.stepWidth + this.cellWidth / 2) :
                this.getCoordinate(b - f), h.x[this.id] = g;
            h = this.guides.length;
            for (b = 0; b < h; b++) g = this.guides[b], t = t = t = a = d = NaN, y = g.above, g.toCategory && (t = c.getCategoryIndexByValue(g.toCategory), isNaN(t) || (d = this.getCoordinate(t - f), g.expand && (d += this.cellWidth / 2), n = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, g), this.pushAxisItem(n, y))), g.category && (t = c.getCategoryIndexByValue(g.category), isNaN(t) || (a = this.getCoordinate(t - f), g.expand && (a -= this.cellWidth / 2), t = (d - a) / 2, n = new this.axisItemRenderer(this, a, g.label, !0, NaN,
                t, g), this.pushAxisItem(n, y))), g.toDate && (g.toDate instanceof Date || (g.toDate = AmCharts.stringToDate(g.toDate, c.dataDateFormat)), this.equalSpacing ? (t = c.getClosestIndex(this.data, "time", g.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(t) || (d = this.getCoordinate(t - f))) : d = (g.toDate.getTime() - this.startTime) * this.stepWidth, n = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, g), this.pushAxisItem(n, y)), g.date && (g.date instanceof Date || (g.date = AmCharts.stringToDate(g.date, c.dataDateFormat)), this.equalSpacing ?
                (t = c.getClosestIndex(this.data, "time", g.date.getTime(), !1, 0, this.data.length - 1), isNaN(t) || (a = this.getCoordinate(t - f))) : a = (g.date.getTime() - this.startTime) * this.stepWidth, t = (d - a) / 2, n = "H" == this.orientation ? new this.axisItemRenderer(this, a, g.label, !1, 2 * t, NaN, g) : new this.axisItemRenderer(this, a, g.label, !1, NaN, t, g), this.pushAxisItem(n, y)), (0 < d || 0 < a) && (d < this.width || a < this.width) && (d = new this.guideFillRenderer(this, a, d, g), a = d.graphics(), this.pushAxisItem(d, y), g.graphics = a, a.index = b, g.balloonText && this.addEventListeners(a,
                g))
        }
        this.axisCreated = !0;
        c = this.x;
        f = this.y;
        this.set.translate(c, f);
        this.labelsSet.translate(c, f);
        this.positionTitle();
        (c = this.axisLine.set) && c.toFront();
        c = this.getBBox().height;
        2 < c - this.previousHeight && this.autoWrap && !this.parseDates && (this.axisCreated = this.chart.marginsUpdated = !1);
        this.previousHeight = c
    }, chooseMinorFrequency: function (a) {
        for (var b = 10; 0 < b; b--) if (a / b == Math.round(a / b)) return a / b
    }, choosePeriod: function (a) {
        var b = AmCharts.getPeriodDuration(this.periods[a].period, this.periods[a].count), c =
            Math.ceil(this.timeDifference / b), d = this.periods;
        return this.timeDifference < b && 0 < a ? d[a - 1] : c <= this.gridCountR ? d[a] : a + 1 < d.length ? this.choosePeriod(a + 1) : d[a]
    }, getStepWidth: function (a) {
        var b;
        this.startOnAxis ? (b = this.axisWidth / (a - 1), 1 == a && (b = this.axisWidth)) : b = this.axisWidth / a;
        return b
    }, getCoordinate: function (a) {
        a *= this.stepWidth;
        this.startOnAxis || (a += this.stepWidth / 2);
        return Math.round(a)
    }, timeZoom: function (a, b) {
        this.startTime = a;
        this.endTime = b
    }, minDuration: function () {
        var a = AmCharts.extractPeriod(this.minPeriod);
        return AmCharts.getPeriodDuration(a.period, a.count)
    }, checkPeriodChange: function (a, b, c, d, e) {
        c = new Date(c);
        var f = new Date(d), l = this.firstDayOfWeek;
        d = b;
        "DD" == a && (b = 1);
        c = AmCharts.resetDateToMin(c, a, b, l).getTime();
        b = AmCharts.resetDateToMin(f, a, b, l).getTime();
        return "DD" == a && "hh" != e && c - b <= AmCharts.getPeriodDuration(a, d) ? !1 : c != b ? !0 : !1
    }, generateDFObject: function () {
        this.dateFormatsObject = {};
        var a;
        for (a = 0; a < this.dateFormats.length; a++) {
            var b = this.dateFormats[a];
            this.dateFormatsObject[b.period] = b.format
        }
    }, xToIndex: function (a) {
        var b =
            this.data, c = this.chart, d = c.rotate, e = this.stepWidth;
        this.parseDates && !this.equalSpacing ? (a = this.startTime + Math.round(a / e) - this.minDuration() / 2, c = c.getClosestIndex(b, "time", a, !1, this.start, this.end + 1)) : (this.startOnAxis || (a -= e / 2), c = this.start + Math.round(a / e));
        var c = AmCharts.fitToBounds(c, 0, b.length - 1), f;
        b[c] && (f = b[c].x[this.id]);
        d ? f > this.height + 1 && c-- : f > this.width + 1 && c--;
        0 > f && c++;
        return c = AmCharts.fitToBounds(c, 0, b.length - 1)
    }, dateToCoordinate: function (a) {
        return this.parseDates && !this.equalSpacing ? (a.getTime() -
            this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data, "time", a.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
    }, categoryToCoordinate: function (a) {
        return this.chart ? (a = this.chart.getCategoryIndexByValue(a), this.getCoordinate(a - this.start)) : NaN
    }, coordinateToDate: function (a) {
        return this.equalSpacing ? (a = this.xToIndex(a), new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
    }
});