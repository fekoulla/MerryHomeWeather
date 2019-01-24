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
                console.log(response);
                console.log(date);
                console.log(req.body.searchDate);

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
                }else if(date == 'dans 4 jours'){
                  response = response.fcst_day_4;
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

function parseDataResponse(response){
	if(response){
		if(response.query){
			for(var i in response.query.pages){
				if(response.query.pages[i].extract){
					if(response.query.pages[i].extract.indexOf('\n')!==-1){
						var textResponse= response.query.pages[i].extract.substr(0, response.query.pages[i].extract.indexOf('\n'));
					}else{
						var textResponse= response.query.pages[i].extract;
					}
					if(textResponse.length > 300){
							textResponse= textResponse.substr(0, textResponse.indexOf("."));
					}
					console.log(textResponse);
					return textResponse;
				}
			}
		}
		console.log(response);
	}
	return false;
}

module.exports = WeatherController;
