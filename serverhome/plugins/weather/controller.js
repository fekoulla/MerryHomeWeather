
const request = require('sync-request');
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://www.prevision-meteo.ch/services/json/';

class WeatherController {

    constructor(io){
            this.io = io;
            io.sockets.on('connection', function(socket){
                socket.on('weathersearch', function(searchvalue){
                    console.log("wearthersearch "+searchvalue);
                    var isTable=true;
                    rp(url+searchvalue)
                    .then(function(html) {
                        var title= $('.firstHeading', html).text();
                        var infos = $('.infobox_v2', html).html();
                        if(!infos){
                            infos= $('.infobox_v3', html).html();
                            if(!infos){
                                infos=$('.mw-parser-output', html).html();
                                isTable= false;
                            }
                        }
                        socket.emit('weatherresult', {title: title, infos: infos, isTable: isTable});
                    })
                    .catch(function(err) {
                      //handle error
                    });
                });
            });
    }

    getView(req, res){
        var dataView = {
            "type" : "Weather"
        };
        res.end(JSON.stringify(dataView));
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
