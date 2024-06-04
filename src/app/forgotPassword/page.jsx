"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import forgotImage from "../../../public/assets/forgotPassword.png";
import { validateEmail } from "../../../public/utils/signUpFormValidate";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();

  const handlePopupClose = () => {
    setEmail("");
    setOpenPopup(false);
    router.push("/login");
  };

  const onSubmit = async () => {
    const validationErrors = validateEmail(email);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/forgotpassword", {
          email,
        });
        console.log("Link sent successfully!", response.data);
        setOpenPopup(true);
      } catch (error) {
        // toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Stack
          sx={{
            border: "1px solid  #f0f0f0",
            padding: "20px",
            width: 400,
            justifyContent: "center",
            alignItems: "center",
          }}
          direction="column"
          spacing={2}
        >
          <Image
            src={forgotImage}
            alt="userLocked"
            style={{ height: "100px", width: "100px" }}
          />
          <h2>Trouble logging in?</h2>
          <span style={{ color: "grey", width: 320, textAlign: "center" }}>
            Enter your email and we&apos;ll send you a link to get back into
            your account.
          </span>
          <TextField
            id="outlined-basic"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            error={errors.email}
            helperText={errors.email}
            sx={{ width: 350 }}
          />
          <Button
            onClick={onSubmit}
            sx={{ width: 350 }}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Send login link"}
          </Button>
          <BootstrapDialog
            open={openPopup}
            onClose={handlePopupClose}
            aria-labelledby="customized-dialog-title"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <DialogTitle
                sx={{ m: 0, p: 2, flexGrow: 1 }}
                id="customized-dialog-title"
              >
                Password reset mail sent!
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handlePopupClose}
                sx={{
                  marginLeft: "auto",
                  right: 8,
                  color: "black",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <DialogContent dividers>
              <Typography gutterBottom>
                Link has been sent to{" "}
                <span style={{ fontWeight: "bold" }}>{email}</span>
              </Typography>
            </DialogContent>
          </BootstrapDialog>
          <Divider style={{ width: 350, marginTop: 30 }}>OR</Divider>
          <Link
            href={"/signup"}
            style={{
              color: "black",
              marginTop: 30,
              textAlign: "center",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            className="custom-link"
            onMouseEnter={(e) => (e.target.style.color = "grey")}
            onMouseLeave={(e) => (e.target.style.color = "black")}
          >
            Create new account
          </Link>
          <Link
            href={"/login"}
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
              textAlign: "center",
              width: 400,
              marginTop: 90,
              fontWeight: "bold",
              border: "1px solid #f0f0f0",
              padding: "20px",
              marginBottom: -20,
              background: "linear-gradient(to bottom, #f9f9f9, #f0f0f0)",
            }}
            onMouseEnter={(e) => (e.target.style.color = "grey")}
            onMouseLeave={(e) => (e.target.style.color = "black")}
          >
            Back to login
          </Link>
        </Stack>
      </Grid>
    </>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
