const fs = require('fs');
const path = require('path');

export const addGame = (gameId) => {
    const dataPath = path.join(__dirname, 'user_data.js');
    
    // Read the existing file
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Modify the existing data
        let users = eval(data);
        users[0].attended_games.push(gameId);

        // Convert the updated array back to a string to be saved
        const updatedData = `module.exports = ${JSON.stringify(users, null, 4)};`;

        // Save the modified data back to the file
        fs.writeFile(dataPath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log('File updated successfully!');
            }
        });
    });
}

export const removeGame = (gameId) => {
    const dataPath = path.join(__dirname, 'user_data.js');
    
    // Read the existing file
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Modify the existing data
        let users = eval(data);
        users[0].attended_games.splice(users[0].attended_games.indexOf(gameId), 1);
        
        // Convert the updated array back to a string to be saved
        const updatedData = `module.exports = ${JSON.stringify(users, null, 4)};`;

        // Save the modified data back to the file
        fs.writeFile(dataPath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log('File updated successfully!');
            }
        });
    });
}
