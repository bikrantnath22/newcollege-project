import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <h5>Name</h5>
                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />
                <h5>Email</h5>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />
                <h5>Password</h5>
                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link style={{
                        color:"dimgrey"
                    }}  to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register