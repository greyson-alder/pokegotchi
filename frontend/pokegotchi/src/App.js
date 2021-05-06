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

import { Redirect } from "react-router"
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  
  const [pokemonData, setPokemonData] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(0);

  useEffect(() => {
    let userpk = sessionStorage.getItem("userID")

    if (userpk) {
      setUser(userpk)
      setLoggedIn(true)
    }
  }, [])

  useEffect(() => {
      // let userpk = user;

      if (String(pokemonData.user) !== user && user!==0) {
          
          const fetchUserPokemon = async (user) => {
            // console.log("The current user's ID is:", user)
            const res = await fetch(`http://localhost:8000/api/pokemon/user/${user}`, {
              method: 'GET',
            })
            if (res.ok) {
              const data = await res.json()
              setPokemonData(data)
            }
            // console.log(String(pokemonData.user), userpk, String(pokemonData.user) !== userpk)
          }
          fetchUserPokemon(user)

          .catch((error)=> {
            console.error('Error:', error);
          } )
      }
  }, [pokemonData.user, user]);

  const refreshUserPokemon = async (callback) => {
    const res = await fetch(`http://localhost:8000/api/pokemon/user/${user}`, {
      method: 'GET',
    })
    if (res.ok) {
      const data = await res.json()
      setPokemonData(data)
      
    }   
    callback() 
  }

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
   sessionStorage.removeItem("userID")
   setPokemonData(false)
   setUser(0)
 }

 const handleUser = (pk) => {
   setUser(pk)
   //console.log("pk is now ", user)
   //console.log("user is now ", user)
 }

 const deleteData = async (callback) => {
  await fetch(`http://localhost:8000/api/pokemon/${pokemonData.return_pokemon_id}`, {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
      }, 
      })
      .then(response => {
          if(!response.ok){
              throw new Error("Not good Delete call")
          }
          setPokemonData(false)
          callback()
      })
      .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="App">
      <Router>
        <Header handleLogout={handleLogout} />
        <Route path='/' exact render={() => (
          (loggedIn && pokemonData) 
            ? <Redirect to='/play'/>
            : (loggedIn)
            ? <Redirect to='/create_pokemon'/>
            : <LandingPage/>
            // <Redirect to='/login' />
          )}
        />
        <Route path='/create_account' exact>
          <Register/>
        </Route>
        <Route path='/log_in' exact>
          <Login loggedIn={loggedIn} handleLogin={handleLogin} user={user} handleUser={(pk) => handleUser(pk)} refreshUserPokemon={refreshUserPokemon} />
        </Route>
        <Route path='/about' exact>
          <About/>
        </Route>
        <Route path='/play' exact>
          <Gameset pokemonData={pokemonData} addHunger={addHunger} addHappiness={addHappiness} deleteData={deleteData}/>
          <div className="tempData">
            {/* <PokemonData pokemonData={pokemonData}/> */}
            <button onClick={() => updatePokemon(pokemonData.return_pokemon_id)}>Click Me!</button>
          </div>
        </Route>
        <Route path='/create_pokemon' exact>
          <CreatePokemon userID={user} refreshUserPokemon={refreshUserPokemon}/>
        </Route>
        <Footer  className="footer-brown"/>
      </Router>
    </div>
  );
}

export default App;
