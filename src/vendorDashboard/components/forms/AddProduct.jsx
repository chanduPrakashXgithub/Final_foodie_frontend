import React, { useState } from 'react';
import { API_URl } from '../../data/apiPath'

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prevCategory) =>
      prevCategory.includes(value)
        ? prevCategory.filter((item) => item !== value)
        : [...prevCategory, value]
    );
  };

  const handleBestSellerChange = (e) => {
    setBestseller(e.target.checked);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('login-token');
      const firmId = localStorage.getItem('firmId');
      if (!loginToken || !firmId) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login"; // or your login route
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      category.forEach((value) => formData.append('category', value));
      formData.append('description', description);
      formData.append('image', image);
      formData.append('bestseller', bestseller);

      const response = await fetch(`${API_URl}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${loginToken}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        alert('Product added successfully');
        setProductName('');
        setPrice('');
        setCategory([]);
        setBestseller(false);
        setImage('');
        setDescription('');
      } else {
        console.error(data.message);
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className='FirmSection'>
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name :</label>
        <input
          type='text'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        /><br/>
        <label>Price: </label>
        <input
          type='text'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br/>
        <label>Category: </label> <br/>
        <select multiple value={category} onChange={handleCategoryChange}>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select><br/>
        <label>Best Seller: </label>
        <input
          type="checkbox"
          checked={bestseller}
          onChange={handleBestSellerChange}
        /><br/><br/>
        <label>Description: </label>
        <textarea
          rows="4"
          cols="47"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea><br/>
        <label>Product Image</label><br/>
        <input
          type='file'
          onChange={(e) => setImage(e.target.files[0])}
        /><br/>
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct;
