import logo from './logo.svg';
import './App.css';
import Cart from './Components/Cart';
import Items from './Components/Items';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold hover:underline">
            <img src={logo} alt="Logo" className="h-8 inline-block mr-2" /> Limetray
          </Link>
          <div className="flex space-x-4 font-bold text-2xl">
            <Link to="/" className="text-white hover:bg-blue-400 px-4 py-2 rounded transition duration-200">
              All Items
            </Link>
            <Link to="/cart" className="text-white hover:bg-blue-400 px-4 py-2 rounded transition duration-200">
              Cart
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
