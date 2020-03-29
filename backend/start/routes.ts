/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async () => {
//   return { hello: 'world' }
// })

Route.get('/user', 'UsersController.index')
Route.post('/user', 'UsersController.store')
Route.get('/user/:id', 'UsersController.show')
Route.put('/user/:id', 'UsersController.update')
Route.delete('/user/:id', 'UsersController.delete')
