const serverRoutes = {
  loginPath: () => ['/api/v1', 'login'].join('/'),
  dataPath: () => ['/api/v1', 'data'].join('/'),
  registrationPath: () => ['/api/v1', 'signup'].join('/'),
};

const appRoutes = {
  chatPage: () => '/',
  loginPage: () => '/login',
  registrationPage: () => '/signup',
  notFoundPage: () => '*',
};

export { serverRoutes, appRoutes };
