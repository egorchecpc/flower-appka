import { connect } from "react-redux";
import { useEffect } from "react";
import HomeScreen from "./HomeScreen";
import { likeFlower, changeCartStatus, fetchFlowers } from "../../redux/mainReducer";

const HomeScreenContainer = ({ flowers, navigation, likeFlower, changeCartStatus, fetchFlowers }) => {
    useEffect(() => {
        fetchFlowers(); // вызываем функцию для получения данных из API при монтировании компонента
    }, [fetchFlowers]);

    return (
        <HomeScreen flowers={flowers} navigation={navigation} likeFlower={likeFlower} changeCartStatus={changeCartStatus} />
    );
}

const mapStateToProps = (state) => {
    return {
        flowers: state.main
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeFlower: (id) => {
            console.log('like in Home container');
            let action = likeFlower(id);
            dispatch(action);
        },
        changeCartStatus: (id) => {
            console.log('change in Home container');
            let action = changeCartStatus(id);
            dispatch(action);
        },
        fetchFlowers: () => {
            dispatch(fetchFlowers()); // добавляем диспатч для получения данных
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);
