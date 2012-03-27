<?php

namespace WG\WebsiteBundle\Response;

use Symfony\Component\HttpFoundation\Response;

class JsonResponse extends Response
{
  public function __construct( $data, $requestIndex = 0 )
  {
    $rc = new JsonResponseContainer( $data, $requestIndex );
    parent::__construct( json_encode( $rc ) );
  }
}
