/* eslint-disable react/jsx-key */
"use client";

import vehicleServices from "@/app/services/vehicleServices";
import UserTableToolbar from "@/components/shared/customTable/UserTableToolbar";
import GenericTable from "@/components/shared/table/GenaricTableView";
import useFetchData from "@/hooks/fetchData";
import { Button, Card, Container, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import AlertDialogSlide from "@/components/shared/popup";
import VehicleCard from "@/components/vehicles/VehicleCard";


const View = ({ onClick }) => {
    return (
        <IconButton onClick={onClick}>
            <VisibilityIcon />
        </IconButton>
    )
}

const VehicleList = () => {
    const { data, loading } = useFetchData(vehicleServices.getVehicle);
    const dataFiltered = data || [];
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleOpen = (item) => {
        setOpen(true);
        setSelected(item);
    };


    const actions = [
        {
            Component: View,
            handler: (row) => handleOpen(row),
        },
    ];

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    p: 3,
                    mb: 4,
                    width: "100%",
                }}
            >
                <UserTableToolbar title="All Vehicles">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: "8px" }}
                        onClick={() => router.push("/dashboard/addvehicle")}
                    >
                        + Add new vehicle
                    </Button>
                </UserTableToolbar>

                <GenericTable
                    data={dataFiltered}
                    loading={loading}
                    actions={actions}
                    columns={[
                        {
                            key: "carModel",
                            label: "Model Name",
                            sx: { width: { xs: "100%", sm: "25%" } },
                            render: (value, row) => row.carModel || "N/A",
                        },
                        {
                            key: "price",
                            label: "price",
                            sx: {
                                display: { xs: "none", sm: "table-cell" },
                                textAlign: "center",
                                width: "25%",
                            },
                            render: (value, row) => row.price || "N/A",
                        },
                        {
                            key: "Phone",
                            label: "phone",
                            sx: {
                                display: { xs: "none", sm: "table-cell" },
                                textAlign: "center",
                                width: "25%",
                            },
                            render: (value, row) => row.phone || "N/A",
                        },
                        {
                            key: "city",
                            label: "City",
                            sx: {
                                display: { xs: "none", sm: "table-cell" },
                                textAlign: "center",
                                width: "25%",
                            },
                            render: (value, row) => row.city || "N/A",
                        },
                    ]}
                />
            </Card>
            <AlertDialogSlide
                open={open}
                setOpen={setOpen}
                title="Vehicle"
                isHeader
                maxWidth="md"
                fullWidth
            >
                <VehicleCard vehicle={selected} />
            </AlertDialogSlide>
        </Container>
    );
};

export default VehicleList;
