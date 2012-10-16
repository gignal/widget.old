fs = require 'fs'
{exec} = require 'child_process'
UglifyJS = require 'uglify-js2'

run = (cmd) ->
	exec cmd, (err, stdout, stderr) ->
		throw err if err?
		console.log stdout + stderr

files = [
	# components
	'components/jquery/jquery.js'
	'components/jquery-masonry/jquery.masonry.min.js'
	'components/underscore/underscore-min.js'
	'components/backbone/backbone-min.js'
	'components/handlebars.js/handlebars.runtime-1.0.0-rc.1.js'

	# app
	'js/templates.js'
	'js/init.js'
	'js/models.js'
	'js/collections.js'
	'js/views.js'
	'js/router.js'
	'js/app.js'
]

file_out = 'all.min.js'

task 'compress', 'Uglify JavaScript', ->
	result = UglifyJS.minify files
	fs.writeFile file_out, result.code, (err) ->
		console.error err if err? 


task 'deploy', 'Push to server', ->
	run 'git commit -a'
	run 'git push origin gh-pages'
