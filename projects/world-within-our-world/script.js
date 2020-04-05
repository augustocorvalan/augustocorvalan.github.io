const simpleRules = {
 	"origin":["there is #var1.a# within #var2#"],
 	"origin-more":["#origin#", "there is #var1-more.a# within #var2-more#"],
 	"origin-all":["there is #var1-all.a# within #var2-all#"],
 	"origin-nested": ["#origin-all#","#origin-all# within #var2-all#"],
 	"var1-all":['#var1#','#var1-more#','#var1-last#'],
 	"var2-all":['#var2#','#var2-more#','#var2-last#'],
 	"var1": ["world", "mind", "maze"],
 	"var1-more":["void","word","mirror"],
 	"var1-last":["egg","light","room"],
 	"var2":["our world", "our mind", "a maze"],
 	"var2-more":["a void","an egg","a word"],
 	"var2-last":["a mirror"]
}
const nestedRules = {
 	"origin":["there is #var1.a# #deeper#"],
 	"deeper": ["#within#", "#within# #within#"],
 	"within": ["within #var2#"],
 	"var1": ["world", "mind", "maze", "void", "egg", "word", "mirror", "light"],
 	"var2":["our world", "our mind", "a maze", "a void", "an egg", "a word", "a mirror"]
}
const classRules = {
	"origin": ["fade-#fade#"],
	"fade": ["in", "in-fwd", "in-bck"],
	"height":["height:#heightUnit#;"],
	"heightUnit":["100vh","75vh","66vh"],
	"margin": ["margin-bottom: #marginUnit#;"],
	"marginUnit": ['30rem','40rem','50rem'],
	"padding":['padding: #paddingUnit#'],
	"paddingUnit":['0rem','0.5rem','1rem','2rem'],
	"fontSize":['font-size: #fontUnits#;'],
	"fontUnits":['2rem','2rem','4rem','9rem'],
	"bg-color": ["background-color: #colors#;"],
	"colors":['rgb(243,164,170)', 'rgb(22,15,41)','rgb(178,35,45)', 'rgb(0,141,88)']
}


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
const pick = arr => {
	return arr[getRandom(0, arr.length-1)];
}
const chunk = (arr, size) =>
Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
	arr.slice(i * size, i * size + size)
	);

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrammar(rules) {
	return tracery && tracery.createGrammar(rules);
}

function getSentence(grammar, origin="#origin#") {
	return grammar.flatten(origin);
}

let classGrammar;
function createTextNode(text) {
    const container = document.createElement('div');
    container.classList.add('container');
    container.style = getSentence(classGrammar, '#padding#');

    const p = document.createElement('p');
    const entryClass = getSentence(classGrammar);
    p.classList.add(entryClass);
    p.innerHTML = text;

    container.appendChild(p);
    return container;
}

function displayNewWords(arr) {
	const words = arr.join(' ');
	const node = createTextNode(words);
	return node;
}

function getSentenceOrigin() {
	const iterations = document.getElementsByClassName('wrapper').length;
	const goesDeeper = iterations > 2;
	const goesAll = iterations > 5;
	const goesNested = iterations > 7;
	if(goesNested) {
		return '#origin-nested#'
	}
	if (goesAll) {
		return '#origin-all#'
	} 
	if (goesDeeper) {
		return '#origin-more#';
	} 
	return '#origin#';
}

function displayNewSentence(grammar) {
	const origin = getSentenceOrigin();
	console.log(origin)
	const sentence = getSentence(grammar, origin);
	const words = sentence.split(' ');
	const chunks = chunk(words, pick([3,2,4,7]));

	const wrapper = document.createElement('div');
	wrapper.classList.add('wrapper');
    wrapper.style = getSentence(classGrammar, '#margin#') + getSentence(classGrammar, "#fontSize#");
    // wrapper.style = getSentence(classGrammar, '#height#') + getSentence(classGrammar, "#fontSize#");

	repeatingFunc();
	function repeatingFunc() {
		const node = displayNewWords(chunks.shift())
		wrapper.append(node);
		if (chunks.length) {
			setTimeout(repeatingFunc,500);
		}
	}

	return wrapper;
}

function main() {
	let grammar;
	const page = document.getElementsByTagName('html')[0];
	const body = document.getElementById('body');

	window.onscroll = debounce(function(ev) {
		const numberOfIterations = document.getElementsByClassName('wrapper').length;
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	        // you're at the bottom of the page
	        if (!grammar) {
				// grammar = createGrammar(simpleRules);
				grammar = createGrammar(simpleRules);
				classGrammar = createGrammar(classRules);
			} 
			if (document.getElementsByClassName('wrapper').length > 1) {
				grammar = createGrammar(simpleRules);
			}
			const wrapper = displayNewSentence(grammar);
			body.append(wrapper);
			console.log(numberOfIterations)
			if ((numberOfIterations + 1) % 1 === 0) {
				console.log(getSentence(classGrammar, '#bg-color#'));
				body.style = getSentence(classGrammar, '#bg-color#');
			}
		}
	}, 500);
}

window.addEventListener('load', main);


