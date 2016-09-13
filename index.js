'use strict'

const cson = require('cson')
const defaultsDeep = require('lodash.defaultsdeep')
const through2 = require('through2')
const gutil = require('gulp-util')
const File = require('vinyl')
const resolve = require('@nhz.io/ref-resolve')

const NAME = 'gulp-conf'
const NO_STREAMING = gutil.colors.red('Streaming is not supported!')

module.exports = function gulpConf(conf = {}, override = {}, unresolved = []) {
	let _conf = {}
	return through2.obj(
		function (file, enc, cb) {
			switch (true) {
				case !file || file.isNull():
					break

				case file.isStream():
					throw new gutil.PluginError(NAME, NO_STREAMING)

				case file.isBuffer(): {
					const chunk = cson.parse(file.contents.toString())
					if (chunk instanceof Error) {
						chunk.filename = gutil.colors.magenta(file.path)
						chunk.message = gutil.colors.red(chunk.message)
						throw new gutil.PluginError(NAME, chunk.toString())
					}
					defaultsDeep(_conf, chunk)
					break
				}

				default:
					break
			}
			cb()
		},

		function (cb) {
			unresolved.length = 0
			Object.assign(conf, defaultsDeep(override, resolve(_conf, unresolved)))
			_conf = {}

			unresolved.forEach(match => gutil.log(
				NAME,
				gutil.colors.yellow(`Unresolved reference: ${
					gutil.colors.cyan(match)
				}`)
			))

			cb()
		}
	)
}
