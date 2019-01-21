<form action="index.php" method="post">
Nom de la ville: <input type="text" name="ville"><br>
<input type="submit">
</form>

<?php

if (isset($_POST['ville'])){
    $json = file_get_contents('http://www.prevision-meteo.ch/services/json/'.$_POST["ville"]);
    $json = json_decode($json);
}


?>

 <img src="<?php echo $json->current_condition->icon; ?>" width="45" height="45" />
 <br/>
 <br/>

<?php

echo "Il fait " .$json->current_condition->tmp. " degré(s) à " .$json->city_info->name. ".<br/>";
echo "La vitesse du vent est de ". $json->current_condition->wnd_spd . " km/h.<br/>";
echo "Le vent vient du ". $json->current_condition->wnd_dir . ".<br/>";

 ?>

<hr>


<!-- <div style="width:510px;color:#000;border:1px solid #F2F2F2;"> -->
Prévisions complètes pour <?php echo $json->city_info->name; ?>
