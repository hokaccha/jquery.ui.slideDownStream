# jquery.ui.slideDownStream

## overview

This is jQuery Plugin using $.widget. slideDown animation is added to queue and it processes it sequentially.

demo site url:
https://dl.dropbox.com/u/336104/js/jquery-ui-slideDownStream/sample/index.html

## options

### slideDownSpeed

Slide down animation speed. Same as second argument of jQuery.slideDown.

### intervalTime

Waiting time until the following element is added.

### autoStart

if this option is true, start state is wait. default is false.

## event

### sdstream.insert

This event is triggered when slide down end.

### sdstream.statechange

This event is triggered when state change.

## property

### queue

Item list.

### state

Now state. value is process or wait or stop. `process` is processing queue. `wait` is waiting added queue. `stop` dosent process added queue.

## method

### pushQueue(jQueryObject)

Push item in Queue. Argument should be jQuery object.

### clearQueue

Clear queue values.

### start

Change state process or wait.

### stop

Change state to stop.
