import Comment from '#models/comment'
import Student from '#models/student'
import { commentValidator } from '#validators/comment'
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


  async store({ params, request, response, auth }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { content } = await request.validateUsing(commentValidator)
    // Récupération de l'utilisateur authentifié
    const user = auth.user!
    // Chargement de l'enseignant lié à cet utilisateur
    const teacher = await user.related('teacher').query().first()
    if (!teacher) {
      return response.badRequest({ message: 'Teacher not found' })
    }
    const teacherId = teacher.id
    // Création du commentaire lié à l'élève
    const comment = await Comment.create({
      content,
      studentId: params.student_id,
      teacherId,
    })
    // Réponse HTTP 201 avec le commentaire
    return response.created(comment)

    // utilisation XH
    // xh POST localhost:3333/students/1/comments content="Très bon travail !" --auth
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
