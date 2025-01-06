import {View, Text} from 'react-native';
import React from 'react';
import {Container, Section, Space, TextComponent} from '../components';
import {colors} from '../constants/colors';

const TernsandConditionsScreen = () => {
  return (
    <Container back title="Terms & Conditions" titlePosition="center">
      <Section>
        <Space height={20} />
        <TextComponent
          text="Last update: 05/02/2024"
          size={14}
          color={colors.gray.g500_80}
        />
        <Space height={10} />
        <TextComponent text="Please read these terms of service, carefully before using our app operated by us" />
        <Space height={20} />
        <TextComponent text="Conditions of Uses" color={colors.primary.p500} />
        <Space height={10} />
        <TextComponent text="It is a long estabished fact that a reader will be distracted by readable content of a page when looking at its layout. The point of using Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, provident iusto corrupti dignissimos deleniti maiores quaerat eius reiciendis obcaecati magnam nam sequi cupiditate reprehenderit facilis quas totam neque delectus adipisci. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, provident iusto corrupti dignissimos deleniti maiores quaerat eius reiciendis obcaecati magnam nam sequi cupiditate reprehenderit facilis quas totam neque delectus adipisci. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, provident iusto corrupti dignissimos deleniti maiores quaerat eius reiciendis obcaecati magnam nam sequi cupiditate reprehenderit facilis quas totam neque delectus adipisci." />
      </Section>
    </Container>
  );
};

export default TernsandConditionsScreen;
