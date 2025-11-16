const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'search',

  exposes: {
      // routes
      './SEARCH_ALL_ROUTES':'./projects/search/src/app/domains/search-all/feature/shell-search-all.routes.ts',
      './SEARCH_JOB_ROUTES':'./projects/search/src/app/domains/search-job/feature/shell-search-job.routes.ts',
      // components
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
