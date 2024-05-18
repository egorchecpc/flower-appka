import React, { useState } from 'react';
import { ImageBackground, Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 3;
  };

  const handleRegister = async () => {

    if (!validatePassword(password)) {
      Alert.alert('Ошибка', 'Пароль должен быть больше 3 символов');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают.');
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Ошибка', 'Введите корректный email в формате email@text.text');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.101:3001/register', { email, password });
      Alert.alert('Успех', 'Вы успешно зарегистрировались!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      Alert.alert('Ошибка', 'Не удалось зарегистрироваться.');
    }
  };

  return (
    <ImageBackground 
      source={require('../../../assets/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.header}>
          <MaterialIcons name='arrow-back' size={28} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>FlowerApp</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.input}
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.input}
        />
        <Input
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          containerStyle={styles.input}
        />
        <Button title="Зарегистрироваться" onPress={handleRegister} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default RegisterScreen;
