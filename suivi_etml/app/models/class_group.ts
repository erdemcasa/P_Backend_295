import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Teacher from './teacher.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ClassGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string


  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>
  @column()
  declare teacherId: Number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
