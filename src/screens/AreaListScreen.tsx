import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Meal } from './CategoryMealsScreen';
import { fetchAreas, fetchMealsByArea } from '../api/api';

type Area = {
    strArea: string;
}
const AreaListScreen = ({navigation}: any) => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [selectedArea, setSelectedArea] = useState("American");
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const loadAreas = async () => {
        const data = await fetchAreas();
       setAreas(data);
    };
    const loadMealsByArea = async (area: string) => {
        setSelectedArea(area);
        setLoading(true);
        const data = await fetchMealsByArea(area);
        setMeals(data);
        setLoading(false);
    };
    useEffect(() => {
        loadAreas();
        loadMealsByArea(selectedArea);
    }
    , []);
  return (
    <View>
      <Text>Ülke Seçin</Text>
      <FlatList
      horizontal
      contentContainerStyle={{gap:16}}
      data={areas}
        keyExtractor={(item) => item.strArea}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => loadMealsByArea(item.strArea)}
           >
            <Text style={{fontSize:16,color: selectedArea === item.strArea ? "orange":"gray"}}>{item.strArea}</Text>
          </TouchableOpacity>
        )}
        />
        {loading && <ActivityIndicator size="large" color="dodgerblue" />}
                {!loading && meals.length === 0 && (
                  <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    {selectedArea} harfi ile eşleşen yemek bulunamadı.
                  </Text>
                )}
        <FlatList
        data={meals}
        contentContainerStyle={{gap:16,padding:8}}
        keyExtractor={(item) => item.idMeal}
        renderItem={({item}) => (
          <TouchableOpacity style={{flexDirection:'row',gap:8,alignItems:'center',padding:8}}
          onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}>
            <Image
            source={{ uri: item.strMealThumb }}
            style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        />
    </View>
  );
};

export default AreaListScreen;
