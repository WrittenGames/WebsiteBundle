$( document ).ready( function()
{
  $( '.wg-tag-actions' ).hover(
    function() { showTagActionPopup( this ); },
    function() { hideTagActionPopup( this ); }
  );
});

/*''''''''''''''''''''''''''''''''''''''*\
|   Handler for displaying Tag actions   |
\*______________________________________*/

function showTagActionPopup( element )
{
    var popup = $( element ).closest( '.wg-tag' ).find( '.wg-tag-actions-popup' );
    popup.stop( true, true ).fadeIn();
}

function hideTagActionPopup( element )
{
    var popup = $( element ).closest( '.wg-tag' ).find( '.wg-tag-actions-popup' );
    popup.stop( true, true ).delay( 500 ).fadeOut();
}

/*''''''''''''''''''''''''''''''*\
|   Helper functions w/ jQuery   |
\*______________________________*/

function isIE()
{
  if ( $.browser.msie )
  {
    var str = $.browser.version;
    if ( !str ) return true;
    var pos = str.indexOf( "." );
    if ( pos < 0 ) return str;
    return str.substring( 0, pos );
  }
  return false;
}

function toggleElements( selector1, selector2 )
{
  if ( $( selector1 ).css( 'display' ) == 'none' )
  {
    $( selector1 ).show();
    $( selector2 ).hide();
  }
  else
  {
    $( selector1 ).hide();
    $( selector2 ).show();
  }
}

/*''''''''''''''''''''''''''''''''*\
|   Helper functions w/ plain JS   |
\*________________________________*/

// function isNumber written by
// http://stackoverflow.com/users/5445/cms
function isNumber( n )
{
  return !isNaN( parseFloat( n ) ) && isFinite( n );
}

function trim( str )
{
  str = "" + str;
  return str.replace(/^\s+|\s+$/g, '');
}

function dump( obj )
{
  if ( typeof obj == "object" )
  {
    return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + obj;
  } else {
    return "Type: "+typeof(obj)+"\nValue: "+obj;
  }
}

function isArray( obj )
{
  return typeof( obj )== 'object' && ( obj instanceof Array );
}

function log( str )
{
  if ( typeof console != 'undefined' ) console.log( str );
  else alert( str );
}

function getId( str )
{
  var pos = str.lastIndexOf( "_" );
  if ( pos < 0 ) return false;
  return str.substr( ++pos );
}
