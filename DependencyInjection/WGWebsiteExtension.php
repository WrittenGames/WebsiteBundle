<?php

namespace WG\WebsiteBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

class WGWebsiteExtension extends Extension
{
    public function load( array $configs, ContainerBuilder $container )
    {
        // Configuration
        $configuration = new Configuration();
        $config = $this->processConfiguration( $configuration, $configs );
        // Services
        $fileLocator = new FileLocator( __DIR__ . '/../Resources/config' );
        $loader = new Loader\YamlFileLoader( $container, $fileLocator );
        $loader->load( 'services.yml' );
        // Set parameters
        $container->setParameter( 'wg.website.domain', $config['domain'] );
        if ( isset( $config['email_addresses'] ) && isset( $config['email_addresses']['system'] ) )
        {
            $container->setParameter( 'wg.website.email_addresses.system', $config['email_addresses']['system'] );
        }
        if ( isset( $config['email_addresses'] ) && isset( $config['email_addresses']['webmaster'] ) )
        {
            $container->setParameter( 'wg.website.email_addresses.webmaster', $config['email_addresses']['webmaster'] );
        }
    }
}
