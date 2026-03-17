import Student from '#models/student'
import { studentValidator } from '#validators/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Student.query().orderBy('name').orderBy('firstname')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name, firstname } = await request.validateUsing(studentValidator)

    const student = await Student.create({ name, firstname })

    return response.created({message: `Utilisateru ${student.name} ${student.firstname} a été crée`, data: student})
  }


  async update({ params, request, response }: HttpContext) {
    const studentBefore = await Student.findOrFail(params.id)

    const { name, firstname } = await request.validateUsing(studentValidator)

    const student = await Student.findOrFail(params.id)

    student.merge({ name, firstname })

    await student.save()

    return response.ok(`L'utilisateur ${studentBefore.name} ${studentBefore.firstname} a été modifié en ${student.name} ${student.firstname}`)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)

    return response.ok(student)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    student.delete()
    return response.ok(`Utilisateur supprimé : ${student.name} ${student.firstname}`)
  }
}
