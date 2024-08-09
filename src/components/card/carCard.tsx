import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Checkbox, FormControlLabel } from '@mui/material';
import { Car } from '@/common/models';
import { useNavigate } from 'react-router-dom';

interface CarCardProps {
  car: Car;
  disableCompareSelection: boolean;
  onClick: (id: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, disableCompareSelection, onClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  
  const redirectToCarDetails = () => {
    navigate(`/car/${car.id}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
    onClick(car.id);
  };

  return (
    <Card sx={{ maxWidth: 345, border: '1px solid gray', borderRadius: 2, boxShadow: 3 }} onClick={redirectToCarDetails}>
      <CardMedia
        component="img"
        height="140"
        image={car.images[0]}
        alt="Card Image"
      />
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {`${car.make} ${car.model}`}
        </Typography>
        <Typography variant="h6" component="div">
          Transmission
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {car.transmission}
        </Typography>
        <Typography variant="h6" component="div">
          Engine
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {car.engine}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 2 }}>
        <FormControlLabel
          onClick={e=>handleCheckboxClick(e)}
          control={
            <Checkbox
              checked={isSelected}
              disabled={disableCompareSelection && !isSelected}
            />
          }
          label="Select for compare"
        />
      </CardActions>
    </Card>
  );
};

export default CarCard;