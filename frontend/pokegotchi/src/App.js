import './App.css';
import PokemonData from "./components/PokemonData"
import Footer from "./components/Footer"

import About from "./pages/About"
import LandingPage from "./pages/LandingPage"

import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  
  const updatePokemon = async () => {
    fetch("http://localhost:8000/gameupdate")
    .then(response => response.json())
    .then(data => console.log(data))
  }

  //window.setInterval(updatePokemon, 10000)

  

  return (
    <Router>
      <Route path='/' exact>
        <LandingPage/>
      </Route>
      <Route path='/create_account' exact>
        <p>Create Account Page</p>
      </Route>
      <Route path='/log_in' exact>
        <p>Log In Page</p>
      </Route>
      <Route path='/about' exact>
        <About/>
      </Route>
      <Route path='/play' exact>
        <p>Game Page</p>
        <div className="App">
        <div>Pokemon Data:
          <PokemonData />
          <button onClick={updatePokemon}>Click Me!</button>
        </div>
      </div>
      </Route>
     
      <Footer  className="Footer"/>
    </Router>
  );
}

export default App;
