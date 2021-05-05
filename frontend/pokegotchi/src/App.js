import './App.css';
import React, { useState, useEffect } from 'react'
import PokemonData from "./components/pokemondata/PokemonData"
import Gameset from "./components/gameset/Gameset"
import Footer from "./components/Footer"
import About from "./pages/About"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreatePokemon from "./pages/CreatePokemon";

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

  

  return (
    <Router>
      <Route path='/' exact>
        <LandingPage/>
      </Route>
      <Route path='/create_account' exact>
        <p>Create Account Page</p>
        <Register/>
      </Route>
      <Route path='/log_in' exact>
        <p>Log In Page</p>
        <Login/>
      </Route>
      <Route path='/about' exact>
        <About/>
      </Route>
      <Route path='/play' exact>
        <p>Game Page</p>
        <Gameset pokemonData={pokemonData}/>
      </Route>
      <div className="App">
        <div>Pokemon Data:
          <PokemonData pokemonData={pokemonData}/>
          <button onClick={updatePokemon}>Click Me!</button>
        </div>
      </div>
      <Route path='/create_pokemon' exact>
        <p>Create a Pokemon Page</p>
        <CreatePokemon/>
      </Route>
      <Footer  className="Footer"/>
    </Router>
  );
}

export default App;
