var mode = process.env['NODE_ENV'],
    _ = require('lodash'),
    globalConf = require('./global.json'),
    prod = _.extend(require('./prod.json'), globalConf),
    dev = _.extend(require('./dev.json'), globalConf);

if (mode == undefined)
    module.exports = prod;
else {
    if (mode == 'dev' || mode == 'development')
        module.exports = dev;
    else
        module.exports = prod;
}
