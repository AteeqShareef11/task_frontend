"use client";

import withAuth from "@/components/hoc/withAuth";
import { Box, Button, } from "@mui/material";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {

    const router = useRouter()
    const handleLogOut = () => {
        localStorage.removeItem('token')
        router.push("/login")
    }
    return (
        <div style={{ display: "flex" }}>
            <main style={{ width: "100%" }}>
                <Box position="relative" width="100%">
                    {children}
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        position='absolute'
                        right={10}
                        top={10}
                    >
                        <Button onClick={handleLogOut} variant="contained">Logout</Button>
                    </Box>
                </Box>
            </main>
        </div>
    );
}

export default withAuth(DashboardLayout);
