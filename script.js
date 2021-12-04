// Output field
let input = document.querySelector('.input');

// Insert symbol
function insert(num) {
    if (input.textContent == 0) {
        input.textContent = "";
        input.textContent += num;
    } else
        input.textContent += num;
}

// Clean output field
function clean() {
    input.textContent = "0";
}

// Delete symbol
function back() {
    let exp = input.textContent;
    input.textContent = exp.substring(0, exp.length - 1);
    if (input.textContent == 0) {
        input.textContent = "0";
    }
}

// switching INT to FLOAT mode
let mode = 'int';
let typeOfNum = document.querySelectorAll('.radio__btn');
for (let i = 0; i < typeOfNum.length; i++) {
    typeOfNum[i].addEventListener('click', function() {
        mode = typeOfNum[i].value;
        input.textContent = ""
    })
}


// switching the calculation mode with and without priority of operations
let priory = true;
let checkBox = document.querySelector('.checkbox');
checkBox.addEventListener('click', function() {
    if (checkBox.checked) {
        priory = true;
    } else {
        priory = false;
    }
    input.textContent = ""
})

// Calculate expression
let resultsArr = [];

function equal() {
    //With priory
    let str = input.textContent;

    if (str) {
        if (priory === true) {

            if (mode == 'int') {
                input.textContent = Math.round(eval(str));
                let result = str + '=' + Math.round(eval(str));
                resultsArr.push(result)
            } else {
                input.textContent = (eval(str));
                resultsArr.push(result)
            }

        } else {
            // Without priory
            let result = str;
            var chars = str.split("");
            var n = [],
                op = [],
                index = 0,
                oplast = true;

            n[index] = "";

            // Parse the expression
            for (var c = 0; c < chars.length; c++) {

                if (isNaN(parseFloat(chars[c])) && chars[c] !== "." && !oplast) {
                    op[index] = chars[c];
                    index++;
                    n[index] = "";
                    oplast = true;
                } else {
                    n[index] += chars[c];
                    oplast = false;
                }
            }

            // Calculate the expression
            str = parseFloat(n[0]);
            for (var o = 0; o < op.length; o++) {
                var num = parseFloat(n[o + 1]);
                switch (op[o]) {
                    case "+":
                        str = str + num;
                        break;
                    case "-":
                        str = str - num;
                        break;
                    case "*":
                        str = str * num;
                        break;
                    case "/":
                        str = str / num;
                        break;
                }
            }
            if (mode == 'int') {
                input.textContent = Math.round(str);
                result += '=';
                result += Math.round(str);
                resultsArr.push(result)
            } else {
                input.textContent = str;
                result += '=';
                result += str;
                resultsArr.push(result);
            }
        }

    }
    // console.log(resultsArr);
}

// function of outputting an array with the results to a pop-up window
let button__1 = document.querySelector('.button__1');
button__1.addEventListener('click', function() {
    alert(resultsArr);
});


// function of sending an array with results to the server
const sendData = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        throw new Error('Error');
    }

    return await response.json();
};

let button__2 = document.querySelector('.button__2');
button__2.addEventListener('click', function() {
    let jsonData = JSON.stringify(resultsArr);
    sendData('https://jsonplaceholder.typicode.com/posts', jsonData);
    // console.log(jsonData);
})