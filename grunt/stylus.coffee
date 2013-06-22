module.exports =
  compile:
    files: {
      '<%= yeoman.tmp %>/styles/global.css' : '<%= yeoman.app %>/styles/global.styl'
    }

  dist:
    files: {
      '<%= yeoman.dist %>/styles/global.css' : '<%= yeoman.app %>/styles/global.styl'
    }

