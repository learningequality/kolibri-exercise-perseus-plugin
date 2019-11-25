/*
 * This file defines additional webpack configuration for this plugin.
 * It will be bundled into the webpack configuration at build time.
 */
var path = require('path');
var webpack = require('webpack');

const submodules = path.resolve(__dirname, '..', 'submodules')

const perseus_node_modules = path.resolve(submodules, 'perseus', 'node_modules');

process.env.NODE_PATH = process.env.NODE_PATH + path.delimiter + submodules + path.delimiter + perseus_node_modules + path.delimiter;
require('module').Module._initPaths();

module.exports = {
  bundle_id: 'main',
  webpack_config: {
    entry: 'assets/src/module.js',
    resolve: {
      modules: [perseus_node_modules]
    },
    resolveLoader: {
      modules: [perseus_node_modules]
    },
    module: {
      rules: [
        {
          test: /perseus\/[\w\/\-\_]*\.jsx?$/,
          loader: 'string-replace-loader',
          enforce: 'pre',
          options: {
            multiple: [
              // Replace url reference to spinner.gif to be in a findable location
              {
                search: '"url(/images/spinner.gif) no-repeat"',
                replace: '"url(/static/images/spinner.gif) no-repeat"'
              },
              // Replace ngettext style messages with ICU syntax
              {
                search: /%\(([\w_]+)\)s/,
                replace: '{ $1 }',
                flags: 'g'
              },
              // Replace this deletion of a local variable (illegal in strict mode)
              // With deletion of the variable from the window object
              {
                search: /delete Raphael;$/,
                replace: 'delete win.Raphael',
                flags: 'g'
              },
              // Remove an attempt to import jQuery from the window object, so that
              // it can be properly imported by the provide plugin
              {
                search: /jQuery \= window\.jQuery,/,
                replace: '',
                flags: 'g'
              },
              // Remove an attempt to import MathQuill from the window object, so that
              // it can be properly imported by the provide plugin
              {
                search: /const MathQuill \= window\.MathQuill;/,
                replace: '',
                flags: 'g'
              },
              // Remove an attempt to import i18n from the window object, so that
              // it can be properly imported by the provide plugin
              {
                search: /const i18n \= window\.i18n;/,
                replace: '',
                flags: 'g'
              },
              // Remove an attempt to reference katex from the window object, so that
              // it can be properly imported by the provide plugin
              {
                search: /window\.katex/,
                replace: 'katex',
                flags: 'g'
              },
            ]
          }
        },
        {
          // Use the perseus modified version of jsx loader to load any jsx files
          // and any files inside perseus src and math-input as they use
          // object spread syntax and need to be passed through babel
          test: /(perseus\/(src|math\-input)\/[\w\/\-\_]*\.jsx?$)|(\.jsx$)/,
          loader: path.join(__dirname, '..', "./submodules/perseus/node/jsx-loader.js"),
        },
        {
          test: /perseus\/lib\/kas\.js$/,
          loader: 'string-replace-loader',
          enforce: 'pre',
          options: {
            multiple: [
             {
              search: /\)\(KAS\)/,
              replace: ')(window.KAS)',
              flags: 'g',
             },
             // Remove autogenerated labeled function definition that is
             // disallowed in strict mode, and hence breaks buble transpilation.
             // See https://github.com/zaach/jison/issues/351 for more details.
             {
              search: /_token_stack:\n/,
              replace: '',
              flags: 'g',
             },
            ],
          },
        },
      ]
    },
    resolve: {
      alias: {
        // For some reason the jsx react component files are inside a folder call 'js'
        'react-components': 'react-components/js',
        'KAGlobals': path.resolve(path.join(__dirname, 'assets', 'src', 'KAGlobals')),
        'perseus': path.resolve(__dirname, '..', "submodules/perseus/")
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        // Use the provide plugin to inject modules into the scope of other modules
        // when those modules reference particular global variables
        // This allows us to make jQuery and other modules available without polluting our global scope
        jQuery: 'jquery',
        $: 'jquery',
        _: 'underscore',
        katex: 'perseus/lib/katex/katex',
        KAS: 'imports-loader?window=>{}!exports-loader?window.KAS!perseus/lib/kas',
        MathQuill: 'imports-loader?window=>{}!exports-loader?window.MathQuill!perseus/lib/mathquill/mathquill-basic',
        // 'window.icu': 'KAGlobals/icu',
        Exercises: 'KAGlobals/Exercises',
        Khan: 'KAGlobals/Khan',
        i18n: 'KAGlobals/i18n',
        $_: 'KAGlobals/$_',
        React: 'react',
      }),
    ],
  },
};
