import React from "react";
import { useLocation } from "react-router-dom";
import withBackground from "@/components/HOC/withBackground";
import useFetchCarsCompare from "@/hooks/useFetchCarsCompare";
import CarCompareTable from "@/pages/carDetails/carTable";
import { CircularProgress } from "@chakra-ui/react";
import { Alert } from "@mui/material";

function getUrlParams(url: string) {
    const params: { [key: string]: string[] } = {};
    const queryString = url.split('?')[1];
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      urlParams.forEach((value, key) => {
        if (!params[key]) {
          params[key] = [];
        }
        params[key].push(value);
      });
    }
    return params;
  }

const CarCompare: React.FC = () => {
  const location = useLocation();
  const queryParams = getUrlParams(location.search);
  const { data: cars, isLoading, error } = useFetchCarsCompare(queryParams['carId']);
  const carsList = cars|| [];
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">An error occurred while fetching cars.</Alert>;
  }

  return <CarCompareTable cars={carsList} enableHideStat={true} />;
};

export default withBackground(CarCompare);


