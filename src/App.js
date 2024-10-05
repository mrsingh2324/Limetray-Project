import logo from './logo.svg';
import './App.css';
import Cart from './Components/Cart';
import Items from './Components/Items';
import {Routes, Route, Link} from 'react-router-dom';
function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Items</Link>
          </li>
          <li>
            <Link to='/cart'>Cart</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Items />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
