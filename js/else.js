//开始游戏按钮
var choose_ok = document.querySelector("#choose_ok");
choose_ok.addEventListener("click", start);

window.addEventListener("load", ready);
window.addEventListener("load", choosePlant);
//游戏开始前的准备函数
//僵尸编号从0开始
var zombieDataNum = 0;
var hpArr = [];
var zombieArrOne = [];
var zombieArrTwo = [];
var zombieArrThree = [];
var zombieArrFour = [];
var zombieArrFive = [];

function ready() {
	//生成50个0装进hp数组里
	(function() {
		for(var i = 0; i < 50; i++) {
			hpArr.push(0);
		}
	})();
	console.log(hpArr);
	//生成植物全部卡片
	(function() {
		for(var i = 0, card_len = plantArr.length; i < card_len; i++) {
			var plant_card = document.createElement("img");
			plant_card.className = "plant_card";
			//从plantArr里继承num，spend,hp
			plant_card.num = plantArr[i].num;
			plant_card.spend = plantArr[i].spend;
			plant_card.hp = plantArr[i].hp;
			plant_card.src = plantArr[i].src1;
			choose_plant.appendChild(plant_card);
		}
	})();
	//生成几只展示僵尸
	(function() {
		var showZombie_bar = document.querySelector("#showZombie_bar");
		for(var i = 0; i < 5; i++) {
			var showZombie = document.createElement("img");
			var num_show = ~~(Math.random() * zombieArr.length);
			if(num_show == zombieArr.length) {
				num_show = 0;
			}
			showZombie.src = zombieArr[num_show].src1;
			showZombie.style.position = "absolute";
			var num_top = ~~(Math.random() * 300);
			var num_left = ~~(Math.random() * 50);
			showZombie.style.top = num_top + "px";
			showZombie.style.left = num_left + "px";
			showZombie.style.zIndex = num_top;
			showZombie_bar.appendChild(showZombie);
		}

	})();
	// 把bg.box布局生成
	(function() {

		var one = document.querySelectorAll(".one");
		var two = document.querySelectorAll(".two");
		var three = document.querySelectorAll(".three");
		var four = document.querySelectorAll(".four");
		var five = document.querySelectorAll(".five");
		for(var i = 0, len = one.length; i < len; i++) {
			one[i].style.left = i * 82 + 250 + "px";
			two[i].style.left = i * 82 + 250 + "px";
			three[i].style.left = i * 82 + 250 + "px";
			four[i].style.left = i * 82 + 250 + "px";
			five[i].style.left = i * 82 + 250 + "px";
		}
		//给所有盒子设置自定义属性data-ui，用来验证盒子里有没有种植物	
		var box = document.querySelectorAll(".box");
		for(var i = 0, len = box.length; i < len; i++) {
			box[i].setAttribute("data-ui", "false");
			box[i].setAttribute("data-num", i + 1);
			box[i].style.top = "500px";
		}
		//给box定义top
		for(var i = 0, len = box.length; i < len - 10; i++) {
			//box[i].setAttribute("data-ui", "false");
			box[i].style.top = "400px";
		}
		for(var i = 0, len = box.length; i < len - 20; i++) {
			//box[i].setAttribute("data-ui", "false");
			box[i].style.top = "300px";
		}
		for(var i = 0, len = box.length; i < len - 30; i++) {
			//box[i].setAttribute("data-ui", "false");
			box[i].style.top = "200px";
		}
		for(var i = 0, len = box.length; i < len - 40; i++) {
			//box[i].setAttribute("data-ui", "false");
			box[i].style.top = "100px";
		}

	})();

}
//两个计时器把阳光和僵尸叫出来        
function twotime_start() {
	var sunStart = setTimeout(sun, 5000);
	var zombieStart = setTimeout(zombie, 10000);
}
//点击选好了,游戏开始
function start() {

	//防止游戏开始前1s可以把卡片点掉的bug
	var game_plant_card = document.querySelectorAll(".game_plant_card");
	for(var i = 0; i < game_plant_card.length; i++) {
		game_plant_card[i].flag = "false";
	}
	//页面移动
	var map = document.querySelector("#map");
	map.style.opacity = 1;
	choose_plant.style.display = "none";
	map.style.transform = "translateX(0)";
	//展示僵尸删除
	var showZombie_bar = document.querySelector("#showZombie_bar");
	showZombie_bar.parentNode.removeChild(showZombie_bar);
	//把选择卡片定位，鼠标才可以多次选择卡片
	var game_plant_card = document.querySelectorAll(".game_plant_card");
	for(var i = 0; i < game_plant_card.length; i++) {
		game_plant_card[i].style.position = "absolute";
		game_plant_card[i].style.top = i * 63 + "px";
		//给新卡片设置没有cd的验证参数	data-cd	
		game_plant_card[i].setAttribute("data-cd", "no");
	}
	prompt();
	mouse_img();
	twotime_start();
	doc_click();

}

