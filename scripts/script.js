const pokemon = {};

pokemon.getPokemon = (id) => {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
        method: 'GET',
        dataType: 'json'
    });
}

pokemon.getPack = () => {
    const gettingPokemon = ids.map((id) => {
        return pokemon.getPokemon(id);
    });
    // console.log(gettingPokemon);

    $.when(...gettingPokemon) 
        .then((...pokemon) => {
            // console.log(pokemon);
            let card = pokemon.map((data) => {
                // console.log(data);
                return {
                    name: data[0].name,
                    image: data[0].sprites.front_default
                }
            });
            // console.log(card);
            card.forEach((detail) => {
                const sprite = $('<img>').prop('src', detail.image);
                const originalName = $('<h2>').text(detail.name);
                const individualCard = $('<div>').addClass('card').append(sprite, originalName);
                $('.container').append(individualCard);
            });
        });
}


let ids = [];
let next = 1;

pokemon.getNumbers = () => {
    for (let i = 0; i <= 5; i++) {
        next = Math.round(Math.random()*150);
        ids.push(next);
    };
    // console.log(ids);
    pokemon.getPack();
}

pokemon.openPack = () => {
    $('.resultsHeader').hide();
    $('.container').hide();
    $('#reset').hide();
    $('#open').on('click', function(e) {
        e.preventDefault();
        $('.originalHeader').hide();
        $('.pokeball').hide();
        $('#open').hide();
        $('.container').show();
        $('.resultsHeader').show();
        $('#reset').show()
    })
}

pokemon.init = function() {
    pokemon.openPack();
    pokemon.getNumbers();
};

$(function() {
    pokemon.init();
});