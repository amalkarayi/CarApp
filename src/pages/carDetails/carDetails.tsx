import React from "react";
import CarCompareTable from "@/pages/carDetails/carTable";
import useFetchCar from "@/hooks/useFetchCar";
import { useParams } from "react-router-dom";
import SimilarCarGallery from "@/components/Gallery/similarCarGallery ";
import withBackground from "@/components/HOC/withBackground";
import { CircularProgress } from "@chakra-ui/react";
import { Alert } from "@mui/material";

const CarDetails: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const { data: car, isLoading, error } = useFetchCar(Number(carId));
  const cars = car ? [car] : [];
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">An error occurred while fetching cars.</Alert>;
  }
  return <CarCompareTable cars={cars} />;
};

const CarDetailsWithBackground = withBackground(CarDetails);

export default () => {
  const { carId } = useParams<{ carId: string }>();
  
  return (
    <CarDetailsWithBackground
      gallery={<SimilarCarGallery carId={Number(carId)} />}
    />
  );
};
