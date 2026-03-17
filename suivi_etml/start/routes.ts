/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import StudentsController from '#controllers/students_controller'
import TeachersController from '#controllers/teachers_controller'
import router from '@adonisjs/core/services/router'

router.get('test', async () => {
  return 'API is working !'
})


router.resource('students', StudentsController).apiOnly()
router.resource('teachers', TeachersController).apiOnly()

