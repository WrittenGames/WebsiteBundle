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
      var formData = $( this ).serializeArray();
      //for ( var it in formData ) log( formData[it].name + ': ' + formData[it].value );
      $.ajax(
      {
        url: $( this ).attr( 'action' ),
        type: $( this ).attr( 'method' ),
        data: formData,
        dataType: settings.responseType,
        timeout: 10000,
        success: settings.success,
        error: settings.error
      });
    });
    return false;
  };
})( jQuery );