<?php

namespace WG\WebsiteBundle\Email;

use \Swift_Message;

class Email
{
    protected $mailer;
    protected $systemEmailAdress;
    protected $websiteDomain;

    public function __construct( $mailer, $systemEmailAdress, $websiteDomain )
    {
        $this->mailer = $mailer;
        $this->systemEmailAdress = $systemEmailAdress;
        $this->websiteDomain = $websiteDomain;
}

    public function send( $to, $subject, $body, $from = null, $replyTo = null )
    {
        if ( strpos( $this->websiteDomain, '.local' ) !== false ) return;
        if ( !$from ) $from = $this->systemEmailAdress;
        if ( !$replyTo ) $replyTo = $from;
        $message = Swift_Message::newInstance()
                                    ->setContentType( 'text/html; charset=UTF-8' )
                                    ->setSubject( $subject )
                                    ->setFrom( $from )
                                    ->setReplyTo( $replyTo )
                                    ->setTo( $to )
                                    ->setBody( $body );
        return $this->mailer->send( $message );
    }
}
