var M_WIDTH=800, M_HEIGHT=450;
var app, game_res, game, objects={}, state='', game_tick=0, my_turn=false, git_src='',some_process = {},  game_platform='',is_listening=false,say=true;
var all_voices, ru_voices, synth,utterance;
var my_data={opp_id : ''};

class letter_class extends PIXI.Container{
	
	constructor(letter) {
		super();
		this.letter=letter;
		
		this.bcg=new PIXI.Sprite(gres.letter_bcg.texture);
		this.bcg.interactive=true;
		this.bcg.buttonMode=true;
		this.bcg.pointerdown=main_menu.button_down.bind(main_menu,this.letter);
		this.bcg.pointerover=function(){this.bcg.alpha=0.5;}.bind(this);
		this.bcg.pointerout=function(){this.bcg.alpha=1;}.bind(this);
		this.bcg.width = 150;
		this.bcg.height = 120;
		
		this.ltext="";
		this.ltext=new PIXI.BitmapText('...', {fontName: 'mfont',fontSize: 50});
		this.ltext.anchor.set(0.5,0.5);
		this.ltext.x=70;
		this.ltext.y=60;
		this.ltext.tint=0x000000;
		this.ltext.text=letter;
		
		this.addChild(this.bcg,this.ltext);
		
	}
	
	
	
}

irnd = function (min,max) {	
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rgb_to_hex = (r, g, b) => '0x' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

anim2={
		
	c1: 1.70158,
	c2: 1.70158 * 1.525,
	c3: 1.70158 + 1,
	c4: (2 * Math.PI) / 3,
	c5: (2 * Math.PI) / 4.5,
	empty_spr : {x:0,visible:false,ready:true, alpha:0},
		
	slot: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
	
	any_on : function() {
		
		for (let s of this.slot)
			if (s !== null&&s.block)
				return true
		return false;		
	},
	
	wait(seconds){		
		return this.add(this.empty_spr,{x:[0,1]}, false, seconds,'linear');		
	},
	
	linear: function(x) {
		return x
	},
	
	kill_anim: function(obj) {
		
		for (var i=0;i<this.slot.length;i++)
			if (this.slot[i]!==null)
				if (this.slot[i].obj===obj)
					this.slot[i]=null;		
	},
	
	easeOutBack: function(x) {
		return 1 + this.c3 * Math.pow(x - 1, 3) + this.c1 * Math.pow(x - 1, 2);
	},
	
	easeOutElastic: function(x) {
		return x === 0
			? 0
			: x === 1
			? 1
			: Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * this.c4) + 1;
	},
	
	easeOutSine: function(x) {
		return Math.sin( x * Math.PI * 0.5);
	},
	
	easeOutCubic: function(x) {
		return 1 - Math.pow(1 - x, 3);
	},
	
	easeInBack: function(x) {
		return this.c3 * x * x * x - this.c1 * x * x;
	},
	
	easeInQuad: function(x) {
		return x * x;
	},
	
	easeOutBounce: function(x) {
		const n1 = 7.5625;
		const d1 = 2.75;

		if (x < 1 / d1) {
			return n1 * x * x;
		} else if (x < 2 / d1) {
			return n1 * (x -= 1.5 / d1) * x + 0.75;
		} else if (x < 2.5 / d1) {
			return n1 * (x -= 2.25 / d1) * x + 0.9375;
		} else {
			return n1 * (x -= 2.625 / d1) * x + 0.984375;
		}
	},
	
	easeInCubic: function(x) {
		return x * x * x;
	},
	
	ease2back : function(x) {
		return Math.sin(x*Math.PI*2);
	},
	
	easeInOutCubic: function(x) {
		
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	},
	
	shake : function(x) {
		
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
		
		
	},	
	
	add : function(obj,params,vis_on_end,time,func,block) {
				
		//если уже идет анимация данного спрайта то отменяем ее
		anim2.kill_anim(obj);
		/*if (anim3_origin === undefined)
			anim3.kill_anim(obj);*/

		let f=0;
		//ищем свободный слот для анимации
		for (var i = 0; i < this.slot.length; i++) {

			if (this.slot[i] === null) {

				obj.visible = true;
				obj.ready = false;
				
				//добавляем дельту к параметрам и устанавливаем начальное положение
				for (let key in params) {
					params[key][2]=params[key][1]-params[key][0];					
					obj[key]=params[key][0];
				}
				
				//для возвратных функцие конечное значение равно начальному
				if (func === 'ease2back')
					for (let key in params)
						params[key][1]=params[key][0];					
					
				this.slot[i] = {
					obj: obj,
					block:block===undefined,
					params: params,
					vis_on_end: vis_on_end,
					func: this[func].bind(anim2),
					speed: 0.01818 / time,
					progress: 0
				};
				f = 1;
				break;
			}
		}
		
		if (f===0) {
			console.log("Кончились слоты анимации");	
			
			
			//сразу записываем конечные параметры анимации
			for (let key in params)				
				obj[key]=params[key][1];			
			obj.visible=vis_on_end;
			obj.alpha = 1;
			obj.ready=true;
			
			
			return new Promise(function(resolve, reject){					
			  resolve();	  		  
			});	
		}
		else {
			return new Promise(function(resolve, reject){					
			  anim2.slot[i].p_resolve = resolve;	  		  
			});			
			
		}

	},	
	
	process: function () {
		
		for (var i = 0; i < this.slot.length; i++)
		{
			if (this.slot[i] !== null) {
				
				let s=this.slot[i];
				
				s.progress+=s.speed;		
				
				for (let key in s.params)				
					s.obj[key]=s.params[key][0]+s.params[key][2]*s.func(s.progress);		
				
				//если анимация завершилась то удаляем слот
				if (s.progress>=0.999) {
					for (let key in s.params)				
						s.obj[key]=s.params[key][1];
					
					s.obj.visible=s.vis_on_end;
					if (s.vis_on_end === false)
						s.obj.alpha = 1;
					
					s.obj.ready=true;					
					s.p_resolve('finished');
					this.slot[i] = null;
				}
			}			
		}
		
	}
	
}

