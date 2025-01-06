/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {fonts} from '../constants/fonts';
import {colors} from '../constants/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white.w500,
    // padding: 12,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary.p100,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.dark.d500_10,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 48,
    alignItems: 'center',
  },
  input: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    color: colors.dark.d500,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
  },
  tag: {
    backgroundColor: colors.gray.g500_20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 100,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.35)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: colors.gray.g500_80,
    borderRadius: 999,
    marginHorizontal: 4,
  },
});
