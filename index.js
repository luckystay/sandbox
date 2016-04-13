
var toDoubleDigits = function(num) {
  num += ""; //Number型をString型に強制変換
  if (num.length === 1) {
      num = "0" + num;
  }
  return num;
};

var getNow = function(){
  console.log('start');
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

var nowDate = function (){
  setInterval(getNow,5000);
};

nowDate();
