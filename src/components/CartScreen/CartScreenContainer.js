import {connect} from "react-redux";
import CartScreen from "./CartScreen";
import { likeFlower, changeCartStatus } from "../../redux/mainReducer";

const CartScreenContainer = ({flowers, navigation, changeCartStatus}) => {
    return (
        <CartScreen flowers={flowers} navigation={navigation} changeCartStatus={changeCartStatus}/>
    )
}

const mapStateToProps = (state) => {
    return {
        flowers: state.main.filter(flower => flower.cart === true)
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        changeCartStatus: (id) => {
            console.log('change in Cart container')
            let action = changeCartStatus(id);
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreenContainer)