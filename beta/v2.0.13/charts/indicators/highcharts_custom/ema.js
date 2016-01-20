define(["indicator_base","highstock"],function(a){var b={},c={};return{init:function(){!function(d,e){function f(d,e){var f=this,g=f.chart;for(var h in c)if(c[h]&&c[h].options&&c[h].options.data&&c[h].options.data.length>0&&b[h].parentSeriesID==f.options.id&&c[h].chart===g){var i=f.options.data,j=c[h].options.data,k=b[h],l=a.findIndexInDataForTime(i,d);if(l>=1){var m={data:i,maData:j,index:l,period:k.period,type:this.options.type,appliedTo:k.appliedTo,isIndicatorData:!1},n=a.calculateEMAValue(m);e?c[h].data[l].update({y:a.toFixed(n,4)}):c[h].addPoint([i[l].x||i[l][0],a.toFixed(n,4)],!0,!0,!1)}}}d&&!d.Series.prototype.addEMA&&(d.Series.prototype.addEMA=function(d){var f=this.options.id;d=e.extend({period:21,stroke:"red",strokeWidth:2,dashStyle:"line",levels:[],appliedTo:a.CLOSE,parentSeriesID:f},d);var g="_"+(new Date).getTime(),h=this.options.data||[];if(!(d.period>=h.length)){if(h&&h.length>0){for(var i=[],j=0;j<h.length;j++){var k={data:h,maData:i,index:j,period:d.period,type:this.options.type,appliedTo:d.appliedTo,isIndicatorData:!1},l=a.calculateEMAValue(k);i.push([h[j].x||h[j][0],a.toFixed(l,4)])}var m=this.chart;b[g]=d;var n=this;c[g]=m.addSeries({id:g,name:"EMA ("+d.period+", "+a.appliedPriceString(d.period)+")",data:i,type:"line",dataGrouping:n.options.dataGrouping,opposite:n.options.opposite,color:d.stroke,lineWidth:d.strokeWidth,dashStyle:d.dashStyle,compare:n.options.compare},!1,!1),e(c[g]).data({onChartIndicator:!0,indicatorID:"ema",isIndicator:!0,parentSeriesID:d.parentSeriesID,period:d.period}),m.redraw()}return g}},d.Series.prototype.removeEMA=function(a){var d=this.chart;b[a]=null,d.get(a).remove(),c[a]=null},d.Series.prototype.preRemovalCheckEMA=function(a){return{isMainIndicator:!0,period:b[a]?b[a].period:void 0,appliedTo:b[a]?b[a].appliedTo:void 0,isValidUniqueID:null!=b[a]}},d.wrap(d.Series.prototype,"addPoint",function(c,d,e,g,h){c.call(this,d,e,g,h),a.checkCurrentSeriesHasIndicator(b,this.options.id)&&f.call(this,d[0])}),d.wrap(d.Point.prototype,"update",function(c,d,e,g){c.call(this,d,e,g),a.checkCurrentSeriesHasIndicator(b,this.series.options.id)&&f.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});