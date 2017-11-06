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

  // 目標値にだんだんと近づける
  ease = 0.15; // こいつが小さいとよりゆっくりと近くようになる
  dotPos.x += (tx - dotPos.x) * ease;
  dotPos.y += (ty - dotPos.y) * ease;

  // ２地点の距離
  dx = tx - dotPos.x;
  dy = ty - dotPos.y;
  dist = Math.sqrt(dx * dx + dy * dy);

  // スケール
  scale = map(dist, 1, 4, 0, sw * 0.25);

  // ボーダーの太さ
  borderWidth = map(dist, 5, 50, 0, sw * 0.5);
  // borderWidth = 0;

  // 背景色
  alpha = map(dist, 0, 1, 0, sw * 0.1);
  backgroundColor = lerpColor({r:0,g:176,b:255}, {r:211,g:47,b:47}, alpha);

  // ボーダー色
  alpha = map(dist, 0, 1, 0, sw * 0.25);
  borderColor = backgroundColor;

  // オブジェクトの情報更新
  // 位置指定時、基準点を真ん中にするためサイズの半分だけずらす
  TweenMax.set(dot, {
    x:dotPos.x - dot.width() * 0.5,
    y:dotPos.y - dot.height() * 0.5,
    scale:scale,
    borderWidth:borderWidth,
    borderColor:borderColor
  });


  // 画面全体
  borderWidth = map(dist, 5, sh * 0.5, 0, sw * 0.75);

  TweenMax.set(stage, {
    borderWidth:borderWidth,
    borderColor:borderColor
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
