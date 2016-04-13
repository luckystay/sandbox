var request = require('superagent');

var toDoubleDigits = function(num) {
  num += ""; //Number型をString型に強制変換
  if (num.length === 1) {
      num = "0" + num;
  }
  return num;
};

var getNow = function(){
  console.log('現在時刻を表示します');
  var now = new Date();
  var year = now.getYear();
  if ( year < 2000){year += 1900};
  var month = toDoubleDigits(now.getMonth()+1);
  var day = toDoubleDigits(now.getDate());
  var hour = toDoubleDigits(now.getHours());
  var min = toDoubleDigits(now.getMinutes());
  var sec = toDoubleDigits(now.getSeconds());
  date = year+"年"+month+"月"+day+"日"+hour+"時"+min+"分"+sec+"秒";
  console.log(date);
}

var getWeater = function() {
  console.log('これから天気を取得します');
  return new Promise(function(resolve, reject) {
    return request.get('http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp')
                  .accept('application/json')
                  .end(function(err, res) {
                    console.log(res.body);
                    resolve()
                    if (err) {
                      reject(err);
                    }
                  });
  });
};

var nowDate = function() {
  setInterval(function() {
    getNow();
    getWeater().then(function() {
      console.log('天気情報を取得しました');
    },function(error) {
      console.log('天気情報の取得に失敗しました')
    });
    // return new Promise(function(resolve, reject) {}
  },5000);
};

nowDate();

/*
fetchBus = function() {
  return new Promise(function(resolve, reject) {
    return request.get('http://tutujibus.com/busLookup.php?busid=2').accept('application/json').end(function(err, res) {
      var data;
      if (err) {
        reject(err);
      }
      data = res.text;
      data = JSON.parse(data.slice(1, -1));
      return resolve(data);
    });
  });
};

fetchSomething1(function() {fetchSomething2(function() {fetchSomething3(function() {fetchSomething4(doSomethingFinally); // 全部終わったら doSomethingFinally()
    });
  });
})



fetchAndUpload = function() {
  return setInterval(function() {
    return fetchBus().then(function(data) {
      return writeFile(data);
    }).then(function(filepath) {
      return upload(filepath);
    }).then(function() {
      return console.log("done!");
    })["catch"](function(err) {
      return console.log("error:", err);
    });
  }, 60000);
};;
*/
