import './App.css';
import PropertyList from './Components/Home/PropertyList';
import Main from './Components/Home/Main';
import PropertyDetails from './Components/PropetyDetails/PropertyDetails';
import Login from './Components/User/Login';
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter instead of createBrowserRouter
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

  return (
    <div className="App">
      <Router>
        <Routes> {/* Use Routes instead of RouterProvider */}
          <Route path="/" element={<Main />}>
            <Route path="/" element={<PropertyList />} />
            <Route path="propertylist/:id" element={<PropertyDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
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
