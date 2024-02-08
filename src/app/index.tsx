import { CategoryButton } from '@/components/Category-Button';
import { Header } from '@/components/Header';
import { View, Text, FlatList } from 'react-native';
import { CATEGORIES } from '../utils/data/products';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  function handleSelectedCategory(category: string) {
    setSelectedCategory(category);
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Cardápio" cartQuantityItems={5} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === selectedCategory}
            onPress={() => handleSelectedCategory(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
