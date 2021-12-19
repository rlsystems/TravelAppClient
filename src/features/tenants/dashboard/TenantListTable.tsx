import { observer } from 'mobx-react-lite';
import LinkButton from '../../../app/common/form/LinkButton';
import { useStore } from '../../../app/stores/store';


export default observer(function TenantListTable() {
    const { tenantStore } = useStore();
    const { tenantsSorted } = tenantStore;



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
                            Key
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            Admin Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-medium tracking-wider"
                        >
                            Connection String
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
                            Validity
                        </th>
                

                    </tr>
                </thead>
                <tbody className="bg-gray-50">
                    {tenantsSorted.map((tenant) => (
                        <tr key={tenant.id} className="border-b border-gray-200 ">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.key}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.adminEmail}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.connectionString}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.isActive ? "True" : "False"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.validUpto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </>

    )
})
