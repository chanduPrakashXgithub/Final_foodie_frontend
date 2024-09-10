import React, { useState, useEffect } from 'react';
import { API_URl } from '../../data/apiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const ProductHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        if (!firmId) {
            alert("Firm ID not found in local storage");
            return;
        }
        try {
            const response = await fetch(`${API_URl}/product/${firmId}/products`);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const newProductData = await response.json();
            setProducts(newProductData.products);
        } catch (error) {
            console.log(error);
            alert("Failed to fetch products");
        }
    };

    const deleteProduct = async (productId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`${API_URl}/product/${productId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            setProducts(products.filter(product => product._id !== productId));
            alert("Product successfully deleted");
        } catch (error) {
            console.log(error);
            alert("Failed to delete product");
        }
    };

    useEffect(() => {
        ProductHandler();
    }, []);

    return (
        <div>
            {products.length === 0 ? (
                <p>No products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img src={`${API_URl}/uploads/${item.image}`} alt={item.productName} />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProducts;
