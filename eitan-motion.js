import {historicPaths} from './historical-geometry.js';

// The citation describes covering fire from exposed ground while running beside
// the advancing group. It provides no map coordinates, distance, or timing.
// This short, illustrative segment follows the schematic western trench eight
// image pixels (0.8 scene units) to the west, outside the modeled trench cut.
// Neither endpoint identifies his death location or the
// measured beginning/end of his action. Historical geometry: CC BY-SA 2.5.
const westernTrench = historicPaths.find(path => path.name === 'Western trench').points;
const startY = 365;
const endY = 278;
const westOffset = -8;

function pointAtY(y) {
  for (let i = 1; i < westernTrench.length; i++) {
    const a = westernTrench[i - 1], b = westernTrench[i];
    if (a[1] >= y && b[1] <= y) {
      const fraction = (y - a[1]) / (b[1] - a[1]);
      return [a[0] + (b[0] - a[0]) * fraction + westOffset, y];
    }
  }
  throw new RangeError('Eitan schematic route lies outside the western trench trace');
}

export const eitanRoute = Object.freeze([
  pointAtY(startY),
  ...westernTrench.filter(([, y]) => y < startY && y > endY)
    .map(([x, y]) => [x + westOffset, y]),
  pointAtY(endY),
].map(point => Object.freeze(point)));

const distances = [0];
for (let i = 1; i < eitanRoute.length; i++) {
  distances.push(distances[i - 1] + Math.hypot(
    eitanRoute[i][0] - eitanRoute[i - 1][0],
    eitanRoute[i][1] - eitanRoute[i - 1][1],
  ));
}

function positionAt(progress) {
  if (progress === 0) return [...eitanRoute[0]];
  if (progress === 1) return [...eitanRoute.at(-1)];
  const distance = progress * distances.at(-1);
  let i = 1;
  while (distance > distances[i]) i++;
  const fraction = (distance - distances[i - 1]) / (distances[i] - distances[i - 1]);
  const a = eitanRoute[i - 1], b = eitanRoute[i];
  return [a[0] + (b[0] - a[0]) * fraction, a[1] + (b[1] - a[1]) * fraction];
}

/**
 * Derive Eitan's presentation only from the selected replay phase.
 * `progress` is route completion, not elapsed historical time. Rewinding or
 * seeking needs no separate reset. The moving mode lasts the whole action
 * phase; the following phases use a commemorative marker, not a living unit.
 */
export function getEitanState({phaseId, progress = 0} = {}) {
  if (phaseId === 'western-trench') {
    const routeProgress = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;
    return {
      mode: 'moving',
      point: positionAt(routeProgress),
      progress: routeProgress,
      sourceIds: ['eitan', 'battleMap'],
    };
  }
  if (phaseId === 'great-bunker' || phaseId === 'aftermath') {
    return {
      mode: 'memorial',
      point: [...eitanRoute.at(-1)],
      progress: 1,
      sourceIds: ['eitan', 'battleMap'],
    };
  }
  return {mode: 'unlocated', point: null, progress: 0, sourceIds: ['eitan']};
}
