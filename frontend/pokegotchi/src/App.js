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
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(0);

  useEffect(() => {
    // userpk = localStorage.getItem('user');

      let userpk = user;

      if (String(pokemonData.user) !== userpk && userpk!==0) {
          
          const fetchUserPokemon = async (userpk) => {
          console.log(user)
          const res = await fetch(`http://localhost:8000/api/pokemon/user/${userpk}`, {
            method: 'GET',
          })
          const data = await res.json()
          setPokemonData(data)
          }
          fetchUserPokemon(userpk)

          .catch((error)=> {
            console.error('Error:', error);
          } )
      }
  }, [user, pokemonData.user]);

  const updatePokemon = async (id) => {
    fetch(`http://localhost:8000/gameupdate/${id}`)
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

 const handleLogin = () => {
   setLoggedIn(true)
   console.log("logged in")
   //console.log("check loggedIn ", loggedIn)
 }

 const handleLogout = () => {
   setLoggedIn(false)
   console.log("logged out")
 }

 const handleUser = (pk) => {
   setUser(pk)
   //console.log("pk is now ", user)
   //console.log("user is now ", user)
 }



  return (
    <div className="App">
      <Router>
        <Header handleLogout={handleLogout} />
        <Route path='/' exact>
          <LandingPage/>
        </Route>
        <Route path='/create_account' exact>
          <Register/>
        </Route>
        <Route path='/log_in' exact>
          <Login loggedIn={loggedIn} handleLogin={handleLogin} user={user} handleUser={(pk) => handleUser(pk)} />
        </Route>
        <Route path='/about' exact>
          <About/>
        </Route>
        <Route path='/play' exact>
          <Gameset pokemonData={pokemonData} addHunger={addHunger} addHappiness={addHappiness}/>
          <div className="tempData">
            {/* <PokemonData pokemonData={pokemonData}/> */}
            <button onClick={() => updatePokemon(pokemonData.return_pokemon_id)}>Click Me!</button>
          </div>
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
