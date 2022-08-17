import React, { useContext } from "react";

import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  // const addCart = state.userAPI.addCart;

  const history = useHistory();

  const viewRoomHandler = () => {
    const pathDetail = {
      pathname: `/detail/${product._id}`,
    };
    history.push(pathDetail);
    // window.location.reload();
  };

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
        <div
            style={{
              display: "flex",
              flexDirection: "row",
             
              alignItems: "center",
              width: "100%",
            
            }}
          >
            <Link to={`/edit_product/${product._id}`}>
              <EditFilled
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "#00a8ff",
                }}
              />
            </Link>
            <Link
              to="#!"
              onClick={() =>
                deleteProduct(product._id, product.images.public_id)
              }
            >
              <DeleteFilled />
            </Link>
          </div>
        <div style={{
              display: "flex",
              flexDirection: "row",
              
              alignItems: "center",
             
             
            }}>
            <Link id="btn_buy" style={{
              backgroundColor:'rgb(97, 148, 81)',
              width:'180px'
            }} to={`/create-room-category/${product._id}`}>
            Add Room Category
          </Link>
          <Link id="btn_buy" to={`/create_room/${product._id}`}>
            Add Room
          </Link>
          <Link id="btn_buy2" to={`/view_room/${product._id}`}>
            View Room
          </Link>
         
          </div>
          
        </>
      ) : (
        <>
          <button id="btn_view" onClick={viewRoomHandler}>
            View Rooms
          </button>

          {/* <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                        Booked Your Room
                    </Link>  */}
        </>
      )}
    </div>
  );
}

export default BtnRender;
