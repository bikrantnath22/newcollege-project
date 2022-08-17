import React , {useContext} from "react";
import {GlobalState} from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';

import {Link} from 'react-router-dom';
import axios from 'axios';


function Header(){
    const state=useContext(GlobalState)
    const [isLogged] =state.userAPI.isLogged
    const [isAdmin] =state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    const logoutUser = async () =>{
        await axios.get('user/logout')


        localStorage.removeItem('firstLogin')
        
        window.location.href ='/'

    }


    const adminRouter=()=>{
        return(
            <>  
                <li>
                    <Link to="/create_product">Create Hotel</Link>
                </li>
                <li>
                    <Link to="/category">Categories</Link>
                </li>
            </>
        )
    }
    const loggedRouter=()=>{
        return(
            <>  
                <li>
                    <Link to="/history"> History</Link>
                </li>
                <li>
                    <Link to="/" onClick={logoutUser}>Logout</Link>
                </li>
            </>
        )
    }



    return(
        <header>
            <div className='menu'>
                <img src={Menu} alt=""  width="30" />
            </div>
            <div className='logo'>
                <h2>
                    <Link to="/">{isAdmin ? 'Admin' :'fuFu Travels'}
                    {/* <img src={isAdmin ? 'Admin' : 'VIV'} alt=""  
                    width="45"
                     /> */}
                    </Link>
                </h2>
                
            </div>
            <ul>
                <li><Link to="/">{isAdmin ? 'Hotels' :'Hotels'}</Link></li>

                {isAdmin  && adminRouter()}

                {

                    isLogged ? loggedRouter():   <li><Link to="/login">Login + Register</Link></li>
                }
                <li>
                    <img src={Close} alt="" width="30"  className="menu"  />
                </li>
            </ul>

            {
                isAdmin ? ''
                
                :<div className="cart-icon">
                   
                    <Link to="/cart" style={{
                        display:'flex'
                    }}>
                      
                       <p style={{
                        marginRight:'10px'
                       }}>My List</p>
                       <span style={{
                        backgroundColor:'#d3d3d3',
                        height:'28px',
                        padding:'2px 5px',
                        borderRadius:'50%'
                       }}>{cart.length}</span>
                     </Link>
                 </div>
            }


            
        </header>
    )
}


export default Header