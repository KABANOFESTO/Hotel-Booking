import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types"; //for type-checking props
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css";//import Css file for input range styling
import InputRange from "react-input-range";

const FilterModal = ({ selectedFilters, onFilterChange, onClose }) => {
  const [priceRange, setPriceRange] = useState({
    min: selectedFilters.priceRange?.min || 600,
    max: selectedFilters.priceRange?.max || 30000,
  });
  const [propertyType, setPropertyType] = useState(selectedFilters.propertyType || "");//Default it is empty or the selected property type from props
  const [roomType, setRoomType] = useState(selectedFilters.roomType || "");
  const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

  //useEffect hook to update states when selectedFilters prop changes
  useEffect(() => {
    setPriceRange({
      min: selectedFilters.priceRange?.min || 600,
      max: selectedFilters.priceRange?.max || 30000,
    });
    setPropertyType(selectedFilters.propertyType || "");
    setRoomType(selectedFilters.roomType || "");
    setAmenities(selectedFilters.amenities || []);
  }, [selectedFilters]);
  //Function to handle changes in price range
  const handlePriceRangeChange = (value) => {
    setPriceRange(value) //it will update the price range state
  }
  //Function to handle min value

  const handleMinChange = (e) => {
    const miValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({
      ...prev,
      min: miValue
    }))
  };

  //Function to handle max value
  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({
      ...prev,
      max: maxValue
    }));
  }
  //Function to handle applying filters

  const handlFilterChange = (e) => {
    onFilterChange("minPrice", priceRange.min);
    onFilterChange("minPrice", priceRange.max);
    onFilterChange("propertyType", propertyType);
    onFilterChange("roomType", roomType);
    onFilterChange("amenities", amenities);
    onClose();//closes the modal
  };

  //options for property type
  const propertyTypeOptions = [
    {
      value: "House",
      label: "House",
      icon: 'home',
    },
    {
      value: "flat",
      label: "flat",
      icon: "apartment"
    },
    {
      value: "Guest House",
      label: "Guest House",
      icon: "hotel"
    },
    {
      value: "Hotel",
      label: "Hotel",
      icon: "meeting_room"
    },
  ];

  //Options for room types

  const rooTypeOptions = [{
    value: "Entire Room",
    label: "Entire Room",
    icon: "hotel"
  },
  {
    value: "Room",
    label: "Room",
    icon: "meeting_room"
  },
  {
    value: "AnyType",
    label: "Anytype",
    icon: "apartment"
  },
  ];

  //Options for Amenities

  const amenitiesOptions = [
    {
      value: "wifi",
      label: "wifi",
      icon: "wifi"
    },
    {
      value: "Kitchen",
      label: "Kitchen",
      icon: "kitchen"
    },
    {
      value: "Ac",
      label: "AC",
      icon: "ac_unit"
    },
    {
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service"
    },
    {
      value: "Tv",
      label: "Tv",
      icon: "tv"
    },
    {
      value: "Pool",
      label: "Pool",
      icon: "pool"
    },
    {
      value: "Free Parking",
      label: "Free parking",
      icon: "local_parking"
    }
  ];

  //function to handle clearing filters
  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 });
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
  };

  //finction to handle changes in amenities

  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities((prevAmenities) => prevAmenities.includes(selectedAmenity) ? prevAmenities.filter((item) =>
      item !== selectedAmenity
    ) : [...prevAmenities, selectedAmenity]);
  };

  //Function to handle changes in property type

  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType((prevType) =>
      prevType === selectedType ? "" : selectedType
    )
  }
  //Function to handle roomType
  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) =>
      prevType === selectedType ? "" : selectedType
    );
  }

  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <h4>
          Filters<hr />
        </h4>
        {/* close button */}
        <button className='close-button' onClick={onClose}>
          <span>&times;</span>
        </button>
        {/* filter section  */}
        <div className='modal-filters-container'>
          <div className='filter-section'>
            <label>Price range:</label>
            <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <div className='range-inputs'>
              <input
                type='number'
                value={priceRange.min}
                onChange={handleMinChange}
              />
              <span></span>
              <input
                type='number'
                value={priceRange.max}
                onChange={handleMaxInputChange}
              />
            </div>
          </div>
          {/* PropTypes filter  */}
          <div className='filter-section'>
            <label>Property type:</label>
            <div className='icon-box'>
              {propertyTypeOptions.map((Options) => (
                <div key={Options.value}
                  className={`selectable-box ${propertyType === Options.value ? "selected" : ""}`}
                  onClick={() => handlePropertyTypeChange(Options.value)}

                >
                  <span className='material-icons'>{Options.icon}</span>
                  <span>{Options.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Room type filter   */}
          <div className='filter-section'>
            <label>Room type:</label>
            <div className='icon-box'>
              {rooTypeOptions.map((Options) => (
                <div
                  key={Options.value}
                  className={`selectable-box ${roomType === Options.value ? "selected" : ""
                    }`}
                  onClick={() => handleRoomTypeChange(Options.value)}
                >
                  <span className='material-icons'>{Options.icon}</span>
                  <span>{Options.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Amenities Filter  */}
          <div className='filter-section'>
            <label>Amenities</label>
            <div className='amenities-checkboxes'>
              {amenitiesOptions.map((Options) => (
                <div
                  key={Options.value}
                  className="amenity-checkbox">
                  {console.log(amenities.includes(Options.value))
                  }
                  <input
                    type='checkbox'
                    value={Options.value}
                    checked={amenities.includes(Options.value)}
                    onChange={() => handleAmenitiesChange(Options.value)}
                  />
                  <span className='material-icons amenitieslabel'>{Options.icon}</span>
                  <span>{Options.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Filter action button  */}
          <div className='filter-buttons'>
            <button className='clear-button' onClick={handleClearFilters}>
              Clear
            </button>
            <button onClick={handlFilterChange}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FilterModal.prototype = {
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default FilterModal;