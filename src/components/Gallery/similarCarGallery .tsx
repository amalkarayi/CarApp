import React from 'react';
import CarCard from '@/components/card/carCard';
import BaseGallery from '@/components/Gallery/baseGallery';
import { maxSelectedCarCount } from '@/common/constants';
import useFetchSimilarCars from '@/hooks/useFetchSimilarCars';
import { CompareButton } from '../compareButton/compareButton';
import { useNavigate } from 'react-router-dom';

interface SimilarCarGalleryProps {
  carId: number|undefined
}
 
const SimilarCarGallery: React.FC<SimilarCarGalleryProps> = ({ carId }) => {
  const { data:cars, isLoading, error } = useFetchSimilarCars(Number(carId));
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
      title="Similar Cars"
      description="These are cars similar to the one you are viewing"
      items={cars || []}
      renderItem={(car) => <CarCard onClick ={handleCarSelection} car={car} disableCompareSelection ={selectedCars?.length > maxSelectedCarCount}/>}
      isLoading={isLoading}
      error={error}
    />
    <CompareButton onClick={redirectToCompare} display={(selectedCars?.length > 0)} disabled={(selectedCars?.length > maxSelectedCarCount)||((selectedCars?.length ==1))} />
    </>
  );
};

export default SimilarCarGallery;