import { Button } from '@/components/Button';
import { GoBackButton } from '@/components/GoBackButton';
import { useCartStore } from '@/store/cart-store';
import { PRODUCTS } from '@/utils/data/products';
import { formatCurrency } from '@/utils/functions/formmatCurrenry';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, Redirect } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { addProduct } = useCartStore();
  const navigation = useNavigation();
  const product = PRODUCTS.find((item) => item.id === id);

  function handleAddProductToCart() {
    if (product) {
      addProduct(product);
      navigation.goBack();
      Toast.success(`${product.title} no carrinho!`, 'bottom');
    }
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white font-heading text-4xl">
          {product.title}
        </Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>
        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            className="text-slate-400 font-body text-base leading-6"
            key={ingredient}
          >
            {'\u2022'} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddProductToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao carrinho</Button.Text>
        </Button>

        <GoBackButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