sound = {
	
	on : 1,	
	
	play(snd_res,res_source) {
				
		if(res_source===undefined)
			res_source=gres;
		
		if (this.on === 0)
			return;
		
		if (res_source[snd_res]===undefined)
			return;
		
		res_source[snd_res].sound.play();		
	}
	
	
}

ad = {
	
	prv_show : -9999,
	
	show : function() {
		
		if ((Date.now() - this.prv_show) < 90000 )
			return false;
		this.prv_show = Date.now();		
		
		if (game_platform==="YANDEX") {			
			//показываем рекламу
			window.ysdk.adv.showFullscreenAdv({
			  callbacks: {
				onClose: function() {}, 
				onError: function() {}
						}
			})
		}
		
		if (game_platform==="VK") {
					 
			vkBridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
			.then(data => console.log(data.result))
			.catch(error => console.log(error));	
		}		

		if (game_platform==="MY_GAMES") {
					 
			my_games_api.showAds({interstitial:true});
		}			
		
		if (game_platform==='GOOGLE_PLAY') {
			if (typeof Android !== 'undefined') {
				Android.showAdFromJs();
			}			
		}
		
		
	},
	
	show2 : async function() {
		
		
		if (game_platform ==="YANDEX") {
			
			let res = await new Promise(function(resolve, reject){				
				window.ysdk.adv.showRewardedVideo({
						callbacks: {
						  onOpen: () => {},
						  onRewarded: () => {resolve('ok')},
						  onClose: () => {resolve('err')}, 
						  onError: (e) => {resolve('err')}
					}
				})
			
			})
			return res;
		}
		
		if (game_platform === "VK") {	

			let res = '';
			try {
				res = await vkBridge.send("VKWebAppShowNativeAds", { ad_format: "reward" })
			}
			catch(error) {
				res ='err';
			}
			
			return res;				
			
		}	
		
		return 'err';
		
	}
}

var sr = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognizer = new sr();
recognizer.lang = 'ru-Ru';
recognizer.interimResults = true;
recognizer.continuous  = true;

