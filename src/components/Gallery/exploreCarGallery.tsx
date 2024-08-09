import React from 'react';
import CarCard from '@/components/card/carCard';
import BaseGallery from '@/components/Gallery/baseGallery';
import { maxSelectedCarCount } from '@/common/constants';
import useFetchCars from '@/hooks/useFetchCars';
import { CompareButton } from '../compareButton/compareButton';
import { useNavigate } from 'react-router-dom';

const ExploreCarGallery: React.FC = () => {

  const { data:cars, isLoading, error } = useFetchCars();
  const [selectedCars, setSelectedCars] = React.useState<number[]>([]);
  const navigate = useNavigate();
  
  const handleCarSelection = (carId : number) => {
    if(selectedCars.includes(carId)){
      setSelectedCars(selectedCars.filter((id) => id !== carId));
    } else {
      setSelectedCars([...selectedCars, carId]);
    }
  }

  const redirectToCompare = () => {
    const queryParams = selectedCars.map((carId) => `carId=${carId}`).join('&');
    navigate(`/cars/compare?${queryParams}`);
  };

  return (
    <>
    <BaseGallery
      title="Check out these cars"
      description="The latest and greatest cars that are out in the market currently! Enjoy"
      items={cars || []}
      renderItem={(car) => <CarCard onClick ={handleCarSelection} car={car} disableCompareSelection ={selectedCars?.length > maxSelectedCarCount}/>}
      isLoading={isLoading}
      error={error}
    />
    <CompareButton onClick={redirectToCompare} display={(selectedCars?.length > 0)} disabled={(selectedCars?.length > maxSelectedCarCount)||((selectedCars?.length ==1))} />
    </>
  );
};

export default ExploreCarGallery;