'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./source/style/**/*.*', $.gulp.series('sass'));
    // $.gulp.watch('./source/views/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./source/images/**/*.*', $.gulp.series('copy:image'));
    $.gulp.watch('./source/fonts/**/*.*', $.gulp.series('copy:fonts'));
    $.gulp.watch('./source/images/sprites/**/*.*', $.gulp.series('sprite'));
  });
};
