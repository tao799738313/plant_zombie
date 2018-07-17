//僵尸种类数组
var zombieArr = [{
	name: '普通僵尸',
	src1: 'img/zombie/普通僵尸/CommonZombie.gif',
	src2: 'img/zombie/普通僵尸/CommonZombieAttack.gif',
	speed: 3,
	hp: 5,
	skill: function() {
		console.log("吃");

	}
}, {
	name: '路障僵尸',
	src1: 'img/zombie/路障僵尸/ConeheadZombie.gif',
	src2: 'img/zombie/路障僵尸/ConeheadZombieAttack.gif',
	speed: 3,
	hp: 10,

	skill: function() {
		//吃
	}
}, {
	name: '铁桶僵尸',
	src1: 'img/zombie/铁桶僵尸/BucketheadZombie.gif',
	src2: 'img/zombie/铁桶僵尸/BucketheadZombieAttack.gif',
	speed: 2,
	hp: 20,

	skill: function() {
		//吃
	}
}];

console.log(zombieArr);

//僵尸事件
function zombie() {
	var zombie_bar = document.querySelector("#zombie_bar");

	//生成僵尸
	function creatZombie() {
		window.clearTimeout(timeCreatZombie);
		var zombieObj = {};
		var zombiePic = document.createElement("img");
		zombiePic.style.position = "absolute";
		zombiePic.style.bottom = "0px";
		zombiePic.style.left = "-55px";

		var zombieDiv = document.createElement("div");
		//随机僵尸top，top要防止取到最大值
		var zombieTop = ~~(Math.random() * 6);
		if(zombieTop == 5) {
			zombieTop = ~~(Math.random() * 4);
		}

		// 随机僵尸种类num，num要防止抽到最大值
		var zombie_num = ~~(Math.random() * 4);
		if(zombie_num == zombieArr.length) {
			zombie_num = 0;
		}
		zombieDiv.setAttribute("data-num", zombie_num);

		zombiePic.src = zombieArr[zombie_num].src1;
		//rows就是僵尸的行数所在
		zombieDiv.rows = zombieTop;
		//僵尸3号gif图height太大,控制生成后的top值
		//		if(zombie_num == 3) {
		//			zombie.style.top += (zombieTop * 100 - 60) + "px";
		//		} else {
		zombieDiv.style.top += (zombieTop) * 100 + 50 + "px";
		//		}

		zombieDiv.style.zIndex = 20 + zombieTop;
		zombieDiv.className = "zombie";
		zombieDiv.style.left = "-20px";
		zombieDiv.hp = zombieArr[zombie_num].hp;
		//		把血量存进zombieObj里
		zombieObj.hp = zombieDiv.hp;
		zombie_bar.appendChild(zombieDiv);
		zombieDiv.appendChild(zombiePic);
		//		僵尸编号加1
		zombieDataNum = zombieDataNum + 1;
		//		自定义编号
		zombieDiv.setAttribute("data-zombieNum", zombieDataNum);
		//		把编号存进zombieObj里
		zombieObj.dataNum = zombieDiv.dataset.zombienum;
		zombieObj.zombieDomLeft = 2000;
		if(zombieDiv.rows == 0) {
			zombieArrOne.push(zombieObj);
		} else if(zombieDiv.rows == 1) {
			zombieArrTwo.push(zombieObj);

		} else if(zombieDiv.rows == 2) {
			zombieArrThree.push(zombieObj);

		} else if(zombieDiv.rows == 3) {
			zombieArrFour.push(zombieObj);

		} else if(zombieDiv.rows == 4) {
			zombieArrFive.push(zombieObj);

		}
		//每10s生成一只僵尸
		var timeCreatZombie = setTimeout(creatZombie, 10000);
		zombieGo(zombieDiv, zombie_num);

	}
	creatZombie();

	//僵尸移动函数
	function zombieGo(zombie, zombie_num) {
		var nowLeft = parseInt(zombie.style.left);
		var timeZombieForward = setInterval(forward, 200);
		//僵尸前进
		function forward() {

			//获得僵尸距离网页最左的距离，也可以用offsetLeft+父元素的left+祖元素的left一直加上去获得
			//var zombieDomLeft = zombie.getBoundingClientRect().left;

			nowLeft -= zombieArr[zombie.dataset.num].speed;
			zombie.style.left = nowLeft + "px";

			//获得僵尸距离网页最左的距离，也可以用offsetLeft+父元素的left+祖元素的left一直加上去获得
			var zombieDomLeft = zombie.getBoundingClientRect().left;
			if(zombieDomLeft <= "1025") {
				intoBox(zombie);
				clearInterval(timeZombieForward);
			}
		}

	}

}

