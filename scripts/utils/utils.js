export const setFocus = (element) => (
  window.setTimeout(function() {
    element.focus();
  }, 0)
);