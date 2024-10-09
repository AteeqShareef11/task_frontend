"use client";
import React from "react";

import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

const GoBack = () => {
    const router = useRouter();
    return (
        <IconButton sx={{ width: 38, height: 38, display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => router.back()}>
            <ArrowBackIcon fontSize="small" />
        </IconButton>
    );
};

export default GoBack;
