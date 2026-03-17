import vine from '@vinejs/vine'

const teacherValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    firstname: vine.string().minLength(2).maxLength(255),
    email: vine.string().email()
  })
)

export { teacherValidator}
