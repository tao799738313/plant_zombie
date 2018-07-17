//基础的植物数组
var plantArr = [{
	name: '向日葵',
	num: 0,
	src1: 'img/plant-card/向日葵/SunFlower.bmp',
	src2: 'img/plant-card/向日葵/SunFlower.png',
	src3: 'img/plant-card/向日葵/SunFlowerG.png',
	src4: 'img/plant-card/向日葵/SunFlower.gif',
	hp: 15,
	spend: 50,
	cd: 4,
	skill: function() {
		//每4s产生阳光25点
		var mouse_img = document.querySelector(".mouse_img");
		var sun_num = document.querySelector("#sun_num");
		var timePlantCreatSun = setInterval(function() {
			if(mouse_img.parentNode) {
				var yg = parseInt(sun_num.innerHTML);
				yg += 25;
				sun_num.innerHTML = yg;
			} else {
				clearInterval(timePlantCreatSun);
				mouse_img.skill = null;
			}
		}, 6000);

	}

}, {
	name: '普通豌豆',
	num: 1,
	src1: 'img/plant-card/普通豌豆/Peashooter.bmp',
	src2: 'img/plant-card/普通豌豆/Peashooter.png',
	src3: 'img/plant-card/普通豌豆/PeashooterG.png',
	src4: 'img/plant-card/普通豌豆/Peashooter.gif',
	skillsrc1: 'img/plant-card/普通豌豆/PeaBullet.gif',
	skillsrc2: 'img/plant-card/普通豌豆/PeaBulletHit.gif',
	hp: 15,
	spend: 100,
	cd: 6,
	skill: function() {
		//验证攻击，计时器做攻速
		var mouse_img = document.querySelector(".mouse_img");
		var mouse_img_rows = parseInt((parseInt(mouse_img.parentNode.dataset.num) + 10) / 10);

		//		用计时器去判断行内是否有僵尸
		var timeRowHaveZombie = setInterval(function() {
			if(mouse_img.parentNode) {
				if(mouse_img_rows == 1 && zombieArrOne.length > 0) {
					peaBullet();
				} else if(mouse_img_rows == 2 && zombieArrTwo.length > 0) {
					peaBullet();
				} else if(mouse_img_rows == 3 && zombieArrThree.length > 0) {
					peaBullet();
				} else if(mouse_img_rows == 4 && zombieArrFour.length > 0) {
					peaBullet();
				} else if(mouse_img_rows == 5 && zombieArrFive.length > 0) {
					peaBullet();
				}
			}
		}, 2000);

		function peaBullet() {
			if(mouse_img.parentNode) {
				var peaBullet = document.createElement("img");
				peaBullet.className = "peaBullet";
				peaBullet.src = plantArr[1].skillsrc1;
				mouse_img.parentNode.appendChild(peaBullet);
				//				豌豆会因为图片被吃掉,或者挖掉下沉z-index为0,豆子此时有两种途径,一是豆子父级变成bg继续攻击,二是全部删掉
				peaBulletSkill(peaBullet);
			} else {
				clearInterval(timeRowHaveZombie);
			}

		}

		function delzombieObj(arr, peaBullet) {
			peaBullet.parentNode.removeChild(peaBullet);
			arr[0].hp = arr[0].hp - 1;
			if(arr[0].hp <= 0) {

				var zombie = document.querySelectorAll(".zombie");
				for(var i = 0, len = zombie.length; i < len; i++) {
					if(zombie[i].dataset.zombienum == arr[0].dataNum) {
						var a = zombie[i];
						a.parentNode.removeChild(a);
						continue;
					}
				}
				arr.splice(0, 1);
			}
		}

		function peaBulletSkill(peaBullet) {
			var peaBulletLeft = 30;

			var timePeaBulletGo = setInterval(function() {
				if(mouse_img.parentNode) {
					peaBulletLeft += 8;
					peaBullet.style.left = peaBulletLeft + "px";

					if(mouse_img_rows == 1 && zombieArrOne.length > 0 && parseInt(peaBullet.getBoundingClientRect().left) > parseInt(zombieArrOne[0].zombieDomLeft)) {
						clearInterval(timePeaBulletGo);
						delzombieObj(zombieArrOne, peaBullet);
					} else if(mouse_img_rows == 2 && zombieArrTwo.length > 0 && parseInt(peaBullet.getBoundingClientRect().left) > parseInt(zombieArrTwo[0].zombieDomLeft)) {
						clearInterval(timePeaBulletGo);
						delzombieObj(zombieArrTwo, peaBullet);
					} else if(mouse_img_rows == 3 && zombieArrThree.length > 0 && parseInt(peaBullet.getBoundingClientRect().left) > parseInt(zombieArrThree[0].zombieDomLeft)) {
						clearInterval(timePeaBulletGo);
						delzombieObj(zombieArrThree, peaBullet);
					} else if(mouse_img_rows == 4 && zombieArrFour.length > 0 && parseInt(peaBullet.getBoundingClientRect().left) > parseInt(zombieArrFour[0].zombieDomLeft)) {
						clearInterval(timePeaBulletGo);
						delzombieObj(zombieArrFour, peaBullet);
					} else if(mouse_img_rows == 5 && zombieArrFive.length > 0 && parseInt(peaBullet.getBoundingClientRect().left) > parseInt(zombieArrFive[0].zombieDomLeft)) {
						clearInterval(timePeaBulletGo);
						delzombieObj(zombieArrFive, peaBullet);
					}
					if(parseInt(peaBullet.getBoundingClientRect().left) > 1300) {
						clearInterval(timePeaBulletGo);
						peaBullet.parentNode.removeChild(peaBullet);
					}
				}
			}, 100);
		}

	}
}, {
	name: '坚果',
	num: 2,
	src1: 'img/plant-card/坚果/WallNut.bmp',
	src2: 'img/plant-card/坚果/WallNut.png',
	src3: 'img/plant-card/坚果/WallNutG.png',
	src4: 'img/plant-card/坚果/WallNut.gif',
	hp: 80,
	spend: 50,
	cd: 20,
	skill: function() {
		console.log("坚果没有技能,但是血量很高");
	}
}, {
	name: '土豆',
	num: 3,
	src1: 'img/plant-card/土豆/PotatoMine.bmp',
	src2: 'img/plant-card/土豆/PotatoMine.png',
	src3: 'img/plant-card/土豆/PotatoMineG.png',
	src4: 'img/plant-card/土豆/PotatoMineNotReady.gif',
	skillsrc1: 'img/plant-card/土豆/PotatoMine.gif',
	skillsrc2: 'img/plant-card/土豆/PotatoMine_mashed.gif',
	hp: 10,
	spend: 25,
	cd: 30,
	skill: function() {
		//爆炸，计时器长出来
		var mouse_img = document.querySelector(".mouse_img");
		var timePotatoGrow = setTimeout(function() {
			if(mouse_img.parentNode) {
				mouse_img.src = plantArr[3].skillsrc1;
				mouse_img.name = "土豆";
				hpArr[mouse_img.parentNode.dataset.num - 1] = 0;
			}
		}, 8000);
		var timeCheekPotato = setInterval(function() {
			if(mouse_img.name == "土豆") {
				clearInterval(timeCheekPotato);
				var timePotatoBoom = setInterval(function() {
					if(mouse_img.parentNode) {
						var zombie = document.querySelectorAll(".zombie");
						var delZombieArr = [];
						var mouse_img_rows = parseInt(mouse_img.parentNode.style.top) / 100;
						for(var i = 0, len = zombie.length; i < len; i++) {
							if(zombie[i].dataset.boxmark == mouse_img.parentNode.dataset.num) {
								clearInterval(timePotatoBoom);
								delZombieArr.push(zombie[i].dataset.zombienum);
								var a = zombie[i];
								a.parentNode.removeChild(a);
								mouse_img.src = plantArr[3].skillsrc2;
								mouse_img.style.left = "-20px";
								//移除该僵尸，不能用for循环 
								if(mouse_img_rows == 1) {
									zombieArrOne.forEach(function(item, i) {
										delZombieArr.forEach(function(items, j) {
											if(item.dataNum == items) {
												zombieArrOne.splice(i, 1);
											}
										});
									});
								} else if(mouse_img_rows.rows == 2) {
									zombieArrTwo.forEach(function(item, i) {
										delZombieArr.forEach(function(items, j) {
											if(item.dataNum == items) {
												zombieArrTwo.splice(i, 1);
											}
										});
									});
								} else if(mouse_img_rows == 3) {
									zombieArrThree.forEach(function(item, i) {
										delZombieArr.forEach(function(items, j) {
											if(item.dataNum == items) {
												zombieArrThree.splice(i, 1);
											}
										});
									});
								} else if(mouse_img_rows == 4) {
									zombieArrFour.forEach(function(item, i) {
										delZombieArr.forEach(function(items, j) {
											if(item.dataNum == items) {
												zombieArrFour.splice(i, 1);
											}
										});
									});
								} else if(mouse_img_rows == 5) {
									zombieArrFive.forEach(function(item, i) {
										delZombieArr.forEach(function(items, j) {
											if(item.dataNum == items) {
												zombieArrFive.splice(i, 1);
											}
										});
									});
								}

								var timePotatoNone = setTimeout(function() {
									mouse_img.parentNode.dataset.ui = "false";
									mouse_img.parentNode.style.zIndex = 0;
									mouse_img.parentNode.removeChild(mouse_img);
								}, 1000);

							}

						}
					}
				}, 500);

			}
		}, 500);

	}
}, {
	name: '樱桃',
	num: 4,
	src1: 'img/plant-card/樱桃/CherryBomb.bmp',
	src2: 'img/plant-card/樱桃/CherryBomb.png',
	src3: 'img/plant-card/樱桃/CherryBombG.png',
	src4: 'img/plant-card/樱桃/CherryBomb.gif',
	skillsrc1: 'img/plant-card/樱桃/Boom.gif',
	hp: 0,
	spend: 250,
	cd: 30,
	skill: function() {
		//爆炸，计时器长出来
		var mouse_img = document.querySelector(".mouse_img");
		var timeCherryBoom = setTimeout(function() {
			mouse_img.src = plantArr[4].skillsrc1;
			mouse_img.style.left = "-60px";
			mouse_img.style.top = "-30px";

			var specialBox = document.querySelector("#specialBox");
			//储存攻击范围
			var cherryBoomBoxArr = [];
			var delZombieTop = [];
			var delZombieMid = [];
			var delZombieDown = [];

			cherryBoomBoxArr.push(parseInt(mouse_img.parentNode.dataset.num));
			cherryBoomBoxArr.push(parseInt(mouse_img.parentNode.dataset.num) - 10);
			cherryBoomBoxArr.push(parseInt(mouse_img.parentNode.dataset.num) + 10);
			cherryBoomBoxArr.push(parseInt(mouse_img.parentNode.dataset.num) - 1);
			cherryBoomBoxArr.push(parseInt(mouse_img.parentNode.dataset.num) + 1);
			//对攻击范围进行加工
			if(cherryBoomBoxArr[1] < 0) {
				cherryBoomBoxArr[1] = 51;
			}
			if(cherryBoomBoxArr[2] > 49) {
				cherryBoomBoxArr[2] = 51;
			}
			if((cherryBoomBoxArr[0] + 10) % 10 == 1) {
				cherryBoomBoxArr[3] = 51;
			}
			if((cherryBoomBoxArr[0] + 10) % 10 == 0) {
				cherryBoomBoxArr[4] = 51;
			}
			console.log(cherryBoomBoxArr);
			var zombie = document.querySelectorAll(".zombie");
			for(var i = 0, len = zombie.length; i < len; i++) {
				if(zombie[i].dataset.boxmark == cherryBoomBoxArr[0]) {
					delZombieMid.push(zombie[i].dataset.zombienum);
					console.log(delZombieMid);
					var a = zombie[i];
					a.parentNode.removeChild(a);
				} else if(zombie[i].dataset.boxmark == cherryBoomBoxArr[1]) {
					delZombieTop.push(zombie[i].dataset.zombienum);
					var a = zombie[i];
					a.parentNode.removeChild(a);
				} else if(zombie[i].dataset.boxmark == cherryBoomBoxArr[2]) {
					delZombieDown.push(zombie[i].dataset.zombienum);
					var a = zombie[i];
					a.parentNode.removeChild(a);
				} else if(zombie[i].dataset.boxmark == cherryBoomBoxArr[3]) {
					delZombieMid.push(zombie[i].dataset.zombienum);
					var a = zombie[i];
					a.parentNode.removeChild(a);
				} else if(zombie[i].dataset.boxmark == cherryBoomBoxArr[4]) {
					delZombieMid.push(zombie[i].dataset.zombienum);
					var a = zombie[i];
					a.parentNode.removeChild(a);
				}
			}
			var mouse_img_rows = parseInt(mouse_img.parentNode.style.top) / 100;
			if(mouse_img_rows == 1) {
				zombieArrOne.forEach(function(item, i) {
					delZombieMid.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrOne.splice(i, 1);
						}
					});
				});
				zombieArrTwo.forEach(function(item, i) {
					delZombieDown.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrTwo.splice(i, 1);
						}
					});
				});
				console.log(zombieArrOne);
			} else if(mouse_img_rows == 2) {
				zombieArrOne.forEach(function(item, i) {
					delZombieTop.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrOne.splice(i, 1);
						}
					});
				});
				zombieArrTwo.forEach(function(item, i) {
					delZombieMid.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrTwo.splice(i, 1);
						}
					});
				});
				zombieArrThree.forEach(function(item, i) {
					delZombieDown.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrThree.splice(i, 1);
						}
					});
				});
				console.log(zombieArrTwo);
			} else if(mouse_img_rows == 3) {
				zombieArrTwo.forEach(function(item, i) {
					delZombieTop.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrTwo.splice(i, 1);
						}
					});
				});
				zombieArrThree.forEach(function(item, i) {
					delZombieMid.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrThree.splice(i, 1);
						}
					});
				});
				zombieArrFour.forEach(function(item, i) {
					delZombieDown.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrFour.splice(i, 1);
						}
					});
				});
				console.log(zombieArrThree);
			} else if(mouse_img_rows == 4) {
				zombieArrThree.forEach(function(item, i) {
					delZombieTop.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrThree.splice(i, 1);
						}
					});
				});
				zombieArrFour.forEach(function(item, i) {
					delZombieMid.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrFour.splice(i, 1);
						}
					});
				});
				zombieArrFive.forEach(function(item, i) {
					delZombieDown.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrFive.splice(i, 1);
						}
					});
				});
				console.log(zombieArrFour);
			} else if(mouse_img_rows == 5) {
				zombieArrFour.forEach(function(item, i) {
					delZombieTop.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrFour.splice(i, 1);
						}
					});
				});
				zombieArrFive.forEach(function(item, i) {
					delZombieMid.forEach(function(items, j) {
						if(item.dataNum == items) {
							zombieArrFive.splice(i, 1);
						}
					});
				});
				console.log(zombieArrFive);
			}

			var timeCherryNone = setTimeout(function() {
				mouse_img.parentNode.dataset.ui = "false";
				mouse_img.parentNode.style.zIndex = 0;
				mouse_img.parentNode.removeChild(mouse_img);
			}, 800);
		}, 1000);
	}
}];

