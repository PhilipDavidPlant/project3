var gulp = require('gulp');
var argv = require('yargs').argv;
const template = require('gulp-template');
var rename = require("gulp-rename");
fs = require("fs");
var globalsUrl = '';
var componentClassName = '';
var name = '';
var type = '';

gulp.task('generate', (cb) => {

    type = argv.type;
    name = argv.name;

    saveUrl = 'src/app/' + type + 's/' + name;

    templateUrlTS = 'gulp-templates/';
    templateUrlHTML = 'gulp-templates/';
    templateUrlCSS = 'gulp-templates/';
    globalsUrl = './src/app/' + type + 's/' + type + '.globals.ts';

    switch(type){
        case 'form':
           templateUrl += 'form.template.ts';
        break;
        case 'part':
            templateUrl += 'part.template.ts';
        break;
        case 'view':
            templateUrl += 'view.template.ts';
        break;
        default:
            error('ERROR','No corresponding type for chosen template');
            return;
    }

    componentClassName = generateClassName(name,type);
    variableName = generateVariableName(name,type);

    if(type != 'view'){
        var globalsFile = fs.readFileSync(globalsUrl,'utf8');
        addToModule(globalsFile);
    }

    return gulp.src(templateUrl)
    .pipe(template({name: name, className: componentClassName, type: type, variableName:variableName}))
    .pipe(rename(name + '.' + type + '.ts'))
    .pipe(gulp.dest(saveUrl))

});

function addToModule(data){

    dataAsArray = data.split("");
    moduleImportString = "";

    for(var i=0; i< data.length; i++){
        if(data[i] === '@'){
            var moduleId = data.substring(i, i+9);

            if(moduleId === '@NgModule'){

                moduleImportString = "import { " + componentClassName + " } from './" + name + "/" + name + '.' + type + "';\n";

                dataAsArray.splice((i-3), 0, (moduleImportString));

            }
        }

        if(data[i] === 'i' && data[i+1] === 'm'){
            var importId = data.substring(i, i+7);
            console.log(importId);
            if(importId === "imports"){
                endOfImportsIndex = (i + 11 );
                dataAsArray.splice(endOfImportsIndex, 0, "\n        "+ componentClassName +",");
            }
        }

        if(data[i] === 'e' && data[i+1] === 'x'){
            var importId = data.substring(i, i+7);
            console.log(importId);
            if(importId === "exports"){
                endOfImportsIndex = (i + 12 );
                dataAsArray.splice(endOfImportsIndex, 0, "\n        "+ componentClassName +",");
            }
        }

        var saveString = dataAsArray.join("");
        fs.writeFile(globalsUrl, saveString, function(err) {
            if (err) return console.log(err);
        });
    }
}

function generateClassName(name,type){
    var nameParts = name.split("-");
    className = "";
    for( part of nameParts){
        className += capitalize(part);
    }
    className += capitalize(type);

    return className;
}

function generateVariableName(name,type){
    var nameParts = name.split("-");
    varName = "";
    for(var i=0; i < nameParts.length; i++){
        if(i == 0){
            varName += nameParts[i];
        }else{
            varName += capitalize(nameParts[i]);
        }
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function warning(title,message){
    console.log('\x1b[33m%s\x1b[0m:',title,message);
}

function error(title,message){
    console.log('\x1b[31m%s\x1b[0m:',title,message);
}