import './App.css';
import PropertyList from './Components/Home/PropertyList';
//importing necessary components and functions from the react-router-dom library for routing.

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Main from './Components/Home/Main';


function App() {
  //manages the routing configuration for the application
  const router = createBrowserRouter(
    //creates routes from the elements passed to it.
    createRoutesFromElements(
      //defines a route component that matches all paths "/" and renders the main component
      //exact properties ensure that the route matches exactly what u gave in path

      <Route path='/' element={<Main />} id='main' exact>
        <Route id='home' index element={<PropertyList />} exact />
      </Route>
    )
  )
  return (
    <div className="App">
      {/* this ensures that the routing functionality is available*/}
      <RouterProvider router={router} />

    </div>
  )
}

export default App;
