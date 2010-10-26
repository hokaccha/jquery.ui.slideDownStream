var container = $('<ul>');
var fixture = $('#qunit-fixture');

container.slideDownStream({
    pushHandler: function() {},
    waitHandler: function() {},
    autoStart: false
});

var s = container.data('slideDownStream');
s.add_queue( $('#push_list').find('li') );

test("basic", function() {
    ok('slideDownStream' in container, 'container has slideDownStream');
    equals(s._state, 'stop', 'state is stop');
    equals(s._queue.length, 3, 'queue length is 3');
});

asyncTest("asinc test", function() {
    s.options.waitHandler = function() {
        start();
        equals(s._state, 'wait', 'state is wait');
        equals(container.find('li').eq(0).text(), 'item8', 'first item value is item8');
    };
    s.start();
});
