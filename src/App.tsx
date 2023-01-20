import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import './App.css';
import MainPage from "./pages/dashboard/MainPage";
import ErrorPage from "./pages/ErrorPage";



const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainPage />} errorElement={<ErrorPage/>} >
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);
function App() {
  return (
    <RouterProvider router={routes}/>
    );
}

export default App;
