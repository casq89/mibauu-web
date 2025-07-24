import { miniUnits } from './utils';

export const sizing = Object.freeze({
  xxxLarge: {
    height: miniUnits(15),
    width: miniUnits(14),
  },
  xxLarge: {
    height: miniUnits(10),
    width: miniUnits(13),
  },
  xLarge: {
    height: miniUnits(10),
    width: miniUnits(13),
  },
  large: {
    height: miniUnits(9),
    padding: miniUnits(3),
  },
  xMedium: {
    width: miniUnits(7),
    height: miniUnits(8),
  },
  medium: {
    height: miniUnits(6),
    padding: miniUnits(2),
  },
  small: {
    height: miniUnits(5),
    padding: miniUnits(1),
  },
  xSmall: {
    width: miniUnits(4),
    height: miniUnits(4),
  },
});
