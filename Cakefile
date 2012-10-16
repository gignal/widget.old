fs = require 'fs'
{exec} = require 'child_process'
UglifyJS = require 'uglify-js2'
git = require 'gift-plus'


run = (cmd) ->
	exec cmd, (err, stdout, stderr) ->
		throw err if err?
		console.log stdout + stderr


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
	main: [
		'lib/style.css'
		'lib/all.min.js'
		'index.html'
	]


# todo: handlebars
task 'compress', 'Compress JavaScript', ->
	result = UglifyJS.minify files.in
	fs.writeFile files.out, result.code, (err) ->
		console.error err if err?


task 'deploy', 'Push to server', ->
	repo = git '.'
	repo.checkout 'gh-pages', (err) ->
		return console.error err if err? 
		#repo.checkout 'master', files.main.join ' ', (err) ->
		run 'git checkout <branch_name> -- ' + files.main.join ' ', (err) ->
			return console.error err if err?
			console.log files.main.join ' '
			repo.commit 'wip', (err) ->
				return console.error err if err?
				run 'git push', (err) ->
					return console.error err if err?