game={
	
	words:[],
	cur_animal_id:0,
	stable:true,
	resolver:function(){},
	cur_word_index:0,
	animal_cnt:0,	
	animal_to_pickup:0,
	finish_flag:false,
	animals_textures:[],
	stop_flag:false,

	shuffle(arr) {
	   for (let i = arr.length - 1; 0 < i; i--) {
		  const j = Math.floor(Math.random() * i);
		  [arr[i], arr[j]] = [arr[j], arr[i]];
	   }
	   return arr
	},
			
	activate: async function(letter) {
			
		this.stop_flag=false;
		
		//выбор буквы
		if (letter==='ВСЕ'){
			let sum_arr=[];
			for(let [key, value] of Object.entries(words)) {
				
				sum_arr.push(...value);
				
			}
			this.words=this.shuffle(sum_arr);
		}else{
			
			this.words=words[letter];			
			
		}
		
		
		objects.road.visible=true;
		objects.start_flag.visible=true;
		
		objects.word.text=this.words[this.cur_word_index];

		this.cur_word_index=0;
		this.cor_word_cnt=0;
		
		this.finish_flag=false;
					
		objects.bcg.tilePosition.x = 0;
		objects.road.tilePosition.x = 0;	
				
		this.animal_cnt=0;
		
		//выбор фона
		if(Math.random()>0.5){
			objects.bcg.texture=gres.bcg.texture;			
			objects.road.texture=gres.road.texture;			
		}else{
			objects.bcg.texture=gres.bcg1.texture;			
			objects.road.texture=gres.road1.texture;	
		}

		

		//в пикапе пока никого нет
		objects.animals_in_pickup.forEach(a=>a.visible=false);
		
		//в окнах пока никого нет
		objects.window_animals.forEach(a=>a.visible=false);
						
		//anim2.add(objects.main_data,{x:[1600, objects.main_data.sx]},true,0.5,'easeOutBack');		
		anim2.add(objects.car_cont,{y:[600,objects.car_cont.sy]},true,1,'easeOutBack');
						
		some_process.game=this.process;
		
		this.run_game();

	},
	
	selectItemByProbability(arr) {

	  const sum = arr.reduce((acc, item) => acc + item.prob, 0);
	  const randomNum = Math.random() * sum;
	  let acc = 0;
	  for (const item of arr) {
		acc += item.prob;
		if (randomNum <= acc) {
		  return item;
		}
	  }
	},
	
	async run_game(){
				
		
		//массив животных
		this.animals_textures=[
			[gres.beer.texture,Math.random()],
			[gres.penguin.texture,Math.random()],
			[gres.fox.texture,Math.random()],
			[gres.rabbit.texture,Math.random()],
			[gres.dog.texture,Math.random()],
			[gres.citty.texture,Math.random()],
			[gres.cocoon.texture,Math.random()],
			[gres.panda.texture,Math.random()],
			[gres.beer2.texture,Math.random()],
			[gres.rabbit2.texture,Math.random()],
			[gres.lion.texture,Math.random()],
			[gres.cow.texture,Math.random()],
			[gres.pig.texture,Math.random()],
			[gres.mangoose.texture,Math.random()],
			[gres.slon.texture,Math.random()],
			[gres.bigear.texture,Math.random()*3],
			[gres.kitty.texture,Math.random()*3]			
		];		
		
		this.animals_textures.sort((a, b) => a[1] - b[1]);
		
		this.set_next_animal();
		objects.start_flag.visible=true
		objects.start_flag.x=objects.start_flag.sx;
		this.animal_cnt=0;
				
		
		for(let a=0;a<6;a++){
			
			await this.move_car();

			while(true){
				
				await this.show_word_info();
				const result=await this.say_and_listen_word();
				if (result==='error'){
					this.back_down();					
					return;
				}

				await anim2.wait(0.5);
				await this.hide_word_info();
				if(result==='correct')
					break
			}
			
			this.pickup_animal();
			this.set_next_animal();	
		}
		
		await this.move_car();
		await this.fill_animals();
		await this.happy_window_animals();
		ad.show();
		this.close();
		voice_menu.activate();
		
	},
	
	async happy_window_animals(){
		
		
		sound.play('laughting');
		for(let a of objects.window_animals){
			a.r_iter=0;
			a.r_dir=Math.random()*0.25+0.15;
			if(Math.random()>0.5)
				a.r_dir=-a.r_dir;
		}
		
		await new Promise((resolve)=>{
						
			setTimeout(resolve, 5000);
			some_process.happy_animals=function(){
				
				for(let a of objects.window_animals){
					a.rotation=Math.sin(a.r_iter)*0.2;
					a.r_iter+=a.r_dir;
				}
			}		
		})	
		
		some_process.happy_animals=function(){};
		
	},
	
	pickup_animal(){

		sound.play('pickup');
		objects.animal_to_pick.visible=false;
		objects.animals_in_pickup[this.animal_cnt].visible=true;
		objects.animals_in_pickup[this.animal_cnt].texture=objects.animal_to_pick.texture;
		this.animal_cnt++;
		
	},
	
	set_next_animal(){
		
		//если уже достаточно животных ставим дом
		if (this.animal_cnt>5) {					
			
			objects.house2_cont.visible=true;
			objects.house2_cont.x=1600+objects.house2_cont.sx;
			return;
		}
		
		//это очередная фигурка
		objects.animal_to_pick.visible=false;

		
		objects.animal_to_pick.texture=this.animals_textures[this.animal_cnt][0];
		objects.animal_to_pick.visible=true;
		objects.animal_to_pick.x=1900;
		
	},
	
	close(){
		
		this.stop_flag=true;
		recognizer.abort();
		recognizer.stop();
		game.resolver();
		some_process.car_move=function(){};
		objects.road.visible=false;
		objects.start_flag.visible=false;
		objects.animal_to_pick.visible=false;
		objects.house2_cont.visible=false;
		//objects.window_animals_cont.visible=false;
		objects.car_cont.visible=false;
		objects.main_data.visible=false;
		objects.back_button.visible=false;
		some_process.game=function(){};
		
	},
	
	process(){

	},
	
	back_down(){
		
		
		this.close();
		
		voice_menu.activate();
		
		
	},
	
	async move_car(){
		

		sound.play('engine');
		let traveled=0;
		let t=-Math.PI/2;
		let prv_x=0;
		const distance_to_travel=1600;
			
		some_process.car_move=function(){	

			let passed=(Math.sin(t)+1)*0.5*distance_to_travel;
			let spd=passed-prv_x;
			prv_x=passed;
			
			//если впереди зверушка
			if (objects.animal_to_pick.visible)
				objects.animal_to_pick.x-=spd;	
			
			//если впереди домик
			if(objects.house2_cont.visible)
				objects.house2_cont.x-=spd;
			
			if(objects.start_flag.visible){				
				objects.start_flag.x-=spd;
				if(objects.start_flag.x<-400)
					objects.start_flag.visible=false;				
			}

			
			traveled+=spd;			
			objects.bcg.tilePosition.x -= spd*0.1;
			objects.road.tilePosition.x -= spd;
			objects.wheel0.rotation+=spd/30;
			objects.wheel1.rotation+=spd/30;
			objects.pickup_cont.rotation=Math.sin(traveled*0.05)*0.05;
			objects.car_cont.y=objects.car_cont.sy-Math.sin(traveled*0.05)*3;	
			
			if(t>Math.PI/2)			
				game.resolver();	
			
			t+=0.01;
		}
				
		

		await new Promise(function(resolve, reject){game.resolver=resolve;})
		if(this.stop_flag) return;		
		some_process.car_move=function(){};
						
		anim2.add(objects.car_cont,{y:[objects.car_cont.y,objects.car_cont.sy]},true,1.5,'easeOutBack');
		anim2.add(objects.pickup_cont,{rotation:[objects.pickup_cont.rotation,0]},true,1.5,'easeOutBack');
			
	},
	
	async fill_animals(){
		
		for(let i=5;i>=0;i--){
			objects.window_animals[i].visible=true;
			
			const s_base_tex=objects.animals_in_pickup[i].texture.baseTexture;
			const t_tex=new PIXI.Texture(s_base_tex,new PIXI.Rectangle(0, 0, s_base_tex.width, 230))
			objects.window_animals[i].texture=t_tex;
			objects.window_animals[i].visible=true;
			sound.play('animal_window');
			objects.animals_in_pickup[i].visible=false;
			await anim2.wait(0.5);
		}	
		
	},
	
	async wrong_answer(){			
		
		//await this.move_car();
		
		sound.play('click');		
		objects.start_button.alpha=1;
		objects.start_button.texture=gres.incorrect_img.texture;
		await anim2.add(objects.start_button,{scale_xy:[0.666,1]},true,0.8,'ease2back');
		this.next_word();		
		
	},
	
	async correct_answer(){
			
		this.show_sun_rays();			
		
		//sound.play('click');		
		objects.start_button.alpha=1;
		
		anim2.add(objects.start_button,{rotation:[0,0.5],scale_xy:[0.666,1]},true,1,'ease2back');
		objects.start_button.texture=gres.correct_img.texture;
		
		
		
		await this.move_car();	
		
		if (this.finish_flag){			
			anim2.add(objects.main_data,{y:[objects.main_data.y, -500]},false,0.5,'linear');
			return;
		} 
		this.next_word();
	},
	
	async show_sun_rays(){
		
		some_process.rotate_sun_rays=function(){objects.sun_rays.rotation+=0.05};
		await anim2.add(objects.sun_rays,{alpha:[0, 0.5],scale_xy:[1,2]},true,2,'linear');
		await anim2.add(objects.sun_rays,{alpha:[0.5, 0],scale_xy:[2,1]},false,2,'linear');
		some_process.rotate_sun_rays=function(){};
	},
	
	async show_word_info(){
		
		this.cur_word_index++;
		this.cur_word_index=this.cur_word_index%this.words.length;
		objects.word.text=this.words[this.cur_word_index];		
		objects.word_result.text='';	
		objects.words_bcg.tint=0xffffff;
			
		await anim2.add(objects.main_data,{y:[-500, objects.main_data.sy]},true,0.5,'easeOutCubic');
		
	},
	
	async hide_word_info(){
					
		await anim2.add(objects.main_data,{y:[objects.main_data.y, -500]},false,0.5,'linear');
		
	},
	
	async start_button(){
		
		objects.start_button.interactive=true;
		objects.start_button.pointerdown=function(){game.resolver()};		
		await new Promise(function(resolve, reject){game.resolver=resolve;})
		
		sound.play('click');

	},
	
	ss_down:function(){
		alert('ss');
		if(say){
			
			objects.ss_front.x=objects.ss_front.sx;
			say=false;
			
		}else{
			
			objects.ss_front.x=objects.ss_front.sx+38;
			say=true;			
		}
		
		sound.play('click');
		
		
	},
		
	async say_and_listen_word() {
		
		
		objects.word_result.text='Жди...';
		await voice_menu.say_word('скажи '+objects.word.text);	
		
	
		recognizer.abort();
		recognizer.stop();
		recognizer.start();	
				
		some_process.mic_flash=function(){			
			objects.mic.alpha=Math.abs(Math.sin(game_tick*3));			
		}
		
		
		objects.back_button.visible=true;
		
		let final_word ="";
		const result = await new Promise(function(resolve, reject){
			
			recognizer.onresult = function (event) {
			  
				const result = event.results[event.resultIndex];
				const result_text=result[0].transcript.toUpperCase();
				if(result_text!=='')
					objects.word_result.text=result_text;
			  
				if(objects.word.text.replace(/\s/g, '')===result_text.replace(/\s/g, ''))
					resolve('correct')
			  
			};	
		  
			recognizer.onend = function (event) {   
			  console.log("onend")
			  if (final_word==="")
				resolve('end');
			};	
			
			recognizer.onstart = function (event) {  
				console.log('onstart');
				sound.play('ready');
				objects.word_result.text='Говори...';
				setTimeout(function(){resolve('timeout')}, 6000);
			};	
		  
			recognizer.onerror = function (event) {
				console.log(event)     
				final_word='какая-то ошибка((('
				resolve('error');
				if(event.error==='not-allowed'){
					alert('Нет доступа к микрофону');
					return 'error'
				}
			};	
		  
			recognizer.onnomatch= function (event) {
			  console.log('onnomatch');
			};	
			
			recognizer.onaudioend= function (event) {
			  console.log('onaudioend');
			};	
			
			recognizer.onaudiostart= function (event) {
			  console.log('onaudiostart');
			};	
			
			recognizer.onspeechend= function (event) {
			  console.log('onspeechend');
			};	
			
			recognizer.onspeechstart= function (event) {
			  console.log('onspeechstart');
			};	
			
		});
		
		objects.back_button.visible=false;
		
		console.log('result: ',result);
		if(result==='correct'){
			objects.words_bcg.tint=0x00ff00;			
			sound.play('win')
		}else{
			objects.words_bcg.tint=0xff0000;			
			sound.play('lose')
		}

		
		//objects.word_result.text=final_word;
		some_process.mic_flash=function(){};
		objects.mic.alpha=1;
		
		recognizer.abort();
		recognizer.stop();
		
		return result;
	},


}

