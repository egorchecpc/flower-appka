import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../helpers/colors';

const CategoriesList = ({categoryIndex, handleFilterPress}) => {
  const categories = ['ALL', 'POPULAR', 'ORGANIC', 'SYNTHENTIC']
  return (
    <View style={styles.categoryContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => handleFilterPress(index) }>
          <Text style={[styles.categoryText, categoryIndex == index && styles.categoryTextSelected  ]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  categoryText: {
    color: 'grey',
    fontWeight: 'bold'
  },
  categoryTextSelected: {
    color: colors.orange,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: colors.orange
  }
})
export default CategoriesList;