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
import ProMainPage from "./pages/pro/ProMain";



const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<MainPage />} errorElement={<ErrorPage/>} >
                <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/pro" element={<ProMainPage />} errorElement={<ErrorPage/>} >
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Route>
    )
);
function App() {
  return (
    <RouterProvider router={routes}/>
    );
}

export default App;
