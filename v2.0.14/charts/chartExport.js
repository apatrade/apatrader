define(["jquery","charts/chartingRequestMap","moment","jquery-ui","css!charts/chartExport.css","common/util"],function(a,b,c){function d(b){var c=a("<img />").attr("src","images/download.svg").addClass("export-btn").attr("title","Download CSV").tooltip({position:{my:"left-120 top",at:"left top",collision:"flipfit"}}),d=a("#"+b+"_header");d.prepend(c);var f=a("#"+b+"_chart").data();c.on("click",e.bind(null,f))}function e(a){var d=b.keyFor(a.instrumentCode,a.timePeriod),e=a.instrumentName+" ("+a.timePeriod+").csv",g=f.chain().find({instrumentCdAndTp:d}).simplesort("time",!1).data(),h=g.map(function(a){return'"'+c.utc(a.time).format("YYYY-MM-DD HH:mm")+'",'+a.open+","+a.high+","+a.low+","+a.close}),i="Date,Open,High,Low,Close\n"+h.join("\n"),j=new Blob([i],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(j,e);else{var k=document.createElement("a");if(void 0!==k.download){var l=URL.createObjectURL(j);k.setAttribute("href",l),k.setAttribute("download",e),k.style.visibility="hidden",document.body.appendChild(k),k.click(),document.body.removeChild(k)}}}var f=b.barsTable;return{init:d}});