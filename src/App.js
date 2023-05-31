import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PokemonTile from "./components/PokemonTile";

function App() {

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [pokemonsData, setPokemonsData] = useState([]);


    useEffect(() => {
        async function fetchDataAllPokemons() {
            toggleLoading(true);
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
                if (response.data) {
                    toggleError(false);
                }
                // console.log(response.data.results);
                setPokemonsData(response.data.results)
            } catch (e) {
                console.log(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        void fetchDataAllPokemons();


    }, [])



    return (
        <>
            <div className="message">
                {error && <p>Er gaat iets mis met het ophalen van de data</p>}
                {loading && <p>Loading...</p>}
            </div>
            {pokemonsData.map((pokemon) => {
                return(
                    <PokemonTile name={pokemon.name} url={pokemon.url} key={pokemon.name}></PokemonTile>

                )

            })
            }




        </>
    );
}

export default App;
