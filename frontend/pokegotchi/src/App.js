import './App.css';
import React, { useState, useEffect } from 'react'
import PokemonData from "./components/pokemondata/PokemonData"
import Gameset from "./components/gameset/Gameset"
import Footer from "./components/footer/Footer"
import About from "./pages/About"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreatePokemon from "./pages/CreatePokemon";
import Header from "./components/header/Header"

import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  
  const [pokemonData, setPokemonData] = useState(false);

  useEffect(() => {
      if (!pokemonData) {
          getPokemonData()
      }
  });

  const getPokemonData = async () => {
      fetch("http://localhost:8000/api/pokemon/1")
      .then(response => response.json())
      .then(data => setPokemonData(data))
  }

  const updatePokemon = async () => {
    fetch("http://localhost:8000/gameupdate")
    .then(response => response.json())
    .then(data => setPokemonData(data))
  }

  //   useEffect(() => {
  //     const interval = window.setInterval(updatePokemon, 5000)
  //     return () => {window.clearInterval(interval)} 
  // });

   const addHunger = async () => {
     if (pokemonData.alive && pokemonData.hunger <= 95) {
      await fetch(`http://localhost:8000/api/pokemon/${pokemonData.return_pokemon_id}/hunger`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({add_hunger:5, user:pokemonData.user}),  
          })
          .then(response => {
              if(!response.ok){
                  throw new Error("Not 2xx response")
              }
              return response.json();
          })
          // .then(data => {
          //     console.log('Successfully added hunger:', data);
          // })
          .then(data => setPokemonData(data))
          .catch((error) => {
          console.error('Error:', error);
      });
    }
  }

  const addHappiness = async () => {
    if (pokemonData.alive && pokemonData.happiness <= 95) {
     await fetch(`http://localhost:8000/api/pokemon/${pokemonData.return_pokemon_id}/happiness`, {
         method: "POST",
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({add_happiness:5, user:pokemonData.user}),  
         })
         .then(response => {
             if(!response.ok){
                 throw new Error("Not 2xx response")
             }
             return response.json();
         })
         .then(data => setPokemonData(data))
         .catch((error) => {
         console.error('Error:', error);
     });
   }
 }

  return (
    <div className="App">
      <Router>
        <Header />
        <Route path='/' exact>
          <LandingPage/>
        </Route>
        <Route path='/create_account' exact>
          <Register/>
        </Route>
        <Route path='/log_in' exact>
          <Login/>
        </Route>
        <Route path='/about' exact>
          <About/>
        </Route>
        <Route path='/play' exact>
          <Gameset pokemonData={pokemonData} addHunger={addHunger} addHappiness={addHappiness}/>
          {/* <div className="tempData">
            <PokemonData pokemonData={pokemonData}/>
            <button onClick={updatePokemon}>Click Me!</button>
          </div> */}
        </Route>
        <Route path='/create_pokemon' exact>
          <CreatePokemon/>
        </Route>
        <Footer  className="footer-brown"/>
      </Router>
    </div>
  );
}

export default App;
