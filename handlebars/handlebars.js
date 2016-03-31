
$(document).ready(function(){
	console.log( "ready!" );

	$(function(){
		var tamplateScript = $("#text-template").html();
		var template = Handlebars.compile(tamplateScript);
		var context = {
				'name': 'Jane Doe',
				'update': 'Just Made my Breakfaast',
				'from': 'Web',
				'location': 'Canada'
				};
				console.log(context);

		var compiledHtml = template(context);
		$(".content").html(compiledHtml);

	});
		
		

});