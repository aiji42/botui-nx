const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
// const babel = require('@rollup/plugin-babel')
// process.env.NODE_ENV = 'production'

Object.defineProperty(exports, '__esModule', { value: true })
function getRollupOptions(options) {
  const extraGlobals = {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // 'styled-components': 'styled',
    // '@emotion/react': 'emotionReact',
    // '@emotion/styled': 'emotionStyled'
  }
  if (Array.isArray(options.output)) {
    options.output.forEach((o) => {
      o.globals = Object.assign(Object.assign({}, o.globals), extraGlobals)
    })
  } else {
    options.output = Object.assign(Object.assign({}, options.output), {
      globals: Object.assign(
        Object.assign({}, options.output.globals),
        extraGlobals
      )
    })
  }

  options.input = options.input.replace('index.ts', 'build.ts')
  options.output.name = 'Botui'
  options.external = []
  console.log(options.plugins)
  options.plugins = options.plugins.filter((plugin) => plugin.name !== 'node-resolve')
  options.plugins.push(resolve({ browser: true }))

  console.log(options)
  return options
}
module.exports = getRollupOptions
