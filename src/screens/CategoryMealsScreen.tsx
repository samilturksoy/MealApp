import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { fetchMealsByCategories } from '../api/api';

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const CategoryMealsScreen = ({ route, navigation }:any) => {
  const { category } = route.params;
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
        const data = await fetchMealsByCategories(category);
        setMeals(data);
        setLoading(false);
        };

    getMeals();
  }, [category]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Image
              source={{ uri: item.strMealThumb }}
              style={{ width: 42, height: 42, marginRight: 10 }}
            />
            <Text>{item.strMeal}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryMealsScreen;
