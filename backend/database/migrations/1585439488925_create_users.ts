import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateUserTables extends BaseSchema {
  protected $tableName = 'users'

  public async up () {
    this.schema.createTable(this.$tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.string('phone')
      table.string('email').unique()
      table.timestamp('deleted_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.$tableName)
  }
}
