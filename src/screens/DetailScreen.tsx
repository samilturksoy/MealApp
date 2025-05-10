import { View, Text } from 'react-native';
import React from 'react';

const DetailScreen = ({route}:any) => {
    const params = route.params;
  return (
    <View>
      <Text>DetailScreen {params.mealId}</Text>
    </View>
  );
};

export default DetailScreen;
