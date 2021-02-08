import axios from 'axios';

const countries = async () => {
    try{
        const result = await axios.get('https://api.first.org/data/v1/countries');

        return result.data;
    }catch(err){
        console.log(err)
    }
};

export default countries;