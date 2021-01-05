const MIN_COORDINATE = 1;
const MAX_COORDINATE = 10;

export function getBoundsCoords(countries) {
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;
  countries.forEach((country) => {
      minX = Math.min(minX, country.xl);
      minY = Math.min(minY, country.yl);
      maxX = Math.max(maxX, country.xh);
      maxY = Math.max(maxY, country.yh);
  });
  return { minX, minY, maxX, maxY };
}

export function isGridCompleted(countries) {
  return countries.every((country) => country.isCompleted());
}

export function forEachCoords(initX, initY, limitX, limitY, callback) {
  for (let x = initX; x <= limitX; x += 1) {
    for (let y = initY; y <= limitY; y += 1) {
      callback(x, y);
    }
  }
}

export function areCoordinatesValid(xl, yl, xh, yh) {
  const isTypeValid = [xl, yl, xh, yh].every((point) => {
    if (!Number.isInteger(point)) return false;
    return (point >= MIN_COORDINATE) && (point <= MAX_COORDINATE);
  })

  return isTypeValid && xl <= xh && yl <= yh;
}