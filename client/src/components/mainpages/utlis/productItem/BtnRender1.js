import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import { DeleteFilled,EditFilled } from "@ant-design/icons";

function BtnRender1({ room, deleteRoom, date,detailProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  const history = useHistory();
  const [dates, setDates] = useState("");
  useEffect(() => {
    setDates(date);
  }, []);
  const viewRoomHandler = () => {
    console.log(dates);
    const pathDetail = {
      pathname: `/cart`,
      state: dates,
    };
    history.push(pathDetail);
  };

  return (
    <div className="row_btn1" style={{
        display: "flex",
        flexDirection: "column",
    }}>
    
      {isAdmin ? (
        <>
        <div style={{
                display: "flex",
                flexDirection: "row",
                
                marginTop: '20px',
                width:'100%'
        }}>
        <Link  to={`/editroom/${room._id}/${detailProduct._id}`}>
            <EditFilled
              style={{
                marginRight: "20px",
                cursor: "pointer",
                color: "#00a8ff",
                fontSize: "20px"
              }}
            />
          </Link>
          <Link
            to="#!"
            
            onClick={() => deleteRoom(room._id, room.images.public_id)}
          >
            <DeleteFilled
              style={{
                color: "crimson",
                fontSize: "20px",
              }}
            />
          </Link>
          
          </div>
        </>
      ) : (
        <>
          {/* <Link id="btn_view" to={`/detail/${product._id}`}>
                        View Rooms
                    </Link>  */}

          <button
            id="btn_buy1"
            onClick={() => {
              viewRoomHandler();
              addCart(room);
            }}
            disabled={room.inStock === 0 ? true : false}
          >
            Booked Your Room
          </button>

          {/* <Link id="btn_view" to={`/detail/${product._id}`}>
                        View Rooms
                    </Link>  */}
        </>
      )}
    </div>
  );
}

export default BtnRender1;
