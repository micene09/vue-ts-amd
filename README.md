# vue-ts-amd

> A full-featured Vue.js 2 boilerplate using AMD pattern and Typescript

This boilerplate was built from scratch, with the help of the Vue.js community, just to cover the need (mostly mine) to use the [AMD](https://en.m.wikipedia.org/wiki/Asynchronous_module_definition) pattern and Typescript tech.

## Features and Stack

- Modular programming using [Require.js](http://requirejs.org)
- Easy module mapping system to require dependencies dinamically (from node_modules, bower_components or wathever)
- [Karma](https://karma-runner.github.io/1.0/index.html) as test runner
- [Mocha](https://mochajs.org), [Chai](http://chaijs.com), [Avoriaz](https://github.com/eddyerburgh/avoriaz/) as test libraries
- Code using Typescript in both develop and unit-tests
- Stylize modules using [Sass](http://sass-lang.com), define settings for modular files or bundels
- Live reload/injection in dev mode using [BrowserSync](https://www.browsersync.io)
- [Gulp.js](https://gulpjs.com) (internal use)
- Generate compiled and minified files ready for production

## Installation

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli/blob/master/README.md), install it via terminal using:

```
npm i -g vue-cli
```

Then install the boilerplate:

```
vue init Micene09/vue-ts-amd my-project
cd my-project
npm i
```

...or just download this repo, all you need is in template folder.

## Modules Mapping System

### Usage

In the root path of this boilerplate, you will find a file named **modules.json** with the following schema:

```javascript
{
    "module_name" {
        "max": "path to the maximized/normal file" // << required
        "min": "path to the minified file"  // << optional
    }
}
```

...just for example:

```javascript
{
    "vue": {
        "min": "/node_modules/vue/dist/vue.min.js",
        "max": "/node_modules/vue/dist/vue.js"
    }
}
```

Consider to map AMD/UMD version only for every 3rd party module to get everything working.



If you are using a module from node_moduels folder like the example above, **the module_name should be the same as node module**, just like *require("the npm module name")* in Node.js .

In this way, you will be able to import modules with working typings and intelligence (if you are using Visual Studio Code or similar) as usual:

```typescript
// typescript file:
import Vue from "vue";
import _ from "lodash";

new Vue({...});
```

### Build processes explained

Running dev or release build process...

- Every module mapped in modules.json, will be copied and renamed to **modules/[module name].js**
- A new file named **require.modules.js** will be created in both dev and release, containing the [require.js path mapping](http://requirejs.org/docs/api.html#config-paths) for every module mapped in modules.json .

***It's very important to include the require.modules.js file in your entry point html code.***

Use the following as guide to boot your entry point:

```html
<script src="require.modules.js"></script>
<script src="modules/require.js" data-main="main.js"></script>
```

Note that require.js was mapped in modules.json, then included in page using *modules/require.js* as URL.

Check *src/index.html* and *modules.json* provided in this repo.

## Included scripts

### npm run test

Will run tests  (*.ts) located inside */test* folder in watch mode.
Tests will restarts after every typescript file change inside */test*.

### npm run dev-prepare

Will prepare (**compile**) the project's files inside */src* folder to the */build* folder.
The **maximized** modules version defined in modules.json will be copied to */build/modules*.

### npm run dev

Will prepare the project's files as the *npm run dev-prepare*, then will execute the BrowserSync instance using live reload/injection.
Your default browser will open up at the end of this process and...

- For every typescript file change inside */ts* folder, a ts compile will run (using gulp-typescript) with an automatic browser reload at the end
- For every html/vue file change, the file will be copied to */build/[relative path]* and browser will reload.
- For every scss file change, a sass compile will run (using gulp-sass), compiling just the saved *.scss, the resulting css file will be copied to the */build/[relative path]* folder (respecting his original path inside */src*) and injected in page without reloading browser.

Check [BrowserSync](https://www.browsersync.io) for other related features.

### npm run release

Will prepare (**compile**) the project's files inside */src* folder to the */release* folder.

Note: The **minified** modules version (if provided, otherwise the maximized version will be used) defined in modules.json will be copied to */release/modules*.

### npm run release-preview

Will prepare the project's files as the *npm run release*, then will execute the BrowserSync instance just to preview the release build of the project.

## GulpConfig.js

This file, located on root folder, will export an instance of a class (EventEmitter) containing project's settings and used during build process.

You can edit this file or override one of the following properties:

| Param name        | Default value      | Description                                                                  |
| ----------------- | ------------------ | ---------------------------------------------------------------------------- |
| baseUrl           | /                  | Base url provided to browserSync instance and generated require.modules.json |
| modulesConfigFile | require.modules.js | Filename used for mapping file generated using modules.json                  |
| modulesUrl        | /modules/          | Http url to the modules folder                                               |
| srcFolder         | ./src              | Sources folder                                                               |
| developFolder     | ./build            | Build folder, used by scripts: dev-prepare, dev                              |
| releaseFolder     | ./release          | Release folder, used by scripts: release, release-preview                    |
| sassConfig        | ./sass.json        | Sass config file                                                             |

## Sass config file

Usually located on root folder, will provide the configuration for sass files watchers and bundles.

```json
{
	"global_watch": [ // << an array of glob paths, defining files needed to watch.

		"./src/components/**/*.scss",
		"./src/views/**/*.scss"
	],
	"bundles": [ // << an array of objects, where every object is a bundle.

		{
			"entry": "./src/main.scss", // the bundle entry point

			"watch": [ // the files to watch to generate this bundle

				"./src/main.scss",
				"./src/style/**/**.scss"
			]
		}
	]
}
```



## About .vue files

In my opinion, write a single file component is useful if this component is very simple...and for very simple things, vanilla javascript works good.

In this case, the [require-vuejs](https://github.com/edgardleal/require-vuejs) module is covering our needs.

While, when a component is increasing his complexity, reaching the need to be typed, i prefer to use separate set of files (.ts for source/definition, .html for templating, .scss for styling).

This is the reason why i'm not trying to code using typescript inside .vue files.
