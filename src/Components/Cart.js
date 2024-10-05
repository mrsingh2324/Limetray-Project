import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [saveMessage, setSaveMessage] = useState(null);
  const server = process.env.NODE_ENV === 'production' ? 'https://limetray-backend.onrender.com' : 'http://localhost:5000';

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${server}/cart`);
        setCartItems(response.data);
      } catch (error) {
        console.log('Error fetching cart items', error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    try {
      const updatedItem = cartItems.find(item => item.id === id);
      updatedItem.quantity = newQuantity;

      await axios.put(`${server}/cart/${id}`, { quantity: newQuantity });
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    } catch (error) {
      console.error('Error updating quantity', error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${server}/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item', error);
    }
  };

  const saveCart = async () => {
    try {
      // Send the current cart items to the backend to save
      const response = await axios.post(`${server}/cart/save`, { items: cartItems });
      
      // If successful, show a success message
      setSaveMessage('Cart saved successfully!');
    } catch (error) {
      console.error('Error saving cart:', error);
      setSaveMessage('Failed to save cart.');
    }
  };

  return (
    <div className='min-h-[600px] w-full flex flex-col p-8 text-xl justify-start items-center'>
      <h1 className='font-bold mb-4 text-3xl text-blue-600'>Your Cart</h1>
      
      <div className='w-full'>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className='border p-4 mb-4 rounded-lg shadow-lg flex justify-between items-center bg-white'>
              <div className='flex items-center'>
                {/* Item Image */}
                <img src={item.image} alt={item.name} className='h-24 w-24 object-cover mr-4 rounded-md' />
                <div>
                  <h3 className='font-bold text-lg'>{item.name}</h3>
                  <p className='text-sm text-gray-600'>Price: Rs. {item.price}</p>
                  <p className='text-sm text-gray-600'>Quantity: {item.quantity}</p>
                  <div className='flex space-x-4 mt-2'>
                    <button
                      className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1} // Disable if quantity <= 1
                    >
                      -
                    </button>
                    <button
                      className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className='font-semibold'>Total: Rs. {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <h3 className='text-center text-gray-600 text-lg mt-4'>Your cart is empty</h3>
        )}
      </div>

      {/* Save Cart Button */}
      {cartItems.length > 0 && (
        <button
          onClick={saveCart}
          className='bg-green-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-green-600'
        >
          Save Cart
        </button>
      )}

      {/* Display Save Cart Message */}
      {saveMessage && (
        <div className={`mt-4 p-4 rounded-lg ${saveMessage.includes('success') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {saveMessage}
        </div>
      )}
    </div>
  );
}

export default Cart;
