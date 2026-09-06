const POKEMON_ART_ROOT = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const POKEMON_FORM_ART_ROOT = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const POKEMON_SPECIES_CSV_URL = "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species.csv";
const GEN1_BASIC_V1_IDS = new Set([83, 128, 132, 143, 144, 145, 146, 151]);
const GEN1_ONE_STAGE_V1_IDS = new Set([19, 21, 23, 27, 37, 46, 48, 50, 54, 58, 72, 77, 84, 86, 88, 90, 95, 96, 100, 102, 104, 108, 109, 114, 118, 129]);
const GEN1_ONE_STAGE_MAP_EXTRAS = [
    { generation: 0, label: "Evolution family (B)", pokemon: [{ id: 52, name: "Meowth", stage: "Basic" }, { id: 53, name: "Persian", stage: "Stage 1" }], regional: null },
    { generation: 0, label: "Evolution family (B)", pokemon: [{ id: 79, name: "Slowpoke", stage: "Basic" }, { id: 80, name: "Slowbro", stage: "Stage 1" }], regional: null },
    { generation: 0, label: "Evolution family (B)", pokemon: [{ id: 123, name: "Scyther", stage: "Basic" }, { id: 212, name: "Scizor", stage: "Stage 1" }], regional: null }
];

const BASIC_ONLY_POKEMON = [
    { id: 83, name: "Farfetch'd", group: "Standalone" }, { id: 115, name: "Kangaskhan", group: "Standalone" },
    { id: 123, name: "Scyther", group: "Standalone • B/T" }, { id: 127, name: "Pinsir", group: "Standalone" },
    { id: 128, name: "Tauros", group: "Standalone" }, { id: 131, name: "Lapras", group: "Standalone" },
    { id: 132, name: "Ditto", group: "Standalone" }, { id: 143, name: "Snorlax", group: "Standalone • H" },
    { id: 144, name: "Articuno", group: "Legendary" }, { id: 145, name: "Zapdos", group: "Legendary" },
    { id: 146, name: "Moltres", group: "Legendary" }, { id: 150, name: "Mewtwo", group: "Legendary" },
    { id: 151, name: "Mew", group: "Mythical" }, { id: 201, name: "Unown", group: "Standalone" },
    { id: 213, name: "Shuckle", group: "Standalone" }, { id: 214, name: "Heracross", group: "Standalone" },
    { id: 225, name: "Delibird", group: "Standalone" }, { id: 227, name: "Skarmory", group: "Standalone" },
    { id: 235, name: "Smeargle", group: "Standalone" }, { id: 241, name: "Miltank", group: "Standalone" },
    { id: 243, name: "Raikou", group: "Legendary" }, { id: 244, name: "Entei", group: "Legendary" },
    { id: 245, name: "Suicune", group: "Legendary" }, { id: 249, name: "Lugia", group: "Legendary" },
    { id: 250, name: "Ho-Oh", group: "Legendary" }, { id: 251, name: "Celebi", group: "Mythical" },
    { id: 302, name: "Sableye", group: "Standalone" }, { id: 303, name: "Mawile", group: "Standalone" },
    { id: 311, name: "Plusle", group: "Standalone" }, { id: 312, name: "Minun", group: "Standalone" },
    { id: 324, name: "Torkoal", group: "Standalone" }, { id: 335, name: "Zangoose", group: "Standalone" },
    { id: 336, name: "Seviper", group: "Standalone" }, { id: 351, name: "Castform", group: "Standalone" },
    { id: 357, name: "Tropius", group: "Standalone" }, { id: 359, name: "Absol", group: "Standalone" },
    { id: 369, name: "Relicanth", group: "Standalone" }, { id: 377, name: "Regirock", group: "Legendary" },
    { id: 378, name: "Regice", group: "Legendary" }, { id: 379, name: "Registeel", group: "Legendary" },
    { id: 380, name: "Latias", group: "Legendary" }, { id: 381, name: "Latios", group: "Legendary" },
    { id: 382, name: "Kyogre", group: "Legendary" }, { id: 383, name: "Groudon", group: "Legendary" },
    { id: 384, name: "Rayquaza", group: "Legendary" }, { id: 385, name: "Jirachi", group: "Mythical" },
    { id: 386, name: "Deoxys", group: "Mythical" }, { id: 417, name: "Pachirisu", group: "Standalone" },
    { id: 441, name: "Chatot", group: "Standalone" }, { id: 442, name: "Spiritomb", group: "Standalone" },
    { id: 479, name: "Rotom", group: "Standalone" }, { id: 480, name: "Uxie", group: "Legendary" },
    { id: 481, name: "Mesprit", group: "Legendary" }, { id: 482, name: "Azelf", group: "Legendary" },
    { id: 483, name: "Dialga", group: "Legendary" }, { id: 484, name: "Palkia", group: "Legendary" },
    { id: 485, name: "Heatran", group: "Legendary" }, { id: 486, name: "Regigigas", group: "Legendary" },
    { id: 487, name: "Giratina", group: "Legendary" }, { id: 488, name: "Cresselia", group: "Legendary" },
    { id: 489, name: "Phione", group: "Mythical" }, { id: 490, name: "Manaphy", group: "Mythical" },
    { id: 491, name: "Darkrai", group: "Mythical" }, { id: 492, name: "Shaymin", group: "Mythical" },
    { id: 493, name: "Arceus", group: "Mythical" }, { id: 494, name: "Victini", group: "Mythical" },
    { id: 531, name: "Audino", group: "Standalone" },
    { id: 538, name: "Throh", group: "Standalone" }, { id: 539, name: "Sawk", group: "Standalone" },
    { id: 556, name: "Maractus", group: "Standalone" }, { id: 587, name: "Emolga", group: "Standalone" },
    { id: 621, name: "Druddigon", group: "Standalone" }, { id: 638, name: "Cobalion", group: "Legendary" },
    { id: 639, name: "Terrakion", group: "Legendary" }, { id: 640, name: "Virizion", group: "Legendary" },
    { id: 641, name: "Tornadus", group: "Legendary" }, { id: 642, name: "Thundurus", group: "Legendary" },
    { id: 643, name: "Reshiram", group: "Legendary" }, { id: 644, name: "Zekrom", group: "Legendary" },
    { id: 645, name: "Landorus", group: "Legendary" }, { id: 646, name: "Kyurem", group: "Legendary" },
    { id: 647, name: "Keldeo", group: "Mythical" }, { id: 648, name: "Meloetta", group: "Mythical" },
    { id: 649, name: "Genesect", group: "Mythical" }, { id: 701, name: "Hawlucha", group: "Standalone" },
    { id: 702, name: "Dedenne", group: "Standalone" }, { id: 707, name: "Klefki", group: "Standalone" },
    { id: 716, name: "Xerneas", group: "Legendary" }, { id: 717, name: "Yveltal", group: "Legendary" },
    { id: 718, name: "Zygarde", group: "Legendary" }, { id: 719, name: "Diancie", group: "Mythical" },
    { id: 720, name: "Hoopa", group: "Mythical" }, { id: 721, name: "Volcanion", group: "Mythical" },
    { id: 776, name: "Turtonator", group: "Standalone" }, { id: 778, name: "Mimikyu", group: "Standalone" },
    { id: 780, name: "Drampa", group: "Standalone" }, { id: 781, name: "Dhelmise", group: "Standalone" },
    { id: 785, name: "Tapu Koko", group: "Legendary" }, { id: 786, name: "Tapu Lele", group: "Legendary" },
    { id: 787, name: "Tapu Bulu", group: "Legendary" }, { id: 788, name: "Tapu Fini", group: "Legendary" },
    { id: 793, name: "Nihilego", group: "Ultra Beast" }, { id: 794, name: "Buzzwole", group: "Ultra Beast" },
    { id: 795, name: "Pheromosa", group: "Ultra Beast" }, { id: 796, name: "Xurkitree", group: "Ultra Beast" },
    { id: 797, name: "Celesteela", group: "Ultra Beast" }, { id: 798, name: "Kartana", group: "Ultra Beast" },
    { id: 799, name: "Guzzlord", group: "Ultra Beast" }, { id: 800, name: "Necrozma", group: "Legendary" },
    { id: 801, name: "Magearna", group: "Mythical" }, { id: 802, name: "Marshadow", group: "Mythical" },
    { id: 805, name: "Stakataka", group: "Ultra Beast" }, { id: 806, name: "Blacephalon", group: "Ultra Beast" },
    { id: 807, name: "Zeraora", group: "Mythical" },
    { id: 870, name: "Falinks", group: "Standalone" }, { id: 10169, dexId: 144, name: "Galarian Articuno", group: "Regional Form", generation: 7 },
    { id: 10170, dexId: 145, name: "Galarian Zapdos", group: "Regional Form", generation: 7 },
    { id: 10171, dexId: 146, name: "Galarian Moltres", group: "Regional Form", generation: 7 },
    { id: 874, name: "Stonjourner", group: "Standalone" },
    { id: 875, name: "Eiscue", group: "Standalone" }, { id: 877, name: "Morpeko", group: "Standalone" },
    { id: 888, name: "Zacian", group: "Legendary" }, { id: 889, name: "Zamazenta", group: "Legendary" },
    { id: 890, name: "Eternatus", group: "Legendary" }, { id: 893, name: "Zarude", group: "Mythical" },
    { id: 894, name: "Regieleki", group: "Legendary" }, { id: 895, name: "Regidrago", group: "Legendary" },
    { id: 896, name: "Glastrier", group: "Legendary" }, { id: 897, name: "Spectrier", group: "Legendary" },
    { id: 898, name: "Calyrex", group: "Legendary" }, { id: 905, name: "Enamorus", group: "Legendary" },
    { id: 950, name: "Klawf", group: "Standalone" }, { id: 962, name: "Bombirdier", group: "Standalone" },
    { id: 967, name: "Cyclizar", group: "Standalone" }, { id: 973, name: "Flamigo", group: "Standalone" },
    { id: 976, name: "Veluza", group: "Standalone" }, { id: 977, name: "Dondozo", group: "Standalone" },
    { id: 978, name: "Tatsugiri", group: "Standalone" },
    { id: 984, name: "Great Tusk", group: "Paradox • Past" }, { id: 985, name: "Scream Tail", group: "Paradox • Past" },
    { id: 986, name: "Brute Bonnet", group: "Paradox • Past" }, { id: 987, name: "Flutter Mane", group: "Paradox • Past" },
    { id: 988, name: "Slither Wing", group: "Paradox • Past" }, { id: 989, name: "Sandy Shocks", group: "Paradox • Past" },
    { id: 990, name: "Iron Treads", group: "Paradox • Future" }, { id: 991, name: "Iron Bundle", group: "Paradox • Future" },
    { id: 992, name: "Iron Hands", group: "Paradox • Future" }, { id: 993, name: "Iron Jugulis", group: "Paradox • Future" },
    { id: 994, name: "Iron Moth", group: "Paradox • Future" }, { id: 995, name: "Iron Thorns", group: "Paradox • Future" },
    { id: 1001, name: "Wo-Chien", group: "Legendary" }, { id: 1002, name: "Chien-Pao", group: "Legendary" },
    { id: 1003, name: "Ting-Lu", group: "Legendary" }, { id: 1004, name: "Chi-Yu", group: "Legendary" },
    { id: 1005, name: "Roaring Moon", group: "Paradox • Past" }, { id: 1006, name: "Iron Valiant", group: "Paradox • Future" },
    { id: 1007, name: "Koraidon", group: "Legendary" }, { id: 1008, name: "Miraidon", group: "Legendary" },
    { id: 1009, name: "Walking Wake", group: "Paradox • Past" }, { id: 1010, name: "Iron Leaves", group: "Paradox • Future" },
    { id: 1014, name: "Okidogi", group: "Legendary" }, { id: 1015, name: "Munkidori", group: "Legendary" },
    { id: 1016, name: "Fezandipiti", group: "Legendary" }, { id: 1017, name: "Ogerpon", group: "Legendary" },
    { id: 1020, name: "Gouging Fire", group: "Paradox • Past" }, { id: 1021, name: "Raging Bolt", group: "Paradox • Past" },
    { id: 1022, name: "Iron Boulder", group: "Paradox • Future" }, { id: 1023, name: "Iron Crown", group: "Paradox • Future" },
    { id: 1024, name: "Terapagos", group: "Legendary" }, { id: 1025, name: "Pecharunt", group: "Mythical" }
];

