import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

export const Background = styled.Image`
  flex: 1;
  width: null;
  height: null;
`;

export const ButtonContainer = styled.View`
  height: ${props => props.height}px;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Button = styled.View`
  background-color: ${props => props.bgColor};
  opacity: ${props => (props.opacity ? props.opacity : 1)};
  height: 48px;
  width: 90%;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => (props.color ? props.color : '#424242')};
`;

export const style = StyleSheet.create({
  button: {
    height: 48,
    width: '90%',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  whitebg: {backgroundColor: '#fafafa'},
  bluebg: {backgroundColor: '#2E71DC'},
});
