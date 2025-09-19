export default {
  plugins: {
    autoprefixer: {},
    'postcss-prefix-selector': {
      prefix: '.adu',
      transform: function (prefix, selector, prefixedSelector) {
        // Don't prefix :root selectors or when they already contain .adu
        if (
          selector.includes(':root') ||
          selector.includes('html') ||
          (selector.includes('.dark') && selector.includes('.adu'))
        ) {
          return selector;
        }
        return prefixedSelector;
      },
    },
  },
};