console.log(plantArr);

//开始前选择植物卡片
function choosePlant() {

	var choose_plant = document.querySelector("#choose_plant");

	function choose_click() {
		var card_bar = document.querySelector("#card_bar");
		var plant_card = document.querySelectorAll(".plant_card");
		//只能选几个
		var only_num = 0;
		//只能选4个,可修改
		var max_only_num = 4;
		//这里补上提示板显示最多选择max_only_num个卡片

		document.body.onclick = function(e) {
			//禁止重复选择同一个
			if(e.target.className === "plant_card" && e.target.style.opacity != "0.5" && only_num < max_only_num) {
				e.target.style.opacity = "0.5";

				var num = e.target.num;
				var spend = e.target.spend;
				var hp = e.target.hp;
				//把选中的卡片放进卡片槽里	
				var game_plant_card = document.createElement("img");
				game_plant_card.src = plantArr[num].src2;
				game_plant_card.className = "game_plant_card";
				//从plant_card里继承num，spend,hp
				game_plant_card.num = num;
				game_plant_card.spend = spend;
				game_plant_card.hp = hp;
				card_bar.appendChild(game_plant_card);

				only_num++;

			} else if(e.target.className === "game_plant_card" && e.target.flag != "false") {
				//选错的情况
				e.target.parentNode.removeChild(e.target);
				only_num--;
				var num = e.target.num;
				plant_card[num].style.opacity = "1";
			}

		}
	}
	choose_click();
}

