<!-- Voici les méthodes pour l'utilisation de l'objet JSON en Php : -->



<?php

$json = file_get_contents('http://www.prevision-meteo.ch/services/json/genk');
$json = json_decode($json);

echo $json->city_info->name;

 ?>

 <img src="<?php echo $json->current_condition->icon; ?>" width="45"
 height="45" />

<div style="width:510px;color:#000;border:1px solid #F2F2F2;">
Prévisions complètes pour <?php echo $json->city_info->name; ?>
</div>
