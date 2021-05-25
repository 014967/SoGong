// import axios from 'axios';

// const ADD_TO_WISHLIST = 'add_to_wishlist';
// const WISHLIST = 'wishlist'
// const REMOVE_WISHLIST_ITEM = 'remove_From_wishlist';
// const SERVER = '/api';

// export function addTowishlist(id) {
//     let body = {
//         productId: id
//     }
//     const request = axios.post(`${SERVER}/addTowishlist`, body)
//         .then(response => response.data);

//     return {
//         type: ADD_TO_WISHLIST,
//         payload: request
//     }
// }

// export function removewishlistItem(productId) {

//     const request = axios.get(`/api/removeFromwishlist?id=${productId}`)
//         .then(response => {
//             //productInfo ,  wishlist 정보를 조합해서   CartDetail을 만든다. 
//             response.data.wishlist.forEach(item => {
//                 response.data.productInfo.forEach((product, index) => {
//                     if (item.id === product._id) {
//                         response.data.productInfo[index].quantity = item.quantity
//                     }
//                 })
//             })
//             return response.data;
//         });

//     return {
//         type: REMOVE_WISHLIST_ITEM,
//         payload: request
//     }
// }

// export default wishlist
import React from 'react'
import styled from 'styled-components'
import WishListContents from '../components/WishListContents'


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 240px;
`

const WishList = () => {
    return (
        <Wrapper>
         <WishListContents />
         
        </Wrapper>
    );
};

export default WishList;