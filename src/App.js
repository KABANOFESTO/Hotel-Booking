import './App.css';
import PropertyList from './Components/Home/PropertyList';
//importing necessary components and functions from the react-router-dom library for routing.

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Main from './Components/Home/Main';
import PropertyDetails from './Components/PropetyDetails/PropertyDetails';
import Login from './Components/User/Login';
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from "./Store/User/user-action";
import { userActions } from './Store/User/user-slice';
import Signup from './Components/User/Signup';

function App() {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);
  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  }, [errors, dispatch]);
  //manages the routing configuration for the application
  const router = createBrowserRouter(
    //creates routes from the elements passed to it.
    createRoutesFromElements(
      //defines a route component that matches all paths "/" and renders the main component
      //exact properties ensure that the route matches exactly what u gave in path

      <Route path='/' element={<Main />} id='main' exact>
        <Route id='home' index element={<PropertyList />} exact />
        <Route
          element={<PropertyDetails />}
          id='PropertyDetails'
          path='propertylist/:id'
          exact
        />
        <Route
          id='login'
          path='login'
          element={<Login />}
        />
        <Route
          id='signup'
          path='signup'
          element={<Signup />}
        />
      </Route>
    )
  )
  return (
    <div className="App">
      {/* this ensures that the routing functionality is available*/}
      <RouterProvider router={router} />
      <ToastContainer
        position='buttom-center'
        autoClose={3000}
        draggable={true}
        transition={Flip}
      />

    </div>
  )
}

export default App;
