import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useField } from 'formik'
import React from 'react'
import { Form } from 'semantic-ui-react';


interface Props {
    name: string;
    label?: string;
}

export default function MyCheckbox(props: Props) {
    const [field, meta] = useField(props.name); //the double !! casts into boolean
    return (
        <div className="relative flex items-start">
            <div className="flex items-center h-5">
                <input
                    {...field} {...props}
                    type="checkbox"
                    className="focus:ring-blue-400 h-4 w-4 text-blue-300 border-gray-400 rounded"
                    checked={field.value}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="isActive" className="font-medium text-gray-700">
                    {props.label}
                </label>
                <p id="isActive-description" className="text-gray-500">
                    Uncheck to disable user access
                </p>
            </div>
        </div>

    )
}