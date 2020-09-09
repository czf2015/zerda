export const framesUrl = require.context('../../public/frames/animation', true, /\.jpg$/).keys().map(item => item.replace('.', '/frames/animation'))
