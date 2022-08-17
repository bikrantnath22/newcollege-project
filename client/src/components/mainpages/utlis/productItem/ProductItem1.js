import React,{useEffect} from "react";
import BtnRender1 from "./BtnRender1";
import moment from "moment";

function ProductItem1({ product, deleteRoom, date, available ,detailProduct}) {
  useEffect(() => {
      console.log(product)
  }, [])
  return (
    <>
      <div className="row_product">
        <div className="product_card1">
          {/* {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }  */}
          {product.images && <img src={product.images.url} alt="" />}
          <div className="room_box">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <h3 title={product.title}>{product.title}</h3>
              {/* <h3 title={product.title}>{product.roomCategory.title}</h3> */}
              {/* <h5 location={product.location}>Loaction-{product.location}</h5> */}

              <p className="paragraph">{product.description}</p>
              {/* <h5>{product.hotelName}</h5> */}
              {/* <h5 createDate={product.createDate}>{product.createDate}</h5> */}
              <div className="price_date">
                {/* <div>
                  <p
                    style={{
                      marginBottom: "1px",
                    }}
                  >
                    From{" "}
                    {moment(new Date(product.createDate)).format(
                      "MMMM Do YYYY,"
                    )}
                  </p>
                  <p>
                    To{" "}
                    {moment(new Date(product.outDate)).format("MMMM Do YYYY,")}
                  </p>
                </div> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span>
                    <strong
                      style={{
                        color: "rgb(97, 148, 81)",
                        fontSize: "18px",
                      }}
                    >
                      Price-Rs. {product.price}
                    </strong>
                  </span>
                  {/* {product.inStock > 0 && available ? (
                    <span style={{ color: "green" }}>
                      In Stock {product.inStock}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>Out of Stock</span>
                  )} */}
                  {/* <span >Stock- {product.inStock}</span> */}
                </div>
              </div>
            </div>
            <div>
              {available ? (
                <BtnRender1
                  room={product}
                  deleteRoom={deleteRoom}
                  detailProduct={detailProduct}
                  date={date}
                  
                />
              ) : (
                <div>
                  <h4
                    style={{
                      color: "red",
                    }}
                  >
                    Not available for the picked date!
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem1;
