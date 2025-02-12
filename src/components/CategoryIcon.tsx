import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../util/constant";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CategoryType } from "../util/types";

type CategoryProps = {
  category: CategoryType;
  showText?: boolean;
  size?: number;
  color?: string;
  selected?: boolean;
  onPress?: (category: CategoryType) => void;
};

type CustomIconProps = {
  categoryName: string;
  size?: number;
  color?: string;
};

const CategoryIcon: React.FC<CategoryProps> = ({
  category,
  showText,
  color = colors.primary,
  selected = false,
  onPress,
}) => {
  return (
    <View>
      {showText ? (
        <TouchableOpacity
          style={styles.roundContent}
          onPress={() => onPress?.(category)}
        >
          <View style={styles.roundContainer}>
            <CustomIcon
              categoryName={category}
              size={28}
              color={selected ? colors.primary : colors.grey}
            />
          </View>
          <Text
            style={{
              color: selected ? colors.primary : colors.grey,
              marginTop: 5,
            }}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.boxContainer}>
          <CustomIcon categoryName={category} size={20} color={color} />
        </View>
      )}
    </View>
  );
};

export default CategoryIcon;

const CustomIcon: React.FC<CustomIconProps> = ({
  categoryName,
  size = 32,
  color,
}) => {
  if (categoryName === `All`)
    return <FontAwesome name="home" size={size} color={color} />;

  if (categoryName === `Clothing`)
    return <Ionicons name="shirt" size={size} color={color} />;

  if (categoryName === `Garden`)
    return <MaterialIcons name="park" size={size} color={color} />;

  if (categoryName === `Household`)
    return (
      <MaterialCommunityIcons name="home-city" size={size} color={color} />
    );

  return <></>;
};

const styles = StyleSheet.create({
  roundContent: {
    alignItems: `center`,
    marginRight: 10,
  },
  roundContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: `center`,
    justifyContent: `center`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxContainer: {
    width: 30,
    height: 30,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: colors.white,
  },
});
