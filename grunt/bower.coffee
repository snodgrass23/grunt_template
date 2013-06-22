module.exports =
  all:
    options:
      # if component name ends in ".js" don't add another .js to file
      stripJsAffix: true

    # put files in .tmp directory where uglify task will combine and compile them
    dest: '.tmp/components/'