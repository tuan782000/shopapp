import {
    View,
    Text,
    StyleProp,
    ViewProps,
    Image,
    TouchableOpacity,
    ViewStyle,
    Dimensions
} from 'react-native';
import React, { ReactNode } from 'react';
import TextComponent from './TextComponent';
import { fonts } from '../constants/fonts';

type Props = {
    source: string;
    icon?: ReactNode;
    title: string;
    description: string;
    price: string;
    productStyles?: StyleProp<ViewStyle>;
};

const Card = (props: Props) => {
    const { source, icon, title, description, price, productStyles } = props;
    return (
        <View style={[productStyles]}>
            <Image
                source={{ uri: `${source}` }}
                style={{
                    width: Dimensions.get('window').width / 2 - 15,
                    height: 200,
                    borderRadius: 10
                }}
            />
            <TouchableOpacity
                style={{ position: 'absolute', top: 2, right: 5 }}
                onPress={() => console.log('Heart')}
            >
                {icon}
            </TouchableOpacity>
            <View style={{ padding: 10 }}>
                <TextComponent
                    text={title}
                    size={20}
                    font={fonts.Bold}
                    numberOfLines={1}
                />
                <TextComponent text={description} size={16} numberOfLines={1} />
                <TextComponent text={price} numberOfLines={1} />
            </View>
        </View>
    );
};

export default Card;
