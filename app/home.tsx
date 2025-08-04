import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const toNothing = () => { };
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={{ gap: 30, margin: "auto", width: '100%' }}>
        <ThemedText style={styles.headingItem}>
          <FontAwesome6
            style={styles.headingItem}
            size={100}
            color={Colors.dark.tint}
            iconStyle="solid"
            name="box-open"
          />{" "}
          SwisStar
        </ThemedText>
        <ThemedButton
          sizeVertical="thick"
          type="outline"
          label={"QR Scanner"}
          iconType="qrcode"
          style={styles.flexItem}
          onPressed={toNothing}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
  flexItem: {
    width: "100%",
  },
  headingItem: {
    lineHeight: 30,
    width: "100%",
    fontSize: 36,
    textAlign: "center",
  },
});
