$(function() {

  var expanded = false;
  var isCountUp = false;
  var counter = countUp;
  var icon_angle = 0;
  var fps = 33;
  var limit = 140;
  var warning = 0;
  var timerID = undefined;

  function init() {
    resize();
    $('#letterCount').text($('#text').val().length);
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
      $('#letterCount').text($('#text').val().length);
      $('#letterCount').css('color', '#ccc');
    }, fps);
  }

  function countDown() {
    return window.setInterval(function() {
      var count = limit - $('#text').val().length;
      if (count < warning) {
        $('#letterCount').css('color', 'red');
      }
      else {
        $('#letterCount').css('color', '#ccc');
      }
      $('#letterCount').text(count);
    }, fps);
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
      click: function(){
        $('#counter').tooltip('destroy');
        icon_angle += 180;
        $(this).rotate({
          animateTo: icon_angle
        });
        if (isCountUp) {
          counter = countUp;
          isCountUp = !isCountUp;
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
          $('#text').focus().blur();
          $('#limit').val(limit);
          $(this).attr({
            title: 'countdown',
            'data-content': 'Count down the remaining letters.'
          });
          if (limit > 0) {
            $('#save').removeAttr('disabled');
          }
          $('#limit-modal').modal({
            keyboard: false
          });
          $('#limit').focus();
          $('#counter').tooltip({
            placement: 'right',
            trigger: 'hover',
            title: this.title
          });
        }
      }
    }
  });

  /* Modal */

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
  });

  //
  // Initialize
  // ======================

  init();

});
