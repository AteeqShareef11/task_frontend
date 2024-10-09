/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';

import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AlertDialogSlide({
    children,
    open,
    setOpen,
    fullWidth,
    title,
    maxWidth = 'md',
    isHeader,
}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={fullWidth}
            maxWidth={maxWidth}

            sx={{
                width: '100%',
                overflowX: "hidden",

            }}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"

        >
            {isHeader && (
                <Box pt={{ xs: "10px", md: "30px" }} px={{ xs: "10px", md: "30px" }} width="100%" justifyContent="space-between" display="flex" alignItems="flex-end">
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography fontSize={{ xs: 18, md: 22, }} fontWeight={700}>{title}</Typography>
                    </Box>
                    <Box
                        width={38}
                        height={38}
                        onClick={() => handleClose()}
                        sx={{
                            borderRadius: 20,
                            border: '1px solid #E6E6E6',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: "#18181B",
                            cursor: 'pointer'
                        }}
                    >
                        <CloseIcon />
                    </Box>
                </Box>
            )}

            {children}
        </Dialog>
    );
}
