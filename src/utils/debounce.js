let debounceTimer;
export const debounce = (callback, time, e) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    callback(e);
  }, time);
};
