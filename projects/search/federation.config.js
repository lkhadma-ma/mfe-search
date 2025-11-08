const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'search',

  exposes: {
      // routes
      './ME_ROUTES':'./projects/search/src/app/domains/me/feature/me.routes.ts',
      // components
      './MeShellComponent': './projects/search/src/app/domains/me/feature/me-shell.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket'
  ],

  features: {
    ignoreUnusedDeps: true
  }
  
});
