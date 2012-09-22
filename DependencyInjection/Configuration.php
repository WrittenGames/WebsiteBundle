<?php

namespace WG\WebsiteBundle\DependencyInjection;

use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $node = $treeBuilder->root( 'wg_website' );
        $this->addDomainSection( $node );
        $this->addEmailSection( $node );
        return $treeBuilder;
    }
    
    private function addDomainSection( ArrayNodeDefinition $node )
    {
        $node
            ->children()
                ->scalarNode( 'domain' )
                    ->isRequired()
                    ->cannotBeEmpty()
                    ->defaultValue( 'localhost' )
                ->end()
            ->end()
        ;
    }
    
    private function addEmailSection( ArrayNodeDefinition $node )
    {
        $node
            ->children()
                ->arrayNode( 'email_addresses' )
                    ->children()
                        ->scalarNode( 'system' )->end()
                        ->scalarNode( 'webmaster' )->end()
                    ->end()
                ->end()
            ->end()
        ;
    }
}
