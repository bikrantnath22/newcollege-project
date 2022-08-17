import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Img1 from "./images/image4.jpg";
import Img2 from "./images/image5.jpg";
import Img3 from "./images/image7.jpg";

import Img4 from "./images/image8.jpg";
import Img5 from "./images/image9.jpg";
import Img6 from "./images/image10.jpg";

import Img7 from "./images/image11.jpg";
import Img8 from "./images/image12.jpg";
import Img9 from "./images/image13.jpg";

function Slideshow() {
  return (
    <div className="slider">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "20%",

          flexDirection: "column",
        }}
      >
        <Carousel
          style={{
            opacity: "0.9",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <CarouselItem>
            <img
              src={Img1}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Img2}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Img3}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
        </Carousel>
        hello
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "20%",

          flexDirection: "column",
        }}
      >
        <Carousel
          style={{
            opacity: "0.9",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <CarouselItem>
            <img
              src={Img4}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Img5}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Img6}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
        </Carousel>
        hello
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "20%",

          flexDirection: "column",
        }}
      >
        <Carousel
          style={{
            
            opacity: "0.9",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <CarouselItem>
            <img
              src={Img7}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Img8}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={Img9}
              margin-left="5px"
              height="200px"
              width="100%"
              alt="Img1"
              style={{ borderRadius: "10px" }}
            />
          </CarouselItem>
        </Carousel>
        hello
      </div>
    </div>
  );
}
export default Slideshow;
