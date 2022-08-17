import React, { useState } from "react";
import { DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./search.css";

import moment from "moment";
import { useHistory } from "react-router-dom";

// destructure values from ant components
const { RangePicker } = DatePicker;
// const { Option } = Select;

const Search = () => {
  // state
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  //   const [bed, setBed] = useState("");
  // route
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?search=${search}&date=${date}`);
  };

  return (
    <>
      <div className="search-main">
        <h4 style={{ color: "dimgrey" }}>
          Search Your Location And Pick a Date
        </h4>
        <div className="search-box" style={{ width: "100%" }}>
          <input
            style={{ border: "2px solid #ccc", color: "black" }}
            placeholder="Location"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />

          <RangePicker
            className="date"
            onChange={(value, dateString) => setDate(dateString)}
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
            // className="w-100"
            style={{
              height: "50px",
              width: "25%",
              border: "2px solid #ccc",
              fontWeight: "bold",
            }}
            // style={{ marginLeft: "10px" ,marginRight:"10px" }}
          />

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "dimgrey",
              height: "50px",
              width: "10%",
              border: "2px solid #ccc",
              borderRadius: "5px",
              

            }}
          >
            <SearchOutlined
              style={{ fontSize: "25px", color: "white", marginLeft: "10px" ,fontWeight:'bold' ,position:'relative',left:'-4px', }}
            />
          </button>
        </div>

        {/* <Select
      //   onChange={(value) => setBed(value)}
      //   className="w-100"
      //   size="large"
      //   placeholder="Number of beds"
       
      // >
      //   <Option key={1}>{1}</Option>
      //   <Option key={2}>{2}</Option>
      //   <Option key={3}>{3}</Option>
      //   <Option key={4}>{4}</Option>
      // </Select> */}
      </div>
    </>
  );
};

export default Search;
