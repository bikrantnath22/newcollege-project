import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    // console.log(res.data)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    

                    setCart(res.data.cart)

                } catch (err) {
                    // alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    const addCart = async (product) => { 
        const dates = await sessionStorage.getItem('date') ; 
        if(!isLogged) return alert("Please login to continue buying")
        console.log(product)
        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1,date:dates}])
            await axios.patch('/user/addcart', { cart: [...cart, {...product, quantity: 1,date:dates}]}, {
                headers: {Authorization: token}
            })

        }else{
            // alert("This Room has been already added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI