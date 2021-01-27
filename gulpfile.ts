import {task, src, dest, parallel, series} from 'gulp'
import * as del from 'del'
import {createProject} from 'gulp-typescript'

const project = createProject('src/tsconfig.json')

task('clean', async () => {
  del.sync('dist')
  return Promise.resolve()
})

task('compile', () => {
  return src('src/**/*.ts').pipe(project()).pipe(dest('dist/'))
})

task('copy', async () => {
  src('README.md').pipe(dest('dist/'))
  src('src/module.json').pipe(dest('dist/'))
  src('src/lang/**').pipe(dest('dist/lang/'))
  src('src/templates/**').pipe(dest('dist/templates/'))
  src('src/styles/**').pipe(dest('dist/styles/'))
  src('src/assets/**').pipe(dest('dist/assets/'))
  return Promise.resolve()
})

task('build', series('clean', parallel('compile', 'copy')))
