const MENU_DATA = [
  { id: 'sal1', category: 'salads', name: 'Испанец', description: '200 гр — буженина, говядина варёно-копченая, язык говяжий, болгарский перец, лук, огурцы маринованные, майонез, тертый сыр, оливки', price: 710, badge: null, allergens: [], image: '../img/salads/sal1.png' },
  { id: 'sal2', category: 'salads', name: 'Авокадо', description: '200 гр — тигровые креветки, мякоть авокадо, салат латук, айсберг, майонез, помидоры черри', price: 870, badge: null, allergens: [], image: '../img/salads/sal2.png' },
  { id: 'sal3', category: 'salads', name: 'Останкинский', description: '250 гр — телятина, руккола, бальзамический соус, пармезан, миндаль, лук, помидоры черри', price: 920, badge: null, allergens: [], image: '../img/salads/sal3.png' },
  { id: 'sal4', category: 'salads', name: 'Модный «Цезарь»', description: '330 гр — куриная грудка, пармезан, салат романо, айсберг, яйцо пашот, гренки, помидоры черри, фирменный соус «Цезарь»', price: 810, badge: null, allergens: [], image: '../img/salads/sal4.png' },
  { id: 'sal5', category: 'salads', name: '«Цезарь» с креветками', description: '270 гр — тигровые креветки, пармезан, красная икра, салат романо, гренки, помидоры черри, фирменный соус «Цезарь»', price: 980, badge: null, allergens: [], image: '../img/salads/sal5.png' },
  { id: 'sal6', category: 'salads', name: 'Итальянский', description: '300 гр — говяжья вырезка, болгарский перец, салат латук, руккола, мангольд, красный лук, бальзамический соус, помидоры черри, лепешка', price: 900, badge: null, allergens: [], image: '../img/salads/sal6.png' },
  { id: 'sal7', category: 'salads', name: 'Малибу', description: '220 гр — слабосоленая семга, авокадо, огурцы свежие, салат латук, майонез с добавлением соуса «Табаско»', price: 780, badge: null, allergens: [], image: '../img/salads/sal7.png' },
  { id: 'sal8', category: 'salads', name: 'Оливье', description: '200 гр — говядина, картофель, огурцы маринованные, зелёный горошек, яйцо, морковь, майонез', price: 500, badge: null, allergens: [], image: '../img/salads/sal8.png' },
  { id: 'sal9', category: 'salads', name: 'Греческий', description: '250 гр — свежие помидоры и огурцы, фетаки, перец болгарский, оливки, маслины, салат романо, айсберг, масло оливковое и лук', price: 540, badge: null, allergens: [], image: '../img/salads/sal9.png' },
  { id: 'sal10', category: 'salads', name: 'Дары моря', description: '250 гр — морской гребешок, мидии, креветки, салат микс, помидоры черри, соус на основе оливкового масла, дижонской горчицы, мёда и лимонного сока', price: 990, badge: null, allergens: [], image: '../img/salads/sal10.png' },

  { id: 'cold1', category: 'coldAppetizers', name: 'Овощное ассорти', description: '250 гр — свежие помидоры, огурцы и болгарский перец', price: 430, badge: null, allergens: [], image: '../img/Холодные_закуски/cold1.png' },
  { id: 'cold2', category: 'coldAppetizers', name: 'Язык говяжий отварной', description: '150/30 гр — с хреном', price: 590, badge: null, allergens: [], image: '../img/Холодные_закуски/cold2.png' },
  { id: 'cold3', category: 'coldAppetizers', name: 'Мясное ассорти', description: '200 гр — говяжий язык, буженина, бастурма, говядина варёно-копченая', price: 740, badge: null, allergens: [], image: '../img/Холодные_закуски/cold3.png' },
  { id: 'cold4', category: 'coldAppetizers', name: 'Рыбное ассорти', description: '150 гр — осетрина горячего и холодного копчения, семга слабосоленая, масляная', price: 1380, badge: null, allergens: [], image: '../img/Холодные_закуски/cold4.png' },
  { id: 'cold5', category: 'coldAppetizers', name: 'Норвежская принцесса', description: '150 гр — слабосоленая семга, сливочное масло, оливки, лимон', price: 1270, badge: null, allergens: [], image: '../img/Холодные_закуски/cold5.png' },
  { id: 'cold6', category: 'coldAppetizers', name: 'Селедочка по-деревенски', description: '150 гр — филе селёдки с отварным картофелем', price: 390, badge: null, allergens: [], image: '../img/Холодные_закуски/cold6.png' },
  { id: 'cold7', category: 'coldAppetizers', name: 'Баклажаны по-арабски', description: '200/20 гр — сыр, чеснок, грецкий орех, майонез, соус гранатовый', price: 500, badge: null, allergens: [], image: '../img/Холодные_закуски/cold7.png' },
  { id: 'cold8', category: 'coldAppetizers', name: 'Грибочки по-селянски', description: '200 гр — маринованные маслята, лисички, опята, масло, лук и зелень', price: 380, badge: null, allergens: [], image: '../img/Холодные_закуски/cold8.png' },
  { id: 'cold9', category: 'coldAppetizers', name: 'Сырная палитра с мёдом', description: '150/50 гр — камамбер, маасдам, дорблю, чеддер, мраморный', price: 700, badge: null, allergens: [], image: '../img/Холодные_закуски/cold9.png' },
  { id: 'cold10', category: 'coldAppetizers', name: 'Домашние соленья', description: '200 гр — огурцы, помидоры, чеснок, перец, капуста', price: 400, badge: null, allergens: [], image: '../img/Холодные_закуски/cold10.png' },
  { id: 'cold11', category: 'coldAppetizers', name: 'Зеленое ассорти', description: '150 гр', price: 350, badge: null, allergens: [], image: '../img/Холодные_закуски/cold11.png' },
  { id: 'cold12', category: 'coldAppetizers', name: 'Оливки и маслины', description: '50 гр', price: 290, badge: null, allergens: [], image: '../img/Холодные_закуски/cold12.png' },
  { id: 'cold13', category: 'coldAppetizers', name: 'Лимон', description: '50 гр', price: 130, badge: null, allergens: [], image: '../img/Холодные_закуски/cold13.png' },

  { id: 'hot1', category: 'hotAppetizers', name: 'Жульен грибной', description: '150 гр — шампиньоны, лук, сливки, сыр', price: 370, badge: null, allergens: [] },
  { id: 'hot2', category: 'hotAppetizers', name: 'Шампиньоны фаршированные', description: '200 гр — с помидорами или ветчиной, сметана, лук, сыр', price: 460, badge: null, allergens: [] },
  { id: 'hot3', category: 'hotAppetizers', name: 'Баклажаны с чесноком', description: '150 гр — на оливковом масле с зеленью', price: 350, badge: null, allergens: [] },
  { id: 'hot4', category: 'hotAppetizers', name: 'Жареный сулугуни', description: '150 гр — с ягодным соусом', price: 480, badge: null, allergens: [] },
  { id: 'hot5', category: 'hotAppetizers', name: 'Сырные палочки из моцареллы', description: '200/30 гр — с пикантным соусом', price: 520, badge: null, allergens: [] },
  { id: 'hot6', category: 'hotAppetizers', name: 'Креветки отварные в пиве', description: '150 гр', price: 650, badge: null, allergens: [] },
  { id: 'hot7', category: 'hotAppetizers', name: 'Тигровые креветки', description: '200/50 гр — с ромовым соусом', price: 920, badge: null, allergens: [] },
  { id: 'hot8', category: 'hotAppetizers', name: 'Пенне дель Фатторе', description: '350 гр — пенне, филе куриное, помидоры вяленые, пицца-соус, пармезан, маслины, помидоры черри, сливки', price: 740, badge: null, allergens: [] },
  { id: 'hot9', category: 'hotAppetizers', name: 'Феттучини с сыром', description: '350 гр — феттучини, пармезан, сливки', price: 540, badge: null, allergens: [] },
  { id: 'hot10', category: 'hotAppetizers', name: 'Паста карбонара', description: '350 гр — феттучини, бекон, пармезан, белое вино, яйцо, сливки', price: 670, badge: null, allergens: [] },

  { id: 'soup1', category: 'soups', name: 'Борщ', description: '350 гр — со сметаной и зеленью', price: 360, badge: null, allergens: [] },
  { id: 'soup2', category: 'soups', name: 'Солянка сборная мясная', description: '350 гр — со сметаной и зеленью', price: 400, badge: null, allergens: [] },
  { id: 'soup3', category: 'soups', name: 'Суп-лапша куриная', description: '400 гр', price: 360, badge: null, allergens: [] },
  { id: 'soup4', category: 'soups', name: 'Уха царская', description: '400 гр', price: 500, badge: null, allergens: [] },
  { id: 'soup5', category: 'soups', name: 'Харчо', description: '350 гр', price: 360, badge: null, allergens: [] },
  { id: 'soup6', category: 'soups', name: 'Суп-крем из шампиньонов', description: '350 гр', price: 400, badge: null, allergens: [] },
  { id: 'soup7', category: 'soups', name: 'Суп из белых грибов', description: '300 гр — грибы белые, картофель, помидоры черри, масло оливковое, лук и сметана', price: 470, badge: null, allergens: [] },
  { id: 'soup8', category: 'soups', name: 'Рыбная похлебка с тостом', description: '350 гр — морепродукты, лосось, судак, томаты вяленые, помидоры черри, водка, сельдерей, пармезан', price: 600, badge: null, allergens: [] },

  { id: 'side1', category: 'sides', name: 'Картофель жареный', description: '200 гр — с луком', price: 300, badge: null, allergens: [] },
  { id: 'side2', category: 'sides', name: 'Картофель «Фри»', description: '150 гр', price: 280, badge: null, allergens: [] },
  { id: 'side3', category: 'sides', name: 'Картофель запеченный', description: '170 гр', price: 300, badge: null, allergens: [] },
  { id: 'side4', category: 'sides', name: 'Картофельное пюре', description: '150 гр', price: 300, badge: null, allergens: [] },
  { id: 'side5', category: 'sides', name: 'Картофель по-графски', description: '180 гр — с шампиньонами и луком', price: 360, badge: null, allergens: [] },
  { id: 'side6', category: 'sides', name: 'Овощи гриль', description: '250 гр — помидоры, цукини, баклажаны, перец болгарский, чеснок', price: 520, badge: null, allergens: [] },
  { id: 'side7', category: 'sides', name: 'Аджапсандал', description: '450 гр — приготовленные на углях помидоры, баклажаны и перец болгарский', price: 760, badge: null, allergens: [] },

  { id: 'sauce1', category: 'sauces', name: 'Сметана', description: '30 гр', price: 120, badge: null, allergens: [] },
  { id: 'sauce2', category: 'sauces', name: 'Чесночный соус', description: '30 гр', price: 120, badge: null, allergens: [] },
  { id: 'sauce3', category: 'sauces', name: 'Майонез', description: '30 гр', price: 120, badge: null, allergens: [] },
  { id: 'sauce4', category: 'sauces', name: 'Сырный соус', description: '30 гр', price: 120, badge: null, allergens: [] },
  { id: 'sauce5', category: 'sauces', name: 'Барбекю', description: '30 гр', price: 120, badge: null, allergens: [] },
  { id: 'sauce6', category: 'sauces', name: 'Кетчуп', description: '30 гр', price: 100, badge: null, allergens: [] },
  { id: 'sauce7', category: 'sauces', name: 'Горчица', description: '30 гр', price: 100, badge: null, allergens: [] },
  { id: 'sauce8', category: 'sauces', name: 'Хрен', description: '30 гр', price: 100, badge: null, allergens: [] },
  { id: 'sauce9', category: 'sauces', name: 'Наршараб', description: '30 гр', price: 100, badge: null, allergens: [] },
  { id: 'sauce10', category: 'sauces', name: 'Ткемали', description: '30 гр', price: 100, badge: null, allergens: [] },
  { id: 'sauce11', category: 'sauces', name: 'Сацебели', description: '30 гр', price: 100, badge: null, allergens: [] },
  { id: 'sauce12', category: 'sauces', name: 'Тар-тар', description: '80 гр', price: 170, badge: null, allergens: [] },
  { id: 'sauce13', category: 'sauces', name: 'Ромовый соус', description: '80 гр', price: 170, badge: null, allergens: [] },

  { id: 'fish1', category: 'fish', name: 'Сёмга запечённая в фольге', description: '280 гр — стейк семги, помидоры, перец болгарский, оливки, маслины, зелень, белое вино', price: 1380, badge: null, allergens: [] },
  { id: 'fish2', category: 'fish', name: 'Золотая рыбка', description: '150/220 гр — отварная семга, картофельное пюре, зеленый горошек, соленые огурцы, польский соус', price: 1320, badge: null, allergens: [] },
  { id: 'fish3', category: 'fish', name: 'Сибас запеченный с креветками', description: '400 гр — с помидорами, перцем болгарским и сыром', price: 1000, badge: null, allergens: [] },
  { id: 'fish4', category: 'fish', name: 'Болонез', description: '280 гр — филе судака, запеченное с грибным жульеном под сырной шапкой, картофель и лук', price: 780, badge: null, allergens: [] },
  { id: 'fish5', category: 'fish', name: 'Дар Нептуна', description: '300 гр — филе судака, спаржа, сливочно-шпинатный соус, тигровые креветки, авокадо, помидоры черри', price: 830, badge: null, allergens: [] },
  { id: 'fish6', category: 'fish', name: 'Сёмга в сливочном соусе', description: '200/200 гр — стейк сёмги, перец болгарский, брокколи, сливки и карри', price: 1550, badge: null, allergens: [] },

  { id: 'meat1', category: 'meat', name: 'Телятина по-французски', description: '150/200 гр — с грибами, сыром, луком, картофельным пюре с ветчиной и красным перцем', price: 1020, badge: null, allergens: [] },
  { id: 'meat2', category: 'meat', name: 'Медальоны с белыми грибами и хаш брауном', description: '150/150/100 гр — свиная вырезка, белые грибы, картофель и зелень', price: 960, badge: null, allergens: [] },
  { id: 'meat3', category: 'meat', name: 'Телятина со сливочно-грибным соусом', description: '150/50 гр', price: 960, badge: null, allergens: [] },
  { id: 'meat4', category: 'meat', name: 'Останкино', description: '150/320 гр — говяжья вырезка в панировке, лук, грибы, перец болгарский, баклажаны, салат айсберг и сырный соус', price: 1040, badge: null, allergens: [] },
  { id: 'meat5', category: 'meat', name: 'Цыпленок табака', description: '1 шт — маринованный в белом вине с луком и специями, чесночный соус', price: 840, badge: null, allergens: [] },
  { id: 'meat6', category: 'meat', name: 'Сицилия', description: '150/150 гр — баранья вырезка, болгарский перец, помидоры, картофель и лук', price: 960, badge: null, allergens: [] },
  { id: 'meat7', category: 'meat', name: 'Лангет', description: '220/180/80 гр — говяжья вырезка, запеченные овощи и соус из белых грибов', price: 1730, badge: null, allergens: [] },
  { id: 'meat8', category: 'meat', name: 'Мясо по-гусарски', description: '150/150 гр — свиная шейка, запеченная с луком, грибами и сыром, сливки', price: 900, badge: null, allergens: [] },
  { id: 'meat9', category: 'meat', name: 'Болтливый язык', description: '320 гр — говяжий язык, запеченный с грибным жульеном под сырной шапкой, лук и помидоры', price: 860, badge: null, allergens: [] },
  { id: 'meat10', category: 'meat', name: 'Хинкали из говядины', description: 'от 3-х штук', price: 130, badge: null, allergens: [] },

  { id: 'bakery1', category: 'bakery', name: 'Хачапури Имеретинские', description: '500 гр', price: 1000, badge: null, allergens: [] },
  { id: 'bakery2', category: 'bakery', name: 'Хачапури конвертиком', description: '140 гр', price: 480, badge: null, allergens: [] },
  { id: 'bakery3', category: 'bakery', name: 'Блинчики со сметаной / с вареньем / с маслом / с мёдом', description: '120/30 гр', price: 240, badge: null, allergens: [] },
  { id: 'bakery4', category: 'bakery', name: 'Блинчики с сёмгой', description: '120/60 гр', price: 480, badge: null, allergens: [] },
  { id: 'bakery5', category: 'bakery', name: 'Лаваш', description: '1 порц', price: 60, badge: null, allergens: [] },
  { id: 'bakery6', category: 'bakery', name: 'Лепешка', description: '1 порц', price: 40, badge: null, allergens: [] },
  { id: 'bakery7', category: 'bakery', name: 'Хлебная корзина', description: '1 порц — лепешка, хлеб черный, лаваш', price: 240, badge: null, allergens: [] },

  { id: 'grill1', category: 'grill', name: 'Шашлык из бараньей мякоти', description: '200 гр', price: 700, badge: null, allergens: [] },
  { id: 'grill2', category: 'grill', name: 'Шашлык из бараньей корейки', description: '200 гр', price: 960, badge: null, allergens: [] },
  { id: 'grill3', category: 'grill', name: 'Шашлык из бараньих рёбрышек', description: '200 гр', price: 650, badge: null, allergens: [] },
  { id: 'grill4', category: 'grill', name: 'Шашлык из свиной шейки', description: '200 гр', price: 650, badge: null, allergens: [] },
  { id: 'grill5', category: 'grill', name: 'Шашлык из свиных рёбрышек', description: '200 гр', price: 600, badge: null, allergens: [] },
  { id: 'grill6', category: 'grill', name: 'Шашлык из телятины', description: '200 гр', price: 980, badge: null, allergens: [] },
  { id: 'grill7', category: 'grill', name: 'Шашлык из сёмги', description: '200 гр', price: 1550, badge: null, allergens: [] },
  { id: 'grill8', category: 'grill', name: 'Шашлык из куриного бедра', description: '200 гр', price: 630, badge: null, allergens: [] },
  { id: 'grill9', category: 'grill', name: 'Люля-кебаб говяжий', description: '200 гр', price: 650, badge: null, allergens: [] },
  { id: 'grill10', category: 'grill', name: 'Люля-кебаб куриный', description: '200 гр', price: 600, badge: null, allergens: [] },
  { id: 'grill11', category: 'grill', name: 'Люля-кебаб бараний', description: '200 гр', price: 700, badge: null, allergens: [] },
  { id: 'grill12', category: 'grill', name: 'Дорадо', description: '1 шт — 300 гр', price: 850, badge: null, allergens: [] },
  { id: 'grill13', category: 'grill', name: 'Картофель бейби с салом', description: '200 гр', price: 420, badge: null, allergens: [] },
  { id: 'grill14', category: 'grill', name: 'Шашлык из овощей', description: '400 гр — перец болгарский, баклажан, томат', price: 700, badge: null, allergens: [] },
  { id: 'grill15', category: 'grill', name: 'Ассорти шашлыков', description: '1400 гр — свинина, баранина, курица, люля-кебаб говяжий, люля-кебаб куриный', price: 4900, badge: null, allergens: [] },
  { id: 'grill16', category: 'grill', name: 'Пирамида', description: '2000 гр — свинина, баранина, курица, люля-кебаб говяжий, люля-кебаб куриный, сёмга, овощи', price: 7600, badge: null, allergens: [] },

  { id: 'dess1', category: 'desserts', name: 'Чизкейк Нью-Йорк / Шоколадный / Клубничный', description: '120 гр', price: 420, badge: null, allergens: [] },
  { id: 'dess2', category: 'desserts', name: 'Тирамису', description: '120 гр', price: 420, badge: null, allergens: [] },
  { id: 'dess3', category: 'desserts', name: 'Три шоколада', description: '150 гр', price: 420, badge: null, allergens: [] },
  { id: 'dess4', category: 'desserts', name: 'Миндальный', description: '150 гр', price: 420, badge: null, allergens: [] },
  { id: 'dess5', category: 'desserts', name: 'Наполеон', description: '150 гр', price: 420, badge: null, allergens: [] },
  { id: 'dess6', category: 'desserts', name: 'Сладкая нега', description: '150/50 гр — творожный рулет с клубничной начинкой и шариком мороженого', price: 480, badge: null, allergens: [] },
  { id: 'dess7', category: 'desserts', name: 'Штрудель яблочный', description: '180/50 гр — с курагой, грецкими орехами, медом, корицей и шариком мороженого', price: 480, badge: null, allergens: [] },
  { id: 'dess8', category: 'desserts', name: 'Мороженое сливочное, шоколадное или клубничное', description: '120 гр', price: 320, badge: null, allergens: [] },
  { id: 'dess9', category: 'desserts', name: 'Мороженое с фруктами', description: '200 гр — с сиропом и взбитыми сливками', price: 360, badge: null, allergens: [] },
  { id: 'dess10', category: 'desserts', name: 'Мороженое с вареньем', description: '150 гр — со взбитыми сливками и клубничным вареньем', price: 360, badge: null, allergens: [] },

  { id: 'tea1', category: 'tea', name: 'Ассам', description: '600 мл', price: 350, badge: null, allergens: [] },
  { id: 'tea2', category: 'tea', name: 'Горный Чабрец', description: '600 мл', price: 350, badge: null, allergens: [] },
  { id: 'tea3', category: 'tea', name: 'Эрл Грей', description: '600 мл', price: 350, badge: null, allergens: [] },
  { id: 'tea4', category: 'tea', name: 'Сенча Класси', description: '600 мл', price: 350, badge: null, allergens: [] },
  { id: 'tea5', category: 'tea', name: 'Молочный Улун', description: '600 мл', price: 370, badge: null, allergens: [] },
  { id: 'tea6', category: 'tea', name: 'Жасминовый', description: '600 мл', price: 370, badge: null, allergens: [] },
  { id: 'tea7', category: 'tea', name: 'Пина Колада', description: '600 мл — гибискус, яблоко, шиповник, кусочки ананаса, персик, маракуйя', price: 380, badge: null, allergens: [] },
  { id: 'tea8', category: 'tea', name: 'Имбирный', description: '600 мл — с мёдом и лимоном, чай чёрный или зелёный', price: 480, badge: null, allergens: [] },
  { id: 'tea9', category: 'tea', name: 'Облепиховый', description: '600 мл — с мёдом и грейпфрутом', price: 480, badge: null, allergens: [] },
  { id: 'tea10', category: 'tea', name: 'Варенье', description: '150 мл — вишневое, клубничное, кизиловое, малиновое, ореховое, из белой черешни', price: 240, badge: null, allergens: [] },

  { id: 'coffee1', category: 'coffee', name: 'Эспрессо', description: '50 мл', price: 250, badge: null, allergens: [] },
  { id: 'coffee2', category: 'coffee', name: 'Американо', description: '120 мл', price: 290, badge: null, allergens: [] },
  { id: 'coffee3', category: 'coffee', name: 'Капучино', description: '150 мл', price: 350, badge: null, allergens: [] },
  { id: 'coffee4', category: 'coffee', name: 'Двойной эспрессо', description: '120 мл', price: 500, badge: null, allergens: [] },
  { id: 'coffee5', category: 'coffee', name: 'Кофе «по-восточному»', description: '120 мл', price: 360, badge: null, allergens: [] },
  { id: 'coffee6', category: 'coffee', name: 'Бейлис-кофе', description: '180 мл', price: 600, badge: null, allergens: [] },
  { id: 'coffee7', category: 'coffee', name: 'Глясе', description: '150 мл', price: 380, badge: null, allergens: [] },
  { id: 'coffee8', category: 'coffee', name: 'Латте', description: '180 мл', price: 360, badge: null, allergens: [] },

  { id: 'drink1', category: 'drinks', name: 'Сок', description: '200 мл — апельсиновый, грейпфрутовый, томатный, яблочный, вишневый; 1 л — 420 ₽', price: 100, badge: null, allergens: [] },
  { id: 'drink2', category: 'drinks', name: 'Морс клюквенный', description: '200 мл — 110 ₽; 1 л — 480 ₽', price: 110, badge: null, allergens: [] },
  { id: 'drink3', category: 'drinks', name: 'Свежевыжатый сок', description: '200 мл — грейпфрут, апельсин, яблоко, морковь', price: 480, badge: null, allergens: [] },
  { id: 'drink4', category: 'drinks', name: 'Татни минеральная вода', description: '500 мл', price: 230, badge: null, allergens: [] },
  { id: 'drink5', category: 'drinks', name: 'Татни негазированная', description: '500 мл', price: 200, badge: null, allergens: [] },
  { id: 'drink6', category: 'drinks', name: 'Лимонад', description: '500 мл — тархун, дюшес', price: 230, badge: null, allergens: [] },
  { id: 'drink7', category: 'drinks', name: 'Кола / Фанта / Спрайт / Тоник', description: '330 мл', price: 250, badge: null, allergens: [] },

  { id: 'spark1', category: 'sparkling', name: 'Буржуа Золотое', description: '750 мл — полусладкое, брют, Россия', price: 1200, badge: null, allergens: [] },
  { id: 'spark2', category: 'sparkling', name: 'Спуманте Фиорино д’Оро Асти D.O.C.G.', description: '750 мл — Италия', price: 3800, badge: null, allergens: [] },
  { id: 'spark3', category: 'sparkling', name: 'Спуманте Фиорино д’Оро Просекко D.O.C.', description: '750 мл — Италия', price: 3800, badge: null, allergens: [] },
  { id: 'spark4', category: 'sparkling', name: 'Кюве Жан-Луи Розе', description: '750 мл — брют розовое, Франция', price: 3700, badge: null, allergens: [] },
  { id: 'spark5', category: 'sparkling', name: 'Мартини Асти D.O.C.G.', description: '750 мл — Италия', price: 4200, badge: null, allergens: [] },
  { id: 'spark6', category: 'sparkling', name: 'Мартини Просекко D.O.C.', description: '750 мл — Италия', price: 4200, badge: null, allergens: [] },

  { id: 'draft1', category: 'draftBeer', name: 'Сибирская Корона', description: '330 мл — классическое; 500 мл — 360 ₽', price: 240, badge: null, allergens: [] },
  { id: 'draft2', category: 'draftBeer', name: 'Стелла Артуа', description: '330 мл — светлое; 500 мл — 500 ₽', price: 330, badge: null, allergens: [] },
  { id: 'draft3', category: 'draftBeer', name: 'Лёвенбрау', description: '330 мл — светлое; 500 мл — 410 ₽', price: 270, badge: null, allergens: [] },

  { id: 'bottle1', category: 'bottledBeer', name: 'Козел', description: '450 мл — темное / светлое', price: 280, badge: null, allergens: [] },
  { id: 'bottle2', category: 'bottledBeer', name: 'Стелла Артуа', description: '440 мл — безалкогольное', price: 300, badge: null, allergens: [] },
  { id: 'bottle3', category: 'bottledBeer', name: 'Корона Экстра', description: '330 мл — светлое', price: 380, badge: null, allergens: [] },
  { id: 'bottle4', category: 'bottledBeer', name: 'Хугарден', description: '440 мл — нефильтрованное', price: 330, badge: null, allergens: [] },

  { id: 'cock1', category: 'cocktails', name: 'Виски-кола', description: '250 мл', price: 500, badge: null, allergens: [] },
  { id: 'cock2', category: 'cocktails', name: 'Секс на пляже', description: '250 мл — ром, водка, сок персиковый, сок апельсиновый, гренадин', price: 570, badge: null, allergens: [] },
  { id: 'cock3', category: 'cocktails', name: 'Мартини с соком', description: '250 мл', price: 500, badge: null, allergens: [] },
  { id: 'cock4', category: 'cocktails', name: 'Мартини Фиеро-Тоник', description: '200 мл — мартини фиеро, апельсин, тоник', price: 500, badge: null, allergens: [] },
  { id: 'cock5', category: 'cocktails', name: 'Б-52', description: '60 мл — калуа, бейлис, куантро', price: 600, badge: null, allergens: [] },
  { id: 'cock6', category: 'cocktails', name: 'Текила Санрайз', description: '250 мл — текила, сок апельсиновый, гренадин', price: 560, badge: null, allergens: [] },
  { id: 'cock7', category: 'cocktails', name: 'Лонг-Айленд', description: '250 мл — водка, ром, куантро, текила, лимон, сироп, кола', price: 700, badge: null, allergens: [] },
  { id: 'cock8', category: 'cocktails', name: 'Пина-Колада', description: '250 мл — ром, малибу, сок ананасовый, сливки, сироп', price: 560, badge: null, allergens: [] },
  { id: 'cock9', category: 'cocktails', name: 'Апероль Шприц', description: '250 мл — апероль, игристое вино брют, вода минеральная', price: 700, badge: null, allergens: [] },

  { id: 'nonalc1', category: 'nonAlcoholic', name: 'Радуга', description: '250 мл — сок апельсиновый, ананасовый, гренадин, кюрасао', price: 350, badge: null, allergens: [] },
  { id: 'nonalc2', category: 'nonAlcoholic', name: 'Пеликан', description: '250 мл — сок персиковый, гренадин, сироп клубничный, банан', price: 350, badge: null, allergens: [] },
  { id: 'nonalc3', category: 'nonAlcoholic', name: 'Молочный коктейль', description: '250 мл — клубничный, шоколадный или ванильный', price: 350, badge: null, allergens: [] },
  { id: 'nonalc4', category: 'nonAlcoholic', name: 'Витаминный заряд', description: '900 мл — апельсин, лимон, лайм, сироп маракуйя, грейпфрут, яблочный сок, клюквенный морс', price: 900, badge: null, allergens: [] },

  { id: 'hotcock1', category: 'hotCocktails', name: 'Глинтвейн', description: '200 мл — красное вино, мед, яблоко, апельсин, лимон, корица', price: 640, badge: null, allergens: [] },
  { id: 'hotcock2', category: 'hotCocktails', name: 'Витаминный глинтвейн', description: '200 мл — яблоко, апельсин, вишневый сок, корица', price: 360, badge: null, allergens: [] },

  { id: 'vodka1', category: 'vodka', name: 'Пять озер', description: '50 мл / 500 мл — 150 ₽ / 1500 ₽', price: 150, badge: null, allergens: [] },
  { id: 'vodka2', category: 'vodka', name: 'Хаски', description: '50 мл / 500 мл — 180 ₽ / 1800 ₽', price: 180, badge: null, allergens: [] },
  { id: 'vodka3', category: 'vodka', name: 'Белая Берёзка', description: '50 мл / 500 мл — 200 ₽ / 2000 ₽', price: 200, badge: null, allergens: [] },
  { id: 'vodka4', category: 'vodka', name: 'Царская оригинальная', description: '50 мл / 500 мл — 200 ₽ / 2000 ₽', price: 200, badge: null, allergens: [] },
  { id: 'vodka5', category: 'vodka', name: 'МАМОНТ', description: '50 мл / 500 мл — 220 ₽ / 2200 ₽', price: 220, badge: null, allergens: [] },
  { id: 'vodka6', category: 'vodka', name: 'Белуга', description: '50 мл / 500 мл — 270 ₽ / 2700 ₽', price: 270, badge: null, allergens: [] },
  { id: 'vodka7', category: 'vodka', name: 'Онегин', description: '50 мл / 500 мл — 280 ₽ / 2800 ₽', price: 280, badge: null, allergens: [] },

  { id: 'cognac1', category: 'cognac', name: 'Арарат 5 лет', description: '50 мл / 500 мл — Армения', price: 350, badge: null, allergens: [] },
  { id: 'cognac2', category: 'cognac', name: 'Ахтамар 10 лет', description: '50 мл / 500 мл — Армения', price: 530, badge: null, allergens: [] },
  { id: 'cognac3', category: 'cognac', name: 'Ани 7 лет', description: '50 мл / 500 мл — Армения', price: 440, badge: null, allergens: [] },
  { id: 'cognac4', category: 'cognac', name: 'Дугладзе 5 лет', description: '50 мл / 500 мл — Грузия', price: 250, badge: null, allergens: [] },

  { id: 'whisky1', category: 'whisky', name: 'Баллантайнс', description: '50 мл — Шотландия', price: 380, badge: null, allergens: [] },
  { id: 'whisky2', category: 'whisky', name: 'Бушмилз Ориджинал', description: '50 мл — Ирландия', price: 380, badge: null, allergens: [] },
  { id: 'whisky3', category: 'whisky', name: 'Джек Дениелс', description: '50 мл — США', price: 400, badge: null, allergens: [] },

  { id: 'liqueur1', category: 'liqueurs', name: 'Джин «Грин Бабун»', description: '50 мл — Исландия', price: 180, badge: null, allergens: [] },
  { id: 'liqueur2', category: 'liqueurs', name: 'Барристер', description: '50 мл — Россия', price: 180, badge: null, allergens: [] },
  { id: 'liqueur3', category: 'liqueurs', name: 'Барсело золотая', description: '50 мл — ром, Доминиканская Республика', price: 250, badge: null, allergens: [] },
  { id: 'liqueur4', category: 'liqueurs', name: 'Барсело серебряная', description: '50 мл — ром, Доминиканская Республика', price: 250, badge: null, allergens: [] },
  { id: 'liqueur5', category: 'liqueurs', name: 'Вьехо Де Кальдас серебряная', description: '50 мл — Колумбия', price: 250, badge: null, allergens: [] },
  { id: 'liqueur6', category: 'liqueurs', name: 'Хосе Куэрво золотая', description: '50 мл — текила', price: 250, badge: null, allergens: [] },
  { id: 'liqueur7', category: 'liqueurs', name: 'Хосе Куэрво серебряная', description: '50 мл — текила', price: 250, badge: null, allergens: [] },
  { id: 'liqueur8', category: 'liqueurs', name: 'Мартини Бьянко', description: '50 мл / 1000 мл — Италия', price: 200, badge: null, allergens: [] },
  { id: 'liqueur9', category: 'liqueurs', name: 'Мартини Фиеро', description: '50 мл / 1000 мл — Италия', price: 200, badge: null, allergens: [] },
  { id: 'liqueur10', category: 'liqueurs', name: 'Апероль', description: '50 мл / 1000 мл — Италия', price: 200, badge: null, allergens: [] },
  { id: 'liqueur11', category: 'liqueurs', name: 'Бейлис', description: '50 мл / 1000 мл — Ирландия', price: 300, badge: null, allergens: [] },
  { id: 'liqueur12', category: 'liqueurs', name: 'Болс Кофе', description: '50 мл / 700 мл — Голландия', price: 300, badge: null, allergens: [] },
  { id: 'liqueur13', category: 'liqueurs', name: 'Болс Трипл Сек', description: '50 мл / 700 мл — Голландия', price: 300, badge: null, allergens: [] },
  { id: 'liqueur14', category: 'liqueurs', name: 'Болс Коконат', description: '50 мл / 700 мл — Голландия', price: 300, badge: null, allergens: [] },
  { id: 'liqueur15', category: 'liqueurs', name: 'Ягермайстер', description: '50 мл / 1000 мл — Германия', price: 380, badge: null, allergens: [] },
  { id: 'liqueur16', category: 'liqueurs', name: 'Самбука', description: '50 мл / 700 мл — Италия', price: 270, badge: null, allergens: [] },

  { id: 'wine1', category: 'wine', region: 'georgia', name: 'Алазанская долина', description: '750 мл — белое полусладкое, красное полусладкое', price: 1700, badge: null, allergens: [] },
  { id: 'wine2', category: 'wine', region: 'georgia', name: 'Цинандали', description: '750 мл — белое сухое', price: 1800, badge: null, allergens: [] },
  { id: 'wine3', category: 'wine', region: 'georgia', name: 'Саперави', description: '750 мл — красное сухое', price: 1800, badge: null, allergens: [] },
  { id: 'wine4', category: 'wine', region: 'georgia', name: 'Мукузани', description: '750 мл — красное сухое', price: 2000, badge: null, allergens: [] },
  { id: 'wine5', category: 'wine', region: 'georgia', name: 'Киндзмараули', description: '750 мл — красное полусладкое', price: 1900, badge: null, allergens: [] },
  { id: 'wine6', category: 'wine', region: 'georgia', name: 'Хванчкара', description: '750 мл — красное полусладкое', price: 3300, badge: null, allergens: [] },
  { id: 'wine7', category: 'wine', region: 'france', name: 'Шабли', description: '750 мл — белое сухое', price: 6000, badge: null, allergens: [] },
  { id: 'wine8', category: 'wine', region: 'france', name: 'Лез Анфан Террибль Шардоне', description: '750 мл — белое сухое', price: 3800, badge: null, allergens: [] },
  { id: 'wine9', category: 'wine', region: 'france', name: 'Лез Анфан Террибль Пино Нуар', description: '750 мл — красное сухое', price: 3800, badge: null, allergens: [] },
  { id: 'wine10', category: 'wine', region: 'italy', name: 'Пино Гриджио Сант Орсола', description: '750 мл — белое сухое', price: 3000, badge: null, allergens: [] },
  { id: 'wine11', category: 'wine', region: 'italy', name: 'Гави Сант Орсола', description: '750 мл — белое сухое', price: 3400, badge: null, allergens: [] },
  { id: 'wine12', category: 'wine', region: 'italy', name: 'Вальполичелла Сант Орсола', description: '750 мл — красное сухое', price: 3400, badge: null, allergens: [] },
  { id: 'wine13', category: 'wine', region: 'italy', name: 'Кьянти Сант Орсола', description: '750 мл — красное сухое', price: 3200, badge: null, allergens: [] },
  { id: 'wine14', category: 'wine', region: 'spain', name: 'Винья Зорзаль Шардоне', description: '750 мл — белое сухое', price: 3800, badge: null, allergens: [] },
  { id: 'wine15', category: 'wine', region: 'spain', name: 'Доминио де Эредиа Риоха', description: '750 мл — красное сухое', price: 3800, badge: null, allergens: [] },
  { id: 'wine16', category: 'wine', region: 'chile', name: 'Тарапака Шардонне', description: '750 мл — белое сухое', price: 2500, badge: null, allergens: [] },
  { id: 'wine17', category: 'wine', region: 'chile', name: 'Тарапака Каберне Совиньон', description: '750 мл — красное сухое', price: 2500, badge: null, allergens: [] },
  { id: 'wine18', category: 'wine', region: 'russia', name: 'Шато Тамань Селект Блан', description: '750 мл — белое сухое, белое полусладкое', price: 1800, badge: null, allergens: [] },
  { id: 'wine19', category: 'wine', region: 'russia', name: 'Шато Тамань Селект Руж', description: '750 мл — красное сухое, красное полусладкое', price: 1800, badge: null, allergens: [] },
  { id: 'wine20', category: 'wine', region: 'armenia', name: 'Плодовое', description: '750 мл — ежевичное, гранатовое полусладкое', price: 1700, badge: null, allergens: [] },
  { id: 'wine21', category: 'wine', region: 'armenia', name: 'Мец Сюник Арени', description: '750 мл — белое сухое, белое полусл., красное сухое, красное полусл.', price: 1700, badge: null, allergens: [] },
  { id: 'wine22', category: 'wine', region: 'armenia', name: 'Воскеваз', description: '750 мл — белое сухое, белое полусладкое, красное сухое, красное полусладкое', price: 1700, badge: null, allergens: [] }
];

