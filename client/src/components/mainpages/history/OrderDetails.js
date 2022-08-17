import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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

  return convertMsToDays(differenceInMs); //here
};

function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
    console.log(orderDetails)
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  const generatePdf = (orderDetails) => {
    var docDefinition = {
      pageSize: "A5",
      content: [
        {
          text: "Hotel Booking",
          fontSize: 16,
          alignment: "right",
          color: "#ff0000",
        },
       

        {
          text: "Booking Details",
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10],
        },

       
        { text: `Name: ${orderDetails.address.recipient_name}`, fontSize: 8 },
        { text: `Address: ${orderDetails.address.line1 + " - " + orderDetails.address.city}`, fontSize: 8 },
        { text: `Pincode: ${orderDetails.address.postal_code}`, fontSize: 8 },
        { text: `Country: ${orderDetails.address.country_code}`, fontSize: 8 },
        { text: `Email: ${orderDetails.email}`, fontSize: 8 },
       

       
      ],
     
    };
    orderDetails?.cart.map((item) => {
      const productDetails = [
        [
          {
            text: `Hotel Name : ${item.product_id.title}`,
            fontSize: 9,
            bold: true,
            alignment: "right",
            margin: [0, 0, 10, 0],
            italics: true,
            uppercase: true
          },
          {
            text: `Room Name: ${item.title}`,
            fontSize: 8,
            alignment: "right",
            margin: [0, 0, 10, 0],
          },
          // {
          //   text: `Qty: ${item.quantity}`,
          //   fontSize: 8,
          //   alignment: "right",
          //   margin: [0, 0, 10, 0],
          // },
          
          {
            text: `From: ${item.date.split(",")[0]}`,
            fontSize: 8,
            alignment: "right",
            margin: [0, 0, 10, 0],
          },
          {
            text: `To: ${item.date.split(",")[1]}`,
            fontSize: 8,
            alignment: "right",
            margin: [0, 0, 10, 0],
          },
          {
            text: `                  Rs: ${
              item.price * item.quantity * getDaysBetweenDates(
                new Date(item?.date.split(",")[0]),
                new Date(item?.date.split(",")[1])
              )
            }`,
            alignment: "right",
            margin: [0, 0, 10, 5],
            fontSize: 9,
            bold: true,
            italics: true,
            decoration: "overline",
            background: "#ccc",
          },
        ],
      ];
      docDefinition.content.push(...productDetails);
    });
    pdfMake.createPdf(docDefinition).download("invoice");
  };
 

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
            <th>Email</th>
            <th>Download PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.address.recipient_name}</td>
            <td>
              {orderDetails.address.line1 + " - " + orderDetails.address.city}
            </td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
            <td>{orderDetails.email}</td>
            <td>
                <button onClick={() => generatePdf(orderDetails)} style={{
                  color:'#5664ce',
                  textDecoration:'underline'
                }}>Download</button></td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Hotel</th>
            <th>Room Name</th>
            {/* <th>Total Room</th> */}
            <th>Price</th>
            <th>StartDate</th>
            <th>EndDate</th>
           
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) =>
            item.date ? (
              <tr key={item._id}>
                <td>{item.images && <img src={item.images.url} alt="" />}</td>

                <td 
                  
                >
                 
                    {item.product_id.title}{" "}
                 
                </td>

                <td>{item.title}</td>
                {/* <td>{item.quantity}</td> */}
                <td>₹ {item.price * item.quantity * getDaysBetweenDates(
                    new Date(item?.date.split(",")[0]),
                    new Date(item?.date.split(",")[1])
                  )}</td>

                <td>{item.date.split(",")[0]}</td>
                <td>{item.date.split(",")[1]}</td>
                
              </tr>
            ) : (
              <tr key={item._id}>
                <td>{item.images && <img src={item.images.url} alt="" />}</td>
                <td>{item.product_id.title}</td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>₹ {item.price * item.quantity * getDaysBetweenDates(
                    new Date(item?.date.split(",")[0]),
                    new Date(item?.date.split(",")[1])
                  )}</td>
                <td>{item.createDate}</td>
                <td>{item.outDate}</td>
                
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
