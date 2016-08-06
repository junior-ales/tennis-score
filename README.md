# Tennis Score

## Running

Most important lifecycle scripts included in kickstart-brunch:

```
  npm test
    jasmine
  npm start
    brunch watch --server
```

Available via `npm run-script`:

```
  npm run lint
    esw app/ spec/ --ext .js
  npm run build
    brunch build
  npm run build:prod
    npm run build -- -p
  npm run watch
    watch 'npm run lint && npm run test' app/ spec/ -d
```

Node `v6.2.1` was used for development
