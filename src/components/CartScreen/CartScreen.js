import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import colors from '../../helpers/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import CartCard from './CartCard';
import { useState, useEffect } from 'react';



const CartScreen = ({navigation, flowers, changeCartStatus}) => {
  
  const [cartFlowers,setCartFlowers] = useState(flowers);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let newFlowers = flowers.filter((item)=>item.cart===true)
    setCartFlowers(newFlowers)
    const total = newFlowers.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotalPrice(total);
  }, [flowers]);
  

  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={styles.header}>
        <MaterialIcons name='arrow-back' size={28} onPress={() => navigation.goBack()} />
      </View>
      <FlatList contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={cartFlowers} renderItem={(item) => <CartCard flower={item} navigation={navigation} changeCartStatus={changeCartStatus}/>} />

      <View style={styles.purchaseFlower}>  
        <View style={styles.buyBtn}>
          <TouchableOpacity onPress={() => console.log('hey') }>
            <Text style={styles.butBtn_txt}>Leave a request</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.totalPriceText}>Total Price: ${totalPrice.toFixed(2)}</Text>        
      </View>
      <View>
    </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  borderBtnText: {
    fontWeight: 'bold',
    fontSize: 28
  },
  buyBtn: {
    width: 150,
    height: 40,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  butBtn_txt: {
    color: 'white'
  },
  purchaseFlower: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20 // Move the button to the bottom of the screen
  },
  totalPriceText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.dark,
  },
});

export default CartScreen;