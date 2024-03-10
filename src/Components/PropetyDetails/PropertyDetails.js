import React, { useEffect } from 'react';
import "../../CSS/PropertyDetails.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPropertyDetails } from '../../Store/PropertyDetails/propertyDetails-action';
import PropertyImg from './PropertyImg';
import PropertyAmenities from './PropertyAmenities';
import BookingForm from './BookingForm';

const PropertyDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { propertydetails } = useSelector((state) => state.propertydetails);
    console.log(propertydetails);

    useEffect(() => {
        dispatch(getPropertyDetails(id));
    }, [dispatch, id]);

    const {
        propertyName,
        address,
        images,
        description,
        maximumGuest,
        amenities,
        price,
        currentBookings,
    } = propertydetails;

    return (
        <div className='property-container'>
            {propertyName && (
                <>
                    <p className='property-header'>{propertyName}</p>
                    <h6 className='property-location'>
                        <span class="material-symbols-outlined">house</span>
                        <span className='location'>{`${address.area},${address.city},${address.pincode},${address.state}`}</span>
                    </h6>
                    <PropertyImg images={images} />
                    <div className='middle-container row'>
                        <div className='des-and-amenities col-md-8 col-sm-12 col-12'>
                            <h2 className='property-description-header'>Description</h2>
                            <p className='property-description'>{description}
                                <br /><br />
                                Max number of Guests:{maximumGuest}
                                <br /><br /><br />
                            </p>
                            <hr />
                            <PropertyAmenities amenities={amenities} />
                            <br /><br />
                        </div>
                        <BookingForm
                            propertyId={id}
                            price={price}
                            propertyName={propertyName}
                            address={address}
                            maximumGuest={maximumGuest}
                            currentBookings={currentBookings}
                        />
                    </div>
                </>
            )
            }
        </div>
    )
}

export default PropertyDetails