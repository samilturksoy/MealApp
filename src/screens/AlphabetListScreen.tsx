import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Meal } from './CategoryMealsScreen';
import { fetchAllMealsByLetter } from '../api/api';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetListScreen = ({ navigation }:any) => {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const getMealsByLetter = async (letter: string) => {
    setSelectedLetter(letter);
    setLoading(true);
    const results = await fetchAllMealsByLetter(letter.toLowerCase()); // `.toLowerCase()` doğru olan
    setMeals(results);
    setLoading(false);
  };

  useEffect(() => {
    getMealsByLetter(selectedLetter);
  }, []);

  return (
    <View style={{ padding: 16,gap:8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {letters.map(letter => (
          <TouchableOpacity
            key={letter}
            style={{
              backgroundColor: letter === selectedLetter ? 'tomato' : 'dodgerblue',
              padding: 8,
              borderRadius: 4,
            }}
            onPress={() => getMealsByLetter(letter)}
          >
            <Text style={{ color: '#fff' }}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
        {loading && <ActivityIndicator size="large" color="dodgerblue" />}
        {!loading && meals.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {selectedLetter} harfi ile eşleşen yemek bulunamadı.
          </Text>
        )}

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 8,
              marginVertical: 4,
            }}
          >
            <Image source={{ uri: item.strMealThumb }} style={{ width: 50, height: 50, borderRadius: 8, marginRight:10 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AlphabetListScreen;
