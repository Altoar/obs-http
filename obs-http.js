const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
var express = require('express')
var app = express()
var inquirer = require('inquirer');
const colors = require('colors');

console.log('Before using this tool make sure you installed the WebSocket plugin on OBS')
inquirer
  .prompt([
    {
      type: 'input',
      name: 'obs_ip',
      message: "IP of OBS WebSocket Server (OBS PC)",
      default: function() {
        return 'localhost';
      }
    },
    {
      type: 'input',
      name: 'obs_port',
      message: "Port of OBS WebSocket Server",
      default: function() {
        return '4444';
      }
    },
    {
      type: 'password',
      message: 'Password of OBS WebSocket Server',
      name: 'obs_pw',
      mask: '*',
    },
    {
      type: 'input',
      name: 'express_port',
      message: "Local http listener port",
      default: function() {
        return '3000';
      }
    },
  ])
  .then(answers => {
    app.listen(answers.express_port)
    obs.connect({ address: answers.obs_ip+':'+answers.obs_port, password: answers.obs_pw });
  
    obs.on('ConnectionOpened', () => {
      console.log(`************ OBS successfully connected ************`.black.bgGreen)
    });

  })
  .catch(error => {
    console.log(error.red)
    if(error.isTtyError) {
    } else {
    }
  });


  //Http routes  
  app.get('/setitemvisible', function (req, res) {
    let scene = req.query.scene;
    let item = req.query.item;
    let visible = req.query.visible;
    
    if(typeof item == 'undefined' || typeof visible == 'undefined'|| typeof scene == 'undefined'){
      console.log('Error: No query params set in http command'.red);
      res.send('error')
      return 
    }
    visible = (visible == 'true');
    obs.send('SetSceneItemProperties', { 'scene-name' : scene, 'item': item, 'visible': visible}).then(data => {
      console.log(`Changed ${item.blue} in scene ${scene.blue} to visibility ${String(visible).blue}`)
    });
    res.send('success')
  })

  app.get('*', function (req, res) {
    res.send('OBS-HTTP is running! Path not found!')
  })
  
