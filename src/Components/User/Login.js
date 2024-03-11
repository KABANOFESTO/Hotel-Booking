import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "../../CSS/Login.css";
import { getLogIn } from "../../Store/User/user-action";
import { userActions } from '../../Store/User/user-slice';
import LoadingSpinner from '../LoadingSpinner';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const { isAutheticated, errors, loading } = useSelector(
        (state) => state.user
    );
    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(getLogIn({ email, password }));
    };
    useEffect(() => {
        if (errors && errors.length > 0) {
            toast.error(errors);
            dispatch(userActions.clearError());
        } else if (isAutheticated) {
            navigate("/");
            toast.success("User has logged successfully");
        }
    }, [isAutheticated, errors, navigate]);

    return (
        <div className='row wrapper'>
            {loading && <LoadingSpinner />}
            {!loading && (
                <div className='col-10 col-lg-5'>
                    <form onSubmit={submitHandle}>
                        <h1 className='form-group'>Login</h1>
                        <div className='form-group'>
                            <label htmlFor='email_field'>Email</label>
                            <input
                                type='email'
                                id='email_field'
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Login