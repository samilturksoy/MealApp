import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import React from 'react';
import { useFavorites } from '../stores/FavouritesContext';

const LikesScreen = ({navigation}:any) => {
    const { favourites, removeFavourite } = useFavorites();

    if (favourites.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Hiç favori tarif yok</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favourites}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { mealId: item.idMeal })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                            <Image
                            source={{ uri: item.strMealThumb }}
                            style={{ width: 42, height: 42, marginRight: 16 }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16 }}>{item.strMeal}</Text>
                        </View>
                        <Button
                            title="Sil"
                            onPress={() => removeFavourite(item.idMeal)}
                            color="red"
                        />
                        </View>
                    </TouchableOpacity>
            )}
        />
    );
};

export default LikesScreen;
