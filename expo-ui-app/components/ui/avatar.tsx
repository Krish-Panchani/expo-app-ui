import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
type AvatarStatus = "online" | "offline" | "busy" | "away";

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  rounded?: boolean;
  backgroundColor?: string;
  textColor?: string;
  status?: AvatarStatus;
  showStatus?: boolean;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
}

const SIZE_MAP: Record<Exclude<AvatarSize, number>, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: "#0a0a0a",
  offline: "#a3a3a3",
  busy: "#525252",
  away: "#737373",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = "md",
  rounded = true,
  backgroundColor = "#E5E7EB",
  textColor = "#374151",
  status,
  showStatus = false,
  style,
  imageStyle,
  accessibilityLabel,
}) => {
  const [errored, setErrored] = useState(false);
  const dim = typeof size === "number" ? size : SIZE_MAP[size];
  const radius = rounded ? dim / 2 : dim * 0.15;
  const fontSize = Math.max(10, dim * 0.4);

  const showImage = source && !errored;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? (name ? `Avatar for ${name}` : "Avatar")}
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: radius,
          backgroundColor,
        },
        styles.container,
        style,
      ]}
    >
      {showImage ? (
        <Image
          source={source!}
          onError={() => setErrored(true)}
          style={[
            { width: dim, height: dim, borderRadius: radius },
            imageStyle,
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text
          allowFontScaling={false}
          style={{ color: textColor, fontSize, fontWeight: "600" }}
        >
          {getInitials(name)}
        </Text>
      )}

      {showStatus && status && (
        <View
          style={[
            styles.statusDot,
            {
              width: Math.max(8, dim * 0.22),
              height: Math.max(8, dim * 0.22),
              borderRadius: Math.max(8, dim * 0.22) / 2,
              backgroundColor: STATUS_COLORS[status],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

export default Avatar;
