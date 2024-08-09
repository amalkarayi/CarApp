import { HttpError, get } from '@/common/httpclient.ts';
import { Car } from '@/common/models';
import useSWRImmutable from 'swr/immutable';

export default function useFetchCar(carId: number) {
  const { data, error, isLoading } = useSWRImmutable<Car, HttpError<string>>(`/car/${carId}`, get);

  return {
    data,
    isLoading,
    error,
  };
}
