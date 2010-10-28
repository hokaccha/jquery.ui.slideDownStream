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

(function($) {

$.widget('ui.slideDownStream', {
    queue: [],
    state: 'stop',

    options: {
        slideDownSpeed: 200,
        intervalTime: 200,
        autoStart: false
    },

    _init: function() {
        var self = this;

        self.widgetEventPrefix = 'sdstream.';

        if (self.options.autoStart) {
            self._change_state('wait');
        }
    },
    pushQueue: function(items) {
        var self = this;

        $.each(items, function(idx, item) {
            self.queue.push( $(item).hide() );
        });

        if (self.state == 'wait') self.start();
    },
    clearQueue: function() {
        var self = this;

        self.queue = [];
    },
    start: function() {
        var self = this;

        self._change_state('process');
        (function loop() {
            if (self.state != 'process') return;

            var item = self.queue.shift();
            if (item) {
                self.element.prepend(item);
                item.slideDown(self.options.slideDownSpeed, function() {
                    self._trigger('insert');
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

        self.state = state;
        self._trigger('statechange');
    }
});

})(jQuery);
