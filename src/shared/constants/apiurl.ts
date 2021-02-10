// const apiKey = 'ReVj3U2lLkKcIZg96HGT0A30129';
// const secretApiKey = 'mNwa5-EswE2qTqkEgx6c7w30129';

const apiKey = '-WVJCPzlqECDVuhxYkba1A30141';
const secretApiKey = 'vEv1SDX3zEa-Muuy6MNyrA30141';
const BASE_URL = 'https://api.getAddress.io';
const FIND_API_URL = (postcode?:string,house?:string) => `${BASE_URL}/find/${postcode}/${house}?expand=true&api-key=${apiKey}`;
const FIND_POST_CODE = (postcode:string) => `${BASE_URL}/find/${postcode}?expand=true&api-key=${apiKey}`;
const AUTOCOMPLETE_API_URL = (term:string) => `${BASE_URL}/autocomplete/${term}`;

export{
    apiKey,
    secretApiKey,
    BASE_URL,
    FIND_API_URL,
    FIND_POST_CODE,
    AUTOCOMPLETE_API_URL,
}