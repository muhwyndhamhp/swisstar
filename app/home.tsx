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
        <ThemedText style={styles.flexItem}>Hello world</ThemedText>
        <ThemedButton
          sizeVertical="thick"
          label={"Button"}
          style={styles.flexItem}
          onPressed={toNothing}
        />
        <ThemedButton
          sizeVertical="thick"
          type="ghost"
          label={"Button"}
          style={styles.flexItem}
          onPressed={toNothing}
        />
        <ThemedButton
          sizeVertical="thick"
          type="outline"
          label={"Button"}
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
});
