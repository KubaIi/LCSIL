var api = require('bricklink-api');


exports.getItemInfo = function getItemInfo(serialNumber) {
    var Client = api.Client,
        ItemType = api.ItemType;

    var bricklink = new Client({
        "consumer_key": "62ACFB5FC76048CD8896F0565EC3044C",
        "consumer_secret": "38E18771B7854E96B24773D6ACE2F026",
        "token": "2558F1101B6647F4993FAD825FBBCE6C",
        "token_secret": "6740D0A06E884856AD63ACDEEC082EF1"
    });
    return bricklink.getCatalogItem(ItemType.Set, serialNumber)
        .then(function (part) {
            return part;
        });
}