/**
 * Create common hover styles
 *
 * @param   enabled   - Whether hovering is enabled
 * @param   elevation - Hover elevation
 * @returns Hover styles
 */
const getHoverStyles = (enabled, elevation = 4) => {
  if (!enabled) return {};

  return {
    cursor: "pointer",
    ":hover": {
      boxShadow: elevation,
    },
  };
};

export { getHoverStyles };
