//import mediaModel from '../models/Media';
const {getAvatar, getRandomName, getColors} = require ('./../helpers/randomUser');
const mediaModel = require('../models/Media');

let connectedUsers = {};
let connectedUsers2 = [];

module.exports = function(socket){

    socket.on('send-message', function(message){
      socket.broadcast.emit('message', message)
    });

    socket.on( "register", function(username)
        {
            socket.username = username;
            connectedUsers[username] = socket;
            connectedUsers["iamfront"].emit('choixAffichage', 1);
            const nom = getRandomName();
            connectedUsers[username] = socket;
            console.log(connectedUsers);
            socket.emit('privateRegister', {nom, couleur:"dodgerblue",pattern:"cookie"});
        }

    )

    socket.on( "registerAdmin", function(username)
        {
            socket.username = username;
            connectedUsers["iamadminmedia"] = socket;
            //connectedUsers["iamfront"].emit('choixAffichage', 1);
            //const nom = getRandomName();
            //connectedUsers[username] = socket;
            //console.log(connectedUsers);
            //socket.emit('privateRegister', {nom, couleur:"dodgerblue",pattern:"cookie"});
        }

    )


    socket.on( "registerTel", function(username)
    {
        socket.username = username;
        const nom = getRandomName();
        connectedUsers[username] = socket;
        let data = [] ;
        data.push("you are now known as "+ nom ) ;
        data.push(2) ; 

        socket.emit('choixAffichageTel', data);
    }
    )

    socket.on( "registerTel", function(username)
    {

            let media = socket.media;
            let resultFormDb;
                  mediaModel
              .find()
              .then(dbRes => {
                  const randomMedias = []
                  for(let i =0; i < 4; i++){
                      let randomIndex = Math.floor(Math.random()*dbRes.length)
                      let randomMedia = dbRes[randomIndex];
                        randomMedias.push(randomMedia);
                        dbRes.splice(randomIndex, 1);
                    }
                    socket.emit('send-media',randomMedias)
              })
              .catch(err => {
                  console.log(err)
              });

            
    })   

    // émission du vote quand on demande un vote sur un média
    socket.on( "callForVoteMedia", function(username)
    {
        let media = socket.media;
        let resultFormDb;
              mediaModel
          .find()
          .then(dbRes => {
              const randomMedias = []
              for(let i =0; i < 4; i++){
                  let randomIndex = Math.floor(Math.random()*dbRes.length)
                  let randomMedia = dbRes[randomIndex];
                    randomMedias.push(randomMedia);
                    dbRes.splice(randomIndex, 1);
                }
                socket.emit('send-media',randomMedias)
          })
          .catch(err => {
              console.log(err)
          });
    })

    let monState = 0;

    socket.on('FrontSequenceur', function(sequenceValue){
        console.log("sequence", sequenceValue)
        connectedUsers["iamfront"].emit('choixAffichage', sequenceValue);
    });

    socket.on('TelSequenceur', function(sequenceValue){
        socket.broadcast.emit( 'sequence', sequenceValue);
    });


    socket.on('send-votes', function(votes){
        console.log(connectedUsers.length,"this is connected users")
        console.log("dans send votes")
        console.log(votes)
        //if ( monState < 2 ){
        //    connectedUsers["iamfront"].emit('choixAffichage', 2);
        //    monState = 3;
        //} else if ( monState == 3  ) {
        // let voteslist = [3, 5, 1, 5, 4];
            console.log("emetteur");
            connectedUsers["iamfront"].emit('votes', votes);

            monState = 4;
        //} else if ( monState == 4 ){
        //    connectedUsers["iamfront"].emit('choixAffichage', 3);
        //}
    });

    socket.on( "send-vote-media", function(media)
    {
        console.log('lemedia', media);
    }
    )
};

