class TimeController {
	
        constructor(io){
            this.io = io;
		}
		
		getView(req, res){
			var dataView = require("./view");
			res.end(JSON.stringify(dataView));
		}
        
	postAction(req, res){
		var now = new Date();
		var response= "Il est "+now.getHours()+" heure "+now.getMinutes()+".";
		res.end(JSON.stringify({resultText: response}));
	}
}

module.exports = TimeController;