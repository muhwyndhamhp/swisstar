import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { ThemedView } from './ThemedView';

export type FlexAreaProps = SafeAreaViewProps & {
  children: ReactNode;
};

export default function FlexArea({ children, style, ...restProps }: FlexAreaProps) {
  const isIos = Platform.OS === 'ios';
  return (
    <>
      <Stack.Screen options={{ headerShown: isIos }} />
      <SafeAreaView style={[style, styles.container]} {...restProps}>
        <ThemedView
          style={{
            gap: 30,
            margin: 'auto',
            width: '100%',
          }}
        >
          {children}
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
