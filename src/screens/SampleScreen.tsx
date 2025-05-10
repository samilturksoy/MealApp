import { View, Text, SafeAreaView, Button } from 'react-native';
import React from 'react';
import { Meal, useFavorites } from '../stores/FavouritesContext';

const SampleScreen = () => {
   const {favourites, addfavourites, removeFavourite} =  useFavorites();

   const sampleMeal: Meal = {
    idMeal: '123',
    strMeal: 'chicken currey',
    strMealThumb : 'https://www.themealdb.com/images/media/meals/1520084413.jpg',
   };
  return (
    <SafeAreaView>
      <Text>Favori Yemekler {favourites.length}</Text>
      <Button title="Yemek Ekle" onPress={()=> addfavourites(sampleMeal)} />
    <Button title="Yemek Çıkar" onPress={()=> removeFavourite(sampleMeal.idMeal)} />
    </SafeAreaView>
  );
};

export default SampleScreen;
