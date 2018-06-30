/*
Simplest way would be to use *eval*, but the MDN documentation warns against using *eval* on grounds of security: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
Several articles & videos later: looks like the eval function can be hijacked and abused only if the user can change the input to anything they like. Restricting the user's ability to type into whatever field the eval function targets should works as a safeguard. 
For this project, if the user can only input a number or operator by clicking on a virtual key or only on the corresponding key on a keyboard, it should not be possible for any other text, including potentially harmful commands, to be evaluated by eval.
In sum: the security issue of using eval does not seem to arise in this calculator project.
Q: if users can only click on the virtual calculator's keys, but on their keyboard, how does that affect disabled users?

BUTTONS NEEDED: 
1.		0-9 (10 buttons)
2.		* / + - = . MC (7 buttons)
3.		18 buttons, one to spare. Use for either square or square root? UPDATE: use for square.
CAPABILITIES NEEDED:
1.		Addition, subtraction, multiplication, division
2.		Decimal numbers
3.		Clear the memory/display
4.		'Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.'

LAYOUT REQUIREMENTS:
1.		Readability: large keys, clear, legible font
2.		Accessibility: ever id should be descriptive. See ARIA codes

OTHER REQUIREMENTS:
1.		SECURITY: see warning about *eval* -- SORTED: make display box *readonly*. This prevents typing text, but possibly restricts accessibility. The FCC JS calculator tutorial I saw used *disabled*, but un unrelated video used 'readonly'. The latter, I found, returns data to the server for validation, so is superior to 'disabled' in terms of security when *eval* is used. NB: neither is foolproof, both are hackable. So a better calculator would have to incorporate more safeguards.

2.		DECIMAL POINT: works FINE, but how to prevent users from typing multiple decimal points? Currently, e.g. '20.58.999' is possible. Might be able to use a regex with the *pattern* attribute in form validation. E.g. 
 /[-+]?[0-9]+\.?[0-9]+/
I need a regex to specify the following pattern:
a. start with an optional (0 or 1, same as {0 1}) negative sign - this might be necessary if the user wants to turn a calculated negative number into a decimal one),
b. followed by one or more digits, 
c. followed by an optional ({0,1}) decimal separator,
d. followed by one or more digits. 
---Tried including the following in the .html, but it made no difference to the validation (nor did it impair functionality), presumably because the input type is set to 'text':
		<input type='text'  id='calcDisplay' readonly step='any' pattern='[-+]?[0-9]+(\.?)[0-9]+' title='ERROR!' required>
---Tried also including this in the .js:
function validateDisplay(){
	var v= displayBox.value;
	if (typeof v !== 'number'){
		displayBox.value = 'ERROR';
	}else{
	displayBox.value=v;
}
3.		'UNDEFINED' WHEN *=* IS CLICKED AND DISPLAY IS BLANK: tried with 'try-catch' to display '0' or 'ERROR' or even 'CLICK A NUMBER' when the '=' sign is clicked while the display is empty, but it didn't work. Perhaps the display should show '0' by default and have that deleted by user input? --- SORTED: tried out *isNan()* but eventually opted for *typeof*, which also catches 'undefined'.

MISC. NOTES
1. Backscpace symbol: &#9003; 
2. Superscript symbol: &#178;
3. All examples of simple JS calculators I've seen simply display the result of eval, but don't handle cases of 'undefined' nor multiple decimal points. My original, just as simple, function was this:

	function equalsFn(){
	e=eval(displayBox.value);
	displayBox.value=e;
}

SOURCES USED:
Symbols: 
https://tutorialehtml.com/en/html-symbols-character-chart/
Validation:
https://www.mkyong.com/javascript/check-if-variable-is-a-number-in-javascript/
Security:

https://www.youtube.com/watch?v=2507HL41-yI&index=7&list=PLCjfiOtazTkfcLdarSMpSB_mZFBrHDKwU&t=588s
Example JS calculator (FCC requirement video tutorial): https://www.youtube.com/watch?v=Jj9-194bKa0
*/


var displayBox = document.getElementById('calcDisplay');



function toDisplay(y){
	displayBox.value += y;
	if(y==='clearDisplay'){
		displayBox.value=' ';
	}
}

function backspace(){
	var x = displayBox.value;
	var z = x.slice(0, -1);
	displayBox.value =z;
}

/*
	For BACKSPACE, have seen solution using SUBSTRING, but that meant declaring a new var with length-1 etc., but don't see the need for that extra step, since SLICE takes negative values.
	*/

function squareFn(){
	var x = displayBox.value;
	var q = (x*x);
	displayBox.value = q;
}
	
	

function equalsFn(){
	var e = eval(displayBox.value);
	if (typeof e !== 'number'){
		displayBox.value = 'ERROR';
	}else{
	displayBox.value=e;
	}
}


/* VERSION 1 OF equalsFN - DID NOT CATCH DOUBLE DECIMALS
function equalsFn(){
	var e = eval(displayBox.value);
	var r = /\.{2, }/g;
	if (typeof e !== 'number' || e.match(r)){
		displayBox.value = 'ERROR';
	}else{
	displayBox.value=e;
	}
}
*/

/* VERSION 2 OF equalsFn - DID NOT CATCH DOUBLE DECIMALS EITHER
function equalsFn(){
	var e = eval(displayBox.value);
	var r = /\.{2, }/g;
	if (typeof e !== 'number' || (isNaN(e))){
		displayBox.value = 'ERROR';
	}else{
	displayBox.value=e;
	}
}
*/


