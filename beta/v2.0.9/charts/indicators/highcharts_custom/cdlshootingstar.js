define(["indicator_base","highstock"],function(a){function b(b,c){var d=c,e=a.extractPriceForAppliedTO(a.OPEN,b,d),f=a.extractPriceForAppliedTO(a.CLOSE,b,d),g=a.extractPriceForAppliedTO(a.LOW,b,d),h=a.extractPriceForAppliedTO(a.HIGH,b,d),i=Math.abs(100*(e-f)/e),j=Math.abs(100*(e-g)/e),k=Math.abs(100*(f-g)/f),l=Math.abs(e-f),m=h-Math.max(e,f),n=m>=2*l,o=1>=i&&1>=j&&.5>=k;return n&&o}var c={},d={};return{init:function(){!function(a,e,f){function g(a,e){var g=this,h=g.chart;for(var i in d)if(d[i]&&d[i].options&&d[i].options.data&&d[i].options.data.length>0&&c[i].parentSeriesID==g.options.id&&d[i].chart===h){var j=g.options.data,k=f.findIndexInDataForTime(j,a);if(k>=1){var l=null;b(j,k)&&(l={x:j[k].x||j[k][0],title:'<span style="color : red">SS</span>',text:"Shooting Star"});for(var m=-1,n=d[i].data.length-1;n>=0;n--)if((d[i].data[n].x||d[i].data[n][0])==(j[k].x||j[k][0])){m=n;break}l?(e&&m>=0&&d[i].data[m].remove(),d[i].addPoint(l)):m>=0&&d[i].data[m].remove()}}}a&&!a.Series.prototype.addCDLSHOOTINGSTAR&&(a.Series.prototype.addCDLSHOOTINGSTAR=function(a){var f=this.options.id;a=e.extend({parentSeriesID:f},a);var g="_"+(new Date).getTime(),h=this.options.data||[];if(h&&h.length>0){for(var i=[],j=2;j<h.length;j++)b(h,j)&&i.push({x:h[j].x||h[j][0],title:'<span style="color : red">SS</span>',text:"Shooting Star"});var k=this.chart;c[g]=a;d[g]=k.addSeries({id:g,name:"CDLSHOOTINGSTAR",data:i,type:"flags",onSeries:f,shape:"flag",turboThreshold:0},!1,!1),e(d[g]).data({isIndicator:!0,indicatorID:"cdlshootingstar",parentSeriesID:a.parentSeriesID}),k.redraw()}return g},a.Series.prototype.removeCDLSHOOTINGSTAR=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),d[a]=null,b.redraw()},a.Series.prototype.preRemovalCheckCDLSHOOTINGSTAR=function(a){return{isMainIndicator:!0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,h){a.call(this,b,d,e,h),f.checkCurrentSeriesHasIndicator(c,this.options.id)&&g.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),f.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&g.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});