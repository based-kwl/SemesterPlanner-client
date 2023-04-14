const fs = require('fs');

module.exports = (on) => {
    on('task', {
        deleteFolder (folderName) {
            console.log('deleting folder %s', folderName)

            return new Promise((resolve, reject) => {
                fs.rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
                    if (err) {
                        console.error(err)

                        return reject(err)
                    }

                    resolve(null)
                })
            })
        },
    })
}