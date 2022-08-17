import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PaypalButton from "./PayPalButton";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const convertMsToDays = (ms) => {
  const msInOneSecond = 1000;
  const secondsInOneMinute = 60;
  const minutesInOneHour = 60;
  const hoursInOneDay = 24;

  const minutesInOneDay = hoursInOneDay * minutesInOneHour;
  const secondsInOneDay = secondsInOneMinute * minutesInOneDay;
  const msInOneDay = msInOneSecond * secondsInOneDay;

  return Math.ceil(ms / msInOneDay);
};

const getDaysBetweenDates = (dateOne, dateTwo) => {
  let differenceInMs = dateTwo.getTime() - dateOne.getTime();

  if (differenceInMs < 0) {
    differenceInMs = dateOne.getTime() - dateTwo.getTime();
  }

  return convertMsToDays(differenceInMs); //here +1
};

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const location = useLocation();
  const [total, setTotal] = useState(0);
  const [date, setDates] = useState("");
  const history = useHistory();

  useEffect(() => {
    const date = location.state;
    setDates(date);

    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity *getDaysBetweenDates(
          new Date(item?.date.split(",")[0]),  // item?.date.split(",")[0]-> first 
          new Date(item?.date.split(",")[1]) //item?.date.split(",")[1] ->second
        ) ;
      }, 0);
      setTotal(total);
    };
    getTotal();
    console.log(cart)
  }, [cart]);

  const addToCart = async (cart) => {
    console.log(cart);
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this ?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address, email } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address, email },
      {
        headers: { Authorization: token },
      }
    );
    setCart([]);
    addToCart([]);
    alert("You have successfully booked your hotel.");
    history.push("/");
    window.location.reload();
    // setCallback(!callback)
  };

  if (cart.length === 0)
    return (
      <div>
        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Empty</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>
    );

  return (
    <div>
      {cart.map((product) => (
        <div
          className="detail cart"
          key={product._id}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {product.images && (
            <img
              src={product.images.url}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                marginRight: "10px",
              }}
            />
          )}

          <div className="box-detail">
            <h2 style={{
              textTransform:'capitalize'
            }}>Room No:{product.title}</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <h5 style={{ color: "black",fontSize:'16px',textTransform:'capitalize' }}>Hotel name:{product.product_id.title}</h5>
             
              {/* <h5 style={{ color: "black" }}>Stock- {product.inStock}</h5> */}
            </div>

            <h5 style={{ color: "black" ,fontSize:'15px',textTransform:'capitalize' }}>Room Category:{product?.roomCategory.title}</h5>

            {/* <p>{product.startDate}</p> */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {/* <div className="amount" style={{ fontSize: "20px" }}>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "dimgrey",
                  }}
                >
                  Add Room{" "}
                </span>
                <button
                  style={{ borderRadius: "8px" }}
                  onClick={() => decrement(product._id)}
                  // disabled={product.quantity === product.inStock ? true : false}
                >
                  {" "}
                  -{" "}
                </button>
                <span>{product.quantity}</span>

                <button
                  id="addplus"
                  style={{ borderRadius: "8px" }}
                  disabled={product.quantity === product.inStock ? true : false}
                  onClick={() => increment(product._id)}
                >
                  {" "}
                  +{" "}
                </button>
              </div> */}
              <div style={{
                display:'flex',
                flexDirection:'column',
                
              }}>
              <span style={{
                color:'#4c4c4c'
              }}><span style={{
                fontWeight:'bold',
                color:'#4c4c4c'
              }}>From:</span>{product?.date.split(",")[0]}</span>
              <span style={{
                color:'#4c4c4c'
              }}><span style={{
                fontWeight:'bold',
                color:'#4c4c4c'
              }}>To:</span>{product?.date.split(",")[1]}</span>
              </div>
              
              <h4
                style={{
                  fontSize: "20px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "10px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  color: "#404040",
                }}
              >
                Price: Rs.{" "}
                {product.price *
                  product.quantity *
                  getDaysBetweenDates(
                    new Date(product?.date.split(",")[0]),
                    new Date(product?.date.split(",")[1])
                  )}
              </h4>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: Rs-: {total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}
export default Cart;
