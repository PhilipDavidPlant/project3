var gulp = require('gulp');
var argv = require('yargs').argv;
const template = require('gulp-template');
var rename = require("gulp-rename");

gulp.task('generate', () => {

    var type = argv.type;
    var name = argv.name;

    saveUrl = 'src/app/' + type + 's/' + name;

    templateUrl = 'gulp-templates/';

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

    console.log("generating using template:" + templateUrl);

    return gulp.src(templateUrl)
    .pipe(template({name: name, className: generateClassName(name,type), type: type}))
    .pipe(rename(name + '.' + type + '.ts'))
    .pipe(gulp.dest(saveUrl));

});

function generateClassName(name,type){
    nameParts = name.split("-");
    className = "";
    for( part of nameParts){
        className += capitalize(part);
    }
    className += capitalize(type);

    return className;
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