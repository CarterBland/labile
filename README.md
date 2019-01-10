# Labile

<a href="https://npmcharts.com/compare/labile?minimal=true"><img src="https://img.shields.io/npm/dw/labile.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/labile"><img src="https://img.shields.io/npm/v/labile.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/labile"><img src="https://img.shields.io/npm/l/labile.svg" alt="License"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="License"></a>
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ee5fd04baefb4c64b712c97f4ea82f50)](https://app.codacy.com/app/CarterBland/labile?utm_source=github.com&utm_medium=referral&utm_content=CarterBland/labile&utm_campaign=Badge_Grade_Dashboard)

A blazing fast framework for creating modern user interfaces. Labile is a framework developed with simplicity in mind. We're looking for contributers, so feel free to open a PR! This is a learning project for me, and I hope to find people who want to learn with me while developing something really cool!

## Getting Started

### Installation
Install via npm
```
$ npm install labile
```

Then, just add the source script into your page
```html
<script src="/example/labile.min.js" type="text/javascript"></script>
```
### Usage
Javascript Example
```js
let reactiveComponent = new Labile({
  root: document.getElementsByTagName('body'),
  state: {
    counter: 0
  }
})

function incrementCounter() {
  reactiveComponent.state.counter++
}
```

HTML Example
```html
<body>
  <h1>You've clicked {{counter}} times</h1>
  <button onclick={{ incrementCounter() }}>Increment</button>
</body>
```

GIF in all it's primitiveness
![Example GIF](https://i.gyazo.com/ca8f16ee97c33df9a7f2ee9347fcef83.gif)
## Full Documentation
For documentation please visit our [documentation page](https://labile.io/documentation)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/CarterBland/labile/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/CarterBland/labile/tags). 

## Authors

* **[Carter Bland](https://carterbland.com)** - *Lead Developer* -

See also the list of [contributors](https://github.com/CarterBland/labile/graphs/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the website for details

## Acknowledgments

Special thanks to Vue and React for inspiring this framework!
