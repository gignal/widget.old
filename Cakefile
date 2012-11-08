fs = require 'fs'
{exec} = require 'child_process'
UglifyJS = require 'uglify-js2'
#stylus = require 'stylus'


run = (cmd, callback) ->
	exec cmd, (err, stdout, stderr) ->
		throw err if err?
		console.log stdout + stderr
		callback?()


files = 
	in: [
		# components
		'components/isotope/jquery.isotope.min.js'
		'components/underscore/underscore-min.js'
		'components/backbone/backbone-min.js'
		# app
		'javascript/init.js'
		'javascript/models.js'
		'javascript/collections.js'
		'javascript/views.js'
		'javascript/router.js'
		'javascript/app.js'
	]
	out: 'lib/all.min.js'
	main: [
		'lib/style.css'
		'lib/all.min.js'
		'index.html'
		'images'
	]


task 'compress', 'Compress JavaScript', ->
	result = UglifyJS.minify files.in
	fs.writeFile files.out, result.code, (err) ->
		console.error err if err?


task 'stylus', 'Compress Stylus', ->
	run 'stylus -c style/style.styl --out lib'


task 'deploy', 'Push to server', ->
	run 'git checkout gh-pages', ->
		cmd = 'git checkout master -- ' + files.main.join ' '
		run cmd, ->
			run 'git commit -am "updates from master"', ->
				run 'git push origin gh-pages', ->
					run 'git checkout master'


task 'update', 'Update NPM modules and Bower components', ->
	run 'npm update'
	run 'bower update'
