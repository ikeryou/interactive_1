// クラス定義テンプレ
// -----------------------------------------
Hoge = function(moge) {
  this.moge = moge;
};

Hoge.prototype.getMoge = function() {
  return this.moge;
};
// -----------------------------------------
//test = new Hoge('unko');
//console.log(test.getMoge());


window.requestAnimationFrame(update);
$(window).on('mousemove', _eMouseMove);


// マウス位置
mouse = {
  x:0,
  y:0
};

// 動かすオブジェクト
dot = $('.dot')

// 動かすオブジェクトの位置
dotPos = {
  x:0,
  y:0,
  vx:0,
  vy:0
};

// 画面全体
stage = $('.mv')

function update() {

  // 画面サイズ
  sw = window.innerWidth;
  sh = window.innerHeight;

  // 目標値
  // マウス位置
  tx = mouse.x;
  ty = mouse.y;

  // 目標値に引っ張られるように近く
  power = 0.7; // 大きいとより引っ張られるようになる
  dotPos.vx += (tx - dotPos.x) * power;
  dotPos.vy += (ty - dotPos.y) * power;
  dotPos.x += (dotPos.vx *= power);
  dotPos.y += (dotPos.vy *= power);

  // 背景色
  backgroundColor = lerpColor({r:0,g:176,b:255}, {r:211,g:47,b:47}, 1);

  // オブジェクトの情報更新
  // 位置指定時、基準点を真ん中にするためサイズの半分だけずらす
  TweenMax.set(dot, {
    x:dotPos.x - dot.width() * 0.5,
    y:dotPos.y - dot.height() * 0.5,
    scale:1,
    borderWidth:0,
    backgroundColor:backgroundColor
  });

  TweenMax.set(stage, {
    borderWidth:0
  });

  window.requestAnimationFrame(update);
}


function _eMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

// 範囲変換
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
function map(val, toMin, toMax, fromMin, fromMax) {
  if(val <= fromMin) {
    return toMin;
  }
  if(val >= fromMax) {
    return toMax;
  }
  p = (toMax - toMin) / (fromMax - fromMin);
  return ((val - fromMin) * p) + toMin;
}

// 線形補間
// @from  : 始点
// @to    : 終点
// @alpha : 位置
function lerp(from, to, alpha) {
  return (from * (1 - alpha)) + (to * alpha);
}

function lerpColor(from, to, alpha) {
  return 'rgb(' + lerp(from.r, to.r, alpha) + ',' + lerp(from.g, to.g, alpha) + ',' + lerp(from.b, to.b, alpha) +')';
}
