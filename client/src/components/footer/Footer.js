import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h6 style={{ color: "white" }}>THIS IS HOTEL BOOKING WEBSITE</h6>
            {/* <h1 className="list-unstyled">
              <li>342-420-6969</li>
              <li>Moscow, Russia</li>
              <li>123 Streeet South North</li>
            </h1> */}
          </div>
          {/* Column2 */}
          <div className="col">
            <h6 style={{ color: "white" }}>HELLO</h6>
            <ui className="list-unstyled"  style={{
              
              fontSize: "12px"
            }}>
              <li>DANK MEMES</li>
              <li>OTHER STUFF</li>
              <li>GUD STUFF</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h6 style={{ color: "white" }}>WELL ANOTHER COLUMN</h6>
            <ui
              className="list-unstyled"
              style={{
                fontSize: "12px",
              }}
            >
              <li>DANK MEMES</li>
              <li>OTHER STUFF</li>
              <li>GUD STUFF</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm"  style={{
              
              fontSize: "12px"
            }}>
            THIS MEMES | All rights reserved | Terms Of Service | Privacy
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
