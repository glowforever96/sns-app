import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function TestScreen() {
  const insets = useSafeAreaInsets();
  console.log(insets);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[styles.ctaContainer, { paddingBottom: insets.bottom || 12 }]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: pressed ? "skyblue" : "pink" },
          ]}
          onPress={() => alert("CTA 버튼 눌림!!!!")}
        >
          <Text style={styles.ctaText}>구매하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ctaContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 14,
  },
  ctaButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  ctaText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
