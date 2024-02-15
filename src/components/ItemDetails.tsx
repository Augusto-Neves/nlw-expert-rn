import { ProductCartProps, useCartStore } from '@/store/cart-store';
import { Feather } from '@expo/vector-icons';
import { RefObject } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';
import colors from 'tailwindcss/colors';

type ItemDetailsProp = {
  item?: ProductCartProps;
  modalRef: RefObject<IHandles>;
};

export function ItemDetails({ item, modalRef }: ItemDetailsProp) {
  const { products, addProduct, removeProduct } = useCartStore();

  const itemQuantity = products.find(
    (product) => product.id === item?.id
  )?.quantity;

  return (
    <>
      {item && (
        <Portal>
          <Modalize
            ref={modalRef}
            adjustToContentHeight
            modalTopOffset={400}
            snapPoint={400}
            modalStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.slate[800],
            }}
          >
            <Image
              source={item?.cover}
              className="w-full h-36 flex-1"
              resizeMode="cover"
            />
            <View className="flex-1 mx-5">
              <Text className="text-white font-subtitle text-lg mt-4">
                {item?.description}
              </Text>

              <View className="flex-row justify-between items-center mt-28">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-lime-400 w-16 h-12 rounded-l-md justify-center items-center"
                  onPress={() => removeProduct(item.id)}
                >
                  <Feather name="minus-circle" size={20} color={colors.white} />
                </TouchableOpacity>

                <View className="flex-1 items-center bg-slate-900 h-full border-t-[0.5px] border-b-[0.5px] border-white">
                  <Text className=" text-white font-subtitle text-lg flex-1 text-center mt-2">
                    {itemQuantity}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-lime-400 w-16 h-12 rounded-r-md justify-center items-center"
                  onPress={() => addProduct(item)}
                >
                  <Feather name="plus-circle" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </Portal>
      )}
    </>
  );
}
