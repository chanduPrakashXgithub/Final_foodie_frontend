import React , {useState} from 'react'
import { API_URl } from '../../data/apiPath'

const Login = ({ ShowWelcomeHandler }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URl}/vendors/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert("Login successful");
                localStorage.setItem('login-token', data.token);
                setEmail('');
                setPassword('');
                ShowWelcomeHandler();
                window.location.reload()
            } else {
                alert(data.message || "Login failed");
            }
            const vendorsId = data.vendorsId;
            const vendorsResponse =await fetch(`${API_URl}/vendors/single-vendor/${vendorsId}`)
            const vendorData=await vendorsResponse.json();
            if(vendorsResponse.ok){
                const vendorFirmId=vendorData.vendorFirmId;
                const vendorFirmName=vendorData.vendor.firm[0].firmName;
                localStorage.setItem('firmName',vendorFirmName);

                localStorage.setItem('firmId',vendorFirmId);
                window.location.reload()

            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='loginSection'>
            <form className='authForm' onSubmit={LoginHandler}>
                <h3>Vendor Login</h3>
                <label>Email</label>
                <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                /><br />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                /><br />
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Login;