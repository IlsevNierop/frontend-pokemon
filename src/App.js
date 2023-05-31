import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PokemonTile from "./components/PokemonTile";

function App() {

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [pokemonsData, setPokemonsData] = useState([]);
    const [link, setLink] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");


    useEffect(() => {
        async function fetchDataAllPokemons() {
            toggleLoading(true);
            try {
                const response = await axios.get(`${link}`);
                if (response.data) {
                    toggleError(false);
                }
                setPokemonsData(response.data);
            } catch (e) {
                console.log(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        void fetchDataAllPokemons();


    }, [link])

    const {results} = pokemonsData;



    return (
        <>
            <button
                disabled={pokemonsData.previous === null}
                type="button"
                onClick={ () => setLink(pokemonsData.previous)}>
                Vorige
            </button>
            <button
                disabled={pokemonsData.next === null}
                type="button"
                onClick={ () => setLink(pokemonsData.next)}>
                Volgende
            </button>
            <div className="message">
                {error && <p>Er gaat iets mis met het ophalen van de data</p>}
                {loading && <p>Loading...</p>}
            </div>
            <div className="pokemon-overview">
            {results && results.map((pokemon) => {
                return(
                    <PokemonTile name={pokemon.name} url={pokemon.url} key={pokemon.name}></PokemonTile>
                )

            })
            }
            </div>




        </>
    );
}

export default App;
