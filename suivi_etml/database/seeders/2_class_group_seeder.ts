import ClassGroup from '#models/class_group'
import Teacher from '#models/teacher'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class ClassGroupSeeder extends BaseSeeder {
  public async run() {

    const teachers = await Teacher.query().orderBy('id', 'asc').limit(4)

    await ClassGroup.createMany([
      { name: 'CIN1A', teacherId: teachers[0].id },
      { name: 'CIN1B', teacherId: teachers[0].id },
      { name: 'CIN1C', teacherId: teachers[1].id },
      { name: 'FID1', teacherId: teachers[2].id },
      { name: 'FID2', teacherId: teachers[2].id },
      { name: 'CID2A', teacherId: teachers[2].id },
      { name: 'CID2B', teacherId: teachers[3].id },
    ])
  }
}
