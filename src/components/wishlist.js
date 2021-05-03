import axios from 'axios';

const ADD_TO_WISHLIST = 'add_to_wishlist';

const SERVER = '/api';

export function addTowishlist(id) {
    let body = {
        productId: id
    }
    const request = axios.post(`${SERVER}/addTowishlist`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_WISHLIST,
        payload: request
    }
}
