import lodashStable from 'lodash';
import { falsey, stubTrue } from '../src/utils.js';
import inRange from '../src/inRage-vanilla-improved';

describe('inRange', () => {
  test.only('should work with an `end`', () => {
    expect(inRange(3, 5)).toStrictEqual(true);
    expect(inRange(5, 5)).toStrictEqual(false);
    expect(inRange(6, 5)).toStrictEqual(false);
  });

  test.only('should work with a `start` and `end`', () => {
    expect(inRange(1, 1, 5)).toStrictEqual(true);
    expect(inRange(1, 1, 5)).toStrictEqual(true);
    expect(inRange(0, 1, 5)).toStrictEqual(false);
    expect(inRange(5, 1, 5)).toStrictEqual(false);
  });

  test.skip('should treat falsey `start` as `0`', () => {
    lodashStable.each(falsey, (value, index) => {
      if (index) {
        expect(inRange(0, value)).toEqual(false);
        expect(inRange(0, value, 1)).toStrictEqual(true);
      } else {
        // index = 0
        expect(inRange(0)).toStrictEqual(false);
      }
    });
  });

  test.only('should swap `start` and `end` when `start` > `end`', () => {
    expect(inRange(2, 5, 1)).toStrictEqual(true);
    expect(inRange(-3, -2, -6)).toStrictEqual(true);
  });
  // extra test
  test.skip('should swap `start` and `end` when `start` > `end` --inclusive', () => {
    expect(inRange(2, 5, 5)).toStrictEqual(true);
    expect(inRange(-3, -2, -6)).toStrictEqual(true);
  });

  test.only('should work with a floating point `n` value', () => {
    expect(inRange(0.5, 5)).toStrictEqual(true);
    expect(inRange(1.2, 1, 5)).toStrictEqual(true);
    expect(inRange(5.2, 5)).toStrictEqual(false);
    expect(inRange(0.5, 1, 5)).toStrictEqual(false);
  });

  test.only('should coerce arguments to finite numbers', () => {
    const actual = [
      inRange(0, '1'),
      inRange(0, '0', 1),
      inRange(0, 0, '1'),
      inRange(0, NaN, 1),
      inRange(-1, -1, NaN)
    ];

    expect(lodashStable.map(actual, stubTrue)).toStrictEqual(actual);
  });
});
