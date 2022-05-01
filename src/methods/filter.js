const changeTime = function (targetTime) {
  let date = new Date(targetTime);
  let Y = date.getFullYear() + '-';
  let M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  const time = Y + M + D;
  return time;
};

export default changeTime;
