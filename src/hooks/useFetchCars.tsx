import { HttpError, get } from '@/common/httpclient.ts';
import { Car } from '@/common/models';
import useSWRImmutable from 'swr/immutable';

export default function useFetchCars() {
  const { data, error, isLoading } = useSWRImmutable<Car[], HttpError<string>>('/cars', get);

  return {
    data,
    isLoading,
    error,
  };
}
