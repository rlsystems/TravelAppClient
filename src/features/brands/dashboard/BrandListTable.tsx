import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';


export default observer(function BrandListTable() {
    const { brandStore } = useStore();
    const { brandsSorted } = brandStore;



    return (
        <>
            <table className="min-w-full mt-8">
                <thead className="bg-gray-100 text-gray-500">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-sm font-medium tracking-wider"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            Description
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
                    {brandsSorted.map((brand) => (
                        <tr key={brand.id} className="border-b border-gray-200 ">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brand.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brand.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{brand.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className='flex justify-end'>
                                    <button
                                        type="button"
                                        onClick={() => brandStore.deleteBrand(brand.id)}
                                        className="mr-5 relative flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        key={4}
                                        href=''
                                        className='flex justify-center'
                                        to={`/editBrand/${brand.id}`}
                                    >
                                        <button
                                            type="button"
                                            className="relative flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                        >
                                            Edit

                                        </button>
                                    </Link>


                                </div>


                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>


        </>

    )
})
