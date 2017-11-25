const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const sqlite = require('sqlite-sync');
const request =   require('request');
const restKey = ''; //incluir do OneSignal - por segurança, não disponibilizar esse valor
const appID = ''; //incluir do 'OneSignal  - por segurança, não disponibilizar esse valor



sqlite.connect('database.db');

	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({
		extended:true
	}));
	

	app.use(function(req,res, next){
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		next();
	});

	app.post('/', function(req,res){
		console.log(req.body);
		res.end();
		var id = sqlite.insert('sensorstemperature',req.body);
                console.log(id);   		
		//printar temperatura
		console.log("Temperatura em tempo real:");
		console.log(req.body.temperature);
		if(req.body.alerta=="yes")
		{
			console.log("Teve alerta!");
			
			var sendMessage = function(device, message){
		        request(
               		 {
                       		 method:'POST',
                       		 uri:'https://onesignal.com/api/v1/notifications',
                      		  headers: {
                               		 "authorization": "Basic "+restKey,
                               		 "content-type": "application/json"
                        },
                        json: true,
                        body:{
                                'app_id': appID,
                                'contents': {en: message},
                                'include_player_ids': Array.isArray(device) ? device : [device]
                        }
                },
                function(error, response, body) {
                        if(!body.errors){
                                console.log(body);
                        }else{
                                console.error('Error:', body.errors);
          		              }

              		  }
       			 );
			}

			sendMessage('62aa7f7a-c62e-4cba-9737-62fd68f010af', 'Perigo!Data: '+ req.body.time +'Id: '+req.body.id+' temperatura :'+req.body.temperature);
			sendMessage('1537b7e6-9af8-4280-97a4-043a2d886f74', 'Perigo!Data: '+ req.body.time +'Id: '+req.body.id+' temperatura :'+req.body.temperature);
			sendMessage('3976253a-f3ef-4c29-a467-e0aa1094cdd9', 'Perigo!Data: '+ req.body.time +'Id: '+req.body.id+' temperatura :'+req.body.temperature);


		}
	
	});

	app.get('/returnallsensors', function(req,res){
		sqlite.runAsync("SELECT DISTINCT id FROM sensorstemperature",function(rows){
		console.log(rows);
		res.json(rows);
		res.end();

		});
	});

	app.post('/getLastTemperatureById', function(req,res){
                console.log(req.body);
		var idreceived = req.body.id;
		console.log(idreceived);
		var aspas='"';
		var sqlcommand = "SELECT temperature,time,alerta FROM sensorstemperature WHERE id="+aspas+idreceived+aspas+" "+"and time=(SELECT MAX(time) FROM sensorstemperature where id="+aspas+idreceived+aspas+");";
		//console.log(sqlcommand);
		sqlite.runAsync(sqlcommand,function(rows){
                console.log(rows);
                res.json(rows);
                res.end();
                });

        });



	app.listen(8888, function(){
		console.log("Servidor rodando...");
	});


