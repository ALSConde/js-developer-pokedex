const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
const maxRecords = 151
let offset = 0

function loadPokemonItems(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}</ol>
                      <img src="${pokemon.photo}" 
                                alt="${pokemon.name}">
                     </div>
                </li >
        `).join('')
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtRecord = offset + limit

    if (qtRecord >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

        return
    } else {
        loadPokemonItems(offset, limit)
    }
})