import { useEffect, useState } from "react";
import "./App.css";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Divider,
  Image,
  Stack,
  SkeletonText,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Link,
  Container,
} from "@chakra-ui/react";

function App() {
  const [pagedata, setPagedata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/homepage-sections/1?populate=*"
        );
        const data = await response.json();
        setPagedata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(pagedata);

  const menuItems = pagedata?.data?.attributes?.Nav;
  const carouselItems = pagedata?.data?.attributes?.HomeCarousel;
  console.log(menuItems);
  console.log(carouselItems);

  return (
    <div className="App">
      <div className="container-fluid p-0 m-0 sticky-top">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <img src={pagedata?.data?.attributes?.Header?.logourl} alt="logo" width="80px"/>
              <a className="navbar-brand mx-3" href="#">
                <div>
                  <h3>{pagedata?.data?.attributes?.Header?.Title}</h3>
                  <h6>{pagedata?.data?.attributes?.Header?.description}</h6>
                </div>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {menuItems?.map((item, index) => (
                    <li key={index} className="nav-item">
                      <a className="nav-link" href={item.NavLink}>
                        {item.NavItem}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {carouselItems?.map((imgitem, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img
                    src={imgitem.imgurl}
                    className="d-block w-100"
                    alt={imgitem.ImageTitle}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </header>

        <div className="aboutSection m-3">
              <h2>{pagedata?.data?.attributes?.abouttest?.Heading}</h2>
              <p className="text-justify">{pagedata?.data?.attributes?.abouttest?.AboutDescription}</p>
              <img src={pagedata?.data?.attributes?.abouttest?.aboutimgurl} alt="about image" width="40%" />
        </div>        

      </div>
    </div>
  );
}

export default App;
