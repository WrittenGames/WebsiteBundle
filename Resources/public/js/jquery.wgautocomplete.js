(function( $ )
{
  // TODO:
  // - Fix bug for list not disappearing on blur with empty field.
  // - Don't reload for narrowing down the options, do that client-side.
  $.fn.wgAutocomplete = function( options )
  {
    // Overridable settings
    var settings = $.extend(
    {
      'url'         : '/ajax/autocomplete',
      'table'       : 'User',
      'valueColumn' : 'username',
      'keyColumn'   : 'id',
      'timeout'     : 10000,
      'returns'     : true,
      'onSelected'  : function(){},
      'onSubmit'    : function(){}
    }, options);
    
    // Internal settings
    settings.requestIndex = 0;
    settings.listVisible = false;
    settings.selectedItem = false;
    
    // Functionality
    return this.each( function()
    {
      $( this ).attr( 'wg-selected-item', 0 );
      var selected = 0;
      $( this ).addClass( 'wg-autocomplete-input' );
      var parent = $( this ).parent();
      var container = $( '<div></div>' );
      container.addClass( 'wg-autocomplete-container' );
      var sibling = $( this ).next();
      $( this ).remove().appendTo( container );
      if ( sibling ) container.insertBefore( sibling );
      else parent.append( container );
      $( this ).blur( function()
      {
        var container = $( this ).closest( '.wg-autocomplete-container' );
        var listDiv = $( container ).find( '.wg-autocomplete-list' );
        var children = listDiv.children();
        var selected = $( this ).attr( 'wg-selected-item' );
        if ( settings.listVisible )
        {
          if ( selected > 0 ) $( children[selected-1] ).click();
          $( this ).attr( 'wg-selected-item', 0 );
          $( '.wg-autocomplete-list' ).hide();
        }
        settings.listVisible = false;
      });
      $( this ).keydown( function( e )
      {
        var container = $( this ).closest( '.wg-autocomplete-container' );
        var listDiv = $( container ).find( '.wg-autocomplete-list' );
        var children = listDiv.children();
        var input = $( container ).find( '.wg-autocomplete-input' );
        var selected = $( input ).attr( 'wg-selected-item' );
        $( children ).removeClass( 'wg-hovered' );
        switch ( e.keyCode )
        {
          case 38:  // up
            selected--;
            if ( selected < 0 ) selected = 0;
            if ( selected > 0 )
            {
              settings.selectedItem = children[selected-1];
              $( settings.selectedItem ).addClass( 'wg-hovered' );
            }
            $( input ).attr( 'wg-selected-item', selected );
            break;
          case 40:  // down
            selected++;
            if ( selected > children.length ) selected = children.length;
            settings.selectedItem = children[selected-1];
            $( settings.selectedItem ).addClass( 'wg-hovered' );
            $( input ).attr( 'wg-selected-item', selected );
            break;
          case 13:  // enter
            //console.log( 'list visible: ' + settings.listVisible );
            if ( settings.listVisible )
            {
              settings.listVisible = false;
              if ( settings.selectedItem )
              {
                //console.log( 'item selected: ' + $( settings.selectedItem ).html() );
                $( settings.selectedItem ).click();
              }
              else
              {
                //console.log( 'no item selected' );
                $( '.wg-autocomplete-list' ).hide();
              }
              $( input ).attr( 'wg-selected-item', 0 );
              return false;
            }
            var itemId = $( settings.selectedItem ).attr( 'wg-autocomplete-item-id' );
            var value = $( settings.selectedItem ).html();
            settings.onSubmit( itemId, value, this );
            return settings.returns;
        }
      });
      $( this ).keyup( function( e )
      {
        if ( $.inArray( e.keyCode, [13,38,40] ) != -1 ) return false;
        var query = $( this ).val();
        var parent = $( this ).parent();
        $( this ).attr( 'wg-selected-item', 0 );
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
            query:        query,
            requestIndex: ++settings.requestIndex
          },
          success:  function( response )
          {
            if (
              typeof response.requestIndex != 'undefined'
              && typeof response.data != 'undefined'
            )
            {
              if ( response.requestIndex == settings.requestIndex )
              {
                var data = response.data
                $( '.wg-autocomplete-list' ).remove();
                if ( data.length > 0 )
                {
                  var listDiv = $( '<div></div>' );
                  listDiv.addClass( 'wg-autocomplete-list' );
                  parent.append( listDiv );
                  settings.listVisible = true;
                  for ( var it in data )
                  {
                    var item = $( '<div></div>' );
                    item.addClass( 'wg-autocomplete-item' );
                    item.html( data[it][settings.valueColumn] );
                    item.attr( 'wg-autocomplete-item-id', data[it][settings.keyColumn] );
                    item.hover(
                      function()
                      {
                        settings.selectedItem = this;
                        var container = $( this ).closest( '.wg-autocomplete-container' );
                        var input = $( container ).find( '.wg-autocomplete-input' );
                        var selected = $( this ).index() + 1;
                        $( input ).attr( 'wg-selected-item', selected );
                        $( '.wg-autocomplete-item' ).removeClass( 'wg-hovered' );
                        $( this ).addClass( 'wg-hovered' );
                      },
                      function()
                      {
                        settings.selectedItem = false;
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
                      $( '.wg-autocomplete-list' ).hide();
                      settings.listVisible = false;
                      settings.selectedItem = false;
                      settings.onSelected( itemId, value, this );
                    });
                    listDiv.append( item );
                  }
                }
              }
            }
          },
          error: function( e ){}
        });
      });
    });
  };
})( jQuery );