var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
var con=''
if(env=='dev') {
    con ='mongodb://localhost:27017/contactlist'
}
else
{
    con='mongodb://address:book@ds151008.mlab.com:51008/address';
}
console.log(con);
exports.connectionString= con;