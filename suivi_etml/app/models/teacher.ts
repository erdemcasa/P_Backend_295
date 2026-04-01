import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ClassGroup from './class_group.js'
import Comment from './comment.js'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare firstname: string

  @column()
  declare email: string

  @hasMany(() => ClassGroup)
  declare classGroups: HasMany<typeof ClassGroup>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  
  @column()
  declare userId: Number

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
