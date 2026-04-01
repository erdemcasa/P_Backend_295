
import Teacher from "#models/teacher"
import { HttpContext } from "@adonisjs/core/http"
import { teacherValidator } from "../validators/teacher.ts"

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Teacher.query().orderBy('name').orderBy('firstname')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name, firstname } = await request.validateUsing(teacherValidator)

    const teacher = await Teacher.create({ name, firstname })

    return response.created({message: `Enseignant ${teacher.name} ${teacher.firstname} a été crée`, data: teacher})
  }


  async update({ params, request, response }: HttpContext) {
    const teacherBefore = await Teacher.findOrFail(params.id)

    const { name, firstname } = await request.validateUsing(teacherValidator)

    const teacher = await Teacher.findOrFail(params.id)
    teacher.merge({ name, firstname })

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
  async edit({ params }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    teacher.delete()
    return response.ok(`Enseignant supprimé : ${teacher.name} ${teacher.firstname}`)
  }

}
