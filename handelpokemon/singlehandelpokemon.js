$(document).ready(function(){

	function showPokemon(){
		$.ajax({
			url: 'http://pokeapi.co/api/v1/pokemon/1/',
			dataType: "json",
			success: function(data, textStatus){
				var pokemon = data;
				var pokemonId = pokemon["national_id"];
				var pokemonName = pokemon["name"];


				var contextMain = {
					"name": pokemonName,
					"id": pokemonId,
				}
				
				pokemonLoad(contextMain);
				
				// console.log(contextMain);
			}
		});
	}
	showPokemon();




	function pokemonLoad(pokemonData){
			var templateScript = $("#text-template").html();
			var template = Handlebars.compile(templateScript);
			var context = pokemonData;
			console.log(context);
			var compiledHtml = template(context);
		$(".pokemon-list").html(compiledHtml);
		};

});