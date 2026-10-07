/**
 * Sample post-login Action for the docs screenshot tenant. Exists so the Actions Library and
 * Flows screens have something to show. It changes nothing about the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  console.log(`login: ${event.user.email} via ${event.connection.name}`);
};
