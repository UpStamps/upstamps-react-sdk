
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./upstamps-react.cjs.production.min.js')
} else {
  module.exports = require('./upstamps-react.cjs.development.js')
}
