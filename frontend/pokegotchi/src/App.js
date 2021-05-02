import './App.css';

function App() {
  
  const fetchPokemon = async () => {
    fetch("http://localhost:8000/data")
    .then(response => response.json())
    .then(data => console.log(data))
  }

  window.setInterval(fetchPokemon, 10000)

  fetchPokemon()

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