// 种植物函数
function plantPlant(e) {

	e.onclick = function() {
		//把卡片里的num，spend赋予mouse_img
		var spend = e.spend;
		var num = e.num;
		var hp = e.hp;
		//调用函数获得鼠标图片
		var sun_num = document.querySelector("#sun_num");
		var yg = parseInt(sun_num.innerHTML);
		if(e.dataset.cd === "no" && yg >= spend) {
			document.body.style.cursor = "pointer";
			//把鼠标img改成点击的图片
			var mouse_img = document.querySelector(".mouse_img");
			mouse_img.src = plantArr[num].src4;
			mouse_img.num = num;
			mouse_img.hp = hp;
			mouse_img.spend = spend;

			mouse_img.style.zIndex = "30";

			var bg = document.querySelector("#bg");
			bg.onmousemove = function(event) {
				//如果窗口居中应该-窗口的左（上）距离以及植物本身的宽高
				//没空去验证植物图片的高度，假设各40
				mouse_img.style.top = event.clientY - 40 + "px";
				mouse_img.style.left = event.clientX - 40 + "px";
			}
			mouse_img.style.transform = "rotate(0)";
			var box = document.querySelectorAll(".box");
			for(var i = 0; i < box.length; i++) {
				if(box[i].dataset.ui === "false") {
					box[i].style.zIndex = "50";
				}
			}
		} else {
			var prompt_div = document.querySelector("#prompt_div");
			prompt_div.innerHTML = "您点击的卡片在CD中或者没有阳光";
			return plantPlant(e);
		}

	}

	mousePlant();
}

