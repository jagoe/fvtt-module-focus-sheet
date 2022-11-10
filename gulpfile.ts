import * as tasks from './.gulp/tasks'

import { parallel, series, task } from 'gulp'

task('clean', tasks.clean)
task('compile', tasks.compile)
task('copy:static', tasks.copyStatic)

task('build', series('clean', parallel('compile', 'copy:static')))
