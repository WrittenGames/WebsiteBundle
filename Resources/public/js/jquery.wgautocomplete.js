(function( $ )
{
  $.fn.wgAutocomplete = function( options )
  {
    var settings = $.extend(
    {
      'url'         : '/ajax/autocomplete',
      'table'       : 'User',
      'valueColumn' : 'username',
      'keyColumn'   : 'id',
      'timeout'     : 10000,
      'callback'    : function(){}
    }, options);
    
    return this.each( function()
    {
      var selected = 0;
      $( this ).addClass( 'wg-autocomplete-input' );
      var parent = $( this ).parent();
      var container = $( '<div></div>' );
      container.addClass( 'wg-autocomplete-container' );
      $( this ).remove().appendTo( container );
      parent.append( container );
      $( this ).keydown( function( e )
      {
        var children = $( '.wg-autocomplete-list' ).children();
        $( children ).removeClass( 'wg-hovered' );
        switch ( e.keyCode )
        {
          case 38:  // up
            selected--;
            if ( selected < 0 ) selected = 0;
            if ( selected > 0 )
            {
              $( children[selected-1] ).addClass( 'wg-hovered' );
            }
            break;
          case 40:  // down
            selected++;
            if ( selected > children.length ) selected = children.length;
            $( children[selected-1] ).addClass( 'wg-hovered' );
            break;
          case 13:  // enter
            $( children[selected-1] ).click();
            return false;
          default:
            break;
        }
      });
      $( this ).keyup( function( e )
      {
        if ( $.inArray( e.keyCode, [13,38,40] ) != -1 ) return false;
        var query = $( this ).val();
        var parent = $( this ).parent();
        $.ajax(
        {
          url:      settings.url,
          type:     'get',
          dataType: 'json',
          timeout:  settings.timeout,
          data:
          {
            table:        settings.table,
            valueColumn:  settings.valueColumn,
            keyColumn:    settings.keyColumn,
            query:        query
          },
          success:  function( response )
          {
            $( '.wg-autocomplete-list' ).remove();
            var listDiv = $( '<div></div>' );
            listDiv.addClass( 'wg-autocomplete-list' );
            parent.append( listDiv );
            for ( var it in response )
            {
              var item = $( '<div></div>' );
              item.addClass( 'wg-autocomplete-item' );
              item.html( response[it][settings.valueColumn] );
              item.attr( 'wg-autocomplete-item-id', response[it][settings.keyColumn] );
              item.hover(
                function()
                {
                  selected = $( this ).index() + 1;
                  $( '.wg-autocomplete-item' ).removeClass( 'wg-hovered' );
                  $( this ).addClass( 'wg-hovered' );
                },
                function() {$( this ).removeClass( 'wg-hovered' );}
              );
              item.click( function()
              {
                var itemId = $( this ).attr( 'wg-autocomplete-item-id' );
                var value = $( this ).html();
                var container = $( this ).closest( '.wg-autocomplete-container' );
                var input = $( container ).find( '.wg-autocomplete-input' );
                $( input ).val( value );
                settings.callback( itemId, value, this );
                $( '.wg-autocomplete-list' ).hide();
              });
              listDiv.append( item );
            }
          },
          error: function( e ){}
        });
      });
    });
  };
})( jQuery );