import Comment from '#models/comment'
import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {

  async index({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.student_id)

    await student.load('comments', (query) => {
      query.preload('teacher')
    })
    return response.ok(student.comments)

    // utilisation XH
    // xh GET localhost:3333/students/1/comments
  }

  async store({ params, request, response }: HttpContext) {
    const student = await Student.findOrFail(params.student_id)

    const { content, teacherId } = request.only(['content', 'teacherId'])

    const comment = await student.related('comments').create({ content, teacherId })

    return response.created({message: `Le commentaire a été créé`, data: comment})

    // utilisation XH
    // xh POST localhost:3333/students/1/comments content="Très bon travail !" teacherId=1
  }

  async update({ params, request, response }: HttpContext) {
    const commentBefore = await Comment.findOrFail(params.id)

    const { content, teacherId } = request.only(['content', 'teacherId'])

    const comment = await Comment.findOrFail(params.id)
    comment.merge({ content, teacherId })

    await comment.save()

    return response.ok(`Le commentaire a été modifié en ${comment.content}`)

    // utilisation XH
    // xh PUT localhost:3333/students/1/comments/1 content="Excellent travail !" teacherId=1
  }

  async show({ params, response }: HttpContext) {
    const comment = await Comment.query().preload('teacher').where("id", params.id).firstOrFail()

    return response.ok(comment)

    // utilisation XH
    // xh GET localhost:3333/students/1/comments/1
  }

  async destroy({ params, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
    comment.delete()
    return response.ok(`Commentaire supprimé : ${comment.content}`)

    // utilisation XH
    // xh DELETE localhost:3333/students/1/comments/1
  }

}