keep_alive= function() {
	
	if (h_state === 1) {		
		
		//убираем из списка если прошло время с момента перехода в скрытое состояние		
		let cur_ts = Date.now();	
		let sec_passed = (cur_ts - hidden_state_start)/1000;		
		if ( sec_passed > 100 )	firebase.database().ref(room_name +"/"+my_data.uid).remove();
		return;		
	}


	firebase.database().ref("players/"+my_data.uid+"/tm").set(firebase.database.ServerValue.TIMESTAMP);
	firebase.database().ref("inbox/"+my_data.uid).onDisconnect().remove();
	
	set_state({});
}

show_ad=function(){
		
	if (game_platform==="YANDEX") {			
		//показываем рекламу
		window.ysdk.adv.showFullscreenAdv({
		  callbacks: {
			onClose: function() {}, 
			onError: function() {}
					}
		})
	}
	
	if (game_platform==="VK") {
				 
		vkBridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
		.then(data => console.log(data.result))
		.catch(error => console.log(error));	
	}	
	
	if (game_platform==='GOOGLE_PLAY') {
		if (typeof Android !== 'undefined') {
			Android.showAdFromJs();
		}			
	}
	
}

auth2 = {
		
	load_script : function(src) {
	  return new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.type = 'text/javascript'
		script.onload = resolve
		script.onerror = reject
		script.src = src
		document.head.appendChild(script)
	  })
	},
			
	get_random_char : function() {		
		
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		return chars[irnd(0,chars.length-1)];
		
	},
	
	get_random_uid_for_local : function(prefix) {
		
		let uid = prefix;
		for ( let c = 0 ; c < 12 ; c++ )
			uid += this.get_random_char();
		
		//сохраняем этот uid в локальном хранилище
		try {
			localStorage.setItem('poker_uid', uid);
		} catch (e) {alert(e)}
					
		return uid;
		
	},
	
	get_random_name : function(uid) {
		
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		const rnd_names = ['Gamma','Chime','Dron','Perl','Onyx','Asti','Wolf','Roll','Lime','Cosy','Hot','Kent','Pony','Baker','Super','ZigZag','Magik','Alpha','Beta','Foxy','Fazer','King','Kid','Rock'];
		
		if (uid !== undefined) {
			
			let e_num1 = chars.indexOf(uid[3]) + chars.indexOf(uid[4]) + chars.indexOf(uid[5]) + chars.indexOf(uid[6]);
			e_num1 = Math.abs(e_num1) % (rnd_names.length - 1);				
			let name_postfix = chars.indexOf(uid[7]).toString() + chars.indexOf(uid[8]).toString() + chars.indexOf(uid[9]).toString() ;	
			return rnd_names[e_num1] + name_postfix.substring(0, 3);					
			
		} else {

			let rnd_num = irnd(0, rnd_names.length - 1);
			let rand_uid = irnd(0, 999999)+ 100;
			let name_postfix = rand_uid.toString().substring(0, 3);
			let name =	rnd_names[rnd_num] + name_postfix;				
			return name;
		}	
	},	
	
	get_country_code : async function() {
		
		let country_code = ''
		try {
			let resp1 = await fetch("https://ipinfo.io/json");
			let resp2 = await resp1.json();			
			country_code = resp2.country;			
		} catch(e){}

		return country_code;
		
	},
	
	search_in_local_storage : function() {
		
		//ищем в локальном хранилище
		let local_uid = null;
		
		try {
			local_uid = localStorage.getItem('poker_uid');
		} catch (e) {alert(e)}
				
		if (local_uid !== null) return local_uid;
		
		return undefined;	
		
	},
	
	init : async function() {	
				
		if (game_platform === 'YANDEX') {			
		
			try {await this.load_script('https://yandex.ru/games/sdk/v2')} catch (e) {alert(e)};										
					
			let _player;
			
			try {
				window.ysdk = await YaGames.init({});			
				_player = await window.ysdk.getPlayer();
			} catch (e) { alert(e)};
			
			my_data.uid = _player.getUniqueID().replace(/[\/+=]/g, '');
			my_data.name = _player.getName();
			my_data.pic_url = _player.getPhoto('medium');
			
			if (my_data.pic_url === 'https://games-sdk.yandex.ru/games/api/sdk/v1/player/avatar/0/islands-retina-medium')
				my_data.pic_url = 'https://avatars.dicebear.com/api/adventurer/' + my_data.uid + '.svg';
			
			if (my_data.name === '')
				my_data.name = this.get_random_name(my_data.uid);
			
			//если английский яндекс до добавляем к имени страну
			let country_code = await this.get_country_code();
			my_data.name = my_data.name + ' (' + country_code + ')';			


			
			return;
		}
		
		if (game_platform === 'VK') {
			
			try {await this.load_script('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js')} catch (e) {alert(e)};
			
			let _player;
			
			try {
				await vkBridge.send('VKWebAppInit');
				_player = await vkBridge.send('VKWebAppGetUserInfo');				
			} catch (e) {alert(e)};

			
			my_data.name 	= _player.first_name + ' ' + _player.last_name;
			my_data.uid 	= "vk"+_player.id;
			my_data.pic_url = _player.photo_100;
			
			return;
			
		}
		
		if (game_platform === 'GOOGLE_PLAY') {	

			let country_code = await this.get_country_code();
			my_data.uid = this.search_in_local_storage() || this.get_random_uid_for_local('GP_');
			my_data.name = this.get_random_name(my_data.uid) + ' (' + country_code + ')';
			my_data.pic_url = 'https://avatars.dicebear.com/api/adventurer/' + my_data.uid + '.svg';	
			return;
		}
		
		if (game_platform === 'DEBUG') {		

			my_data.name = my_data.uid = 'debug' + prompt('Отладка. Введите ID', 100);
			my_data.pic_url = 'https://avatars.dicebear.com/api/adventurer/' + my_data.uid + '.svg';		
			return;
		}
		
		if (game_platform === 'CRAZYGAMES') {
			
			let country_code = await this.get_country_code();
			try {await this.load_script('https://sdk.crazygames.com/crazygames-sdk-v1.js')} catch (e) {alert(e)};			
			my_data.uid = this.search_in_local_storage() || this.get_random_uid_for_local('CG_');
			my_data.name = this.get_random_name(my_data.uid) + ' (' + country_code + ')';
			my_data.pic_url = 'https://avatars.dicebear.com/api/adventurer/' + my_data.uid + '.svg';	
			let crazysdk = window.CrazyGames.CrazySDK.getInstance();
			crazysdk.init();			
			return;
		}
		
		if (game_platform === 'UNKNOWN') {
			
			//если не нашли платформу
			alert('Неизвестная платформа. Кто Вы?')
			my_data.uid = this.search_in_local_storage() || this.get_random_uid_for_local('LS_');
			my_data.name = this.get_random_name(my_data.uid);
			my_data.pic_url = 'https://avatars.dicebear.com/api/adventurer/' + my_data.uid + '.svg';	
		}
	}
	
}

