module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {  //Tarea 1 a ejecutar. Ejecucion "grunt sass"
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',    //carpeta
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },
        browserSync: {
            dev: {
                bsFiles: { //Browserfiles
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './' //Directoriobase para nuestro servidor
                    }
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'imagenes/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/'
                }]
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        cssmin: {
            dist: { }
        },
        uglify: {
            dist: {}
        },
        filerev: {
            options: {
                    encoding: 'utf8',
                    algorithm: 'sha256',
                    length: 20
            },
            release: {
                // filerev:release hashes (sha256) all assets (images, js and css)
                // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html','about.html','precios.html','contacto.html','terminos.html'] //todos los html tienen que tener la invocación de build:js js/main.js y build:css dist/index.css homologada, homologada/igual en su contenido.
            },
            options: {
                flow: {
                    steps:{
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin: {
            html: ['dist/index.html','dist/about.html','dist/precios.html','dist/contacto.html','dist/terminos.html'],
            options: {
                assetsDir: ['dist', 'dist/css','dist/js'] 
            }
        }
    });

    //Los grunt loadNPMTask son reemplaados por require('jit-grunt')(grunt, ) al inicio del archivo
    //grunt.loadNpmTasks('grunt-contrib-watch'); //Habilitar biblioteca
    //grunt.loadNpmTasks('grunt-contrib-sass'); //Habilitar biblioteca
    //grunt.loadNpmTasks('grunt-browser-sync'); //Habilitar biblioteca
    //grunt.loadNpmTasks('grunt-contrib-imagemin'); //Habilitar biblioteca
    
    grunt.registerTask('css', ['sass']); 
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean', 
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

};