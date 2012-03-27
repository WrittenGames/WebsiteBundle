<?php

namespace WG\WebsiteBundle\Response;

class JsonResponseContainer
{
  public $requestIndex;
  public $data;

  public function __construct( $data, $requestIndex )
  {
    $this->data = $data;
    $this->requestIndex = $requestIndex;
  }
}
