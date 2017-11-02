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

// ターゲット
tg = $('.tg')

function update() {

  TweenMax.set(tg, {
    x:mouse.x - tg.width() * 0.5,
    y:mouse.y - tg.height() * 0.5
  });

  window.requestAnimationFrame(update);
}


function _eMouseMove(e) {

  mouse.x = e.clientX;
  mouse.y = e.clientY;

}
