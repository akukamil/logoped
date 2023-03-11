var M_WIDTH=800, M_HEIGHT=450;
var app, game_res, game, objects={}, state='', game_tick=0, my_turn=false, git_src='',some_process = {},  game_platform='',is_listening=false,say=true;
const letters=['Б','В','Г','Д','Ж','З','К','Л','М','Н','П','Р','С','Т','Ф'];
const words={'Б':['БАБУШКА УБРАЛАСЬ В ИЗБУШКЕ','РАЗБУДИЛИ БУЛЬДОГА В БУДКЕ','В БОЛЬШОМ БАКЕ БАКТЕРИИ','ЗАБАВНЫЙ БАРАБАНЩИК БЫСТРО УБЕЖАЛ','В БУТЫЛКЕ БУЛЬКАЛ БУЛЬОН','БАЛЕРИНА БЫЛА НА БАЛУ','БОТИНКИ БЫСТРО НАМОКЛИ','АВТОБУС ОБОГНАЛ БУЛЬДОЗЕР','В БУТЫЛКЕ БЫЛ ЦЕЛЕБНЫЙ БАЛЬЗАМ','БАБУШКА ЗАБОТИТСЯ И БАЛУЕТ ВНУКОВ','БОЛЬШОЙ БАНАН','БАБОЧКА НА БАЛКОНЕ','ОБОРОНА БАШНИ','БОЛЬШОЙ БУЛЫЖНИК','БЫВШИЙ БАРАБАНЩИК','БУМЕРАНГ АБОРИГЕНА','БУМАЖНИК БАНКИРА','РЫБЫ В БАНКЕ','БОЛЬШОЙ БАНТ','ГОЛУБОЙ БАНТ'],'В':['ВОЗДУШНАЯ ВАТА','ВОЛК С КОРОВОЙ','ВКУСНАЯ ВЫПЕЧКА','ВЫГОДНЫЙ ВАРИАНТ','ВОКЗАЛ ДЛЯ ДВОИХ','ВОДОЛАЗ ПОД ВОДОЙ','ВОДИТЕЛЬ ТРАМВАЯ','ВОЛШЕБНЫЕ СЛОВА','ВЫПУСКНИК ВОЛНОВАЛСЯ','ВЫЛЕПИТЬ СНЕГОВИКА','ВОТ ВАМ СЛАДКОВАТАЯ ВОДА','ВОРОНА ВОВРЕМЯ УВЕРНУЛАСЬ ОТ ВАЛУНА','НА ВОРОТАХ ВОСЕМЬ ВОРОН','У КОРОВЫ НЕТ ГРИВЫ','ВАХТОВЫЙ АВТОБУС ВОЗИТ ВОЖАТЫХ','ВРУН ВРАЛ ВСЕМ ВОКРУГ','ВОРОН ВЫСОКО ВЗЛЕТЕЛ','ДВОЙНАЯ ВЫГОДА','ВОЛЬНЫЙ ВОИН','ТВОРОЖНЫЕ ВАРЕНИКИ'],'Г':['ГОРОДСКАЯ ГАЗЕТА','ГАЛСТУК В ГОРОШЕК','ГАЛКА НА ГАЗОНЕ','ГОРОД В ГОРАХ','ГРОМКИЙ ГОЛОС','ГОСТИ В ВАГОНЕ','ГОТОВИТЬ ГОВЯДИНУ','ДОГОНЯТЬ ПИНГВИНОВ','ГОЛОДНЫЕ ГОБЛИНЫ','ГОРБАТЫЙ ГНОМ ГОРЬКО ГОРЕВАЛ','ГЕНЕРАЛ ВОЗГЛАВИЛ ГВАРДИЮ','ГОНЩИК ГОТОВ К ГОНКАМ','ФОТОГРАФ ДОГОНЯЛ ПИНГВИНОВ','ОГОНЬ НА БЕРЕГУ ПУГАЛ ПОПУГАЕВ','ЭТА ГРУША ГНИЛАЯ','ГОТОВАЯ ИГРУШКА','ГЛАВНЫЙ  ГОСПИТАЛЬ','ГОРСТКА ГЛИНЫ','ТРОГАТЬ БУМАГУ','ОТГАДАТЬ ГОЛОВОЛОМКУ'],'Д':['У ДВОРНИКА ВЫХОДНОЙ','ДАВНИЙ ДОЛГ','ДАЧА ХУДОЖНИКА','ДАЛЬНЯЯ ДОРОГА','ДОМ В САДУ','НОВОГОДНИЙ ПРАЗДНИК','ХУДОЕ ЧУДОВИЩЕ','ДОЛГИЙ ДОЖДЬ','ОГОРОДЫ ЗА ГОРОДОМ','ДЫХАНИЕ ДРАКОНА','ДОЖДЛИВАЯ ПОГОДА','ДАЛЬНЯЯ ДОРОГА В ДЮНАХ','ВОДОЛАЗ ДОСТАЛ СО ДНА МЕДУЗУ','ДОКТОР ДОТРОНУЛСЯ ДО БЕДРА','ДАЧА ДЕДУШКИ ДАЛЕКО ОТ ГОРОДА','ДОЛГИЙ ДОЖДЬ ВСЕМ НАДОЕЛ','ЛЕДОКОЛ ДАЛЕКО ВО ЛЬДАХ','ЧУДАК ПОДНЯЛСЯ НА ЧЕРДАК','ТЫ ДОЛЖЕН ДОЙТИ ДО ДАЛЬНЕГО ГОРОДА','ПОБЕДА ДОСТАЛАСЬ ДВУМ КОМАНДАМ'],'Ж':['ЖАБА В ЛУЖЕ','ЖАДНЫЙ ЖАДИНА','ТЯЖЕЛАЯ БАРЖА','РЖАНИЕ ЖЕРЕБЕНКА','ЖУЖЖАНИЕ ЖУКА','КОЖАНЫЙ ЖАКЕТ','ЖЕЛАНИЕ ЖИТЬ','НЕЖНАЯ КОЖА','БУМАЖНЫЙ ЖУК','КОЖА ЖИРАФА','БЛИЖЕ К МЕДВЕЖОНКУ','ЖЕВАТЬ ЖЕЛЕ','ЖИЛЕТКА МУЖА','УЖ НЕ МОЖЕТ УЖАЛИТЬ','Я ЖУЮ ЖИДКОЕ МОРОЖЕНОЕ','МОЯ ЖАЛКАЯ НАДЕЖДА НА ЖИЛЬЕ','Я ЖУЮ ЖВАЧКУ','ПОЖАРНИК БЕЖИТ НА ПОЖАР','ЖУК ПОД ОРАНЖЕВЫМ АБАЖУРОМ','ЖАЛКИЙ ЖРЕБИЙ МОЙ'],'З':['ЗАПРЕТНАЯ ЗОНА','НА ЗАВОДЕ ЗАБАСТОВКА','ЗНАНИЕ ЯЗЫКА','ЗАБОТА О ЗДОРОВЬЕ','ЗОРКИЕ ГЛАЗА','ИЗБЫТОК АЗОТА','ПРИЗНАК ГРОЗЫ','ЗАМОК НА ЗАБОРЕ','ЗНАКОМАЯ МУЗЫКА','ЗОЛОТАЯ КАЗНА','БЕЗУМНАЯ ЗАТЕЯ','Я ЗАЕХАЛ НА ЗАВОД','Я ЗАКРЫЛ ГЛАЗА','ГРУЗОВИК С АРБУЗАМИ','ЗВЕНИТ ЗВОНКИЙ ЗВОНОК','МЫ НЕ ЗНАЛИ НАЗВАНИЯ ГРУЗА','КОЗА ЗАБЕЖАЛА В ПОЕЗД','ДЕД МОРОЗ ЗАГАДАЛ ЗАГАДКУ','В ЗООПАРК ПРИВЕЗЛИ ЗУБРА','Я ОПОЗДАЛА НА ЗАНЯТИЯ'],'К':['КАБЕЛЬНЫЙ  КАНАЛ','ТОНКАЯ КАЛЬКА','НЕСКОЛЬКО КУСКОВ','КАНДИДАТ НАУК','ИСКАТЬ КОНФЕТЫ','ВКУСНЫЙ КОФЕ','КУСОК КАБАЧКА','ВЫСКОЧИЛ НА КАМЕНЬ','ЗАКРЫТАЯ КАЛИТКА','КОЛОДА КАРТ','ОСКАЛ ВОЛКА','ЗАКОНЧИЛСЯ КЛЮЧЕВОЙ КАДР','КАНАРЕЙКА В КЛЕТКЕ СКУЧАЕТ','СКАЛОЛАЗ СПУСКАЛСЯ СО СКАЛ','КОШКА ЛАКАЛА МОЛОКО','В КУВШИНЕ КОЗЬЕ МОЛОКО','НА СУКУ КУКУЕТ КУКУШКА','КАПИТАН КУПИЛ КУРТКУ','МЯУКАЕТ МОКРАЯ КОШКА','КОМАНДИР КОМАНДУЕТ'],'Л':['БЕЛЫЙ ЛАНДЫШ','БЕЛЫЙ ГОЛУБЬ','ГЛАДКАЯ ЛАВОЧКА','ЛАСКОВЫЕ ЛАДОШКИ','МИЛАЯ УЛЫБКА','ЛАПКА БЕЛКИ','ЛАТЫ ИЗ ЛАТУНИ','ЛОМКИЙ ВОЛОС','КОЛКАЯ ИГОЛОЧКА','СПЕЛОЕ СЛАДКОЕ ЯБЛОКО','ЛУЧ СОЛНЦА','БЕЛОЕ ПЛАТЬЕ','ЛАМПА УПАЛА НА ПОЛ','МАЛЫШ ИГРАЛ В ЛОТО','У ПЛОТНИКА В ЛАДОНЯХ ЛОБЗИК','ПЛАМЯ ОХВАТИЛО ВЕСЬ ПЛОТ','ЛАЯЛА ЛОХМАТАЯ ЛАЙКА','БЕЛАЯ АКУЛА ИСПУГАЛА АКВАЛАНГИСТА','ОКОЛО ДОМА ЛАЯЛ ПЕС','ПО ВОЛНАМ ПЛЫЛ ПЛОТ'],'М':['МАЛО МАКУЛАТУРЫ','МАЛЫШ МОЛЧИТ','МАГИСТР МАГИИ','МОЕЧНАЯ МАШИНА','МАЛЕНЬКИЙ МАНДАРИН','МОЛОЧНОЕ МОРОЖЕНОЕ','МОЛОДАЯ МАЧЕХА','МОТОР МОПЕДА','МАСКАРАДНАЯ МАСКА','МАССОВЫЙ МАРШ','У ДАМЫ ПАНАМА ИЗ СОЛОМЫ','МАМА МАКНУЛА МАЛИНУ В МОЛОКО','МАМА МОЕТ РАМУ','МАТРОС ЛОМАЕТ ЗАМОК','В ЗАМКЕ МНОГО МРАМОРА','МАМА МОЕТ МЛАДЕНЦА','МЫ ЛЮБИМ МОЛОЧНОЕ МОРОЖЕНОЕ','МАМА СМОТРИТ МУЛЬТФИЛЬМЫ','МЫ НЕ ЛЮБИМ ТОМАТНОЕ МОРОЖЕНОЕ','МОЛОДОЙ МУЖЧИНА'],'Н':['ВКУСНЫЙ АНАНАС','БАНАН НАРЕЗАН','НАЙТИ НАЖИВКУ','НОЧНАЯ СМЕНА','НАША НОША','МОНОТОННЫЙ ЗВОН','НАКОЛКА НА СПИНЕ','ЕДИНЫЙ ЭКЗАМЕН','ЦЫГАНКА НАГАДАЛА НОВУЮ КОМНАТУ','НАЧАЛОСЬ НАГНОЕНИЕ МИЗИНЦА','ТЕЛЕФОН ОТКЛЮЧЕН ЗА НЕУПЛАТУ','НАСТЯ НАРАСТИЛА РЕСНИЦЫ','НА ДЫНЕ СДЕЛАН НАДРЕЗ','НУЖНО СРОЧНО НАЛАДИТЬ ОТНОШЕНИЯ','ЮНОШУ НАГРАДИЛИ НОВЫМ НОУТБУКОМ','СТАРИННЫЕ МАНУСКРИПТЫ','ЗАБАВНАЯ ОБЕЗЬЯНА','НА КОНЧИКЕ НОЖА','НАСТОЯЩЕЕ КИМОНО','НОВЫЙ НАЛОГ'],'П':['ПОЛНЫЙ ПОДГУЗНИК','ПАСПОРТ ПАРНЯ','ПОЛОСАТЫЙ ПЛАТОК','СПУСК СПРАВА','ПАССАЖИР ПОЕЗДА','НАКАПАТЬ КАПЛИ','ПАНТЕРА ПРЫГАЕТ','ПОДМОГА ПОДОСПЕЛА','ОПАСНЫЙ СНЕГОПАД','ПАРТИЯ  ПАРОВОЗОВ','ОПУХШИЙ ПАЛЕЦ','ПОБЫТЬ СПУТНИКОМ','ПОМЫТЬ ПОЛ','ПУЗАТЫЙ НЕПОСЕДА','ПОПУГАЙ ПРОСТО ПОВТОРЯЕТ ЧУЖИЕ СЛОВА','ПЛАВАНИЕ ПОЗВОЛЯЕТ УВЕЛИЧИТЬ ПЛЕЧИ','ПАНТЕРА ПЛАВНО ПРЫГАЕТ ПО ПОЛУ','ПАПА ОТПРАВИЛ ПО ПОЧТЕ ПОСЫЛКУ','НА ПРИЧАЛЕ ОТДЫХАЕТ ПОЛНЫЙ КАПИТАН','ПОРОСЯТА ПОВИЗГИВАЛИ И ПРЫГАЛИ НА ПОЛЯНЕ'],'Р':['КРАСНЫЙ РАК','РАКЕТА РАЗОГНАЛАСЬ','СТАРАЯ РАМА','КРУТЫЕ РОГА','ПЕРВАЯ ГРУППА','ТРУДНЫЕ РОДЫ','ПРАЗДНИК ДЛЯ ДЕТВОРЫ','ПРОВАЛ ПРОЕКТА','ГРОЗА ГРОХОТАЛА','РАЗВИЛКА НАПРАВО','ПРОГНОЗ НА ЗАВТРА','БУЛЬВАР РОЗ','ПРОГУЛКА ПО ПАРКУ','РОДИНКА НА РУКЕ','ПИРАТ ЗАРЫВАЕТ СОКРОВИЩА НА ОСТРОВЕ','НА ФОТОГРАФИИ МОИ ДРУЗЬЯ','ПРОВЕДЕНА ОПЕРАЦИЯ','УРОДИЛСЯ ХОРОШИЙ УРОЖАЙ','С УТРА МЫ БРОДИМ ПО СТАРОМУ ГОРОДУ','РАСЧЕТ КОНСТРУКЦИИ ПРОВЕДЕН АРХИТЕКТОРОМ ВЕРНО'],'С':['САМИ С УСАМИ','СОЛИСТ АНСАМБЛЯ','УСАТЫЙ СОМ','СМОТРЕЛА НА СОРОКУ','СЫТНЫЙ СЫРНИК','СТАРАЯ СУМКА','СЛИВОВЫЙ САД','САМОДЕЛЬНЫЙ САМОКАТ','СВЕТЛАЯ САЛФЕТКА','СОДА В СТАКАНЕ','СОЧИНИТЬ СКАЗКУ','ПОЛОСАТАЯ СОБАКА','СТЫДНО ПЕРЕД СОСЕДЯМИ','Я ПОСАДИЛА САЛАТ И СВЕКЛУ','ТРАВА СОХНЕТ НА СОЛНЦЕ','СТРОГАЯ СУПРУГА СУПЕРМЕНА','С НАМИ В ЛЕСУ БЫЛА СОБА­КА','СОБАКА СМОТРЕЛА НА СОРОКУ','В ЛЕСУ РАСТУТ ВЫСОКИЕ СОСНЫ','САМОЛЕТ ЛЕТИТ ВЫСОКО НАД ЛЕСОМ'],'Т':['ТУРЕЦКИЙ ТАБАК','ПИСТОЛЕТ','ТОЛСТАЯ ТОРПЕДА','ТОНКАЯ ТАЛИЯ','ВТОРОЙ МАТРОС','АТЛЕТ БЕЖИТ','СТАРАЯ ТАВЕРНА','ИНСТРУМЕНТЫ ПЛОТНИКА','ШУСТРЫЙ ЛИЛИПУТ','ПОЧЕТНАЯ ГРАМОТА','КОРОТКАЯ ЛЕНТА','ТОВАРИЩ НА ТАБУРЕТКЕ','ТРЕНЕР ТРЕБУЕТ ТОРОПИТЬСЯ','ТРАМВАЙ ТРОНУЛСЯ БЫСТРО','УТРОМ ВСТАВАТЬ ТРУДНО','ТОЛПА ТОЛКАЕТСЯ В ТОННЕЛЕ','ТАНКИСТ СПИТ ПОД ТАНКОМ','','ТАМАДА ГОВОРИТ КОРОТКИЙ ТОСТ','ТАЛАНТЛИВЫЙ ТАКТИК ЧИТАЕТ МАРШРУТ'],'Ф':['ФАБРИКАНТ НА ФАБРИКЕ','ФАМИЛИЯ ФАНАТА','ФАРАОН В СКАФАНДРЕ','ФУТБОЛЬНЫЙ ФАНАТ','НА ФОТО ЖИРАФЫ','ФАРА АВТОБУСА','ФАСОВАТЬ ФАСОЛЬ','ФОТО АФРИКАНКИ','КОМФОРТНЫЙ ШАРФ','КОСМОНАВТ В СКАФАНДРЕ','ФУТЛЯР ОТ САКСОФОНА','ФУРГОН С ФРУКТАМИ','ФЕХТОВАЛЬЩИК В ФОРМЕ','НОВАЯ ФРАЗА О ФРУКТАХ','У ФАРТУКА ФИОЛЕТОВЫЙ ФОН','ИНТЕРЕСНАЯ ИНФОРМАЦИЯ','ПЕРЕД ФАСАДОМ ПОСАДИЛИ ТРАВКУ','В ТЕСТО ПОЛОЖИЛИ ФУНДУК','ФАСОВЩИК ФАСУЕТ КОНФЕТЫ В ФАНТИКАХ','НАШИ ФЛОРА И ФАУНА ФАНТАСТИЧЕСКИ РАЗНООБРАЗНЫ']}
var all_voices, ru_voices, synth,utterance;

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
		this.bcg.height = 80;
		
		this.ltext="";
		this.ltext=new PIXI.BitmapText('...', {fontName: 'mfont',fontSize: 50});
		this.ltext.anchor.set(0.5,0.5);
		this.ltext.x=75;
		this.ltext.y=40;
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

