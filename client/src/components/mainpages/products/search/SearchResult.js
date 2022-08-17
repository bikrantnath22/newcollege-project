import { useState, useEffect } from "react";
import queryString from "query-string";
import ProductItem from "../../utlis/productItem/ProductItem";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "./search";
import Loading from "../../utlis/loading/Loading";

const axios = require("axios").default;

const SearchResult = () => {
  // state
  // const [searchLocation, setSearchLocation] = useState("");
  // const [searchDate, setSearchDate] = useState("");
  // const [searchBed, setSearchBed] = useState("");

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  // when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    setLoading(true)
    axios.post("/api/search-listings", parsed).then((res) => {
      console.log("SEARCH RESULTS ===>", res.data);
      setProduct(res.data.result);

      sessionStorage.setItem("date", parsed.date); 
      const dd  = parsed.date.split(',') ; 
      console.log(new Date(dd[0]))
      setLoading(false)
    });
  }, []);

  const handleCheck = (id) => {
    product.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProduct([...product]);
  };

  return (
    <>
      {loading ? (
        <div><Loading /></div>
      ) : (
        <div className="container">
          <div className="row">
            {product.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  product={product}
                  isSearched={true}
                  handleCheck={handleCheck}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