const ONE_STAGE_LINES = [
    { label: "Fire Stone", pokemon: [{ id: 58, name: "Growlithe", stage: "Basic" }, { id: 59, name: "Arcanine", stage: "Stage 1" }] },
    { label: "Fire Stone", pokemon: [{ id: 37, name: "Vulpix", stage: "Basic" }, { id: 38, name: "Ninetales", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 50, name: "Diglett", stage: "Basic" }, { id: 51, name: "Dugtrio", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 77, name: "Ponyta", stage: "Basic" }, { id: 78, name: "Rapidash", stage: "Stage 1" }] },
    { label: "Trade evolution", pokemon: [{ id: 95, name: "Onix", stage: "Basic" }, { id: 208, name: "Steelix", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 223, name: "Remoraid", stage: "Basic" }, { id: 224, name: "Octillery", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 231, name: "Phanpy", stage: "Basic" }, { id: 232, name: "Donphan", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 296, name: "Makuhita", stage: "Basic" }, { id: 297, name: "Hariyama", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 309, name: "Electrike", stage: "Basic" }, { id: 310, name: "Manectric", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 436, name: "Bronzor", stage: "Basic" }, { id: 437, name: "Bronzong", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 228, name: "Houndour", stage: "Basic" }, { id: 229, name: "Houndoom", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 261, name: "Poochyena", stage: "Basic" }, { id: 262, name: "Mightyena", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 674, name: "Pancham", stage: "Basic" }, { id: 675, name: "Pangoro", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 739, name: "Crabrawler", stage: "Basic" }, { id: 740, name: "Crabominable", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 759, name: "Stufful", stage: "Basic" }, { id: 760, name: "Bewear", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 827, name: "Nickit", stage: "Basic" }, { id: 828, name: "Thievul", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 831, name: "Wooloo", stage: "Basic" }, { id: 832, name: "Dubwool", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 734, name: "Yungoos", stage: "Basic" }, { id: 735, name: "Gumshoos", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 919, name: "Nymble", stage: "Basic" }, { id: 920, name: "Lokix", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 926, name: "Fidough", stage: "Basic" }, { id: 927, name: "Dachsbun", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 942, name: "Maschiff", stage: "Basic" }, { id: 943, name: "Mabosstiff", stage: "Stage 1" }] },
    { label: "Level evolution", pokemon: [{ id: 944, name: "Shroodle", stage: "Basic" }, { id: 945, name: "Grafaiai", stage: "Stage 1" }] }
];

