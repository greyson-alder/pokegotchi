import React, { useState, useEffect } from 'react'
import "./gameset.css"

const Gameset = (props) => {

    const [imageBase, setImageBase] = useState("");

    useEffect(() => {
        let imageName = props.pokemonData.pokemon
        if (props.pokemonData.age >= 36) {
            imageName += "3"
        } else if (props.pokemonData.age >= 16) {
            imageName += "2"
        }
        else {
            imageName += "1"
        }
        setImageBase(imageName)
    }, [props.pokemonData.pokemon, props.pokemonData.age]);

    return (
        <div className="gameset">
            <h1>{props.pokemonData.name}</h1>
            <div className="gameScreen">
                <div className="hungerBar bar">
                    <div className="hungerBarCurrent barCurrent" style={{height: props.pokemonData.hunger+"%"}}></div>
                </div>
                <div className={"pokemonImage" + (props.pokemonData.alive ? "" : " isDead")}>
                    {/* ternary operator */}
                    <img className="image1" src={"/"+imageBase+"-1.png"} alt={props.pokemonData.pokemon} />
                    <img className="image2" src={"/"+imageBase+"-2.png"} alt={props.pokemonData.pokemon} />
                </div>
                <div className="happinessBar bar">
                <div className="happinessBarCurrent barCurrent" style={{height: props.pokemonData.happiness+"%"}}></div>
                </div>
            </div>
            <div className="feedPlayBtns">
                <button className="feedPlayBtn">FEED</button>
                <button className="feedPlayBtn">PLAY</button>
            </div>
            <div>
                <button>INVENTORY</button>
            </div>
        </div>
    )
}

export default Gameset
