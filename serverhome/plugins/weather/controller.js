const request = require('sync-request');

class WeatherController {

    constructor(io){
            this.io = io;
    }

    getView(req, res){
        var dataView = require("./view");
        res.end(JSON.stringify(dataView));
        // var path = require("path");
        // res.sendFile(path.join(__dirname, '../client-react/src/', 'view.js'));
    }

    postAction(req, res){
        switch(req.params.actionId){
            case "isitsunnydate2":
            case "isitsunnydate":
                var requestUrl="http://www.prevision-meteo.ch/services/json/";
                requestUrl += req.body.searchLocation;
                var weatherReq = request('GET', requestUrl,{cache:'file'});
                var response = JSON.parse(weatherReq.getBody('utf8'));

                //Enlève le _ du searchDate
                var date = req.body.searchDate;

                if(date == 'maintenant'){
                  response = response.current_condition;
                }else if(date == 'aujourd\'hui'){
                  response = response.fcst_day_0;
                }else if(date == 'demain'){
                  response = response.fcst_day_1;
                }else if(date == 'après-demain'){
                  response = response.fcst_day_2;
                }else if(date == 'dans 3 jours'){
                  response = response.fcst_day_3;
                }else if(date == 'dans trois jours'){
                  response = response.fcst_day_3;
                }else if(date == 'dans 4 jours'){
                  response = response.fcst_day_4;
                }else{
                  response = "Nous n'avons pas d'informations concernant cette date"
                }

                if(!response){
                    res.end(JSON.stringify({resultText: "je n'ai pas d'informations"}));
                }else{
                    res.end(JSON.stringify({resultText: response}));
                }
                break;
            default:
                res.end(JSON.stringify({}));
                break;
        }
    }
}

module.exports = WeatherController;
