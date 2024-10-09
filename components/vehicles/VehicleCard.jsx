import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Tooltip, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Url } from '@/app/services/httpcommon';

const VehicleCard = ({ vehicle }) => {


    return (
        <Card sx={{ maxWidth: 800, p: 2, height: "100%", overflow: "auto" }}>
            <CardMedia
                component="img"
                height="200"
                image={Url + vehicle?.pictures[0]} // Use the first picture as thumbnail
                alt={vehicle?.carModel}
                sx={{ borderRadius: 4, p: 2 }}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {vehicle?.carModel}
                </Typography>
                <Grid container alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Grid item>
                        <LocationOnIcon fontSize="small" color="action" />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="text.secondary">
                            {vehicle?.city}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary">
                        ${vehicle?.price}
                    </Typography>
                    <Tooltip title={`Call: ${vehicle?.phone}`}>
                        <IconButton color="primary">
                            <PhoneIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>

                {vehicle?.pictures?.length > 1 && (
                    <Box sx={{ mt: 2 }}>
                        <ImageList cols={3} gap={4}>
                            {vehicle?.pictures?.slice(1, vehicle?.maxPics).map((pic, index) => (
                                <ImageListItem key={index}>
                                    <img src={Url + pic} alt={`Additional pic ${index + 1}`} loading="lazy" />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default VehicleCard;
