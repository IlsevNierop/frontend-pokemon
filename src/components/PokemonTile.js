import React, {useEffect, useState} from 'react';
import axios from "axios";

function PokemonTile({name, url}) {
    const [singlePokemonData, setSinglePokemonData] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);


    // console.log(name)
    // console.log(url)

    useEffect(() => {
        async function fetchDataSinglePokemon() {
            toggleLoading(true);
            try {
                const response = await axios.get(`${url}`);
                if (response.data) {
                    toggleError(false);
                }
                // console.log(response.data);
                setSinglePokemonData(response.data)
            } catch (e) {
                console.log(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        void fetchDataSinglePokemon();
    }, [])


    const {weight, moves, abilities, sprites} = singlePokemonData;

    return (
        <>
            <div className="message">
                {error && <p>Er gaat iets mis met het ophalen van de data</p>}
                {loading && <p>Loading...</p>}
            </div>
            {Object.keys(singlePokemonData).length > 0 &&

                <article className="tile-pokemon">
                    <h2 className="pokemon-name">{name}</h2>
                    <img src={sprites.front_default} alt={`Image of ${name}`}/>
                    <p><strong>Weight: </strong> {weight}</p>
                    <p><strong>Moves: </strong> {moves.length}</p>

                    <p><strong>Abilities: </strong></p>
                    {
                        abilities.map((ability) => {
                            return (<li key={`${ability.ability.name}-${ability.slot}`}>{ability.ability.name}</li>)
                        })
                    }
                </article>

            }
        </>
    )
        ;
}

export default PokemonTile;