$(function() {

  function init() {
    resize();
    $('#letterCount').text($('#text').val().length);
    $('#save').attr('disabled','disabled');
  }

  function resize() {
    var height = $(window).height() - $('#header').outerHeight(true) - 50;
    $("#text").height(height);
  }
  
  function broaden(options) {
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
      if (count <= warning) {
        $('#letterCount').css('color', 'red');
      }
      else {
        $('#letterCount').css('color', '#ccc');
      }
      $('#letterCount').text(count);
    }, fps);
  }

  //
  // Initialize
  // ======================

  init();

  //
  // Events
  // ======================

  var broadened = false;
  var toggleCounter = false;
  var counter = countUp;
  var fps = 33;
  var limit = 2000;
  var warning = 10;
  var timerID = undefined;

  $(window).resize(function() {
    resize();
  });

  $('.broaden').click(function() {
    $('.popover').remove();
    $('.broaden').toggle();
    if (broadened) {
      broaden({
        width: 60
      });
      $('#text').focus();
      broadened = !broadened;
    }
    else {
      broaden({
        width: 85
      });
      $('#text').focus();
      broadened = !broadened;
    }
  });

  $('.counter').click(function() {
    $('.popover').remove();
    $('.counter').toggle();
    if (toggleCounter) {
      counter = countUp;
      $('#text').focus();
      toggleCounter = !toggleCounter;
    }
    else {
      $('#limit').val(limit);
      $('#limit').focus();
      if (limit > 0) {
        $('#save').removeAttr('disabled');    
      }
      $('#limit-modal').modal({
        keyboard: false
      });
    }
  });

  $('#text').focus(function() {
    timerID = counter();
  });

  $('#text').blur(function() {
    clearInterval(timerID);
  });

  $('.broaden').popover({
    placement: 'right',
    trigger: 'hover'
  });

  $('.counter').popover({
    placement: 'right',
    trigger: 'hover'
  });

  $('#limit').change(function() {
    var num = parseInt($('#limit').val(), 10) || 0;
    if (num > 0) {
      limit = num;
      $('#save').removeAttr('disabled');    
    }
  });

  $('#save').click(function() {
    counter = countDown;
    $('#text').focus();
    toggleCounter = !toggleCounter;
  });
});
