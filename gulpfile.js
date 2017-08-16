var gulp = require('gulp');
var argv = require('yargs').argv;
const template = require('gulp-template');
var rename = require("gulp-rename");
var fs = require("fs");

var componentClassName = '';
var componentName = '';
var type = '';

var templateUrlTS = 'gulp-templates/';
var templateUrlHTML = 'gulp-templates/';
var templateUrlCSS = 'gulp-templates/';

var APIEndpoint = '';
var saveUrl = '';
var globalsUrl = '';

gulp.task('generate', () => {

    type = argv.type;
    componentName = argv.name;
    APIEndpoint = argv.endpoint;

    saveUrl = 'src/app/' + type + 's/' + componentName;
    globalsUrl = './src/app/' + type + 's/' + type + '.globals.ts';

    switch(type){
        case 'form':
           templateUrlTS += 'form.template.ts';
           templateUrlHTML += 'form.template.html';
        break;
        case 'part':
            templateUrlTS += 'part.template.ts';
        break;
        case 'view':
            templateUrlTS += 'view.template.ts';
        break;
        default:
            error('ERROR','No corresponding type for chosen template');
            return;
    }

    componentClassName = generateClassName(componentName,type);
    variableName = generateVariableName(componentName,type);

    if(type != 'view'){
        var globalsFile = fs.readFileSync(globalsUrl,'utf8');
        addToModule(globalsFile);
    }

    return gulp.src(templateUrlTS)
    .pipe(template({name: componentName, className: componentClassName, type: type, variableName:variableName}))
    .pipe(rename(componentName + '.' + type + '.ts'))
    .pipe(gulp.dest(saveUrl))

});

// gulp.task('generateTS', () => {

    return gulp.src('src/css/main.sass')
    .pipe(map(function(file, cb) {
      var fileContents = file.contents.toString();
      // --- do any string manipulation here ---
      fileContents = fileContents.replace(/foo/, 'bar');
      fileContents = 'First line\n' + fileContents;
      // ---------------------------------------
      file.contents = new Buffer(fileContents);
      cb(null, file);
    }))
    .pipe(gulp.dest('dist'));


// });

// gulp.task('generateHTML',() =>{
//     return gulp.src(templateUrlHTML)
//     .pipe(template({name: componentName, className: componentClassName, type: type, variableName:variableName}))
//     .pipe(rename(componentName + '.' + type + '.html'))
//     .pipe(gulp.dest(saveUrl))
// });

// gulp.task('generatesCSS',() =>{
//     return gulp.src(templateUrlCSS)
//     .pipe(template({name: componentName, className: componentClassName, type: type, variableName:variableName}))
//     .pipe(rename(componentName + '.' + type + '.css'))
//     .pipe(gulp.dest(saveUrl))
// });

// gulp.task('generateService', ()=>{

// });

function addToModule(data){

    dataAsArray = data.split("");
    moduleImportString = "";

    for(var i=0; i< data.length; i++){
        if(data[i] === '@'){
            var moduleId = data.substring(i, i+9);

            if(moduleId === '@NgModule'){

                moduleImportString = "import { " + componentClassName + " } from './" + componentName + "/" + componentName + '.' + type + "';\n";

                dataAsArray.splice((i-3), 0, (moduleImportString));

            }
        }

        if(data[i] === 'i' && data[i+1] === 'm'){
            var importId = data.substring(i, i+7);
            if(importId === "imports"){
                endOfImportsIndex = (i + 11 );
                dataAsArray.splice(endOfImportsIndex, 0, "\n        "+ componentClassName +",");
            }
        }

        if(data[i] === 'e' && data[i+1] === 'x'){
            var importId = data.substring(i, i+7);
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

    return varName;
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