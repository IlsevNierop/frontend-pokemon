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
            {Object.keys(singlePokemonData).length > 0 &&

                <article className="tile-pokemon">
                    <h2 className="pokemon-name">{name}</h2>
                    <img src={sprites.front_default} alt={`Image of ${name}`}/>
                    <h3>Weight: {weight}</h3>
                    <h3>Moves: {moves.length}</h3>
                    <h3>Abilities: </h3>
                    {abilities.map((ability) => {
                        return (<li key={`${ability.ability.name}-${ability.slot}`}>{ability.ability.name}</li>)
                    })}
                </article>

            }
        </>
    );
}

export default PokemonTile;