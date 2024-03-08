import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    //Slice name;
    name: "property",
    //initial state for the property slice
    initialState: {
        properties: [],
        totalProperties: 0,
        searchParams: {},//parameter used to search
        error: null,//Error state
        loading: false,//Loading state for property
    },
    //reducers functions to handle different functions
    reducers: {
        getRequest(state) {
            state.loading = true;
        },
        //properties to update properties state with fetch data
        getProperties(state, action) {
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.loading = false;
        },
        //Action to search 
        updateSearchParams: (state, action) => {
            state.searchParams = Object.keys(action.payload).length === 0 ? {} : {
                ...state.searchParams,
                ...action.payload,
            };
        },
        //Action to update Error state
        
        getErrors(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const propertyAction = propertySlice.actions;

export default propertySlice;