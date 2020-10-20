import path from 'path'
import fs from 'fs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const isDev = process.env.NODE_ENV === 'development'

const src = path.resolve(__dirname, 'src')

const entry = (function getEntry() {
  const collect = {}
  function forEntry(prefix) {
    const files = fs.readdirSync(prefix).filter((file) => !/(^\.|_)/.test(file))
    files.forEach((file) => {
      const f = path.resolve(prefix, file)
      const stats = fs.statSync(f)
      if (stats.isFile()) {
        const key = f.replace(`${src}/`, '').replace(/\.(ts|js)x?$/, '')
        collect[key] = f
      } else {
        forEntry(f)
      }
    })
  }
  forEntry(src)
  return collect
})()

function getLibName(key) {
  if (key === 'index') return 'haloUtils'
  return `halo${key.substring(0, 1).toUpperCase()}${key.substring(1)}`
}

function getOutPut(key) {
  return isDev
    ? [
        {
          file: `public/${key}.min.js`,
          format: 'iife',
          name: getLibName(key),
        },
      ]
    : [
        {
          file: `lib/${key}.js`,
          format: 'cjs',
          exports: 'auto',
        },
        {
          file: `lib/${key}.min.js`,
          format: 'iife',
          name: getLibName(key),
        },
        {
          file: `lib/${key}.esm.js`,
          format: 'esm',
        },
      ]
}

function getItemConfig(key, input) {
  const config = {
    input,
    output: getOutPut(key),
    plugins: [
      resolve({ browser: true }),
      commonjs({ exclude: 'node_modules' }),
      json(),
      typescript(),
    ],
  }

  if (!isDev) {
    config.plugins.push(terser())
  }
  return config
}

export default Object.keys(entry).map((key) => getItemConfig(key, entry[key]))