const FOSSIL_BASIC_IDS = new Set([138, 140, 142, 345, 347, 408, 410, 564, 566, 696, 698, 880, 881, 882, 883]);
const REGIONAL_ONLY_EVOLUTION_BASIC_IDS = new Set([83, 122, 222, 550, 562, 211]);
const ONE_STAGE_REGIONAL_VARIANTS = {
    19: { region: "Alola", basic: { id: 10091, name: "Alolan Rattata", stage: "Basic" }, stage1: { id: 10092, name: "Alolan Raticate", stage: "Stage 1" } },
    27: { region: "Alola", basic: { id: 10101, name: "Alolan Sandshrew", stage: "Basic" }, stage1: { id: 10102, name: "Alolan Sandslash", stage: "Stage 1" } },
    37: { region: "Alola", basic: { id: 10103, name: "Alolan Vulpix", stage: "Basic" }, stage1: { id: 10104, name: "Alolan Ninetales", stage: "Stage 1" } },
    50: { region: "Alola", basic: { id: 10105, name: "Alolan Diglett", stage: "Basic" }, stage1: { id: 10106, name: "Alolan Dugtrio", stage: "Stage 1" } },
    58: { region: "Hisui", basic: { id: 10229, name: "Hisuian Growlithe", stage: "Basic" }, stage1: { id: 10230, name: "Hisuian Arcanine", stage: "Stage 1" } },
    77: { region: "Galar", basic: { id: 10162, name: "Galarian Ponyta", stage: "Basic" }, stage1: { id: 10163, name: "Galarian Rapidash", stage: "Stage 1" } },
    88: { region: "Alola", basic: { id: 10112, name: "Alolan Grimer", stage: "Basic" }, stage1: { id: 10113, name: "Alolan Muk", stage: "Stage 1" } },
    100: { region: "Hisui", basic: { id: 10231, name: "Hisuian Voltorb", stage: "Basic" }, stage1: { id: 10232, name: "Hisuian Electrode", stage: "Stage 1" } },
    554: { region: "Galar", basic: { id: 10176, name: "Galarian Darumaka", stage: "Basic" }, stage1: { id: 10177, name: "Galarian Darmanitan", stage: "Stage 1" } }
};

