const fs = require('fs')
const path = require('path')
const babel = require('rollup-plugin-babel')
const uglify = require('uglify-js')
const rollup = require('rollup')
const zlib = require('zlib')
const chalk = require('chalk')
const packageName = process.cwd().split(path.sep).pop()
const distDir = 'dist'
const srcDir = 'src'

const builds = [
    {
        entry: process.cwd() + '/src/main.js',
        dest: 'dist/' + packageName + '.js',
        name: packageName,
        plugins: [
            babel({
                exclude: 'node_modules/**'
            })
        ]
    },
    {
        entry: process.cwd() + '/src/main.js',
        dest: 'dist/' + packageName + '.min.js',
        name: packageName,
        mini: true,
        plugins: [
            babel({
                exclude: 'node_modules/**'
            })
        ]
    }
]

const build = (opts) => {
    let built = 0
    const total = builds.length
    if(!fs.existsSync(distDir)){
        if(fs.existsSync(srcDir)){
            fs.mkdir(distDir, () => {})
        }else{
            console.log()
            console.log(chalk.red("Run 'rop build' in right directory!"))
            console.log()
            return
        }
    }
    const next = () => {
      buildEntry(builds[built], opts).then(() => {
        built++
        if (built < total) {
          next()
        }
      }).catch(logError)
    }
  
    next()
}

const buildEntry = (config, opts) => {
    const inputOptions = {
        input: config.entry
    }
    const outputOptions = {
        file: config.dest,
        format: opts.format || 'umd',
        name: config.name
    }
    return rollup.rollup(inputOptions).then(async (bundle) => {
        const { code, map } = await bundle.generate(outputOptions)
        if(config.mini){
            var minified = uglify.minify(code)
            write(outputOptions.file, minified.code)
        }else{
            write(outputOptions.file, code)
        }
        console.log(chalk.green('Bundled success! Check ./dist'))
    })
}

const write = (dest, code) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, () => {
            zlib.gzip(code, () => {})
        })
    })
}

const logError = (e) => {
    console.log(chalk.red(e))
}

module.exports = build;