// import react library from react in to this js file

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

//Arrow function

const Main = () => {
    return (
        <div>
            {/* rendering the Header Components
             */}
            <Header />
            <Outlet />
            <Footer />

        </div>
    )
}

export default Main