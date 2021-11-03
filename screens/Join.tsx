import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import { BLACK_COLOR } from '../colors';

interface AuthError {
  code: string;
  message: string;
}

const Join = () => {
  const passwordInput = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitEmailEditing = () => {
    passwordInput.current?.focus();
  };

  const onSubmitPasswordEditing = async () => {
    if (loading) return;
    if (email === '' || password === '') {
      return Alert.alert('Fill in the Form');
    }

    setLoading(true);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      const isAuthError = (error: any): error is AuthError => {
        return typeof error.code === 'string';
      };

      if (isAuthError(error)) {
        switch (error.code) {
          case 'auth/weak-password': {
            Alert.alert('Write a stronger password!');
          }
        }
      } else {
        throw error;
      }
    }
  };

  return (
    <Container>
      <StyledTextInput
        placeholder='Email'
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='email-address'
        value={email}
        returnKeyType='next'
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
      />
      <StyledTextInput
        ref={passwordInput}
        placeholder='Password'
        secureTextEntry
        value={password}
        returnKeyType='done'
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color='white' />
        ) : (
          <BtnText>Create Account</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Join;

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
