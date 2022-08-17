import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utlis/productItem/ProductItem";
import ProductItem1 from "../utlis/productItem/ProductItem1";
import Loading from "../utlis/loading/Loading";
import moment from "moment";
import { isAfter, isBefore } from "date-fns";
import axios from "axios";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  // const addCart =state.userAPI.addCart
  const [detailProduct, setDetailProduct] = useState([]);
  const [roomCategorys, setRoomCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  // const [data,setData] = useState([])
  const [token] = state.token;
  const dates = sessionStorage.getItem("date");
  const covertToDate = (str) => new Date(str);
  function isRoomAvail(arr) {
    let flag = true;
    if (!Array.isArray(arr)) return flag;
    for (let i = 0; i < arr.length; ++i) {
      const item = arr[i];
      if (
        !(
          isAfter(
            covertToDate(dates.split(",")[0]),
            covertToDate(item.split(",")[1])
          ) ||
          isBefore(
            covertToDate(dates.split(",")[1]),
            covertToDate(item.split(",")[0])
          )
        )
      ) {
        flag = false;
        break;
      }
    }

    return flag;
  }
  // console.log(detailProduct)
  // const location = useLocation()

  // useEffect(() => {
  //   console.log("re render");
  //   if (params.id) {
  //     products?.forEach((product) => {
  //       if (product._id === params.id) setDetailProduct(product);
  //     });
  //     console.log(products);
  //   }
  // }, [params.id, products]);
  useEffect(() => {
    async function getHotelWithRooms() {
      const hotelRes = await axios.get(
        `/api/rooms/${params.id}?start=${
          sessionStorage.getItem("date").split(",")[0]
        }&end=${sessionStorage.getItem("date").split(",")[1]}&category=${
          selected === "Select" ? null : selected
        }`
      ); 
      console.log(hotelRes.data)
      setDetailProduct(hotelRes.data);
    }
    getHotelWithRooms();
  }, [selected]);

  const getRoomCategories = async () => {
    console.log(params);
    try {
      const res = await axios.get(
        `/api/products/roomCategory/${params.id}`,
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

  if (detailProduct.length === 0) return <Loading loading={loading} />;

  return (
    <>
      <div
        style={{
          boxShadow: "0 0 15px #ddd",
          width: "85%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div className="detail">
          <div className="deatil_box">
            <img src={detailProduct.images.url} alt="" />
            <div className="box-detail">
              <h2>{detailProduct.title}</h2>
              
              {/* <h6> {detailProduct.product_id}</h6> */}

              {/* <span>Price-USD{detailProduct.price}</span> */}
              <p>Abouts-{detailProduct.description}</p>
              <h5>Location-{detailProduct.location}</h5>

              <p>
                Available from <br />{" "}
                {moment(new Date(detailProduct.startDate)).format(
                  "MMMM Do YYYY,"
                )}
              </p>
              {/* <p>{dates}</p> */}
            </div>
          </div>
        </div>
        <div  style={{display:"flex" , justifyContent:'center' ,marginTop:'10px'}}>
        <select  onChange={(e) => setSelected(e.target.value)} style={{
          width:'40vh',
          height:'4vh',
          border:'1px solid #aaaaaa',
         
          borderRadius:'5px'
        }}>
          <option value="" style={{
           
          }}>All Room Category</option>
          {roomCategorys?.map((cat) => (
            <option value={cat._id}>{cat.title}</option>
          ))}
        </select>
          </div>
        {detailProduct?.Rooms.length > 0 ? (
          <div className="products1">
            {" "}
            <p className="room">Rooms Availables</p>
            <div></div>
            {detailProduct.Rooms.map((Room) => {
              return (
                <ProductItem1 key={Room._id} product={Room} detailProduct={detailProduct} available={true} />
              );
            })}
          </div>
        ) : (
          <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
            NO ROOOM IS AVAILABLE FOR THE SELECTED DATE IN THIS HOTEL
          </p>
        )}
      </div>

      {/* <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,products._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
           */}
      {/* <div
        style={{
          width: "90%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h2>Related Hotels</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div> */}
    </>
  );
}
export default DetailProduct;
