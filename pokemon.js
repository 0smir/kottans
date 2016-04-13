$(document).ready(function(){


	function loadPokemons(apiUrl) {

		$.ajax({
			url: apiUrl,
			dataType: "json",
			success: function(data, textStatus) {
				var arrPokemon = data.objects;
				updateOffsetLink(data);
				generatePokemonHtml(arrPokemon);
			}

		});
	}

	function loadOnePokemon(apiUrl) {
		$.ajax({
			url: apiUrl,
			dataType: "json",
			success: function(data, textStatus) {
				generateSinglePokemonlInfo(data);
			}
		});
	}

	function generatePokemonHtml(pokemonDataObj) {
		var templateScript = $("#text-template").html(),
		template = Handlebars.compile(templateScript),
		compiledHtml = template(pokemonDataObj);

		$(".pokemon-list").append(compiledHtml);
	};

	function generateSinglePokemonlInfo(data) {
		$(".pokemon_detailed_info").remove();
		var templateScript = $("#text-template-single-pokemon").html(),
		template = Handlebars.compile(templateScript),
		compiledHtml = template(data);
		$(".single-pokemon").append(compiledHtml);
		$(".single-pokemon").find('li').addClass('pokemon_detailed_info');
	}

	function updateOffsetLink(fullObjectData) {
		var pokeLinkOffset = 'http://pokeapi.co' + fullObjectData["meta"]["next"];
		$(".more").attr('data-offset', pokeLinkOffset);
	}

	//show single data pokemon
	function showSelectedPokemon(targetField) {
		var selectedLi = targetField;

		// targetField - tag that was target
		selectedLi.addClass("selected");
		$(".single-pokemon").show();
		var singlPokemonId = $(".pokemon-list").find(".selected").attr('data-pokedex-id');
		var apiUrl = 'http://pokeapi.co/api/v1/pokemon/' + singlPokemonId + '/';
		loadOnePokemon(apiUrl);
	}

	function filter(buttonClass) {
		var buttonClass = "." + buttonClass;
		var chosenPokemon = $(buttonClass).parent();
		chosenPokemon.removeClass("hide");
	}

	$(".more").on("click", function() {
		var newPokelink = $(".more").attr('data-offset');
		loadPokemons(newPokelink);
	});

	$(".pokemon-list").on("click", function(event) {
		$(this).find(".selected").removeClass("selected");
		var targetElem = $(event.target);
		if (targetElem.is("img")) {
			while (targetElem != $("ul")) {
				if (targetElem.is("li")) {
					showSelectedPokemon(targetElem);
					return;
				} else {
					targetElem = targetElem.parent();
				}
			}

		} else if (targetElem.is("h4")) {
			while (targetElem != $("ul")) {
				if (targetElem.is("li")) {
					showSelectedPokemon(targetElem);
					return;
				} else {
					targetElem = targetElem.parent();
				}
			}

		} else if (targetElem.is("button")) {
			$(".pokemon-list").find("li").addClass("hide");
			$(".filter-control").show();
			var  buttonClass = targetElem.attr("class");
			filter(buttonClass);
		}
	});

	$(".filter-control").on("click", ".reset", function(){
		$(".pokemon-list").find("li").removeClass("hide");
		$(".filter-control").hide();
	});

	loadPokemons('http://pokeapi.co/api/v1/pokemon/?limit=12');
});