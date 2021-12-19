export interface Tenant {
    id: string;
    name: string;
    key: string;
    adminEmail: string;
    connectionString: string;
    isActive: boolean;
    validUpto: Date | null; //maybe a string
}


export interface RegisterTenantFormValues {
    id: string;
    name: string;
    key: string;
    adminEmail: string;
    connectionString: string;
}