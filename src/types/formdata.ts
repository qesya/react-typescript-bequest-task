type FormData = {
    postcode: string;
    name: string;
    phone: string;
    email: string;
    town: string;
    country: string;
    first_address: string;
    second_address: string;
};

type FormAddress = {
    postcode?: string;
    first_addressline?: string;
    second_addressline?: string;
    town?: string;
    country?: string;
}

export type {
    FormData,
    FormAddress,
}