const fs = require('fs');

var dbData;
module.exports = (app) => {
    // API GET Requests
    app.get('/api/notes', (req, res) => {
      fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        dbData = JSON.parse(data);
        res.send(dbData);
      });
    });
    
    // API POST Requests
    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        let prevId = 0;
        for (let i=0; i< dbData; i++) {
          let noteID = dbData[i];
          if (noteID.id > prevId) {
            prevID = noteID.id;
          }
        }
        let newId = prevId + 1;
        newNote.id = newId;
        dbData.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(dbData), function (err)  {
          if (err) {
             return console.log(err);
          } else {
             console.log('New note saved')
           }
        });
        res.json(newNote);
      });

};