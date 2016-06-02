# Express Template
Express template for new projects. This template uses:
- [node-sass](https://github.com/sass/node-sass, "node-sass")
- [autoprefixer](https://github.com/postcss/autoprefixer, "autoprefixer")
- [uglify](https://github.com/mishoo/UglifyJS2, "UglifyJS2")
- [imagemin](https://github.com/imagemin/imagemin, imagemin)
- [tape](https://github.com/substack/tape, "tape")
- [winston](https://github.com/winstonjs/winston, "winston")

As soon as you clone, make sure you perform the following actions:

1. Edit package.json
  1. Add a project name and a description
  2. Change your repository and bugs URLs
  3. Add some keywords
2. Uncomment the lines ".eslintrc" and ".env" in .gitignore
  1. _Optional_: Remove .gitignore files in logs public/css public/js and public/img
3. Change the title in routes/index.js
4. Run
``` bash
npm install
```
5. Change de favicon files in src/img/favicon
6. Erase example test from tests

Now you're ready to go.
