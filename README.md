
# vun.js

vun.js is a simple library written in Node.js for inserting, reading and deleting data in JSON format without any database server dependencies.

# Installation

To install vun.js, use following command on your terminal:

```
npm install vun.js --save
```

To use vun.js in your project, add following line:

```javascript
const VunJS = require('vun.js')
const vunjs = new VunJS()
```

# Function List
 - `SetupDatabase(string directory)` Creates database directory you entered in directory param.
 - `CreateTable(string dbName)` Creates database file in directory with JSON file format.
 - `DeleteTable(string dbName)` Deletes the table you entered in dbName param if it exists.
 - `InsertData(string dbName, JSON data)` Inserts JSON object you entered in second param to database you entered in first param.
 - `DeleteData(string dbName, JSON data, repeat = 0)` Deletes data you gave in second param from dbName. If repeat is set to 0, which is default, it will delete only first data. If set to more than 0, it will delete all datas until reaching repeat number.
 - `ReadAllData(string dbName, function callback)` Returns you all objects in database as an array.
 - `SearchData(string dbName, JSON objectToSearch, function callback)` Searches object you gave in second param in database, returns all objects match as an array.
 - `DataCount(string dbName)` Returns row count of dbName.
 - `UpdateData(string dbName, int uniqueID, JSON object)` Updates attributes of uniqueID.

# Example
```javascript
const VunJS = require('vun.js') // Creating our class from source file.
const vunjs = new VunJS() // Creating new object from our class.

// Setting up database path.
vunjs.SetupDatabase('./database/') 

// Creating our table named users as JSON file.
vunjs.CreateTable('users') 

// Inserting new data to users database as JSON object.
vunjs.InsertData('users', { name: "test", surname: "blabla" }) 

// Searching data if any of it mathches our JSON object and printing it out as an array.
vunjs.SearchData('users', { surname: "blabla" }, (data) => {
    console.log(data)
}) 

// Delete all data in users table if contains JSON object.
vunjs.DeleteData('users', { name: "test" }, vunjs.DataCount('users')) 

// Changing our name from test to Testv2
vunjs.UpdateData('users', 1258111, { name: "Testv2" }) 
```

---
**NOTE**

Do not try to insert any unique ID's to database you insert data into. It creates a unique ID and adds it into your JSON object.

---