resize=function() {
    const vpw = window.innerWidth;  // Width of the viewport
    const vph = window.innerHeight; // Height of the viewport
    let nvw; // New game width
    let nvh; // New game height

    if (vph / vpw < M_HEIGHT / M_WIDTH) {
      nvh = vph;
      nvw = (nvh * M_WIDTH) / M_HEIGHT;
    } else {
      nvw = vpw;
      nvh = (nvw * M_HEIGHT) / M_WIDTH;
    }
    app.renderer.resize(nvw, nvh);
    app.stage.scale.set(nvw / M_WIDTH, nvh / M_HEIGHT);
}

async function load_resources() {
	
	document.getElementById("m_progress").style.display = 'flex';

	git_src="https://akukamil.github.io/logoped/"
	//git_src=""

	//подпапка с ресурсами
	let lang_pack = 'RUS';

	game_res=new PIXI.Loader();
	game_res.add("m2_font", git_src+"fonts/Neucha/font.fnt");

	game_res.add('engine',git_src+'sounds/engine.mp3');
	game_res.add('animal_window',git_src+'sounds/animal_window.mp3');
	game_res.add('click',git_src+'sounds/click.mp3');
	game_res.add('locked',git_src+'sounds/locked.mp3');
	game_res.add('win',git_src+'sounds/win.mp3');
	game_res.add('lose',git_src+'sounds/lose.mp3');
	game_res.add('present_sound',git_src+'sounds/present.mp3');
	game_res.add('laughting',git_src+'sounds/laughting.mp3');
	game_res.add('pickup',git_src+'sounds/pickup.mp3');
	game_res.add('ready',git_src+'sounds/ready.mp3');
	
    //добавляем из листа загрузки
    for (var i = 0; i < load_list.length; i++){
		
        if (load_list[i].class === "sprite" || load_list[i].class === "image" )
            game_res.add(load_list[i].name, git_src+'res/'+lang_pack+'/'+load_list[i].name+"."+load_list[i].image_format);			
		
		 if (load_list[i].class === "asprite" )
            game_res.add(load_list[i].name, git_src+"gifs/" + load_list[i].res_name);
	}


	game_res.onProgress.add(progress);
	function progress(loader, resource) {
		document.getElementById("m_bar").style.width =  Math.round(loader.progress)+"%";
	}
	
	//короткое обращение к ресурсам
	gres=game_res.resources;
	
	await new Promise((resolve, reject)=> game_res.load(resolve))
	
	//убираем элементы загрузки
	document.getElementById("m_progress").outerHTML = "";	
}

