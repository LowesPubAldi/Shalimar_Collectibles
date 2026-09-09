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
const GEN2_BASIC_MAP_IDS = new Set([185, 190, 193, 198, 200, 201, 202, 203, 206, 207, 211, 213, 214, 215, 222, 225, 226, 227, 234, 235, 241, 243, 244, 245, 249, 250, 251]);
const GEN2_ONE_STAGE_MAP_IDS = new Set([161, 163, 165, 167, 170, 177, 183, 191, 194, 204, 209, 216, 218, 220, 223, 228, 231]);
const GEN2_THREE_STAGE_MAP_IDS = new Set([152, 155, 158, 175, 179, 187, 246]);
const GEN3_BASIC_MAP_IDS = new Set([299, 302, 303, 311, 312, 313, 314, 324, 327, 335, 336, 337, 338, 352, 357, 358, 359, 369, 370, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386]);
const GEN3_ONE_STAGE_MAP_IDS = new Set([261, 263, 276, 283, 285, 296, 300, 307, 309, 316, 318, 320, 322, 339, 341, 343, 345, 347, 353, 355, 361, 366]);
const GEN3_THREE_STAGE_MAP_IDS = new Set([252, 255, 258, 265, 270, 273, 280, 287, 293, 298, 363, 371, 374]);
const GEN4_BASIC_MAP_IDS = new Set([417, 441, 442, 455, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493]);
const GEN4_ONE_STAGE_MAP_IDS = new Set([399, 401, 418, 420, 422, 425, 427, 431, 433, 434, 436, 447, 449, 451, 453, 456, 459, 412, 415]);
const GEN4_THREE_STAGE_MAP_IDS = new Set([387, 390, 393, 396, 403, 406, 443]);
const GEN5_BASIC_MAP_IDS = new Set([494, 531, 538, 539, 550, 556, 561, 587, 594, 615, 618, 621, 626, 631, 632, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649]);
const GEN5_ONE_STAGE_MAP_IDS = new Set([504, 509, 511, 513, 515, 517, 522, 527, 529, 546, 548, 554, 557, 559, 562, 568, 570, 572, 580, 585, 588, 590, 592, 595, 597, 605, 613, 616, 619, 622, 624, 627, 629, 636]);
const GEN5_THREE_STAGE_MAP_IDS = new Set([495, 498, 501, 506, 519, 524, 532, 535, 540, 543, 551, 574, 577, 582, 599, 602, 607, 610, 633]);
const GEN6_BASIC_MAP_IDS = new Set([676, 701, 702, 703, 707, 716, 717, 718, 719, 720, 721]);
const GEN6_ONE_STAGE_MAP_IDS = new Set([659, 667, 672, 674, 677, 682, 684, 686, 688, 690, 692, 694, 708, 710, 712, 714]);
const GEN6_THREE_STAGE_MAP_IDS = new Set([650, 653, 656, 661, 664, 669, 679, 704]);
const GEN7_BASIC_MAP_IDS = new Set([741, 746, 764, 765, 766, 771, 774, 775, 776, 777, 778, 779, 780, 781, 785, 786, 787, 788, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 805, 806, 807]);
const GEN7_ONE_STAGE_MAP_IDS = new Set([734, 739, 742, 744, 747, 749, 751, 753, 755, 757, 759, 767, 769, 772, 803, 808]);
const GEN7_THREE_STAGE_MAP_IDS = new Set([722, 725, 728, 731, 736, 761, 782, 789]);
const GEN8_BASIC_MAP_IDS = new Set([845, 870, 871, 874, 875, 876, 877, 884, 888, 889, 890, 893, 894, 895, 896, 897, 898]);
const GEN8_ONE_STAGE_MAP_IDS = new Set([819, 827, 829, 831, 833, 835, 840, 843, 846, 848, 850, 852, 854, 868, 872, 878, 891]);
const GEN8_THREE_STAGE_MAP_IDS = new Set([810, 813, 816, 821, 824, 837, 856, 859, 885]);
const GEN9_BASIC_MAP_IDS = new Set([931, 950, 962, 967, 968, 973, 976, 977, 978, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1014, 1015, 1016, 1017, 1020, 1021, 1022, 1023, 1024, 1025]);
const GEN9_ONE_STAGE_MAP_IDS = new Set([915, 917, 919, 924, 926, 935, 938, 940, 942, 944, 946, 948, 951, 953, 955, 960, 963, 965, 969, 971, 974, 999, 1011]);
const GEN9_THREE_STAGE_MAP_IDS = new Set([906, 909, 912, 921, 928, 932, 957, 996]);
const GEN2_ONE_STAGE_MAP_EXTRAS = [
    { generation: 1, label: "Evolution family (H)", pokemon: [{ id: 183, name: "Marill", stage: "Basic" }, { id: 184, name: "Azumarill", stage: "Stage 1" }] },
    { generation: 1, label: "Evolution family (R)", pokemon: [{ id: 194, name: "Wooper", stage: "Basic" }, { id: 195, name: "Quagsire", stage: "Stage 1" }] },
    { generation: 1, label: "Evolution family", pokemon: [{ id: 216, name: "Teddiursa", stage: "Basic" }, { id: 217, name: "Ursaring", stage: "Stage 1" }] },
    { generation: 1, label: "Evolution family", pokemon: [{ id: 220, name: "Swinub", stage: "Basic" }, { id: 221, name: "Piloswine", stage: "Stage 1" }] }
];
const GEN2_THREE_STAGE_LINES = [
    { name: "Chikorita family", generation: 1, pokemon: [{ id: 152, name: "Chikorita", stage: "Basic" }, { id: 153, name: "Bayleef", stage: "Stage 1" }, { id: 154, name: "Meganium", stage: "Stage 2" }] },
    { name: "Cyndaquil family", generation: 1, pokemon: [{ id: 155, name: "Cyndaquil", stage: "Basic" }, { id: 156, name: "Quilava", stage: "Stage 1" }, { id: 157, name: "Typhlosion", stage: "Stage 2" }] },
    { name: "Totodile family", generation: 1, pokemon: [{ id: 158, name: "Totodile", stage: "Basic" }, { id: 159, name: "Croconaw", stage: "Stage 1" }, { id: 160, name: "Feraligatr", stage: "Stage 2" }] },
    { name: "Togepi family", generation: 1, pokemon: [{ id: 175, name: "Togepi", stage: "Basic" }, { id: 176, name: "Togetic", stage: "Stage 1" }, { id: 468, name: "Togekiss", stage: "Stage 2" }] },
    { name: "Mareep family", generation: 1, pokemon: [{ id: 179, name: "Mareep", stage: "Basic" }, { id: 180, name: "Flaaffy", stage: "Stage 1" }, { id: 181, name: "Ampharos", stage: "Stage 2" }] },
    { name: "Hoppip family", generation: 1, pokemon: [{ id: 187, name: "Hoppip", stage: "Basic" }, { id: 188, name: "Skiploom", stage: "Stage 1" }, { id: 189, name: "Jumpluff", stage: "Stage 2" }] },
    { name: "Larvitar family", generation: 1, pokemon: [{ id: 246, name: "Larvitar", stage: "Basic" }, { id: 247, name: "Pupitar", stage: "Stage 1" }, { id: 248, name: "Tyranitar", stage: "Stage 2" }] }
];
const GEN3_THREE_STAGE_LINES = [
    { name: "Wurmple family", generation: 2, pokemon: [{ id: 265, name: "Wurmple", stage: "Basic" }, { id: 266, name: "Silcoon", stage: "Stage 1" }, { id: 267, name: "Beautifly", stage: "Stage 2" }] },
    { name: "Ralts family", generation: 2, pokemon: [{ id: 280, name: "Ralts", stage: "Basic" }, { id: 281, name: "Kirlia", stage: "Stage 1" }, { id: 282, name: "Gardevoir", stage: "Stage 2" }] },
    { name: "Lotad family", generation: 2, pokemon: [{ id: 270, name: "Lotad", stage: "Basic" }, { id: 271, name: "Lombre", stage: "Stage 1" }, { id: 272, name: "Ludicolo", stage: "Stage 2" }] },
    { name: "Seedot family", generation: 2, pokemon: [{ id: 273, name: "Seedot", stage: "Basic" }, { id: 274, name: "Nuzleaf", stage: "Stage 1" }, { id: 275, name: "Shiftry", stage: "Stage 2" }] },
    { name: "Slakoth family", generation: 2, pokemon: [{ id: 287, name: "Slakoth", stage: "Basic" }, { id: 288, name: "Vigoroth", stage: "Stage 1" }, { id: 289, name: "Slaking", stage: "Stage 2" }] },
    { name: "Whismur family", generation: 2, pokemon: [{ id: 293, name: "Whismur", stage: "Basic" }, { id: 294, name: "Loudred", stage: "Stage 1" }, { id: 295, name: "Exploud", stage: "Stage 2" }] },
    { name: "Spheal family", generation: 2, pokemon: [{ id: 363, name: "Spheal", stage: "Basic" }, { id: 364, name: "Sealeo", stage: "Stage 1" }, { id: 365, name: "Walrein", stage: "Stage 2" }] },
    { name: "Beldum family", generation: 2, pokemon: [{ id: 374, name: "Beldum", stage: "Basic" }, { id: 375, name: "Metang", stage: "Stage 1" }, { id: 376, name: "Metagross", stage: "Stage 2" }] }
];
const GEN4_ONE_STAGE_MAP_EXTRAS = [
    { generation: 3, label: "Evolution family (B)", pokemon: [{ id: 412, name: "Burmy", stage: "Basic" }, { id: 413, name: "Wormadam", stage: "Stage 1" }] },
    { generation: 3, label: "Evolution family (B)", pokemon: [{ id: 412, name: "Burmy", stage: "Basic" }, { id: 414, name: "Mothim", stage: "Stage 1" }] },
    { generation: 3, label: "Baby predecessor (H)", pokemon: [{ id: 433, name: "Chingling", stage: "Basic" }, { id: 358, name: "Chimecho", stage: "Stage 1" }] },
    { generation: 3, label: "Baby predecessor (T)", pokemon: [{ id: 447, name: "Riolu", stage: "Basic" }, { id: 448, name: "Lucario", stage: "Stage 1" }] }
];
const GEN4_THREE_STAGE_LINES = [
    { name: "Turtwig family (T)", generation: 3, pokemon: [{ id: 387, name: "Turtwig", stage: "Basic" }, { id: 388, name: "Grotle", stage: "Stage 1" }, { id: 389, name: "Torterra", stage: "Stage 2" }] },
    { name: "Chimchar family (T)", generation: 3, pokemon: [{ id: 390, name: "Chimchar", stage: "Basic" }, { id: 391, name: "Monferno", stage: "Stage 1" }, { id: 392, name: "Infernape", stage: "Stage 2" }] },
    { name: "Piplup family (T)", generation: 3, pokemon: [{ id: 393, name: "Piplup", stage: "Basic" }, { id: 394, name: "Prinplup", stage: "Stage 1" }, { id: 395, name: "Empoleon", stage: "Stage 2" }] },
    { name: "Starly family (V2)", generation: 3, pokemon: [{ id: 396, name: "Starly", stage: "Basic" }, { id: 397, name: "Staravia", stage: "Stage 1" }, { id: 398, name: "Staraptor", stage: "Stage 2" }] },
    { name: "Shinx family", generation: 3, pokemon: [{ id: 403, name: "Shinx", stage: "Basic" }, { id: 404, name: "Luxio", stage: "Stage 1" }, { id: 405, name: "Luxray", stage: "Stage 2" }] },
    { name: "Budew family", generation: 3, pokemon: [{ id: 406, name: "Budew", stage: "Basic" }, { id: 315, name: "Roselia", stage: "Stage 1" }, { id: 407, name: "Roserade", stage: "Stage 2" }] },
    { name: "Gible family (V2x2)", generation: 3, pokemon: [{ id: 443, name: "Gible", stage: "Basic" }, { id: 444, name: "Gabite", stage: "Stage 1" }, { id: 445, name: "Garchomp", stage: "Stage 2" }] }
];
const GEN5_ONE_STAGE_MAP_EXTRAS = [
    { generation: 4, label: "Evolution method (E)", pokemon: [{ id: 588, name: "Karrablast", stage: "Basic" }, { id: 589, name: "Escavalier", stage: "Stage 1" }] },
    { generation: 4, label: "Evolution method (E)", pokemon: [{ id: 616, name: "Shelmet", stage: "Basic" }, { id: 617, name: "Accelgor", stage: "Stage 1" }] },
    { generation: 4, label: "Regional (R)", pokemon: [{ id: 562, name: "Yamask", stage: "Basic" }, { id: 563, name: "Cofagrigus", stage: "Stage 1" }] },
    { generation: 4, label: "Evolution family", pokemon: [{ id: 624, name: "Pawniard", stage: "Basic" }, { id: 625, name: "Bisharp", stage: "Stage 1" }] }
];
const GEN5_THREE_STAGE_LINES = [
    { name: "Snivy family", generation: 4, pokemon: [{ id: 495, name: "Snivy", stage: "Basic" }, { id: 496, name: "Servine", stage: "Stage 1" }, { id: 497, name: "Serperior", stage: "Stage 2" }] },
    { name: "Tepig family (T)(V2)", generation: 4, pokemon: [{ id: 498, name: "Tepig", stage: "Basic" }, { id: 499, name: "Pignite", stage: "Stage 1" }, { id: 500, name: "Emboar", stage: "Stage 2" }] },
    { name: "Oshawott family (R)", generation: 4, pokemon: [{ id: 501, name: "Oshawott", stage: "Basic" }, { id: 502, name: "Dewott", stage: "Stage 1" }, { id: 503, name: "Samurott", stage: "Stage 2" }] },
    { name: "Lillipup family", generation: 4, pokemon: [{ id: 506, name: "Lillipup", stage: "Basic" }, { id: 507, name: "Herdier", stage: "Stage 1" }, { id: 508, name: "Stoutland", stage: "Stage 2" }] },
    { name: "Pidove family", generation: 4, pokemon: [{ id: 519, name: "Pidove", stage: "Basic" }, { id: 520, name: "Tranquill", stage: "Stage 1" }, { id: 521, name: "Unfezant", stage: "Stage 2" }] },
    { name: "Roggenrola family", generation: 4, pokemon: [{ id: 524, name: "Roggenrola", stage: "Basic" }, { id: 525, name: "Boldore", stage: "Stage 1" }, { id: 526, name: "Gigalith", stage: "Stage 2" }] },
    { name: "Timburr family", generation: 4, pokemon: [{ id: 532, name: "Timburr", stage: "Basic" }, { id: 533, name: "Gurdurr", stage: "Stage 1" }, { id: 534, name: "Conkeldurr", stage: "Stage 2" }] },
    { name: "Tympole family", generation: 4, pokemon: [{ id: 535, name: "Tympole", stage: "Basic" }, { id: 536, name: "Palpitoad", stage: "Stage 1" }, { id: 537, name: "Seismitoad", stage: "Stage 2" }] },
    { name: "Sewaddle family", generation: 4, pokemon: [{ id: 540, name: "Sewaddle", stage: "Basic" }, { id: 541, name: "Swadloon", stage: "Stage 1" }, { id: 542, name: "Leavanny", stage: "Stage 2" }] },
    { name: "Venipede family (V2)", generation: 4, pokemon: [{ id: 543, name: "Venipede", stage: "Basic" }, { id: 544, name: "Whirlipede", stage: "Stage 1" }, { id: 545, name: "Scolipede", stage: "Stage 2" }] },
    { name: "Sandile family", generation: 4, pokemon: [{ id: 551, name: "Sandile", stage: "Basic" }, { id: 552, name: "Krokorok", stage: "Stage 1" }, { id: 553, name: "Krookodile", stage: "Stage 2" }] },
    { name: "Gothita family (V2)", generation: 4, pokemon: [{ id: 574, name: "Gothita", stage: "Basic" }, { id: 575, name: "Gothorita", stage: "Stage 1" }, { id: 576, name: "Gothitelle", stage: "Stage 2" }] },
    { name: "Solosis family", generation: 4, pokemon: [{ id: 577, name: "Solosis", stage: "Basic" }, { id: 578, name: "Duosion", stage: "Stage 1" }, { id: 579, name: "Reuniclus", stage: "Stage 2" }] },
    { name: "Vanillite family", generation: 4, pokemon: [{ id: 582, name: "Vanillite", stage: "Basic" }, { id: 583, name: "Vanillish", stage: "Stage 1" }, { id: 584, name: "Vanilluxe", stage: "Stage 2" }] },
    { name: "Klink family", generation: 4, pokemon: [{ id: 599, name: "Klink", stage: "Basic" }, { id: 600, name: "Klang", stage: "Stage 1" }, { id: 601, name: "Klinklang", stage: "Stage 2" }] },
    { name: "Tynamo family (V2)", generation: 4, pokemon: [{ id: 602, name: "Tynamo", stage: "Basic" }, { id: 603, name: "Eelektrik", stage: "Stage 1" }, { id: 604, name: "Eelektross", stage: "Stage 2" }] },
    { name: "Litwick family (V2)", generation: 4, pokemon: [{ id: 607, name: "Litwick", stage: "Basic" }, { id: 608, name: "Lampent", stage: "Stage 1" }, { id: 609, name: "Chandelure", stage: "Stage 2" }] },
    { name: "Axew family", generation: 4, pokemon: [{ id: 610, name: "Axew", stage: "Basic" }, { id: 611, name: "Fraxure", stage: "Stage 1" }, { id: 612, name: "Haxorus", stage: "Stage 2" }] },
    { name: "Deino family", generation: 4, pokemon: [{ id: 633, name: "Deino", stage: "Basic" }, { id: 634, name: "Zweilous", stage: "Stage 1" }, { id: 635, name: "Hydreigon", stage: "Stage 2" }] }
];
const GEN6_THREE_STAGE_LINES = [
    { name: "Chespin family (T)(V2)", generation: 5, pokemon: [{ id: 650, name: "Chespin", stage: "Basic" }, { id: 651, name: "Quilladin", stage: "Stage 1" }, { id: 652, name: "Chesnaught", stage: "Stage 2" }] },
    { name: "Fennekin family (T)(V2)", generation: 5, pokemon: [{ id: 653, name: "Fennekin", stage: "Basic" }, { id: 654, name: "Braixen", stage: "Stage 1" }, { id: 655, name: "Delphox", stage: "Stage 2" }] },
    { name: "Froakie family (T)(V2)", generation: 5, pokemon: [{ id: 656, name: "Froakie", stage: "Basic" }, { id: 657, name: "Frogadier", stage: "Stage 1" }, { id: 658, name: "Greninja", stage: "Stage 2" }] },
    { name: "Fletchling family (T)", generation: 5, pokemon: [{ id: 661, name: "Fletchling", stage: "Basic" }, { id: 662, name: "Fletchinder", stage: "Stage 1" }, { id: 663, name: "Talonflame", stage: "Stage 2" }] },
    { name: "Scatterbug family (T)(FC)", generation: 5, pokemon: [{ id: 664, name: "Scatterbug", stage: "Basic" }, { id: 665, name: "Spewpa", stage: "Stage 1" }, { id: 666, name: "Vivillon", stage: "Stage 2" }] },
    { name: "Flabebe family (V2x2)", generation: 5, pokemon: [{ id: 669, name: "Flabebe", stage: "Basic" }, { id: 670, name: "Floette", stage: "Stage 1" }, { id: 671, name: "Florges", stage: "Stage 2" }] },
    { name: "Honedge family (V2)", generation: 5, pokemon: [{ id: 679, name: "Honedge", stage: "Basic" }, { id: 680, name: "Doublade", stage: "Stage 1" }, { id: 681, name: "Aegislash", stage: "Stage 2" }] },
    { name: "Goomy family (R)", generation: 5, pokemon: [{ id: 704, name: "Goomy", stage: "Basic" }, { id: 705, name: "Sliggoo", stage: "Stage 1" }, { id: 706, name: "Goodra", stage: "Stage 2" }] }
];
const GEN7_ONE_STAGE_MAP_EXTRAS = [
    { generation: 6, label: "Form change (FC)", pokemon: [{ id: 744, name: "Rockruff", stage: "Basic" }, { id: 745, name: "Lycanroc", stage: "Stage 1" }] }
];
const GEN7_THREE_STAGE_LINES = [
    { name: "Rowlet family (R)(T)", generation: 6, pokemon: [{ id: 722, name: "Rowlet", stage: "Basic" }, { id: 723, name: "Dartrix", stage: "Stage 1" }, { id: 724, name: "Decidueye", stage: "Stage 2" }] },
    { name: "Litten family (T)(V2)", generation: 6, pokemon: [{ id: 725, name: "Litten", stage: "Basic" }, { id: 726, name: "Torracat", stage: "Stage 1" }, { id: 727, name: "Incineroar", stage: "Stage 2" }] },
    { name: "Popplio family (T)", generation: 6, pokemon: [{ id: 728, name: "Popplio", stage: "Basic" }, { id: 729, name: "Brionne", stage: "Stage 1" }, { id: 730, name: "Primarina", stage: "Stage 2" }] },
    { name: "Pikipek family", generation: 6, pokemon: [{ id: 731, name: "Pikipek", stage: "Basic" }, { id: 732, name: "Trumbeak", stage: "Stage 1" }, { id: 733, name: "Toucannon", stage: "Stage 2" }] },
    { name: "Grubbin family (T)(V2)", generation: 6, pokemon: [{ id: 736, name: "Grubbin", stage: "Basic" }, { id: 737, name: "Charjabug", stage: "Stage 1" }, { id: 738, name: "Vikavolt", stage: "Stage 2" }] },
    { name: "Bounsweet family", generation: 6, pokemon: [{ id: 761, name: "Bounsweet", stage: "Basic" }, { id: 762, name: "Steenee", stage: "Stage 1" }, { id: 763, name: "Tsareena", stage: "Stage 2" }] },
    { name: "Jangmo-o family (T)", generation: 6, pokemon: [{ id: 782, name: "Jangmo-o", stage: "Basic" }, { id: 783, name: "Hakamo-o", stage: "Stage 1" }, { id: 784, name: "Kommo-o", stage: "Stage 2" }] },
    { name: "Cosmog family (B)", generation: 6, pokemon: [{ id: 789, name: "Cosmog", stage: "Basic" }, { id: 790, name: "Cosmoem", stage: "Stage 1" }, { id: 791, name: "Solgaleo", stage: "Stage 2" }] },
    { name: "Cosmog family (B)", generation: 6, pokemon: [{ id: 789, name: "Cosmog", stage: "Basic" }, { id: 790, name: "Cosmoem", stage: "Stage 1" }, { id: 792, name: "Lunala", stage: "Stage 2" }] }
];
const GEN8_ONE_STAGE_MAP_EXTRAS = [
    { generation: 7, label: "Evolution family (B)", pokemon: [{ id: 840, name: "Applin", stage: "Basic" }, { id: 841, name: "Flapple", stage: "Stage 1" }] },
    { generation: 7, label: "Evolution family (B)", pokemon: [{ id: 840, name: "Applin", stage: "Basic" }, { id: 842, name: "Appletun", stage: "Stage 1" }] },
    { generation: 7, label: "Evolution family (B)", pokemon: [{ id: 848, name: "Toxel", stage: "Basic" }, { id: 849, name: "Toxtricity (Amped)", stage: "Stage 1" }] },
    { generation: 7, label: "Evolution family (B)", pokemon: [{ id: 848, name: "Toxel", stage: "Basic" }, { id: 10184, name: "Toxtricity (Low Key)", stage: "Stage 1" }] },
    { generation: 7, label: "Evolutionary Lab (E)", pokemon: [{ id: 868, name: "Milcery", stage: "Basic" }, { id: 869, name: "Alcremie", stage: "Stage 1" }] },
    { generation: 7, label: "Evolution family (B)", pokemon: [{ id: 891, name: "Kubfu", stage: "Basic" }, { id: 892, name: "Urshifu", stage: "Stage 1" }] }
];
const GEN8_THREE_STAGE_LINES = [
    { name: "Grookey family (V2)", generation: 7, pokemon: [{ id: 810, name: "Grookey", stage: "Basic" }, { id: 811, name: "Thwackey", stage: "Stage 1" }, { id: 812, name: "Rillaboom", stage: "Stage 2" }] },
    { name: "Scorbunny family (V2)", generation: 7, pokemon: [{ id: 813, name: "Scorbunny", stage: "Basic" }, { id: 814, name: "Raboot", stage: "Stage 1" }, { id: 815, name: "Cinderace", stage: "Stage 2" }] },
    { name: "Sobble family (V2)", generation: 7, pokemon: [{ id: 816, name: "Sobble", stage: "Basic" }, { id: 817, name: "Drizzile", stage: "Stage 1" }, { id: 818, name: "Inteleon", stage: "Stage 2" }] },
    { name: "Rookidee family (V2)", generation: 7, pokemon: [{ id: 821, name: "Rookidee", stage: "Basic" }, { id: 822, name: "Corvisquire", stage: "Stage 1" }, { id: 823, name: "Corviknight", stage: "Stage 2" }] },
    { name: "Blipbug family (T)(V2)", generation: 7, pokemon: [{ id: 824, name: "Blipbug", stage: "Basic" }, { id: 825, name: "Dottler", stage: "Stage 1" }, { id: 826, name: "Orbeetle", stage: "Stage 2" }] },
    { name: "Rolycoly family (T)(V2)", generation: 7, pokemon: [{ id: 837, name: "Rolycoly", stage: "Basic" }, { id: 838, name: "Carkol", stage: "Stage 1" }, { id: 839, name: "Coalossal", stage: "Stage 2" }] },
    { name: "Hatenna family (T)(V2)", generation: 7, pokemon: [{ id: 856, name: "Hatenna", stage: "Basic" }, { id: 857, name: "Hattrem", stage: "Stage 1" }, { id: 858, name: "Hatterene", stage: "Stage 2" }] },
    { name: "Impidimp family (V2)", generation: 7, pokemon: [{ id: 859, name: "Impidimp", stage: "Basic" }, { id: 860, name: "Morgrem", stage: "Stage 1" }, { id: 861, name: "Grimmsnarl", stage: "Stage 2" }] },
    { name: "Dreepy family", generation: 7, pokemon: [{ id: 885, name: "Dreepy", stage: "Basic" }, { id: 886, name: "Drakloak", stage: "Stage 1" }, { id: 887, name: "Dragapult", stage: "Stage 2" }] }
];
const GEN9_ONE_STAGE_MAP_EXTRAS = [
    { generation: 8, label: "Evolution family (B)", pokemon: [{ id: 915, name: "Lechonk", stage: "Basic" }, { id: 916, name: "Oinkologne (Female)", stage: "Stage 1" }] },
    { generation: 8, label: "Evolution family (B)", pokemon: [{ id: 915, name: "Lechonk", stage: "Basic" }, { id: 916, name: "Oinkologne (Male)", stage: "Stage 1" }] },
    { generation: 8, label: "Form Change (FC)", pokemon: [{ id: 924, name: "Tandemaus", stage: "Basic" }, { id: 925, name: "Maushold", stage: "Stage 1" }] },
    { generation: 8, label: "Evolution family (B)(T)", pokemon: [{ id: 935, name: "Charcadet", stage: "Basic" }, { id: 936, name: "Armarouge", stage: "Stage 1" }] },
    { generation: 8, label: "Evolution family (B)(T)", pokemon: [{ id: 935, name: "Charcadet", stage: "Basic" }, { id: 937, name: "Ceruledge", stage: "Stage 1" }] },
    { generation: 8, label: "Evolution method (E)(V2)", pokemon: [{ id: 963, name: "Finizen", stage: "Basic" }, { id: 964, name: "Palafin", stage: "Stage 1" }] },
    { generation: 8, label: "Evolution method (E)", pokemon: [{ id: 999, name: "Gimmighoul", stage: "Basic" }, { id: 1000, name: "Gholdengo", stage: "Stage 1" }] },
    { generation: 8, label: "Evolution family", pokemon: [{ id: 940, name: "Wattrel", stage: "Basic" }, { id: 941, name: "Kilowattrel", stage: "Stage 1" }] },
    { generation: 8, label: "Evolution family", pokemon: [{ id: 1011, name: "Poltchageist", stage: "Basic" }, { id: 1012, name: "Sinistcha", stage: "Stage 1" }] }
];
const GEN9_THREE_STAGE_LINES = [
    { name: "Sprigatito family (T)", generation: 8, pokemon: [{ id: 906, name: "Sprigatito", stage: "Basic" }, { id: 907, name: "Floragato", stage: "Stage 1" }, { id: 908, name: "Meowscarada", stage: "Stage 2" }] },
    { name: "Fuecoco family (T)", generation: 8, pokemon: [{ id: 909, name: "Fuecoco", stage: "Basic" }, { id: 910, name: "Crocalor", stage: "Stage 1" }, { id: 911, name: "Skeledirge", stage: "Stage 2" }] },
    { name: "Quaxly family (T)", generation: 8, pokemon: [{ id: 912, name: "Quaxly", stage: "Basic" }, { id: 913, name: "Quaxwell", stage: "Stage 1" }, { id: 914, name: "Quaquaval", stage: "Stage 2" }] },
    { name: "Pawmi family (T)", generation: 8, pokemon: [{ id: 921, name: "Pawmi", stage: "Basic" }, { id: 922, name: "Pawmo", stage: "Stage 1" }, { id: 923, name: "Pawmot", stage: "Stage 2" }] },
    { name: "Smoliv family (V2)", generation: 8, pokemon: [{ id: 928, name: "Smoliv", stage: "Basic" }, { id: 929, name: "Dolliv", stage: "Stage 1" }, { id: 930, name: "Arboliva", stage: "Stage 2" }] },
    { name: "Nacli family (V2)", generation: 8, pokemon: [{ id: 932, name: "Nacli", stage: "Basic" }, { id: 933, name: "Naclstack", stage: "Stage 1" }, { id: 934, name: "Garganacl", stage: "Stage 2" }] },
    { name: "Tinkatink family", generation: 8, pokemon: [{ id: 957, name: "Tinkatink", stage: "Basic" }, { id: 958, name: "Tinkatuff", stage: "Stage 1" }, { id: 959, name: "Tinkaton", stage: "Stage 2" }] },
    { name: "Frigibax family (V2)", generation: 8, pokemon: [{ id: 996, name: "Frigibax", stage: "Basic" }, { id: 997, name: "Arctibax", stage: "Stage 1" }, { id: 998, name: "Baxcalibur", stage: "Stage 2" }] }
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
    { id: 299, name: "Nosepass", group: "Standalone • H" }, { id: 302, name: "Sableye", group: "Standalone" }, { id: 303, name: "Mawile", group: "Standalone" },
    { id: 311, name: "Plusle", group: "Standalone" }, { id: 312, name: "Minun", group: "Standalone" }, { id: 313, name: "Volbeat", group: "Standalone" }, { id: 314, name: "Illumise", group: "Standalone" },
    { id: 324, name: "Torkoal", group: "Standalone" }, { id: 327, name: "Spinda", group: "Standalone" }, { id: 335, name: "Zangoose", group: "Standalone" },
    { id: 336, name: "Seviper", group: "Standalone" }, { id: 351, name: "Castform", group: "Standalone" },
    { id: 337, name: "Lunatone", group: "Standalone" }, { id: 338, name: "Solrock", group: "Standalone" }, { id: 357, name: "Tropius", group: "Standalone" }, { id: 358, name: "Chimecho", group: "Standalone" }, { id: 359, name: "Absol", group: "Standalone" },
    { id: 369, name: "Relicanth", group: "Standalone" }, { id: 370, name: "Luvdisc", group: "Standalone" }, { id: 377, name: "Regirock", group: "Legendary" },
    { id: 378, name: "Regice", group: "Legendary" }, { id: 379, name: "Registeel", group: "Legendary" },
    { id: 380, name: "Latias", group: "Legendary" }, { id: 381, name: "Latios", group: "Legendary" },
    { id: 382, name: "Kyogre", group: "Legendary" }, { id: 383, name: "Groudon", group: "Legendary" },
    { id: 384, name: "Rayquaza", group: "Legendary" }, { id: 385, name: "Jirachi", group: "Mythical" },
    { id: 386, name: "Deoxys", group: "Mythical" }, { id: 417, name: "Pachirisu", group: "Standalone" }, { id: 455, name: "Carnivine", group: "Standalone" },
    { id: 441, name: "Chatot", group: "Standalone" }, { id: 442, name: "Spiritomb", group: "Standalone" },
    { id: 479, name: "Rotom", group: "Standalone" }, { id: 480, name: "Uxie", group: "Legendary" },
    { id: 481, name: "Mesprit", group: "Legendary" }, { id: 482, name: "Azelf", group: "Legendary" },
    { id: 483, name: "Dialga", group: "Legendary" }, { id: 484, name: "Palkia", group: "Legendary" },
    { id: 485, name: "Heatran", group: "Legendary" }, { id: 486, name: "Regigigas", group: "Legendary" },
    { id: 487, name: "Giratina", group: "Legendary" }, { id: 488, name: "Cresselia", group: "Legendary" },
    { id: 489, name: "Phione", group: "Mythical" }, { id: 490, name: "Manaphy", group: "Mythical" },
    { id: 491, name: "Darkrai", group: "Mythical" }, { id: 492, name: "Shaymin", group: "Mythical" },
    { id: 493, name: "Arceus", group: "Mythical" }, { id: 494, name: "Victini", group: "Mythical" },
    { id: 550, name: "Basculin", group: "Regional • E Method" }, { id: 561, name: "Sigilyph", group: "Standalone" },
    { id: 594, name: "Alomomola", group: "Standalone" }, { id: 615, name: "Cryogonal", group: "Standalone" },
    { id: 618, name: "Stunfisk", group: "Regional" }, { id: 626, name: "Bouffalant", group: "Standalone" },
    { id: 631, name: "Heatmor", group: "Standalone" }, { id: 632, name: "Durant", group: "Standalone" },
    { id: 531, name: "Audino", group: "Standalone" },
    { id: 538, name: "Throh", group: "Standalone" }, { id: 539, name: "Sawk", group: "Standalone" },
    { id: 556, name: "Maractus", group: "Standalone" }, { id: 587, name: "Emolga", group: "Standalone" },
    { id: 621, name: "Druddigon", group: "Standalone" }, { id: 638, name: "Cobalion", group: "Legendary" },
    { id: 639, name: "Terrakion", group: "Legendary" }, { id: 640, name: "Virizion", group: "Legendary" },
    { id: 641, name: "Tornadus", group: "Legendary" }, { id: 642, name: "Thundurus", group: "Legendary" },
    { id: 643, name: "Reshiram", group: "Legendary" }, { id: 644, name: "Zekrom", group: "Legendary" },
    { id: 645, name: "Landorus", group: "Legendary" }, { id: 646, name: "Kyurem", group: "Legendary" },
    { id: 647, name: "Keldeo", group: "Mythical" }, { id: 648, name: "Meloetta", group: "Mythical" },
    { id: 649, name: "Genesect", group: "Mythical" }, { id: 676, name: "Furfrou", group: "Standalone" }, { id: 701, name: "Hawlucha", group: "Standalone" },
    { id: 702, name: "Dedenne", group: "Standalone" }, { id: 703, name: "Carbink", group: "Standalone" }, { id: 707, name: "Klefki", group: "Standalone" },
    { id: 716, name: "Xerneas", group: "Legendary" }, { id: 717, name: "Yveltal", group: "Legendary" },
    { id: 718, name: "Zygarde", group: "Legendary" }, { id: 719, name: "Diancie", group: "Mythical" },
    { id: 720, name: "Hoopa", group: "Mythical" }, { id: 721, name: "Volcanion", group: "Mythical" },
    { id: 741, name: "Oricorio", group: "Standalone" }, { id: 746, name: "Wishiwashi", group: "Form Change" },
    { id: 764, name: "Comfey", group: "Standalone" }, { id: 765, name: "Oranguru", group: "Standalone • V2" }, { id: 766, name: "Passimian", group: "Standalone" },
    { id: 771, name: "Pyukumuku", group: "Standalone" }, { id: 774, name: "Minior", group: "Form Change" }, { id: 775, name: "Komala", group: "Standalone" },
    { id: 776, name: "Turtonator", group: "Standalone" }, { id: 777, name: "Togedemaru", group: "Standalone" }, { id: 778, name: "Mimikyu", group: "Standalone • V2" },
    { id: 779, name: "Bruxish", group: "Standalone" }, { id: 780, name: "Drampa", group: "Standalone" }, { id: 781, name: "Dhelmise", group: "Standalone" },
    { id: 785, name: "Tapu Koko", group: "Legendary" }, { id: 786, name: "Tapu Lele", group: "Legendary" },
    { id: 787, name: "Tapu Bulu", group: "Legendary" }, { id: 788, name: "Tapu Fini", group: "Legendary" },
    { id: 793, name: "Nihilego", group: "Ultra Beast" }, { id: 794, name: "Buzzwole", group: "Ultra Beast" },
    { id: 795, name: "Pheromosa", group: "Ultra Beast" }, { id: 796, name: "Xurkitree", group: "Ultra Beast" },
    { id: 797, name: "Celesteela", group: "Ultra Beast" }, { id: 798, name: "Kartana", group: "Ultra Beast" },
    { id: 799, name: "Guzzlord", group: "Ultra Beast" }, { id: 800, name: "Necrozma", group: "Legendary" },
    { id: 801, name: "Magearna", group: "Mythical" }, { id: 802, name: "Marshadow", group: "Mythical" },
    { id: 805, name: "Stakataka", group: "Ultra Beast" }, { id: 806, name: "Blacephalon", group: "Ultra Beast" },
    { id: 807, name: "Zeraora", group: "Mythical" },
    { id: 845, name: "Cramorant", group: "Standalone" }, { id: 870, name: "Falinks", group: "Standalone • V2" }, { id: 871, name: "Pincurchin", group: "Standalone" }, { id: 10169, dexId: 144, name: "Galarian Articuno", group: "Regional Form", generation: 7 },
    { id: 10170, dexId: 145, name: "Galarian Zapdos", group: "Regional Form", generation: 7 },
    { id: 10171, dexId: 146, name: "Galarian Moltres", group: "Regional Form", generation: 7 },
    { id: 874, name: "Stonjourner", group: "Standalone" },
    { id: 875, name: "Eiscue", group: "Standalone" }, { id: 876, name: "Indeedee", group: "Standalone • B" }, { id: 877, name: "Morpeko", group: "Standalone" },
    { id: 888, name: "Zacian", group: "Legendary" }, { id: 889, name: "Zamazenta", group: "Legendary" },
    { id: 884, name: "Duraludon", group: "Standalone" }, { id: 890, name: "Eternatus", group: "Legendary" }, { id: 893, name: "Zarude", group: "Mythical" },
    { id: 894, name: "Regieleki", group: "Legendary" }, { id: 895, name: "Regidrago", group: "Legendary" },
    { id: 896, name: "Glastrier", group: "Legendary" }, { id: 897, name: "Spectrier", group: "Legendary" },
    { id: 898, name: "Calyrex", group: "Legendary" }, { id: 905, name: "Enamorus", group: "Legendary" },
    { id: 931, name: "Squawkabilly", group: "Standalone" }, { id: 950, name: "Klawf", group: "Standalone" }, { id: 962, name: "Bombirdier", group: "Standalone" },
    { id: 967, name: "Cyclizar", group: "Standalone" }, { id: 968, name: "Orthworm", group: "Standalone" }, { id: 973, name: "Flamigo", group: "Standalone" },
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

const FOSSIL_TRAINERS = [
    { name: "Brock", note: "Kanto Gym Leader \u2014 TCG: Mysterious Fossil", theme: "brock", portrait: "assets/pokemon/Brock -- Kabutops Or Omastar.jpg" },
    { name: "Roark", note: "Sinnoh Gym Leader \u2014 Cranidos and Rampardos", theme: "roark", portrait: "assets/pokemon/Roark -- Cranidos And Rampardos.gif" },
    { name: "Byron", note: "Sinnoh Gym Leader \u2014 Bastiodon and Cradily", theme: "byron", portrait: "assets/pokemon/Byron -- Bastiodon Or Cradily.png" },
    { name: "Nando", note: "Sinnoh League \u2014 Armaldo", theme: "nando", portrait: "assets/pokemon/Nando -- Armaldo.png" },
    { name: "Fennel", note: "Unova story \u2014 Archen and Archeops", theme: "fennel", portrait: "assets/pokemon/Fennel -- Archen Or Archeops.png" },
    { name: "Grant", note: "Kalos Gym Leader \u2014 Tyrunt", theme: "grant", portrait: "assets/pokemon/Grant -- Tyrunt.png" },
    { name: "Bonnie", note: "Kalos story \u2014 Tyrantrum", theme: "bonnie", portrait: "assets/pokemon/Bonnie -- Tyrantrum.png" },
    { name: "Thaddeus", note: "Kalos story \u2014 Amaura and Aurorus", theme: "thaddeus", portrait: "assets/pokemon/Thaddeus -- Amaura Or Aurorus.png" },
    { name: "Bray Zenn", note: "Galar story \u2014 Dracozolt", theme: "bray-zenn", portrait: "assets/pokemon/Bray Zenn -- Dracozolt.png" },
    { name: "Goh", note: "Galar journey \u2014 Arctozolt", theme: "goh", portrait: "assets/pokemon/Goh -- Arctozolt.webp" },
    { name: "Cara Liss", note: "Galar story \u2014 Arctovish", theme: "cara-liss", portrait: "assets/pokemon/Cara Liss -- Arctovish.webp" },
    { name: "Dr. Zager", note: "Unova story \u2014 Tirtouga and Carracosta", theme: "zager", portrait: "assets/pokemon/Dr. Zager -- Tirtouga Or Carracosta.png" },
    { name: "Ash", note: "Galar journey \u2014 Dracovish", theme: "ash", portrait: "assets/pokemon/Ash -- Dracovish.webp" }
];
const FOSSIL_WILD_APPEARANCES = [
    { name: "Aerodactyl", note: "Wild appearance \u2014 carrying Ash", portrait: "assets/pokemon/Aerodactyl Wild -- carrying Ash.avif", theme: "aerodactyl" }
];
const FOSSIL_FAMILIES = [
    { fossilItems: ["Helix Fossil"], pokemon: [{ id: 138, name: "Omanyte", stage: "Stage 1" }, { id: 139, name: "Omastar", stage: "Stage 2" }], evolutionLevel: 40, trainers: ["Brock"] },
    { fossilItems: ["Dome Fossil"], pokemon: [{ id: 140, name: "Kabuto", stage: "Stage 1" }, { id: 141, name: "Kabutops", stage: "Stage 2" }], evolutionLevel: 40, trainers: ["Brock"] },
    { fossilItems: ["Old Amber"], pokemon: [{ id: 142, name: "Aerodactyl", stage: "Stage 1" }], trainers: [], note: "First seen wild and airborne with Ash in the anime \u2014 left unpaired on purpose." },
    { fossilItems: ["Root Fossil"], pokemon: [{ id: 345, name: "Lileep", stage: "Stage 1" }, { id: 346, name: "Cradily", stage: "Stage 2" }], evolutionLevel: 40, trainers: ["Byron"] },
    { fossilItems: ["Claw Fossil"], pokemon: [{ id: 347, name: "Anorith", stage: "Stage 1" }, { id: 348, name: "Armaldo", stage: "Stage 2" }], evolutionLevel: 40, trainers: ["Nando"] },
    { fossilItems: ["Skull Fossil"], pokemon: [{ id: 408, name: "Cranidos", stage: "Stage 1" }, { id: 409, name: "Rampardos", stage: "Stage 2" }], evolutionLevel: 30, trainers: ["Roark"] },
    { fossilItems: ["Armor Fossil"], pokemon: [{ id: 410, name: "Shieldon", stage: "Stage 1" }, { id: 411, name: "Bastiodon", stage: "Stage 2" }], evolutionLevel: 30, trainers: ["Byron"] },
    { fossilItems: ["Cover Fossil"], pokemon: [{ id: 564, name: "Tirtouga", stage: "Stage 1" }, { id: 565, name: "Carracosta", stage: "Stage 2" }], evolutionLevel: 37, trainers: ["Dr. Zager"] },
    { fossilItems: ["Plume Fossil"], pokemon: [{ id: 566, name: "Archen", stage: "Stage 1" }, { id: 567, name: "Archeops", stage: "Stage 2" }], evolutionLevel: 37, trainers: ["Fennel"] },
    { fossilItems: ["Jaw Fossil"], pokemon: [{ id: 696, name: "Tyrunt", stage: "Stage 1" }, { id: 697, name: "Tyrantrum", stage: "Stage 2" }], evolutionLevel: 39, evolutionTime: "day", trainers: ["Grant", "Bonnie"] },
    { fossilItems: ["Sail Fossil"], pokemon: [{ id: 698, name: "Amaura", stage: "Stage 1" }, { id: 699, name: "Aurorus", stage: "Stage 2" }], evolutionLevel: 39, evolutionTime: "night", trainers: ["Thaddeus"] },
    { fossilItems: ["Fossilized Bird", "Fossilized Drake"], pokemon: [{ id: 880, name: "Dracozolt", stage: "Stage 1" }], trainers: ["Bray Zenn"] },
    { fossilItems: ["Fossilized Bird", "Fossilized Dino"], pokemon: [{ id: 881, name: "Arctozolt", stage: "Stage 1" }], trainers: ["Goh"] },
    { fossilItems: ["Fossilized Fish", "Fossilized Drake"], pokemon: [{ id: 882, name: "Dracovish", stage: "Stage 1" }], trainers: ["Ash"] },
    { fossilItems: ["Fossilized Fish", "Fossilized Dino"], pokemon: [{ id: 883, name: "Arctovish", stage: "Stage 1" }], trainers: ["Cara Liss"] }
];
const FOSSIL_ITEM_ART = {
    "Helix Fossil": "assets/pokemon/fossils/helix-fossil.png",
    "Dome Fossil": "assets/pokemon/fossils/dome-fossil.png",
    "Old Amber": "assets/pokemon/fossils/old-amber.png",
    "Root Fossil": "assets/pokemon/fossils/root-fossil.png",
    "Claw Fossil": "assets/pokemon/fossils/claw-fossil.png",
    "Skull Fossil": "assets/pokemon/fossils/skull-fossil.png",
    "Armor Fossil": "assets/pokemon/fossils/armor-fossil.png",
    "Cover Fossil": "assets/pokemon/fossils/cover-fossil.png",
    "Plume Fossil": "assets/pokemon/fossils/plume-fossil.png",
    "Jaw Fossil": "assets/pokemon/fossils/jaw-fossil.png",
    "Sail Fossil": "assets/pokemon/fossils/sail-fossil.png",
    "Fossilized Bird": "assets/pokemon/fossils/fossilized-bird.png",
    "Fossilized Drake": "assets/pokemon/fossils/fossilized-drake.png",
    "Fossilized Fish": "assets/pokemon/fossils/fossilized-fish.png",
    "Fossilized Dino": "assets/pokemon/fossils/fossilized-dino.png"
};

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
        const pokemon = BASIC_ONLY_POKEMON.filter((entry) => getGenerationIndex(entry) === selectedGenerationIndex && (selectedGenerationIndex !== 1 || GEN2_BASIC_MAP_IDS.has(entry.dexId || entry.id)) && (selectedGenerationIndex !== 2 || GEN3_BASIC_MAP_IDS.has(entry.dexId || entry.id)) && (selectedGenerationIndex !== 3 || GEN4_BASIC_MAP_IDS.has(entry.dexId || entry.id)) && (selectedGenerationIndex !== 4 || GEN5_BASIC_MAP_IDS.has(entry.dexId || entry.id)) && (selectedGenerationIndex !== 5 || GEN6_BASIC_MAP_IDS.has(entry.dexId || entry.id)) && (selectedGenerationIndex !== 6 || GEN7_BASIC_MAP_IDS.has(entry.dexId || entry.id)) && (selectedGenerationIndex !== 7 || GEN8_BASIC_MAP_IDS.has(entry.dexId || entry.id)) && (selectedGenerationIndex !== 8 || GEN9_BASIC_MAP_IDS.has(entry.dexId || entry.id)));
        const cards = pokemon.map((entry) => `<article class="evolution-basic-carousel__item" tabindex="0" data-basic-family="${entry.id}">${cardContent(entry)}</article>`).join("");
        track.innerHTML = `${cards}${cards}`;
        controls.innerHTML = POKEMON_GENERATION_MARKERS.map((entry, index) => `<button type="button" role="tab" aria-selected="${index === selectedGenerationIndex}" data-basic-generation="${index}"><span>${index + 1}</span>${entry.region}<small>${BASIC_ONLY_POKEMON.filter((pokemonEntry) => getGenerationIndex(pokemonEntry) === index && (index !== 1 || GEN2_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id)) && (index !== 2 || GEN3_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id)) && (index !== 3 || GEN4_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id)) && (index !== 4 || GEN5_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id)) && (index !== 5 || GEN6_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id)) && (index !== 6 || GEN7_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id)) && (index !== 7 || GEN8_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id)) && (index !== 8 || GEN9_BASIC_MAP_IDS.has(pokemonEntry.dexId || pokemonEntry.id))).length}</small></button>`).join("");
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
    const gen5ExtraIds = new Set(GEN5_ONE_STAGE_MAP_EXTRAS.map((line) => line.pokemon[0].id));
    const gen7ExtraIds = new Set(GEN7_ONE_STAGE_MAP_EXTRAS.map((line) => line.pokemon[0].id));
    const gen8ExtraIds = new Set(GEN8_ONE_STAGE_MAP_EXTRAS.map((line) => line.pokemon[0].id));
    const gen9ExtraIds = new Set(GEN9_ONE_STAGE_MAP_EXTRAS.map((line) => line.pokemon[0].id));
    const lines = (await loadCompleteOneStageLines()).filter((line) => !gen5ExtraIds.has(line.pokemon[0].id) && !gen7ExtraIds.has(line.pokemon[0].id) && !gen8ExtraIds.has(line.pokemon[0].id) && !gen9ExtraIds.has(line.pokemon[0].id)).concat(GEN2_ONE_STAGE_MAP_EXTRAS, GEN4_ONE_STAGE_MAP_EXTRAS, GEN5_ONE_STAGE_MAP_EXTRAS, GEN7_ONE_STAGE_MAP_EXTRAS, GEN8_ONE_STAGE_MAP_EXTRAS, GEN9_ONE_STAGE_MAP_EXTRAS);
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
        const generationLines = lines.filter((line) => line.generation === generationIndex && (generationIndex !== 1 || GEN2_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 2 || GEN3_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 3 || GEN4_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 4 || GEN5_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 5 || GEN6_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 6 || GEN7_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 7 || GEN8_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 8 || GEN9_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)));
        const itemMarkup = generationLines.map((line) => `<div class="evolution-one-stage__item" tabindex="0" data-one-stage-family="${line.pokemon[0].id}">${familyContent(line)}</div>`).join("");
        grid.innerHTML = `<div class="evolution-one-stage__track">${itemMarkup}${itemMarkup}</div>`;
        generationControls.innerHTML = POKEMON_GENERATION_MARKERS.map((entry, index) => `<button type="button" role="tab" aria-selected="${index === generationIndex}" data-one-stage-generation="${index}"><span>${index + 1}</span>${entry.region}<small>${lines.filter((line) => line.generation === index && (index !== 1 || GEN2_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 2 || GEN3_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 3 || GEN4_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 4 || GEN5_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 5 || GEN6_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 6 || GEN7_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 7 || GEN8_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 8 || GEN9_ONE_STAGE_MAP_IDS.has(line.pokemon[0].id))).length}</small></button>`).join("");
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
    const lines = [...GEN1_THREE_STAGE_LINES, ...GEN2_THREE_STAGE_LINES, ...GEN3_THREE_STAGE_LINES, ...GEN4_THREE_STAGE_LINES, ...GEN5_THREE_STAGE_LINES, ...GEN6_THREE_STAGE_LINES, ...GEN7_THREE_STAGE_LINES, ...GEN8_THREE_STAGE_LINES, ...GEN9_THREE_STAGE_LINES, ...THREE_STAGE_LINES.filter((line) => !GEN8_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)).map((line) => ({ ...line, generation: 7 }))];
    const render = () => {
        const generationLines = lines.filter((line) => line.generation === generationIndex && (generationIndex !== 1 || GEN2_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 2 || GEN3_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 3 || GEN4_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 4 || GEN5_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 5 || GEN6_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 6 || GEN7_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 7 || GEN8_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (generationIndex !== 8 || GEN9_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)));
        carousel.innerHTML = `<div class="evolution-stage-carousel__track">${generationLines.concat(generationLines).map((family) => `<article class="evolution-stage-carousel__family"><p>${family.name}</p>${pokemonNodeMarkup(family.pokemon[stageIndex], "evolution-specimen--large")}</article>`).join("")}</div>`;
        generationControls.innerHTML = POKEMON_GENERATION_MARKERS.map((entry, index) => `<button type="button" role="tab" aria-selected="${index === generationIndex}" data-stage-generation="${index}"><span>${index + 1}</span>${entry.region}<small>${lines.filter((line) => line.generation === index && (index !== 1 || GEN2_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 2 || GEN3_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 3 || GEN4_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 4 || GEN5_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 5 || GEN6_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 6 || GEN7_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 7 || GEN8_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id)) && (index !== 8 || GEN9_THREE_STAGE_MAP_IDS.has(line.pokemon[0].id))).length}</small></button>`).join("");
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
    const trainersPanel = tool?.querySelector("[data-fossil-trainers]");
    const trainersPanelRight = tool?.querySelector("[data-fossil-trainers-right]");
    const display = tool?.querySelector("[data-fossil-display]");
    const counter = tool?.querySelector("[data-fossil-counter]");
    const vertical = tool?.querySelector(".fossil-vertical");
    if (!(tool instanceof HTMLElement) || !(trainersPanel instanceof HTMLElement) || !(trainersPanelRight instanceof HTMLElement) || !(display instanceof HTMLElement) || !(counter instanceof HTMLElement) || !(vertical instanceof HTMLElement)) return;
    let selectedIndex = 0;
    let isPaused = false;
    const familyIndicesByTrainer = (name) => FOSSIL_FAMILIES.reduce((acc, family, index) => {
        if (family.trainers.includes(name)) acc.push(index);
        return acc;
    }, []);
    const render = () => {
        const family = FOSSIL_FAMILIES[selectedIndex];
        counter.textContent = `${String(selectedIndex + 1).padStart(2, "0")} / ${String(FOSSIL_FAMILIES.length).padStart(2, "0")}`;
        const itemsMarkup = family.fossilItems.map((item) => `<div class="fossil-item"><img src="${FOSSIL_ITEM_ART[item]}" alt="${item}" /><small>Item / Basic slot</small><strong>${item}</strong></div>`).join(`<span class="fossil-vertical__plus" aria-hidden="true">+</span>`);
        const timeIcon = family.evolutionTime === "day" ? "&#9728;" : family.evolutionTime === "night" ? "&#9790;" : "";
        const timeLabel = family.evolutionTime === "day" ? "day" : family.evolutionTime === "night" ? "night" : "";
        const chainMarkup = family.pokemon.map((pokemon, index) => `${index === 1 && family.evolutionLevel ? `<span class="fossil-vertical__level" aria-label="Evolves at level ${family.evolutionLevel}${timeLabel ? ` during the ${timeLabel}` : ""}"><span>Lv. ${family.evolutionLevel}${timeIcon ? ` <i class="fossil-vertical__time" aria-hidden="true">${timeIcon}</i>` : ""}</span></span>` : ""}<span class="fossil-vertical__arrow" aria-hidden="true">&#8595;</span>${pokemonNodeMarkup(pokemon, "evolution-specimen--fossil")}`).join("");
        const noteMarkup = family.trainers.length ? "" : `<p class="fossil-vertical__note">${family.note || "No confirmed trainer yet \u2014 more are being researched."}</p>`;
        display.innerHTML = `<div class="fossil-vertical__items">${itemsMarkup}</div>${chainMarkup}${noteMarkup}`;
        const trainerMarkup = (trainer) => `<article class="fossil-trainer fossil-trainer--${trainer.theme} ${family.trainers.includes(trainer.name) ? "is-active" : "is-dimmed"}" data-fossil-trainer="${trainer.name}" role="button" tabindex="0" aria-label="Show ${trainer.name}'s fossil Pokemon"><span class="fossil-trainer__badge" aria-hidden="true">${trainer.portrait ? `<img src="${encodeURI(trainer.portrait)}" alt="" />` : trainer.icon}</span><div class="fossil-trainer__info"><strong>${trainer.name}</strong><small>${trainer.note}</small></div></article>`;
        const splitIndex = Math.max(1, FOSSIL_TRAINERS.length - 6);
        trainersPanel.innerHTML = FOSSIL_TRAINERS.slice(0, splitIndex).map(trainerMarkup).join("");
        trainersPanelRight.innerHTML = `<article class="fossil-trainer fossil-wild fossil-wild--aerodactyl" data-fossil-family="2" role="button" tabindex="0" aria-label="Show Aerodactyl's fossil exhibit"><span class="fossil-trainer__badge"><img src="${encodeURI(FOSSIL_WILD_APPEARANCES[0].portrait)}" alt="${FOSSIL_WILD_APPEARANCES[0].name}" /></span><div class="fossil-trainer__info"><strong>${FOSSIL_WILD_APPEARANCES[0].name}</strong><small>${FOSSIL_WILD_APPEARANCES[0].note}</small></div></article>${FOSSIL_TRAINERS.slice(splitIndex).map(trainerMarkup).join("")}`;
    };
    const goToTrainer = (name) => {
        const matches = familyIndicesByTrainer(name);
        if (!matches.length) return;
        const currentPosition = matches.indexOf(selectedIndex);
        selectedIndex = matches[(currentPosition + 1) % matches.length];
        render();
    };
    const advance = () => {
        if (isPaused) return;
        selectedIndex = (selectedIndex + 1) % FOSSIL_FAMILIES.length;
        render();
    };
    vertical.addEventListener("mouseenter", () => { isPaused = true; });
    vertical.addEventListener("mouseleave", () => { isPaused = false; });
    vertical.addEventListener("focusin", () => { isPaused = true; });
    vertical.addEventListener("focusout", (event) => {
        if (!(event.relatedTarget instanceof Node) || !vertical.contains(event.relatedTarget)) isPaused = false;
    });
    window.setInterval(advance, 5200);
    tool.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const familyCard = event.target.closest("[data-fossil-family]");
        if (familyCard) { selectedIndex = Number(familyCard.getAttribute("data-fossil-family")); render(); return; }
        const trainerCard = event.target.closest("[data-fossil-trainer]");
        if (trainerCard) { goToTrainer(trainerCard.getAttribute("data-fossil-trainer")); return; }
        if (event.target.closest("[data-fossil-prev]")) selectedIndex = (selectedIndex - 1 + FOSSIL_FAMILIES.length) % FOSSIL_FAMILIES.length;
        else if (event.target.closest("[data-fossil-next]")) selectedIndex = (selectedIndex + 1) % FOSSIL_FAMILIES.length;
        else return;
        render();
    });
    tool.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const trainerCard = event.target instanceof Element ? event.target.closest("[data-fossil-trainer]") : null;
        const familyCard = event.target instanceof Element ? event.target.closest("[data-fossil-family]") : null;
        if (familyCard) { event.preventDefault(); selectedIndex = Number(familyCard.getAttribute("data-fossil-family")); render(); return; }
        if (!trainerCard) return;
        event.preventDefault();
        goToTrainer(trainerCard.getAttribute("data-fossil-trainer"));
    });
    render();
}

