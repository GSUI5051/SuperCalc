let operand1 = OmegaNum(0);
let operand2 = OmegaNum(0);
let operation = '';
let clearOnNext = false;
let typingTo = 'in1';

function insert(input) {
	if (clearOnNext) {
		c();
		clearOnNext = false;
	}
	document.getElementById('eq').innerHTML = '';
	document.getElementById(typingTo).innerHTML = document.getElementById(typingTo).innerHTML + input;
}

function c() {
	document.getElementById('in1').innerHTML = '';
	document.getElementById('in2').innerHTML = '';
	document.getElementById('op').innerHTML = '';
	document.getElementById('out').innerHTML = '';
	document.getElementById('eq').innerHTML = '';
	operand1 = OmegaNum(0);
	operand2 = OmegaNum(0);
	operation = 'add';
	clearOnNext = false;
	typingTo = 'in1';
}

function back() {
	document.getElementById('eq').innerHTML = '';
	if (document.getElementById(typingTo).innerHTML != '') {
		document.getElementById(typingTo).innerHTML = document.getElementById(typingTo).innerHTML.substr(0, document.getElementById(typingTo).innerHTML.length - 1);
		clearOnNext = false;
	}
}

function op(o) {
	document.getElementById('eq').innerHTML = '';
	if (document.getElementById(typingTo).innerHTML != '') {
		if (typingTo == 'in1') {
			operand1 = OmegaNum(document.getElementById(typingTo).innerHTML);
			operation = o;
			document.getElementById('op').innerHTML = toSymbol(operation);
			typingTo = 'in2';
			clearOnNext = false;
		} else {
			if (document.getElementById('in2').innerHTML != '') {
				document.getElementById('out').innerHTML = '';
				operand1 = OmegaNum(document.getElementById('in1').innerHTML);
				operand2 = OmegaNum(document.getElementById('in2').innerHTML);
				document.getElementById('in1').innerHTML = operand1[operation](operand2).toString();
				operation = o;
				document.getElementById('op').innerHTML = toSymbol(operation);
				document.getElementById('in2').innerHTML = '';
				clearOnNext = false;
			}
		}
	}
}

function toSymbol(o) {
	console.log(o);
	switch (o) {
		case 'add':
			return '+';
		case 'sub':
			return '-';
		case 'mul':
			return '*';
		case 'div':
			return '/';
		case 'pow':
			return '^';
		case 'tetr':
			return '^^';
	}
}

function equals() {
	if (document.getElementById('in2').innerHTML != '') {
		if (operation == '') operation = 'add';
		document.getElementById('eq').innerHTML = '=';
		operand2 = OmegaNum(document.getElementById('in2').innerHTML);
		document.getElementById('out').innerHTML = operand1[operation](operand2).toString();
		clearOnNext = true;
	}
}

hyp = function(num) {
	let x = new OmegaNum(num).floor();
	let a = [...x.array];
	if (x.lt(1e6)) {
		return x.toString();
	}
	if (x.lt('ee6')) {
		if (a[1] == 1) {
			return 'E' + Math.floor(a[0]);
		} else {
			return 'E' + Math.floor(Math.log10(a[0]));
		}
	}
	let str = 'E';
	for (let i = 2; i < a.length; i++) {
		a[i]++;
	}
	if (a[0] < 1e6) {
		str += Math.floor(a[0]);
	} else {
		a[1]++;
		str += Math.floor(Math.log10(a[0]));
	}
	for (let i = 1; i < a.length; i++) {
		str += '#';
		if (a[i] < 1e6) {
			str += Math.floor(a[i]);
		} else {
			str += hyp(a[i]);
		}
	}
	return str;
}