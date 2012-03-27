(function( $ )
{
  $.fn.wgAjaxForm = function( options )
  {
    var settings = $.extend(
    {
      'responseType'  : 'text',
      'timeout'     : 10000,
      'success'  : function(){},
      'error'     : function( e ){log( 'err: ' + dump( e ) );}
    }, options);
    
    this.each( function()
    {
      $.ajax(
      {
        url: $( this ).attr( 'action' ),
        type: $( this ).attr( 'method' ),
        data: $( this ).serializeArray(),
        dataType: settings.responseType,
        timeout: 10000,
        success: settings.success,
        error: settings.error
      });
    });
    return false;
  };
})( jQuery );