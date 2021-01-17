const authResolver = require('./auth');
const apptResolver = require('./appt');
const bookingResolver = require('./booking');

const rootResolver  = {
 ...apptResolver,
 ...authResolver,
 ...bookingResolver
}

module.exports = rootResolver;