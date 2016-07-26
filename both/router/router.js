Router.configure({
	layout: "routeexample"
});

/*Router.onRun(function(){
	this.layout('routeexample');
	this.next();
});*/

Router.route("/", function(){
	this.render('thing1');
});

Router.route("/second", function(){
	this.render('thing2');
});