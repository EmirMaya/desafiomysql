import __dirname from "../utils.js";

export const sqliteOptions ={
    client:'sqlite3',
    connection:{
        filename: __dirname + '/db/eCommerce.sqlite'
    },
    useNullAsDefault:true
}

export default sqliteOptions;
