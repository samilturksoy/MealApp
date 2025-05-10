import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation<any>();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Detail"
        onPress={() => {
           navigation.navigate('Detail', { mealId: '1' });
        }}
      />
    </View>
  );
};

export default HomeScreen;
