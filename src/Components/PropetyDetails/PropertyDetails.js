import React, { useEffect } from 'react';
import "../../CSS/PropertyDetails.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPropertyDetails } from '../../Store/PropertyDetails/propertyDetails-action';
import PropertyImg from './PropertyImg';

const PropertyDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const propertydetails = useSelector((state) => state.propertydetails);
    console.log(propertydetails);

    useEffect(() => {
        dispatch(getPropertyDetails(id));
    }, [dispatch, id]);

    const { propertyName, address, images } = propertydetails;

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
                </>
                )
            }
        </div>
    )
}

export default PropertyDetails