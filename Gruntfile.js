module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist : {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/main.css': 'assets/scss/main.scss'
                }
            } 
        },
        
        concat: {
            dist: {
                src: [
                    'assets/js/vendor/jquery-2.0.3.js',
                    'assets/js/vendor/raphael.js',
                    'assets/js/vendor/g.raphael-min.js',
                    'assets/js/vendor/g.pie.js',
                    'assets/js/items/*.js',
                    'assets/js/main.js'
                ],
                dest: 'public/js/app.js',
            }
        },
    
        uglify: {
            build: {
                src: 'public/js/app.js',
                dest: 'public/js/app.js'
            }
        },

        hashres: {
          // Global options
          options: {
            // Optional. Encoding used to read/write files. Default value 'utf8'
            encoding: 'utf8',
            // Optional. Format used to name the files specified in 'files' property.
            // Default value: '${hash}.${name}.cache.${ext}'
            fileNameFormat: '${name}-${hash}.${ext}',
            // Optional. Should files be renamed or only alter the references to the files
            // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
            // Default value: true
            renameFiles: true
          },
          // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
          prod: {
            // Specific options, override the global ones
            options: {
              // You can override encoding, fileNameFormat or renameFiles
            },
            // Files to hash
            src: [
              // WARNING: These files will be renamed!
              'public/js/app.js',
              'public/css/main.css'],
            // File that refers to above files and needs to be updated with the hashed name
            dest: 'public/index.html',
          }
        },
    
        watch: {
            scripts: {
                files: ['assets/js/*.js', 'assets/js/items/*.js'],
                tasks: ['concat', 'uglify', 'hashres'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass', 'hashres'],
                options: {
                    spawn: false,
                }
            }
        }
    
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['watch']);

};