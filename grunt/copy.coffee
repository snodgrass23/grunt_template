module.exports =
  dist:
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: [
        '*.{ico,txt}',
        '.htaccess',
        'favicon.ico',
        'data/**',
        'images/**',
        'styles/icons/**',
        'styles/images/**',
        'styles/resources/**',
        'public/**'
      ]
    }
    ]