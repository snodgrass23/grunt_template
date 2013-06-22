lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

mountFolder = (connect, dir) ->
  connect.static(require('path').resolve(dir))

module.exports =
  options:
    port: 9000
    # change this to '0.0.0.0' to access the server from outside
    hostname: 'localhost'
    product_id: 221
  livereload:
    options:
      middleware: (connect) ->
        [
          lrSnippet,
          mountFolder(connect, '.tmp'),
          mountFolder(connect, 'app')
        ]
  test:
    options:
      middleware: (connect) ->
        [
          mountFolder(connect, '.tmp'),
          mountFolder(connect, 'test')
        ]
  dist:
    options:
      middleware: (connect) ->
        [
          mountFolder(connect, 'dist')
        ]