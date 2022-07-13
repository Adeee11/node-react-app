import React, { createContext, useContext, useState } from 'react';
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

export const useData = () => useContext(DATA_CONTEXT);

export function DataProvider(props: { children: React.ReactNode }) {
  const [data, setData] =
    useState<Omit<IDataContext, 'fetchData'>>(INITIAL_STATE);

  const fetchRepos = async () => {
    if (data.status === 'INITIAL' || data.status === 'FETCH_FAILED') {
      setData((old) => ({ ...old, status: 'FETCHING' }));

      try {
        const resp = await api.get('/repos');
        setData({
          status: 'FETCH_SUCCESS',
          repos: resp.data.sort((item: IRepository, next: IRepository) => {
            const currentDate = new Date(item.created_at).getTime();
            const nextDate = new Date(next.created_at).getTime();

            if (currentDate > nextDate) {
              return -1;
            } else if (currentDate < nextDate) {
              return 1;
            } else {
              return 0;
            }
          }),
        });
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
