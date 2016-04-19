var request = require('superagent');

var toDoubleDigits = function(num) {
  num += ""; //Number型をString型に強制変換
  if (num.length === 1) {
      num = "0" + num;
  }
  return num;
};

var getNow = function(){
  console.log('現在時刻を表示');
  var now = new Date();
  var year = now.getYear();
  if ( year < 2000){year += 1900};
  var month = toDoubleDigits(now.getMonth()+1);
  var day = toDoubleDigits(now.getDate());
  var hour = toDoubleDigits(now.getHours());
  var min = toDoubleDigits(now.getMinutes());
  var sec = toDoubleDigits(now.getSeconds());
  date = year+"年"+month+"月"+day+"日"+hour+"時"+min+"分"+sec+"秒";
  return date;
}

var getWeater = function() {
  getNow();
  console.log(date);
  return new Promise(function(resolve, reject) {
    return request.get('http://api.openweathermap.org/data/2.5/weather?units=metric&q=TokyoTo,jp')
                  .accept('application/json')
                  .end(function(err, res) {
                    data = res.body.main.temp;
                    console.log("現在の気温："+ data);
                    resolve(data);
                    if (err) {
                      reject(err);
                    }
                  });
  });
};

var convertXml = function(data){
  return"<?xml version=\"1.0\" encoding=\"UTF-8\"\?>\n<records>\n  <group>\n    <datetime>" + data +"</datetime>\n  </group>\n</records>"
};

var writeFile = function(data){
  return new Promise(function(resolve, reject) {
  var xml = convertXml(data);
  if (!data) {
    reject("not running");
  }
  console.log(xml);
  });
};

var nowDate = function() {
  setInterval(function() {
    // getNow().then
    getWeater().then(function(data) {
      writeFile(data);
    },function(error) {
      console.log('天気情報の取得に失敗しました')
    });
    // return new Promise(function(resolve, reject) {}
  },5000);
};

nowDate();
