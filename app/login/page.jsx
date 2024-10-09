"use client";
import React, { useState } from "react";
import {
    TextField,
    Container,
    Typography,
    Stack,
    Box,
    Paper,
} from "@mui/material";
import useForm from "@/hooks/validation";
import authServices from "../services/authServices";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/shared/loadingButton/LoadingButton";
import { toast } from "react-toastify";

const initialValues = {
    email: "",
    password: "",
};
const validationRules = {
    email: (value) => {
        if (!value) {
            return "This field is required";
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
            return "Please enter a valid email address";
        }
        return "";
    },
    password: (value) => (value ? "" : "This field is required"),
};

const Login = () => {
    const { values, errors, handleOnChange, validateAllFields } = useForm(
        initialValues,
        validationRules
    );
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateAllFields()) {
            setLoading(true);
            authServices
                .loginUser(values)
                .then((res) => {
                    localStorage.setItem("token", res?.data?.token);
                    router.push("/dashboard/vehicles");
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message || error?.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={6}
                    sx={{
                        padding: "2rem",
                        borderRadius: "1rem",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <Stack spacing={3}>
                        <Typography variant="h4" component="h1" align="center">
                            Welcome Back!
                        </Typography>
                        <Typography variant="body1" color="textSecondary" align="center">
                            Please log in to continue
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email Address"
                                variant="outlined"
                                name="email"
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                value={values.email}
                                onChange={handleOnChange}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                value={values.password}
                                onChange={handleOnChange}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                    },
                                }}
                            />
                            <LoadingButton
                                isLoading={loading}
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    marginTop: "1.5rem",
                                    padding: "0.75rem",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    minWidth: '200px',
                                    width: "100%",

                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                    "&:hover": {
                                        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                            >
                                Login
                            </LoadingButton>
                        </form>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
