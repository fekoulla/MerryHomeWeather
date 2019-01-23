const request = require('sync-request');

class WeatherController {

    constructor(io){
            this.io = io;
    }

    postAction(req, res){
        switch(req.params.actionId){
            case "isitsunnydate":
                var requestUrl="http://www.prevision-meteo.ch/services/json/";
                requestUrl += parseDataSend(req.body.searchLocation);
                requestUrl = requestUrl.substr(0, requestUrl.length-1);
                var weatherReq = request('GET', requestUrl,{cache:'file'});
                var response = JSON.parse(weatherReq.getBody('utf8'));

                if(!response){
                    res.end(JSON.stringify({resultText: "je n'ai pas d'informations"}));
                }else{
                    res.end(JSON.stringify({resultText: response}));
                }
                break;
            case "isitsunnylocation":
                var requestUrl="http://www.prevision-meteo.ch/services/json/";
                requestUrl += parseDataSend(req.body.searchLocation);
                requestUrl = requestUrl.substr(0, requestUrl.length-1);
                var weatherReq = request('GET', requestUrl,{cache:'file'});
                var response = JSON.parse(weatherReq.getBody('utf8'));

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

function parseDataSend(data){
	if(data.indexOf(" ")){
		var pieces = data.split(" ");
		data="";
		for ( var i in pieces){
			if(pieces[i].length>3){
				data += pieces[i].charAt(0).toUpperCase();
				data += pieces[i].substr(1);
				if(i!==pieces.length - 1){
					data+="_";
				}
			}
		}
	}
	return data;
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
