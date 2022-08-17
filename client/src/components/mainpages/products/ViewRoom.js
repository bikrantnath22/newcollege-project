import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utlis/loading/Loading";
import ProductItem1 from "../utlis/productItem/ProductItem1";
import moment from "moment";
import axios from "axios";

function ViewRoom() {
  const params = useParams();

  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  // const addCart =state.userAPI.addCart
  const [detailProduct, setDetailProduct] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  // const param = useParams
  // console.log(detailProduct)

  useEffect(() => {
   
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
   
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  const deleteRoom = async (r_id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteRoom = await axios.delete(`/api/room/${params.id}/${r_id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteRoom;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <div
        className="detail"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          
        }}
      >
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            {/* <h6> {detailProduct.product_id}</h6> */}
          </div>
          {/* <span>Price-USD{detailProduct.price}</span> */}
          <p>Abouts-{detailProduct.description}</p>
          <h5>Location-{detailProduct.location}</h5>

          <p>
            Available from <br />{" "}
            {moment(new Date(detailProduct.startDate)).format("MMMM Do YYYY,")}
          </p>

          {/*                 
                <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(detailProduct.startDate, detailProduct.endDate)}{" "}
                {diffDays(detailProduct.startDate, detailProduct.endDate) <= 1 ? " day" : " days"}
              </span>
            </p> */}

          {/* <p>Booked - {detailProduct.sold}</p> */}

          {/* <p>{detailProduct.Rooms!==undefined?detailProduct.Rooms:'No Rooms'}</p>  */}
          {/* {detailProduct.Rooms!==undefined?(detailProduct.Rooms.map((room,index)=>(
                        <p key={index}> { room }</p>
                    ))):(<p>No rooms</p>)} */}

          {/* <Link to="/cart" className="cart"
                     onClick={() => addCart(detailProduct)}>
                        Booked Your Hotel
                    </Link>
                     */}
        </div>
      </div>
      <div className="products1">
        {detailProduct.Rooms.map((Room) => {
          return (
            <ProductItem1
              key={Room._id}
              product={Room}
              isAdmin={isAdmin}
              deleteRoom={deleteRoom} 
              available = {true}
              detailProduct={detailProduct}
            />
          );
        })}
      </div>
    </>
  );
}
export default ViewRoom;