const BASIC_ONLY_FORM_PATHS = {
    83: [
        { id: 83, name: "Farfetch'd", group: "Standalone", stage: "Basic", action: "Galar Form" },
        { id: 10166, name: "Galarian Farfetch'd", group: "Regional Form", stage: "Basic", action: "Evolve" },
        { id: 865, name: "Sirfetch'd", group: "Regional Evolution", stage: "Stage 1", action: "Kanto Form" }
    ]
};

const THREE_STAGE_LINES = [
    { name: "Bulbasaur family", pokemon: [{ id: 1, name: "Bulbasaur", stage: "Basic" }, { id: 2, name: "Ivysaur", stage: "Stage 1" }, { id: 3, name: "Venusaur", stage: "Stage 2" }] },
    { name: "Dratini family", pokemon: [{ id: 147, name: "Dratini", stage: "Basic" }, { id: 148, name: "Dragonair", stage: "Stage 1" }, { id: 149, name: "Dragonite", stage: "Stage 2" }] },
    { name: "Rookidee family", pokemon: [{ id: 821, name: "Rookidee", stage: "Basic" }, { id: 822, name: "Corvisquire", stage: "Stage 1" }, { id: 823, name: "Corviknight", stage: "Stage 2" }] }
];

const GEN1_THREE_STAGE_LINES = [
    [1, "Bulbasaur", 2, "Ivysaur", 3, "Venusaur", "Standard family"], [4, "Charmander", 5, "Charmeleon", 6, "Charizard", "(T)"], [7, "Squirtle", 8, "Wartortle", 9, "Blastoise", ""],
    [10, "Caterpie", 11, "Metapod", 12, "Butterfree", "(T)"], [13, "Weedle", 14, "Kakuna", 15, "Beedrill", ""], [16, "Pidgey", 17, "Pidgeotto", 18, "Pidgeot", ""],
    [29, "Nidoran Female", 30, "Nidorina", 31, "Nidoqueen", ""], [32, "Nidoran Male", 33, "Nidorino", 34, "Nidoking", ""], [41, "Zubat", 42, "Golbat", 169, "Crobat", ""],
    [43, "Oddish", 44, "Gloom", 45, "Vileplume", "(B)"], [56, "Mankey", 57, "Primeape", 979, "Annihilape", "(T)"], [60, "Poliwag", 61, "Poliwhirl", 62, "Poliwrath", "(B)"],
    [63, "Abra", 64, "Kadabra", 65, "Alakazam", ""], [66, "Machop", 67, "Machoke", 68, "Machamp", ""], [69, "Bellsprout", 70, "Weepinbell", 71, "Victreebel", ""],
    [74, "Geodude", 75, "Graveler", 76, "Golem", "(R)"], [81, "Magnemite", 82, "Magneton", 462, "Magnezone", "(T)"], [92, "Gastly", 93, "Haunter", 94, "Gengar", ""],
    [111, "Rhyhorn", 112, "Rhydon", 464, "Rhyperior", ""], [116, "Horsea", 117, "Seadra", 230, "Kingdra", "(T)"], [137, "Porygon", 233, "Porygon2", 474, "Porygon-Z", ""],
    [172, "Pichu", 25, "Pikachu", 26, "Raichu", "(H)"], [173, "Cleffa", 35, "Clefairy", 36, "Clefable", "(T)(H)"], [174, "Igglybuff", 39, "Jigglypuff", 40, "Wigglytuff", "(H)"],
    [440, "Happiny", 113, "Chansey", 242, "Blissey", "(H)"], [439, "Mime Jr.", 122, "Mr. Mime", 866, "Mr. Rime", "(R)(H)" ]
].map(([basicId,basic,stage1Id,stage1,stage2Id,stage2,label]) => ({ name: `${basic} family ${label}`.trim(), generation: 0, pokemon: [{id:basicId,name:basic,stage:"Basic"},{id:stage1Id,name:stage1,stage:"Stage 1"},{id:stage2Id,name:stage2,stage:"Stage 2"}] }));