async function define_platform_and_language() {
	
	let s = window.location.href;
	
	if (s.includes('yandex')) {
		
		game_platform = 'YANDEX';
		
		if (s.match(/yandex\.ru|yandex\.by|yandex\.kg|yandex\.kz|yandex\.tj|yandex\.ua|yandex\.uz/))
			LANG = 0;
		else 
			LANG = 1;		
		return;
	}
	
	if (s.includes('vk.com')) {
		game_platform = 'VK';	
		LANG = 0;	
		return;
	}
	
	if (s.includes('google_play')) {
			
		game_platform = 'GOOGLE_PLAY';	
		LANG = await language_dialog.show();
		return;
	}	

	if (s.includes('google_play')) {
			
		game_platform = 'GOOGLE_PLAY';	
		LANG = await language_dialog.show();
		return;	
	}	
	
	if (s.includes('192.168')) {
			
		game_platform = 'DEBUG';	
		LANG = 0;
		return;	
	}	
	
	game_platform = 'UNKNOWN';	
	

}

async function load_speech_stuff(){
		

	synth=window.speechSynthesis;
	if(!synth) alert("no synth");
	console.log("synth loaded")
			
	await new Promise((resolve, reject) => {
		if (synth.getVoices().length > 0) {
		  resolve();
		} else {
		  synth.onvoiceschanged = resolve;
		}
	});
	console.log("voices loaded")
		
	all_voices=await synth.getVoices();
	console.log("all_voices: "+all_voices.length);
	
	ru_voices = all_voices.filter(function (el) {
	  return ['ru-RU','ru_RU'].includes(el.lang)
	});
			
	objects.choose_voice_text_0.text=ru_voices[0].name;		
	objects.choose_voice_text_1.text=ru_voices[1].name;		
	objects.choose_voice_text_2.text=ru_voices[2].name;		
	objects.choose_voice_cont.visible=true;
	console.log("ru_voices: "+ru_voices.length);
	
	
}

