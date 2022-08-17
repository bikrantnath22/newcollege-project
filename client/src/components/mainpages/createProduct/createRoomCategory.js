import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utlis/loading/Loading";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import { DatePicker } from "antd";
import "antd/dist/antd.css";
import EditRoomCategoryModal from "../utlis/editRoomCat/EditRoomCategoryModal";

const initialState = {
  title: "",
};

function CreateRoom() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [room, setRoom] = useState(initialState);

  const history = useHistory();
  const param = useParams();
  
  const [token] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const [detailProduct, setDetailProduct] = useState([]);
  // const [onEdit, setOnEdit] = useState(false);
  const [roomCategorys, setRoomCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(param);
  const [callback, setCallback] = state.productsAPI.callback;
  const [id, setID] = useState("");
  const [open, setOpen] = useState(false);
  const [room_id, setRoom_id] = useState("");
  const products_id = useParams().id;
  const onOpenModal = (theDamFankson) => theDamFankson(true); // theDamFankson is variable
  const onCloseModal = (theDamFankson) => theDamFankson(false);

  console.log(room_id);
  useEffect(() => {
    if (param.id) {
      products.forEach((product) => {
        if (product._id === param.id) setDetailProduct(product);
      });
    }
    console.log(products);
  }, [param.id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      //   if (onEdit) {
      //     await axios.put(`/api/roomCategory/${param.id}`, room, {
      //       headers: { Authorization: token },
      //     });
      else {
        await axios.post(`/api/products/roomCategory/${param.id}`, room, {
          headers: { Authorization: token },
        });
      }
      // setOnEdit(false);
      setRoom("");
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };
  const deleteRoom = async (id) => {
    try {
      setLoading(true);

      const deleteRoom = await axios.delete(
        `http://localhost:5000/api/roomCategory/${id}?products_id=${products_id}` ,
        {
          headers: { Authorization: token },
        }
      );
      if (deleteRoom.status === 200) {
      setRoomCategory((roomCategorys) => roomCategorys.filter((roomCategory) => roomCategory._id !== id))
      setCallback(!callback);
      setLoading(false);
      alert("😍  deleted!");
      return}
      else{
        alert("😭 Unable to delete!");
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const getRoomCategories = async () => {
    console.log(param);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/roomCategory/${param.id}`,
        {
          headers: { Authorization: token },
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        setLoading(false);
        setRoomCategory(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoomCategories();
  }, []);

  return (
    <div className="create_product">
      <form onSubmit={handleSubmit}>
        {/* <div className="row">
                     <label htmlFor="product_id">Room ID</label>
                     <input type="text" name="product_id" id="product_id" required
                    value={room._id} onChange={handleChangeInput}   />
                </div> */}

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={roomCategorys.title}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit">Create</button>
      </form>
      {open && (
        <EditRoomCategoryModal
          open={open}
          room_id={room_id._id}
          onClose={() => onCloseModal(setOpen)}
          center
        />
      )}
      <div className="col">
        {roomCategorys.map((roomCategory) => (
          <div
            className=""
            key={roomCategory._id}
            style={{
              display: "flex",
              border: "1px solid #727272",

              padding: "5px",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#4f4f4f",
              }}
            >
              {roomCategory.title}
            </p>
            <div>
              <button
                style={{
                  marginRight: "10px",
                  color: "green",
                }}
                onClick={() => {
                  onOpenModal(setOpen);
                  setRoom_id(roomCategory);
                }}
              >
                Edit
              </button>
              <button
                style={{
                  color: "red",
                }}
                onClick={() => {
                       
                          deleteRoom(roomCategory._id);
                        
                      }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateRoom;
