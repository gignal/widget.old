fs = require 'fs'
{exec} = require 'child_process'
UglifyJS = require 'uglify-js'
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
	outdir: 'lib/'
	out: 'app.min.js'
	main: [
		'lib'
		'index.html'
		'images'
	]
		


task 'compress', 'Compress JavaScript', ->
	sourcemap = files.out + '.map'
	options =
		warnings: true
		outSourceMap: sourcemap
		sourceRoot: ''
	result = UglifyJS.minify files.in, options
	code = result.code
	#code += '\n//@ sourceMappingURL=' + sourcemap
	fs.writeFile files.outdir + files.out, code, (err) ->
		console.error err if err?
	# fs.writeFile files.outdir + sourcemap, result.map, (err) ->
	# 	console.error err if err?


task 'stylus', 'Compress Stylus', ->
	run 'stylus -c style/style.styl --out ' + files.outdir


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
