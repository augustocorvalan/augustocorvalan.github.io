const simpleRules = {
 	"origin":["there is #var1.a# #deeper#"],
 	"deeper": ["#within#"],
 	"within": ["within #var2#"],
 	"var1": ["world", "mind", "maze", "void", "egg", "word", "mirror", "light"],
 	"var2":["our world", "our mind", "a maze", "a void", "an egg", "a word", "a mirror"]
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
	"margin": ["margin-bottom: #marginUnit#;"],
	"marginUnit": ['30rem','40rem','50rem'],
	"padding":['padding: #paddingUnit#'],
	"paddingUnit":['0rem','0.5rem','1rem','2rem'],
	"fontSize":['font-size: #fontUnits#;'],
	"fontUnits":['2rem','2rem','4rem','10rem']
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

function displayNewSentence(grammar) {
	const sentence = getSentence(grammar);
	const words = sentence.split(' ');
	const chunks = chunk(words, pick([3,2,4,7]));

	const wrapper = document.createElement('div');
	wrapper.classList.add('wrapper');
    wrapper.style = getSentence(classGrammar, '#margin#') + getSentence(classGrammar, "#fontSize#");

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
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	        // you're at the bottom of the page
	        if (!grammar) {
				// grammar = createGrammar(simpleRules);
				grammar = createGrammar(simpleRules);
				classGrammar = createGrammar(classRules);
			} 
			if (document.getElementsByClassName('wrapper').length > 1) {
				grammar = createGrammar(nestedRules);
			}
			const wrapper = displayNewSentence(grammar);
			body.append(wrapper);
		}
	}, 500);
}

window.addEventListener('load', main);


