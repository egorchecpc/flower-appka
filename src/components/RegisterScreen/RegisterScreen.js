import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают.');
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
      <Input
        placeholder="Подтвердите пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        containerStyle={styles.input}
      />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
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

export default RegisterScreen;
