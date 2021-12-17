import { useField } from 'formik'
import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';




export default function MyDateInput(props: Partial<ReactDatePickerProps>) { //Partial makes every parameter of a class optional
    const [field, meta, helpers] = useField(props.name!); //we know there will be a name for this -- // helpers is so that we can set the field manually
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}