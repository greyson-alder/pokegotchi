import './App.css';

import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  
  const fetchPokemon = async () => {
    fetch("http://localhost:8000/data")
    .then(response => response.json())
    .then(data => console.log(data))
  }

  //window.setInterval(fetchPokemon, 10000)

  fetchPokemon()

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
      <Route path='/about'>
        <p>About Page</p>
      </Route>
      <Route>
        <p>Game Page</p>
      </Route>
      <div className="App">
        
      </div>
    </Router>
  );
}

export default App;
