import './App.css';
import PokemonData from "./components/PokemonData"

function App() {
  
  const fetchPokemon = async () => {
    fetch("http://localhost:8000/gameupdate")
    .then(response => response.json())
    .then(data => console.log(data))
  }

  //window.setInterval(fetchPokemon, 10000)

  

  return (
    <div className="App">
        <button onClick={fetchPokemon}>Click Me!</button>
        <div>Pokemon Data:
          <PokemonData />
        </div>
    </div>
  );
}

export default App;
