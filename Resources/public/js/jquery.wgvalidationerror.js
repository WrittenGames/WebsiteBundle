(function( $ )
{
  // http://extraordinarythoughts.com/2011/08/20/understanding-jquery-plugins/
  // http://scriptble.com/2011/02/expanding-the-jquery-plugin-development-pattern/
  // http://stackoverflow.com/questions/9746498/jquery-plugin-does-not-work-on-multiple-elements-options-overwritten
  $.fn.wgValidationError = function( options )
  {
    // Overridable settings
    var settings = $.extend(
    {
      'widget' : false
    }, options);
    // Internal settings
    settings.widget = false;
    settings.top = 0;
    settings.left = 0;
    
    // Private function
    var foo = function(){};
    
    // Public function
    this.rearrange = function(){};
    
    // Functionality
    return this.each( function()
    {
      var that = this;
      var h = parseInt( $( that ).parent().css( 'height' ) );
      var pt = parseInt( $( that ).parent().css( 'padding-top' ) );
      var top = h + pt;
      var popup = $( '<div/>' );
      popup.addClass( 'wg-validation-error-popup' );
      popup.html( 'Please fill this in!' );
      popup.css( 'top', top + "px" );
      popup.insertAfter( element );
      popup.click( function()
      {
        $( this ).fadeOut();
        if ( !settings.widget ) $( that ).focus();
      });
      if ( !settings.widget )
      {
        $( that ).focus( function()
        {
          $( '.validation-error-popup' ).fadeOut();
        });
      }
      else
      {
        
      }
    });
  };
})( jQuery );