const path = require('path');

module.exports = {
  mode: 'development',
    entry: {
        githubButton: './src/github-button/index.js',
        customSelect: './src/custom-select/index.js',
        popup: './src/pop-up/index.js',
        freeShippingBar: './src/free-shipping-bar/index.js',
        wishlist: './src/wishlist/index.js',
        brain: './src/brain/index.js',
        chat: './src/chat/index.js',
        cylindo: './src/cylindo/index.js',
        webshopVariantSelector: './src/webshop/variant-selector/index.js',
        carousel: './src/webshop/carousel/index.js',
        webshopVariantCombinations: './src/webshop/variant-combinations/index.js',
        threeTest: './src/three/index.js',
    },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
};