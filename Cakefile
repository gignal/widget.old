fs = require 'fs'
{exec} = require 'child_process'
UglifyJS = require 'uglify-js2'
stylus = require 'stylus'


run = (cmd, callback) ->
	exec cmd, (err, stdout, stderr) ->
		callback err, stdout + stderr


files = 
	in: [
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
	out: 'lib/all.min.js'
	css:
		in: 'css/style.stylus'
		out: 'lib/style.css'
	main: [
		'lib/style.css'
		'lib/all.min.js'
		'index.html'
		'images'
	]


# todo: handlebars
task 'compress', 'Compress JavaScript', ->
	result = UglifyJS.minify files.in
	fs.writeFile files.out, result.code, (err) ->
		console.error err if err?


task 'stylus', 'Compress Stylus', ->
	stylusSrc = fs.readFileSync files.css.in, 'utf8'
	options = {}
	stylus.render stylusSrc, options, (err, css) ->
		return console.error err if err?
		fs.writeFile files.css.out, result.code, (err) ->
			console.error err if err?


task 'deploy', 'Push to server', ->
	run 'git checkout gh-pages', (err, msg) ->
		return console.error err, msg if err? 
		cmd = 'git checkout master -- ' + files.main.join ' '
		run cmd, (err, msg) ->
			return console.error err, msg if err?
			run 'git commit -am "updates from master"', (err, msg) ->
				return console.error err, msg if err?
				run 'git push origin gh-pages', (err, msg) ->
					return console.error err, msg if err?
					run 'git checkout master', (err, msg) ->
						return console.error err, msg if err? 
