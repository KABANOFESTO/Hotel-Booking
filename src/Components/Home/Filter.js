import React, { useEffect, useState } from 'react';
import FilterModal from './FilterModal';
import { useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';


const Filter = () => {
    //State from controlling modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    //State for storing selected filters
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(propertyAction.updateSearchParams(selectedFilters));
        dispatch(getAllProperties());
    }, [selectedFilters, dispatch]);
    //function for handle opening the modal/popup window

    const handleOpenModal = () => {
        setIsModalOpen(true);//set isModalOpen true to open the modal
    };
    //function to handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);//set isModalOpen false to close modal
    }
    //function to handle change in filters
    const handlFilterChange = (filterName, value) => {
        //update the selected filters with the new value
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    return (
        <>
            {/* Click event to open Modal */}
            <span className="material-symbols-outlined filter" onClick={handleOpenModal}>
                tune
            </span>
            {isModalOpen && (
                <FilterModal
                    selectedFilters={selectedFilters}
                    onFilterChange={handlFilterChange}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export default Filter