WGWebsiteBundle
===============

The WGWebsiteBundle contains some common stuff needed in pretty much all
my website projects, so I thought I might as well create a bundle for it.

Features include mostly just various skinnable UI stuff for now.

## UI Components

### Autocomplete

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

### Dialogue

This is a replacement for the built-in Javascript Alert, Confirm and Prompt
dialogues as a jQuery plugin.

...

## Authentication

...

## About

WGWebsiteBundle is a [Written Games](http://www.writtengames.com) project.