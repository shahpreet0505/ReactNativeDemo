import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../components/redux/reducers/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (username && password) {
      dispatch(loginUser({ username, password }));
    } else {
      alert('Please enter username and password.');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/TAS_Backgroung_Image.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.appTitle}>TAS Analytics</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent overlay
    borderRadius: 12,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  appTitle: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'sans-serif-medium',
    letterSpacing: 1.2,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white
    color: '#ffffff',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
  },
});

export default Login;
