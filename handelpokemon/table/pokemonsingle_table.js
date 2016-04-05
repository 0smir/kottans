$(document).ready(function(){


	function loadPokemons(apiUrl){

		$.ajax({
			url: apiUrl,
			dataType: "json",
			success: function(data, textStatus){
				var arrPokemon = data.objects;
					updateOffsetLink(data);
					pokemonLoadHtml(arrPokemon);
			}

		});
	}

	function loadOnePokemon(apiUrl){
		$.ajax({
			url: apiUrl,
			dataType: "json",
			success: function(data, textStatus){
				singlePokemonlInfo(data);
			}
		});
	}
	

	function pokemonLoadHtml(pokemonDataObj){
		var templateScript = $("#text-template").html();
		var template = Handlebars.compile(templateScript);
		var context = pokemonDataObj;

	//	console.log(context);
		var compiledHtml = template(context);
		$(".pokemon-list").append(compiledHtml);

	};


	function singlePokemonlInfo(x){
		var templateScript = $("#text-template-single-pokemon").html();
		var template = Handlebars.compile($("#text-template-single-pokemon").html());
		var context = x;
		var compiledHtml = template(context);
		$(".single-pokemon").html(compiledHtml);

	}


	function updateOffsetLink(fullObjectData){
		console.log(fullObjectData);
		var pokeLinkOffset = 'http://pokeapi.co' + fullObjectData["meta"]["next"];
		console.log(pokeLinkOffset);
		$(".more").attr('data-offset', pokeLinkOffset);
	}
	

	$(".more").on("click", function(){
		var newPokelink = $(".more").attr('data-offset');
		console.log(newPokelink);
		loadPokemons(newPokelink);
	});



	//(function(){
	var selectedLi;


		"ul".onclick = function(event){
			//find where was click
			var target = event.target; 
			//return only if tag = li
			if (target.tagName != 'LI') return;
			highlight(target);
		}


		function highlight(y){
			if (selectedLi){
				selectedLi.classList.remove("target-field");
			}
			// y - field that was selected
			selectedLi = y;
			selectedLi.classList.add("target-field");

		}

	//})()
	

	loadPokemons('http://pokeapi.co/api/v1/pokemon/?limit=12');
});