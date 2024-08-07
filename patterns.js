// Description: This file contains the patterns for the game.

// pattern 25x25 the soccer ball

const pattern_default = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,"#c97a5a","#cc7e60","#b4684b","#ad684e","#ab654b","#b76c50","#d4856b","#e18b70","#e0866a",-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,"#cb7252","#e18767","#f09475","#f7a083","#f7a68a","#f1a388","#ed9c82","#f5a78d","#fbaa8e","#fca587","#fca084","#f89d80","#f59479",-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,"#c36b4d","#d8775a","#e78969","#f59679","#f99b80","#faa488","#faa488","#fcaa90","#fda98e","#fca489","#fda38a","#fda48a","#fca98e","#fa9f87","#f49883",-1,-1,-1,-1,-1],[-1,-1,-1,-1,"#97553a","#c46c50","#de8063","#ea8b6c","#f28f74","#f58f75","#f9987d","#fb9d83","#fda48a","#fda58b","#fca085","#fd9f86","#fd9d84","#fca68c","#fca48d","#f7a38d","#de967e",-1,-1,-1,-1],[-1,-1,-1,"#774533","#9e5b40","#c77154","#df8568","#e78d70","#eb8d72","#f59278","#fb9f86","#fda98f","#feac94","#fead95","#feaf98","#fead98","#fea890","#fba68e","#faa58d","#f9a790","#e7a28a","#bf8168",-1,-1,-1],[-1,-1,"#684135","#7f4936","#a35b3f","#c46f4f","#d87f65","#e28c71","#eb957d","#f59d87","#fcaf9b","#fdbbab","#fec5b7","#fec4b5","#fec3b4","#fdbfb0","#fbb8a5","#f6aa96","#f1a186","#ef9d85","#eca791","#cb9078","#9a6a58",-1,-1],[-1,-1,"#694336","#7a4432","#a05337","#b86c4d","#d18468","#d08060","#ba6744","#c66947","#ec997e","#fab099","#fdbeab","#febfab","#fbb6a1","#f09c81","#cf7351","#d88264","#e3967a","#e89c80","#eba790","#d69d88","#b27b67",-1,-1],[-1,"#13b9","#643e32","#7c4736","#974f36","#ab593a","#db886d","#f4ac97","#f8bdae","#eeab96","#db8467","#e68f71","#fab29a","#fdbba5","#f6aa8f","#f1a38a","#f9bdae","#fcc6b9","#febdae","#f9b19e","#ecad99","#d9a796","#b88069","#1f1510",-1],[-1,"#2d1814","#6c4233","#784332","#994e38","#b8674c","#dc8b70","#dd8874","#cf8c7d","#e69d8c","#e79c86","#d2826c","#df795e","#fd9c82","#f6af9b","#f4a58b","#e8927c","#d99485","#f0aa99","#f4ae9a","#f1b5a3","#d9a595","#c2846b","#422b23",-1],[-1,"#c05d45","#7e4533","#754131","#af6149","#cc7c5f","#c36f4f","#ce9483","#8c716a","#cfa59d","#e99e8d","#e18c70","#e67b5f","#fc957b","#f9a88f","#f09d8b","#d9a29a","#9f817f","#e5b3a3","#ea9c81","#f4b7a2","#d99f8a","#db9179","#f8a68f",-1],[-1,"#bb513a","#974a34","#78402f","#bb6852","#dc8469","#e18d75","#eb9680","#f4ab99","#f8b6a6","#ed9a87","#d06951","#e57962","#fa907b","#f6947e","#faad9a","#fcbbae","#fabdb1","#f9b3a2","#f9ac95","#f8b099","#e1a290","#eeab98","#fcb6a3",-1],[-1,"#c95d47","#a44f3c","#814231","#b9634d","#dc7c63","#ee9079","#f99f89","#fca794","#fcab9a","#ee8f79","#c85d45","#e37b64","#fd9a87","#f69b86","#fca78f","#fdbdad","#feb8ac","#feb4a4","#fdab92","#faac94","#efb3a4","#f5b09e","#fdb4a1",-1],[-1,"#cf6f5d","#b75a46","#884433","#b3604a","#d7775e","#ef8b73","#fc9b85","#feab97","#fdaf9e","#ef9582","#cb634c","#e48773","#fdb1a3","#f6a998","#fba892","#febaaa","#feb6a7","#feb5a5","#feb19b","#fbb29d","#f2bcb1","#f8b7a8","#feb8a8",-1],[-1,"#9e564a","#b24b38","#964e38","#ac5c45","#cf7257","#ed8f76","#fca48d","#feb29f","#fdb9ac","#f2927d","#c46451","#c26e5e","#f5ac9e","#f09380","#fa9f8b","#ffbaaa","#febeb1","#febaac","#feb5a4","#fab3a0","#f1b9ab","#f8b5a8","#fab3a3",-1],[-1,"#412621","#bc624e","#974432","#a1553e","#c67055","#ed967e","#f9a78e","#feb39b","#fea590","#f78875","#e27664","#e28070","#f7a495","#f79585","#fd9788","#ffac97","#febaab","#feb9aa","#ffb6a7","#fab4a2","#f1b6a6","#f9ad99","#c49389",-1],[-1,"#251713","#c87a65","#b1644e","#99513c","#c16e54","#e69578","#f8aa8d","#fb967c","#f9907a","#f58a77","#f08976","#f49b8a","#faa99c","#f79f8e","#f9937f","#fda18e","#feb59c","#ffbba5","#feb7a5","#f7b4a2","#f2b7a5","#f9c5b6","#493b39",-1],[-1,-1,"#3b2420","#9f5f51","#99543e","#c06d4e","#df896a","#eb8663","#f19274","#ec947c","#e98b79","#f19386","#fa9c93","#fca299","#fba195","#fa9e91","#f8ab95","#fdaa93","#feb39a","#fdb7a4","#f6b5a0","#e7ae9e","#daa59a",-1,-1],[-1,-1,"#000","#c88","#68392a","#bf6b4d","#da8164","#e88d70","#f0a484","#ea8b7a","#d36059","#de6462","#ea6d6d","#ec706f","#ed6c6a","#ef7c76","#fba694","#fbb298","#feb39a","#fcb6a1","#f7b49e","#6c4f46","#322",-1,-1],[-1,-1,-1,"#111","#583023","#bb674a","#d67d61","#e9957b","#ee9a7a","#f58f7b","#f3907d","#f79a8b","#faa69b","#fca89f","#fda69d","#fda99b","#feb09d","#fcb79d","#fdb69f","#fcb5a0","#f6b59f","#664c44",-1,-1,-1],[-1,-1,-1,-1,"#543128","#af6046","#ce765a","#e18c70","#e59274","#f09880","#f79a80","#f9a28d","#faa292","#fba596","#fdb09f","#feb19f","#feb09b","#fab198","#fab49c","#fbb39d","#d69d8d",-1,-1,-1,-1],[-1,-1,-1,-1,-1,"#a15843","#c16e50","#d37e5e","#d48363","#dd8b73","#ec8d77","#f89a88","#fda599","#fda99d","#fca898","#fcab9a","#f7ab94","#f2ac93","#f8b49d","#f8b4a1",-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,"#b05f42","#c47453","#c1714e","#c4745a","#df8671","#f6a493","#fbb5aa","#fbb2a6","#f8a798","#f4a492","#e99b85","#eca791","#f4b29d",-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,"#bd6f4f","#bd745a","#d68973","#eea391","#f6b0a0","#f4ae9e","#f3a997","#e99d8a","#e29e89",-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

const pattern_line_1 = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
    [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_line_2 = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1],
    [-1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_star = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, -1],
    [-1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, -1],
    [-1, -1, -1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_heart = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_plus = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, -1],
    [-1, -1, -1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_diamond = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [-1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [-1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [-1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [-1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_r_cross = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 1, 0, 0, 0, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1],
    [-1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [-1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [-1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [-1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [-1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [-1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [-1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [-1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1],
    [-1, -1, -1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 1, 1, 0, 0, 0, 1, -1, -1, -1, -1, -1],
];

const pattern_l_cross = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 1, 1, 0, 0, 0, 1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, -1, -1],
    [-1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1],
    [-1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [-1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [-1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [-1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [-1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [-1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [-1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [-1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [-1, -1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1],
    [-1, -1, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, -1, -1],
    [-1, -1, -1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 1, 0, 0, 0, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_adidas = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1,
    ],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, "#000000", 0, 0, 0, 0, 0, -1, -1],
    [
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        -1,
    ],
    [
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
    ],
    [
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
    ],
    [
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
    ],
    [
        -1,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
    ],
    [
        -1,
        0,
        0,
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
    ],
    [
        -1,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
    ],
    [
        -1,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
    ],
    [
        -1,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
    ],
    [
        -1,
        0,
        0,
        0,
        0,
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        0,
        0,
        0,
    ],
    [
        -1,
        -1,
        0,
        0,
        0,
        0,
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        0,
        0,
        0,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        "#004cff",
        0,
        0,
        0,
        0,
        -1,
        -1,
    ],
    [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1],
];

const pattern_soccer_ball = [
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
    ],
    [
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
    ],
    [
        -1,
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        -1,
    ],
    [
        -1,
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        -1,
    ],
    [
        -1,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        -1,
    ],
    [
        -1,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        -1,
    ],
    [
        -1,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        -1,
    ],
    [
        -1,
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        -1,
    ],
    [
        -1,
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        -1,
    ],
    [
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
    ],
    [
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        0,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        0,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
    ],
    [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1,
    ],
];

const patterns = [
    { name: "default", pattern: pattern_default, score: 90 },
    { name: "adidas", pattern: pattern_adidas, score: 1 },
    { name: "line_1", pattern: pattern_line_1, score: 40 },
    { name: "line_2", pattern: pattern_line_2, score: 40 },
    { name: "star", pattern: pattern_star, score: 15 },
    { name: "heart", pattern: pattern_heart, score: 10 },
    { name: "plus", pattern: pattern_plus, score: 30 },
    { name: "diamond", pattern: pattern_diamond, score: 25 },
    { name: "r_cross", pattern: pattern_r_cross, score: 30 },
    { name: "l_cross", pattern: pattern_r_cross, score: 30 },
    { name: "soccer_ball", pattern: pattern_soccer_ball, score: 90 },
];
