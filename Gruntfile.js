module.exports = function(grunt) {

    require('jit-grunt')(grunt, {
        sprite: 'pngsmith'
    });
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            front: {
                files: {
                    'css/style.css': 'styles/main.less'
                },
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapFilename: 'css/style.css.map',
                    sourceMapBasepath: 'css',
                    sourceMapURL: 'style.css.map',
                    sourceMapRootpath: '../'
                }
            },
            print: {
                files: {
                    'css/print.css': 'styles/print.less'
                },
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapFilename: 'css/style.css.map',
                    sourceMapBasepath: 'css',
                    sourceMapURL: 'style.css.map',
                    sourceMapRootpath: '../'
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 3 versions', 'ios 6', 'Safari 7', 'Safari 8']})
                ]
            },
            dist: {
                src: ['css/*.css']
            }
        },

        sprite: {
            normal: {
                src: 'img/design/sprite/src/*.png',
                dest: 'img/design/sprite/src/*.png',
                destImg: 'img/design/sprite/sprite.png',
                destCSS: 'styles/libs/sprite.less',
                imgPath: '../img/design/sprite/sprite.png?v=' + (new Date().getTime()),
                algorithm: 'binary-tree',
                padding: 50,
                engine: 'pngsmith',
                cssFormat: 'css',
                cssVarMap: function (sprite) {
                    sprite.name = 'sprite.sprite-' + sprite.name;
                },
                engineOpts: {
                    imagemagick: true
                },
                imgOpts: {
                    format: 'png',
                    quality: 90,
                    timeout: 10000
                },
                cssOpts: {
                    functions: false,
                    cssClass: function (item) {
                            return '.' + item.name;
                    },
                    cssSelector: function (sprite) {
                        return '.' + sprite.name;
                    }
                }
            },
            normalHover: {
                src: 'img/design/sprite/src-hover/*.png',
                dest: 'img/design/sprite/src-hover/*.png',
                destImg: 'img/design/sprite/sprite-hover.png',
                destCSS: 'styles/libs/sprite-hover.less',
                imgPath: '../img/design/sprite/sprite-hover.png?v=' + (new Date().getTime()),
                algorithm: 'binary-tree',
                padding: 50,
                engine: 'pngsmith',
                cssFormat: 'css',
                cssVarMap: function (sprite) {
                    sprite.name = 'sprite.sprite-' + sprite.name + ':hover';
                },
                engineOpts: {
                    imagemagick: true
                },
                imgOpts: {
                    format: 'png',
                    quality: 90,
                    timeout: 10000
                },
                cssOpts: {
                    functions: false,
                    cssClass: function (item) {
                            return '.' + item.name;
                    },
                    cssSelector: function (sprite) {
                        return '.' + sprite.name;
                    }
                }
            }
        },

        webfont: {
            normal: {
                src: 'img/design/svg/icon/*.svg',
                dest: 'img/design/svg/icon-font',
                destCss: 'styles/libs/',
                options: {
                    autoHint: false,
                    font: 'svg',
                    hashes: true,
                    types: 'eot,woff,ttf,svg',
                    engine: 'node',
                    stylesheet: 'less',
                    relativeFontPath: '../img/design/svg/icon-font',
                    fontHeight: '512',
                    descent: '0',
                    destHtml: 'docs',
                    templateOptions: {
                        baseClass: 'svg',
                        classPrefix: 'svg-',
                        mixinPrefix: 'svg-'
                    }
                }
            }
        },

        watch: {
            styles: {
                files: ['styles/**/*.less', '**/*.js', '**/*.html', 'img/design/sprite/src/**/*.png', 'img/design/svg/icon/**/*.png'],
                       tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            configFiles: {
                files: [ 'Gruntfile.js', 'config/*.js' ],
                options: {
                    reload: true
                }
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '**/*.css',
                        '**/*.js',
                        '**/*.html',
                        'img/design/sprite/src/**/*.png',
                        'img/design/svg/icon/**/*.png'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: "127.0.0.1:80/webXemel/",
                    reloadOnRestart: true, //Reload each browser when Browsersync is restarted.
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-webfont');

    // define default task
    grunt.registerTask('default', ['webfont', 'sprite', 'less', 'postcss']);
    grunt.registerTask('live', ['browserSync', 'watch']);

};
