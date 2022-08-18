export const mariaDBOptions = {
    client:'mysql',
    connection:{
        host:"localhost",
        user:"root",
        password:"root",
        port:'3306',
        database:'coderDB',
        ssl: false        
    }
}
export default mariaDBOptions;