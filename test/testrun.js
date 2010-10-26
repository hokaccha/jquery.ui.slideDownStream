var container = $('<ul>');
var fixture = $('#qunit-fixture');

container.slideDownStream({
    autoStart: false,
});

var s = container.data('slideDownStream');

test("basic", function() {
    ok('slideDownStream' in container, 'container has slideDownStream');
    equals(s.state, 'stop', 'state is stop');
});

asyncTest("asinc test", function() {
    s.options.stateChangeHandler = function() {
        start();
        equals(s.state, 'process', 'state is process');
    };
    s.options.pushQueueHandler = function() {
        start();
        equals(s.queue.length, 3, 'length is 3');
    };
    s.push_queue( $('#push_list').find('li') );
    s.start();
});
