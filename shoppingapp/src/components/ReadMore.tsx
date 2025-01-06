import { View, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import Row from './Row';
import TextComponent from './TextComponent';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import Space from './Space';

const ReadMore = ({ children, numberOfLines }: any) => {
    const [isReadMore, setIsReadMore] = useState(true); // kiểm tra số dòng
    const [showReadMore, setShowReadMore] = useState(false); // đóng mở
    const textRef = useRef(null); // liên quan số dòng

    const handleTextLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        const lineHeight = 18; // Chiều cao của một dòng văn bản
        const lines = height / lineHeight; // 54 / 18 = 3 - dưới 54 sẽ là ít hơn
        setShowReadMore(lines > numberOfLines); // xem sét lines có lớn hơn cái numberOfLines quy định hay không
    };
    return (
        <View>
            {/* <TextComponent text={children}/> */}
            <Text
                ref={textRef}
                style={[globalStyles.text, { color: colors.dark.d500 }]}
                numberOfLines={isReadMore ? numberOfLines : undefined}
                onLayout={handleTextLayout}
            >
                {children}
            </Text>
            <Space height={5} />
            {showReadMore && (
                <Row onPress={() => setIsReadMore(!isReadMore)}>
                    <TextComponent
                        text={isReadMore ? 'Read More' : 'Read Less'}
                        size={12}
                        color={colors.primary.p200}
                    />
                    {isReadMore ? (
                        <ArrowDown2 color={colors.primary.p200} size={12} />
                    ) : (
                        <ArrowUp2 color={colors.primary.p200} size={12} />
                    )}
                </Row>
            )}
        </View>
    );
};

export default ReadMore;
