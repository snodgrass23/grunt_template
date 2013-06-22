# Generated on 2013-04-27 using generator-webapp 0.1.5
'use strict'

module.exports = (grunt) ->
  # load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  # configurable paths
  yeomanConfig =
    app: 'app'
    dist: 'dist'
    tmp: '.tmp'

  try
    localConfig = JSON.parse(grunt.file.read('local.json'))
  catch e
    localConfig = {}

  localTasks = localConfig.tasks || [
      'clean:server',
      'jade:compile',
      'stylus:compile',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]

  grunt.initConfig({
    pkg: JSON.parse(grunt.file.read('package.json'))
    local: localConfig
    yeoman: yeomanConfig
    envTarget: () ->
      return this.grunt.task.current.nameArgs.split(":")[1] || "testing"

    # watch for changed files
    watch:    require('./grunt/watch.coffee')

    # serve files
    connect:  require('./grunt/connect.coffee')

    # open in browser
    open:     require('./grunt/open.coffee')

    # delete old files before new build
    clean:    require('./grunt/clean.coffee')

    # test files for jshint (not used yet)
    jshint:   require('./grunt/jshint.coffee')

    # run mocha tests (not used yet)
    mocha:    require('./grunt/mocha.coffee')

    # compile and minimize javascript files
    uglify:   require('./grunt/uglify.coffee')

    # direct copy assets like images that don't need compiled
    copy:     require('./grunt/copy.coffee')

    # get files from bower components
    bower:    require('./grunt/bower.coffee')

    #compile jade templates into html
    jade:     require('./grunt/jade.coffee')

    # compile stylus files
    stylus:  require('./grunt/stylus.coffee')

  })

  grunt.renameTask('regarde', 'watch')

  grunt.registerTask 'server', (target) ->
    if (target == 'dist')
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive'])

    grunt.task.run(localTasks)


  grunt.registerTask('build', [
    'clean:dist',
    'bower',
    'stylus:dist',
    "jade:dist",
    'uglify:dist',
    'copy:dist'
  ])

  grunt.registerTask('default', [
    # 'jshint',
    # 'test',
    'build'
  ])