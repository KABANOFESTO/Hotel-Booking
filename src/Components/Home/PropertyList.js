import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Card = ({ image, address, price, name }) => {
    return (
        <figure className='property'>
            <img src={image} alt='Propertyimg' />
            <h4>{name}</h4>
            <figcaption>
                <main className='propertdetails'>
                    <h5>{name}</h5>
                    <h6>
                        <span class="material-symbols-outlined houseicon">
                            home_pin
                        </span>
                        {address}
                    </h6>
                    <p>
                        <span className='price'>
                            ${price}
                        </span>per night
                    </p>
                </main>
            </figcaption>
        </figure>
    )
}

const PropertyList = () => {
    const [currentPage, setCurrentPage] = useState({ page: 1 });
    const { properties, totalProperties } = useSelector(
        (state) => state.properties);
    const lastPage = Math.ceil(totalProperties / 12);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProperties = async (page) => {
            dispatch(propertyAction.updateSearchParams(page));
            dispatch(getAllProperties());
        };
        fetchProperties(currentPage);
    }, [currentPage, dispatch]);                                                                               

    return (
        <>
            {
                properties.length === 0 ? (
                    <p className='not_found'>Properties not found....</p>
                ) : (
                    <div className='propertylist'>
                        {properties.map(property =>
                            <Card
                                key={property._id}
                                id={property._id}
                                image={property.images[0].url}
                                name={property.propertyName}
                                address={`${property.address.city},${property.address.state},${property.address.pincode}`}
                                price={property.price}
                            />
                        )}
                    </div>
                )
            }
            <div className='pagination'>
                <button
                    onClick={() => setCurrentPage({ page: ProgressEvent.page - 1 })}
                >
                </button>

            </div>
        </>
    )
}

export default PropertyList; 