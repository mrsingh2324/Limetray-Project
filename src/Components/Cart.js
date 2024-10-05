import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const server = 'http://localhost:5000';

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

  return (
    <div className='border border-black h-[600px] w-full flex flex-col p-8 text-xl justify-start items-center'>
      <h1 className='font-bold mb-4 text-2xl'>Cart Items</h1>
      <div className='w-full'>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className='border p-4 mb-4 rounded-lg shadow-lg flex justify-between items-center bg-gray-100'>
              <div>
                <h3 className='font-bold'>{item.name}</h3>
                <p className='text-sm text-gray-600'>Price: ${item.price}</p>
                <p className='text-sm text-gray-600'>Quantity: {item.quantity}</p>
                <div className='flex space-x-4'>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded'
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded'
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1} // Disable if quantity <= 1
                  >
                    -
                  </button>
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded'
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>Your cart is empty</h3>
        )}
      </div>
    </div>
  );
}

export default Cart;
