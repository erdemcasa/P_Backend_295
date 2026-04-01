
import Teacher from "#models/teacher"
import { HttpContext } from "@adonisjs/core/http"
import { teacherValidator } from "../validators/teacher.ts"

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) {
    return Teacher.query().orderBy('name').orderBy('firstname')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name, firstname, email, userId } = await request.validateUsing(teacherValidator)

    const teacher = await Teacher.create({ name, firstname, email, userId })
    return response.created(teacher)

    // utilisation XH
    // xh POST localhost:3333/teachers name="Smith" firstname="John" email="john.smith@example.com" userId=1
  }


  async update({ params, request, response }: HttpContext) {
    const teacherBefore = await Teacher.findOrFail(params.id)

    const { name, firstname, email, userId } = await request.validateUsing(teacherValidator)

    const teacher = await Teacher.findOrFail(params.id)
    teacher.merge({ name, firstname, email, userId })

    await teacher.save()

    return response.ok(`L'enseignant ${teacherBefore.name} ${teacherBefore.firstname} a été modifié en ${teacher.name} ${teacher.firstname}`)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)

    return response.ok(teacher)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    teacher.delete()
    return response.ok(`Enseignant supprimé : ${teacher.name} ${teacher.firstname}`)
  }

}
