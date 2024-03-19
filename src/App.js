import './App.css';
import PropertyList from './Components/Home/PropertyList';
import Main from './Components/Home/Main';
import PropertyDetails from './Components/PropetyDetails/PropertyDetails';
import Login from './Components/User/Login';
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'; // Use BrowserRouter instead of createBrowserRouter
import { currentUser } from "./Store/User/user-action";
import { userActions } from './Store/User/user-slice';
import Signup from './Components/User/Signup';
import Profile from './Components/User/Profile';
import EditProfile from './Components/User/EditProfile';
import UpdatePassword from './Components/User/UpdatePassword';

function App() {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);

  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  }, [errors, dispatch]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} id='main' exact>
        <Route id='home' index element={<PropertyList />} exact />
        <Route id='PropertyDetails' path="propertylist/:id" element={<PropertyDetails />} exact />
        <Route id='login' path="login" element={<Login />} />
        <Route id='signup' path="signup" element={<Signup />} />
        <Route id='profile' path='profile' element={<Profile />} />
        <Route id='editprofile' path='editprofile' element={<EditProfile />} />
        <Route id='updatepassoword' path='user/updatepassword' element={<UpdatePassword/>}/>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position='bottom-center' // Corrected position typo
        autoClose={3000}
        draggable={true}
        transition={Flip}
      />
    </div>
  )
}

export default App;
