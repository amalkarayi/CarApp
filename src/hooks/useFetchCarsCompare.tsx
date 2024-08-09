import { HttpError, get } from '@/common/httpclient.ts';
import { Car } from '@/common/models';
import useSWRImmutable from 'swr/immutable';

export default function useFetchCarsCompare(carIds: string[]) {
  const queryString = carIds.map(carId => `carId=${carId}`).join('&');
  const { data, error, isLoading } = useSWRImmutable<Car[], HttpError<string>>(`/cars/compare?${queryString}`, get);

  return {
    data,
    isLoading,
    error,
  };
}
