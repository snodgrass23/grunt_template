module.exports =
  dist:
    options:

      # don't change function and variable names
      mangle: false
    files: [{

      # get all component files
      src: '<%= yeoman.tmp %>/components/*.js'
      dest: '<%= yeoman.dist %>/scripts/libs.js'
    },{

      # get array of app files from package.json file
      # needs to be array instead of search string because files
      # need to be loaded in order
      src: "<%= pkg.scripts %>"
      dest: '<%= yeoman.dist %>/scripts/main.js'
    }]