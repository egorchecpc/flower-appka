import axios from 'axios';

const SET_FLOWERS = 'SET-FLOWERS';
const CHANGE_CART_STATUS = 'CHANGE-CART-STATUS';
const LIKE_FLOWER = 'LIKE-FLOWER';
const SET_LIKES = 'SET-LIKES';
let initialState = [];

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FLOWERS:
            return action.flowers;
        case SET_LIKES:{
          return state.map((f) => {
              if (f.id === action.id) {
                  return { ...f, isLiked: !f.isLiked };
              } else {
                  return f;
              }
          });
        }
            
        case LIKE_FLOWER: {
            console.log('like in reducer')
            return state.map((f) => {
                if (f.id === action.id) {
                    return { ...f, isLiked: !f.isLiked };
                } else {
                    return f;
                }
            });
        }
        case CHANGE_CART_STATUS: {
            console.log('change state in reducer')
            return state.map((f) => {
                if (f.id === action.id) {
                    return { ...f, cart: !f.cart };
                } else {
                    return f;
                }
            });
        }
        default:
            return state;
    }
}

export const setFlowers = (flowers) => ({ type: SET_FLOWERS, flowers });
export const likeFlower = (id) => ({ type: LIKE_FLOWER, id });
export const changeCartStatus = (id) => ({ type: CHANGE_CART_STATUS, id });

export const fetchFlowers = () => async (dispatch) => {
    try {
        const response = await axios.get('http://192.168.0.101:3001/flowers');
        dispatch(setFlowers(response.data));
    } catch (error) {
        console.error('Error fetching flowers:', error);
    }
}

export default mainReducer;
