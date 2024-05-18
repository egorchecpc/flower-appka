import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import colors from '../../helpers/colors';
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const width = Dimensions.get('screen').width

const CartCard = ({flower, navigation, changeCartStatus}) => {
  const [inCart, setCartStatus] = useState(flower.item.cart)
  
  const handleCartPress = () => {
    setCartStatus(prevInCart => {
      const newInCart = !prevInCart;
      console.log(flower)
      changeCartStatus(flower.item.id)
      return newInCart;
      
    });
    
  }
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', flower)}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 120, height: 120 }}>
            <Image style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} source={{uri:flower.item.img}} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{flower.item.name}</Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>${flower.item.price}</Text>
              <TouchableOpacity onPress={handleCartPress}>
                <View style={{ height: 25, width: 25, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                  {inCart
                    ? <Ionicons name='md-close-circle' size={25} color={colors.grey} />
                    : <Ionicons name='md-add-circle' size={25} color={colors.orange} />
                  }
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
    card: {
      height: 120,
      backgroundColor: '#f5f5f5',
      width: width - 4, // Subtract the margin from the total width
      marginHorizontal: 2,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15
    }
  });
export default CartCard;