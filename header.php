<?php
require_once('predis/autoload.php');
require_once('util4p/ReSession.class.php');
require_once('config.inc.php');
require_once('init.inc.php');
?>
<header id="header" class="navbar navbar-default">
	<div class="container">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
			        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="<?= BASE_URL ?>/">QuickAuth</a>
		</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li><a href="<?= BASE_URL ?>/">Main Page</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<?php if (!Session::get('username')) { ?>
					<li><a href="<?= BASE_URL ?>/register">Sign up</a></li>
					<li><a href="<?= BASE_URL ?>/login">Sign in</a></li>
				<?php } else { ?>
					<li><a href="<?= BASE_URL ?>/ucenter?profile"><?= htmlspecialchars(Session::get('username')) ?></a>
					</li>
					<li><a href="<?= BASE_URL ?>/ucenter">Explore</a></li>
				<?php } ?>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
					   aria-expanded="false">More<span class="caret"></span></a>
					<ul class="dropdown-menu">
						<?php if (Session::get('username')) { ?>
							<li><a href="<?= BASE_URL ?>/ucenter?notice">Notice&nbsp;<span class="badge">0</span></a>
							</li>
							<li><a href="<?= BASE_URL ?>/ucenter?home">Settings</a></li>
							<li><a href="javascript:void(0)" id="btn-signout-header">Sign out</a></li>
							<li role="separator" class="divider"></li>
						<?php } ?>
						<li><a href="<?= BASE_URL ?>/help">Help</a></li>
						<li><a href="<?= BASE_URL ?>/help#qid-1">About</a></li>
					</ul>
				</li>
			</ul>
		</div><!-- /.navbar-collapse -->
	</div><!-- /.container -->
</header>