import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowCategorias from './Components/ShowCategorias';


function App() {
  return (
     <BrowserRouter>
      <Routes>
          <Route path='/' element={<ShowCategorias/>} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
