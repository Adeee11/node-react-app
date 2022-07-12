import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { reportWebVitals } from './reportWebVitals';

import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataProvider } from './DataProvider';
import { CssBaseline } from '@mui/material';
import RepoList from './Components/RepoList';
import RepoInfo from './Components/RepoInfo';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<RepoList />} />
            <Route path="/repo/:repoId" element={<RepoInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
