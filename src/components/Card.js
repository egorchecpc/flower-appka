import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../helpers/colors';

const Card = ({ flower, navigation, likeFlower, changeCartStatus }) => {
    flower = flower.item;
    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { flower })}>
            <Image source={{ uri: flower.img }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{flower.name}</Text>
                <Text style={styles.price}>${flower.price}</Text>
                <TouchableOpacity onPress={() => likeFlower(flower.id)}>
                    <Text style={styles.like}>{flower.isLiked ? '❤️' : '♡'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeCartStatus(flower.id)}>
                    <Text style={styles.cart}>{flower.cart ? 'Remove from cart' : 'Add to cart'}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: colors.white,
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 150,
    },
    info: {
        padding: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: colors.grey,
    },
    like: {
        fontSize: 16,
        color: colors.red,
    },
    cart: {
        fontSize: 14,
        color: colors.blue,
    }
});

export default Card;
