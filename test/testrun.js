var container = $('<ul>');
var fixture = $('#qunit-fixture');

container.slideDownStream();

var s = container.data('slideDownStream');

test("basic", function() {
    ok('slideDownStream' in container, 'container has slideDownStream');
    equals(s.state, 'stop', 'state is stop');
    equals(s.queue.length, 0, 'queue length is 0');
    equals(container.children().size(), 0, 'container children size is 0');

    s.pushQueue( fixture.find('li') );
    equals(s.queue.length, 3, 'queue length is 3');
});

asyncTest("event", function() {
    expect(8);
    (function() {
        var count = 1;
        container.bind('sdstream.insert', function() {
            equals(s.queue.length, 3 - count);
            equals(container.children().size(), count);
            count++;
        });
    })();
    (function() {
        var count = 1;
        container.bind('sdstream.statechange', function() {
            if (count == 1) {
                equals(s.state, 'process');
            }
            else if (count == 2) {
                equals(s.state, 'wait');
            }
            if (count == 2) start();
            count++;
        });
    })();
    s.start();
});
