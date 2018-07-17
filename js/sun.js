function sun() {
	var sun_bar = document.querySelector("#sun_bar");

	//生成阳光函数，随机left
	function creatSun() {
		window.clearTimeout(timeCreatSun);
		var sun = document.createElement("img");
		var sunLeft = ~~(Math.random() * 780);
		sun.src = "img/Sun.gif";
		sun.className = "sun";
		sun.style.left = sunLeft + "px";
		sun_bar.appendChild(sun);
		var timeCreatSun = setTimeout(creatSun, 5000);
		//这里可以写成sunset.call(sun);
		//然后把sunset里的所有sun都改成this
		//this指向最后一个调用他的对象，如果是window调用就是window
		sunset(sun);

	}
	creatSun();

	//太阳落下函数，随机落下top
	function sunset(e) {

		var taiyang_max_top = ~~(Math.random() * 555);
		//限制阳光往下掉
		taiyang_max_top = Math.max(taiyang_max_top, 110);
		var fall_top = 0;
		var timeSunFall = setInterval(function() {

			fall_top += 5;
			e.style.top = fall_top + "px";
			if(fall_top >= taiyang_max_top) {
				window.clearInterval(timeSunFall);
				var timeSunNone = setTimeout(function() {

					//与clicksun事件有冲突
					//e.parentNode.removeChild(e);
					e.style.display = "none";
					window.clearTimeout(timeSunNone);
				}, 3000);

			}

		}, 50);

	}
}
//鼠标点击阳光消失，如果写在sun函数里，
// twotime函数会一直监听着sun函数，
// 使得单线程js一直在执行start函数，
//  不能进行下一步函数
function sun_click(e) {
	var sun_num = document.querySelector("#sun_num");
	e.parentNode.removeChild(e);
	var yg = parseInt(sun_num.innerHTML);
	yg += 25;
	sun_num.innerHTML = yg;

}