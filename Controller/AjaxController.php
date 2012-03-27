<?php

namespace WG\WebsiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AjaxController extends Controller
{
  public function autocompleteAction( Request $request )
  {
    if ( !$request->isXmlHttpRequest() ) throw new \Exception( 'Something went wrong.' );
    $table        = $request->get( 'table' );
    $valueColumn  = $request->get( 'valueColumn' );
    $keyColumn    = $request->get( 'keyColumn' );
    $query        = $request->get( 'query' );
    $connection = $this->get( 'database_connection' );
    $dql = "SELECT e." . $keyColumn . ", e." . $valueColumn . " "
         . "FROM " . $table . " e "
         . "WHERE e." . $valueColumn . " LIKE ? "
         . "ORDER BY e." . $valueColumn . " ASC";
    $attributes = $connection->fetchAll( $dql, array( $query . '%' ) );
    return new Response( json_encode( $attributes ) );
  }
}
