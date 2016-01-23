define(["jquery","windows/windows","websockets/binary_websockets","navigation/menu","datatables","jquery-growl"],function(a,b,c,d){function e(a){function b(b,c){var d=a.filter(function(a){return a.display_name==b})[0],e=d&&d.submarkets.filter(function(a){return a.display_name==c})[0].instruments,f=(e||[]).map(function(a){return[a.display_name,a.times.open[0],a.times.close[0],a.settlement||"-",a.events[0]?a.events[0].descrip+":"+a.events[0].dates:"-"]});return f}var a=a||[],c=[],d={};return a.forEach(function(a){c.push(a.display_name),d[a.display_name]=[],a.submarkets.forEach(function(b){d[a.display_name].push(b.display_name)})}),{market_names:c,submarket_names:d,getRowsFor:b}}function f(c){require(["css!tradingtimes/tradingTimes.css"]),c.click(function(){i?i.moveToTop():(i=b.createBlankWindow(a("<div/>"),{title:"Trading Times",width:700,minHeight:110}),i.dialog("open"),require(["text!tradingtimes/tradingTimes.html"],g))})}function g(f){f=a(f);var g=f.filter(".trading-times-sub-header");h=f.filter("table"),f.appendTo(i),h=h.dataTable({data:[],columnDefs:[{className:"dt-body-center dt-header-center",targets:[0,1,2,3,4]}],paging:!1,ordering:!1,searching:!0,processing:!0}),h.parent().addClass("hide-search-input"),h.api().columns().every(function(){var b=this;a("input",this.header()).on("keyup change",function(){b.search()!==this.value&&b.search(this.value).draw()})});var j=null,k=null,l=function(f){var i=a("#"+h.attr("id")+"_processing").show(),l=function(a,b,c){var d=a.getRowsFor(b,c);h.api().rows().remove(),h.api().rows.add(d),h.api().draw()},m=function(c){c=d.extractChartableMarkets(c);var f=e(c);if(null==j){var h=a("<select />");h.appendTo(g),j=b.makeSelectmenu(h,{list:f.market_names,inx:0,changed:function(a){k.update_list(f.submarket_names[a]),l(f,j.val(),k.val())}})}if(null==k){var m=a("<select />");m.appendTo(g),k=b.makeSelectmenu(m,{list:f.submarket_names[j.val()],inx:0,changed:function(){l(f,j.val(),k.val())}})}l(f,j.val(),k.val()),i.hide()};c.cached.send({trading_times:f}).then(m)["catch"](function(b){a.growl.error({message:b.message}),m({})})};l((new Date).toISOString().slice(0,10)),i.addDateToHeader({title:"Date: ",date:new Date,changed:l})}var h=null,i=null;return{init:f}});