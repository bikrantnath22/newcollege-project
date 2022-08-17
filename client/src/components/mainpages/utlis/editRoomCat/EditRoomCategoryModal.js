import React,{useState,useEffect,useContext} from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";

const initialState = {
    title: "",
};

export default function EditRoomCategoryModal({ open, onClose ,room_id}) {
    const state = useContext(GlobalState);
    const [roomCategory,setRoomCategory] = useState(initialState)
    const [token] = state.token;
    const [isAdmin] = state.userAPI.isAdmin;
    const {title} = roomCategory
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        console.log(room_id)
        getRoomCategory()
    }, [])

    const getRoomCategory =async () =>{
        try{
            const roomCategory = await axios.get(`/api/room/roomCategory/${room_id}`)
            console.log(roomCategory.data.roomCategory)
            setRoomCategory(roomCategory.data.roomCategory)
        }
        catch(error){
            console.log(error)
        }
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setRoomCategory({ ...roomCategory, [name]: value });
      };

    
      const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
           

         
            
           
            const res = await axios.patch(`/api/roomCategory/${room_id}`, {...roomCategory}, {
                headers: {Authorization: token}
            })
            console.log(res.data)
            setRoomCategory(initialState)
            setCallback(!callback)
            
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
   


  return (
    <div>
      <Modal open={open} onClose={onClose} center>
        <h1 style={{
            fontSize:'25px'
        }}> Update </h1>
        <form style={{
            display:'flex',
            flexDirection:'column'
        }}
        onSubmit={
                handleSubmit
             }
        >
          <input style={{
            border:'1px solid #444444',
            width:'500px',
            height:'30px'
          }}
          name="title"
          value={roomCategory.title}
          onChange={handleChangeInput}
          />
          <button style={{
            marginTop:'5px',
            backgroundColor: '#727272',
            color:'#fff'
          }}>Update</button>
        </form>
      </Modal>
    </div>
  );
}
