import axios from 'axios';

const REMOVE_DELIVERY_ADDRESS = 'remove_delivery_address';
const SERVER = '/api';

export function removedeliveryaddress(address) {

    const request = axios.get(`/api/removeFromdelivery?address=${address}`)
        .then(response => {
            
            response.data.delivery.forEach(item => {
                response.data.userInfo.forEach((user, index) => {
                    if (item.address === user.address) {
                        response.data.userInfo[index].address = item.address
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_DELIVERY_ADDRESS,
        payload: request
    }
}

export default delivery