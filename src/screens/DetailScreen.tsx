import { View, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchMealDetail } from '../api/api';
import { useFavorites } from '../stores/FavouritesContext';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

const DetailScreen = ({route}:any) => {
    const {mealId} = route.params;
    const [meal, setMeal] = useState <Meal | null>(null);
    const [loading, setLoading] = useState(true);
    const { favourites, addfavourite, removeFavourite } = useFavorites();
    const isFavourite = favourites.some((item) => item.idMeal === meal?.idMeal);
    useEffect(() => {
        const getMeal = async () => {
            const data = await fetchMealDetail(mealId);
            //console.log(data);
            setMeal(data);
            setLoading(false);
        };
        getMeal();
    }
    , [mealId]);
    if (loading || !meal) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="dodgerblue" />
            </View>
        );
    }
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Image
            source={{ uri: meal.strMealThumb }}
            style={{ width: '100%', height: 200 }}
        />
        <Button title={isFavourite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
        onPress={()=> isFavourite ? removeFavourite(meal.idMeal) : addfavourite(meal)} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
            {meal.strMeal}
        </Text>
         <Text style={{ fontWeight: '600', marginBottom: 10 }}>
            Kategori :{meal.strCategory}
        </Text>
        <Text style={{ fontWeight: '600', marginBottom: 10 }}>
            Bölge :{meal.strArea}
        </Text>
         <Text style={{ fontSize:18, fontWeight: 'bold', marginBottom: 8 }}>
            Malzemeler :{meal.strArea}
        </Text>
        {Array.from({ length: 20 }, (_, index) => {
            const ingredient = meal[`strIngredient${index + 1}`];
            const measure = meal[`strMeasure${index + 1}`];
            if (ingredient) {
                return (
                    <Text key={index}>
                        - {ingredient} {measure ? `(${measure})` : ''}
                    </Text>
                );
            }
            return null;
        }
        )}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
            Yapılışı :
        </Text>
        <Text style={{ marginBottom: 10 }}>
            {meal.strInstructions}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
            Video :
        </Text>
        <Text style={{ marginBottom: 10 }}>
            {meal.strYoutube}
        </Text>
    </ScrollView>
  );
};

export default DetailScreen;
