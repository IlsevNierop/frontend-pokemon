import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PokemonTile from "./components/PokemonTile";

function App() {

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [pokemonsData, setPokemonsData] = useState([]);
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");


    useEffect(() => {
        async function fetchDataAllPokemons() {
            toggleLoading(true);
            try {
                const response = await axios.get(`${endpoint}`);
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


    }, [endpoint])

    const {results} = pokemonsData;


    return (
        <>
            <h1>pokemon</h1>
            <div className="buttons">
                <button className="button"
                        disabled={pokemonsData.previous === null}
                        type="button"
                        onClick={() => setEndpoint(pokemonsData.previous)}>
                    Vorige
                </button>
                <button className="button"
                        disabled={pokemonsData.next === null}
                        type="button"
                        onClick={() => setEndpoint(pokemonsData.next)}>
                    Volgende
                </button>
            </div>
            <div className="message">
                {error && <p>Er gaat iets mis met het ophalen van de data</p>}
                {loading && <p>Loading...</p>}
            </div>
            <div className="pokemon-overview">
                {results && results.map((pokemon) => {
                    return (
                        <PokemonTile name={pokemon.name} endpoint={pokemon.url} key={pokemon.name}></PokemonTile>
                    )

                })
                }
            </div>


        </>
    );
}

export default App;
