appconfig={}
appconfig.port=3000;
appconfig.db={
    url:"mongodb://127.0.0.1:27017/author"
}

module.exports={
    port:appconfig.port,
    db:appconfig.db
}