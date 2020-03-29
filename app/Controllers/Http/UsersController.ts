import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class UsersController {
  public async index () {
    const users = await User.query().whereNull('deleted_at')

    return users
  }

  public async store ({request, response}: HttpContextContract) {
    const data = request.only(['username', 'password', 'phone', 'email'])

    const userExist = await User.query().where({username: data.username})
    const emailExist = await User.query().where({email: data.email})

    if (userExist.length !== 0) {
      return response.json({error: 'Username already in use'})
    }
    if (emailExist.length !== 0) {
      return response.json({error: 'E-mail already in use'})
    }

    return User.create(data)
  }

  public async show ({params, response}: HttpContextContract) {
    const {id} = params

    const user = await User.query().where({id}).whereNull('deleted_at')

    if (!user) {
      return response.json({error: 'User don\'t exist'})
    }

    return user
  }

  public async update ({request, response, params}: HttpContextContract) {
    const {id} = params

    const user = await User.find(id)

    if (!user) {
      return response.json({error: 'User don\'t exist'})
    }

    const data = request.only(['password', 'phone', 'email'])

    if (data.email) {
      const emailExist = await User.query().where({email: data.email})

      if (emailExist.length !== 0) {
        return response.json({error: 'E-mail already exist'})
      }
    }

    user.email = data.email || data.email
    user.password = data.password || user.password
    user.phone = data.phone || user.phone

    await user.save()

    return user
  }

  public async delete ({params, response}: HttpContextContract) {
    const {id} = params

    const user = await User.find(id)

    if (!user) {
      return response.json({error: 'User don\'t exist'})
    }

    user.deletedAt = DateTime.local()

    await user.save()

    return response.json({msg: 'User deleted success'})
  }
}
