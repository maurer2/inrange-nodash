const inRange = (num, rangeStart, rangeEnd = 0) => 
  (rangeStart <= num && num < rangeEnd) || (rangeEnd < num && num < rangeStart);

export default inRange;
