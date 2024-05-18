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
export const likeFlower = (id, userId) => async (dispatch, getState) => {
    const isLiked = getState().main.find(flower => flower.id === id).isLiked;
    const url = isLiked ? 'http://192.168.0.101:3001/unlike' : 'http://192.168.0.101:3001/like';
    
    try {
      await axios.post(url, { userId, flowerId: id });
      dispatch({ type: LIKE_FLOWER, id });
    } catch (error) {
      console.error('Error liking/unliking flower:', error);
    }
};

export const changeCartStatus = (id, userId) => async (dispatch, getState) => {
    const cart = getState().main.find(flower => flower.id === id).cart;
    const url = cart ? 'http://192.168.0.101:3001/delete_from_cart' : 'http://192.168.0.101:3001/add_to_cart';
    
    try {
      await axios.post(url, { userId, flowerId: id });
      dispatch({ type: CHANGE_CART_STATUS, id });
    } catch (error) {
      console.error('Error add/remove from cart:', error);
    }
};



export const fetchFlowers = (userId) => async (dispatch) => {
    try {
      const response = await axios.get('http://192.168.0.101:3001/flowers');
      const flowers = response.data;
  
      const likesResponse = await axios.get(`http://192.168.0.101:3001/user_likes/${userId}`);
      const likedFlowerIds = likesResponse.data;
    
      const flowersWithLikes = flowers.map(flower => ({
        ...flower,
        isLiked: likedFlowerIds.includes(flower.id)
      }));

      const cartResponse = await axios.get(`http://192.168.0.101:3001/get_cart/${userId}`);
      const cartFlowersId = cartResponse.data;
      const flowersInCart = flowersWithLikes.map(flower => ({
        ...flower,
        cart: cartFlowersId.includes(flower.id)
      }));
      dispatch(setFlowers(flowersInCart));
    } catch (error) {
      console.error('Error fetching flowers:', error);
    }
  }

export default mainReducer;
