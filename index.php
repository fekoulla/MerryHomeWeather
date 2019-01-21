

<?php

$json = file_get_contents('http://www.prevision-meteo.ch/services/json/antibes');
$json = json_decode($json);

?>

 <img src="<?php echo $json->current_condition->icon; ?>" width="45" height="45" />
 <br/>
 <br/>

<?php

echo "Il fait " .$json->current_condition->tmp. " degrés à " .$json->city_info->name. ".";
echo "<br/>";
echo "La vitesse du vent est de ". $json->current_condition->wnd_spd . " km/h.";
// echo
// $json->current_condition->wnd_dir

 ?>

<hr>


<!-- <div style="width:510px;color:#000;border:1px solid #F2F2F2;"> -->
Prévisions complètes pour <?php echo $json->city_info->name; ?>
