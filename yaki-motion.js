// This local illustration represents the Great Bunker action, not a measured
// personal route. The citation establishes firing/contact near the position,
// bringing explosives to its entrance, and entering after the explosion.
// Bearings, the entrance point, distance and phase timing are not established.
// These image-pixel anchors place the illustration beside the existing model;
// they do not add a speculative earlier journey through the trench system.
export const yakiRoute = Object.freeze([
  [213, 205],
  [202, 210],
  [196, 210],
].map(point => Object.freeze(point)));

const distances = [0];
for (let i = 1; i < yakiRoute.length; i++) {
  distances.push(distances[i - 1] + Math.hypot(
    yakiRoute[i][0] - yakiRoute[i - 1][0],
    yakiRoute[i][1] - yakiRoute[i - 1][1],
  ));
}

function positionAt(progress) {
  // This short pause makes the local action legible. Its duration is solely a
  // presentation choice and asserts no historical time or relative duration.
  const travel = Math.max(0, (progress - 0.25) / 0.75);
  if (travel === 0) return [...yakiRoute[0]];
  if (travel === 1) return [...yakiRoute.at(-1)];
  const distance = travel * distances.at(-1);
  let i = 1;
  while (distance > distances[i]) i++;
  const fraction = (distance - distances[i - 1]) / (distances[i] - distances[i - 1]);
  const a = yakiRoute[i - 1], b = yakiRoute[i];
  return [a[0] + (b[0] - a[0]) * fraction, a[1] + (b[1] - a[1]) * fraction];
}

/**
 * Deterministic phase-derived presentation. Yaki survived: "completed" keeps
 * the last illustrated location and never signifies a memorial or later route.
 */
export function getYakiState({phaseId, progress = 0} = {}) {
  if (phaseId === 'great-bunker') {
    const phaseProgress = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;
    return {
      mode: 'moving',
      point: positionAt(phaseProgress),
      progress: phaseProgress,
      sourceIds: ['hetz', 'battleMap'],
    };
  }
  if (phaseId === 'aftermath') {
    return {
      mode: 'completed',
      point: [...yakiRoute.at(-1)],
      progress: 1,
      sourceIds: ['hetz', 'battleMap'],
    };
  }
  return {mode: 'unlocated', point: null, progress: 0, sourceIds: ['hetz']};
}
