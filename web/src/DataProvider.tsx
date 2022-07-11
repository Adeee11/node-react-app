import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api';
import { IRepository } from './types';

interface IDataContext {
  repos: IRepository[];
  fetchData: () => Promise<void>;
  status: 'FETCHING' | 'INITIAL' | 'FETCH_FAILED' | 'FETCH_SUCCESS';
}

const INITIAL_STATE: IDataContext = {
  repos: [],
  status: 'INITIAL',
  fetchData: async () => {
    // no-op
  },
};

const DATA_CONTEXT = createContext<IDataContext>(INITIAL_STATE);

export const useData = () => {
  const context = useContext(DATA_CONTEXT);
  useEffect(() => {
    context.fetchData();
    // Fix For only calling it once. Can create a separate useMount hook for the same person so as to avoid eslint disable everytime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return context;
};

export function DataProvider(props: { children: React.ReactNode }) {
  const [data, setData] =
    useState<Omit<IDataContext, 'fetchData'>>(INITIAL_STATE);

  const fetchRepos = async () => {
    if (data.status === 'INITIAL' || data.status === 'FETCH_FAILED') {
      setData((old) => ({ ...old, status: 'FETCHING' }));

      try {
        const resp = await api.get('/repos');
        setData({ status: 'FETCH_SUCCESS', repos: resp.data });
      } catch (e) {
        setData((old) => ({ ...old, repos: [], status: 'FETCH_FAILED' }));
      }
    }
  };

  return (
    <DATA_CONTEXT.Provider value={{ ...data, fetchData: fetchRepos }}>
      {props.children}
    </DATA_CONTEXT.Provider>
  );
}
