var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
 
async function init (opt) {
    const dir = process.cwd() + '/' + opt
    const src = dir + '/src'
    await fs.mkdir(dir, () => {
            fs.mkdir(src, () => {
                fs.copyFileSync(path.join(__dirname, '..') + '/temp/main.js', src + '/main.js');
                fs.copyFileSync(path.join(__dirname, '..') + '/scripts/.babelrc', src + '/.babelrc');
            })
        })
    console.log(chalk.green('Created directory ' + opt))
}

module.exports = init
