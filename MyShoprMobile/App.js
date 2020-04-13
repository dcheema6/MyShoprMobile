import React from 'react';
import { StyleSheet} from 'react-native';
import Home from './src/Home';
import { store } from './src/store';
import { Provider } from 'react-redux';


export default function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
};

const styles = StyleSheet.create({
});