const BABY_POKEMON_FAMILIES = [
    { generation: 1, baby: { id: 172, name: "Pichu", stage: "Baby" }, paths: [[{ id: 25, name: "Pikachu", stage: "Basic" }, { id: 26, name: "Raichu", stage: "Stage 1" }]] },
    { generation: 1, baby: { id: 173, name: "Cleffa", stage: "Baby" }, paths: [[{ id: 35, name: "Clefairy", stage: "Basic" }, { id: 36, name: "Clefable", stage: "Stage 1" }]] },
    { generation: 1, baby: { id: 174, name: "Igglybuff", stage: "Baby" }, paths: [[{ id: 39, name: "Jigglypuff", stage: "Basic" }, { id: 40, name: "Wigglytuff", stage: "Stage 1" }]] },
    { generation: 1, baby: { id: 175, name: "Togepi", stage: "Baby" }, paths: [[{ id: 176, name: "Togetic", stage: "Basic" }, { id: 468, name: "Togekiss", stage: "Stage 1" }]] },
    { generation: 1, baby: { id: 236, name: "Tyrogue", stage: "Baby" }, paths: [[{ id: 106, name: "Hitmonlee", stage: "Basic" }], [{ id: 107, name: "Hitmonchan", stage: "Basic" }], [{ id: 237, name: "Hitmontop", stage: "Basic" }]] },
    { generation: 1, baby: { id: 238, name: "Smoochum", stage: "Baby" }, paths: [[{ id: 124, name: "Jynx", stage: "Basic" }]] },
    { generation: 1, baby: { id: 239, name: "Elekid", stage: "Baby" }, paths: [[{ id: 125, name: "Electabuzz", stage: "Basic" }, { id: 466, name: "Electivire", stage: "Stage 1" }]] },
    { generation: 1, baby: { id: 240, name: "Magby", stage: "Baby" }, paths: [[{ id: 126, name: "Magmar", stage: "Basic" }, { id: 467, name: "Magmortar", stage: "Stage 1" }]] },
    { generation: 2, baby: { id: 298, name: "Azurill", stage: "Baby" }, paths: [[{ id: 183, name: "Marill", stage: "Basic" }, { id: 184, name: "Azumarill", stage: "Stage 1" }]] },
    { generation: 2, baby: { id: 360, name: "Wynaut", stage: "Baby" }, paths: [[{ id: 202, name: "Wobbuffet", stage: "Basic" }]] },
    { generation: 3, baby: { id: 406, name: "Budew", stage: "Baby" }, paths: [[{ id: 315, name: "Roselia", stage: "Basic" }, { id: 407, name: "Roserade", stage: "Stage 1" }]] },
    { generation: 3, baby: { id: 433, name: "Chingling", stage: "Baby" }, paths: [[{ id: 358, name: "Chimecho", stage: "Basic" }]] },
    { generation: 3, baby: { id: 438, name: "Bonsly", stage: "Baby" }, paths: [[{ id: 185, name: "Sudowoodo", stage: "Basic" }]] },
    { generation: 3, baby: { id: 439, name: "Mime Jr.", stage: "Baby" }, paths: [[{ id: 122, name: "Mr. Mime", stage: "Basic" }], [{ id: 10168, name: "Galarian Mr. Mime", stage: "Basic" }, { id: 866, name: "Mr. Rime", stage: "Stage 1" }]] },
    { generation: 3, baby: { id: 440, name: "Happiny", stage: "Baby" }, paths: [[{ id: 113, name: "Chansey", stage: "Basic" }, { id: 242, name: "Blissey", stage: "Stage 1" }]] },
    { generation: 3, baby: { id: 446, name: "Munchlax", stage: "Baby" }, paths: [[{ id: 143, name: "Snorlax", stage: "Basic" }]] },
    { generation: 3, baby: { id: 447, name: "Riolu", stage: "Baby" }, paths: [[{ id: 448, name: "Lucario", stage: "Basic" }]] },
    { generation: 3, baby: { id: 458, name: "Mantyke", stage: "Baby" }, paths: [[{ id: 226, name: "Mantine", stage: "Basic" }]] },
    { generation: 7, baby: { id: 848, name: "Toxel", stage: "Baby" }, paths: [[{ id: 849, name: "Toxtricity (Amped)", stage: "Basic" }], [{ id: 10184, name: "Toxtricity (Low Key)", stage: "Basic" }]] }
];

const FOSSIL_GENERATIONS = [
    {
        label: "Generation I", region: "Kanto", note: "Mysterious Fossil acts as the starting card.",
        lines: [
            { fossil: "Mysterious Fossil", pokemon: [{ id: 138, name: "Omanyte", stage: "Stage 1" }, { id: 139, name: "Omastar", stage: "Stage 2" }] },
            { fossil: "Mysterious Fossil", pokemon: [{ id: 140, name: "Kabuto", stage: "Stage 1" }, { id: 141, name: "Kabutops", stage: "Stage 2" }] },
            { fossil: "Mysterious Fossil", pokemon: [{ id: 142, name: "Aerodactyl", stage: "Stage 1" }] }
        ]
    },
    {
        label: "Generation III", region: "Hoenn", note: "Root and Claw Fossils begin two complete restored families.",
        lines: [
            { fossil: "Root Fossil", pokemon: [{ id: 345, name: "Lileep", stage: "Stage 1" }, { id: 346, name: "Cradily", stage: "Stage 2" }] },
            { fossil: "Claw Fossil", pokemon: [{ id: 347, name: "Anorith", stage: "Stage 1" }, { id: 348, name: "Armaldo", stage: "Stage 2" }] }
        ]
    },
    {
        label: "Generation IV", region: "Sinnoh", note: "Skull and Armor Fossils restore opposing offensive and defensive lines.",
        lines: [
            { fossil: "Skull Fossil", pokemon: [{ id: 408, name: "Cranidos", stage: "Stage 1" }, { id: 409, name: "Rampardos", stage: "Stage 2" }] },
            { fossil: "Armor Fossil", pokemon: [{ id: 410, name: "Shieldon", stage: "Stage 1" }, { id: 411, name: "Bastiodon", stage: "Stage 2" }] }
        ]
    },
    {
        label: "Generation V", region: "Unova", note: "Cover and Plume Fossils restore sea and sky families.",
        lines: [
            { fossil: "Cover Fossil", pokemon: [{ id: 564, name: "Tirtouga", stage: "Stage 1" }, { id: 565, name: "Carracosta", stage: "Stage 2" }] },
            { fossil: "Plume Fossil", pokemon: [{ id: 566, name: "Archen", stage: "Stage 1" }, { id: 567, name: "Archeops", stage: "Stage 2" }] }
        ]
    },
    {
        label: "Generation VI", region: "Kalos", note: "Jaw and Sail Fossils restore the Kalos dinosaur lines.",
        lines: [
            { fossil: "Jaw Fossil", pokemon: [{ id: 696, name: "Tyrunt", stage: "Stage 1" }, { id: 697, name: "Tyrantrum", stage: "Stage 2" }] },
            { fossil: "Sail Fossil", pokemon: [{ id: 698, name: "Amaura", stage: "Stage 1" }, { id: 699, name: "Aurorus", stage: "Stage 2" }] }
        ]
    },
    {
        label: "Generation VIII", region: "Galar", note: "The games combine fossil halves; the TCG restores each from Rare Fossil as a Stage 1.",
        lines: [
            { fossil: "Rare Fossil", recipe: "Bird + Drake", pokemon: [{ id: 880, name: "Dracozolt", stage: "Stage 1" }] },
            { fossil: "Rare Fossil", recipe: "Bird + Dino", pokemon: [{ id: 881, name: "Arctozolt", stage: "Stage 1" }] },
            { fossil: "Rare Fossil", recipe: "Fish + Drake", pokemon: [{ id: 882, name: "Dracovish", stage: "Stage 1" }] },
            { fossil: "Rare Fossil", recipe: "Fish + Dino", pokemon: [{ id: 883, name: "Arctovish", stage: "Stage 1" }] }
        ]
    }
];