//鼠标拿着植物会遇到的几种情况
function mousePlant() {
	document.body.onclick = function(event) {
		//拿着植物点阳光
		if(event.target.className === "sun") {
			sun_click(event.target);
		} else if(event.target.className === "game_plant_card") {
			//拿着植物点植物卡片，返回再选一次
			return plantPlant(event.target);
			//点同个植物卡片可以把植物放回去，鼠标指针变回默认
			//已经做好，但是点击次数很乱，不用
			//if(event.target.num === num){	
			//	    var mouse_img = document.querySelector(".mouse_img");
			//	    var bg = document.querySelector("#bg");
			//	    bg.removeChild(mouse_img);
			//      var mouse_img = document.createElement("img");
			//	    mouse_img.className = "mouse_img";
			//	    bg.appendChild(mouse_img);
			//	    bg.onmousemove = function(event) {
			//		   mouse_img.style.top = event.clientY - 110 + "px";
			//		   mouse_img.style.left = event.clientX - 190 + "px";
			//	    }
			//	    document.body.style.cursor = "default";
			//	    return doc_click();
			//	}else{
			//	//拿着植物点植物卡片，返回再选一次
			//		 return plantPlant(event.target);
			//	 }

		} else if(event.target.className === "one box" || event.target.className === "two box" || event.target.className === "three box" || event.target.className === "four box" || event.target.className === "five box") {

			//对应相应的cd时间，在种下去的瞬间图片变黑
			var game_plant_card = document.querySelectorAll(".game_plant_card");
			var mouse_img = document.querySelector(".mouse_img");
			var num = mouse_img.num;
			var spend = mouse_img.spend;

			for(var i = 0; i < game_plant_card.length; i++) {
				if(game_plant_card[i].num === num) {
					game_plant_card[i].src = plantArr[num].src3;
					game_plant_card[i].dataset.cd = "yes";
					cd(i, num);
				}
			}
			//卡片的冷却系统计数器
			function cd(i, num) {
				var timecd = setTimeout(function() {
					game_plant_card[i].dataset.cd = "no";
					game_plant_card[i].src = plantArr[num].src2;
				}, plantArr[num].cd * 1000);
			}
			//种下去的瞬间把相对应的阳光spend减掉
			var sun_num = document.querySelector("#sun_num");
			sun_num.innerHTML = parseInt(sun_num.innerHTML - spend);
			//拿着植物点box，种下去

			event.target.appendChild(mouse_img);

			hpArr[event.target.dataset.num - 1] = mouse_img.hp;

			//启动植物技能
			plantArr[num].skill();

			//种下去后把ui变成true
			event.target.style.zIndex = "10";
			event.target.dataset.ui = "true";

			//把鼠标img转移到box里，改变classname以防再次调用
			mouse_img.style.position = "absolute";
			mouse_img.style.left = "0px";
			mouse_img.style.top = "0px";
			mouse_img.className = "box_plant";
			document.body.style.cursor = "default";
			//qq=1的box隐藏，qq=2的box一直显示
			var box = document.querySelectorAll(".box");
			for(var k = 0; k < box.length; k++) {
				if(box[k].dataset.ui === "true") {
					box[k].style.zIndex = "10";
				} else {
					box[k].style.zIndex = "0";
				}
			}

			//中下去执行intoBox函数
			//var zombie = document.querySelectorAll(".zombie");
			// for (var i = 0,len = zombie.length;i<len;i++) {
			// intoBox(zombie[i]);
			//	 }
			//再次生成一个空鼠标img		  
			var bg = document.querySelector("#bg");
			var mouse_img = document.createElement("img");
			mouse_img.className = "mouse_img";
			bg.appendChild(mouse_img);
			bg.onmousemove = function(event) {
				mouse_img.style.top = event.clientY - 40 + "px";
				mouse_img.style.left = event.clientX - 40 + "px";
			}
			return doc_click();
		} else if(event.target.id === "shovel") {
			shovel();
		}
	}
}