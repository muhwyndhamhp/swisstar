import { useThemeColor } from '@/hooks/useThemeColor';
import type { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

export default function ThemedButton({
  label,
  lightColor,
  darkColor,
  iconType,
  type = 'default',
  sizeVertical = 'regular',
  ...restProps
}: ThemedButtonProps) {
  const colors = useThemeColor(
    {
      props: { light: lightColor, dark: darkColor },
      colorName: 'tint',
    },
    {
      props: { light: lightColor, dark: darkColor },
      colorName: 'darkerTint',
    },
    {
      colorName: 'text',
    }
  );

  const { button, buttonPressed } = getStyle(type, sizeVertical, colors);

  return (
    <Pressable {...restProps}>
      {({ pressed }) => {
        return (
          <Text style={[!pressed ? button : buttonPressed]}>
            {iconType && (
              <FontAwesome6
                name={iconType}
                size={16}
                color={!pressed ? colors[0] : colors[1]}
                iconStyle="solid"
              />
            )}
            {'  '}
            {label}
          </Text>
        );
      }}
    </Pressable>
  );
}

function getStyle(type: ButtonType, verticalSize: ButtonVerticalSize, colors: string[]) {
  const [tint, darkerTint, text] = colors;

  const baseButton = {
    backgroundColor: tint,
    color: text,
    paddingHorizontal: 10,
    textAlign: 'center' as 'center' | 'left',
    minWidth: 100,
    paddingVertical: ButtonVerticalSizeDp[verticalSize],
  };

  switch (type) {
    case 'default': {
      return StyleSheet.create({
        button: {
          ...baseButton,
        },
        buttonPressed: {
          ...baseButton,
          backgroundColor: darkerTint,
        },
      });
    }
    case 'ghost': {
      return StyleSheet.create({
        button: {
          ...baseButton,
          backgroundColor: 'transparent',
          color: tint,
        },
        buttonPressed: {
          ...baseButton,
          backgroundColor: 'transparent',
          color: darkerTint,
        },
      });
    }

    case 'outline': {
      return StyleSheet.create({
        button: {
          ...baseButton,
          backgroundColor: 'transparent',
          color: tint,
          borderWidth: 2,
          borderColor: tint,
        },
        buttonPressed: {
          ...baseButton,
          backgroundColor: 'transparent',
          color: darkerTint,
          borderWidth: 2,
          borderColor: darkerTint,
        },
      });
    }
  }
}

const ButtonTypes = ['default', 'outline', 'ghost'] as const;
type ButtonType = (typeof ButtonTypes)[number];

const ButtonVerticalSizes = ['regular', 'thick'] as const;
type ButtonVerticalSize = (typeof ButtonVerticalSizes)[number];

const ButtonVerticalSizeDp: Record<ButtonVerticalSize, number> = {
  regular: 10,
  thick: 14,
};

export type ThemedButtonProps = PressableProps & {
  label: string;
  lightColor?: string;
  darkColor?: string;
  type?: ButtonType;
  sizeVertical?: ButtonVerticalSize;
  iconType?: FontAwesome6SolidIconName;
};
