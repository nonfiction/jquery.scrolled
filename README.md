jquery.scrolled
===============

This plugin provides some hooks for dealing with the scroll position.

- A single buffered event stream publishing the scroll position
- Trigger callbacks or apply CSS classes on DOM element visibility

### Usage

```
// Listen to the scrolled event
$(window).on('scrolled', function(ev, position){
  $('#tracker-2').text(position);
});

// Add/remove class on DOM visibility
$('#my-div').scrolled('my-div-is-visible');

// Trigger callback on DOM visibility
$('#my-div').scrolled(function(x){
  $('#tracker').text('#my-div shown - ');
}, function(x){
  $('#tracker').text('#my-div hidden - ');
});
```

### Design Choices

`$(window).on('scroll')` can be a bit over the top for average usage. It is a
very high frequency event while scrolling, and it may fail to fire or produce
unexpected results when the page is refreshed.

This plugin only fires at most once every 60ms, and only if there has been a
change in the scroll position. This means that your callbacks can do a bit more
heavy lifting, if necessary. It also means that your callback is guaranteed to
run, even if the page is refreshed with a scroll position greater than 0.

'DOM visibility' tracks the element entering and leaving the bottom of the page.
The class name is added, or the first callback is called when the element
appears at the bottom of the page. The class is removed, or the second callback
is only called if the user scrolls back up and the element is no longer visible
at the bottom of the page.

### Demo

See the included `index.html` for a couple use cases. <http://nonfiction.github.io/jquery.scrolled/>
