$(document).ready(function(){

	var onePokemonData = $.ajax({
		url: 'http://pokeapi.co/api/v1/pokemon/1/',
		dataType: "json",
		success: function(data, textStatus){
			var allInfoPokemon = data;
			console.log(allInfoPokemon)
			
			pokemonData(allInfoPokemon);
		}

	});


	function pokemonData(y){

	//console.log(y);
	var pokemonName = y["name"];
	//console.log(y["name"]);
	var pokemonId = y["national_id"];
	//console.log(y["national_id"]);
	var pokeImageLinkDataJson = 'http://pokeapi.co' + y["sprites"][0]['resource_uri'];
	//console.log('http://pokeapi.co' + y["sprites"][0]['resource_uri']);

		var pokeImage = $.ajax({
			url: pokeImageLinkDataJson,
			dataType: "json",
			success: function(data, textStatus){
				var pokeImageLink = 'http://pokeapi.co' + data["image"];
				console.log(pokeImageLink);
				return pokeImageLink
			}
		});

		}



});