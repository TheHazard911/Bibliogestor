import React from 'react'
import Form_login from '../components/forms/form_login'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
            <div className='background-login'>
                <div className="link-to-house">
                         <ul className='item-nav-login'>
                            <li>
                                <Link to="/"><i className="bi bi-house"></i></Link>
                            </li>
                         </ul>
                </div>
                <Form_login />
            </div>
        </>
    )
}

export default Login
