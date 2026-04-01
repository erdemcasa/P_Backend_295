/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ClassesGroupsController from '#controllers/classes_groups_controller'
import StudentsController from '#controllers/students_controller'
import TeachersController from '#controllers/teachers_controller'
import ClassGroup from '#models/class_group'
import Student from '#models/student'
import Teacher from '#models/teacher'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return 'Bienvenu dans l\'API REST en AdonisJS'
})

router.get('/erdem', async () => {
  return 'Le plus beau du monde et le plus fort au foot'
})

router.get('/all', async () => {
  const students = await Student.query().orderBy('name').orderBy('firstname')
  const teachers = await Teacher.query().orderBy('name').orderBy('firstname')
  const classes = await ClassGroup.query().orderBy('name')
  return { students, teachers, classes }

  // Utilisation curl
  // curl -X GET http://localhost:3333/all
})

router.resource('students', StudentsController).apiOnly()
router.resource('teachers', TeachersController).apiOnly()
router.resource('classesGroups', ClassesGroupsController).apiOnly()

