
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./upstamps-react-sdk.cjs.production.min.js')
} else {
  module.exports = require('./upstamps-react-sdk.cjs.development.js')
}