const POKEMON_GENERATION_MARKERS = [
    { maxId: 151, label: "Generation I", region: "Kanto" },
    { maxId: 251, label: "Generation II", region: "Johto" },
    { maxId: 386, label: "Generation III", region: "Hoenn" },
    { maxId: 493, label: "Generation IV", region: "Sinnoh" },
    { maxId: 649, label: "Generation V", region: "Unova" },
    { maxId: 721, label: "Generation VI", region: "Kalos" },
    { maxId: 809, label: "Generation VII", region: "Alola" },
    { maxId: 905, label: "Generation VIII", region: "Galar" },
    { maxId: Number.POSITIVE_INFINITY, label: "Generation IX", region: "Paldea" }
];

function pokemonArtUrl(id) {
    return `${id > 10000 ? POKEMON_FORM_ART_ROOT : POKEMON_ART_ROOT}/${id}.png`;
}

function pokemonNodeMarkup(pokemon, modifier = "") {
    return `<article class="evolution-specimen ${modifier}"><img src="${pokemonArtUrl(pokemon.id)}" alt="${pokemon.name}" /><div><small>${pokemon.stage}</small><h3>${pokemon.name}</h3></div></article>`;
}

function formatPokemonName(identifier) {
    return String(identifier || "").split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : "").join(" ");
}

function parseSimpleCsv(text) {
    const rows = String(text || "").trim().split(/\r?\n/);
    const headers = rows.shift().split(",");
    return rows.map((row) => {
        const values = row.split(",");
        return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
    });
}

async function loadCompleteOneStageLines() {
    try {
        const response = await fetch(POKEMON_SPECIES_CSV_URL, { cache: "force-cache" });
        if (!response.ok) throw new Error(`Species request failed: ${response.status}`);
        const species = parseSimpleCsv(await response.text());
        const speciesById = new Map(species.map((entry) => [Number(entry.id), entry]));
        const childrenByParent = new Map();
        species.forEach((entry) => {
            const parentId = Number(entry.evolves_from_species_id);
            if (!parentId) return;
            if (!childrenByParent.has(parentId)) childrenByParent.set(parentId, []);
            childrenByParent.get(parentId).push(entry);
        });

        const generatedLines = species.flatMap((basic) => {
            const basicId = Number(basic.id);
            const parent = speciesById.get(Number(basic.evolves_from_species_id));
            const isTcgBasicRoot = !parent;
            const children = (childrenByParent.get(basicId) || []).filter((entry) => entry.is_baby !== "1");
            if (basic.is_baby === "1" || !isTcgBasicRoot || children.length !== 1 || FOSSIL_BASIC_IDS.has(basicId) || REGIONAL_ONLY_EVOLUTION_BASIC_IDS.has(basicId)) return [];
            const stage1 = children[0];
            const grandchildren = (childrenByParent.get(Number(stage1.id)) || []).filter((entry) => entry.is_baby !== "1");
            if (grandchildren.length > 0) return [];
            return [{
                generation: Number(basic.generation_id) - 1,
                label: parent?.is_baby === "1" ? `Baby predecessor: ${formatPokemonName(parent.identifier)}` : "Evolution family",
                pokemon: [
                    { id: basicId, name: formatPokemonName(basic.identifier), stage: "Basic" },
                    { id: Number(stage1.id), name: formatPokemonName(stage1.identifier), stage: "Stage 1" }
                ],
                regional: ONE_STAGE_REGIONAL_VARIANTS[basicId] || null
            }];
        });
        const generatedIds = new Set(generatedLines.map((line) => line.pokemon[0].id));
        return generatedLines.concat(GEN1_ONE_STAGE_MAP_EXTRAS.filter((line) => !generatedIds.has(line.pokemon[0].id)));
    } catch {
        return ONE_STAGE_LINES.map((line) => ({ ...line, generation: POKEMON_GENERATION_MARKERS.findIndex((entry) => line.pokemon[0].id <= entry.maxId), regional: ONE_STAGE_REGIONAL_VARIANTS[line.pokemon[0].id] || null }));
    }
}

function initArtwork() {
    document.querySelectorAll("[data-pokemon-id]").forEach((element) => {
        const image = element.querySelector("img");
        const id = element.getAttribute("data-pokemon-id");
        if (image instanceof HTMLImageElement && id) {
            image.src = pokemonArtUrl(id);
        }
    });
}

