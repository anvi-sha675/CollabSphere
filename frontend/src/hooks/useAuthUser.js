import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAuthUser } from '../lib/api.js';

const useAuthUser = () => {
    //tanstack query
  const authUser = useQuery({
    queryKey:["authUser"],
    queryFn: getAuthUser,
    retry: false,    //auth chq
  });
  return {isLoading: authUser.isLoading, authUser: authUser.data?.user};
};

export default useAuthUser;
