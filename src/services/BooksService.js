import axios from 'axios'
const baseUrl = import.meta.env.VITE_URL + '/api';

class BooksService {
    /* 
     *  Fetch list of all pdfs
     *  returns allBooks[].
    */
    async getAllBooks (type) {
        let allBooks = []
        const response = await axios.get(`${baseUrl}/${type}/getAllBooks`, {
            params: {
                // limitToFirst: '50',
            }
        });
        allBooks = response.data;
        return allBooks
    }
}

export default new BooksService()