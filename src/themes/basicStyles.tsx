import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: { flexDirection: 'column' },
  flex: { flex: 1 },
  flexAlignCenter: {
    flex: 1,
    alignItems: 'center',
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexJustifyCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  row: { flexDirection: 'row' },
  rowAlignCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAlignCenter: { textAlign: 'center' },
  textDecorationThroughLine: { textDecorationLine: 'line-through' },
  textDecorationUnderLine: { textDecorationLine: 'underline' },
});
