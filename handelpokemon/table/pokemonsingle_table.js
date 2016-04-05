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



	
	var selectedLi;


		$("ul").on("click", function(event){
			//find where was click
			var target = event.target; 
			//var li = $('li');
			//return only if tag = li
			while (target.tagName != "LI"){
				if (target.tagName == "LI"){
					console.log(target);
					selectedPokemon(target);
					return;
				}
				target = target.parentNode;
			}
			
		});


		function selectedPokemon(targetField){
			if (selectedLi){
				selectedLi.classList.remove("selected");
			}
			// y - field that was selected
			selectedLi = targetField;
			selectedLi.classList.add("selected");
		}
		//work only if event of click was on tag li

	
	

	loadPokemons('http://pokeapi.co/api/v1/pokemon/?limit=12');
});