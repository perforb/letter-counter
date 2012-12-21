$(function() {

  var expanded   = false,
      isCountUp  = false,
      counter    = countUp,
      icon_angle = 0,
      fps        = 33,
      limit      = 140,
      warning    = 0,
      timerID    = undefined;

  function init() {
    resize();
    $('#number').text($('#text').val().length);
    $("#text").focus();
    $('#save').attr('disabled','disabled');
  }

  function resize() {
    var height = $(window).height() - $('#header').outerHeight(true) - 50;
    $("#text").height(height);
  }

  function expand(options) {
    $('#text').animate({
      width: options.width + '%'
    }, {
      duration: options.duration || 'slow'
    });
  }

  function countUp() {
    return window.setInterval(function() {
      $('#number').text($('#text').val().length);
      $('#number').css('color', '#ccc');
    }, fps);
  }

  function countDown() {
    return window.setInterval(function() {
      calc();
    }, fps);
  }

  function calc() {
    var count = limit - $('#text').val().length;
    if (count < warning) {
      $('#number').css('color', 'red');
    }
    else {
      $('#number').css('color', '#ccc');
    }
    $('#number').text(count);
  }

  //
  // Events
  // ======================

  /* Textarea */

  $(window).resize(function() {
    resize();
  });

  $('#text').focus(function() {
    timerID = counter();
  });

  $('#text').blur(function() {
    clearInterval(timerID);
  });

  /* Resize button */

  $('.resize').tooltip({
    placement: 'right',
    trigger: 'hover'
  });

  $('.resize').click(function() {
    $('.tooltip').remove();
    $('.resize').toggle();
    if (expanded) {
      expand({
        width: 60
      });
      $('#text').focus();
      expanded = !expanded;
    }
    else {
      expand({
        width: 85
      });
      $('#text').focus();
      expanded = !expanded;
    }
  });

  /* Counter button */

  $('#counter').tooltip({
    placement: 'right',
    trigger: 'hover'
  });

  $('#counter').rotate({
    bind: {
      click: function() {
        $('#counter').tooltip('destroy');
        icon_angle += 180;
        $(this).rotate({
          animateTo: icon_angle
        });
        if (isCountUp) {
          counter = countUp;
          isCountUp = !isCountUp;
          $('.limit-unit').hide('slow');
          $(this).attr({
            title: 'countup',
            'data-content': 'Count up the letters.'
          });
          $('#text').focus();
          $('#counter').tooltip({
            placement: 'right',
            trigger: 'hover',
            title: this.title
          });
        }
        else {
          counter = countDown;
          isCountUp = !isCountUp;
          calc();
          $('#limit').val(limit);
          $('.limit-unit').slideDown(function() {
            $('#limit').focus();
          });
          $(this).attr({
            title: 'countdown',
            'data-content': 'Count down the remaining letters.'
          });
          $('#counter').tooltip({
            placement: 'right',
            trigger: 'hover',
            title: this.title
          });
          if (limit > 0) {
            $('#save').removeAttr('disabled');
          }
        }
      }
    }
  });

  /* Validation of limit number */

  $('#limit').keyup(function() {
    var num = parseInt($('#limit').val(), 10) || 0;
    if (num > 0) {
      limit = num;
      $('#save').removeAttr('disabled');
    }
    else {
      $('#save').attr('disabled','disabled');
    }
  });

  $('#save').click(function() {
    $('#text').focus();
    $('.limit-unit').hide('slow');
  });

  //
  // Initialize
  // ======================

  init();

});
