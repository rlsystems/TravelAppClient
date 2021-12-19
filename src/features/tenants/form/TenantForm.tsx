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
import { Tenant } from '../../../app/models/tenant';



export default observer(function TenantForm() {


    const history = useHistory();
    const { tenantStore } = useStore();
    const { createTenant, loadTenants, loadTenant, loading, loadingInitial, selectedTenant } = tenantStore

    const { id } = useParams<{ id: string }>(); //in case this is admin edit

    const [tenantFormValues, setTenantFormValues] = useState<Tenant>({ //Local State
        id: '',
        name: '',
        key: '',
        adminEmail: '',
        connectionString: '',
        isActive: true,
        validUpto: null
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        name: Yup.string().required('The name is required'),
        key: Yup.string().required('The key is required'),
        adminEmail: Yup.string().required('The admin email is required').email(),
        connectionString: Yup.string().notRequired()
    })

    useEffect(() => { 
        if (id) {
            loadTenant(id).then(tenant => setTenantFormValues(tenant!))
        } 
    }, [id, loadTenant])




    function handleFormSubmit(tenant: Tenant) {
        // if (id) {
        //     updateAppUser(user).then(() => history.push(`/editUser/${user.id}`))
        // } else {
            
        //     updateCurrentUser(user).then(() => history.push(`/editUser/`))
            
        // }

        createTenant(tenant).then(() => history.push(`/tenants/`))
        console.log('handle submit');
    }



    if (loadingInitial) return <LoadingComponent content='Loading user...' />

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-gray-700"> {id ? 'Edit Tenant' : 'Create Tenant'} </h1>

            </div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={tenantFormValues}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <form onSubmit={handleSubmit} autoComplete='off' className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">


                        <MyTextInput name='name' type='text' placeholder='Name' />
                        <MyTextInput name='key' type='text' placeholder='Key' />
                        <MyTextInput name='adminEmail' type='email' placeholder='Admin Email' />
                        <MyTextInput name='connectionString' type='text' placeholder='Connection String' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit' />

                        <Button as={Link} to='/tenants' floated='right' type='button' content='Cancel' />

                    </form>
                )}

            </Formik>



        </div>
    )
})