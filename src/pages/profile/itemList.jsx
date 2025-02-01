import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

import PasswordChangeModal from "./password_change/passwordChangeModal";
import ChangeAccountModal from "./change_account/changeAccountModal";
import DeleteAccount from "./delete_account/deleteAccount";
import CustomSnackbar from "../../components/snackbar";
import { BASE_URL } from "../../services/api_service";

export default function ItemList() {
  const [userData, setUserData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenPhone, setModalOpenPhone] = useState(false);
  const [modalOpenDelAccount, setModalOpenDelAccount] = useState(false);

  const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "error",
  });
  
  // Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Generate copy link
  const copyLink = `${BASE_URL}/donation/donate/${userData.user_id}/`;
  // Navigate to to sign in page
  const navigate = useNavigate();

  // Copy link clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyLink);
      setSnackbar({
        open: true,
        message: "Link copied to clipboard.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to copy text: ", err,
        severity: "error",
      });
    }
  };

  // Sign out without API call remove token from localStorage
  const handlerSignOut = async () => {
    localStorage.removeItem("token");
    localStorage.clear();

    // Navigate after state update
    setTimeout(() => {
      navigate("/signin");
    }, 100);
  };
  

  // Fetch user data when component mounts and updates whenever user data changes in local storage.
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);

  return (
    <Container className="profile_item_lv">
      <Link to={`/profile_update/${userData.user_id}`}>
        <Box className="item">
          <EditLocationAltOutlinedIcon />
          <Typography variant="p">Edit Profile </Typography>
        </Box>
      </Link>
      <Link to="#" onClick={() => setModalOpen(true)}>
        <Box className="item">
          <KeyOutlinedIcon />
          <Typography variant="p">Change Password</Typography>
        </Box>
      </Link>
      <Link to="#" onClick={() => setModalOpenPhone(true)}>
        <Box className="item">
          <EmailOutlinedIcon />
          <Typography variant="p">Change Account</Typography>
        </Box>
      </Link>
      <Link to="#" onClick={() => setModalOpenDelAccount(true)}>
        <Box className="item">
          <PersonRemoveOutlinedIcon />
          <Typography variant="p">Delete Account</Typography>
        </Box>
      </Link>
      <Link to="/payment-history">
        <Box className="item">
          <PaymentOutlinedIcon />
          <Typography variant="p">Payment History</Typography>
        </Box>
      </Link>
      <Link to="#" onClick={handleCopy}>
        <Box className="item">
          <VolunteerActivismOutlinedIcon />
          <Typography variant="p">Share Donation Link</Typography>
        </Box>
      </Link>
      <Link to="/home">
        <Box className="item">
          <AdminPanelSettingsOutlinedIcon />
          <Typography variant="p">Settings</Typography>
        </Box>
      </Link>
      <Link to="#" onClick={handlerSignOut}>
        <Box className="item">
          <ExitToAppOutlinedIcon />
          <Typography variant="p">Sign Out</Typography>
        </Box>
      </Link>
      <PasswordChangeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)} // Close the modal
      />
      <ChangeAccountModal
        open={modalOpenPhone}
        onClose={() => setModalOpenPhone(false)} // Close the modal
      />
      <DeleteAccount
        open={modalOpenDelAccount}
        onClose={() => setModalOpenDelAccount(false)} // Close the modal
      />
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Container>
  );
}
