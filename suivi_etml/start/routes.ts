/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ClassesGroupsController from '#controllers/classes_groups_controller'
import CommentsController from '#controllers/comments_controller'
import StudentsController from '#controllers/students_controller'
import TeachersController from '#controllers/teachers_controller'
import ClassGroup from '#models/class_group'
import Student from '#models/student'
import Teacher from '#models/teacher'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AuthController from '#controllers/auth_controller'

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


router
  .group(() => {
    // Routes pour le CRUD /students
    router.resource('students', StudentsController).apiOnly()
    // Routes pour le CRUD /teachers
    router.resource('teachers', TeachersController).apiOnly()
    // Routes pour le CRUD /classGroup
    router.resource('classGroups', ClassesGroupsController).apiOnly()
    // Routes imbriquées sur les commentaires
    // pour le CRUD /students/:student_id/comments
    router
      .group(() => {
        router.resource('comments', CommentsController).apiOnly()
      })
      .prefix('students/:student_id')
  })
  .use(middleware.auth())

// Routes pour l'authentification
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')


// Utilisation XH pour l'authentification
// xh POST localhost:3333/user/register username="erdem67" email="erdem67@example.com" password="password"
// xh POST localhost:3333/user/login username="erdem67" password="password"
// xh POST localhost:3333/user/logout --auth


