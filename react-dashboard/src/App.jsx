import Header from './components/Header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/products' element={<Main />} />
        <Route path='/products/:id' element={<Main />} />
        <Route path='/categories' element={<Main />} />
        <Route path='/categories/:id' element={<Main />} />
        <Route path='/users' element={<Main />} />
        <Route path='/users/:id' element={<Main />} />
        <Route path='/sales' element={<Main />} />
        <Route element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
