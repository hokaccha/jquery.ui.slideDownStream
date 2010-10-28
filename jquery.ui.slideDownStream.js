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
    queue: [],
    state: 'stop',

    options: {
        slideDownSpeed: 200,
        intervalTime: 200,
        autoStart: true,
        pushQueueHandler: null,
        insertHandler: null,
        stateChangeHandler: null,
    },

    _init: function() {
        var self = this;

        if (self.options.autoStart) {
            self._change_state('wait');
        }
    },
    push_queue: function(items) {
        var self = this;
        var pushQueueHandler = self.options.pushQueueHandler;

        $.each(items, function(idx, item) {
            self.queue.push( $(item).hide() );
        });
        if (pushQueueHandler) {
            pushQueueHandler.call(self);
        }

        if (self.state == 'wait') self.start();
    },
    clear_queue: function() {
        var self = this;

        self.queue = [];
    },
    start: function() {
        var self = this;

        self._change_state('process');
        (function loop() {
            if (self.state != 'process') return;

            var item = self.queue.shift(),
                insertHandler = self.options.insertHandler;
            if (item) {
                self.element.prepend(item);
                item.slideDown(self.options.slideDownSpeed, function() {
                    if (insertHandler) {
                        insertHandler.call(self, item);
                    }
                    setTimeout(loop, self.options.intervalTime);
                });
            }
            else {
                self._change_state('wait');
            }
        })();
    },
    stop: function() {
        var self = this;

        self._change_state('stop');
    },
    _change_state: function(state) {
        var self = this;
        var stateChangeHandler = self.options.stateChangeHandler;

        self.state = state;
        if (stateChangeHandler) {
            stateChangeHandler.call(self);
        }
    }
});