function initBasicCarousel() {
    const track = document.querySelector("[data-basic-track]");
    const controls = document.querySelector("[data-basic-generation-controls]");
    if (!(track instanceof HTMLElement) || !(controls instanceof HTMLElement)) return;
    let selectedGenerationIndex = 0;
    const formPathIndices = new Map();

    const getGenerationIndex = (pokemon) => Number.isInteger(pokemon.generation)
        ? pokemon.generation
        : POKEMON_GENERATION_MARKERS.findIndex((entry) => pokemon.id <= entry.maxId);
    const cardContent = (entry) => {
        const path = BASIC_ONLY_FORM_PATHS[entry.id];
        const pathIndex = path ? (formPathIndices.get(entry.id) || 0) : 0;
        const display = path ? path[pathIndex] : { ...entry, stage: "Basic" };
        const toggle = path ? `<button class="evolution-regional-toggle" type="button" data-basic-form-path="${entry.id}" aria-label="${display.action}">${display.action}</button>` : "";
        return `<p>${display.group}</p>${toggle}<img src="${pokemonArtUrl(display.id)}" alt="${display.name}" /><h3>${display.name}</h3><small>${display.stage}</small>`;
    };
    const render = () => {
        const generation = POKEMON_GENERATION_MARKERS[selectedGenerationIndex];
        const pokemon = BASIC_ONLY_POKEMON.filter((entry) => getGenerationIndex(entry) === selectedGenerationIndex);
        const cards = pokemon.map((entry) => `<article class="evolution-basic-carousel__item" tabindex="0" data-basic-family="${entry.id}">${cardContent(entry)}</article>`).join("");
        track.innerHTML = `${cards}${cards}`;
        controls.innerHTML = POKEMON_GENERATION_MARKERS.map((entry, index) => `<button type="button" role="tab" aria-selected="${index === selectedGenerationIndex}" data-basic-generation="${index}"><span>${index + 1}</span>${entry.region}<small>${BASIC_ONLY_POKEMON.filter((pokemonEntry) => getGenerationIndex(pokemonEntry) === index).length}</small></button>`).join("");
        track.style.animationDuration = `${Math.max(32, pokemon.length * 4)}s`;
    };

    track.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest("[data-basic-form-path]");
        if (!button) return;
        const familyId = Number(button.getAttribute("data-basic-form-path"));
        const path = BASIC_ONLY_FORM_PATHS[familyId];
        const entry = BASIC_ONLY_POKEMON.find((pokemonEntry) => pokemonEntry.id === familyId);
        if (!path || !entry) return;
        formPathIndices.set(familyId, ((formPathIndices.get(familyId) || 0) + 1) % path.length);
        track.querySelectorAll(`[data-basic-family="${familyId}"]`).forEach((item) => { item.innerHTML = cardContent(entry); });
    });

    controls.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest("[data-basic-generation]");
        if (!button) return;
        selectedGenerationIndex = Number(button.getAttribute("data-basic-generation"));
        render();
    });
    render();
}

async function initOneStageGallery() {
    const gallery = document.querySelector("[data-one-stage-gallery]");
    const grid = gallery?.querySelector("[data-one-stage-grid]");
    const generationControls = gallery?.querySelector("[data-one-stage-generation-controls]");
    if (!(gallery instanceof HTMLElement) || !(grid instanceof HTMLElement) || !(generationControls instanceof HTMLElement)) return;
    const lines = await loadCompleteOneStageLines();
    let stageIndex = 0;
    let generationIndex = 0;
    const regionalSelections = new Set();
    const familyContent = (line) => {
        const basicId = line.pokemon[0].id;
        const useRegional = Boolean(line.regional && regionalSelections.has(basicId));
        const pokemon = useRegional ? (stageIndex === 0 ? line.regional.basic : line.regional.stage1) : line.pokemon[stageIndex];
        const toggle = line.regional ? `<button class="evolution-regional-toggle" type="button" data-regional-family="${basicId}" aria-pressed="${useRegional}" title="Switch regional form">${useRegional ? line.regional.region : "Regional"}</button>` : "";
        return `<p>${line.label}</p>${toggle}${pokemonNodeMarkup(pokemon)}`;
    };
    const render = () => {
        const generationLines = lines.filter((line) => line.generation === generationIndex);
        const itemMarkup = generationLines.map((line) => `<div class="evolution-one-stage__item" tabindex="0" data-one-stage-family="${line.pokemon[0].id}">${familyContent(line)}</div>`).join("");
        grid.innerHTML = `<div class="evolution-one-stage__track">${itemMarkup}${itemMarkup}</div>`;
        generationControls.innerHTML = POKEMON_GENERATION_MARKERS.map((entry, index) => `<button type="button" role="tab" aria-selected="${index === generationIndex}" data-one-stage-generation="${index}"><span>${index + 1}</span>${entry.region}<small>${lines.filter((line) => line.generation === index).length}</small></button>`).join("");
        gallery.querySelectorAll("[data-one-stage-stage]").forEach((button) => button.setAttribute("aria-selected", Number(button.getAttribute("data-one-stage-stage")) === stageIndex ? "true" : "false"));
        const duration = Math.max(32, generationLines.length * 4);
        const track = grid.querySelector(".evolution-one-stage__track");
        if (track instanceof HTMLElement) track.style.animationDuration = `${duration}s`;
    };
    gallery.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const stage = event.target.closest("[data-one-stage-stage]");
        const generation = event.target.closest("[data-one-stage-generation]");
        const regional = event.target.closest("[data-regional-family]");
        if (stage) stageIndex = Number(stage.getAttribute("data-one-stage-stage"));
        if (generation) generationIndex = Number(generation.getAttribute("data-one-stage-generation"));
        if (regional) {
            const familyId = Number(regional.getAttribute("data-regional-family"));
            regionalSelections.has(familyId) ? regionalSelections.delete(familyId) : regionalSelections.add(familyId);
            const line = lines.find((entry) => entry.pokemon[0].id === familyId);
            if (line) {
                grid.querySelectorAll(`[data-one-stage-family="${familyId}"]`).forEach((item) => {
                    item.innerHTML = familyContent(line);
                });
            }
        }
        if (stage || generation) render();
    });
    render();
}

