import vine from '@vinejs/vine'

const studentValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    firstname: vine.string().minLength(2).maxLength(255),
  })
)

export { studentValidator}
