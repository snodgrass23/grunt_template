module.exports =
  stylus:
    files: ['<%= yeoman.app %>/styles/{,*/}*.styl']
    tasks: ['stylus:compile']
  jade:
    files: ['<%= yeoman.app %>/{,*/}*.jade'],
    tasks: ['jade:compile']
  livereload:
    files: [
      '<%= yeoman.app %>/*.html',
      '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
      '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
      '{.tmp,<%= yeoman.app %>}/{,*/}*.html',
      '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
    ]
    tasks: ['livereload']
