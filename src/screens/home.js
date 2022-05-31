import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import PlanetHeader from '../components/planet-header';
import { colors } from '../theme/colors';
import { PLANET_LIST } from '../data/data';
import Text from '../components/text/Text';
import { spacing } from '../theme/spacing';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SectionList } from 'react-native-web';

const PlanetItem = ({ item }) => {
  const navigation = useNavigation();
  console.log(item);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Details', { planet: item });
      }}
      style={styles.item}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.circle, { backgroundColor: item.color }]} />
        <Text preset="h4" style={styles.itemName}>
          {item.name}
        </Text>
      </View>
      <AntDesign name="right" size={18} color="white" />
    </Pressable>
  );
};

export default function Home({ navigation }) {
  const [list, setList] = useState(PLANET_LIST);
  // --------render item---------
  const renderItem = ({ item }) => {
    return <PlanetItem item={item} />;
  };
  // ---------textChangeHandler------
  const textChangeHandler = (text) => {
    const textInput = text.toLowerCase();
    const filteredList = PLANET_LIST.filter((item) => {
      const name = item.name.toLocaleLowerCase();
      return name.indexOf(textInput) > -1;
    });
    setList(filteredList);
  };
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <PlanetHeader />
      {/* ----------Search Input---------- */}
      <TextInput
        placeholder="Type The Planet Name"
        placeholderTextColor={colors.white}
        style={styles.searchInput}
        onChangeText={(text) => textChangeHandler(text)}
      />
      {/* ----------planet list----------- */}
      <FlatList
        contentContainerStyle={styles.list}
        data={list}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: colors.black,
  },
  list: {
    margin: spacing[5],
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing[4],
    justifyContent: 'space-between',
  },
  itemName: {
    paddingLeft: spacing[4],
    textTransform: 'uppercase',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
  },
  searchInput: {
    margin: spacing[5],
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    color: colors.white,
    padding: spacing[4],
  },
});
