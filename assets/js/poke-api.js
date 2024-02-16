const pokeApi = {}

function convertPokeApiDetailsToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  
  const types = pokeDetail.types.map((item) => item.type.name)
  const [type] = types // desestruturando um array, aí estou pegando a primeira posicao do array [type1, type2] ...

  pokemon.type = type
  pokemon.types = types
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json()
    .then((responseDetailPokemon) => convertPokeApiDetailsToPokemon(responseDetailPokemon))
    )
}

pokeApi.getPokemons = (offset = 0, pageLimit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pageLimit}`

  return fetch(url)
    .then((response) => response.json())
    .then((responseList) => responseList.results)
    .then((resultsDetails) => resultsDetails.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetailList) => pokemonDetailList)
    .catch((error) => console.error(error))
};

pokeApi.getPokemonsAllDetails = (pokemonId) => {
  const urlDetail = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

  return fetch(urlDetail)
    .then((response) => response.json())
}