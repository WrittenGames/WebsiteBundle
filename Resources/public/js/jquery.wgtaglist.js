(function( $ )
{
  $.fn.wgTagList = function( options )
  {
    // Overridable settings
    var settings = $.extend(
    {
      'onUpdate' : function(){}
    }, options);
    // Internal settings
    settings.param = false;
    
    // Private function
    var foo = function(){};
    
    // Public function
    this.baa = function(){};
    
    // Functionality
    return this.each( function()
    {
    });
  };
})( jQuery );