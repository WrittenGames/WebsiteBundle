<?php

namespace WG\WebsiteBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class WGWebsiteBundle extends Bundle
{
    public function getNamespace()
    {
        return __NAMESPACE__;
    }
    
    public function getPath()
    {
        return strtr(__DIR__, '\\', '/');
    }
}
