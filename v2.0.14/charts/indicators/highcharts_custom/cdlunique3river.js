define(["indicator_base","highstock"],function(a){function b(b,c){var d=c,f=c-1,g=c-2,h=c-3,i=a.extractPriceForAppliedTO(a.OPEN,b,h),j=a.extractPriceForAppliedTO(a.CLOSE,b,h),k=a.extractPriceForAppliedTO(a.OPEN,b,g),l=a.extractPriceForAppliedTO(a.CLOSE,b,g),m=a.extractPriceForAppliedTO(a.LOW,b,g),n=a.extractPriceForAppliedTO(a.OPEN,b,f),o=a.extractPriceForAppliedTO(a.CLOSE,b,f),p=a.extractPriceForAppliedTO(a.LOW,b,f),q=a.extractPriceForAppliedTO(a.HIGH,b,f),r=a.extractPriceForAppliedTO(a.OPEN,b,d),s=a.extractPriceForAppliedTO(a.CLOSE,b,d),t=i>j,u=k>l,v=n>o,w=s>r,x=Math.abs(n-q),y=Math.abs(n-o),z=Math.abs(p-o),A=z>=2*y&&.1*y>=x&&e>y,B=Math.abs(l-k),C=t&&u&&B>e&&j>l&&v&&A&&o>l&&k>n&&m>p&&w&&o>s,D=!1;return{isBullishContinuation:C,isBearishContinuation:D}}var c={},d={},e=0;return{init:function(){!function(a,f,g){function h(a,e){{var f=this;f.chart}for(var h in d)if(d[h]&&d[h].options&&d[h].options.data&&d[h].options.data.length>0&&c[h].parentSeriesID==f.options.id){var i=f.options.data,j=g.findIndexInDataForTime(i,a);if(j>=1){var k=b(i,j),l=null;k.isBullishContinuation&&(l={x:i[j].x||i[j][0],title:'<span style="color : blue">U3R</span>',text:"Unique 3 River : Bull"});for(var m=-1,n=d[h].data.length-1;n>=0;n--)if((d[h].data[n].x||d[h].data[n][0])==(i[j].x||i[j][0])){m=n;break}l?(e&&m>=0&&d[h].data[m].remove(),d[h].addPoint(l)):m>=0&&d[h].data[m].remove()}}}a&&!a.Series.prototype.addCDLUNIQUE3RIVER&&(a.Series.prototype.addCDLUNIQUE3RIVER=function(a){var h=this.options.id;a=f.extend({parentSeriesID:h},a);var i="_"+(new Date).getTime(),j=this.options.data||[];if(j&&j.length>0){e=g.getCandleMediumHeight(j);for(var k=[],l=3;l<j.length;l++){var m=b(j,l);m.isBullishContinuation&&k.push({x:j[l].x||j[l][0],title:'<span style="color : blue">U3R</span>',text:"Unique 3 River : Bull"})}var n=this.chart;c[i]=a;d[i]=n.addSeries({id:i,name:"CDLUNIQUE3RIVER",data:k,type:"flags",onSeries:h,shape:"flag",turboThreshold:0},!1,!1),f(d[i]).data({isIndicator:!0,indicatorID:"cdlhammer",parentSeriesID:a.parentSeriesID}),n.redraw()}return i},a.Series.prototype.removeCDLUNIQUE3RIVER=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),d[a]=null,b.redraw()},a.Series.prototype.preRemovalCheckCDLUNIQUE3RIVER=function(a){return{isMainIndicator:!0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,f){a.call(this,b,d,e,f),g.checkCurrentSeriesHasIndicator(c,this.options.id)&&h.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),g.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&h.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});