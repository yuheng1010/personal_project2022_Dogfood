import './App.css';
import Header from "./components/Header"
import HomePage from './components/HomePage';
import Detail from "./components/Detail"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
      
    </div>
  );
}

export default App;
