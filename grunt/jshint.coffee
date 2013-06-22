module.exports =
  options:
    jshintrc: '.jshintrc'
  all: [
    '<%= yeoman.app %>/scripts/{,*/}*.js'
    '!<%= yeoman.app %>/scripts/vendor/*'
    'test/spec/{,*/}*.js'
  ]