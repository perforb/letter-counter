/*!
 * Letter-Counter - jQuery plugin
 * Dynamic character count for text areas and input fields
 * version 1.0 (16-AUG-2011)
 * Copyright (c) 2011 perforb
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Depends the jQuery library: http://jquery.com
 * Examples and documentation at: https://github.com/perforb
 */
(function($) {

  $.letterCounter = {};
  $.letterCounter.INTERVAL = 100;
  $.letterCounter.isTextField = function(obj) {
    // This method checks the node type.
    // Only in case of the textarea and input field can you use this plugin.
    if (!$(obj).get(0).nodeName.match(/textarea|input/gi)) return false;
    if ($(obj).get(0).nodeName.match(/input/gi)) {
      if (!$(obj).get(0).type.match(/text|password/gi)) return false;
    }
    return true;
  };

  // These methods are added to the "jQuery.prototype".
  $.fn.extend({

    /**
     * This method counts the letters with limiter in real time.
     *
     * @param options This parameter is used for the layout and the validation.
     */
    limitLetterTo: function(options) {

      if (!$.letterCounter.isTextField(this)) return this;

      var defaults = {
        allowed:          140,
        warning:          25,
        counterElem:      'span',
        cssClass:         'counter',
        cssClassWarn:     'warning',
        cssClassExceeded: 'exceeded'
      };

      // merge options
      options = $.extend(defaults, options || {});

      var calculate = function(obj, opt, isInit) {

        function process(_obj, _opt) {
          var count = $(_obj).val().length;
          var available = _opt.allowed - count;
          if (available <= _opt.warning && available >= 0) {
            $(_obj).next().addClass(_opt.cssClassWarn);
          } else {
            $(_obj).next().removeClass(_opt.cssClassWarn);
          }
          if(available < 0){
            $(_obj).next().addClass(_opt.cssClassExceeded);
          } else {
            $(_obj).next().removeClass(_opt.cssClassExceeded);
          }
          $(_obj).next().html(available);
        }

        if (isInit) {
          process(obj, opt);
          return this;
        }

        // The timer ID is returned when scheduled processing has finished.
        return window.setInterval(function() {
          process(obj, opt);
        }, $.letterCounter.INTERVAL);
      };

      // behavior at rendering
      $(this).render(calculate, options);

      return this;
    },

    /**
     * This method counts the letters in real time.
     *
     * @param options This parameter is used for the layout.
     */
    countLetter: function(options) {

      if (!$.letterCounter.isTextField(this)) return this;

      var defaults = {
        counterElem: 'span',
        cssClass:    'counter'
      };

      // merge options
      options = $.extend(defaults, options || {});

      var calculate = function(obj, opt, isInit) {

        function process(_obj) {
          var count = $(_obj).val().length;
          $(_obj).next().html(count);
        }

        if (isInit) {
          process(obj);
          return this;
        }

        // The timer ID is returned when scheduled processing has finished.
        return window.setInterval(function() {
          process(obj);
        }, $.letterCounter.INTERVAL);
      };

      // behavior at rendering
      $(this).render(calculate, options);

      return this;
    },

    /**
     * Behavior at rendering.
     *
     * @param calculate calculate function.
     * @param options  layout and validation option.
     */
    render: function(calculate, options) {

      $(this).each(function() {

        // insert the element
        $(this).after('<' + options.counterElem + ' class="' + options.cssClass + '"></'+ options.counterElem +'>');

        // When screen is rendered.
        calculate(this, options, true);

        // on focus event
        $(this).focus(function() {
          $(this).data('counter', calculate(this, options, false));
        });

        // on blur event
        $(this).blur(function() {
          window.clearInterval($(this).data('counter'));
        });
      });
    }
  });
})(jQuery);
