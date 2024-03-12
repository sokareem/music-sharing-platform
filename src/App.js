import './App.css';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';


function App() {


  return (
    <div className="App">
      <header className="App-header">
        {/* <AuthProvider> */}
        <Navbar />
        <HomePage />
      {/* </AuthProvider> */}
      </header>
    </div>
  );
}

export default App;
