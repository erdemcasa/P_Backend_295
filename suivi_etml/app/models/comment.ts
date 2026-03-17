import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Teacher from './teacher.js'

import type { BelongsTo, HasMany, HasOne  } from '@adonisjs/lucid/types/relations'
import Student from './student.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string


  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>
  @column()
  declare teacherId: Number

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>
  @column()
  declare studentId: Number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