function getArrZDL(arr, zombie, zombieDomLeft) {
	var len = arr.length;
	for(var i = 0; i < len; i++) {
		if(arr[i].dataNum == zombie.dataset.zombienum) {
			arr[i].zombieDomLeft = zombieDomLeft;
		}
	}
	arr.sort(function(a, b) {
		return a.zombieDomLeft > b.zombieDomLeft;
	});
	//  对对应数组进行domleft排序
}

function intoBox(zombie) {

	//获得僵尸距离网页最左的距离，也可以用offsetLeft+父元素的left+祖元素的left一直加上去获得
	var zombieDomLeft = zombie.getBoundingClientRect().left;

	if(zombie.rows == 0) {
		getArrZDL(zombieArrOne, zombie, zombieDomLeft);
	} else if(zombie.rows == 1) {
		getArrZDL(zombieArrTwo, zombie, zombieDomLeft);
	} else if(zombie.rows == 2) {
		getArrZDL(zombieArrThree, zombie, zombieDomLeft);
	} else if(zombie.rows == 3) {
		getArrZDL(zombieArrFour, zombie, zombieDomLeft);
	} else if(zombie.rows == 4) {
		getArrZDL(zombieArrFive, zombie, zombieDomLeft);
	}

	var intoBoxNum = parseInt((zombieDomLeft - 250) / 82);

	var zombieDownBox = zombie.rows * 10 + intoBoxNum;

	zombie.setAttribute("data-boxMark", zombieDownBox + 1);
	var box = document.querySelectorAll(".box");
	//验证Hp来判断是否有僵尸
	//	if(box[zombieDownBox].childNodes.length == 1) {
	if(hpArr[zombieDownBox] > 0) {
		//		console.log("这个盒子有植物");
		zombie.childNodes[0].src = zombieArr[zombie.dataset.num].src2;
		var timeZombieEatPlant = setInterval(function() {

			if(zombie.parentNode) {
				//plantHp -= 僵尸的攻击力,攻击力还没有设置；

				hpArr[zombieDownBox] = hpArr[zombieDownBox] - 1;

				if(hpArr[zombieDownBox] <= 0) {
					clearInterval(timeZombieEatPlant);
					//两只以上僵尸吃植物，总会有一个僵尸先吃到0，植物被移除，下一个没有植物可以移除，所有错误
					if(box[zombieDownBox].childNodes.length >= 1) {
						box[zombieDownBox].dataset.ui = "false";
						box[zombieDownBox].style.zIndex = 0;
						for(var i = 0, len = box[zombieDownBox].childNodes.length; i < len; i++) {
							box[zombieDownBox].removeChild(box[zombieDownBox].childNodes[i]);
						}
						//box[zombieDownBox].removeChild(box[zombieDownBox].childNodes[0]);	
					}
					zombie.childNodes[0].src = zombieArr[zombie.dataset.num].src1;

					var testNum = 0;
					var nowLeft = parseInt(zombie.style.left);
					var timeGo = setInterval(function() {
						nowLeft -= zombieArr[zombie.dataset.num].speed;
						zombie.style.left = nowLeft + "px";
						testNum += zombieArr[zombie.dataset.num].speed;
						if(testNum >= 82) {
							clearInterval(timeGo);
							return intoBox(zombie);
						}
					}, 200);
				}
			}else{
				clearInterval(timeZombieEatPlant);
			}
		}, 200);
	} else {
		//		console.log("这个盒子里没有植物");
		var testNum = 0;
		var nowLeft = parseInt(zombie.style.left);
		var timeGo = setInterval(function() {
			if(zombie.parentNode){
			nowLeft -= zombieArr[zombie.dataset.num].speed;
			zombie.style.left = nowLeft + "px";
			testNum += zombieArr[zombie.dataset.num].speed;
			if(testNum >= 82) {
				clearInterval(timeGo);
				return intoBox(zombie);
			}
			if(parseInt(zombie.style.left)<-1020){
				clearInterval(timeGo);
				alert("僵尸吃掉了你的脑子，点击确定,3s后重新开始游戏！");
				var timeAgainGame =setTimeout(function(){
						location.reload();
					},3000);
				
			}
		}else{
				clearInterval(timeZombieEatPlant);
			}
			}, 200);

	}

}