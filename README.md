# 11/8 15:00 @sj インタラクティブ勉強会 1

[導入資料](https://speakerdeck.com/ikeryou/intarakuteibumian-qiang-hui-dao-ru-zi-liao)

## インタラクティブ勉強会の目的
・インタラクティブコンテンツを作るための小技を増やす  
・なぜそう動くか？といった理論は一旦無視(正直僕も知らないし、理論学ぼうとするとイージングひとつでめちゃ時間かかる)  
・もちろん理論知ってる方がいいけど、小技を増やして作品の数を増やすことを優先する  

## 方法
・小技を全員に共有     
・その小技を使って作品を作る  
・公開するの大事(少しでもビジュアルに気を使うのは大事)  
・こういった配色ツール[Random Material Palette Generator](https://www.threebu.it/random-material-palette/)、[Colormind](http://colormind.io/)を積極的に使う   

# 第一回テーマ「追従」
・ターゲットがある位置からある位置へと、いい感じに移動する  
・開始値と目標値からいい感じに使えそうな値をいい感じに使う  

## いい感じに追従する公式
### ・だんだんと
[http://ikeryou.jp/works/mov/int/1/1/](http://ikeryou.jp/works/mov/int/1/1/)  
[ソース](https://github.com/ikeryou/interactive_1/blob/study1/docs/main.js)  
```js
// 今の位置
nowX = 0;
nowY = 0;

// 目標とする位置
targetX = 100;
targetY = 100;

// 速さ
ease = 0.3;

// 毎フレーム実行する関数
function update() {
  nowX += (targetX - nowX) * ease;
  nowY += (targetY - nowY) * ease;
}
```
<video width="100%" autoplay loop>
<source src="http://ikeryou.jp/works/mov/int/1/1.mp4">
</video>

### ・バネっぽく
[http://ikeryou.jp/works/mov/int/1/2/](http://ikeryou.jp/works/mov/int/1/2/)  
[ソース](https://github.com/ikeryou/interactive_1/blob/study2/docs/main.js)  
```js
// 今の位置
nowX = 0;
nowY = 0;

// 速度
vx = 0;
vy = 0;

// 目標とする位置
targetX = 100;
targetY = 100;

// 強さ
power = 0.5;

// 毎フレーム実行する関数
function update() {
  vx += (targetX - nowX) * power;
  vy += (targetY - nowY) * power;
  nowX += (vx *= power);
  nowY += (vy *= power);
}
```
<video width="100%" autoplay loop>
<source src="http://ikeryou.jp/works/mov/int/1/2.mp4">
</video>

## 開始位置と目標位置があれば何が分かる？
### ・２地点の距離
```js
// 今の位置
nowX = 0;
nowY = 0;

// 目標とする位置
targetX = 100;
targetY = 100;

dx = targetX - nowX;
dy = targetY - nowY;
dist = Math.sqrt(dx * dx + dy * dy);
```
### 例１ ２地点の距離をオブジェクトのスケールと背景色を決めるのに使用  
[http://ikeryou.jp/works/mov/int/1/3/](http://ikeryou.jp/works/mov/int/1/3/)  
[ソース](https://github.com/ikeryou/interactive_1/blob/study3/docs/main.js)  
<video width="100%" autoplay loop>
<source src="http://ikeryou.jp/works/mov/int/1/3.mp4">
</video>

### 例２ ２地点の距離をオブジェクトのスケール、ボーダー(border-style:ridge;)の太さと色、そして、画面全体のボーダー(border-style:ridge;)の太さと色を決めるのに使用  
[http://ikeryou.jp/works/mov/int/1/4/](http://ikeryou.jp/works/mov/int/1/4/)  
[ソース](https://github.com/ikeryou/interactive_1/blob/study4/docs/main.js)  
<video width="100%" autoplay loop>
<source src="http://ikeryou.jp/works/mov/int/1/4.mp4">
</video>


### おまけ1 値の範囲変換
```js
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

// 例
// -100から100の範囲で変化する値を0から1の範囲で変化する値に変換する
// hoge = 0.75
hoge = map(50, 0, 1, -100, 100):
```
### おまけ2 値の線形補間
```js
// @from  : 始点
// @to    : 終点
// @alpha : 位置
function lerp(from, to, alpha) {
  return (from * (1 - alpha)) + (to * alpha);
}

// 例
// 0から100の範囲を0から1で位置指定して取得
// hoge = 50
hoge = lerp(0, 100, 0.5):
```
