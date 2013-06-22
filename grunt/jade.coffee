module.exports =

  # files options for local targets
  local_files: [{
      expand: true,
      cwd: '<%= yeoman.app %>'
      src: '{,*/}*.jade'
      dest: '<%= yeoman.tmp %>'
      ext: '.html'
    }]

  # files options for remote targets
  dist_files: [{
      expand: true,
      cwd: '<%= yeoman.app %>'
      src: '*.jade'
      dest: '<%= yeoman.dist %>'
      ext: '.html'
    }]

  #default options
  options:
    data:
      minJs: true
      appScripts: '<%= pkg.appScripts %>'
      __ENV__: '<%= envTarget() %>'
      version: '<%= pkg.version %>'

  #testing target
  dist:
    files: '<%= jade.dist_files %>'

  # local target used with grun server
  compile:
    options:
      data:
        minJs: false
        appScripts: '<%= pkg.appScripts %>'
        __ENV__: 'development'
        version: '<%= pkg.version %>'
        debug: false
    files: '<%= jade.local_files %>'
