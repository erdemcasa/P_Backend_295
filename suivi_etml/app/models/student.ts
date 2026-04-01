import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ClassGroup from './class_group.js'

import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare firstname: string

  @belongsTo(() => ClassGroup)
  declare classGroup: BelongsTo<typeof ClassGroup>
  @column()
  declare classGroupId: Number


  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
