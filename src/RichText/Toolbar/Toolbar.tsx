import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  type ColorValue,
  Pressable,
} from 'react-native';
import { useBridgeState } from '../useBridgeState';
import React from 'react';
import {
  DEFAULT_TOOLBAR_ITEMS,
  HEADING_ITEMS,
  type ToolbarItem,
} from './actions';
import { EditLinkBar } from './EditLinkBar';
import { useKeyboard } from '../../utils';
import type { EditorBridge } from '../../types';
import { IconSVG } from '../../assets/IconSVG';
import { EditorHelper } from '../EditorHelper';
import { SVGs } from '../../assets';

interface ToolbarProps {
  editor: EditorBridge;
  hidden?: boolean;
  items?: ToolbarItem[];
}

export const toolbarStyles = StyleSheet.create({});

export enum ToolbarContext {
  Main,
  Link,
  Heading,
  TextColor,
  Highlight,
}

export function Toolbar({
  editor,
  hidden = undefined,
  items = DEFAULT_TOOLBAR_ITEMS,
}: ToolbarProps) {
  const editorState = useBridgeState(editor);
  const { isKeyboardUp } = useKeyboard();
  const [toolbarContext, setToolbarContext] = React.useState<ToolbarContext>(
    ToolbarContext.Main
  );

  const hideToolbar =
    hidden === undefined ? !isKeyboardUp || !editorState.isFocused : hidden;

  const args = {
    editor,
    editorState,
    setToolbarContext,
    toolbarContext,
  };

  switch (toolbarContext) {
    case ToolbarContext.Main:
    case ToolbarContext.Heading:
      return (
        <FlatList
          data={toolbarContext === ToolbarContext.Main ? items : HEADING_ITEMS}
          style={[
            editor.theme.toolbar.toolbarBody,
            hideToolbar ? editor.theme.toolbar.hidden : undefined,
          ]}
          renderItem={({ item: { onPress, disabled, active, icon } }) => {
            return (
              <TouchableOpacity
                onPress={onPress(args)}
                disabled={disabled(args)}
                style={[editor.theme.toolbar.toolbarButton]}
              >
                <View
                  style={[
                    editor.theme.toolbar.iconWrapper,
                    active(args)
                      ? editor.theme.toolbar.iconWrapperActive
                      : undefined,
                    disabled(args)
                      ? editor.theme.toolbar.iconWrapperDisabled
                      : undefined,
                  ]}
                >
                  {icon(args)}
                </View>
              </TouchableOpacity>
            );
          }}
          horizontal
        />
      );
    case ToolbarContext.Highlight:
    case ToolbarContext.TextColor:
      let isTextColorSelection = toolbarContext === ToolbarContext.TextColor;
      const activeColor = editor?.getEditorState().activeColor;
      const activeHighlight = editor?.getEditorState().activeHighlight;

      const setColor = (color?: ColorValue) => {
        if (!EditorHelper.editorLastInstance) return;
        if (color) EditorHelper.editorLastInstance.setColor(color.toString());
        else EditorHelper.editorLastInstance.unsetColor();
        EditorHelper.editorLastInstance.focus();
      };

      const setHighlight = (color?: ColorValue) => {
        if (!EditorHelper.editorLastInstance) return;
        if (color)
          EditorHelper.editorLastInstance.setHighlight(color.toString());
        else EditorHelper.editorLastInstance.unsetHighlight();
        EditorHelper.editorLastInstance.focus();
      };

      return (
        <View
          style={[
            editor.theme.toolbar.toolbarBody,
            hideToolbar ? editor.theme.toolbar.hidden : undefined,
            editor.theme.toolbar.colorRow,
          ]}
        >
          <Pressable
            onPress={() => setToolbarContext(ToolbarContext.Main)}
            style={editor.theme.toolbar.closeColorButton}
          >
            <IconSVG
              editor={editor}
              active={false}
              disabled={false}
              icon={SVGs.close}
            />
          </Pressable>
          <View style={{ flex: 1 }}>
            <FlatList
              data={
                !isTextColorSelection
                  ? editor.theme.colorKeyboard.highlightSelection
                  : editor.theme.colorKeyboard.colorSelection
              }
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (isTextColorSelection) {
                        setColor(item.value);
                      } else {
                        setHighlight(item.value);
                      }
                    }}
                    disabled={
                      (isTextColorSelection ? activeColor : activeHighlight) ===
                      item.value
                    }
                    style={[editor.theme.toolbar.toolbarButton]}
                  >
                    <View
                      style={[
                        editor.theme.toolbar.iconWrapper,
                        editor.theme.toolbar.colorWrapper,
                        {
                          borderColor:
                            (isTextColorSelection
                              ? activeColor
                              : activeHighlight) === item.value
                              ? item.value
                              : 'transparent',
                        },
                      ]}
                    >
                      <IconSVG
                        circle
                        color={
                          item.name === 'Default'
                            ? item.displayColor
                            : item.value
                        }
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
              horizontal
            />
          </View>
        </View>
      );
    case ToolbarContext.Link:
      return (
        <EditLinkBar
          theme={editor.theme}
          initialLink={editorState.activeLink}
          onBlur={() => setToolbarContext(ToolbarContext.Main)}
          onLinkIconClick={() => {
            setToolbarContext(ToolbarContext.Main);
            editor.focus();
          }}
          onEditLink={(link) => {
            editor.setLink(link);
            editor.focus();

            if (Platform.OS === 'android') {
              // On android we dont want to hide the link input before we finished focus on editor
              // Add here 100ms and we can try to find better solution later
              setTimeout(() => {
                setToolbarContext(ToolbarContext.Main);
              }, 100);
            } else {
              setToolbarContext(ToolbarContext.Main);
            }
          }}
        />
      );
  }
}
