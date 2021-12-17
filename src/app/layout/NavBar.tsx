import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ChatAlt2Icon, CogIcon, ExclamationIcon, UsersIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react';


interface Props {
    setTheme: () => void;
}

export default observer(function NavBar({ setTheme }: Props) {
    const { userStore: { currentUser, logout } } = useStore();

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <aside className="flex w-16 flex-col fixed inset-y-0 ">

            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col bg-gray-50 border-r border-gray-100">
                <div className="flex-1 flex flex-col pt-4 pb-4 ">

                    <nav className="flex flex-col flex-1 px-2 space-y-1">
                        <NavLink
                            key={1}
                            href=''
                            className='flex justify-center text-gray-700 hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium'
                            to="/" exact
                        >
                            <div className="flex items-center justify-center flex-shrink-0 px-4">
                                <img
                                    className="block  h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                    alt="Workflow"
                                />

                            </div>
                        </NavLink>
                        <NavLink
                            key={2}
                            href=''
                            className='flex justify-center text-gray-700 hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium'
                            to="/brands"
                        >
                            <ChatAlt2Icon className="h-6 w-6 text-black" aria-hidden="true" />
                        </NavLink>
                        <NavLink
                            key={3}
                            href=''
                            className='flex justify-center text-gray-700 hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium'
                            to="/errors"
                        >
                            <ExclamationIcon className="h-6 w-6 text-black" aria-hidden="true" />
                        </NavLink>
                        <NavLink
                            key={4}
                            href=''
                            className='flex justify-center text-gray-700 hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium'
                            to="/users"
                        >
                            <UsersIcon className="h-6 w-6 text-black" aria-hidden="true" />
                        </NavLink>




                    </nav>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="p-3">
                        <button
                            type="button"
                            onClick={() => setTheme()}
                        >
                            <CogIcon className="h-6 w-6 text-gray-700 hover:bg-gray-100 hover:text-black" aria-hidden="true" />
                        </button>
                    </div>


                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="border-t border-gray-600  py-3 mx-2">
                                <div className="flex-shrink-0 w-full group block">
                                    <img
                                        className="inline-block h-9 w-9 rounded-full"
                                        src={currentUser?.imageUrl || 'assets/user.png'}
                                        alt=""
                                    />
                                </div>
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
                         
                            <Menu.Items className="shadow-md absolute bottom-12 left-8 mt-2 w-56 rounded-md shadow-lg bg-gray-100 divide-y divide-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-4 py-3">
                                <p className="text-sm text-black">Signed in as</p>
                                <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.firstName} {currentUser?.lastName}</p>
                            </div>
                                
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                onClick={logout}
                                                className={classNames(
                                                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Log out
                                            </div>
                                        )}
                                    </Menu.Item>


                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link

                                                to={`/editUser`}
                                                className={classNames(
                                                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                                                    'block w-full text-left px-4 py-2 text-sm'
                                                )}
                                            >
                                                Edit Profile
                                            </Link>
                                        )}
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>








                </div>
            </div>


        </aside>

    )
})