vis_change=function() {

	if (document.hidden === true){
		PIXI.sound.pauseAll();		
		voice_menu.synth.cancel();
		
	} else {
		PIXI.sound.resumeAll();		
	}
		
}

main_menu={
	
	letters:[[136,77,216,127,'Б'],[226,77,306,127,'БЬ'],[316,77,396,127,'В'],[406,77,486,127,'ВЬ'],[496,77,576,127,'Г'],[586,77,666,127,'ГЬ'],[136,137,216,187,'Д'],[226,137,306,187,'ДЬ'],[316,137,396,187,'Ж'],[406,137,486,187,'З'],[496,137,576,187,'ЗЬ'],[586,137,666,187,'К'],[136,197,216,247,'КЬ'],[226,197,306,247,'Л'],[316,197,396,247,'ЛЬ'],[406,197,486,247,'М'],[496,197,576,247,'МЬ'],[586,197,666,247,'Н'],[136,257,216,307,'НЬ'],[226,257,306,307,'П'],[316,257,396,307,'ПЬ'],[406,257,486,307,'Р'],[496,257,576,307,'РЬ'],[586,257,666,307,'С'],[136,317,216,367,'СЬ'],[226,317,306,367,'Т'],[316,317,396,367,'ТЬ'],[406,317,486,367,'Ф'],[496,317,576,367,'ФЬ'],[586,317,666,367,'Х'],[136,377,216,427,'ХЬ'],[226,377,306,427,'Ц'],[316,377,396,427,'Ч'],[406,377,486,427,'Ш'],[496,377,576,427,'Щ'],[586,377,666,427,'ВСЕ']],
		
	selectes_sound:-1,
	
	activate(){			
		
		objects.letter_select.visible=false;
		anim2.add(objects.letters_cont,{alpha:[0,1]},true,0.5,'linear');
		
	},
	
	close(){		
		anim2.add(objects.letters_cont,{alpha:[1,0]},false,0.5,'linear');
	},
	
	letter_down(e){
		
		let mx = e.data.global.x/app.stage.scale.x - objects.letter_choose.x;
		let my = e.data.global.y/app.stage.scale.y - objects.letter_choose.y;
		
		this.selectes_sound = -1;
		let key_x = 0;
		let key_y = 0;	
		let margin = 5;
		for (let k of this.letters) {			
			if (mx > k[0] - margin && mx <k[2] + margin  && my > k[1] - margin && my < k[3] + margin) {
				this.selectes_sound = k[4];
				key_x = k[0];
				key_y = k[1];
				break;
			}
		}	
		
		//не нажата кнопка
		if (this.selectes_sound === -1) return;	
		
		sound.play('click');
		
		//подсвечиваем клавишу
		objects.letter_select.x = key_x - 10;
		objects.letter_select.y = key_y - 10;		
		objects.letter_select.visible=true;
	
	},
	
	start_down(){
		
		if(anim2.any_on()){
			sound.play('locked');
			return;
		}	
		sound.play('click');
		
		this.close();
		game.activate(this.selectes_sound);
	}
	
}

