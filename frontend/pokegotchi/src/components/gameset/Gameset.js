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

    function handleHungerClick(e){
        e.preventDefault();
        console.log("Added +5 to Hunger")
        props.addHunger();
    }

    function handleHappinessClick(e){
        e.preventDefault();
        console.log("Added +5 to Happiness")
        props.addHappiness();
    }

    return (
        <div className="gameset">
            <h1>{props.pokemonData.name}</h1>
            <div className="gameScreen">
                <div className="hungerBar bar">
                    <p className="statNumber">{String(parseInt(props.pokemonData.hunger))}</p>
                    <div className="hungerBarCurrent barCurrent" style={{height: props.pokemonData.hunger+"%"}}></div>
                    <img className="hungerBarIcon barIcon" src="/oranBerry.png" alt="Hunger Bar Indicator"/>
                </div>
                <div className={"pokemonImage" + (props.pokemonData.alive ? "" : " isDead")}>
                    {/* ternary operator */}
                    <img className="image1" src={"/"+imageBase+"-1.png"} alt={props.pokemonData.pokemon} />
                    <img className="image2" src={"/"+imageBase+"-2.png"} alt={props.pokemonData.pokemon} />
                </div>
                <div className="happinessBar bar">
                    <p className="statNumber">{String(parseInt(props.pokemonData.happiness))}</p>
                    <div className="happinessBarCurrent barCurrent" style={{height: props.pokemonData.happiness+"%"}}></div>
                    <img className="happinessBarIcon barIcon" src="/substituteDoll.png" alt="Happiness Bar Indicator"/>
                </div>
            </div>
            <div className="feedPlayBtns">
                <button className="feedPlayBtn" onClick={handleHungerClick}>FEED</button>
                <button className="feedPlayBtn" onClick={handleHappinessClick}>PLAY</button>
            </div>
            {/* <div>
                <button>INVENTORY</button>
            </div> */}
        </div>
    )
}

export default Gameset
