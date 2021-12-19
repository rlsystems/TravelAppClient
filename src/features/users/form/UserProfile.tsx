import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

import MyCheckbox from '../../../app/common/form/MyCheckbox';
import { User } from '../../../app/models/user';



export default observer(function UserProfile() {


    const history = useHistory();
    const { appUserStore, userStore } = useStore();
    const { loadAppUser, updateAppUser, loading, loadingInitial } = appUserStore;
    const { currentUser, getCurrentUser, updateCurrentUser } = userStore; //check loading

    const { id } = useParams<{ id: string }>(); //in case this is admin edit

    const [userFormValues, setUserFormValues] = useState<User>({ //Local State
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        isActive: true,
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        firstName: Yup.string().required('The first name is required'),
        lastName: Yup.string().required('The last name is required'),
        email: Yup.string().required().email(),
        phoneNumber: Yup.string().notRequired()
    })

    useEffect(() => { 
        if (id) {
            loadAppUser(id).then(appUser => setUserFormValues(appUser!))
        } else {

            if(!currentUser){
                getCurrentUser().then(userFormValues => setUserFormValues(userFormValues!))    
            } else {
                setUserFormValues(currentUser)
            }
                 
        }
    }, [id, getCurrentUser])




    function handleFormSubmit(user: User) {
        if (id) {
            updateAppUser(user).then(() => history.push(`/editUser/${user.id}`))
        } else {
            
            updateCurrentUser(user).then(() => history.push(`/editUser/`))
            
        }
    }



    if (loadingInitial) return <LoadingComponent content='Loading user...' />

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-gray-700">Edit Profile | {userFormValues.firstName} {userFormValues.lastName}</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Username: {userFormValues.userName}
                </p>
            </div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={userFormValues}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <form onSubmit={handleSubmit} autoComplete='off' className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

                        {currentUser?.id != userFormValues.id && //conditionally render in jsx

                            <MyCheckbox name='isActive' label='Active' />
                        }

                        <MyTextInput name='firstName' type='text' placeholder='First Name' />
                        <MyTextInput name='lastName' type='text' placeholder='Last Name' />
                        <MyTextInput name='email' type='email' placeholder='Email' />
                        <MyTextInput name='phoneNumber' type='text' placeholder='Phone Number' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit' />

                        <Button as={Link} to='/users' floated='right' type='button' content='Cancel' />

                    </form>
                )}

            </Formik>



        </div>
    )
})