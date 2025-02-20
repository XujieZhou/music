$(function(){
	
	//	时间换算
	function format(v) {
		v = Math.floor(v)
		var s = v % 60;
		s = (s < 10) ? ('0' + s) : s;
		var m = Math.floor(v / 60);
		return m + ':' + s;
	}
	
	
	var cindex = 0;
	var musics = [{
			name: "等你一生",
			autor: '胡夏',
			src: "胡夏 - 等一生.mp3"
		}, {
			name: "夜莺",
			autor: '雅尼',
			src: "雅尼 - 夜莺.mp3"
		}, {
			name: "给我一个吻",
			autor: '鹿晗  、杨子珊',
			src: "鹿晗、杨子姗 - 给我一个吻.mp3"
		}, {
			name: "我们的明天",
			autor: '杨子珊',
			
			src: "杨子姗 - 我们的明天.mp3"
		}

	];
	
	
	//渲染函数
	function render() {
		$('#songs').empty();
		$.each(musics, function(i, v) {
			var n = (i === cindex) ? 'active' : '';
			$('<li class="' + n + '"><span>' + v.name + '</span> <span>' + v.autor + '</span><span class="delete">×</span></li>').appendTo('#songs');
		})
	}
	render();
	$('#songs').on('touchend', "li", function() {
		$('#songs').find('li').removeClass('active');
		$(this).addClass("active");
		cindex = $(this).index();
		audio.src = musics[cindex].src;
		audio.play();
		play.html("&#xe672;");
		$('#ming').html(musics[cindex].name);
		$('#geshou').html(musics[cindex].autor);
	})
	
	
	
//	上一曲
	var pre = $("#prev");
	pre.on("touchend", function() {
		cindex--;
		if(cindex <= 0) {
			cindex = musics.length - 1;
		}
		$('#songs li').removeClass("active");
		$('#songs li').eq(cindex).addClass("active");
		audio.src = musics[cindex].src;
		audio.play();
		$('#ming').html(musics[cindex].name);
		
		$('#geshou').html(musics[cindex].autor);
		console.log($('#geshou'))
	})
	
	
//	下一曲
	var next = $("#next");
	next.on("touchend", function() {
		cindex++;
		if(cindex > musics.length - 1) {
			cindex = 0;
		}
		$('#songs li').removeClass("active");
		$('#songs li').eq(cindex).addClass("active");
		audio.src = musics[cindex].src;
		audio.play();
		$('#ming').html(musics[cindex].name);
		$('#geshou').html(musics[cindex].autor);
	})
	
	
	//删除

	
	
	
	
	
	
	var $audio=$("#audio");
	var audio=$("#audio").get(0);
	var play=$('#play');
	var current = $("#jinxing");
	var duration = $("#duration");
	var pi = $("#p-i");
	var progress = $("#progress");
	var baik=$("#jin")
	var vol = $('#volume');
	var vi = $('#v-i');
	var yin = $('#yin');
	var jingyin=$("#small");
	
	
	
	
	//	播放
	play.on("click",function(){
		if(audio.paused){
			audio.play();
			$(this).html("&#xe672;");
		}else{
			audio.pause();
			$(this).html("&#xe646;");
		}
	})
	
	
	$(audio).on("timeupdate", function(e) {
		current.html(format(audio.currentTime));
		var left = progress.width() * audio.currentTime / audio.duration - pi.width() / 2 + "px";
		pi.css('left', left);
		baik.css("width",left);
		
	})
	
	
	//设置当前时长
	progress.on('click',function(e){
		audio.currentTime = e.offsetX / $(this).width() * audio.duration;
	})
	
	//	进度拖拽
	pi.on("touchstart",function(e){							//进度条拖进
		ox=e.originalEvent.changedTouches[0].clientX-pi.offset().left;
		var start=pi.width()/2-ox;
		pi.on("touchmove",function(e){
			var left1=e.originalEvent.changedTouches[0].clientX-progress.offset().left+start;
				if(left1>=progress.width()||left1<=0){
					return;	
				}
			audio.currentTime=left1/progress.width()*audio.duration;
			
		})
		return false;
	})
	pi.on('touchend',function(e){
		var offsetX=e.originalEvent.changedTouches[0].clientX;
	});
	pi.on("touchend", false);
	
	
	//	音量

	vi.on("click", function(e) {
		return false;
	})
	vol.on('click', function(e) {
		audio.volume = e.offsetX / vol.width();
		jingyin.removeProp('data-v');
	})

	//	静音

	jingyin.on('click', function() {
		if($(this).prop('data-v')) {
			audio.volume = $(this).prop('data-v');
			$(this).removeProp('data-v');
		} else {
			$(this).prop('data-v', audio.volume);
			audio.volume = 0;
		}
	})
	
	
	vi.on('touchstart',function(e){
		var offsetX=e.originalEvent.changedTouches[0].clientX-vi.offset().left;
		var r=vi.width()/2;
		var start=r-offsetX;
		vi.on("touchmove",function(e){
			 var pos=e.originalEvent.changedTouches[0].clientX-progress.offset().left+start;
			 var c=pos/vol.width();
	         if(c< 0 || c > 1) { /*边界问题*/
					return;
				}
	         audio.volume=pos/vol.width();
		})
		return false;
	})
	vi.on('touchend',function(e){
		var offsetX=e.originalEvent.changedTouches[0].clientX-vi.offset().left;
	});



	
	
	
	//	进度条
	$(audio).on("canplay", function() {
		duration.html(format(audio.duration));
	});

	
	
	$(audio).on("volumechange", function() {
		var left = vol.width() * audio.volume - vi.width() / 2 + "px";
		vi.css('left', left);
		yin.css('width',left);
	})
	
	$(audio).on("loadstart", function() {

	})
	
	$(audio).on("progress", function(e) {
		
	})
	$(audio).on("play", function() {
		
	})
	$(audio).on("pause", function() {
		
	})
	$(audio).on("ended", function() {
		
	})

	
	
	
	
	
	//选项卡
	$(".songs").on("touchstart",function(){
		$("#songs").toggleClass("ac");
	})
	
	
})