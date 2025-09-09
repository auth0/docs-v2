// Example for Express.js
const Sentry = require('./lib/instrumentation');

// Request handler must be the first middleware
app.use(Sentry.Handlers.requestHandler());

// ...your routes

// Error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());