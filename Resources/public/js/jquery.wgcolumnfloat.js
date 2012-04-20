(function( $ )
{
  // http://extraordinarythoughts.com/2011/08/20/understanding-jquery-plugins/
  // http://scriptble.com/2011/02/expanding-the-jquery-plugin-development-pattern/
  // http://stackoverflow.com/questions/9746498/jquery-plugin-does-not-work-on-multiple-elements-options-overwritten
  $.fn.wgColumnFloat = function( options )
  {
    // Overridable settings
    var settings = $.extend(
    {
      'animated' : false,
      'onRearrange' : function(){}
    }, options);
    // Internal settings
    settings.columns = 2;
    
    // Private function
    var foo = function(){};
    
    // Public function
    this.rearrange = function(){};
    
    // Functionality
    return this.each( function()
    {
    });
  };
})( jQuery );