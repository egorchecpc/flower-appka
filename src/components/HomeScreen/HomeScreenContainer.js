import { connect } from "react-redux";
import { useEffect } from "react";
import HomeScreen from "./HomeScreen";
import jwtDecode from 'jwt-decode';
import { likeFlower, changeCartStatus, fetchFlowers } from "../../redux/mainReducer";

const HomeScreenContainer = ({ route, flowers, navigation, likeFlower, changeCartStatus, fetchFlowers }) => {
    
    const userId=route.params.token2.userId
    console.log(route.params)
    useEffect(() => {
        fetchFlowers(userId);
    }, [fetchFlowers, userId]);
    console.log('Тестовый запрос будет с user_id:',userId)
    return (
        <HomeScreen userId={userId} flowers={flowers} navigation={navigation} likeFlower={(id) => likeFlower(id, userId)} changeCartStatus={(id) => changeCartStatus(id, userId)} />
    );
}

const mapStateToProps = (state) => {
    return {
        flowers: state.main,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeFlower: (id, userId) => {
            console.log('like in Home container');
            let action = likeFlower(id, userId);
            dispatch(action);
        },
        changeCartStatus: (id, userId) => {
            console.log('change in Home container');
            let action = changeCartStatus(id, userId);
            dispatch(action);
        },
        fetchFlowers: (userId) => {
            dispatch(fetchFlowers(userId)); // добавляем диспатч для получения данных
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);
