import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../helpers/colors';
import {useState} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


const DetailsScreen = ({navigation, route}) => {
  const flower = route.params.flower;
  console.log(flower)
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={styles.header}>
        <MaterialIcons name='arrow-back' size={28} onPress={() => navigation.goBack()} />
        <TouchableOpacity onPress={() => navigation.navigate('Cart') }>
          <MaterialIcons name="shopping-cart" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri:flower.img}} style={{resizeMode: 'contain', flex: 1, height: 300, width: 300}} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={{marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{flower.name}
          </Text>
          <View style={styles.priceTag}>
            <Text style={{marginLeft: 15, color: colors.white, fontWeight: 'bold', fontSize: 15}}>${flower.price}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal:20, marginTop: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
          <View style={{marginTop:1, width: 70, height:2, backgroundColor: colors.orange}} />
          <Text style={{marginTop: 5, lineHeight: 22, color: 'grey', fontSize: 16}}>{flower.about}</Text>
          
        </View>
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
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: colors.white,
    marginHorizontal: 7,
    borderRadius: 20,
    marginTop: 30, 
    paddingTop: 30
  },
  priceTag: {
    backgroundColor: colors.orange,
    width: 80,
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center'
  }, 
  purchaseFlower: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  borderBtn: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 6,
    height: 35,
    width: 50,
    justifyItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
})

export default DetailsScreen;