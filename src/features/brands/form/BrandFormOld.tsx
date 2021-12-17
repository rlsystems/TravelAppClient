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



export default observer(function BrandFormOld() {
   

    const history = useHistory();
    const { brandStore } = useStore();
    const { createBrand, updateBrand, loadBrand, loading, loadingInitial } = brandStore;
    const { id } = useParams<{ id: string }>();

    const [brand, setBrand] = useState<Brand>({
        id: '',
        name: '',
        description: '',
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        name: Yup.string().required('The brand name is required'),
        description: Yup.string().required('The brand description is required'),
        
    })

    useEffect(() => {
        if (id) loadBrand(id).then(brand => setBrand(brand!))
    }, [id, loadBrand])




    function handleFormSubmit(brand: Brand) {
        if (brand.id.length === 0) {
            // let newBrand = {
            //     ...brand,
            //     id: uuid()
            // };
            // createBrand(newBrand).then(() => history.push(`/brands/${newBrand.id}`))

            createBrand(brand).then(() => history.push(`/brands/`))
        } else {
            updateBrand(brand).then(() => history.push(`/manage/${brand.id}`))
        }
    }



    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content="BRAND Details" sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={brand}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit' />
                        <Button as={Link} to='/brands' floated='right' type='button' content='Cancel' />
                        
                    </Form>
                )}

            </Formik>

        </Segment>
    )
})