<?php 
  $allowed_pages = array('home','app','risk','toy','solutions');
  if(isset($_GET['page']) && in_array($_GET['page'],$allowed_pages)) {
    $page = $_GET['page'];
  } else {
    $page = $allowed_pages[0];
  }
  if(!isset($_GET['passwd']) && $_GET['passwd'] != '832ceab0-8f66-11e0-91e4-0800200c9a66') {
    return;
  } else $password='&passwd=832ceab0-8f66-11e0-91e4-0800200c9a66';
?>
<!DOCTYPE html>
<html>
<?php require("content/header.html"); ?>
<body>
<!-- Section Container -->
<div id="app-container" class="<?php echo $page;?>">
<div id="app-header">
  <!-- titles -->
  <div id="title-holder">
    <h1><a href="index.php?page=home<?php echo $password;?>"><span class="sinarmas logo">Sinar Mass Under Investigation</span></a></h1>
    <h2><span class="sinarmas logo">How APP is toying with extinction</span></h2>
  </div>

  <!-- section navigation -->
  <div id="main-nav-holder">
    <div class="main nav">
      <ul class="level1">
        <li><a href="index.php?page=risk<?php echo $password;?>"<?php if($page=='risk'): ?> class="active"<?php endif; ?>><span>The Risks</span></a></li>
        <li><a href="index.php?page=app<?php echo $password;?>"<?php if($page=='app'): ?> class="active"<?php endif; ?>><span>SMG/APP</span></a></li>
        <li><a href="index.php?page=toy<?php echo $password;?>"<?php if($page=='toy'): ?> class="active"<?php endif; ?>><span>Toy Sector</span></a></li>
        <li><a href="index.php?page=solutions<?php echo $password;?>"<?php if($page=='solutions'): ?> class="active"<?php endif; ?>><span>Solutions</span></a></li>
      </ul>
<?php switch($page) : ?>
<?php case('app'): ?>
      <ul class="level2 js_places page-nav">
        <li class=""><a href="#overview" data-itemid="home" class="js_place first" id="overview"><span class="long">Sumatra Overview</span></a></li>
        <li class=""><a href="#bukit" data-itemid="04e57761-8d42-11e0-91e4-0" class="js_place" id="bukit"><span class="long">Bukit Tigapuluh</span></a></li>
        <li class=""><a href="#kermutan" data-itemid="04e57760-8d42-11e0-91e4-0" class="js_place" id="kermutan"><span>Kerumutan</span></a></li>
      </ul>
<?php break; ?>
<?php case('toy'): ?>
      <ul class="level2 page-nav">
        <li><a href="#intro" class="first" id="intro"><span class="long">Toy sector overview</span></a></li>
        <li><a href="#mattel" id="mattel"><span>Mattel</span></a></li>
        <li><a href="#disney" id="disney"><span>Disney</span></a></li>
        <li><a href="#others" id="others"><span>Others</span></a></li>
      </ul>
<?php break; ?>
<?php case('solutions'): ?>
      <ul class="level2 page-nav">
        <li><a href="#lowcarbon" class="first" id="lowcarbon"><span>Low Carbon</span></a></li>
      </ul>
<?php break; ?>
<?php case('risk'): ?>
      <ul class="level2 page-nav">
        <li><a href="#plannedloss" class="first" id="plannedloss"><span class="long">Planned loss</span></a></li>
      </ul>
<?php break; ?>
<?php endswitch; ?>
    </div>
  </div>
</div>

<?php require($page.'.php'); ?>

</div>
</div>
</body>
</html>
