import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import colors from '../helpers/colors';
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const width = Dimensions.get('screen').width/2 - 30

const Card = ({ flower, navigation, likeFlower, changeCartStatus }) => {
    flower = flower.item;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { flower })}>
            <View style={styles.card}>
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={() => likeFlower(flower.id)}>
                        <View style={{width: 30, height:30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: flower.isLiked ? 'rgba(245, 42, 42, 0.2)' : 'rgba(0, 0, 0, 0.2)'}}>
                            <MaterialIcons name="favorite" size={18} color={flower.isLiked ? colors.red : colors.dark} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height:100, alignItems: 'center'}}>
                    <Image source={{ uri: flower.img }} style={styles.image} />
                </View>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10 }}>{flower.name}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>${flower.price}</Text>
                    <TouchableOpacity onPress={() => changeCartStatus(flower.id)}>
                        <View style={{height:25, width: 25, borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                            {flower.cart
                                ?<Ionicons name='md-close-circle' size={25} color={colors.grey} />
                                :<Ionicons name='md-add-circle' size={25} color={colors.orange} />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
      height: 225,
      backgroundColor: '#f5f5f5',
      width,
      marginHorizontal:2,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15
    },
    image: {
      width: '100%',
      height: 120,
    },
  })

export default Card;
