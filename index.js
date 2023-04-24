
fetch("pokedex.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        //pokemon = data.slice(0,151);
        pokemon = data
        //console.log(pokemon);
        generateCards(pokemon);
    })
    .catch(err => {})

    function generateCards(listaPokemon){
        const pokedex = document.querySelector("#pokedex");
        while(pokedex.firstChild){
            pokedex.removeChild(pokedex.firstChild);
        }
        listaPokemon.forEach(pokemon => {
            const card = `<div class="iniline-block rounded-xl m-auto max-w-[200px] p-5 hover:bg-slate-200">
                <img src="images/${formatID(pokemon.id)}.png">
                <h3>${pokemon.name.english}</h3>
            </div>`;
            pokedex.insertAdjacentHTML("beforeend", card);
        });
    }

    function formatID(id){
        if(id.toString().length == 1) return `00${id}`;
        if(id.toString().length == 2) return `0${id}`;
        return id;
    }

    const searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("input", search);

    function search(event){
        console.log(event.target.value);
        let pokemonFiltrati = [];
            if(event.target.value.startsWith("type:")){
                const value = event.target.value.replace("type:", "");
                pokemonFiltrati = pokemon.filter(pkmn => {
                    return pkmn.type.indexOf(value) != -1;
                })
            }else{
                pokemonFiltrati = pokemon.filter(pkmn => {
                    return pkmn.name.english.toLowerCase().includes(event.target.value.toLowerCase());
                })
                
            }
            generateCards(pokemonFiltrati);
    }