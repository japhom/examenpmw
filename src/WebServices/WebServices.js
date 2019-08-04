//import axios from 'axios';
import WebService from './WebService';


export default {
    
    async getUrl({ url }) {
        return await WebService.get(url);
    }
};
