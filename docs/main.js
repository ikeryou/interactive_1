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

if(isMobile.any) {
  //$(window).on('touchmove', _eTouchMove, {passive:false});
  document.addEventListener('touchmove', _eTouchMove, {passive:false});
} else {
  $(window).on('mousemove', _eMouseMove);
}


// マウス位置
mouse = {
  x:window.innerWidth * 0.5,
  y:window.innerHeight * 0.5
};

// 動かすオブジェクト
dotA = $('.dot.js-a')
dotB = $('.dot.js-b')

// 動かすオブジェクトの位置
dotPos = {
  x:mouse.x,
  y:mouse.y,
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

  // 目標値に引っ張られるように近く
  // power = 0.7; // 大きいとより引っ張られるようになる
  // dotPos.vx += (tx - dotPos.x) * power;
  // dotPos.vy += (ty - dotPos.y) * power;
  // dotPos.x += (dotPos.vx *= power);
  // dotPos.y += (dotPos.vy *= power);

  // ２地点の距離
  dx = tx - dotPos.x;
  dy = ty - dotPos.y;
  dist = Math.sqrt(dx * dx + dy * dy);

  // スケール
  scale = map(dist, 1, 6, 0, sw * 0.5);
  if(isMobile.any) {
    scale = map(dist, 1, 2, 0, sw * 0.5);
  }

  // ボーダーの太さ
  borderWidth = map(dist, 5, 50, 0, sw * 0.5);
  // borderWidth = 0;

  // 背景色
  alpha = map(dist, 0, 1, 0, sw * 0.1);
  // backgroundColor = lerpColor({r:0,g:176,b:255}, {r:211,g:47,b:47}, alpha);
  backgroundColor = lerpColor({r:220,g:70,b:78}, {r:80,g:133,b:110}, alpha);

  // ボーダー色
  alpha = map(dist, 0, 1, 0, sw * 0.25);
  borderColor = backgroundColor;

  // ドロップシャドウCSSのあれつくる
  offset  = map(dist, 0, 2, 0, sw * 0.25);
  offsetX = map(dx, -1, 1, -sw * 0.25, sw * 0.25);
  offsetY = map(dy, -1, 1, -sh * 0.25, sh * 0.25);

  shadowColor = '#000'
  shadow = '';
  shadowB = '';
  gray = 0;
  num = ~~(map(dist, 0, 100, 0, sw * 0.25));
  if(isMobile.any) {
    num *= 0.5;
    num = ~~(num);
  }
  for(var i = 0; i < num; i++) {
    x = i * offset * offsetX;
    y = i * offset * offsetY;
    shadow += x + 'px ' + y + 'px 0px ' + shadowColor;
    if(i != num - 1){
      shadow += ',';
    }

    x = i * offset * (offsetX * 1);
    y = i * offset * (offsetY * 1);
    shadowB += x + 'px ' + y + 'px 0px ' + shadowColor;
    if(i != num - 1){
      shadowB += ',';
    }
  }

  // オブジェクトの情報更新
  // 位置指定時、基準点を真ん中にするためサイズの半分だけずらす
  TweenMax.set(dotA, {
    x:dotPos.x - dotA.width() * 0.5,
    y:dotPos.y - dotA.height() * 0.5,
    // x:sw * 0.5 - dotA.width() * 0.5 + dx * 0.5,
    // y:sh * 0.5 - dotA.height() * 0.5 + dy * 0.5,
    scale:scale,
    borderWidth:0,
    backgroundColor:backgroundColor,
    borderColor:borderColor,
    boxShadow:shadow
    // textShadow:shadow
  });
  // TweenMax.set(dotB, {
  //   // x:dotPos.x - dot.width() * 0.5,
  //   // y:dotPos.y - dot.height() * 0.5,
  //   x:sw * 0.5 - dotB.width() * 0.5 + dx * -0.5,
  //   y:sh * 0.5 - dotB.height() * 0.5 + dy * -0.5,
  //   scale:scale,
  //   borderWidth:0,
  //   backgroundColor:backgroundColor,
  //   borderColor:borderColor,
  //   boxShadow:shadowB
  //   // textShadow:shadow
  // });

  // 画面全体
  borderWidth = map(dist, 0, sh * 1, 0, sw * 0.75);

  kake = 0.5
  backgroundColor2 = lerpColor({r:51,g:107,b:165}, {r:255*kake,g:255*kake,b:255*kake}, alpha);
  TweenMax.set(stage, {
    borderWidth:0,
    backgroundColor:0xffffff,
    //backgroundColor:lerpColor({r:0,g:176,b:255}, {r:211,g:47,b:47}, 1 - alpha)
    borderColor:0xffffff
  });

  window.requestAnimationFrame(update);
}


function _eMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function _eTouchMove(e) {
  event.preventDefault();
  touches = event.touches;
  if(touches != null && touches.length > 0) {
    mouse.x = touches[0].pageX;
    mouse.y = touches[0].pageY;
  }
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
