import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Text from './text/Text';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PlanetHeader({ back }) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Pressable onPress={goBack} style={styles.container}>
      {back && <AntDesign name="left" size={24} color="white" />}
      <Text preset="h2" style={{ marginLeft: 10 }}>
        THE PLANETS
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[5],
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
