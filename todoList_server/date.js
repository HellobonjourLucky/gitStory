//module.exports =  [getDate, getDay];
//이렇게 적을 경우, app.js에는
//console.log(date[0]());
//이렇게 하면 getDate의 return 값을 얻을 수 있다.


// module.exports.getDate = getDate;
// module.exports.getDay = getDay;
//이것과 똑같은 방법은
// module.exports = {getDate, getDay}
//이렇게 적고, app.js에는
//console.log(date);console.log(date);

exports.getDate = function(){
  let today = new Date();
  let option = {
    weekend : 'long',
    day: 'numeric',
    month: 'long'
  };
  let day = today.toLocaleDateString('en-US', option);

  return day;
}


exports.getDay = function(){
  let today = new Date();
  let option = {
    weekend : 'long'
  }
  let day = today.toLocaleDateString('en-US', option);
  return day;
}
