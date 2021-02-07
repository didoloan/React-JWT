import logo from './logo.svg';
import './App.css';
import {Router, Link} from '@reach/router';
import Views from './views';
import Navbar from './components/navbar'

const { Dashboard, Login, Register } = Views;

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Login path="/" />
        <Login path="/login" />
        <Register path="/register" />
        <Dashboard path="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
