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
 * Generatees the modules routes/handlers
 */
<%= className %>.prototype.makeRoutes = function (authHandler) {
  // TODO: routes/handlers go here
}

/**
 * Generates the background tasks that will be launched by this module
 */
<%= className %>.prototype._makeBackgroundTasks = function () {
  // TODO: add background tasks
  return []
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
