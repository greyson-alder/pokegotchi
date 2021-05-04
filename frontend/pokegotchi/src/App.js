import './App.css';
import PokemonData from "./components/PokemonData"

import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  
  const fetchPokemon = async () => {
    fetch("http://localhost:8000/gameupdate")
    .then(response => response.json())
    .then(data => console.log(data))
  }

  //window.setInterval(fetchPokemon, 10000)

  

  return (
    <Router>
      <Route path='/' exact>
        <p>Landing Page</p>
      </Route>
      <Route path='/create_account' exact>
        <p>Create Account Page</p>
      </Route>
      <Route path='/log_in' exact>
        <p>Log In Page</p>
      </Route>
      <Route path='/about' exact>
        <p>About Page</p>
      </Route>
      <Route path='/play' exact>
        <p>Game Page</p>
      </Route>
      <div className="App">
        <button onClick={fetchPokemon}>Click Me!</button>
        <div>Pokemon Data:
          <PokemonData />
        </div>
      </div>
    </Router>
  );
}

export default App;
