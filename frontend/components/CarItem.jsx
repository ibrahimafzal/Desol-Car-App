import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CarItem = ({ car }) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ marginTop: "30px" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={car?.images[0].url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" display={'flex'}  alignItems='center'  justifyContent='space-between'>
          {car?.carModel}
          <span style={{fontSize:"13px", fontWeight:"bold", color:'#1976d2'}}>
            $ {car?.price}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong style={{ color: "black" }}>Phone Number:</strong> {car?.phoneNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong style={{ color: "black" }}>No. of Pictures:</strong> {car?.maxPictures}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CarItem