import React from "react";
import { ActivityIndicator, View, ViewStyle, Text } from "react-native";
import { Image } from "expo-image";

// Default colors - using black and white as defaults
const defaultColors = {
  white: "#FFFFFF",
  black: "#000000",
  primary: "#000000", // Default to black
};

interface ProfilePicProps {
  source?: string;
  username: string;
  style?: ViewStyle | ViewStyle[];
  width?: number;
  height?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  isLoading?: boolean;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ProfilePic = ({
  source,
  username,
  width = 50,
  height = 50,
  borderColor = defaultColors.white,
  borderWidth = 1,
  borderRadius = 50,
  backgroundColor = defaultColors.primary,
  isLoading = false,
  style,
}: ProfilePicProps) => {
  const combinedStyle: ViewStyle = {
    width,
    height,
    borderColor,
    borderWidth,
    borderRadius,
    backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  if (isLoading) {
    return (
      <View style={[combinedStyle, style]}>
        <ActivityIndicator
          color={defaultColors.white}
        />
      </View>
    );
  }

  return (
    <View style={[combinedStyle, style]}>
      {source ? (
        <Image
          source={`${process.env.EXPO_PUBLIC_API_URL}/avatar/${source}`}
          style={{ width: "100%", height: "100%", borderRadius }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      ) : (
        <Text
          style={{
            color: defaultColors.white,
            fontSize: 20,
          }}
          allowFontScaling={false}
        >
          {username ? username.charAt(0).toUpperCase() : "Z"}
        </Text>
      )}
    </View>
  );
};

export default ProfilePic;
