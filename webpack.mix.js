let mix = require('laravel-mix');

mix.sass('resources/assets/sass/app.scss', 'public/css', {
    implementation: require('node-sass')
})
    .react('resources/assets/js/app.js', 'public/js');