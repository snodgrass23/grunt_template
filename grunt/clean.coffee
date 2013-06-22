module.exports =

  # remove files from both tmp and dist for build targets
  dist: ['.tmp', '<%= yeoman.dist %>/*']

  # only remove files in .tmp for grunt server
  server: '.tmp'