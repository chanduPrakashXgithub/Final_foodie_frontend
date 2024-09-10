import React, { useState } from 'react';
import { API_URl } from '../../data/apiPath';

const AddFirm = () => {
    const [firmName, setFirmName] = useState('');
    const [area, setArea] = useState('');
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setCategory((prevCategory) =>
            prevCategory.includes(value)
                ? prevCategory.filter((item) => item !== value)
                : [...prevCategory, value]
        );
    };

    const handleRegionChange = (event) => {
        const value = event.target.value;
        setRegion((prevRegion) =>
            prevRegion.includes(value)
                ? prevRegion.filter((item) => item !== value)
                : [...prevRegion, value]
        );
    };

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setFile(selectedImage);
    };

    const handleFirmSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        if (!firmName || !area || category.length === 0 || region.length === 0 || !offer || !file) {
            setError('Please fill in all the required fields.');
            setLoading(false);
            return;
        }

        try {
            const loginToken = localStorage.getItem('login-token');
            if (!loginToken) {
                setError('User Not Authenticated');
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('firmname', firmName);
            formData.append('area', area);
            category.forEach((value) => formData.append('category', value));
            region.forEach((value) => formData.append('region', value));
            formData.append('offer', offer);
            formData.append('image', file);

            const response = await fetch(`${API_URl}/firm/add-firm`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${loginToken}` },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                alert('Firm added successfully');
                setFirmName('');
                setArea('');
                setCategory([]);
                setRegion([]);
                setOffer('');
                setFile(null);
                localStorage.setItem('firmId', data.firmId); // Store firmId in localStorage
            } else if(data.message === "vendor can have only one firm") {
                setError("Firm Exists. Only one firm added");
            } else {
                setError(data.message || 'Failed to add firm');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred while adding the firm.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='FirmSection'>
            <form className="tableForm" onSubmit={handleFirmSubmit}>
                <h3>Add Firm</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>Firm Name</label>
                <input
                    type='text'
                    name='firmName'
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                /><br />
                <label>Area </label>
                <input
                    type='text'
                    name='area'
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                /><br />
                <label>Category </label><br />
                <select multiple value={category} onChange={handleCategoryChange}>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                </select><br />
                <label>Region </label><br />
                <select multiple value={region} onChange={handleRegionChange}>
                    <option value="north-indian">North-Indian</option>
                    <option value="south-indian">South-Indian</option>
                    <option value="east-indian">East-Indian</option>
                    <option value="west-indian">West-Indian</option>
                </select><br />
                <label>Offer </label>
                <input
                    type='text'
                    name='offer'
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                /><br />
                <label>Firm Image</label><br />
                <input type='file' onChange={handleImageUpload} /><br />
                <div className="btnSubmit">
                    <button type='submit' disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFirm;
