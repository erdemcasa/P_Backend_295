import ClassGroup from '#models/class_group'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassesGroupsController {
  async index({}: HttpContext) {

    return ClassGroup.query().preload('teacher').orderBy('name')

    // utilisation XH
    // xh GET localhost:3333/classesGroups
  }
  async store({ request, response }: HttpContext) {
    const { name, teacherId } = request.only(['name', 'teacherId'])

    const classGroup = await ClassGroup.create({ name, teacherId })

    return response.created({message: `La classe ${classGroup.name} a été crée`, data: classGroup})

    // utilisation XH
    // xh POST localhost:3333/classesGroups name="CIN1Z" teacherId=1

  }

  async update({ params, request, response }: HttpContext) {
    const classGroupBefore = await ClassGroup.findOrFail(params.id)

    const { name, teacherId } = request.only(['name', 'teacherId'])

    const classGroup = await ClassGroup.findOrFail(params.id)
    classGroup.merge({ name, teacherId })

    await classGroup.save()

    return response.ok(`La classe ${classGroupBefore.name} a été modifiée en ${classGroup.name}`)

    // utilisation XH
    // xh PUT localhost:3333/classesGroups/1 name="CIN1Z" teacherId=1
  }

  async show({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.query().preload('teacher').where("id", params.id)

    return response.ok(classGroup)
    // utilisation XH
    // xh GET localhost:3333/classesGroups/1
  }

  async destroy({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    classGroup.delete()
    return response.ok(`Classe supprimée : ${classGroup.name}`)

    // utilisation XH
    // xh DELETE localhost:3333/classesGroups/1
  }


}
