<?php

namespace WG\WebsiteBundle\Twig\Extension;

use Twig_Extension;
use Twig_Function_Method;
use Twig_Function_Function;

class WebsiteExtension extends Twig_Extension
{
    public function getName()
    {
        return 'website_extension';
    }

    public function getFunctions()
    {
        return array(
            'one_in_array' => new Twig_Function_Method( $this, 'oneArrayElementInArray' ),
            'var_dump' => new Twig_Function_Function( 'var_dump' ),
        );
    }

    public function oneArrayElementInArray( $needles, $haystack )
    {
        $inArray = 0;
        foreach ( $needles as $needle )
        {
            if ( in_array( $needle, $haystack ) ) ++$inArray;
        }
        return $inArray ? $inArray : false;
    }
}
