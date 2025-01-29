A simple webpack loader to replace all occurences of strings inside your files

## Usage :

`webpack.config.js`

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
            {
            loader: 'webpack-replace-string-loader',
            options: {
              matchingArray: [
                { match: 'Hello', replace: 'Bonjour' },
                { match: 'Earth', replace: 'Moon' }
              ]
            },
          },
        ],
      },
    ],
  },
};
```

Will transform 

```js
const myText = 'Hello, this is a test'
const answer = 'Hello test, this is the Earth'
```

to 

```js
const myText = 'Bonjour, this is a test'
const answer = 'Bonjour test, this is the Moon'
```
