import React, { useState } from 'react'
import FilterModal from './FilterModal'
const Filter = () => {
    //State from controlling modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    //State for storing selected filters
    const [selectedFilters, setSelectedFilters] = useState({});

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