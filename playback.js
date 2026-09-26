/**
 * A deterministic playback clock. Each phase lasts `duration` simulated
 * milliseconds; historical timestamps have no bearing on playback speed.
 * The caller owns scheduling and passes elapsed time to tick().
 */
export function createPlayback({ count, duration = 10000, onChange = () => {} }) {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new RangeError('count must be a positive integer');
  }
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new RangeError('duration must be a positive finite number');
  }
  if (typeof onChange !== 'function') {
    throw new TypeError('onChange must be a function');
  }

  let index = 0;
  let elapsed = 0;
  let playing = false;
  let ended = false;

  function snapshot() {
    return { index, progress: elapsed / duration, playing, ended };
  }

  function update(change) {
    const before = snapshot();
    change();
    const after = snapshot();
    if (Object.keys(after).some(key => after[key] !== before[key])) {
      onChange(after);
    }
    return snapshot();
  }

  function seek(target) {
    if (!Number.isFinite(target)) {
      throw new TypeError('index must be a finite number');
    }
    return update(() => {
      index = Math.max(0, Math.min(count - 1, Math.trunc(target)));
      elapsed = 0;
      playing = false;
      ended = false;
    });
  }

  return {
    snapshot,
    play() {
      return update(() => {
        if (ended) {
          index = 0;
          elapsed = 0;
          ended = false;
        }
        playing = true;
      });
    },
    pause() {
      return update(() => { playing = false; });
    },
    stop() {
      return seek(0);
    },
    next() {
      return seek(index + 1);
    },
    previous() {
      return seek(index - 1);
    },
    seek,
    tick(deltaMs) {
      if (!Number.isFinite(deltaMs)) {
        throw new TypeError('deltaMs must be a finite number');
      }
      if (!playing || deltaMs <= 0) return snapshot();
      return update(() => {
        const total = elapsed + deltaMs;
        const phases = Math.floor(total / duration);
        if (phases >= count - index) {
          index = count - 1;
          elapsed = duration;
          playing = false;
          ended = true;
        } else {
          index += phases;
          elapsed = total % duration;
        }
      });
    },
  };
}
