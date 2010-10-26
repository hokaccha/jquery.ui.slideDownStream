/*
 * jquery ui slideDownStream
 *
 * Copyright (c) 2010 Kazuhito Hokamura
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author   Kazuhito Hokamura (http://webtech-walker.com/)
 * @version  0.0.1
 *
 */

$.widget('ui.slideDownStream', {
    _queue: [],
    _state: 'stop',

    options: {
        slideDownSpeed: 300,
        intervalTime: 200,
        autoStart: true,
        startHandler: function() {},
        waitHandler: function() {},
        addHandler: function() {},
        pushHandler: function() {},
        stopHandler: function() {}
    },

    _init: function() {
        var self = this;

        if (self.options.autoStart) {
            self._state = 'wait';
        }
        
        return self;
    },
    add_queue: function(items) {
        var self = this;

        items.each(function() {
            self._queue.push( $(this).hide() );
        });
        self.options.addHandler.call(self.element);

        if (self._state == 'wait') self.start();

        return self;
    },
    clear_queue: function() {
        var self = this;

        self._queue = [];

        return self;
    },
    start: function() {
        var self = this;

        self._state = 'process';
        self.options.startHandler.call(self.element);
        (function loop() {
            if (self._state != 'process') return;

            var item = self._queue.shift();
            if (item) {
                self.element.prepend(item);
                item.slideDown(self.options.slideDownSpeed, function() {
                    self.options.pushHandler.call(self.element, item);
                    setTimeout(loop, self.options.intervalTime);
                });
            }
            else {
                self._state = 'wait';
                self.options.waitHandler.call(self.element);
            }
        })();

        return self;
    },
    stop: function() {
        var self = this;

        self._state = 'stop';
        self.options.stopHandler.call(self.element);

        return self;
    },
});
