import { View, Text, TextInput, ActivityIndicator, FlatList, FlatListComponent, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Meal } from './CategoryMealsScreen';
import { fetchMealBySearch } from '../api/api';

const SearchScreen = ({navigation}) => {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const searchMeals = async () => {
        if(!query) return;
        setLoading(true);
        const results = await fetchMealBySearch(query);
        setMeals(results);
        setLoading(false);
        setSearched(true);
    };
  return (
    <View style={{padding:16}}>
      <TextInput
        placeholder='Yemek Ara' 
        value={query} 
        onChangeText={(text)=>setQuery(text)}
        editable={!loading}
        onSubmitEditing={searchMeals}
        style={{borderWidth:1,borderColor:'#ccc',borderRadius:8,padding:10,marginBottom:16}}
        />
        {loading && <ActivityIndicator size="large" color="dodgerblue" />}
        {!loading && searched && meals.length === 0 && (
            <Text style={{textAlign:'center',marginTop:16}}>Hiçbir sonuç bulunamadı</Text>
        )}
        <FlatList 
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> navigation.navigate('Detail', { mealId: item.idMeal })}>
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10}}>
                    <Image
                        source={{ uri: item.strMealThumb }}
                        style={{ width: 42, height: 42, marginRight: 16 }}
                    />
                    <Text>{item.strMeal}</Text>
                </View>
            </TouchableOpacity>
        )}
        />
    </View>
  );
};

export default SearchScreen;
