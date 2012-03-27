WGWebsiteBundle
===============

The WGWebsiteBundle contains some common stuff needed in pretty much
all my website projects, so I might just as well create a bundle for it.

Features include mostly just various UI stuff for now.

Autocomplete
------------

A jQuery plugin and a Controller. Usage:

1. Add the routes as well as the JS & CSS files

2. Call the plugin function on any input element

```
$( '#myInputElement' ).wgAutocomplete(
{
  table: 'mytable',
  valueColumn: 'mycolumn',
  callback: function( key, value, element )
  {
    // Do something with the data provided
  }
});
```

About
-----

WGWebsiteBundle is a [Written Games](http://www.writtengames.com) project.