var M_WIDTH=800, M_HEIGHT=450;
var app, game_res, game, objects={}, state='', game_tick=0, my_turn=false, git_src='',some_process = {},  game_platform='',is_listening=false,say=true;
var all_voices, ru_voices, synth,utterance;
var my_data={opp_id : ''};

const words={'Б':['БАБУШКА УБРАЛАСЬ В ИЗБУШКЕ','РАЗБУДИЛИ БУЛЬДОГА В БУДКЕ','В БОЛЬШОМ БАКЕ БАКТЕРИИ','ЗАБАВНЫЙ БАРАБАНЩИК БЫСТРО УБЕЖАЛ','В БУТЫЛКЕ БУЛЬКАЛ БУЛЬОН','БАЛЕРИНА БЫЛА НА БАЛУ','БОТИНКИ БЫСТРО НАМОКЛИ','АВТОБУС ОБОГНАЛ БУЛЬДОЗЕР','В БУТЫЛКЕ БЫЛ ЦЕЛЕБНЫЙ БАЛЬЗАМ','БАБУШКА ЗАБОТИТСЯ И БАЛУЕТ ВНУКОВ','БОЛЬШОЙ БАНАН','БАБОЧКА НА БАЛКОНЕ','ОБОРОНА БАШНИ','БОЛЬШОЙ БУЛЫЖНИК','БЫВШИЙ БАРАБАНЩИК','БУМЕРАНГ АБОРИГЕНА','БУМАЖНИК БАНКИРА','РЫБЫ В БАНКЕ','БОЛЬШОЙ БАНТ','ГОЛУБОЙ БАНТ'],'БЬ':['БЕГИ БЫСТРО','РАЗБИТЫЙ БИНОКЛЬ','РАЗБИРАТЬ БИГУДИ','БЕСТОЛКОВАЯ БЕСЕДА','ОБИДА ЗАБИЯКИ','БЕДНЫЕ РЕБЯТА','БЕЖЕВАЯ БИРКА','БИТВА БЕГЕМОТОВ','ЗАБИНТОВАННОЕ БЕДРО','ПОБЕГ БЕГЛЕЦА','БЕРЕЖЛИВЫЙ БЕДНЯК','БЕРЛОГА БАРСУКА','БЕЗЗАБОТНАЯ ПРОБЕЖКА','БАБУШКИН ЛЮБИМЕЦ','БИРЖА ДЛЯ БЕЗРАБОТНЫХ','БЫСТРО БЕЖИТ БУЙНЫЙ БИЗОН','БИСЕР РАЗБИЛСЯ О БЕТОН','БЕГИ ЗА БИЛЕТОМ','БИЗОН БЕСИТСЯ ОТ БЕССИЛИЯ','БЕЛОСНЕЖКА БЕЖИТ К ИЗБЕ'],'В':['ВОЗДУШНАЯ ВАТА','ВОЛК С КОРОВОЙ','ВКУСНАЯ ВЫПЕЧКА','ВЫГОДНЫЙ ВАРИАНТ','ВОКЗАЛ ДЛЯ ДВОИХ','ВОДОЛАЗ ПОД ВОДОЙ','ВОДИТЕЛЬ ТРАМВАЯ','ВОЛШЕБНЫЕ СЛОВА','ВЫПУСКНИК ВОЛНОВАЛСЯ','ВЫЛЕПИТЬ СНЕГОВИКА','ВОТ ВАМ СЛАДКОВАТАЯ ВОДА','ВОРОНА ВОВРЕМЯ УВЕРНУЛАСЬ ОТ ВАЛУНА','НА ВОРОТАХ ВОСЕМЬ ВОРОН','У КОРОВЫ НЕТ ГРИВЫ','ВАХТОВЫЙ АВТОБУС ВОЗИТ ВОЖАТЫХ','ВРУН ВРАЛ ВСЕМ ВОКРУГ','ВОРОН ВЫСОКО ВЗЛЕТЕЛ','ДВОЙНАЯ ВЫГОДА','ВОЛЬНЫЙ ВОИН','ТВОРОЖНЫЕ ВАРЕНИКИ'],'ВЬ':['ВЕЗТИ ВИТАМИНЫ','ПОВЕСИТЬ ЗАНАВЕС','ДОВЕРИЕ РАЗВЕДЧИКА','ИЗВЕСТНЫЙ ЧЕЛОВЕК','ЯДОВИТОЕ ВЕЩЕСТВО','ПОВЕРХНОСТЬ ЗВЕЗДЫ','ЗАВИСТЬ ПОРОЖДАЕТ НЕНАВИСТЬ','Я ВИДЕЛ ПО ТЕЛЕВИЗОРУ ЗВЕЗДОЛЕТ','ВИНОГРАДНОЕ ВИНО СОДЕРЖИТ ВИТАМИНЫ','ВЕРТОЛЕТ ПОДНИМАЕТСЯ ВЕРТИКАЛЬНО','ВИЗИТЫ ВЕЖЛИВОСТИ','В ЗАПОВЕДНИК ПРИВЕЗЛИ МЕДВЕДЕЙ','ЧУДОВИЩНЫЕ УСЛОВИЯ','ВЕТЧИНА НА РАЗВЕС','ДИВИЗИЯ ГОТОВИТСЯ','СВЯЗАЛИ СВИТЕР','ВЕЛИЧИНА ВИРУСА','ВЕТЕРАН АВИАЦИИ','ЧЕЛОВЕК СВИСТИТ','ПОВЕРНУТЬ ВЕНТИЛЬ'],'Г':['ГОРОДСКАЯ ГАЗЕТА','ГАЛСТУК В ГОРОШЕК','ГАЛКА НА ГАЗОНЕ','ГОРОД В ГОРАХ','ГРОМКИЙ ГОЛОС','ГОСТИ В ВАГОНЕ','ГОТОВИТЬ ГОВЯДИНУ','ДОГОНЯТЬ ПИНГВИНОВ','ГОЛОДНЫЕ ГОБЛИНЫ','ГОРБАТЫЙ ГНОМ ГОРЬКО ГОРЕВАЛ','ГЕНЕРАЛ ВОЗГЛАВИЛ ГВАРДИЮ','ГОНЩИК ГОТОВ К ГОНКАМ','ФОТОГРАФ ДОГОНЯЛ ПИНГВИНОВ','ОГОНЬ НА БЕРЕГУ ПУГАЛ ПОПУГАЕВ','ЭТА ГРУША ГНИЛАЯ','ГОТОВАЯ ИГРУШКА','ГЛАВНЫЙ  ГОСПИТАЛЬ','ГОРСТКА ГЛИНЫ','ТРОГАТЬ БУМАГУ','ОТГАДАТЬ ГОЛОВОЛОМКУ'],'ГЬ':['МЯГКИЙ ГЕЛЬ','ПОЮТ ГИМН','СНЯЛИ ГИПС','ГИБКИЕ ДУГИ','ГРЕМИТ ГИТАРА','ПОМОГИ ГИЕНЕ','ГОЛУБЫЕ САПОГИ','ГОРЯЧАЯ ГИЛЬЗА','МАГИЯ КНИГИ','ДРУГИЕ ДЕНЬГИ','ГЛАВНЫЙ ЛАГЕРЬ','ГОРЯЧИЙ ГЕЙЗЕР','ГИБКИЙ ГИМНАСТ','ДЕНЬГИ ГИТАРИСТА','ГИГАНТСКИЙ ГЕРБАРИЙ','ГОЛОДНЫЙ ГИППОПОТАМ','РЕГИСТРАЦИЯ ГЕНЕРАЛОВ','АГЕНТ ПЕРЕГИБАЕТ ПАЛКУ','БЕРЕГИ НОВЫЕ САПОГИ','ОРИГИНАЛЬНАЯ ГИРЛЯНДА'],'Д':['У ДВОРНИКА ВЫХОДНОЙ','ДАВНИЙ ДОЛГ','ДАЧА ХУДОЖНИКА','ДАЛЬНЯЯ ДОРОГА','ДОМ В САДУ','НОВОГОДНИЙ ПРАЗДНИК','ХУДОЕ ЧУДОВИЩЕ','ДОЛГИЙ ДОЖДЬ','ОГОРОДЫ ЗА ГОРОДОМ','ДЫХАНИЕ ДРАКОНА','ДОЖДЛИВАЯ ПОГОДА','ДАЛЬНЯЯ ДОРОГА В ДЮНАХ','ВОДОЛАЗ ДОСТАЛ СО ДНА МЕДУЗУ','ДОКТОР ДОТРОНУЛСЯ ДО БЕДРА','ДАЧА ДЕДУШКИ ДАЛЕКО ОТ ГОРОДА','ДОЛГИЙ ДОЖДЬ ВСЕМ НАДОЕЛ','ЛЕДОКОЛ ДАЛЕКО ВО ЛЬДАХ','ЧУДАК ПОДНЯЛСЯ НА ЧЕРДАК','ТЫ ДОЛЖЕН ДОЙТИ ДО ДАЛЬНЕГО ГОРОДА','ПОБЕДА ДОСТАЛАСЬ ДВУМ КОМАНДАМ'],'ДЬ':['ДЕТИ СИДЯТ','ПОСАДИ ДЕРЕВО','ДИЕТА ДЕДУЛИ','ВИДЕТЬ ЧУДЕСА','ДИВНАЯ ДИЕТА','ДЕРЕВЯННАЯ ЛАДЬЯ','СУДЬБА ВЕДЬМЫ','ДИВНЫЙ ДЕСЕРТ','ДЕБОШ ДЕСАНТА','УДЕЛ КАДЕТА','ДЕРЗКИЙ ДЕЛЬФИН','ДЕЛАТЬ БОРДЮР','СЕРДИТЫЙ ИНДЮК','ЕДИНАЯ МЕТОДИКА','МЕДВЕДИ НА ЛЬДИНЕ','ДЕДУШКА ПОСАДИЛ ДЕРЕВО','Я ДЕЛАЛ ДЕТАЛИ ХОЛОДИЛЬНИКА','БРОДЯГА УДИВИЛСЯ И РАССЕРДИЛСЯ','ДЯДЯ НАЧАЛ ГЛАДИТЬ ОДЕЖДУ','ДЕТЕЙ ПОСАДИЛИ НА ДИВАН'],'Ж':['ЖАБА В ЛУЖЕ','ЖАДНЫЙ ЖАДИНА','ТЯЖЕЛАЯ БАРЖА','РЖАНИЕ ЖЕРЕБЕНКА','ЖУЖЖАНИЕ ЖУКА','КОЖАНЫЙ ЖАКЕТ','ЖЕЛАНИЕ ЖИТЬ','НЕЖНАЯ КОЖА','БУМАЖНЫЙ ЖУК','КОЖА ЖИРАФА','БЛИЖЕ К МЕДВЕЖОНКУ','ЖЕВАТЬ ЖЕЛЕ','ЖИЛЕТКА МУЖА','УЖ НЕ МОЖЕТ УЖАЛИТЬ','Я ЖУЮ ЖИДКОЕ МОРОЖЕНОЕ','МОЯ ЖАЛКАЯ НАДЕЖДА НА ЖИЛЬЕ','Я ЖУЮ ЖВАЧКУ','ПОЖАРНИК БЕЖИТ НА ПОЖАР','ЖУК ПОД ОРАНЖЕВЫМ АБАЖУРОМ','ЖАЛКИЙ ЖРЕБИЙ МОЙ'],'З':['ЗАПРЕТНАЯ ЗОНА','НА ЗАВОДЕ ЗАБАСТОВКА','ЗНАНИЕ ЯЗЫКА','ЗАБОТА О ЗДОРОВЬЕ','ЗОРКИЕ ГЛАЗА','ИЗБЫТОК АЗОТА','ПРИЗНАК ГРОЗЫ','ЗАМОК НА ЗАБОРЕ','ЗНАКОМАЯ МУЗЫКА','ЗОЛОТАЯ КАЗНА','БЕЗУМНАЯ ЗАТЕЯ','Я ЗАЕХАЛ НА ЗАВОД','Я ЗАКРЫЛ ГЛАЗА','ГРУЗОВИК С АРБУЗАМИ','ЗВЕНИТ ЗВОНКИЙ ЗВОНОК','МЫ НЕ ЗНАЛИ НАЗВАНИЯ ГРУЗА','КОЗА ЗАБЕЖАЛА В ПОЕЗД','ДЕД МОРОЗ ЗАГАДАЛ ЗАГАДКУ','В ЗООПАРК ПРИВЕЗЛИ ЗУБРА','Я ОПОЗДАЛА НА ЗАНЯТИЯ'],'ЗЬ':['ЗИМНЕЕ ОЗЕРО','КУЗИНА ЗЕВАЕТ','ВЗЯТЬ РЕЗЮМЕ','ЗЕЛЕНЬ ЗЕБРЫ','РЕЗЬБА УЗОРОВ','НЕЛЬЗЯ ЗЕВАТЬ','ЗИМНИЙ МУЗЕЙ','ЗЕРКАЛО ХОЗЯИНА','ПОДЗЕМНЫЙ ПАРОВОЗИК','ОБЕЗЬЯНКА ВЗЯЛА ЗЕМЛЯНИКУ','ЗИМОЙ В ЛЕСУ НЕ ЗЕВАЙ','ЗЕБРА ЗЕВАЕТ','ЗИМОВАТЬ ПОД ЗЕМЛЕЙ','НЕЗЕМНАЯ ЗЕМЛЕМЕРКА','БУЛЬДОЗЕР ХОЗЯИНА','В НИЗИНЕ ЗЕЛЕНЕЮТ КИЗИЛ И БУЗИНА','ПРОЛЕЗАТЬ В ЛАЗЕЙКУ ЗА ЗЕФИРОМ','МОРОЗИТЬ МИЗИНЕЦ','СВЯЗАННЫЙ УЗЕЛОК','ЗИМОВКА ЗВЕРЕЙ'],'К':['КАБЕЛЬНЫЙ  КАНАЛ','ТОНКАЯ КАЛЬКА','НЕСКОЛЬКО КУСКОВ','КАНДИДАТ НАУК','ИСКАТЬ КОНФЕТЫ','ВКУСНЫЙ КОФЕ','КУСОК КАБАЧКА','ВЫСКОЧИЛ НА КАМЕНЬ','ЗАКРЫТАЯ КАЛИТКА','КОЛОДА КАРТ','ОСКАЛ ВОЛКА','ЗАКОНЧИЛСЯ КЛЮЧЕВОЙ КАДР','КАНАРЕЙКА В КЛЕТКЕ СКУЧАЕТ','СКАЛОЛАЗ СПУСКАЛСЯ СО СКАЛ','КОШКА ЛАКАЛА МОЛОКО','В КУВШИНЕ КОЗЬЕ МОЛОКО','НА СУКУ КУКУЕТ КУКУШКА','КАПИТАН КУПИЛ КУРТКУ','МЯУКАЕТ МОКРАЯ КОШКА','КОМАНДИР КОМАНДУЕТ'],'КЬ':['МЯГКИЙ КИВИ','ТОНКОЕ КИМОНО','ПОКИДАТЬ РАКЕТУ','ЭКИПАЖ РАКЕТЫ','ГЛАЗКИ КУКОЛКИ','КИНУТЬ КЕПКУ','КИСЛЫЙ КЕФИР','ЛИПКИЙ МАКЕТ','ВЕЛИКИЙ ВИКИНГ','ПЛОСКИЙ БУНКЕР','ЛОВКАЯ КЕНГУРУ','КАПРИЗНАЯ КОКЕТКА','ЛОВКИЙ РАКЕТЧИК','ТУФЕЛЬКИ КУКОЛКИ','ДЕВОЧКИ ЛЮБЯТ МАЛЕНЬКИЕ КНИЖКИ','НА КУХНЕ КИПИТ КИСЕЛЬ','КЕРАМИЧЕСКИЕ СЛОНИКИ','Я КИДАЛА ЯБЛОКИ В СУМКИ И ПАКЕТЫ','В ЧАЙНИКЕ КИПЯТОК','ПОЖАРНИКИ ПОКИНУЛИ КИОСК'],'Л':['БЕЛЫЙ ЛАНДЫШ','БЕЛЫЙ ГОЛУБЬ','ГЛАДКАЯ ЛАВОЧКА','ЛАСКОВЫЕ ЛАДОШКИ','МИЛАЯ УЛЫБКА','ЛАПКА БЕЛКИ','ЛАТЫ ИЗ ЛАТУНИ','ЛОМКИЙ ВОЛОС','КОЛКАЯ ИГОЛОЧКА','СПЕЛОЕ СЛАДКОЕ ЯБЛОКО','ЛУЧ СОЛНЦА','БЕЛОЕ ПЛАТЬЕ','ЛАМПА УПАЛА НА ПОЛ','МАЛЫШ ИГРАЛ В ЛОТО','У ПЛОТНИКА В ЛАДОНЯХ ЛОБЗИК','ПЛАМЯ ОХВАТИЛО ВЕСЬ ПЛОТ','ЛАЯЛА ЛОХМАТАЯ ЛАЙКА','БЕЛАЯ АКУЛА ИСПУГАЛА АКВАЛАНГИСТА','ОКОЛО ДОМА ЛАЯЛ ПЕС','ПО ВОЛНАМ ПЛЫЛ ПЛОТ'],'ЛЬ':['ЛЕТИТ МОЛЬ','ЛЕЖИТ ПУЛЬТ','СЛЫШУ ВОПЛЬ','МИЛАЯ ЛЕДИ','ЛИПКАЯ ЛИПА','ЛЕТИТ ПУЛЯ','МИЛОЕ ЛИЧИКО','ЛИНИЯ ТАЛИИ','ЛЕЖИТ ЛЕЙКА','СИЛЬНЫЙ ЛИВЕНЬ','ЛЬСТИВЫЙ ЛЕКТОР','ДЛИННАЯ ЛИНЕЙКА','ЛЕНИВЫЙ ПОЛИТИК','ЛИТР ЛИМОНАДА','ВЗГЛЯНИ НА МАЛЕНЬКИХ ЛИСЯТ','У КАЛЬМАРА ГИБКИЕ ЩУПАЛЬЦА','КУПИЛИ КЛЕТЧАТОЕ ПАЛЬТО','ОСЕНЬЮ ЛЕБЕДИ УЛЕТЕЛИ НА ЮГ','ЛЕНИВЫЕ ТЮЛЕНИ ЛЕЖАТ НА ЛЬДИНЕ','ДЕЛЬФИНЫ И ТЮЛЕНИ'],'М':['МАЛО МАКУЛАТУРЫ','МАЛЫШ МОЛЧИТ','МАГИСТР МАГИИ','МОЕЧНАЯ МАШИНА','МАЛЕНЬКИЙ МАНДАРИН','МОЛОЧНОЕ МОРОЖЕНОЕ','МОЛОДАЯ МАЧЕХА','МОТОР МОПЕДА','МАСКАРАДНАЯ МАСКА','МАССОВЫЙ МАРШ','У ДАМЫ ПАНАМА ИЗ СОЛОМЫ','МАМА МАКНУЛА МАЛИНУ В МОЛОКО','МАМА МОЕТ РАМУ','МАТРОС ЛОМАЕТ ЗАМОК','В ЗАМКЕ МНОГО МРАМОРА','МАМА МОЕТ МЛАДЕНЦА','МЫ ЛЮБИМ МОЛОЧНОЕ МОРОЖЕНОЕ','МАМА СМОТРИТ МУЛЬТФИЛЬМЫ','МЫ НЕ ЛЮБИМ ТОМАТНОЕ МОРОЖЕНОЕ','МОЛОДОЙ МУЖЧИНА'],'МЬ':['МЕЛКИЙ МЕЛ','МЯГКИЙ МЯЧ','МЕЛКИЙ ШМЕЛЬ','МЯКОТЬ МЯСА','МЕЛКАЯ МИШУРА','МИЛАЯ МИЛЕДИ','КАМЕННЫЙ КАМИН','УМЕТЬ МЕНЯТЬСЯ','МИГАТЬ МИГАЛКОЙ','МЕТКИЙ МЕЛЬНИК','МИРНЫЙ МИТИНГ','МЕТКАЯ ЗАМЕТКА','ЛИМОННАЯ МИКСТУРА','МЯТНАЯ КАРАМЕЛЬ','КОСМИЧЕСКАЯ КОМЕТА','ГНОМИК ПОСТРОИЛ КАМЕННЫЙ ДОМИК','МНОГО ЗАМЕТОК О ПОМИДОРАХ','В КОМНАТЕ МЯГКАЯ МЕБЕЛЬ','ВОЗЛЕ МЕЧЕТИ КАМЕННЫЙ МИНАРЕТ','МЕТЕЛИЦА МЕТЕТ МИМО МЕЛЬНИЦЫ'],'Н':['ВКУСНЫЙ АНАНАС','БАНАН НАРЕЗАН','НАЙТИ НАЖИВКУ','НОЧНАЯ СМЕНА','НАША НОША','МОНОТОННЫЙ ЗВОН','НАКОЛКА НА СПИНЕ','ЕДИНЫЙ ЭКЗАМЕН','ЦЫГАНКА НАГАДАЛА НОВУЮ КОМНАТУ','НАЧАЛОСЬ НАГНОЕНИЕ МИЗИНЦА','ТЕЛЕФОН ОТКЛЮЧЕН ЗА НЕУПЛАТУ','НАСТЯ НАРАСТИЛА РЕСНИЦЫ','НА ДЫНЕ СДЕЛАН НАДРЕЗ','НУЖНО СРОЧНО НАЛАДИТЬ ОТНОШЕНИЯ','ЮНОШУ НАГРАДИЛИ НОВЫМ НОУТБУКОМ','СТАРИННЫЕ МАНУСКРИПТЫ','ЗАБАВНАЯ ОБЕЗЬЯНА','НА КОНЧИКЕ НОЖА','НАСТОЯЩЕЕ КИМОНО','НОВЫЙ НАЛОГ'],'НЬ':['НЕВЫСОКОЕ ЗДАНИЕ','НИЗКИЙ ПЕНЬ','ТОНКАЯ ТКАНЬ','НИЗКАЯ БАНЯ','НЕЖНАЯ НЯНЯ','ЛИНИЯ МОЛНИИ','ПЕНИЕ ПЕСЕН','МЕДНАЯ МОНЕТА','СИЛЬНЫЙ ЛИВЕНЬ','МАЛЕНЬКИЙ ОКУНЬ','УМНЫЙ ПТЕНЕЦ','БЕДНАЯ ПЛЕННИЦА','ЛЕНИВЫЙ ДАЧНИК','СОЛНЕЧНОЕ ЗАТМЕНИЕ','НАСЛЕДНИКИ ПИСАТЕЛЬНИЦЫ','ДНЕВНИК ПИСАТЕЛЬНИЦЫ ХРАНИТ СЕКРЕТЫ','НЕУМЕНИЕ НЕ ОПРАВДЫВАЕТ НЕЛЕПОСТЬ','НЕКТАР НЕЛЬЗЯ ХРАНИТЬ ДОЛГО','НЕЖНАЯ ДЫНЯ НА ОКНЕ','НЕПУТЕВЫЙ НЕАНДЕРТАЛЕЦ'],'П':['ПОЛНЫЙ ПОДГУЗНИК','ПАСПОРТ ПАРНЯ','ПОЛОСАТЫЙ ПЛАТОК','СПУСК СПРАВА','ПАССАЖИР ПОЕЗДА','НАКАПАТЬ КАПЛИ','ПАНТЕРА ПРЫГАЕТ','ПОДМОГА ПОДОСПЕЛА','ОПАСНЫЙ СНЕГОПАД','ПАРТИЯ  ПАРОВОЗОВ','ОПУХШИЙ ПАЛЕЦ','ПОБЫТЬ СПУТНИКОМ','ПОМЫТЬ ПОЛ','ПУЗАТЫЙ НЕПОСЕДА','ПОПУГАЙ ПРОСТО ПОВТОРЯЕТ ЧУЖИЕ СЛОВА','ПЛАВАНИЕ ПОЗВОЛЯЕТ УВЕЛИЧИТЬ ПЛЕЧИ','ПАНТЕРА ПЛАВНО ПРЫГАЕТ ПО ПОЛУ','ПАПА ОТПРАВИЛ ПО ПОЧТЕ ПОСЫЛКУ','НА ПРИЧАЛЕ ОТДЫХАЕТ ПОЛНЫЙ КАПИТАН','ПОРОСЯТА ПОВИЗГИВАЛИ И ПРЫГАЛИ НА ПОЛЯНЕ'],'ПЬ':['ПЕТЬ ПЕСНЮ','ПОЛЕЗНАЯ ПИЩА','ПИЛА ПИЛИТ','ПЛАСТИКОВАЯ КУПЮРА','ПЕРВАЯ ПЕШКА','ПУСТАЯ ПЕЧКА','КУПИТЬ ПИКАП','НАПЕЧЬ ПИРОГИ','ПИНЦЕТ ПЕДИАТРА','ПЕРСИКОВЫЙ ПИДЖАК','ВЫПИСКА ПАЦИЕНТА','ЗАПИНКА ПЕРЕВОДЧИКА','ПЕРЕЛИТЬ НАПИТКИ','ВЫПИСАТЬ РАСПИСАНИЕ','ПЯТИКРАТНЫЙ ЧЕМПИОН','ПИОНЕР НАЦЕПИЛ ПИЛОТКУ','ПИВО ПЕНИТСЯ В ПИАЛЕ','ПЕЧНИК СПИТ ВОЗЛЕ КИРПИЧНОЙ ПЕЧКИ','ПИОНЕРЫ НА ПЕРЕМЕНЕ','КРУПЬЕ НАПИСАЛ РАСПИСКУ'],'Р':['КРАСНЫЙ РАК','РАКЕТА РАЗОГНАЛАСЬ','СТАРАЯ РАМА','КРУТЫЕ РОГА','ПЕРВАЯ ГРУППА','ТРУДНЫЕ РОДЫ','ПРАЗДНИК ДЛЯ ДЕТВОРЫ','ПРОВАЛ ПРОЕКТА','ГРОЗА ГРОХОТАЛА','РАЗВИЛКА НАПРАВО','ПРОГНОЗ НА ЗАВТРА','БУЛЬВАР РОЗ','ПРОГУЛКА ПО ПАРКУ','РОДИНКА НА РУКЕ','ПИРАТ ЗАРЫВАЕТ СОКРОВИЩА НА ОСТРОВЕ','НА ФОТОГРАФИИ МОИ ДРУЗЬЯ','ПРОВЕДЕНА ОПЕРАЦИЯ','УРОДИЛСЯ ХОРОШИЙ УРОЖАЙ','С УТРА МЫ БРОДИМ ПО СТАРОМУ ГОРОДУ','РАСЧЕТ КОНСТРУКЦИИ ПРОВЕДЕН АРХИТЕКТОРОМ ВЕРНО'],'РЬ':['РЕЗКАЯ РЕЧЬ','РЕДКИЙ ГРИБ','ХРУСТИТ ХРЯЩ','КРЕПКИЙ ПРЕСС','РЕДКИЙ КРЕМ','СТРАШНОЕ ГОРЕ','СТРАШНАЯ БУРЯ','ЗРЕЛАЯ РЯБИНА','ТРЕЩАТ РЕЛЬСЫ','ИНТЕРЕСНАЯ РИФМА','РЕЧНОЙ БЕРЕГ','ПРЕКРАСНЫЙ ИМБИРЬ','РИТМИЧНАЯ ЗАРЯДКА','ГРЯЗНАЯ ВИТРИНА','КРЕПКАЯ ВЕРЕВКА','ВРЕДНАЯ ПРИВЫЧКА','НАДО БЫСТРЕЕ РЕШИТЬ РЕБУС','СКРИПАЧ ИГРАЕТ НА СКРИПКЕ','ПЕКАРЬ ПРИНЕС КЕКС С ОРЕХАМИ','НА БЕРЕГУ РЕКИ СТОИТ ДРЕВНЯЯ КРЕПОСТЬ'],'С':['САМИ С УСАМИ','СОЛИСТ АНСАМБЛЯ','УСАТЫЙ СОМ','СМОТРЕЛА НА СОРОКУ','СЫТНЫЙ СЫРНИК','СТАРАЯ СУМКА','СЛИВОВЫЙ САД','САМОДЕЛЬНЫЙ САМОКАТ','СВЕТЛАЯ САЛФЕТКА','СОДА В СТАКАНЕ','СОЧИНИТЬ СКАЗКУ','ПОЛОСАТАЯ СОБАКА','СТЫДНО ПЕРЕД СОСЕДЯМИ','Я ПОСАДИЛА САЛАТ И СВЕКЛУ','ТРАВА СОХНЕТ НА СОЛНЦЕ','СТРОГАЯ СУПРУГА СУПЕРМЕНА','С НАМИ В ЛЕСУ БЫЛА СОБА­КА','СОБАКА СМОТРЕЛА НА СОРОКУ','В ЛЕСУ РАСТУТ ВЫСОКИЕ СОСНЫ','САМОЛЕТ ЛЕТИТ ВЫСОКО НАД ЛЕСОМ'],'СЬ':['ВЕСЕННЯЯ ГРЯЗЬ','СЕМЬ ПОРОСЯТ','СИЛЬНАЯ РЫСЬ','СЛОМАНО ШАССИ','НАСЕЛЕНИЕ СЕЛА','ВЕСЕЛО СОСЕДЯМ','СЕДЬМАЯ СЕРИЯ','СИЛУЭТ СИЛАЧА','ОСЕННИЕ МЕСЯЦЫ','ВЕСЕЛОЕ ПИСЬМО','ОСИНОВЫЕ ЛИСТЬЯ','ВЕСЕННЯЯ СИРЕНЬ','СИММЕТРИЧНЫЙ СИМВОЛ','УСИКИ НАСЕКОМОГО','НА ТАКСИ ЕДЕТ ТАКСИСТ','НА ВЕЛОСИПЕДЕ ЕДЕТ ВЕЛОСИПЕДИСТ','ВЕСТИБЮЛЬ НАПОЛНИЛСЯ ГОСТЯМИ','УСИКИ НАСЕКОМОГО','У МЕНЯ КРАСИВАЯ СЕСТРА','КОСТЯ КОСИТ ОСИНУ КОСОЙ'],'Т':['ТУРЕЦКИЙ ТАБАК','ПИСТОЛЕТ','ТОЛСТАЯ ТОРПЕДА','ТОНКАЯ ТАЛИЯ','ВТОРОЙ МАТРОС','АТЛЕТ БЕЖИТ','СТАРАЯ ТАВЕРНА','ИНСТРУМЕНТЫ ПЛОТНИКА','ШУСТРЫЙ ЛИЛИПУТ','ПОЧЕТНАЯ ГРАМОТА','КОРОТКАЯ ЛЕНТА','ТОВАРИЩ НА ТАБУРЕТКЕ','ТРЕНЕР ТРЕБУЕТ ТОРОПИТЬСЯ','ТРАМВАЙ ТРОНУЛСЯ БЫСТРО','УТРОМ ВСТАВАТЬ ТРУДНО','ТОЛПА ТОЛКАЕТСЯ В ТОННЕЛЕ','ТАНКИСТ СПИТ ПОД ТАНКОМ','ТОРГОВЕЦ ТОРГОВАЛ ТАРЕЛКАМИ','ТАМАДА ГОВОРИТ КОРОТКИЙ ТОСТ','ТАЛАНТЛИВЫЙ ТАКТИК ЧИТАЕТ МАРШРУТ'],'ТЬ':['КИСТЬ МАСТЕРА','ПЕЧАТАТЬ ТЕКСТ','ТИХАЯ ГРУСТЬ','ТОНКАЯ ПЛЕТЬ','ТИШИНА ТЕРЕМА','ПЯТЕРО ПТЕНЦОВ','ВИСИТ ТЮЛЬКА','ПЛЕСТИ ЛАПТИ','ОТКРЫТЬ ТЮБИК','ТРУДНЫЙ ТЕРМИН','РИСОВАТЬ ПУНКТИР','ОТКРЫТЬ ПЛОТИНУ','УСТАНОВИТЬ ТЕЛЕФОН','МАТЕМАТИЧЕСКАЯ ТЕОРИЯ','ПРИНЕСТИ ТЕЛЕГРАММУ','ЖИТЬ ВПЯТЕРОМ ВЕСЕЛЕЕ','ПАУК ПЛЕТЕТ ПАУТИНУ','ТЕЛЕНОК БОИТСЯ ОТХОДИТЬ ОТ МАТЕРИ','НА КАТЕРЕ ПУТЕШЕСТВУЮТ ТИХИЕ ДЕТИ','ТИТАНОВЫЙ СТЕРЖЕНЬ'],'Ф':['ФАБРИКАНТ НА ФАБРИКЕ','ФАМИЛИЯ ФАНАТА','ФАРАОН В СКАФАНДРЕ','ФУТБОЛЬНЫЙ ФАНАТ','НА ФОТО ЖИРАФЫ','ФАРА АВТОБУСА','ФАСОВАТЬ ФАСОЛЬ','ФОТО АФРИКАНКИ','КОМФОРТНЫЙ ШАРФ','КОСМОНАВТ В СКАФАНДРЕ','ФУТЛЯР ОТ САКСОФОНА','ФУРГОН С ФРУКТАМИ','ФЕХТОВАЛЬЩИК В ФОРМЕ','НОВАЯ ФРАЗА О ФРУКТАХ','У ФАРТУКА ФИОЛЕТОВЫЙ ФОН','ИНТЕРЕСНАЯ ИНФОРМАЦИЯ','ПЕРЕД ФАСАДОМ ПОСАДИЛИ ТРАВКУ','В ТЕСТО ПОЛОЖИЛИ ФУНДУК','ФАСОВЩИК ФАСУЕТ КОНФЕТЫ В ФАНТИКАХ','НАШИ ФЛОРА И ФАУНА ФАНТАСТИЧЕСКИ РАЗНООБРАЗНЫ'],'ФЬ':['ФИНАЛЬНЫЙ ФИНТ','ВАФЕЛЬНЫЙ ЛЕВ','ФИЛЬТР ФИЛЬМОВ','ТОРФЯНОЙ ЧЕРВЬ','ВКУСНЫЙ КОФЕ','ФЕЯ СФИНКСОВ','КАФЕДРА ФИЗИКИ','АФИША ФИЛЬМА','ФИРМА ФИНАНСОВ','ФИНИШ ОФИЦЕРОВ','ПОРТФЕЛЬ ГРАФИНИ','КОНФЕТНОЕ КОНФЕТТИ','ФИГУРНАЯ КОНФЕТНИЦА','МОРКОВЬ ПОД КАРТОФЕЛЕМ','ФИОЛЕТОВАЯ ТУФЕЛЬКА','ФИОЛЕТОВЫЕ ФИАЛКИ РАСТУТ ПОД ФИКУСОМ','ФИЗИК ЗАФИКСИРОВАЛ ФИЛЬТР','ФЕЛЬДШЕР ПРИЕХАЛ НА ФЕРМУ К ФЕОДАЛУ','ОФИЦИАНТ ПОДАЛ ФИЛЕ КЕФАЛИ','ЗЕФИРНЫЙ КОНФИТЮР'],'Х':['ХРАМ МОНАХОВ','ХРУСТ ХВОРОСТА','СТРАХ ВАХТЫ','ВЗДОХ ШАХА','ХАЛЯВА УХОДИТ','ЗАСУХА ПРОХОДИТ','ХАРАКТЕР ХАЛИФА','ХВАТИТ САХАРА','ХАМСТВО ХАНА','БУХТА ХУДОЖНИКА','ХАЛАТ ХОЗЯЙКИ','СУХОЙ ВОЗДУХ','ЖЕНИХ ХОХОЧЕТ','ВЫХЛОП ВОЗДУХА','НАХОДКА ПЕШЕХОДА','ХОХОТУН ХОХОЧЕТ','ХАЛВА ИЗ ХОЛОДИЛЬНИКА','ХАЛАТ ИЗ ХЛОПКА','ХОЧУ ХОРОШУЮ РУБАХУ','ХОРОШЕМУ ХОЗЯИНУ ХОРОШИЕ ДУХИ'],'ХЬ':['ХИТРЫЕ МУХИ','ХИЖИНА ХИЩНИКА','МЯГКИЕ ОРЕХИ','ТИХИЕ МОНАХИ','СУХИЕ ОРЕХИ','ХИТРЫЙ ХИЩНИК','ПОХИЩЕНИЕ МОНАХИНИ','АРХИТЕКТОР НАХИМИЧИЛ','Я ВОСХИЩАЮСЬ ОРХИДЕЯМИ','МОНАХИ НОСЯТ БАХИЛЫ','ДУХИ ПАХНУТ ОРХИДЕЯМИ','ПОХИТИТЬ МАЛАХИТ','СУХИЕ РУБАХИ УПАЛИ НА ОРЕХИ','МОНАХИ СОЧИНИЛИ СТИХИ ПРО СТИХИЮ','АРХИВ МОНАХИНЬ','ХИЛАЯ ПСИХИКА','ХИХИКАТЬ ТИХО','ПОХИЩЕННЫЙ АРХИВ','ЕХИДНА ОБХИТРИЛА ХИЩНИКА','МУХИ ЧУВСТВУЮТ ЗАПАХИ'],'Ц':['ЦИКЛ ЦИКЛОНА','ЦЕЛАЯ ПИЦЦА','ЦЕНА ЦИРКА','ЦЕНТР ЦУНАМИ','ЛИСИЦА ЦАПНУЛА','РАЦИЯ ЦАРЯ','ЦЕЛОЕ ЯЙЦО','ЦВЕТНАЯ ПТИЦА','СТОЛИЦА ЦАРСТВА','ЦАПАТЬ ЦИКЛОПА','ЦАРСКИЙ ЛИЦЕЙ','ПАЛЕЦ МИЗИНЕЦ','ЦЕЛЫЙ ЦИТРУС','НАГЛЕЦ УЛЫБАЕТСЯ','ПЯТНИЦА ЗАКАНЧИВАЕТСЯ','ЦВЕТНАЯ ПУГОВИЦА','ВОДИЦА ИЗ КОЛОДЦА','ЗАЯЦ ЦАРАПАЕТ АКАЦИЮ','ДВОРЕЦ ОХРАНЯЕТСЯ АВИАЦИЕЙ','ЛИСИЦА ГОНИТСЯ ЗА СИНИЦЕЙ'],'Ч':['ЧАС ЧИСТОТЫ','ЛЕЧИТ ВРАЧ','ЧЕРНАЯ НОЧЬ','ВЕЧЕРНИЙ ЧАЙ','ПРЫГУЧИЙ МЯЧ','ЧАША ЧАЯ','ХОЧУ ЛЕЧО','ЧАРЫ ЧАРОДЕЯ','ЧИСТОЕ ЛИЧИКО','НАЧАЛО УЧЕБЫ','ЧУДНАЯ НОЧКА','ВЕЧНО МЕЧТАЕТ','МЕЧТА ЛЕТЧИКА','ВРАЧ ЛЕЧИТ ЧЕЛОВЕКА','ЗАЙЧИК КАЧАЛСЯ НА КАЧЕЛЯХ','УЧИТЕЛЬ УЧИТ УЧЕНИКОВ ЧЕРЧЕНИЮ','К ЧАЮ ПОДАЛИ ПЕЧЕНЬЕ','ЧЕРЕПАХА ПОЛУЧИЛА ЯБЛОЧКИ','ЧУМАЗАЯ МОРДОЧКА','ПОЧТАЛЬОН ВЗЯЛ СПРАВОЧНИК'],'Ш':['ШЕСТЬ МЫШЕЙ','ШТОПАНАЯ ШАЛЬ','ШУБА БАБУШКИ','ШЕЯ КАШАЛОТА','ШУМНАЯ ШАРАДА','ШИРИНА ШАРФА','ШКОЛЬНАЯ ШАРАДА','ШИРИНА ПАРАШЮТА','ШИРОКО ШАГАТЬ','ШПИЛЬ БАШНИ','ПИШУ ШУТКИ','ШАЛОСТЬ МАЛЫШЕЙ','ШИРОКАЯ ПУСТОШЬ','ЛАНДЫШ ШЕЛЕСТИТ','ШОКОЛАДНАЯ ВИШЕНКА','БРОШЕННЫЙ КОШЕЛЕК','У ШКОЛЫ ШУМИТ ШКОЛЬНИК','ШИРОКИЙ БАШМАК ПОД ШКАФОМ','КУКУШКА ШЕЛЕСТИТ НА ОПУШКЕ','МИЛОСТИ ПРОШУ К НАШЕМУ ШАЛАШУ'],'Щ':['ПЛАЩ ТОВАРИЩА','КИПЯЩИЙ БОРЩ','ТАЩУ ЩУКУ','ТОЛЩИНА ЩИТА','НИЩЕЕ ЖИЛИЩЕ','ЧИЩУ ОВОЩИ','ЗАЩИТА КАМЕНЩИКА','ТАЩИТЬ ОВОЩИ','ПОМОЩЬ ЩЕНКА','СЫЩИК ИЩЕТ','ПОМОЩЬ КАМЕНЩИКА','ЩЕДРЫЙ РАСЧЕТ','ОЧИЩАТЬ ОВОЩИ','ТОВАРИЩИ ОТДЫХАЮЩИЕ','РАБОТАЮЩИЙ ФОНАРЩИК','МОЙЩИК ЯЩИКОВ','КАМЕНЩИК ТАРАЩИЛСЯ НА ТРЕЩИНУ','УБОРЩИЦА В ОБЩЕЖИТИИ','Я СЧИТАЮ ВЕЩИ','ЩЕНОК ВРАЩАЛ ГОЛОВОЙ И ПИЩАЛ']}

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
				result_text=result_text.replace('Ё','Е');
				
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
	rate:1,
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
			objects.choose_voice_text[i].text=this.ru_voices[i].name.substring(0, 23);
			objects.choose_voice_text[i].visible=true;
			objects.voice_opt_bcg[i].visible=true;
			
			if(this.ru_voices[i].name.includes('Google')){
				objects.choose_voice_text[i].text+=' (рекомендуется)';	
				
			}
		}
		
		anim2.add(objects.choose_voice_cont,{y:[-300,objects.choose_voice_cont.y]},true,0.5,'easeOutBack');

		await new Promise(resolver=>{			
			this.ok_resolver=resolver;			
		})
		
	},
	
	spd_down_down(){
		
		if(anim2.any_on() || this.synth.speaking){
			sound.play('locked');
			return;
		}		
		
		anim2.add(objects.voice_opt_spd_down_button,{alpha:[0.5,1]},true,0.25,'easeInBack');
		sound.play('click');
		
		const new_utter=this.rate-0.1;
		if (new_utter>=0.1){
			this.utter=new SpeechSynthesisUtterance('скорость уменьшена');	
			this.rate=new_utter;
		}else{			
			this.utter=new SpeechSynthesisUtterance('ошибка');	
		}
			
		this.utter.rate=this.rate;
		this.utter.voice=this.ru_voices[this.sel_id>-1?this.sel_id:0];
		this.synth.speak(this.utter);
		
	},
	
	spd_up_down(){
		
		if(anim2.any_on() || this.synth.speaking){
			sound.play('locked');
			return;
		}		
		anim2.add(objects.voice_opt_spd_up_button,{alpha:[0.5,1]},true,0.25,'easeInBack');
		sound.play('click');
		
		const new_utter=this.rate+0.1;
		if (new_utter>=0.1){
			this.utter=new SpeechSynthesisUtterance('скорость увеличена');	
			this.rate=new_utter;
		}else{
			
			this.utter=new SpeechSynthesisUtterance('ошибка');	
		}
			
		this.utter.rate=this.rate;
		this.utter.voice=this.ru_voices[this.sel_id>-1?this.sel_id:0];
		this.synth.speak(this.utter);
		
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