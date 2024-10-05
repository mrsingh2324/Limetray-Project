import React from 'react';
import axios from 'axios';


const Items = () => {

const server = process.env.NODE_ENV === 'production' ? 'https://limetray-backend.onrender.com' : 'http://localhost:5000';
    
    const itemsList = [
        { id: 1, name: 'Item 1', price: 100 },
        { id: 2, name: 'Item 2', price: 200 },
        { id: 3, name: 'Item 3', price: 300 },
        { id: 4, name: 'Item 4', price: 400 },
    ];

    // Function to add an item to the cart, or update the quantity if it already exists in the cart
    
    const addToCart = async (item) => {
        try {
            // Try to get the item from the cart by ID
            const existingItem = await axios.get(`${server}/cart/${item.id}`);
            
            // If the item exists, update the quantity
            if (existingItem.data) {
                const updatedItem = {
                    ...existingItem.data,
                    quantity: existingItem.data.quantity + 1
                };
                const response = await axios.put(`${server}/cart/${item.id}`, updatedItem);
                console.log('Cart Updated (Incremented Quantity):', response.data);
                alert('Quantity updated in cart');
            }
        } catch (error) {
            // Check if error is 404, meaning the item isn't in the cart yet
            if (error.response && error.response.status === 404) {
                try {
                    // Item not in the cart, add it as a new item
                    const newItem = { ...item, quantity: 1 };
                    const response = await axios.post(`${server}/cart`, newItem);
                    console.log('Item Added to Cart:', response.data);
                    alert('Item added to cart');
                } catch (postError) {
                    console.error('Error adding new item:', postError);
                    alert('Error adding the item to the cart');
                }
            } else {
                console.error('Error adding/updating item:', error);
                alert('Error adding or updating the cart');
            }
        }
    };
    
    return (
        <div className='bg-gray-400 border'>
            <h1 className='text-red-500'>Items</h1>
            <div>
                {itemsList.map(item => (
                    <div key={item.id} className='border p-4 rounded-lg'>
                        <h3>{item.name}</h3>
                        <h4>{item.price}</h4>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Items;
