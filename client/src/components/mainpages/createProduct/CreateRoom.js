import React, {useState, useContext,useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utlis/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import moment from 'moment'

import {DatePicker} from 'antd'
import 'antd/dist/antd.css'



const initialState = {
       product_id: '',
       title: '',
       price: 0,
       description: '',
        // inStock: 0,
        createDate:'',
        outDate:'',
        // sold:'',
        hotelName: '',
        roomCategory:'',
        
} 

 function CreateRoom() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products;
    const [room,setRoom]=useState(initialState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [createDate] = useState(new Date());
    const [outDate] = useState(new Date());
    const [roomCategorys,setRoomCategory] =useState([])

    const history = useHistory()
    const param = useParams()

    const [token] = state.token
    const [isAdmin] = state.userAPI.isAdmin
    const [detailProduct, setDetailProduct] = useState([]);

    
    const [callback, setCallback] = state.productsAPI.callback


    useEffect(() => {
        console.log('dd')
        if (param.id) { 
           
          products.forEach((product) => {
            if (product._id === param.id) setDetailProduct(product);
          });
          
        }
        console.log(products)
       
      }, [param.id, products]);

    
    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
        const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setRoom({...room, [name]:value})
        
       

    }

    const getRoomCategories =async () => { 
        console.log(param)
        try{
            const res =await axios.get(
                `http://localhost:5000/api/products/roomCategory/${param.product_id}`,{
                    headers: {Authorization: token}
                }
            )
            if(res.status===200){ 
                console.log(res.data)
                setLoading(false)
                setRoomCategory(res.data)
            }
           
        }catch(error){
            console.log(error)
        }
    };

    
    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            // if(onEdit){
            //     await axios.put(`/api/products/${_id}`, {..._id, images}, {
            //         headers: {Authorization: token}
            //     })}
            
            else{
                await axios.post(`/api/products/room/${param.product_id}`, {room, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    } 
    useEffect(()=>{
        getRoomCategories();
    },[])
    const styleUpload = {
               display: images ? "block" : "none"
            }

    return (
        
             <div className="create_product">
            <div className="upload">
               <input type="file" name="file" id="file_up" onChange={handleUpload}/>
              {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>
            
             <form onSubmit={handleSubmit}>
                 {/* <div className="row">
                     <label htmlFor="product_id">Room ID</label>
                     <input type="text" name="product_id" id="product_id" required
                    value={room._id} onChange={handleChangeInput}   />
                </div> */}

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={room.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={room.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={room.description} rows="5" onChange={handleChangeInput} />
                </div>
                {/* <div className="row">
                    <label htmlFor="hotelName">Hotel Name</label>
                    <input type="text" name="hotelName" id="hotelName" required
                    value={room.hotelName} onChange={handleChangeInput} />
                </div> */}
                {/* <div className="row">
                    <label htmlFor="inStock">Stock</label>
                    <input type="text" name="inStock" id="inStock" required
                    value={room.inStock} onChange={handleChangeInput} />
                </div> */}

               
                
                <div className="row">
                    <label>CreateDate</label>
                    <DatePicker type="Number" name="createDate" id="createDate" required
                    
                    selected={createDate} 
                    
                    onChange ={ date => setRoom({
                        ...room,createDate:date
                    })}
                    disabledDate={(current) =>
                        current && current.valueOf() < moment().subtract(1, "days")
                      }
                  
                    />
                </div>
                <div className="row">
                    <label>OutDate</label>
                    <DatePicker type="Number" name="outDate" id="outDate" required
                    
                    selected={outDate} 
                    
                    onChange ={ date => setRoom({
                        ...room,outDate:date
                    })}
                    disabledDate={(current) =>
                        current && current.valueOf() < moment().subtract(1, "days")
                      }
                  
                    />
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="roomCategory" value={room.roomCategory}  onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            roomCategorys.map(roomCategory => (
                                <option value={roomCategory._id} key={roomCategory._id}>
                                    {roomCategory.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                
       
                

               

                <button type="submit">{ "Create"}</button>
            </form>
            </div>
    )
}

export default CreateRoom






// import React, {useState, useContext, useEffect} from 'react'

// import axios from 'axios'
// import {GlobalState} from '../../../GlobalState'
// import Loading from '../utlis/loading/Loading'
// import {useHistory, useParams} from 'react-router-dom'


// const initialState = {
//     product_id: '',
//     title: '',
//     price: 0,
//     description: '',
   
//     createDate:'',
//     outDate:'',
//     sold:'',
//     hotelName: '',
    
// }


// function CreateRoom() {
//     const state = useContext(GlobalState)
//     const [product, setProduct] = useState(initialState)
//     const [room,setRoom]=useState(initialState)
//     const [images, setImages] = useState(false)
//     const [loading, setLoading] = useState(false)

//     const history = useHistory()
//     const param = useParams()

//     const [token] = state.token
//     const [isAdmin] = state.userAPI.isAdmin


//     const [products] = state.productsAPI.products
//     const [callback, setCallback] = state.productsAPI.callback



//     const handleUpload = async e =>{
//         e.preventDefault()
//         try {
//             if(!isAdmin) return alert("You're not an admin")
//             const file = e.target.files[0]
            
//             if(!file) return alert("File not exist.")

//             if(file.size > 1024 * 1024) // 1mb
//                 return alert("Size too large!")

//             if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
//                 return alert("File format is incorrect.")

//             let formData = new FormData()
//             formData.append('file', file)

//             setLoading(true)
//             const res = await axios.post('/api/upload', formData, {
//                 headers: {'content-type': 'multipart/form-data', Authorization: token}
//             })
//             setLoading(false)
//             setImages(res.data)

//         } catch (err) {
//             alert(err.response.data.msg)
//         }
//     }

//     const handleDestroy = async () => {
//         try {
//             if(!isAdmin) return alert("You're not an admin")
//             setLoading(true)
//             await axios.post('/api/destroy', {public_id: images.public_id}, {
//                 headers: {Authorization: token}
//             })
//             setLoading(false)
//             setImages(false)
//         } catch (err) {
//             alert(err.response.data.msg)
//         }
//     }

//     const handleChangeInput = e =>{
//         const {name, value} = e.target
//         setRoom({...product, [name]:value})
        
       


//     const handleSubmit = async e =>{
//         e.preventDefault()
//         try {
//             if(!isAdmin) return alert("You're not an admin")
//             if(!images) return alert("No Image Upload")

//             // if(onEdit){
//             //     await axios.put(`/api/products/${_id}`, {..._id, images}, {
//             //         headers: {Authorization: token}
//             //     })}
            
//             else{
//                 await axios.post(`/api/products/room/${param.product_id}`, {room, images}, {
//                     headers: {Authorization: token}
//                 })
//             }
//             setCallback(!callback)
//             history.push("/")
//         } catch (err) {
//             alert(err.response.data.msg)
//         }
//     }


//     const styleUpload = {
//         display: images ? "block" : "none"
//     }

//     return (
//         <div className="create_product">
//             <div className="upload">
//                 <input type="file" name="file" id="file_up" onChange={handleUpload}/>
//                 {
//                     loading ? <div id="file_img"><Loading /></div>

//                     :<div id="file_img" style={styleUpload}>
//                         <img src={images ? images.url : ''} alt=""/>
//                         <span onClick={handleDestroy}>X</span>
//                     </div>
//                 }
                
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div className="row">
//                     <label htmlFor="product_id">Room ID</label>
//                     <input type="text" name="product_id" id="product_id" required
//                     value={room._id} onChange={handleChangeInput}   />
//                 </div>

//                 <div className="row">
//                     <label htmlFor="title">Title</label>
//                     <input type="text" name="title" id="title" required
//                     value={room.title} onChange={handleChangeInput} />
//                 </div>

//                 <div className="row">
//                     <label htmlFor="price">Price</label>
//                     <input type="number" name="price" id="price" required
//                     value={room.price} onChange={handleChangeInput} />
//                 </div>

//                 <div className="row">
//                     <label htmlFor="description">Description</label>
//                     <textarea type="text" name="description" id="description" required
//                     value={room.description} rows="5" onChange={handleChangeInput} />
//                 </div>

               
                
//                 <div className="row">
//                     <label>startDate</label>
                   
//                 </div>
//                 <div className="row" >
//                     <label>endDate</label>
                   
                    
                  
                    
                   
                  
                    
//                 </div>
//                 {/* <div className="row">
//                     <label htmlFor="location">Room</label>
//                     <input type="text" name="room" id="room"  required
//                     value={product.room} onChange={handleChangeInput} />
//                 </div>
//         */}
       
                

               

//                 <button type="submit">{ "Create"}</button>
//             </form>
//         </div>
//     )
// }    

// }
// export default CreateRoom