const CATEGORY_LABELS = {
  salads: 'Салаты',
  coldAppetizers: 'Холодные закуски',
  hotAppetizers: 'Горячие закуски',
  soups: 'Первые блюда',
  sides: 'Гарниры',
  sauces: 'Соусы',
  fish: 'Рыбные блюда',
  meat: 'Мясные блюда',
  bakery: 'Выпечка',
  grill: 'Блюда на углях',
  desserts: 'Десерты',
  tea: 'Чай',
  coffee: 'Кофе',
  drinks: 'Напитки',
  sparkling: 'Игристое вино',
  draftBeer: 'Пиво разливное',
  bottledBeer: 'Пиво бутылочное',
  cocktails: 'Коктейли',
  nonAlcoholic: 'Безалкогольные коктейли',
  hotCocktails: 'Горячие коктейли',
  vodka: 'Водка',
  cognac: 'Коньяк',
  whisky: 'Виски',
  liqueurs: 'Ликеры',
  wine: 'Винная карта'
};

const CATEGORIES = [
  'salads',
  'coldAppetizers',
  'hotAppetizers',
  'soups',
  'sides',
  'sauces',
  'fish',
  'meat',
  'bakery',
  'grill',
  'desserts',
  'tea',
  'coffee',
  'drinks',
  'sparkling',
  'draftBeer',
  'bottledBeer',
  'cocktails',
  'nonAlcoholic',
  'hotCocktails',
  'vodka',
  'cognac',
  'whisky',
  'liqueurs',
  'wine'
];

