import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';
import { Brand } from '../../../app/models/brand';
import LinkButton from '../../../app/common/form/LinkButton';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { RegisterUserFormValues } from '../../../app/models/user';




export default observer(function UserForm() {


    const history = useHistory();
    const { appUserStore } = useStore();
    const { createAppUser, loading, loadingInitial } = appUserStore;
   

    const [newUserFormValues, setNewUserFormValues] = useState<RegisterUserFormValues>({
        id: '',
        firstName: '',
        lastName: '',
        userName:'',
        email:'',
        password:'',
        confirmPassword:'',
        phoneNumber:'',        
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        firstName: Yup.string().required('The first name is required'),
        lastName: Yup.string().required('The last name is required'),
        userName: Yup.string().required('The user name is required'),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required()
    })

    // useEffect(() => {
    //     if (id) loadAppUser(id).then(appUser => setAppUser(appUser!))
    // }, [id, loadAppUser])




    function handleFormSubmit(appUser: RegisterUserFormValues) {
        createAppUser(appUser).then(() => history.push(`/users/`))
    }



    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-gray-700">User Details</h1>
                <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful what you share.
                </p>
            </div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={newUserFormValues}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <form onSubmit={handleSubmit} autoComplete='off' className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <MyTextInput name='firstName' type='text' placeholder='First Name' />
                        <MyTextInput name='lastName' type='text' placeholder='Last Name' />
                        <MyTextInput name='userName' type='text' placeholder='Username' />
                        <MyTextInput name='email' type='email' placeholder='Email' />
                        <MyTextInput name='phoneNumber' type='text' placeholder='Phone Number' />
                        <MyTextInput name='password' type='text' placeholder='Password' />
                        <MyTextInput name='confirmPassword' type='text' placeholder='Confirm Password' />
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