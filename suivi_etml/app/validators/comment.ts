import vine from '@vinejs/vine'

const commentValidator = vine.compile(
 vine.object({
 content: vine.string().minLength(2),
 })
)
export { commentValidator }
