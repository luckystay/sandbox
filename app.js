var aws = require('aws-sdk');
var php = require('phpjs');

aws.config.loadFromPath('./config.json');

var dynamodb = new aws.DynamoDB();
var params = {
    TableName:'yoshi-diapers',
    Key: {
    "id": {"S": "2"}
    }
};
dynamodb.getItem(params, function (err, res) {
      php.var_dump(res);
  });
  
// http://qiita.com/inouet/items/b2246d2419daf1788f63
