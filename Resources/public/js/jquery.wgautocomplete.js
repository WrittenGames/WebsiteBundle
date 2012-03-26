(function( $ )
{
  $.fn.wgAutocomplete = function( options )
  {
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend(
    {
      'url'       : '/',
      'callback'  : function(){}
    }, options);
    
    return this.each( function()
    {
      //...
    });
  };
})( jQuery );