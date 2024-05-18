import React from 'react';
import { View, type ColorValue } from 'react-native';
import type { EditorBridge } from '../types';

export function IconSVG({
  editor,
  active,
  disabled,
  icon,
  circle = false,
  color = 'black',
}: {
  editor?: EditorBridge;
  active?: boolean;
  disabled?: boolean;
  icon?: any;
  circle?: boolean;
  color?: ColorValue;
}) {
  let iconColor = active
    ? editor?.theme.toolbar.iconActive
    : disabled
    ? editor?.theme.toolbar.iconDisabled
    : editor?.theme.toolbar.icon;

  let iconSize = editor?.theme.toolbar.iconSize
    ? editor.theme.toolbar.iconSize
    : 20;

  return circle ? (
    <View
      style={{
        width: iconSize,
        height: iconSize,
        backgroundColor: color,
        borderRadius: iconSize / 2,
      }}
    />
  ) : (
    icon(iconColor, iconSize)
  );
}
