import axios from 'axios';
import {
    FIND_POST_CODE
} from '../../shared/constants/apiurl';

const findPostcode = async (postcode: string) => await axios.get(FIND_POST_CODE(postcode));

export {
    findPostcode,
}