const WINE_REGIONS = {
  georgia: 'ГРУЗИЯ',
  france: 'ФРАНЦИЯ',
  italy: 'ИТАЛИЯ',
  spain: 'ИСПАНИЯ',
  chile: 'ЧИЛИ',
  russia: 'РОССИЯ',
  armenia: 'АРМЕНИЯ'
};

let currentFilter = '';
let searchDebounceTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderCategoryNav();
  setupSearch();
  setupCategoryNav();
  setupAddToCart();
  setupDescriptionToggle();
  initCart();
});

function renderCategoryNav() {
  const nav = document.getElementById('category-nav');
  if (!nav) return;

  const icon = `\n    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n      <path d="M4 7h16M4 12h16M4 17h16"></path>\n    </svg>\n  `;

  nav.innerHTML = CATEGORIES.map((category, index) => `\n    <a href="#${category}" class="category-link${index === 0 ? ' active' : ''}" data-category="${category}">\n      <span class="category-icon">${icon}</span>\n      <span class="category-label">${CATEGORY_LABELS[category]}</span>\n    </a>\n  `).join('');
}

function renderWineSection(items) {
  return `\n    <section class="menu-section" id="wine">\n      <div class="section-header">\n        <h2 class="section-title">${CATEGORY_LABELS.wine}</h2>\n      </div>\n      ${Object.entries(WINE_REGIONS).map(([region, label]) => {
        const regionItems = items.filter(item => item.region === region);
        if (!regionItems.length) return '';

        return `\n          <div class="wine-region" id="wine-${region}">\n            <h3 class="wine-region-title">${label}</h3>\n            <div class="menu-grid">\n              ${regionItems.map(item => renderMenuItem(item)).join('')}\n            </div>\n          </div>\n        `;
      }).join('')}\n    </section>\n  `;
}

