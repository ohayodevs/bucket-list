'use strict'

const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completed_date: {
    type: Date
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

// listSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const List = mongoose.model('List', listSchema)

module.exports = List
