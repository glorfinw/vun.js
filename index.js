const fs = require('fs')

let path = ""

module.exports = function() {

    this.CreateTable = (dbName) => {

        fs.createWriteStream(`${path}/${dbName}.json`)

        fs.writeFile(`${path}/${dbName}.json`, "[]", (err) => {
            if(err) {
                console.log(err)
            }
        })
    }

    this.InsertData = (dbName, newData) => {

        if(typeof newData !== 'object') throw "Second parameter's type must be an object."

        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {
            if(err) {
                console.log(err)
            }
            else {

                var uniqueID = -1
                uniqueID = Math.floor(Math.random() * 9999999)

                for(let i = 0; i < data.length; i++) {
                    if(uniqueID == data[i][0]) {
                        uniqueID = Math.floor(Math.random() * 9999999)
                    }
                }

                if(uniqueID == -1) {
                    return console.log('There is an error. Server could not insert data.')
                }
                
                newData.id = uniqueID

                var jsonArray = JSON.parse(data)
                jsonArray.push(newData)
    
                fs.writeFile(`${path}/${dbName}.json`, JSON.stringify(jsonArray), (err) => {
                    if(err) {
                        console.log(err)
                    }
                })
            }
        })
    }

    this.SetupDatabase = (dir) => {

        path = dir
    
        fs.mkdir(dir, (err) => { console.log('[VUN.JS] - Database has been set up successfully.') })
    }

    this.ReadAllData = (dbName, callback) => {

        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {
            callback(JSON.parse(data))
        })
    }

    this.UpdateData = (dbName, uID, newData) => {

        if(typeof uID !== 'number') throw "User ID parameter must be a number."
        if(typeof newData !== 'object') throw "Second parameter's type must be an object."

        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {

            var jsonData = JSON.parse(data), sData = {}

            for(let i = 0; i < jsonData.length; i++) {
                if(jsonData[i].id === uID) {
                    sData = jsonData[i]
                    break
                }
            }

            var keys = Object.keys(newData), values = Object.values(newData), i = 0

            for(var key in keys) {
                sData[keys[key]] = values[i]
                i++
            }

            fs.writeFile(`${path}/${dbName}.json`, JSON.stringify(jsonData), (err) => {})
        })
    }

    this.SearchData = (dbName, searchData, callback) => {

        if(typeof searchData !== 'object') throw "Second parameter's type must be an object."

        var arr = []

        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {

            if(err) {
                console.error(`Database ${dbName} does not exists.`)
            }
            else {
                var jsonData = JSON.parse(data)

                for(let i = 0; i < jsonData.length; i++) {

                    let dataToSearch = JSON.stringify(searchData).substring(1).slice(0,-1)

                    if(JSON.stringify(jsonData[i]).includes(dataToSearch)) {
                        arr.push(jsonData[i])
                    }
                }
            }

            callback(arr)
        })
    }

    this.DeleteData = (dbName, searchData, repeat = 0) => {

        if(typeof searchData !== 'object') throw "Second parameter's type must be an object."

        let arr = new Array()

        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {
            var jsonData = JSON.parse(data)

            for(let i = 0; i < jsonData.length; i++) {

                let dataToSearch = JSON.stringify(searchData).substring(1).slice(0,-1)

                if(!JSON.stringify(jsonData[i]).includes(dataToSearch)) {
                    arr.push(jsonData[i])
                }

                if(repeat != 0 && i == repeat) {
                    break
                }
            }

            fs.writeFile(`${path}/${dbName}.json`, JSON.stringify(arr), (err) => {
                if(err) {
                    console.log(err)
                }
            })
        })
    }

    this.DataCount = (dbName) => {

        let dataCount = 0

        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {
            if(err) {
                console.log(err)
            }
            else {
                var jsonData = JSON.parse(data)

                for(let i = 0; i < jsonData.length; i++) {
                    dataCount++
                }    
            }
        })

        return dataCount
    }

    this.DeleteTable = (dbName) => {
        fs.unlink(`${path}/${dbName}.json`, err => {
            if(err) {
                console.error(err)
            }
        })
    }
}