function initCart() {
  if (!window.Cart) return;
  window.Cart.loadCart();
  window.Cart.initCartUI();
  window.Cart.renderCart();
  window.Cart.updateCartBadge();
  window.Cart.updateMobileBottomBar();
}

function renderMenu(filterQuery = '') {
  const container = document.getElementById('menu-container');
  const noResults = document.getElementById('no-results');
  const searchQueryEl = document.getElementById('search-query');
  if (!container) return;

  let filteredData = MENU_DATA;
  if (filterQuery) {
    const query = filterQuery.toLowerCase();
    filteredData = MENU_DATA.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  if (filteredData.length === 0) {
    container.innerHTML = '';
    if (noResults) {
      noResults.style.display = 'block';
      if (searchQueryEl) searchQueryEl.textContent = filterQuery;
    }
    return;
  }

  if (noResults) noResults.style.display = 'none';

  container.innerHTML = CATEGORIES.map(category => {
    const items = filteredData.filter(item => item.category === category);
    if (items.length === 0) return '';
    if (category === 'wine') {
      return renderWineSection(items);
    }

    return `\n      <section class="menu-section" id="${category}">\n        <div class="section-header">\n          <h2 class="section-title">${CATEGORY_LABELS[category]}</h2>\n        </div>\n        <div class="menu-grid">\n          ${items.map(item => renderMenuItem(item)).join('')}\n        </div>\n      </section>\n    `;
  }).join('');
}

function renderMenuItem(item) {
  const allergenIcons = item.allergens.map(allergen => {
    const icons = {
      gluten: '🌾',
      dairy: '🥛',
      nuts: '🥜'
    };
    return `<span class="allergen-icon" title="${allergen}">${icons[allergen] || ''}</span>`;
  }).join('');

  // Déterminer le chemin de l'image si elle existe
  const imagePath = item.image || `../img/${item.category}/${item.id}.png`;
  const imageHtml = `<img src="${imagePath}" alt="${item.name}" class="item-img" loading="lazy" onerror="this.style.display='none'">`;

  // Afficher le bouton info seulement si la description fait plus d'1 ligne (>80 chars)
  const hasLongDesc = item.description && item.description.length > 80;
  const infoButton = hasLongDesc ? `<button
              class="item-info-btn"
              type="button"
              aria-label="Показать полное описание"
              aria-expanded="false"
              data-action="show-description"
              data-id="${item.id}"
            >i</button>` : '';

  return `\n    <div class="menu-item">\n      <div class="item-image">\n        ${imageHtml}\n        ${item.badge ? `<div class="item-badge ${item.badge}">${item.badge}</div>` : ''}\n      </div>\n      <div class="item-content">\n        <h3 class="item-name">${item.name}</h3>
        <p class="item-description" id="desc-${item.id}" aria-expanded="false">${item.description}</p>
        ${allergenIcons ? `<div class="item-allergens">${allergenIcons}</div>` : ''}
        <div class="item-footer">
          <div class="item-price">${item.price} ₽</div>
          <div class="item-actions">
            ${infoButton}
            <button
              class="add-to-cart-btn"
              type="button"
              aria-label="Добавить в корзину"
              data-action="add-to-cart"
              data-id="${item.id}"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setupAddToCart() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  container.addEventListener('click', e => {
    const btn = e.target.closest('[data-action="add-to-cart"]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    const id = btn.getAttribute('data-id');
    const item = MENU_DATA.find(i => i.id === id);
    if (!item || !window.Cart) return;

    window.Cart.addItem({ id: item.id, name: item.name, price: item.price });

    const card = btn.closest('.menu-item');
    if (card) {
      card.classList.remove('just-added');
      void card.offsetWidth;
      card.classList.add('just-added');
      setTimeout(() => card.classList.remove('just-added'), 450);
    }

    if (window.LavCafe && window.LavCafe.Toast) {
      window.LavCafe.Toast.success('Добавлено', 1200);
    }
  });
}

function setupDescriptionToggle() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  container.addEventListener('click', e => {
    const btn = e.target.closest('[data-action="show-description"]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const id = btn.getAttribute('data-id');
    const card = btn.closest('.menu-item');
    if (!card) return;

    const description = card.querySelector(`#desc-${id}`);
    if (!description) return;

    const expanded = description.classList.toggle('expanded');
    btn.setAttribute('aria-expanded', String(expanded));
    btn.setAttribute('aria-label', expanded ? 'Скрыть описание' : 'Показать полное описание');
    btn.textContent = expanded ? '×' : 'i';
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const query = e.target.value.trim();
      if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        if (query === currentFilter) return;
        currentFilter = query;
        renderMenu(query);
      }, 120);
      if (searchClear) searchClear.style.display = query ? 'block' : 'none';
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
      currentFilter = '';
      renderMenu('');
      searchClear.style.display = 'none';
    });
  }
}

function setupCategoryNav() {
  const categoryLinks = document.querySelectorAll('.category-link');
  categoryLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const category = link.getAttribute('data-category');
      const section = document.getElementById(category);
      if (section) {
        const offset = 90;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      const sidebar = document.getElementById('category-sidebar');
      const overlay = document.getElementById('cart-overlay');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        categoryLinks.forEach(link => {
          if (link.getAttribute('data-category') === id) {
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-100px 0px -70% 0px' });

  document.querySelectorAll('.menu-section').forEach(section => observer.observe(section));
}
