import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.101:3001/login', { email, password });
      const { token } = response.data;

      // Сохранение токена (например, в AsyncStorage)
      // await AsyncStorage.setItem('token', token);

      Alert.alert('Успех', 'Вы вошли в систему!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      Alert.alert('Ошибка', 'Неверный email или пароль.');
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Регистрация" onPress={() => navigation.navigate('Register')} />
    </View>
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
});

export default LoginScreen;
