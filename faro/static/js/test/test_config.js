/**********************************************************************
 *                         TEST CONFIG
 **********************************************************************
 *
 * Use to configure what unit tests to run.
 * 
 **********************************************************************/
url = "/static/js/test";
rootUrl = "http://" + window.location.host;

$.getScript(rootUrl + url + "/test_user.js");
$.getScript(rootUrl + url + '/test_event.js');

/*
QUnit.jUnitReport = function(report) {
	console.log(report.xml);
} */