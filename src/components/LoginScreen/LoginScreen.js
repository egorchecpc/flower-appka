import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, ImageBackground  } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {

    if (!validateEmail(email)) {
      Alert.alert('Ошибка', 'Введите корректный email в формате email@text.text');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.101:3001/login', { email, password });
      const { token2 } = response.data;
      Alert.alert('Успех', 'Вы вошли в систему!');
      navigation.navigate('Home', { token2 });
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      Alert.alert('Ошибка', 'Неверный email или пароль.');
    }
  };

  return (
    <ImageBackground 
      source={require('../../../assets/background.jpg')} 
      style={styles.background}
    >
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
        <Button title="Войти" onPress={handleLogin} />
        <View style={styles.buttonSpacing} />
        <Button title="Регистрация" onPress={() => navigation.navigate('Register')} />
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
  buttonSpacing: {
    height: 16, // Высота отступа между кнопками
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default LoginScreen;