function initStageTool() {
    const tool = document.querySelector("[data-stage-tool]");
    const carousel = tool?.querySelector("[data-stage-carousel]");
    const generationControls = tool?.querySelector("[data-stage-generation-controls]");
    if (!(tool instanceof HTMLElement) || !(carousel instanceof HTMLElement) || !(generationControls instanceof HTMLElement)) return;
    let generationIndex = 0;
    let stageIndex = 0;
    const lines = [...GEN1_THREE_STAGE_LINES, ...THREE_STAGE_LINES.map((line) => ({ ...line, generation: 7 }))];
    const render = () => {
        const generationLines = lines.filter((line) => line.generation === generationIndex);
        carousel.innerHTML = `<div class="evolution-stage-carousel__track">${generationLines.concat(generationLines).map((family) => `<article class="evolution-stage-carousel__family"><p>${family.name}</p>${pokemonNodeMarkup(family.pokemon[stageIndex], "evolution-specimen--large")}</article>`).join("")}</div>`;
        generationControls.innerHTML = POKEMON_GENERATION_MARKERS.map((entry, index) => `<button type="button" role="tab" aria-selected="${index === generationIndex}" data-stage-generation="${index}"><span>${index + 1}</span>${entry.region}<small>${lines.filter((line) => line.generation === index).length}</small></button>`).join("");
        tool.querySelectorAll("[data-stage]").forEach((button) => button.setAttribute("aria-selected", Number(button.getAttribute("data-stage")) === stageIndex ? "true" : "false"));
        const track = carousel.querySelector(".evolution-stage-carousel__track");
        if (track instanceof HTMLElement) track.style.animationDuration = `${Math.max(40, generationLines.length * 4)}s`;
    };
    tool.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const stage = event.target.closest("[data-stage]");
        const generation = event.target.closest("[data-stage-generation]");
        if (stage) stageIndex = Number(stage.getAttribute("data-stage"));
        if (generation) { generationIndex = Number(generation.getAttribute("data-stage-generation")); stageIndex = 0; }
        if (stage || generation) render();
    });
    render();
}

function initFossilTool() {
    const tool = document.querySelector("[data-fossil-tool]");
    const controls = tool?.querySelector("[data-fossil-controls]");
    const lines = tool?.querySelector("[data-fossil-lines]");
    if (!(tool instanceof HTMLElement) || !(controls instanceof HTMLElement) || !(lines instanceof HTMLElement)) return;
    let selectedIndex = 0;
    const render = () => {
        const generation = FOSSIL_GENERATIONS[selectedIndex];
        controls.innerHTML = FOSSIL_GENERATIONS.map((entry, index) => `<button type="button" role="tab" aria-selected="${index === selectedIndex}" data-fossil-generation="${index}"><span>${entry.label.replace("Generation ", "")}</span>${entry.region}</button>`).join("");
        lines.innerHTML = `<p class="fossil-lines__note">${generation.note}</p><div class="fossil-lines__grid">${generation.lines.map((line) => `<article class="fossil-line"><div class="fossil-item"><span aria-hidden="true"></span><small>Item / Basic slot</small><strong>${line.fossil}</strong>${line.recipe ? `<em>${line.recipe}</em>` : ""}</div>${line.pokemon.map((pokemon) => `<span class="fossil-line__arrow" aria-hidden="true">&#8594;</span>${pokemonNodeMarkup(pokemon, "evolution-specimen--fossil")}`).join("")}</article>`).join("")}</div>`;
    };
    controls.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest("[data-fossil-generation]");
        if (!button) return;
        selectedIndex = Number(button.getAttribute("data-fossil-generation"));
        render();
    });
    render();
}

function initBabyTool() {
    const tool = document.querySelector("[data-baby-tool]");
    const controls = tool?.querySelector("[data-baby-controls]");
    const families = tool?.querySelector("[data-baby-families]");
    if (!(tool instanceof HTMLElement) || !(controls instanceof HTMLElement) || !(families instanceof HTMLElement)) return;
    const generations = [...new Set(BABY_POKEMON_FAMILIES.map((family) => family.generation))];
    let selectedGeneration = generations[0];
    const renderPath = (path) => path.map((pokemon) => `<span class="baby-path__arrow" aria-hidden="true">&#8594;</span>${pokemonNodeMarkup(pokemon, "evolution-specimen--baby")}`).join("");
    const render = () => {
        controls.innerHTML = generations.map((generation) => { const marker = POKEMON_GENERATION_MARKERS[generation]; return `<button type="button" role="tab" aria-selected="${generation === selectedGeneration}" data-baby-generation="${generation}"><span>${generation + 1}</span>${marker.region}<small>${BABY_POKEMON_FAMILIES.filter((family) => family.generation === generation).length}</small></button>`; }).join("");
        families.innerHTML = BABY_POKEMON_FAMILIES.filter((family) => family.generation === selectedGeneration).map((family) => `<article class="baby-family"><div class="baby-family__origin">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div><div class="baby-family__paths">${family.paths.map((path) => `<div class="baby-path">${renderPath(path)}</div>`).join("")}</div></article>`).join("");
    };
    controls.addEventListener("click", (event) => { if (!(event.target instanceof Element)) return; const button = event.target.closest("[data-baby-generation]"); if (!button) return; selectedGeneration = Number(button.getAttribute("data-baby-generation")); render(); });
    render();
}

function initEeveeLab() {
    const lab = document.querySelector(".eevee-lab");
    lab?.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest("[data-eeveelution]");
        if (!(button instanceof HTMLButtonElement)) return;
        lab.querySelectorAll("[data-eeveelution]").forEach((entry) => entry.classList.toggle("is-selected", entry === button));
        lab.setAttribute("data-selected-eeveelution", button.dataset.eeveelution || "");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initArtwork();
    initBasicCarousel();
    initOneStageGallery();
    initStageTool();
    initFossilTool();
    initBabyTool();
    initEeveeLab();
});