anim2 = {
		
	c1: 1.70158,
	c2: 1.70158 * 1.525,
	c3: 1.70158 + 1,
	c4: (2 * Math.PI) / 3,
	c5: (2 * Math.PI) / 4.5,
	empty_spr : {x:0,visible:false,ready:true, alpha:0},
		
	slot: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
	
	any_on : function() {
		
		for (let s of this.slot)
			if (s !== null)
				return true
		return false;		
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
		return Math.sin(x*Math.PI);
	},
	
	easeInOutCubic: function(x) {
		
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	},
	
	shake : function(x) {
		
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
		
		
	},	
	
	add : function(obj, params, vis_on_end, time, func, anim3_origin) {
				
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
	
	play : function(snd_res,res_source) {
		
		
		if(res_source===undefined)
			res_source=gres;
		
		if (this.on === 0)
			return;
		
		if (res_source[snd_res]===undefined)
			return;
		
		res_source[snd_res].sound.play();	
		
	}
	
	
}

/*
var synth = window.speechSynthesis;

alert("Voces: "+synth.getVoices().length)

var SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance||window.mozSpeechSynthesisUtterance ||window.msSpeechSynthesisUtterance||window.oSpeechSynthesisUtterance||window.SpeechSynthesisUtterance;
var speech=new SpeechSynthesisUtterance();
speech.lang = 'ru-Ru';
speech.rate = 1.25;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

var recognizer = new SpeechRecognition();
recognizer.lang = 'ru-Ru';
*/

main_menu={
	
	activate(){			
		
		objects.main_menu_header.visible=true;
		objects.letter_buttons.forEach(l=>l.visible=true);
		
	},
	
	close(){
		
		objects.main_menu_header.visible=false;
		objects.letter_buttons.forEach(l=>l.visible=false);
		
	},
	
	button_down(letter){
		
		this.close();
		game.activate(letter);
		
	}
	
}


var utterance;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognizer = new SpeechRecognition();
recognizer.lang = 'ru-Ru';
recognizer.interimResults = true;


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

game={
	
	words:[],
	cur_animal_id:0,
	stable:true,
	resolver:0,
	cur_word_index:0,
	animal_cnt:0,	
	animal_to_pickup:0,
	finish_flag:false,
	animals_textures:[],
			
	activate: async function(letter) {
			
		this.words=words[letter];
		objects.word.text=this.words[this.cur_word_index];

		this.cur_word_index=0;
		this.cor_word_cnt=0;
		
		this.finish_flag=false;
					
		objects.bcg.tilePosition.x = 0;
		objects.road.tilePosition.x = 0;	
				
		this.animal_cnt=0;
		
		if(Math.random()>0.5)
			objects.bcg.texture=gres.bcg_night.texture;
		else
			objects.bcg.texture=gres.bcg.texture;
		
		objects.ss_bcg.visible=objects.ss_front.visible=false;
		
		//в пикапе пока никого нет
		objects.animals_in_pickup.forEach(a=>a.visible=false);
		
		//в окнах пока никого нет
		objects.window_animals.forEach(a=>a.visible=false);
						
		//anim2.add(objects.main_data,{x:[1600, objects.main_data.sx]},true,0.5,'easeOutBack');
		anim2.add(objects.back_button,{x:[-200,objects.back_button.sx]},true,0.5,'easeOutBack');
		anim2.add(objects.car_cont,{y:[600,objects.car_cont.sy]},true,1,'easeOutBack');
						
		some_process.game=this.process;
		
		this.run_game();

	},
	
	async run_game(){
				
		
		this.animals_textures=shuffleArray([
			gres.beer.texture,
			gres.penguin.texture,
			gres.fox.texture,
			gres.rabbit.texture,
			gres.dog.texture,
			gres.citty.texture,
			gres.cocoon.texture,
			gres.panda.texture,
			gres.beer2.texture,
			gres.rabbit2.texture,
			gres.lion.texture,
			gres.cow.texture,
			gres.pig.texture,
			gres.mangoose.texture,
			gres.slon.texture,
			
		]);		
		
		this.set_next_animal();
		objects.start_flag.visible=true
		objects.start_flag.x=objects.start_flag.sx;
		this.animal_cnt=0;
				
		
		for(let a=0;a<6;a++){
			
			await this.move_car();		

			while(true){
				
				await this.show_word_info();
				//await this.start_button();			
				const result=await this.listen_word();	
				await this.hide_word_info();	
				if(result==='correct')
					break
				else
					sound.play('lose')
			}
			
			this.pickup_animal();
			this.set_next_animal();	
		}
		
		await this.move_car();
		await this.fill_animals();
		await this.happy_window_animals();
		
		this.close();
		main_menu.activate();
		
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

		
		objects.animal_to_pick.texture=this.animals_textures[this.animal_cnt];
		objects.animal_to_pick.visible=true;
		objects.animal_to_pick.x=1900;
		
	},
	
	close(){
		
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
		
		if(is_listening || anim2.any_on() || !this.stable){
			
			return;
		}
		
		this.close();
		main_menu.activate();
		
		
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
		some_process.car_move=function(){};
						
		anim2.add(objects.car_cont,{y:[objects.car_cont.y,objects.car_cont.sy]},true,1.5,'easeOutBack');
		anim2.add(objects.pickup_cont,{rotation:[objects.pickup_cont.rotation,0]},true,1.5,'easeOutBack');
			
	},
	
	async fill_animals(){
		
		//await new Promise((resolve, reject) => setTimeout(resolve, 1500));
		//objects.window_animals_cont.visible=true;
		for(let i=5;i>=0;i--){
			objects.window_animals[i].visible=true;
			
			const s_base_tex=objects.animals_in_pickup[i].texture.baseTexture;
			const t_tex=new PIXI.Texture(s_base_tex,new PIXI.Rectangle(0, 0, s_base_tex.width, 230))
			objects.window_animals[i].texture=t_tex;
			objects.window_animals[i].visible=true;
			sound.play('animal_window');
			objects.animals_in_pickup[i].visible=false;
			await new Promise((resolve, reject) => setTimeout(resolve, 500));
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
		
		if(say){
			
			objects.ss_front.x=objects.ss_front.sx;
			say=false;
			
		}else{
			
			objects.ss_front.x=objects.ss_front.sx+38;
			say=true;			
		}
		
		sound.play('click');
		
		
	},
		
	async listen_word() {
		
		objects.word_result.text='Жди...';
		if(say) await voice_menu.say_word('скажи '+objects.word.text);	
		objects.word_result.text='Говори...';
		
		recognizer.abort();
		recognizer.stop();
		recognizer.start();	


		some_process.mic_flash=function(){			
			objects.mic.alpha=Math.abs(Math.sin(game_tick*3));			
		}
		
		let final_word ="";
		const result = await new Promise(function(resolve, reject){

			recognizer.onresult = function (event) {
			  
				var result = event.results[event.resultIndex];
				objects.word_result.text=result[0].transcript.toUpperCase();
				if (result.isFinal) {
					final_word = result[0].transcript.toUpperCase()
					if(objects.word.text===final_word)
						resolve('correct')
					else
						resolve('wrong')
				}
			  
				if(objects.word.text===objects.word_result.text)
					resolve('correct')
			  
			};	
		  
			recognizer.onend = function (event) {   
			  console.log("onend")
			  if (final_word==="")
				resolve('end');
			};	
			
			recognizer.onstart = function (event) {   
			  sound.play('ready');
			};	
		  
			recognizer.onerror = function (event) {
				console.log(event)     
				final_word='какая-то ошибка((('
				resolve('error');
			};	
		  
			recognizer.onnomatch= function (event) {
			  resolve('onnomatch');
			};	
		  
		});
		
		objects.word_result.text=final_word;
		some_process.mic_flash=function(){};
		objects.mic.alpha=1;
		
		recognizer.abort();
		recognizer.stop();
		
		return result;
	}

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

	PIXI.Loader.registerPlugin(PIXI.gif.AnimatedGIFLoader);
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
	LANG = await language_dialog.show();
	
	

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
		
	utterance=new SpeechSynthesisUtterance();
	
	
}

voice_menu={
		
	ru_voices:null,
	synth:null,
	utter:null,
	sel_id:-1,
	ok_resolver:0,
	
	get_ru_voices(){
		
		let _ru_voices=[];
		const all_voices=this.synth.getVoices();
		_ru_voices = all_voices.filter(function (el) {
		  return ['ru-RU','ru_RU'].includes(el.lang)
		});	
		return _ru_voices;
		
	},
	
	async wait_voices(){
		
		for(let i=0;i<10;i++){		
			const ru_voices=this.get_ru_voices();	
			if (ru_voices.length>0) return true;			
			await new Promise((resolve, reject) => setTimeout(resolve, 500));
		}	
		return false;
	},
	
	async activate(){
				
		this.synth = window.speechSynthesis;
		this.utter=new SpeechSynthesisUtterance('привет');

		if(!this.synth) alert("no synth");
		console.log("synth loaded")
				
		const any_ru_voices=await this.wait_voices();
		if (!any_ru_voices) {
			alert('Не нашли голоса! Озвучка не возможна!');
			objects.choose_voice_cont.visible=true;	
			return;		} 
		this.ru_voices=this.get_ru_voices();

		objects.choose_voice_text.forEach(e=>e.visible=false);
		objects.voice_opt_bcg.forEach(e=>e.visible=false);
				
		for (let i=0;i<Math.min(this.ru_voices.length,3);i++){
			objects.choose_voice_text[i].text=this.ru_voices[i].name;
			objects.choose_voice_text[i].visible=true;
			objects.voice_opt_bcg[i].visible=true;
		}
		objects.choose_voice_cont.visible=true;	

		await new Promise(resolver=>{			
			this.ok_resolver=resolver;			
		})
		
	},
	
	ok_down(){
		
		if (this.sel_id===-1) return;		
		objects.choose_voice_cont.visible=false;		
		this.ok_resolver();
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
		return new Promise((res,rej)=>{			
			this.utter.onend = res;
			this.synth.speak(this.utter);	
		})
		
	}
	
}

async function init_game_env(lang) {
								
	//отображаем шкалу загрузки
	document.body.innerHTML='<style>html,body {margin: 0;padding: 0;height: 100%;	}body {display: flex;align-items: center;justify-content: center;background-color: rgba(41,41,41,1);flex-direction: column	}#m_progress {	  background: #1a1a1a;	  justify-content: flex-start;	  border-radius: 5px;	  align-items: center;	  position: relative;	  padding: 0 5px;	  display: none;	  height: 50px;	  width: 70%;	}	#m_bar {	  box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;	  border-radius: 5px;	  background: rgb(119, 119, 119);	  height: 70%;	  width: 0%;	}	</style></div><div id="m_progress">  <div id="m_bar"></div></div>';
			
	//загружаем ресурсы
	await load_resources();	
	
	app = new PIXI.Application({width:M_WIDTH, height:M_HEIGHT,antialias:false,backgroundColor : 0x404040});
	document.body.appendChild(app.view);
	
	
	resize();
	window.addEventListener("resize", resize);

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
			
	//показыаем основное меню
	main_menu.activate();

}

function main_loop() {

	
	game_tick+=0.016666666;
	
	//обрабатываем минипроцессы
	for (let key in some_process)
		some_process[key]();	
	
	anim2.process();

	requestAnimationFrame(main_loop);
}
