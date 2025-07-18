import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const RegistrationForm = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const  onSubmitForm = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method:"Post",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({username, email, password})
            });
            if(!response.ok){
                alert("Error Fetching Data from api")
                return
            }

            const data = await(response.json())
            console.log(data)
            alert(`${username}, you have Successfully Registered`)

        } catch (error) {
            console.error("Error Occurred, after data fetched", error.message)
        }

        setUsername("")
        setEmail('')
        setPassword('')


    }

    
  return (
    <div>
        <form onSubmit={onSubmitForm}>

            {/* Username Section  */}

            <label>Username</label>
            <input type="text" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Enter username here: '
            />

            {/* Email Section  */}
            <br/>

            <label>Email</label>
            <input type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter email here: '
            />

            {/* Password Section */}
            <br/>

            <label>Password</label>
            <input type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter password here: '
            />

            <br/>

            <button type='submit'>Submit</button>
        </form>

        <div>
            <p>Already Have an account <Link to="/login" >Login</Link> </p>
        </div>
        
    </div>
  )
}

export default RegistrationForm