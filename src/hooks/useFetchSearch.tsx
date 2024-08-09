import { HttpError, get } from '@/common/httpclient.ts';
import { Car } from '@/common/models';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

export default function useFetchSearch(searchText: string) {
  const { trigger, data, error, isMutating } = useSWRMutation<Car, HttpError<string>>(`/car/search?text=${searchText}&limit=10`, get);

  useEffect(() => {
    trigger();
  }, [trigger]);
  
  if (isMutating) {
    return { details: '', status: '' };
  }
  if (error) {
    throw error;
  }
  return {
    details: data ?? '',
    status: data?? '',
  };

}
