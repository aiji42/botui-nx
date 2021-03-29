const commonjs = require('@rollup/plugin-commonjs')

Object.defineProperty(exports, '__esModule', { value: true })
function getRollupOptions(options) {
  const extraGlobals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'styled-components': 'styled',
    '@emotion/react': 'emotionReact',
    '@emotion/styled': 'emotionStyled'
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

  // console.log(options.plugins.find((plg) => plg.name === 'commonjs').transform)
  options.plugins.push(
    commonjs({
      include: 'node_modules/**',
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'Component',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef'
        ]
      }
    })
  )

  return options
}
module.exports = getRollupOptions
