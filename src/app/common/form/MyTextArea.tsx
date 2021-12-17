import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useField } from 'formik'
import React from 'react'
import { Form } from 'semantic-ui-react';


interface Props {
    placeholder: string;
    name: string;
    label?: string;
    rows: number;
}

export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props.name); //the double !! casts into boolean
    return (
        <Form.Field error={meta.touched && !!meta.error} autoComplete="off">
            <label className="block text-sm font-medium text-gray-700"> {props.label}</label>
            <div className="mt-1 relative">
                <textarea {...field} {...props} className="bg-gray-100 border-gray-400 text-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                {meta.touched && meta.error ? (

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>

                ) : null}
            </div>

            {meta.touched && meta.error ? (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                    {meta.error}
                </p>

            ) : null}
        </Form.Field>
    )
}