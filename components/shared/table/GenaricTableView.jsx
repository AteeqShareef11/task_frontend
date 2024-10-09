/* eslint-disable react/prop-types */
import React from "react";

import {
    Box,
    Table,
    TableRow,
    Skeleton,
    TableHead,
    TableCell,
    TableBody,
} from "@mui/material";

const priorityStyle = {
    High: {
        backgroundColor: "#f8d7da",
        color: "#dc3545",
        padding: "8px",
        borderRadius: "9999px",
        textAlign: "center",
        fontWeight: "bold",
    },
    Medium: {
        backgroundColor: "#fefbd8",
        color: "#e3a008",
        padding: "8px",
        borderRadius: "9999px",
        textAlign: "center",
        fontWeight: "bold",
    },
    Low: {
        backgroundColor: "#f3f4f6",
        color: "#9ca3af",
        padding: "8px",
        borderRadius: "9999px",
        textAlign: "center",
        fontWeight: "bold",
    },
};

const GenericTable = ({ data, columns, actions, loading, onView }) => (
    <Box sx={{ minHeight: "70vh", overflow: "auto", width: "100%" }}>
        <Table stickyHeader aria-label="generic data table">
            <TableHead>
                <TableRow sx={{ backgroundColor: "transparent !important" }}>
                    {columns.map((col) => (
                        <TableCell
                            key={col.key}
                            sx={{
                                ...col.sx,
                                padding: "16px",
                                fontWeight: 600,
                                color: "#6b7280",
                                fontSize: "16px",
                                backgroundColor: "transparent",
                            }}
                        >
                            {loading ? <Skeleton width={80} /> : col.label}
                        </TableCell>
                    ))}
                    {actions?.length > 0 && (
                        <TableCell
                            sx={{
                                padding: "16px",
                                textAlign: "right",
                                fontWeight: 600,
                                color: "#6b7280",
                                fontSize: "16px",
                            }}
                        >
                            {loading ? <Skeleton width={50} /> : "Action"}
                        </TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {loading
                    ? Array(5)
                        .fill()
                        .map((_, idx) => (
                            <TableRow key={idx}>
                                {columns.map((col) => (
                                    <TableCell key={col.key} sx={{ padding: "16px" }}>
                                        <Skeleton width="100%" height={20} />
                                    </TableCell>
                                ))}
                                {actions?.length > 0 && (
                                    <TableCell sx={{ padding: "16px", textAlign: "right" }}>
                                        <Skeleton width={50} height={20} />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    : Array.isArray(data) &&
                    data?.map((row) => (
                        <TableRow
                            key={row.id}
                            onClick={() => onView && onView(row?._id)}
                            sx={{
                                cursor: "pointer",
                                "&:hover": { backgroundColor: "#f9fafb" },
                            }}
                        >
                            {columns.map((col) => (
                                <TableCell key={col.key} sx={{ ...col.sx, padding: "16px" }}>
                                    <Box sx={priorityStyle[row[col.key]] || {}}>
                                        {col.render?.(row[col.key], row) ?? row[col.key]}
                                    </Box>
                                </TableCell>
                            ))}
                            {actions?.length > 0 && (
                                <TableCell sx={{ padding: "16px", textAlign: "right" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "16px",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        {actions.map((action, idx) => (
                                            <action.Component
                                                key={idx}
                                                onClick={() => {
                                                    action.handler(row)
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </Box>
);

export default GenericTable;
