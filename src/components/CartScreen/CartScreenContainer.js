import {connect} from "react-redux";
import CartScreen from "./CartScreen";
import { likeFlower, changeCartStatus } from "../../redux/mainReducer";

const CartScreenContainer = ({route, flowers, navigation, changeCartStatus}) => {
    
    userId = route.params.userId;
    return (
        <CartScreen flowers={flowers} navigation={navigation}  changeCartStatus={(id) => changeCartStatus(id, userId)}/>
    )
}

const mapStateToProps = (state) => {
    return {
        flowers: state.main.filter(flower => flower.cart === true)
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        changeCartStatus: (id, userId) => {
            console.log('change in Cart container')
            let action = changeCartStatus(id, userId);
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreenContainer)