import { formatCurrency } from '@/utils/functions/formmatCurrenry';
import { forwardRef } from 'react';
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

type ProductDataProps = {
  title: string;
  description: string;
  price: number;
  thumbnail: ImageProps;
  quantity?: number;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="w-full flex-row items-center pb-4"
        {...rest}
      >
        <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />

        <View className="flex-1 ml-3">
          <View className="flex-row  items-center mr-1">
            <Text className="text-slate-100 font-subtitle text-base flex-1 self-start">
              {data.title}
            </Text>

            <View>
              <Text className="text-lime-400 text-xs leading-5">
                {formatCurrency(data.price)}
              </Text>

              {data.quantity && (
                <Text className="text-slate-400 font-subtitle text-xs leading-5 text-right">
                  qtd: {data.quantity}
                </Text>
              )}
            </View>
          </View>
          <Text className="text-slate-400 text-xs leading-5 mt-0.5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);
