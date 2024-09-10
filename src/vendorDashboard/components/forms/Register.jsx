import React ,{useState} from 'react'
import { API_URl } from '../../data/apiPath'

const Register = ({showLoginHandler}) => {
    const [username , setUsername]=useState("")
    const [password , setPassword]=useState("")
    const [email , setEmail]=useState("")
    const [error , setError]=useState("")
    const [loading , setLoading]=useState(true)
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${API_URl}/vendors/register`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username , email ,password})
            })
            const data = await response.json()
            if(response.ok){
                setUsername('')
                setPassword('')
                setEmail('')
                console.log(data);
                alert("vendor registered successfully")
                showLoginHandler()
            }

            
        } catch (error) {
            console.log("resitration failed");
            alert("registration failed")
            
        }

    }
  return (
    <div className='registerSection'>
        <form className='authForm' onSubmit={HandleSubmit} >
        <h3>
            Vendor Register
        </h3>
        <label>
                Username
            </label> 
            <input type='text' name='username'value={username} onChange ={(e)=> setUsername(e.target.value)} placeholder='Username' /><br/>
            <label>
                Email
            </label> 
            <input type='email' name='email' value={email} onChange ={(e)=> setEmail(e.target.value)} placeholder='Enter your email' /><br/>
            <label>Password</label>
            <input type='password' name='password' value={password} onChange ={(e)=> setPassword(e.target.value)}placeholder='Enter your password' /><br/>
            <div className="btnSubmit">
            <button type='submit' >Submit</button>

            </div>
           
        </form>
    </div>
  )
}

export default Register