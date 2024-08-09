import { HttpError, get } from '@/common/httpclient.ts';
import { Car } from '@/common/models';
import useSWRImmutable from 'swr/immutable';

export default function useFetchSimilarCars(carId: number) {
  const { data, error, isLoading } = useSWRImmutable<Car[], HttpError<string>>(`/cars/similar/${carId}?limit=10`, get);

  return {
    data,
    isLoading,
    error,
  };
}