//新建跟随鼠标移动的img标签
function mouse_img() {
	var mouse_img = document.createElement("img");
	var bg = document.querySelector("#bg");
	mouse_img.className = "mouse_img";
	bg.appendChild(mouse_img);
	bg.onmousemove = function(event) {
		mouse_img.style.top = event.clientY - 40 + "px";
		mouse_img.style.left = event.clientX - 40 + "px";
	}
	mouse_img.style.transform = "rotate(0)";
}
//窗口点击标签，有卡片/阳光/铲子/box
function doc_click() {
	document.body.onclick = function(e) {
		//如果点的是阳光
		if(e.target.className === "sun") {
			sun_click(e.target);
			return doc_click();

		} else if(e.target.className === "game_plant_card") {
			//如果点的是卡片，判定cd阳光再执行pP
			plantPlant(e.target);

		} else if(e.target.id === "shovel") {
			//如果点的是铲子
			shovel();

		}

	}
}
//铲子的回调函数
function shovel() {
	document.body.style.cursor = "pointer";
	//把鼠标img改成铲子的图片
	var mouse_img = document.querySelector(".mouse_img");
	mouse_img.src = "img/Shovel.png";
	mouse_img.style.transform = "rotate(-45deg)";
	var bg = document.querySelector("#bg");
	bg.onmousemove = function(event) {
		mouse_img.style.top = event.clientY - 40 + "px";
		mouse_img.style.left = event.clientX - 40 + "px";
	}
	//把铲子高度设置5，可以点击10的植物，但是如果是僵尸下面的植物会被僵尸挡住
	mouse_img.style.zIndex = "5";
	//点击铲子把所有僵尸的高度降到3，铲子就挖得到僵尸下面的植物了
	var zombie = document.querySelectorAll(".zombie");
	for(var i = 0, len = zombie.length; i < len; i++) {
		zombie[i].style.zIndex = "3";
	}

	//鼠标拿着铲子会发生的几种情况
	document.body.onclick = function(event) {
		if(event.target.className === "sun") {
			//拿着铲子点阳光
			sun_click(event.target);
		} else if(event.target.className === "box_plant") {
			//拿着铲子点植物
			var boxAllPlant = [];
			for(var i = 0, len = event.target.parentNode.childNodes.length; i < len; i++) {
				boxAllPlant.push(event.target.parentNode.childNodes[i]);
			}
			event.target.parentNode.dataset.ui = "false";
			event.target.parentNode.style.zIndex = 0;
			hpArr[event.target.parentNode.dataset.num - 1] = 0;
			//			event.target.parentNode.removeChild(event.target);
			var eventTargetFather = event.target.parentNode;
			for(var i = 0, len = boxAllPlant.length; i < len; i++) {
				eventTargetFather.removeChild(boxAllPlant[i]);
			}

			//挖了植物把僵尸高度调回20-24
			var zombie = document.querySelectorAll(".zombie");
			for(var i = 0, len = zombie.length; i < len; i++) {
				zombie[i].style.zIndex = parseInt(zombie[i].style.top) / 100 + 20;
			}
			var mouse_img = document.querySelector(".mouse_img");
			var bg = document.querySelector("#bg");
			bg.removeChild(mouse_img);
			var mouse_img = document.createElement("img");
			mouse_img.className = "mouse_img";
			bg.appendChild(mouse_img);
			bg.onmousemove = function(event) {
				mouse_img.style.top = event.clientY - 40 + "px";
				mouse_img.style.left = event.clientX - 40 + "px";
			}
			return doc_click();
		} else if(event.target.className === "game_plant_card") {
			//拿着铲子点卡片

			var zombie = document.querySelectorAll(".zombie");
			//拿着铲子点卡片后把僵尸高度调回20-24
			for(var i = 0, len = zombie.length; i < len; i++) {
				zombie[i].style.zIndex = parseInt(zombie[i].style.top) / 100 + 20;
			}
			return plantPlant(event.target);
		} else if(event.target.className === "one box" || event.target.className === "two box" || event.target.className === "three box" || event.target.className === "four box" || event.target.className === "five box") {
			//拿着铲子点盒子
			if(event.target.dataset.ui === "true") {
				var prompt_div = document.querySelector("#prompt_div");
				prompt_div.innerHTML = "你点到了种了植物的盒子，点植物图片才有效果";

			} else {
				//点铲子的时候空盒子zindex是0，正常是点不到的，以防万一写句调试
				prompt_div.innerHTML = "盒子里没有植物...";

			}
		}

	}
}

function prompt() {
	var prompt = document.querySelector("#prompt");
	var str = " ";
	var game_plant_card = document.querySelectorAll(".game_plant_card");
	for(var i = 0, len = game_plant_card.length; i < len; i++) {
		var num = game_plant_card[i].num;
		var name = plantArr[num].name;
		var spend = plantArr[num].spend;
		var cd = plantArr[num].cd;
		var prompt_text = "<p class='prompt_text'>名字 : " + name + " , 阳光 : " + spend + " 点, CD : " + cd + " s</p>";
		str += prompt_text;
	}
	prompt.innerHTML += str;
	var prompt_div = "<div id='prompt_div'></div>";
	prompt.innerHTML += prompt_div;
}

//用alert来暂停整个页面
var stop_btn = document.querySelector("#stop_btn");
stop_btn.addEventListener("click", stop);

function stop() {
	alert("游戏暂停");
}