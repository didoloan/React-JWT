import logo from './logo.svg';
import './App.css';
import {Router, Link} from '@reach/router';
// import { Dashboard, Login, Register } from './views/index'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
import Navbar from './components/navbar'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Login path="/login" />
        <Register path="/register" />
        <Dashboard path="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
