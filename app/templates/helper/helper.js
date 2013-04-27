(function() {

  module.exports.register = function(Handlebars, options) {
    
    Handlebars.registerHelper('sum', function() {
      var sum = 0
        , v
        // we need to get second last array (which all handlebars helper will receive an options hash)
        , precise = arguments[arguments.length - 2] || false; 
        // make sure
        precise = (typeof precise !== 'boolean') ? false : true; // make
      
      for (var i=0; i<arguments.length; i++) {
        v = parseFloat(arguments[i]);
        if (!isNaN(v)) sum += v;
      }

      if (!precise) {
        return sum;
      } else {
        number = sum+'';
        if (number < 1000) {
          return number;
        } else if (number < 10000) {
          return number.charAt(0) + ',' + number.substring(1);
        } else {
          return (number/1000).toFixed(number % 1000 != 0)+'k';
        }
      }

    });
    
    Handlebars.registerHelper('toK', function(number) {
      number = number+'';
      if (number < 1000) {
        return number;
      } else if (number < 10000) {
        return number.charAt(0) + ',' + number.substring(1);
      } else {
        return (number/1000).toFixed(number % 1000 != 0)+'k';
      }
    });
    
    Handlebars.registerHelper('encode', function(url) {
        return encodeURIComponent(url);
    });
    
  }

}).call(this);