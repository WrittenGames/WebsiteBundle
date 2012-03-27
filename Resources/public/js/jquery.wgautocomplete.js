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
      $( this ).attr( 'wg-selected-item', 0 );
      var selected = 0;
      $( this ).addClass( 'wg-autocomplete-input' );
      var parent = $( this ).parent();
      var container = $( '<div></div>' );
      container.addClass( 'wg-autocomplete-container' );
      $( this ).remove().appendTo( container );
      parent.append( container );
      $( this ).keydown( function( e )
      {
        var container = $( this ).closest( '.wg-autocomplete-container' );
        var children = $( container ).find( '.wg-autocomplete-list' ).children();
        var input = $( container ).find( '.wg-autocomplete-input' );
        var selected = $( input ).attr( 'wg-selected-item' );
        console.log( children );
        $( children ).removeClass( 'wg-hovered' );
        switch ( e.keyCode )
        {
          case 38:  // up
            console.log( 'started "up", decrementing "selected" from ' + selected );
            selected--;
            console.log( 'to ' + selected );
            if ( selected < 0 ) selected = 0;
            if ( selected > 0 )
            {
              console.log( '"selected" is greater 0, adding "wg-hovered" class to item' );
              $( children[selected-1] ).addClass( 'wg-hovered' );
              console.log( children[selected-1] );
            }
            else console.log( '"selected" equals 0' );
            $( input ).attr( 'wg-selected-item', selected );
            console.log( 'finished "up"' );
            break;
          case 40:  // down
            console.log( 'started "down", incrementing "selected" from ' + selected );
            selected++;
            console.log( 'to ' + selected );
            if ( selected > children.length ) selected = children.length;
            console.log( '"selected" is greater 0, adding "wg-hovered" class to item' );
            $( children[selected-1] ).addClass( 'wg-hovered' );
            console.log( children[selected-1] );
            $( input ).attr( 'wg-selected-item', selected );
            console.log( 'finished "down"' );
            break;
          case 13:  // enter
            $( children[selected-1] ).click();
            $( input ).attr( 'wg-selected-item', 0 );
            console.log( 'enter 0' );
            return false;
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
                  var container = $( this ).closest( '.wg-autocomplete-container' );
                  var input = $( container ).find( '.wg-autocomplete-input' );
                  var selected = $( this ).index() + 1;
                  $( input ).attr( 'wg-selected-item', selected );
                  $( '.wg-autocomplete-item' ).removeClass( 'wg-hovered' );
                  $( this ).addClass( 'wg-hovered' );
                },
                function()
                {
                  var container = $( this ).closest( '.wg-autocomplete-container' );
                  var input = $( container ).find( '.wg-autocomplete-input' );
                  $( input ).attr( 'wg-selected-item', 0 );
                  $( this ).removeClass( 'wg-hovered' );
                }
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