voice_menu={
		
	ru_voices:null,
	synth:null,
	utter:null,
	sel_id:-1,
	ok_resolver:0,
	mic_ok:true,
		
	getLocalStream() {
		navigator.getUserMedia = navigator.getUserMedia ||
								 navigator.webkitGetUserMedia ||
								 navigator.mozGetUserMedia ||
								 navigator.msGetUserMedia;

		if (navigator.getUserMedia) {
		  navigator.getUserMedia({ audio: true }, function(stream) {
			voice_menu.mic_ok=true;
		  }, function(error) {
			voice_menu.mic_ok=false;
		  });
		} else {
		  alert('Не могу получить доступ к микрофону');
		}
	},
	
	get_ru_voices(){
		
		let _ru_voices=[];
		const all_voices=this.synth.getVoices();
		_ru_voices = all_voices.filter(function (el) {
		  return ['ru-RU','ru_RU'].includes(el.lang)
		});	
		return _ru_voices;
		
	},
	
	async wait_voices(){
		
		for(let i=0;i<20;i++){		
			const ru_voices=this.get_ru_voices();	
			if (ru_voices.length>0) return true;			
			await new Promise((resolve, reject) => setTimeout(resolve, 500));
		}	
		return false;
	},
	
	again_down(){
		
		if(anim2.any_on()){
			sound.play('locked');
			return;
		}		
		sound.play('click');
		
		anim2.add(objects.no_tts_cont,{y:[objects.no_tts_cont.x,-300]},false,0.5,'easeInBack');
		voice_menu.activate();
	},
	
	async activate(){
		
		//this.getLocalStream()
				
		this.synth = window.speechSynthesis;
		this.utter=new SpeechSynthesisUtterance('привет');

		if(!this.synth) alert("no synth");
		console.log("synth loaded")
		
		some_process.search_tts=function(){			
			objects.search_tts_anim.rotation=game_tick*3;
		}
				
		anim2.add(objects.search_tts_cont,{y:[-200,objects.search_tts_cont.sy]},true,0.5,'easeOutBack');
		
		const any_ru_voices=await this.wait_voices();
		
		await anim2.add(objects.search_tts_cont,{y:[objects.search_tts_cont.y,-300]},false,0.5,'easeInBack');
		
		if (!any_ru_voices) {
			anim2.add(objects.no_tts_cont,{y:[-200,objects.no_tts_cont.y]},true,0.5,'easeOutBack');
			return;	
		} 
		this.ru_voices=this.get_ru_voices();


		objects.choose_voice_text.forEach(e=>e.visible=false);
		objects.voice_opt_bcg.forEach(e=>e.visible=false);
				
		for (let i=0;i<Math.min(this.ru_voices.length,3);i++){
			objects.choose_voice_text[i].text=this.ru_voices[i].name;
			objects.choose_voice_text[i].visible=true;
			objects.voice_opt_bcg[i].visible=true;
		}
		
		anim2.add(objects.choose_voice_cont,{y:[-300,objects.choose_voice_cont.y]},true,0.5,'easeOutBack');

		await new Promise(resolver=>{			
			this.ok_resolver=resolver;			
		})
		
	},
	
	ok_down(){
		
		if(anim2.any_on()){
			sound.play('locked');
			return;
		}		
		sound.play('click');
		
		
		if(!this.mic_ok){
			alert('Нет доступа к микрофону');
			return;
		}
		
		if(this.ru_voices.length===0){
			alert('Нет голосов. Установите синтезаторы голоса');
			return;
		}
		
		
		if (this.sel_id===-1) return;		
		objects.choose_voice_cont.visible=false;		
		this.ok_resolver();
		main_menu.activate();
	},
	
	test(voice_id){
		
		this.utter.voice=this.ru_voices[voice_id];
		
		if(this.sel_id>-1){
			objects.voice_opt_bcg[this.sel_id].texture=gres.voice_opt_bcg_img.texture;				
		}
		this.sel_id=voice_id;		
		objects.voice_opt_bcg[this.sel_id].texture=gres.voice_opt_bcg_sel_img.texture;			
	
		
		this.synth.speak(this.utter);
	},
	
	say_word(word){		
		
		if (this.ru_voices===null) return;
		this.utter.text=word;	
		this.utter.volume=1;
		return new Promise(resolver=>{			
			this.utter.onend = resolver;
			this.utter.onerror = resolver;
			this.synth.speak(this.utter);	
		})
		
	}
	
}

async function init_game_env(lang) {
								
	//отображаем шкалу загрузки
	document.body.innerHTML='<style>html,body {margin: 0;padding: 0;height: 100%;	}body {display: flex;align-items: center;justify-content: center;background-color: rgba(41,41,41,1);flex-direction: column	}#m_progress {	  background: #1a1a1a;	  justify-content: flex-start;	  border-radius: 5px;	  align-items: center;	  position: relative;	  padding: 0 5px;	  display: none;	  height: 50px;	  width: 70%;	}	#m_bar {	  box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;	  border-radius: 5px;	  background: rgb(119, 119, 119);	  height: 70%;	  width: 0%;	}	</style></div><div id="m_progress">  <div id="m_bar"></div></div>';
			
	//загружаем ресурсы
	await load_resources();	
	await define_platform_and_language();
	await auth2.init();
	
	app = new PIXI.Application({width:M_WIDTH, height:M_HEIGHT,antialias:false,backgroundColor : 0x404040});
	document.body.appendChild(app.view);
		
	resize();
	window.addEventListener("resize", resize);
	
	//это событие когда меняется видимость приложения
	document.addEventListener("visibilitychange", vis_change);

    //создаем спрайты и массивы спрайтов и запускаем первую часть кода
    for (var i = 0; i < load_list.length; i++) {
        const obj_class = load_list[i].class;
        const obj_name = load_list[i].name;
		console.log('Processing: ' + obj_name)

        switch (obj_class) {
        case "sprite":
            objects[obj_name] = new PIXI.Sprite(game_res.resources[obj_name].texture);
            eval(load_list[i].code0);
            break;

        case "block":
            eval(load_list[i].code0);
            break;

        case "cont":
            eval(load_list[i].code0);
            break;
			
        case "asprite":
			objects[obj_name] = gres[obj_name].animation;
            eval(load_list[i].code0);
            break;

        case "array":
			var a_size=load_list[i].size;
			objects[obj_name]=[];
			for (var n=0;n<a_size;n++)
				eval(load_list[i].code0);
            break;
        }
    }

    //обрабатываем вторую часть кода в объектах
    for (var i = 0; i < load_list.length; i++) {
        const obj_class = load_list[i].class;
        const obj_name = load_list[i].name;
		console.log('Processing: ' + obj_name)
		
		
        switch (obj_class) {
        case "sprite":
            eval(load_list[i].code1);
            break;

        case "block":
            eval(load_list[i].code1);
            break;

        case "cont":	
			eval(load_list[i].code1);
            break;

        case "asprite":	
			eval(load_list[i].code1);
            break;
			

        case "array":
			var a_size=load_list[i].size;
				for (var n=0;n<a_size;n++)
					eval(load_list[i].code1);	;
            break;
        }
    }
	
	//запускаем главный цикл
	main_loop();		
	
	
	//load_speech_stuff();
	await voice_menu.activate();
			

}

function main_loop() {

	
	game_tick+=0.016666666;
	
	//обрабатываем минипроцессы
	for (let key in some_process)
		some_process[key]();	
	
	anim2.process();

	requestAnimationFrame(main_loop);
}