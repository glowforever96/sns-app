import { colors } from "@/constants";
import { Pressable, StyleSheet, Text } from "react-native";

interface TabProps {
  isActive: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export default function Tab({ children, isActive, onPress }: TabProps) {
  return (
    <Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    flex: 1,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 2,
  },
  activeContainer: {
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  activeText: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: 700,
  },
});
