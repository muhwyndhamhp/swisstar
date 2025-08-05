/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  ...themes: {
    props?: { light?: string; dark?: string };
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark;
  }[]
) {
  return themes.map(v => {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = v.props?.[theme];

    if (colorFromProps) {
      return colorFromProps;
    } else {
      return Colors[theme][v.colorName];
    }
  });
}
