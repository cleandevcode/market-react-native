import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Product } from "../util/api";
import { timeAgo } from "../util/common";
import CategoryIcon from "./CategoryIcon";
import { colors } from "../util/constant";

type CardProp = {
  product: Product;
  onPress: (id: string) => void;
};

const Card: React.FC<CardProp> = ({ product, onPress }) => {
  const {
    id,
    name,
    postedAt,
    price,
    category,
    distanceInKm,
    dealType,
    imageUrl,
  } = product;

  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={styles.imageBG}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.content}>
            <View style={styles.topRow}>
              <CategoryIcon category={category} />
              <View style={styles.infoContent}>
                <View style={styles.row}>
                  <Text style={styles.badgeText}>{distanceInKm} mi</Text>
                  <Text style={{ ...styles.badgeText, marginLeft: 10 }}>
                    AU${price}
                  </Text>
                </View>
                {dealType !== `REGULAR` && (
                  <Text style={styles.typeText}>{dealType}</Text>
                )}
              </View>
            </View>
            <View style={styles.downRow}>
              <Text
                style={styles.nameText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {name}
              </Text>
              <Text style={styles.timeText}>{timeAgo(postedAt)}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 180,
    marginBottom: 15,
  },
  content: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    height: `100%`,
  },
  imageBG: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
    padding: 12,
  },
  topRow: {
    flexDirection: `row`,
    alignItems: `flex-start`,
    justifyContent: `space-between`,
  },
  downRow: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  row: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  infoContent: {
    alignItems: `flex-end`,
  },
  nameText: {
    fontSize: 18,
    fontWeight: `bold`,
    color: colors.white,
    maxWidth: 200,
  },
  timeText: {
    color: colors.white,
    fontWeight: `bold`,
    fontSize: 13,
  },
  badgeText: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 30,
    minWidth: 30,
    fontSize: 12,
    fontWeight: `bold`,
  },
  typeText: {
    backgroundColor: colors.secondary,
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontWeight: `bold`,
    fontSize: 12,
    color: colors.white,
    marginTop: 8,
  },
});
