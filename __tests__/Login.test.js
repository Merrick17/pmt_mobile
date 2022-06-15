import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../src/views/LoginScreen';

test('Should Render Login Screen and Main Screen', async () => {
  const {getByText, getByTestId, getAllByTestId, queryByText} = render(
    <LoginScreen />,
  );
  const matriculeInput = getByTestId('matricule');
  const passwordInput = getByTestId('password');
  const button = getByTestId('login-btn');
  fireEvent.changeText(matriculeInput, '73');
  fireEvent.changeText(passwordInput, '01161590');
  fireEvent.press(button);
  //   fireEvent.changeText(input, 'item1');
  //   fireEvent.press(button);
  //   const item0 = getByText('item0');
  //   const item1 = getByText('item1');

  //   expect(item0).toBeDefined();
  //   expect(item1).toBeDefined();
  //   fireEvent.press(getAllByTestId('cell-delete')[0]);
  //   expect(queryByText('item0')).toBeNull();
  //   const list = getByTestId('list');
  //   expect(list).toContainElement(item1);
});
