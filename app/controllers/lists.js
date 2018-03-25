'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const List = models.list

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  List.find()
    .then(lists => res.json({
      lists: lists.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    list: req.list.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const list = Object.assign(req.body.list, {
    _owner: req.user._id
  })
  List.create(list)
    .then(list =>
      res.status(201)
        .json({
          list: list.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.list._owner  // disallow owner reassignment.

  req.list.update(req.body.list)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.list.remove()
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
  { method: setModel(List), only: ['show'] },
  { method: setModel(List, { forUser: true }), only: ['update', 'destroy'] }
] })