function initBabyTool() {
    const tool = document.querySelector("[data-baby-tool]");
    const controls = tool?.querySelector("[data-baby-controls]");
    const families = tool?.querySelector("[data-baby-families]");
    if (!(tool instanceof HTMLElement) || !(controls instanceof HTMLElement) || !(families instanceof HTMLElement)) return;
    const generations = [...new Set(BABY_POKEMON_FAMILIES.map((family) => family.generation))];
    const specialThreeStageIds = new Set([172, 173, 174, 175, 239, 240, 298, 406, 440]);
    let selectedGeneration = generations[0];
    const renderPath = (path) => path.map((pokemon) => pokemonNodeMarkup(pokemon, "evolution-specimen--baby")).join("");
    const render = () => {
        controls.innerHTML = generations.map((generation) => { const marker = POKEMON_GENERATION_MARKERS[generation]; return `<button type="button" role="tab" aria-selected="${generation === selectedGeneration}" data-baby-generation="${generation}"><span>${generation + 1}</span>${marker.region}<small>${BABY_POKEMON_FAMILIES.filter((family) => family.generation === generation).length}</small></button>`; }).join("");
        families.innerHTML = BABY_POKEMON_FAMILIES.filter((family) => family.generation === selectedGeneration).map((family) => {
            const isThreeStage = specialThreeStageIds.has(family.baby.id);
            const isTyrogue = family.baby.id === 236;
            const isSmoochum = family.baby.id === 238;
            const isWynaut = family.baby.id === 360;
            const isMimeJr = family.baby.id === 439;
            const isToxel = family.baby.id === 848;
            const isSimpleBabyAdult = new Set([433, 438, 446, 447, 458]).has(family.baby.id);
            const isBabyAdultOnly = isTyrogue || isSmoochum || isWynaut || isMimeJr || isToxel || isSimpleBabyAdult;
            const teenStage = family.paths[0]?.[0] || family.baby;
            const adultStage = family.paths[0]?.[1] || family.baby;
            const defaultMode = isBabyAdultOnly ? "baby" : "teen";
            const tyrogueOutcomes = family.paths.map((path) => path[0]).filter(Boolean);
            const smoochumAdultStage = isSmoochum ? family.paths[0]?.[0] || family.baby : adultStage;
            const wynautAdultStage = isWynaut ? family.paths[0]?.[0] || family.baby : adultStage;
            const simpleAdultStage = isSimpleBabyAdult ? family.paths[0]?.[0] || family.baby : adultStage;
            const mimeAdultStage = isMimeJr ? family.paths[0]?.[0] || family.baby : adultStage;
            const toxelOutcomes = isToxel ? family.paths.map((path) => path[0]).filter(Boolean) : [];
            const tyrogueConditions = { 106: "Attack > Defense", 107: "Defense > Attack", 237: "Attack = Defense" };
            const adultHasRegionalVariant = adultStage.id === 26;
            const evolutionMethods = family.baby.id === 172 ? {
                className: "baby-family--pikachu",
                firstIcon: "happiness%20icon.png",
                firstLabel: "Pichu evolves into Pikachu through happiness",
                firstTooltip: "Happiness",
                secondIcon: "thunderstone%20icon.png",
                secondLabel: "Pikachu evolves into Raichu through a Thunder Stone",
                secondTooltip: "Thunder Stone"
            } : family.baby.id === 173 || family.baby.id === 174 ? {
                className: "baby-family--happiness-moonstone",
                firstIcon: "happiness%20icon.png",
                firstLabel: family.baby.id === 173 ? "Cleffa evolves into Clefairy through happiness" : "Igglybuff evolves into Jigglypuff through happiness",
                firstTooltip: "Happiness",
                secondIcon: "moonstone%20icon.png",
                secondLabel: family.baby.id === 173 ? "Clefairy evolves into Clefable through a Moon Stone" : "Jigglypuff evolves into Wigglytuff through a Moon Stone",
                secondTooltip: "Moon Stone"
            } : family.baby.id === 175 ? {
                className: "baby-family--happiness-shinystone",
                firstIcon: "happiness%20icon.png",
                firstLabel: "Togepi evolves into Togetic through happiness",
                firstTooltip: "Happiness",
                secondIcon: "shinystone%20icon.png",
                secondLabel: "Togetic evolves into Togekiss through a Shiny Stone",
                secondTooltip: "Shiny Stone"
            } : family.baby.id === 239 ? {
                className: "baby-family--elekid",
                firstIcon: null,
                firstLabel: "Elekid evolves into Electabuzz at level 30",
                firstTooltip: "Level 30",
                secondIcon: "electrizer%20with%20trade%20icon.png",
                secondLabel: "Electabuzz evolves into Electivire by trading with an Electrizer",
                secondTooltip: "Electrizer + trade"
            } : family.baby.id === 240 ? {
                className: "baby-family--magby",
                firstIcon: null,
                firstLabel: "Magby evolves into Magmar at level 30",
                firstTooltip: "Level 30",
                secondIcon: "magmarizer%20with%20trade%20icon.png",
                secondLabel: "Magmar evolves into Magmortar by trading with a Magmarizer",
                secondTooltip: "Magmarizer + trade"
            } : family.baby.id === 298 ? {
                className: "baby-family--azurill",
                firstIcon: "happiness%20icon.png",
                firstLabel: "Azurill evolves into Marill through happiness",
                firstTooltip: "Happiness",
                secondIcon: null,
                secondLabel: "Marill evolves into Azumarill at level 18",
                secondTooltip: "Level 18"
            } : family.baby.id === 406 ? {
                className: "baby-family--budew",
                firstIcon: "happiness%20with%20day%20icon.png",
                firstLabel: "Budew evolves into Roselia through happiness during the day",
                firstTooltip: "Happiness + day",
                secondIcon: "shinystone%20icon.png",
                secondLabel: "Roselia evolves into Roserade through a Shiny Stone",
                secondTooltip: "Shiny Stone"
            } : family.baby.id === 433 ? {
                className: "baby-family--chingling",
                firstIcon: "happiness%20with%20night%20icon.png",
                firstLabel: "Chingling evolves into Chimecho through happiness at night",
                firstTooltip: "Happiness + night"
            } : family.baby.id === 438 ? {
                className: "baby-family--bonsly",
                firstIcon: "lv%20%2B%20with%20mimic%20icon.png",
                firstLabel: "Bonsly evolves into Sudowoodo by leveling up while knowing Mimic",
                firstTooltip: "Level up + Mimic"
            } : family.baby.id === 439 ? {
                className: "baby-family--mime-jr",
                firstIcon: "lv%20%2B%20with%20mimic%20icon.png",
                firstLabel: "Mime Jr. evolves into Mr. Mime by leveling up while knowing Mimic",
                firstTooltip: "Level up + Mimic"
            } : family.baby.id === 440 ? {
                className: "baby-family--happiny",
                firstIcon: "ovalstone%20with%20day%20icon.png",
                firstLabel: "Happiny evolves into Chansey with an Oval Stone during the day",
                firstTooltip: "Oval Stone + day",
                secondIcon: "happiness%20icon.png",
                secondLabel: "Chansey evolves into Blissey through happiness",
                secondTooltip: "Happiness"
            } : family.baby.id === 446 ? {
                className: "baby-family--munchlax",
                firstIcon: "happiness%20icon.png",
                firstLabel: "Munchlax evolves into Snorlax through happiness",
                firstTooltip: "Happiness"
            } : family.baby.id === 447 ? {
                className: "baby-family--riolu",
                firstIcon: "happiness%20icon.png",
                firstLabel: "Riolu evolves into Lucario through happiness",
                firstTooltip: "Happiness"
            } : family.baby.id === 458 ? {
                className: "baby-family--mantyke",
                firstIcon: null,
                firstArtId: 223,
                firstLevelText: "Lv. +",
                firstLabel: "Mantyke evolves into Mantine by leveling up with Remoraid in the party",
                firstTooltip: "Level up + Remoraid"
            } : null;
            const firstMethodMarkup = evolutionMethods ? `<span class="baby-family__method baby-family__method--first" tabindex="0" role="img" aria-label="${evolutionMethods.firstLabel}">${evolutionMethods.firstArtId ? `<span class="baby-family__method-dual">${evolutionMethods.firstLevelText ? `<span class="baby-family__method-level">${evolutionMethods.firstLevelText}</span>` : ""}<img src="${pokemonArtUrl(evolutionMethods.firstArtId)}" alt="Remoraid" /></span>` : evolutionMethods.firstIcon ? `<img src="assets/pokemon/${evolutionMethods.firstIcon}" alt="" />` : `<span class="baby-family__method-level">Lv. 30</span>`}<span class="baby-family__method-tooltip" role="tooltip">${evolutionMethods.firstTooltip}</span></span>` : "";
            const secondMethodMarkup = evolutionMethods ? `<span class="baby-family__method baby-family__method--second" tabindex="0" role="img" aria-label="${evolutionMethods.secondLabel}">${evolutionMethods.secondIcon ? `<img src="assets/pokemon/${evolutionMethods.secondIcon}" alt="" />` : `<span class="baby-family__method-level">${evolutionMethods.secondTooltip === "Level 18" ? "Lv. 18" : evolutionMethods.secondTooltip}</span>`}<span class="baby-family__method-tooltip" role="tooltip">${evolutionMethods.secondTooltip}</span></span>` : "";
            const mimeRegionalMarkup = isMimeJr ? `<button type="button" class="baby-family__regional-mark" aria-label="Show Mr. Rime regional evolution"><span aria-hidden="true">R</span><span class="baby-family__regional-preview baby-family__regional-preview--mime" role="tooltip"><img src="${pokemonArtUrl(866)}" alt="" /><strong>Mr. Rime</strong><small>Level 42</small></span></button>` : "";
            const mimeAdultMarkup = isMimeJr ? `<div class="baby-family__mime-outcomes"><div class="baby-family__mime-outcome">${pokemonNodeMarkup(mimeAdultStage, "evolution-specimen--baby")}<small class="baby-family__mime-form">Kanto</small></div><div class="baby-family__mime-outcome baby-family__mime-outcome--regional">${pokemonNodeMarkup({ id: 10168, name: "Galarian Mr. Mime", stage: "Basic" }, "evolution-specimen--baby")}${mimeRegionalMarkup}<small class="baby-family__mime-form">Galar</small></div></div>` : "";
            const displayMarkup = isTyrogue ? `
                        <div class="baby-family__stage baby-family__stage--baby">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div>
                        <div class="baby-family__stage baby-family__stage--adult"><div class="baby-family__tyrogue-outcomes">${tyrogueOutcomes.map((pokemon) => `<div class="baby-family__tyrogue-outcome">${pokemonNodeMarkup(pokemon, "evolution-specimen--baby")}<small class="baby-family__tyrogue-condition">Level 20<br />${tyrogueConditions[pokemon.id]}</small></div>`).join("")}</div></div>
                    ` : isSmoochum ? `
                        <div class="baby-family__stage baby-family__stage--baby">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div>
                        <div class="baby-family__stage baby-family__stage--adult">${pokemonNodeMarkup(smoochumAdultStage, "evolution-specimen--baby")}<span class="baby-family__method-level" aria-label="Level 30">Lv. 30</span></div>
                    ` : isWynaut ? `
                        <div class="baby-family__stage baby-family__stage--baby">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div>
                        <div class="baby-family__stage baby-family__stage--adult">${pokemonNodeMarkup(wynautAdultStage, "evolution-specimen--baby")}<span class="baby-family__method-level" aria-label="Level 15">Lv. 15</span></div>
                    ` : isMimeJr ? `
                        <div class="baby-family__stage baby-family__stage--baby">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div>
                        ${firstMethodMarkup}
                        <div class="baby-family__stage baby-family__stage--adult">${mimeAdultMarkup}</div>
                    ` : isToxel ? `
                        <div class="baby-family__stage baby-family__stage--baby">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div>
                        <div class="baby-family__stage baby-family__stage--adult"><div class="baby-family__toxel-outcomes">${toxelOutcomes.map((pokemon) => `<div class="baby-family__toxel-outcome">${pokemonNodeMarkup(pokemon, "evolution-specimen--baby")}</div>`).join("")}</div><small class="baby-family__toxel-note">Form determined by Nature at birth.</small></div>
                    ` : isSimpleBabyAdult ? `
                        <div class="baby-family__stage baby-family__stage--baby">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div>
                        ${firstMethodMarkup}
                        <div class="baby-family__stage baby-family__stage--adult">${pokemonNodeMarkup(simpleAdultStage, "evolution-specimen--baby")}</div>
                    ` : `
                        <div class="baby-family__stage baby-family__stage--baby">${pokemonNodeMarkup(family.baby, "evolution-specimen--baby")}</div>
                        ${firstMethodMarkup}
                        <div class="baby-family__stage baby-family__stage--teen">${pokemonNodeMarkup(teenStage, "evolution-specimen--baby")}</div>
                        ${secondMethodMarkup}
                        <div class="baby-family__stage baby-family__stage--adult">${pokemonNodeMarkup(adultStage, "evolution-specimen--baby")}${adultHasRegionalVariant ? `<button type="button" class="baby-family__regional-mark" aria-label="Show Alolan Raichu regional variant"><span aria-hidden="true">R</span><span class="baby-family__regional-preview" role="tooltip"><img src="${pokemonArtUrl(10100)}" alt="" /><strong>Alolan Raichu</strong><small>Regional variant</small></span></button>` : ""}</div>
                    `;
            return `
                <article class="baby-family${isTyrogue ? " baby-family--tyrogue" : isSmoochum ? " baby-family--smoochum" : isWynaut ? " baby-family--wynaut" : isMimeJr ? " baby-family--simple-baby-adult baby-family--simple-method baby-family--mime-jr" : isToxel ? " baby-family--toxel" : isSimpleBabyAdult ? ` baby-family--simple-baby-adult${evolutionMethods ? ` baby-family--simple-method ${evolutionMethods.className}` : ""}` : evolutionMethods ? ` baby-family--methods ${evolutionMethods.className}` : ""}" data-baby-mode="${defaultMode}" data-layout="${isThreeStage ? "three-stage" : "single-stage"}">
                    <div class="baby-family__toggle" aria-label="Toggle between baby and adult forms">
                        <button type="button" class="baby-family__toggle-option${defaultMode === "baby" ? " is-active" : ""}" data-baby-view="baby" aria-pressed="${defaultMode === "baby"}">Baby</button>
                        ${isBabyAdultOnly ? "" : `<button type="button" class="baby-family__toggle-option${defaultMode === "teen" ? " is-active" : ""}" data-baby-view="teen" aria-pressed="${defaultMode === "teen"}">Teen</button>`}
                        <button type="button" class="baby-family__toggle-option${defaultMode === "adult" ? " is-active" : ""}" data-baby-view="adult" aria-pressed="${defaultMode === "adult"}">Adult</button>
                    </div>
                    <div class="baby-family__display">
                        ${displayMarkup}
                    </div>
                </article>
            `;
        }).join("");
        families.querySelectorAll(".baby-family").forEach((familyCard) => {
            const setMode = (view) => {
                familyCard.dataset.babyMode = view || "teen";
                familyCard.querySelectorAll(".baby-family__toggle-option").forEach((button) => {
                    const active = button.getAttribute("data-baby-view") === view;
                    button.classList.toggle("is-active", active);
                    button.setAttribute("aria-pressed", String(active));
                });
            };
            familyCard.querySelectorAll(".baby-family__toggle-option").forEach((toggle) => {
                toggle.addEventListener("click", () => {
                    setMode(toggle.getAttribute("data-baby-view"));
                });
            });
            familyCard.querySelectorAll(".baby-family__stage").forEach((stage) => {
                stage.addEventListener("click", (event) => {
                    if (event.target instanceof Element && event.target.closest(".baby-family__regional-mark")) return;
                    const view = stage.classList.contains("baby-family__stage--baby") ? "baby" : stage.classList.contains("baby-family__stage--adult") ? "adult" : "teen";
                    setMode(view);
                });
            });
        });
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