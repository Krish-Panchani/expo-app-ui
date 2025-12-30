import { ActivityIndicator, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { colors, size } from "@/constants/theme";
import CustomText from "@/components/ui/CustomText";

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
  borderColor = colors.white,
  borderWidth = 1,
  borderRadius = 50,
  backgroundColor = colors.primary,
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
          color={colors.white}
          // style={{ borderColor: colors.white }}
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
        <CustomText color={colors.white} fontSize={size.lg}>
          {username ? username.charAt(0).toUpperCase() : "Z"}
        </CustomText>
      )}
    </View>
  );
};

export default ProfilePic;
