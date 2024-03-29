// estrutura trainercard
var trainercard = [{
	'id': data.id,
     'name': data.username,
	'region': data.region,
	'hometown': data.city,
	'money': data.money,
	'pokedex': '',
	'badges': '',
	'trainer': data.avatar,
	'pokemon1': '',
	'pokemon2': '',
	'pokemon3': '',
	'pokemon4': '',
	'pokemon5': '',
	'pokemon6': ''}]


// arrays de carga
let trainer = [];
var pokemon = [];
var badge = [];

// variaveis de carga
let card;
let myFont;

// precarga
function preload() {
	var cnv = createCanvas(canvasW, canvasH);
	cnv.parent("trainer-card-div")
	cnv.id("trainer-card")
	// carregando template do cartao
	card	= loadImage('/img/card.png');

	// carregando treinadores
	for (i = 0; i < 1; i++){
		trainer[i] = {
			image: loadImage(`/img/avatar/${data.avatar}`),
			name: `trainer${i}.png`
		};
	}

	// carregando pokemons
	for (i = 0; i < 252; i++){
		pokemon[i] = loadImage('/img/pokemon/pokemon' + i + '.png')
	}

	// carregando insigneas (kanto)
	for(i = 0; i < 8; i++){
		badge[i] = loadImage('/img/badges/kanto/kanto' + i + '.png');
	}

	// carregando insigneas (johto)
	for(i = 8; i < 16; i++){
		badge[i] = loadImage('/img/badges/johto/johto' + i + '.png');
	}

	// carregando fonte
	myFont = loadFont("/fonts/pokedex.ttf");

}

// variaveis de dimensoes
let canvasW = 456;
let canvasH = 432;

let pokegridW = 28;
let pokegridH = 222;

let offsetW = 84;
let offsetH = 68;

let size = 16;
let input;
let texto;
let botao;

function setup() {

	// inicializando com um trainer card padrao
	CreateTrainer("qwerty");

	// inicializando tela
	let cnv = createCanvas(canvasW, canvasH);
	cnv.parent("trainer-card-div")
	cnv.id("trainer-card")
/*
	// inicializando texto
	texto = createElement('p', 'Trainer Name:');
	texto.style('color', color(255));

	// inicializando caixa de texto (input)
	input = createInput();
	input.value('');*/

	// inicializando botao
	saveButton = createButton('Descargar ID Card');
	saveButton.id("save-button")
	saveButton.parent("last-one")
	saveButton.mouseClicked(download);

	// escolhendo fontes
	textFont(myFont);
	textSize(size);

}

function draw() {
	//console.log(trainer[trainercard.trainer])
	// desenhando cartao
	image(card, 0, 0);

	// desenhando treinador
	//console.log(trainer[trainercard.trainer]);

	//IMAGEN DEL ENTRENADOR 
	//console.log(data);
	
	image(trainer[trainercard.trainer].image, 260, 170);

	// desenhando pokemons
	image(pokemon[trainercard.pokemon1], pokegridW,				pokegridH);
	image(pokemon[trainercard.pokemon2], pokegridW + (offsetW),		pokegridH);
	image(pokemon[trainercard.pokemon3], pokegridW + (offsetW*2),	pokegridH);
	image(pokemon[trainercard.pokemon4], pokegridW,				pokegridH + (offsetH));
	image(pokemon[trainercard.pokemon5], pokegridW + (offsetW),		pokegridH + (offsetH));
	image(pokemon[trainercard.pokemon6], pokegridW + (offsetW*2),	pokegridH + (offsetH));

	let sinDiacriticos = (function(){
		let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûç',
			 a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuuc',
			re = new RegExp('['+de+']' , 'ug');
	
		return texto =>
			texto.replace(
				re, 
				match => a.charAt(de.indexOf(match))
			);
	})();

	// ID
	text("IDNo. " + data.id, 263, 42);
	// NOME
	text("NAME: " + sinDiacriticos(data.username), 45, 84);
	// ORIGEN
	text(sinDiacriticos(data.city) + "  (" + sinDiacriticos(data.region) + ")", 45, 138); //
	// DINHEIRO
	text("MONEY: $" + data.money, 45, 170);
	// POKEDEX
	text("POKEDéX: " + 151, 45, 202);

	// desenhando insigneas
	let horizontal = 52;
	let offset = 48;
	let regionoffset = 0;
	if(trainercard.region == "Johto"){
		regionoffset = 8;
	}else{
		regionoffset = 0;
	}
	for(j = 0; j < trainercard.badges; j++){
		image(badge[j+regionoffset], horizontal + (j*offset), 380);
	}

}

// funcao PNRG que usa o hash como seed para determinar o treinador

function CreateTrainer(name) {

	var hash = sha256(name);

	trainercard.pokedex		= 			(parseInt('0x' + hash.substring(10, 14)) % 252);
	trainercard.badges		= 			(parseInt('0x' + hash.substring(15, 19)) % 9);
	trainercard.trainer		= 			(parseInt('0x' + hash.substring(20, 24)) % 1);
	//console.log(trainercard.trainer);
	trainercard.pokemon1	= 			(parseInt('0x' + hash.substring(25, 29)) % 252);
	trainercard.pokemon2	= 			(parseInt('0x' + hash.substring(30, 34)) % 252);
	trainercard.pokemon3	= 			(parseInt('0x' + hash.substring(35, 39)) % 252);
	trainercard.pokemon4	= 			(parseInt('0x' + hash.substring(40, 44)) % 252);
	trainercard.pokemon5	= 			(parseInt('0x' + hash.substring(45, 49)) % 252);
	trainercard.pokemon6	= 			(parseInt('0x' + hash.substring(50, 54)) % 252);

	return trainercard;
}

// funcao para calcular o hash (SHA-256)
var sha256 = function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}

	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)

	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj

			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}


	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}

	return result;
};

// chama CreateTrainer(input) toda vez que o teclado eh acionado
function keyReleased() {
	//CreateTrainer(input.value());
}

function download() {
	saveCanvas('trainercard', 'png');
}
