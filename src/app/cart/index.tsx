import { Button } from '@/components/Button';
import { GoBackButton } from '@/components/GoBackButton';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { ItemDetails } from '@/components/ItemDetails';
import { Product } from '@/components/Product';
import { ProductCartProps, useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/utils/functions/formmatCurrenry';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, Alert, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modalize } from 'react-native-modalize';
import { Toast } from 'toastify-react-native';

const PHONE_NUMBER = 'your-phone-goes-here';

export default function Cart() {
  const [selectedProduct, setSelectedProduct] = useState<ProductCartProps>();
  const [address, setAddress] = useState<string>('');
  const { products, clearCart } = useCartStore();
  const navigation = useNavigation();
  const modalRef = useRef<Modalize>(null);
  const totalPrice = formatCurrency(
    products.reduce(
      (total, product) =>
        product.quantity > 1
          ? total + product.price * product.quantity
          : total + product.price,
      0
    )
  );

  function handleProductPress(product: ProductCartProps) {
    setSelectedProduct(product);
    modalRef.current?.open();
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Toast.warn('Informe os dados da entrega', 'bottom');
    }

    const orderProducts = products
      .map((product) => `\n${product.quantity} ${product.title}`)
      .join('');

    const message = `Obrigado por comprar nossos produtos. 😋 
  \nEntregar em: ${address} 
      
Pedido:
${orderProducts} 

  \nValor total: ${totalPrice}`;

    console.log(message);

    clearCart();
    navigation.goBack();
    Toast.success('Pedido feito com sucesso!', 'bottom');

    setTimeout(() => {
      Linking.openURL(
        `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
      );
    }, 2000);
  }

  useEffect(() => {
    const productQuantity = products.find(
      (product) => product.id === selectedProduct?.id
    )?.quantity;

    if (!productQuantity) {
      modalRef.current?.close();
    }

    if (products.length === 0) {
      Alert.alert(
        'Seu carrinho está vazio!',
        'Volte para o inicio e adicione items ao seu carrinho.',
        [{ text: 'Voltar', onPress: () => navigation.goBack() }]
      );
    }
  }, [products]);

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className=" pt-5 flex-1 mx-5">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductPress(product)}
                  />
                ))}
              </>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="mx-5 mb-5 border-t border-slate-700">
        <View className="flex-row items-center gap-2 my-5">
          <Text className="text-white font-subtitle text-xl">Total: </Text>
          <Text className="text-lime-400 text-2xl font-heading">
            {totalPrice}
          </Text>
        </View>

        <Input
          placeholder="Informe o endereço de entrega com rua, número, bairro, CEP e complemento..."
          blurOnSubmit
          onSubmitEditing={handleOrder}
          onChangeText={setAddress}
          returnKeyType="next"
        />

        <Button className="my-5" onPress={handleOrder}>
          <Button.Text>Finalizar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <GoBackButton title="Voltar ao cardápio" href="/" />
      </View>

      <ItemDetails modalRef={modalRef} item={selectedProduct} />
    </View>
  );
}
