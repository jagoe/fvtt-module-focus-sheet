import {parallel, series, task} from 'gulp'
import * as tasks from './gulp/tasks'

task('clean', tasks.clean)
task('compile', tasks.compile)
task('copy:static', tasks.copyStatic)

task('build', series('clean', parallel('compile', 'copy:static')))
