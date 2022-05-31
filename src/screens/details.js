import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import React from 'react';
import Text from '../components/text/Text';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import PlanetHeader from '../components/planet-header';
import {
  EarthSvg,
  JupiterSvg,
  MarsSvg,
  MercurySvg,
  NeptuneSvg,
  SaturnSvg,
  Star,
  UranusSvg,
  VenusSvg,
} from '../svg/index';

// planetIfo
const PlanetInfo = ({ info, data }) => {
  return (
    <View style={styles.infoDetails}>
      <Text style={styles.info}>{info}</Text>
      <Text preset="h3" style={styles.data}>
        {data}
      </Text>
    </View>
  );
};

export default function Details({ navigation, route }) {
  const planet = route.params.planet;
  const renderImage = (name) => {
    switch (name) {
      case 'mercury':
        return <MercurySvg />;
      case 'venus':
        return <VenusSvg />;
      case 'earth':
        return <EarthSvg />;
      case 'mars':
        return <MarsSvg />;
      case 'jupiter':
        return <JupiterSvg />;
      case 'saturn':
        return <SaturnSvg />;
      case 'uranus':
        return <UranusSvg />;
      case 'neptune':
        return <NeptuneSvg />;
      default:
        return null;
    }
  };

  const openUrl = () => {
    Linking.openURL(planet.wikiLink);
  };

  return (
    <ScrollView style={styles.droidSafeArea}>
      <PlanetHeader back="true" />
      {/* details */}
      <View style={styles.imageView}>{renderImage(planet.name)}</View>
      <View style={styles.details}>
        <Text style={styles.name} preset="h1">
          {planet.name}
        </Text>
        <Text preset="h4" style={styles.description}>
          {planet.description}
        </Text>
        {/* wikiLink */}
        <Pressable style={styles.wikiLink} onPress={openUrl}>
          <Text style={styles.source}>Source: </Text>
          <Text style={styles.wiki}>Wikipedia</Text>
        </Pressable>
        {/* planetInfo */}
        <View>
          <PlanetInfo
            info="ROTATION TIME"
            data={planet.rotationTime + ' DAYS'}
          />
          <PlanetInfo info="REVOLUTION TIME" data={planet.revolutionTime} />
          <PlanetInfo info="RADIUS" data={planet.radius} />
          <PlanetInfo info="AVERAGE TEMP" data={planet.avgTemp} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: colors.black,
  },
  container: {
    padding: spacing[5],
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
  },
  imageView: {
    padding: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textTransform: 'uppercase',
    marginBottom: spacing[8],
    marginTop: spacing[8],
    fontSize: 45,
  },
  details: {
    textAlign: 'center',
    marginHorizontal: spacing[8],
  },
  description: {
    lineHeight: 25,
  },
  infoDetails: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.grey,
    padding: spacing[5],
    marginBottom: spacing[5],
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    color: colors.grey,
  },
  wikiLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing[8],
  },
  source: {
    color: colors.grey,
  },
  wiki: {
    textDecorationLine: 'underline',
  },
});
