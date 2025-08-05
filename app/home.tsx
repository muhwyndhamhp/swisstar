import FlexArea from '@/components/FlexArea';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Home() {
  const toNothing = () => {};
  return (
    <FlexArea
      style={{ paddingHorizontal: 20 }}
      children={
        <>
          <ThemedText style={styles.headingItem}>
            <FontAwesome6
              style={styles.headingItem}
              size={100}
              color={Colors.dark.tint}
              iconStyle="solid"
              name="box-open"
            />{' '}
            SwisStar
          </ThemedText>
          <Link href="/cameras/qrScanner" asChild>
            <ThemedButton
              sizeVertical="thick"
              type="outline"
              label={'QR Scanner'}
              iconType="qrcode"
              style={styles.flexItem}
              onPress={toNothing}
            />
          </Link>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    display: 'flex',
    gap: 20,
    flexDirection: 'column',
  },
  flexItem: {
    width: '100%',
  },
  headingItem: {
    lineHeight: 30,
    width: '100%',
    fontSize: 36,
    textAlign: 'center',
  },
});
