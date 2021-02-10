export type Addresses = {
    formatted_address?: [];
    thoroughfare?: string;
    building_name?: string;
    sub_building_name?: string;
    sub_building_number?: string;
    building_number?: string;
    line_1?: string;
    line_2?: string;
    line_3?: string;
    line_4?: string;
    locality?: string;
    town_or_city?: string;
    county?: string;
    district?: string;
    country?: string;
}

export type PostcodeResponse = {
    postcode: string;
    latitude: string;
    longitude: string;
    addresses: Addresses[];
}