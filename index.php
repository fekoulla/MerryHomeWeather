<!DOCTYPE html>
<html>
	<head>
        <meta charset="utf-8">

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
        integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin="" />
        <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
        integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>


        <script type="text/javascript">

            var lat = 48.852969;
            var lon = 2.349903;
            var macarte = null;

            function initMap()
            {
                macarte = L.map('map').setView([lat, lon], 11);
                L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
                {
                    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                    minZoom: 1,
                    maxZoom: 20
                }).addTo(macarte);
            }
            window.onload = function()
            {
                initMap();
            };
        </script>

		<style type="text/css">
			#map
            {
				height:400px;
                width: 600px;
			}
		</style>

		<title>MerryHomeWeather</title>

	</head>
	<body>

        <h2>Recherche par ville :</h2>
        <form action="index.php" method="post">
        Nom de la ville: <input type="text" name="ville" required><br>
        <input type="submit">
        </form>

        <br/>
        <h2>Recherche par géolocalisation :</h2>
        <form action="index.php" method="post">
        Latitude : <input type="text" name="latitude" required><br>
        Longitude : <input type="text" name="longitude" required><br>
        <input type="submit">
        </form>

        <?php

        if (isset($_POST['ville']) || (isset($_POST['latitude']) && isset($_POST['longitude'])))
        {
            if (isset($_POST['ville']))
            {
                $json = file_get_contents('http://www.prevision-meteo.ch/services/json/'.$_POST["ville"]);
                $json = json_decode($json);
            }
            else
            {
                $json = file_get_contents('http://www.prevision-meteo.ch/services/json/lat='.$_POST["latitude"].'lng='.$_POST["longitude"]);
                $json = json_decode($json);
            }

            echo "<br/><br/>";

            if (isset($_POST['ville']))
                echo "<h2>Prévisions complètes pour " . $json->city_info->name . " : </h2><br/>";
            else
                echo "<h2>Prévisions complètes pour la géolocalisation lat = " . $json->city_info->latitude . ",
                      long = " . $json->city_info->longitude . " : </h2><br/>";


            echo "Conditions de temps actuelles : " . $json->fcst_day_0->condition;
            echo "<img src='" .$json->current_condition->icon. "'/>";

            echo "<br/><br/>";

            echo "Il fait " .$json->current_condition->tmp. " degré(s) à " .$json->city_info->name. ".<br/>";
            echo "La vitesse du vent est de ". $json->current_condition->wnd_spd . " km/h.<br/>";
            echo "Le vent vient du ". $json->current_condition->wnd_dir . ".<br/>";
        }

        ?>

		<div id="map">
			<!-- Ici s'affichera la carte -->
		</div>
	</body>
</html>
