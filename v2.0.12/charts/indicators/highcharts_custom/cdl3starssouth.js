define(["indicator_base","highstock"],function(a){function b(b,c){var d=c,f=c-1,g=c-2,h=a.extractPriceForAppliedTO(a.OPEN,b,g),i=a.extractPriceForAppliedTO(a.CLOSE,b,g),j=a.extractPriceForAppliedTO(a.LOW,b,g),k=(a.extractPriceForAppliedTO(a.HIGH,b,g),a.extractPriceForAppliedTO(a.OPEN,b,f)),l=a.extractPriceForAppliedTO(a.CLOSE,b,f),m=a.extractPriceForAppliedTO(a.LOW,b,f),n=(a.extractPriceForAppliedTO(a.HIGH,b,f),a.extractPriceForAppliedTO(a.OPEN,b,d)),o=a.extractPriceForAppliedTO(a.CLOSE,b,d),p=a.extractPriceForAppliedTO(a.LOW,b,d),q=a.extractPriceForAppliedTO(a.HIGH,b,d),r=h>i,s=k>l,t=n>o,u=Math.abs(i-h),v=Math.abs(l-k),w=Math.abs(o-n),x=Math.abs(p-Math.min(i,h)),y=Math.abs(q-Math.max(i,h)),z=r&&u>=e&&x>=e/2&&.1*u>y&&s&&m>j&&h>k&&i>l&&u>v&&t&&p>m&&n===q&&p===o&&v>w,A=!1;return{isBullishContinuation:z,isBearishContinuation:A}}var c={},d={},e=0;return{init:function(){!function(a,f,g){function h(a,e){var f=this,h=f.chart;for(var i in d)if(d[i]&&d[i].options&&d[i].options.data&&d[i].options.data.length>0&&c[i].parentSeriesID==f.options.id&&d[i].chart===h){var j=f.options.data,k=(c[i].period,g.findIndexInDataForTime(j,a));if(k>=1){var l=b(j,k),m=null;l.isBullishContinuation?m={x:j[k].x||j[k][0],title:'<span style="color : blue">TSS</span>',text:"Three Stars In The South : Bull"}:l.isBearishContinuation&&(m={x:j[k].x||j[k][0],title:'<span style="color : red">TSS</span>',text:"Three Stars In The South : Bear"});for(var n=-1,o=d[i].data.length-1;o>=0;o--)if((d[i].data[o].x||d[i].data[o][0])==(j[k].x||j[k][0])){n=o;break}m?(e&&n>=0&&d[i].data[n].remove(),d[i].addPoint(m)):n>=0&&d[i].data[n].remove()}}}a&&!a.Series.prototype.addCDL3STARSSOUTH&&(a.Series.prototype.addCDL3STARSSOUTH=function(a){var h=this.options.id;a=f.extend({parentSeriesID:h},a);var i="_"+(new Date).getTime(),j=this.options.data||[];if(j&&j.length>0){e=g.getCandleMediumHeight(j);for(var k=[],l=2;l<j.length;l++){var m=b(j,l),n=m.isBullishContinuation,o=m.isBearishContinuation;n&&k.push({x:j[l].x||j[l][0],title:'<span style="color : blue">TSS</span>',text:"Three Stars In The South : Bull"}),o&&k.push({x:j[l].x||j[l][0],title:'<span style="color : red">TSS</span>',text:"Three Stars In The South : Bear"})}var p=this.chart;c[i]=a;d[i]=p.addSeries({id:i,name:"CDL3STARSSOUTH",data:k,type:"flags",onSeries:h,shape:"flag",turboThreshold:0},!1,!1),f(d[i]).data({isIndicator:!0,indicatorID:"cdl3starssouth",parentSeriesID:a.parentSeriesID}),p.redraw()}return i},a.Series.prototype.removeCDL3STARSSOUTH=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),d[a]=null,b.redraw()},a.Series.prototype.preRemovalCheckCDL3STARSSOUTH=function(a){return{isMainIndicator:!0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,f){a.call(this,b,d,e,f),g.checkCurrentSeriesHasIndicator(c,this.options.id)&&h.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),g.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&h.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});