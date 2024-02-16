const listHtml = document.getElementById('pokemonList')
const loadButton = document.getElementById('loadMoreButton')
const detailsPokemon = document.getElementById('detailsPokemon')

const pageLimit = 5
let offset = 0


function convertPokemonListToLi(pokemon) {
    return `
     <li data-pokemon-id="${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

listHtml.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('li');

    if (clickedPokemon) {
        const pokemonId = Number(clickedPokemon.dataset.pokemonId);
        pokeApi.getPokemonsAllDetails(pokemonId)
            .then(pokemonIdDetails => {
                showDetails(pokemonIdDetails)
        })
    }
})

detailsPokemon.addEventListener('click', () => { 
    closeCardDetails()
})

function convertDetailsPokemon(pokemonIdDetails) {
    return `
        <button class="buttonClose">X</button>
        <div class="containerHeader">
            <span class="nameDetails">
                ${pokemonIdDetails.species.name}
            </span>
            <span class="numberDetails">#${pokemonIdDetails.id}</span>
            
            <div class="typesList">
                <ol class="ol">
                <span class="spanList">Type</span>
                    ${pokemonIdDetails.types.map((type) => `<li class="typeDetails">${type.type.name}</li>`).join('')}
                </ol>
            </div>
        </div>
        
        <div class="photo">
            <img class="photoPokemon" src="${pokemonIdDetails.sprites.other.dream_world.front_default}"
                    alt="${pokemonIdDetails.species.name}">
        </div>

        <div class="containerText">
        <span class="textDetails">
                Heigth -
                ${pokemonIdDetails.height}0 cm
            </span>
        <span class="textDetails">
                Weight -
                ${pokemonIdDetails.weight} Kg
            </span>
        <span class="textAbilities">
             <span class="tittleDetails">Abilities</span>
                ${pokemonIdDetails.abilities.map((ability) => `<li class="typeAbilities">${ability.ability.name}</li>`).join('')}
            </span>
        </div>
`
}

function showDetails(pokemonIdDetails) {
    detailsPokemon.style.display = 'flex';
    
    const detailsHtml = convertDetailsPokemon(pokemonIdDetails)
    detailsPokemon.innerHTML = detailsHtml 
}

function closeCardDetails() {
    detailsPokemon.style.display = 'none';
}

function loadPokemonItens(offset, pageLimit) {
    pokeApi.getPokemons(offset, pageLimit).then((pokemonList = []) => {
        const newHtml = pokemonList.map(convertPokemonListToLi).join('');
        listHtml.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, pageLimit)

loadButton.addEventListener('click', () => {
    offset += pageLimit;
    loadPokemonItens(offset, pageLimit)
})


/* pokeApi.getPokemons().then((pokemonList = []) => {

 /*    const newList = pokemonList.map((pokemon) => {
        return convertPokemonListToLi(pokemon);
    })

    //o newList vai me dar um objeto com várias listas de html e para juntar todas e torna-la legivel para o html se utiliza o join

    const newHTMLList = newList.join('');

    //join junta strings por padrão ela tras as strings separadas por , entao se coloca um '' para nao aparecer nenhum caracter na tela

    listHtml.innerHTML += newHTMLList

    // código acima sera reduzido para uma linha abaixo

    listHtml.innerHTML += pokemonList.map(convertPokemonListToLi).join('');

    // a funcao convertPokemonToList já faz a conversao então sempre que o map entra nela ela faz o map na lista
 
}); */

