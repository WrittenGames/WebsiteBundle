<?php

namespace WG\WebsiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class DefaultController extends Controller
{
    public function indexAction( Request $request )
    {
        return $this->render('WGWebsiteBundle:Default:index.html.twig', array());
    }
    
    public function loginAction( Request $request )
    {
        return $this->render('WGWebsiteBundle:Default:login.html.twig', array());
    }
}
