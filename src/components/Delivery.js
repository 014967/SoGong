import axios from 'axios';

const REMOVE_DELIVERY_ADDRESS = 'remove_delivery_address';
const SERVER = '/api';

export function removedeliveryaddress(deliveryname) {

    const request = axios.get(`/api/removeFromdelivery?deliveryname=${deliveryname}`)
        .then(response => {
            
            response.data.delivery.forEach(item => {
                response.data.userInfo.forEach((user, index) => {
                    if (item.deliveryname === user.deliveryname) {
                        response.data.userInfo[index].deliveryname = item.deliveryname
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