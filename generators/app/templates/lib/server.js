var BinderModule = require('binder-module')
var inherits = require('inherits')

/*
 * An HTTP server that implements the API of a Binder component
 * @constructor
 */
function <%= className %> (opts) {
  if (!this instanceof <%= className %>) {
    return new <%= className %>(opts)
  }
  this.opts = opts
  this.name = <%= name %>
  BinderModule.call(this)
}

inherits(<%= className %>, BinderModule)

/**
 * Attached module's routes/handlers to the main app object
 */
<%= className %>.prototype.makeRoutes = function (app, authHandler) {
  // TODO: routes/handlers go here
}

/**
 * Performs all module-specific startup behavior
 */
<%= className %>.prototype._start = function () {
  // TODO :add startup behavior
}

/**
 * Performs all module-specific stopping behavior
 */
<%= className %>.prototype._stop = function () {
  // TODO :add stopping:w behavior
}

module.exports = <%= className %>
