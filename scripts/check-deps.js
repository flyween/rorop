const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process');

const requiredDeps = ['node_modules', 'node_modules/babel-preset-latest', 'node_modules/babel-plugin-external-helpers']

const checkDeps = () => {
    let bool = false
    let dep = 0
    const total = requiredDeps.length

    const check = () => {
        if(!fs.existsSync(requiredDeps[dep])){
            console.log()
            console.log(chalk.red(requiredDeps[dep] + " doesn't exists!"))
            console.log()
            return
        }else{
            bool = true
        }
        dep ++
        if(dep < total){
            check()
        }
        return bool
    }

    if(!check()){
        console.log(chalk.yellow("Installing babel-preset-latest babel-plugin-external-helpers!"))
        console.log(chalk.yellow("Please wait!"))
        exec('npm i -D babel-preset-latest babel-plugin-external-helpers', (error, stdout, stderr) => {
            if(stdout){
                console.log()
                console.log(chalk.green("Dependencies installed!"))
                console.log()
                exec('rop build')
            }
        })
    }
    
    return bool
}

module.exports = checkDeps