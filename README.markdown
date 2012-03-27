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

Available options include:

* table - (mandatory) the table which to be queried
* valueColumn - (mandatory) the string column to be queried for
* keyColumn - (optional) the key column, default is 'id'
* callback - (optional) a function that takes the following parameters: id, value, element
* url - (optional) if you want to use your own controller, use this option to set its URL
* timeout - (optional) set a timeout, defaults to 10 seconds

### Dialogue

This is a replacement for the built-in Javascript Alert, Confirm and Prompt
dialogues as a jQuery plugin.

...

### Loading status

Loading status indicator, modal and non-modal

...

## Authentication

...

## About

WGWebsiteBundle is a [Written Games](http://www.writtengames.com) project.