import React, {useCallback, useEffect} from 'react';
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
import useStore from "./store/Store";
import VerifyEmail from "./pages/common/VerifyEmail";



const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<MainPage />} errorElement={<ErrorPage/>} >
                <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/pro" element={<ProMainPage />} errorElement={<ErrorPage/>} >
                <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/user/verify-email/:token" element={<VerifyEmail />} errorElement={<ErrorPage/>} >
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Route>
    )
);
function App() {

    const getUser = useCallback(
        useStore((store) => store.getUser),
        []
    );

    const user = useStore((store) => store.user);

    useEffect(() => {
        getUser();
    }, []);

  return (
        <RouterProvider router={routes}/>
  )}

export default App;
