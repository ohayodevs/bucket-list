'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Todo = models.todo

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Todo.find({_owner: req.user._id})
    .then(todos => res.json({
      todos: todos.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res, next) => {
  Todo.findById(req.todo.id)
  .then(todo => res.json({
    todo: todo.toJSON({ virtuals: true, user: req.user })
  }))
  .catch(next)
}

const create = (req, res, next) => {
  const todo = Object.assign(req.body.todo, {
    _owner: req.user._id
  })
  Todo.create(todo)
    .then(todo =>
      res.status(201)
        .json({
          todo: todo.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.todo._owner  // disallow owner reassignment.

  req.todo.update(req.body.todo)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.todo.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Todo), only: ['show'] },
  { method: setModel(Todo, { forUser: true }), only: ['update', 'destroy'] }
] })
