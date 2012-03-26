(function( $ )
{
  $.fn.wgDialogue = function( options )
  {
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend(
    {
      'type'      : 'alert',
      'modal'     : true,
      'title'     : 'Written Games Dialogue',
      'callback'  : function(){}
    }, options);
    
    return this.each( function()
    {
      //...
    });
  };
})( jQuery );