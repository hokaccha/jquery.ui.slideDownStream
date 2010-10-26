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
        slideDownSpeed: 200,
        intervalTime: 200,
        autoStart: true,
        pushQueueHandler: null,
        insertHandler: null
    },

    _init: function() {
        var self = this;

        if (self.options.autoStart) {
            self._state = 'wait';
        }
    },
    push_queue: function(items) {
        var self = this;
        var pushQueueHandler = self.options.pushQueueHandler;

        items.each(function() {
            self._queue.push( $(this).hide() );
        });
        if (pushQueueHandler) {
            pushQueueHandler.call(self.element);
        }

        if (self._state == 'wait') self.start();
    },
    clear_queue: function() {
        var self = this;

        self._queue = [];
    },
    start: function() {
        var self = this;

        self._state = 'process';
        (function loop() {
            if (self._state != 'process') return;

            var item = self._queue.shift(),
                insertHandler = self.options.insertHandler;
            if (item) {
                self.element.prepend(item);
                item.slideDown(self.options.slideDownSpeed, function() {
                    if (insertHandler) {
                        insertHandler.call(self.element, item);
                    }
                    setTimeout(loop, self.options.intervalTime);
                });
            }
            else {
                self._state = 'wait';
            }
        })();
    },
    stop: function() {
        var self = this;

        self._state = 'stop';
    }
});
