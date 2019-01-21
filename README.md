Infos localité :

Nom de la localité        :         city_info->name
Latitude                  :         city_info->latitude
Longitude                 :         city_info->longitude
Altitude                  :         city_info->elevation
Heure de lever du soleil  :         city_info->sunrise
Heure de coucher du soleil:         city_info->sunset



Infos du point réel de la prévision :

Latitude                  :         forecast_info->latitude
Longitude                 :         forecast_info->longitude
Altitude                  :         forecast_info->elevation



Conditions actuelles :

Date                      :         current_condition->date
Heure                     :         current_condition->hour
Température               :         current_condition->tmp
Vitesse du vent           :         current_condition->wnd_spd
Vitesse du vent en rafale :         current_condition->wnd_gust
Direction du vent         :         current_condition->wnd_dir
Pression                  :         current_condition->pressure
Humidité                  :         current_condition->humidity
Conditions (texte) *      :         current_condition->condition
Icône                     :         current_condition->icon
Icône (grande)            :         Current_condition->icon_big



Prévisions J0 :

Date                      :         fcst_day_0->date
Jour (format court)       :         fcst_day_0->day_short
Température minimale      :         fcst_day_0->tmin
Température maximale      :         fcst_day_0->tmax
Conditions (texte) *      :         fcst_day_0->condition
Icône                     :         fcst_day_0->icon
Icône (grande)            :         fcst_day_0->icon_big



Données horaires :
Par exemple : 0H00

Icône                           :         Fcst_day_0->hourly_data->0H00->ICON
Conditions (texte) *            :         Fcst_day_0->hourly_data->0H00->CONDITION
Température [°C]                :         Fcst_day_0->hourly_data->0H00->TMP2m
Point de rosée [°C]             :         Fcst_day_0->hourly_data->0H00->DPT2m
Refroidissement éolien [°C]     :         Fcst_day_0->hourly_data->0H00->WNDCHILL2m
Humidité relative [%]           :         Fcst_day_0->hourly_data->0H00->RH2m
Pression atmosphérique [Hpa]    :         Fcst_day_0->hourly_data->0H00->PRMSL
Précipitations [mm]             :         Fcst_day_0->hourly_data->0H00->APCPsfc
Vitesse du vent à 10m [Km/h]    :         Fcst_day_0->hourly_data->0H00->WNDSPD10m
Rafales à 10m [Km/h]            :         Fcst_day_0->hourly_data->0H00->WNDGUST10m
Direction du vent [°]           :         Fcst_day_0->hourly_data->0H00->WNDDIR10m
Direction du vent               :         Fcst_day_0->hourly_data->0H00->WNDDIRCARD10
Type de précipitation           :         Fcst_day_0->hourly_data->0H00->ISSNOW
( [0 = pluie, 1 = neige] )
Nuages haute altitude           :         Fcst_day_0->hourly_data->0H00->HCDC
Nuages moyenne altitude         :         Fcst_day_0->hourly_data->0H00->MCDC
Nuages basse altitude           :         Fcst_day_0->hourly_data->0H00->LCDC
Isotherme zéro degré [°C]       :         Fcst_day_0->hourly_data->0H00->HGT0C
K-index (potentiel orageux)     :         Fcst_day_0->hourly_data->0H00->KINDEX
CAPE 180-0                      :         Fcst_day_0->hourly_data->0H00->CAPE180_0
CIN 180-0                       :         Fcst_day_0->hourly_data->0H00->CIN180_0



Prévisions :

Prévisions J1           :           fcst_day_1->XXX
Prévisions J2           :           fcst_day_2->XXX
Prévisions J3           :           fcst_day_3->XXX






Tâches (TODO LIST) : 

- Apprentissage de l’API prevision-meteo + tests
- Mise en place de OpenStreetMap (Vue + marker personnalisé)
- Météo en temps réel, température, vent, etc.
- Recherche météo par Ville
- Recherche météo par latitude
- Recherche météo par Code Postal
- Définition des expressions pour la recherche météo
- Mise en place du front
- Tests fonctionnels
- Schémas de tests
- Mise en production

