import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { useStore } from '../../../app/stores/store';


export default observer(function UserListTable() {
    const { appUserStore } = useStore();
    const { appUsersSorted } = appUserStore;



    return (
        <>
            <table className="min-w-full mt-8">
                <thead className="bg-gray-100 text-gray-500">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-sm font-medium tracking-wider"
                        >
                            First
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            Last
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            Username
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            Active
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            GUID
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >

                        </th>

                    </tr>
                </thead>
                <tbody className="bg-gray-50">
                    {appUsersSorted.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200 ">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.userName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.isActive ? "True" : "False"}</td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                                <Link
                                    key={4}
                                    href=''
                                    className='flex justify-center'
                                    to={`/editUser/${user.id}`}
                                >
                                    <button
                                        type="button"
                                        className="relative flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                    >
                                        Edit

                                    </button>
                                </Link>


                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>


        </>

    )
})
