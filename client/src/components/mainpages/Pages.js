import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'

import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utlis/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import CreateRoom from './createProduct/CreateRoom'
import ViewRoom from './products/ViewRoom'
import SearchResult from './products/search/SearchResult'
import EditRoom from './createProduct/EditRoom'
import createRoomCategory  from './createProduct/createRoomCategory'




import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />
            
            

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

             <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
             <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
             <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} /> 

             <Route path="/create_room/:product_id" exact component={isAdmin ? CreateRoom : NotFound} />
             <Route path="/view_room/:id" exact component={isAdmin ? ViewRoom : NotFound} />
             <Route path="/editroom/:id/:h_id" exact component={isAdmin ? EditRoom : NotFound} />
             <Route path="/create-room-category/:id" exact component={isAdmin ? createRoomCategory : NotFound} />

             <Route path="/history" exact component={isLogged ?   OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} /> 

            <Route path="/cart" exact component={Cart} />

            <Route exact path="/search-result" component={SearchResult} />
            

           


            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
