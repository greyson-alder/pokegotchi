import React from 'react'

const PokemonData = (props) => {
    return (
        <div>
            <ul>
                <li>Name: {props.pokemonData.name}</li>
                <li>Age: {props.pokemonData.age}</li>
                <li>Pokemon: {props.pokemonData.pokemon}</li>
                <li>Happiness: {props.pokemonData.happiness}</li>
                <li>Hunger: {props.pokemonData.hunger}</li>
                <li>funct_time: {props.pokemonData.func_time}</li>
                <li>alive: {String(props.pokemonData.alive)}</li>
            </ul>
             
        </div>
    )
}

export default PokemonData
