import React, { useEffect } from 'react';
import { fetchCategories } from './src/api/api';
import { FavouritesProvider } from './src/stores/FavouritesContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator';

const App = () => {
  useEffect(() => {

    const getCategories = async ()=>{
      const categories = await fetchCategories();
      console.log(JSON.stringify(categories, null, 2) );
    };
    getCategories();
  }, []);

  return (
    <FavouritesProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FavouritesProvider>
  );
};

export default App;
