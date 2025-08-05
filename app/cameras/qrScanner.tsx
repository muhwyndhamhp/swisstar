import FlexArea from '@/components/FlexArea';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Linking, Modal, StyleSheet, View } from 'react-native';
import Svg, { Defs, Mask, Rect } from 'react-native-svg';

const HOLE_SIZE = 250;

export default function QrScanner() {
  const [scanResult, setScanResult] = useState<BarcodeScanningResult | null>();

  const [permission, requestPermission] = useCameraPermissions();
  const { width, height } = Dimensions.get('screen');
  const w = (width - HOLE_SIZE) / 2;
  const h = (height - HOLE_SIZE) / 2;

  // Waiting for permission
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <FlexArea>
        <ThemedView
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '80%',
            marginHorizontal: 'auto',
            gap: 30,
          }}
        >
          <ThemedText>Please Grant Camera Permission</ThemedText>
          <ThemedButton
            onPress={requestPermission}
            sizeVertical="thick"
            label={'Grant Permission'}
          />
        </ThemedView>
      </FlexArea>
    );
  }

  const qrCallback = (result: BarcodeScanningResult) => {
    if (!scanResult) setScanResult(result);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          onBarcodeScanned={qrCallback}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Defs>
            <Mask id="mask" x="0" y="0" width={width} height={height}>
              <Rect x="0" y="0" width={width} height={height} fill="white" />
              <Rect
                x={w}
                y={h}
                width={HOLE_SIZE}
                height={HOLE_SIZE}
                rx={20}
                ry={20}
                fill="black"
              />
            </Mask>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="#00000066"
            mask="url(#mask)"
          />
        </Svg>
      </View>
      <ResultModal
        scanResult={scanResult}
        clearScanResult={() => {
          setScanResult(undefined);
        }}
      />
    </>
  );
}

interface ResultModalProps {
  scanResult: BarcodeScanningResult | null | undefined;
  clearScanResult: () => void;
}

function ResultModal({ scanResult, clearScanResult }: ResultModalProps) {
  const [tint, background, text] = useThemeColor(
    { colorName: 'tint' },
    { colorName: 'background' },
    { colorName: 'text' }
  );

  // Check if the scanned data is a URL
  const isUrl = (data: string) => {
    return /^https?:\/\/.+/i.test(data);
  };

  const scannedData = scanResult?.data ?? '';
  const isScannedDataUrl = isUrl(scannedData);

  // Function to open URL in browser
  const openUrl = async () => {
    if (isScannedDataUrl) {
      const supported = await Linking.canOpenURL(scannedData);
      if (supported) {
        await Linking.openURL(scannedData);
      }
      clearScanResult(); // Close the modal after opening the URL
    }
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    clearScanResult();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!scanResult}
      onRequestClose={clearScanResult}
    >
      <ThemedView
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 'auto',
          padding: 20,
          borderRadius: 20,
        }}
      >
        <ThemedText>QR Code Says:</ThemedText>
        <ThemedView
          style={{
            backgroundColor: background,
            padding: 15,
            borderLeftWidth: 4,
            borderLeftColor: tint,
          }}
        >
          <ThemedText
            selectable={true}
            onPress={isScannedDataUrl ? openUrl : undefined}
            style={{
              fontFamily: 'monospace',
              color: isScannedDataUrl ? '#4fc3f7' : text,
              fontSize: 14,
              lineHeight: 20,
              textDecorationLine: isScannedDataUrl ? 'underline' : 'none',
            }}
          >
            {scannedData}
          </ThemedText>
        </ThemedView>
        <ThemedButton label={'Copy'} onPress={() => copyToClipboard(scannedData)} />
        {isScannedDataUrl && (
          <ThemedButton type="outline" onPress={openUrl} label={'Open URL'} />
        )}
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
