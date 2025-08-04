import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const toNothing = () => { };
  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.headingItem}>⼑SwisStar</ThemedText>
        <ThemedButton
          sizeVertical="thick"
          type="outline"
          label={"QR Scanner"}
          style={styles.flexItem}
          onPressed={toNothing}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
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
    lineHeight: 50,
    width: "100%",
    fontSize: 36,
    textAlign: 'center'
  },
});
