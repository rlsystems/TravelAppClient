import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';



function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function BrandHeader() {



    return (
        <div className="max-w-full mx-auto flex items-center justify-between mt-8">
            <div className='w-80 flex items-center'>
                <SearchIcon className='h-7 w-7 mr-2 text-gray-400' />
                <input type='text'
                    className="bg-gray-50 text-gray-800  focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-none rounded-md"
                    placeholder='Search by name, email, or tag...'
                />
            </div>


            <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200">
                        Filters
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a

                                        className={classNames(
                                            active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Test 1
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                       
                                        className={classNames(
                                            active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Test 2
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                 
                                        className={classNames(
                                            active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Test 3
                                    </a>
                                )}
                            </Menu.Item>

                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>


        </div>
    )
}