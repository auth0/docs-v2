const Sentry = require("@sentry/node");

const env = {
  ...process.env,
  ERROR_REPORTER_URL: process.env.SENTRY_REPORTING_URL || process.env.ERROR_REPORTER_URL,
};

// Initialize Sentry
Sentry.init({
  dsn: env.ERROR_REPORTER_URL, // Your Sentry DSN
  environment: env.NODE_ENV || "development",
  tracesSampleRate: 1.0, // Adjust for performance monitoring
});

module.exports = Sentry;