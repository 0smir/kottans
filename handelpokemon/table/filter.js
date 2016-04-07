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
		$(".pokemon_detailed_info").remove();
		var templateScript = $("#text-template-single-pokemon").html();
		var template = Handlebars.compile($("#text-template-single-pokemon").html());
		var context = x;
		var compiledHtml = template(context);
		$(".single-pokemon").append(compiledHtml);
		$(".single-pokemon").find('li').addClass('pokemon_detailed_info');
	}


	


	function updateOffsetLink(fullObjectData){
		console.log(fullObjectData);
		var pokeLinkOffset = 'http://pokeapi.co' + fullObjectData["meta"]["next"];
		//console.log(pokeLinkOffset);
		$(".more").attr('data-offset', pokeLinkOffset);
	}
	

	$(".more").on("click", function(){
		var newPokelink = $(".more").attr('data-offset');
		//console.log(newPokelink);
		loadPokemons(newPokelink);
	});

	


	$("ul").click(function(event){
		$(this).find(".selected").removeClass("selected");
		var targetElem = $(event.target);
		if(targetElem.is("img")){
			while(targetElem != $("ul")){
			if( targetElem.is("li") ){
				selectedPokemon(targetElem);
				return;
			}else{
				console.log(targetElem);
				targetElem = targetElem.parent();
			}	
		}

		}else if(targetElem.is("h4")){
			while(targetElem != $("ul")){
			if( targetElem.is("li") ){
				selectedPokemon(targetElem);
				return;
			}else{
				console.log(targetElem);
				targetElem = targetElem.parent();
			}	
		}

		}else if(targetElem.is("button")){
			$(".pokemon-list").find("li").addClass("hide");
			var  buttonClass = targetElem.attr("class");
			console.log(buttonClass);
			filter(buttonClass);
		}


	});


	function selectedPokemon(targetField){
		var selectedLi = targetField;
		// targetField - tag that was target
		selectedLi.addClass("selected");
		$(".single-pokemon").css({"display":"block"});
		var singlPokemonId = $("ul").find(".selected").attr('data-pokedex-id');
		var apiUrl = 'http://pokeapi.co/api/v1/pokemon/' + singlPokemonId + '/';
		loadOnePokemon(apiUrl);
		console.log(apiUrl);
	}

	function filter(buttonClass){
		var buttonClass = "." + buttonClass;
		// console.log(buttonClass);
		var chosenPokemon = $(buttonClass).parent();
		chosenPokemon.removeClass("hide");
	}


	loadPokemons('http://pokeapi.co/api/v1/pokemon/?limit=12');
	
});