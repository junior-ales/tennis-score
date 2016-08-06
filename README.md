# Kickstart Brunch

Personal brunch io kickstarter with javascript, SASS, eslint and jasmine.

## How to use

You gonna need brunch installed globally in order to use the `new` command.
If you don't like this approach (like me) download this repo and run `npm install`.

#### Using new Command

```
mkdir [PROJECT DIR]
cd [PROJECT DIR]
brunch new --skeleton https://github.com/junior-ales/kickstart-brunch
```

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

Node `v5.5.0` was used for development but the skeleton was tested with prior version `v4.0.0` with success.
