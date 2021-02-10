import axios from 'axios';

const countries = async () => {
    try{
        const result = await axios.get('http://www.geognos.com/api/en/countries/info/all.json');
        console.log(result);
        return result.data;
    }catch(err){
        console.log(err)
    }
};

export default countries;