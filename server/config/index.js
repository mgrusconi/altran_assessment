'use strict';

/**
 * Modulo que unifica las configuraciones.
 * Module that unifies the configs.
 * 
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

import _ from 'lodash';

module.exports = _.extend(
  require('./common'),
  require('./security'),
  require('./resources'),
);