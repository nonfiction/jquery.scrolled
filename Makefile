default: dist/jquery.scrolled.min.js

dist/jquery.scrolled.min.js: jquery.scrolled.js
	mkdir -p $(@D)
	uglifyjs $^ > $@
