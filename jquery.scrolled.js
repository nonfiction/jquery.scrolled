(function($){
  var event_interval = 60    // max frequency of global scroll events
  ,   scroll_top = -1        // persistant reference to the distance scrolled
  ,   window_height = 0      // global reference to window height
  ,   scroll_callbacks = []  // all of the callbacks to be called on scroll events
  ;

  // normalize the body/html scrollTop() call
  function scrollTop() {
    var top = $('body').scrollTop();
    if (top == 0) { return $('html').scrollTop(); }
    else { return top; }
  }

  // recalculate globals and return whether a scroll happened
  function scrollTick() {
    var new_scroll = scrollTop();
    if (new_scroll !== scroll_top) {
      // recalculate window height on each frame
      window_height = $(window).height();
      scroll_top = new_scroll;
      return true;
    }
    return false;
  }

  // Shift an argument of a certain type off the array if available
  function shifted(args, kind) {
    return (args.length && typeof args[0] == kind) ? args.shift() : false;
  }

  //
  // The jQuery scrolled plugin - three API's are provided:
  //
  // $(window).on('scrolled', function(event, position){...})
  // $('#my-div').scrolled('body-class-to-toggle')
  // $('#my-div').scrolled(function in(){...}, function out(){...})
  //
  $.fn.scrolled = function(){
    var args = Array.prototype.slice.call(arguments)
    ,   $ref = this
    ,   class_name = shifted(args, 'string')
    ,   cb = shifted(args, 'function')
    ,   second_cb = shifted(args, 'function')
    ,   class_toggled = false
    ;

    if (class_name) {
      cb = function(){ $('body').addClass(class_name); }
      second_cb = function(){ $('body').removeClass(class_name); }
    }

    scroll_callbacks.push(function positionedElementTracker(top){
      var this_top = $ref.position().top - window_height;
      if (top > this_top && (!class_toggled)) {
        class_toggled = true;
        cb && cb(top);
        class_name && $('body').addClass(class_name);
      } else if (top < this_top && class_toggled) {
        class_toggled = false;
        second_cb && second_cb(top);
        class_name && $('body').removeClass(class_name);
      }
    });
    return this;
  }

  // timer loop
  setInterval(function(){
    if (scrollTick()) {
      for (var i = 0; i < scroll_callbacks.length; i++) {
        scroll_callbacks[i](scroll_top);
      };
      $(window).trigger('scrolled', scroll_top);
    }
  }, event_interval);

}(jQuery));
