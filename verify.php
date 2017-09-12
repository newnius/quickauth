<?php 
	require_once('predis/autoload.php');
	require_once('util4p/util.php');
	require_once('util4p/ReSession.class.php');
	
	require_once('config.inc.php');
	require_once('init.inc.php');

	require_once('user.logic.php');

	$code = cr_get_GET('code', '');

	if(Session::get('username')===null)
	{
		header("location:login.php?callback=verify.php?code={$code}");
		exit;
	}

	$user = new CRObject();
	$user->set('username', Session::get('username'));
	$user->set('code', $code);
	$res = verify_email($user);
	if($res['errno']===0){
		header('location:ucenter.php');
	}else{
		header("location:login.php?callback=verify.php?code={$code}");
	}
