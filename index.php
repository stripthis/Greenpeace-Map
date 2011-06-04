<?php 
  $allowed_pages = array('app','risk','toy','solutions');
  if(isset($_GET['page']) && in_array($_GET['page'],$allowed_pages)) {
    $page = $_GET['page'];
  } else {
    $page = $allowed_pages[0];
  }
?>
<!DOCTYPE html>
<html>
<?php require("content/header.html"); ?>
<body>
<!-- Section Container -->
<div id="app-container">
<div id="app-header">
  <!-- titles -->
  <div id="title-holder">
    <h1><span class="sinarmas logo">Sinar Mass Under Investigation</span></h1>
    <h2><span class="sinarmas logo">How APP is toying with extinction</span></h2>
  </div>

  <!-- section navigation -->
  <div id="main-nav-holder">
    <div class="main nav">
      <ul class="level1">
        <li><a href="index.php?page=risk"<?php if($page=='risk'): ?> class="active"<?php endif; ?>><span>The Risks</span></a></li>
        <li><a href="index.php?page=app"<?php if($page=='app'): ?> class="active"<?php endif; ?>><span>SMG/APP</span></a></li>
        <li><a href="index.php?page=toy"<?php if($page=='toy'): ?> class="active"<?php endif; ?>><span>Toy Sector</span></a></li>
        <li><a href="index.php?page=solutions"<?php if($page=='overview'): ?> class="active"<?php endif; ?>><span>Solutions</span></a></li>
      </ul>
<?php switch($page) : ?>
<?php case('app'): ?>
      <ul class="level2 js_places page-nav">
        <li class="concession"><a href="#overview" data-itemid="home" class="js_place first" id="overview"><span class="long">Sumatra Overview</span></a></li>
        <li class="concession"><a href="#bukit" data-itemid="04e57761-8d42-11e0-91e4-0" class="js_place" id="bukit"><span class="long">Bukit Tigapuluh</span></a></li>
        <li class="concession"><a href="#kermutan" data-itemid="04e57760-8d42-11e0-91e4-0" class="js_place" id="kermutan"><span>Kermutan</span></a></li>
      </ul>
<?php break; ?>
<?php endswitch; ?>
    </div>
  </div>
</div>

<?php require("content/map.html"); ?>

<div class="content-holder">
<?php require($page.'.php'); ?>
</div>

</div>
</div>
</body>
</html>
