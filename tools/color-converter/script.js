function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  }

function rgbToHex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}

  (function($){
    var value = $('#hex').val();
      var result = "rgb("+hexToRgb(value).r+", "+hexToRgb(value).g+", "+hexToRgb(value).b+")";
      $('html, body').css('background', result);
      $('#result').val(result);
  }(jQuery));

  $('#hex').keyup(function(){
      var value = $(this).val();
      var result = "rgb("+hexToRgb(value).r+", "+hexToRgb(value).g+", "+hexToRgb(value).b+")";
      $('html, body').css('background', result);
      $('#result').val(result);
  });

 $('#result').keyup(function(){
      var rgb_value = $(this).val();
      $('#hex').val(rgbToHex(rgb_value));
      $('html, body').css('background', rgb_value);
  });