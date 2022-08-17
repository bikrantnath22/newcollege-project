import { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utlis/productItem/ProductItem";
import Loading from "../utlis/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import Slideshow from "./Slideshow";
import Search from "./search/search";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <Search />
      <div>
        <img
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
          alt=""
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            objectPosition: "center",
            alignItems: "center",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        />
      </div>

      <div>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px",
            marginBottom: "10px",
            fontSize: "25px",
            fontWeight: "bold",
            color: "dimgrey",
            letterSpacing: "2px",
            boxShadow: "0px 2px 0px 0px #a6a6a6",
          }}
        >
          Best Hotels for You
        </div>
      </div>
      <Slideshow />

      {isAdmin && (
        <div>
          <Filters />
        </div>
      )}

      {/* <div style={{fontSize:'25px',marginLeft:'28%',color:'crimson'}}>
            Please Select your Location and Date before Booked a Hotel
        </div> */}

      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button 
           style={{
            backgroundColor: "#ff0000",
            border: "none",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
            marginLeft: "10px",
            height: "40px",
            
           }}
           onClick={deleteAll}>Delete ALL</button>
        </div>
      )}

      {isAdmin && (
        <div className="products">
          {products.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                isSearched={false}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
                handleCheck={handleCheck}
              />
            );
          })}
        </div>
      )}

      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
