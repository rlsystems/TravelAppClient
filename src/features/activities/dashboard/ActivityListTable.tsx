import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';


export default observer(function ActivityListTable() {
    const { brandStore } = useStore();
    const { brandsSorted } = brandStore;



    return (
        <>
            <h1 className="text-3xl font-bold text-green-500">
                Activity Table
            </h1>
            <table className="min-w-full ">
                    <thead className="bg-gray-100 text-gray-500">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Category
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                Description
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50">
                        {brandsSorted.map((brand) => (
                            <tr key={brand.id} className="border-b border-gray-200 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brand.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{brand.id}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>


        </>

    )
})
