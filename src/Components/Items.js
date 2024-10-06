import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/spinner.css';
const Items = () => {
    const [loading, setLoading] = useState(false); // State to manage loading spinner
    const server = process.env.NODE_ENV === 'production' ? 'https://limetray-backend.onrender.com' : 'http://localhost:5000';

    const itemsList = [
        { id: 1, name: 'Nike Air Max', price: 1500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4SNWynw6HJYi0f3SSDS3-66LktlqMWKSgQw&s' },
        { id: 2, name: 'Adidas Ultraboost', price: 1800, image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/dfa07f83ea7d4c94bac5622413432f16_9366/Ultraboost_5_Shoes_White_ID8840.jpg' },
        { id: 3, name: 'Puma RS-X', price: 1200, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1000,h_1000/global/380462/01/sv01/fnd/PNA/fmt/png' },
        { id: 4, name: 'New Balance 990v5', price: 1750, image: 'https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$' }
    ];

    const addToCart = async (item) => {
        setLoading(true); // Start the loader
        try {
            const existingItem = await axios.get(`${server}/cart/${item.id}`);

            if (existingItem.data) {
                const updatedItem = {
                    ...existingItem.data,
                    quantity: existingItem.data.quantity + 1
                };
                const response = await axios.put(`${server}/cart/${item.id}`, updatedItem);
                console.log('Cart Updated (Incremented Quantity):', response.data);
                toast.success('Quantity updated in cart'); // Success toast
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                try {
                    const newItem = { ...item, quantity: 1 };
                    const response = await axios.post(`${server}/cart`, newItem);
                    console.log('Item Added to Cart:', response.data);
                    toast.success('Item added to cart'); // Success toast
                } catch (postError) {
                    console.error('Error adding new item:', postError);
                    toast.error('Error adding the item to the cart'); // Error toast
                }
            } else {
                console.error('Error adding/updating item:', error);
                toast.error('Error adding or updating the cart'); // Error toast
            }
        } finally {
            setLoading(false); // Stop the loader
        }
    };

    return (
        <div className="bg-gray-100 py-8 px-4">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Shop Our Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {itemsList.map(item => (
                    <div key={item.id} className="bg-white border rounded-lg shadow-lg p-4">
                        <img src={item.image} alt={item.name} className="h-48 w-full object-cover mb-4 rounded-md" />
                        <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                        <p className="text-gray-500 mb-4">Rs. {item.price}</p>
                        <button
                            onClick={() => addToCart(item)}
                            className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <span className="loader"></span> // Display spinner while loading
                            ) : (
                                'Add to Cart'
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Toast container for displaying notifications */}
            <ToastContainer />
        </div>
    );
};

export default Items;
