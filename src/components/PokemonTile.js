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
                console.log(response.data);
                setSinglePokemonData(response.data)
            } catch (e) {
                console.log(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        void fetchDataSinglePokemon();
    }, [])

    console.log(singlePokemonData.abilities);




    return (
        <>
            {Object.keys(singlePokemonData).length > 0 &&

                <article className="tile-pokemon">
                    <h2 className="pokemon-name">{name}</h2>
                    <img src={singlePokemonData.sprites.front_default} alt="test"/>
                    <p>Weight: {singlePokemonData.weight}</p>
                    <p>Moves: {singlePokemonData.moves.length}</p>
                    <p>Abilities: </p>
                    {singlePokemonData.abilities.map((ability) => {
                        return (<p>{ability.ability.name}</p>)
                    })}
                </article>

            }
        </>
    );
}

export default PokemonTile;