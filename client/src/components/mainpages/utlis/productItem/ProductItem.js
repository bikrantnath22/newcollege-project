import React from "react";
import { useEffect } from "react";
import BtnRender from "./BtnRender";

function ProductItem({
  product,
  isAdmin,
  deleteProduct,
  handleCheck,
  isSearched,
}) {
  useEffect(() => {
    if (isSearched === false) {
      sessionStorage.clear("date");
    }
  }, []);
  
  return (
    <div className="product_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <div className="image">
      {product.images && <img src={product.images.url} alt="" />}
      </div>
      <div
      className="newOne"
        
      >
        <div
        
          style={{
            display: "flex",
            flexDirection: "column",
            
            width: "100%",
            textTransform: "capitalize",
            
          }}
        >
          <h3 title={product.title}>{product.title}</h3>
          <h5 location={product.location}>Loaction-{product.location}</h5>

          <p  style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            paddingRight: "10px",
            width:'100%'
          }}
          
         
          >{product.description}</p>
        </div>
        <div
         className="probtn"
         
        >
        <div 
        className="priceBtn"
        style={{
          
        }}>
        <span
            style={{
              marginRight: "20px",
              
              color: "#117025",
              fontSize: "18px",
              fontWeight: "bold",

            }}
          >
            Start From-Rs{product.price}
          </span>

        </div>
         

          <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
