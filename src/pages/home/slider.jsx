import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SponsorHome } from "./../../services/api_service";
import CustomSnackbar from "../../components/snackbar";
import axios from "../../services/axiosConfig";

export default function CarouselSlider() {
  const [slides, setSlides] = useState([]);
  const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "error",
  });
  
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    // Fetch data from an API
    axios
      .get(SponsorHome) // Actual API endpoint
      .then((response) => {
        setSlides(response.data.sliders);
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      });
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <React.Fragment>
      <Slider {...settings}>
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <Box key={index} sx={{ position: "relative", height: "190px" }}>
              <img
                src={slide.image}
                alt={slide.title}
                style={{ width: "100%", height: "auto" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6">{slide.title}</Typography>
                <Typography variant="body2">{slide.text}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />
        )}
      </Slider>
    </React.Fragment>
  );
}
