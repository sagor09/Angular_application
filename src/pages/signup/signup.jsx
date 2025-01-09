import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import PasswordField from "../../components/password";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import axios from "axios";
import { signupURL } from "./../../services/api_service";
import CustomLoader from "../../components/customLoader";
import CustomSnackbar from "../../components/snackbar";

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(location.state || "Unknown Data"); // Fallback if state is undefined
  // Get data from request body
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState();
  const [officeAddress, setOfficeAddress] = useState();
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  // messages
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  //
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation password and confirm password
    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match. Please try again.",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    // You can send the OTP to the entered phone number here
    try {
      const _role = data.role;
      const role = _role === "Host" ? 3 : 4;
      const response = await axios.post(signupURL, {
        fullname: fullname,
        email: email,
        phone: data.phone,
        password: password,
        dob: dob,
        companyName: companyName,
        officeAddress: officeAddress,
        role: role,
        gender: gender,
      });
      if (response.status == 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        navigate("/signin");
      } else {
        setSnackbar({
          open: true,
          message: "Invalid SignUp. Please try again.",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="outer_content">
        <Box>
          <Typography className="header_headline" fontWeight={700} variant="p">
            Host
          </Typography>
        </Box>
        <Box className="mb10">
          <Typography className="phn_num_otp_text" variant="p">
            Sign up here as a host
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">Basic Information</Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "10px",
            }}
          >
            <TextField
              label="Full Name"
              name="fullname"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setFullname(event.target.value)}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setEmail(event.target.value)}
            />
            <PasswordField
              onChange={(event) => setPassword(event.target.value)}
            />
            <PasswordField
              label="Re-Enter Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="gender-label">Select Gender</InputLabel>
              <Select
                labelId="gender-label"
                className="custom-select"
                id="gender-select"
                value={gender}
                label="Select Gender"
                onChange={(event) => setGender(event.target.value)}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
                <MenuItem value={3}>Other</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                value={dob}
                onChange={(newDate) => setDob(newDate)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {loading && <CustomLoader />}
            <Typography fontWeight={700} variant="p">Company Information</Typography>
            <TextField
              label="Company Name"
              name="company_name"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <TextField
              label="Office Address"
              name="office_address"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setOfficeAddress(event.target.value)}
            />
            <Button variant="contained" className="auth_btn" type="submit">
              Sign Up Here
            </Button>
          </form>
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
