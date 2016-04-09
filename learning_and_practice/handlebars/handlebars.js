
$(document).ready(function(){
	console.log( "ready!" );

	$(function(){
		var templateScript = $("#text-template").html();
		var template = Handlebars.compile(templateScript);
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