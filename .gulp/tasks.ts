import {src, dest} from 'gulp'
import * as del from 'del'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'

export async function clean() {
  del.sync(['dist'])
  return Promise.resolve()
}

export async function compile() {
  return new Promise<void>((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      }

      if (stats?.hasErrors()) {
        reject(new Error(stats.toString()))
      }

      resolve()
    })
  })
}

export async function copyStatic() {
  src('README.md').pipe(dest('dist/'))
  src('src/module.json').pipe(dest('dist/'))
  src('src/lang/**').pipe(dest('dist/lang/'))
  src('src/templates/**').pipe(dest('dist/templates/'))
  src('src/styles/**').pipe(dest('dist/styles/'))
  src('src/assets/**').pipe(dest('dist/assets/'))

  return Promise.resolve()
}
