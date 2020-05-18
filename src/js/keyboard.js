let currentLanguage = 'Russian';

if (localStorage.Stored_Language !== null && localStorage.Stored_Language !== undefined) {
    currentLanguage = localStorage.Stored_Language;
}

let capsLockPressed = 'No';
const outputTextarea = document.querySelector('.search__field');
const mainArea = document.createElement('div');
mainArea.classList.add('keyboardMainArea');
document.body.append(mainArea);
const mainAreaRows = new DocumentFragment();

for (let i = 0; i < 5; i++) {
    const mainAreaRow = document.createElement('div');
    mainAreaRow.classList.add('Main_Area_Row');
    mainAreaRows.append(mainAreaRow);
}

mainArea.append(mainAreaRows);

for (let i = 0; i < 5; i++) {
    const tempRow = new DocumentFragment();
    for (let j = 0; j < 15; j++) {
        const Key = document.createElement('div');

        Key.classList.add('Key');
        tempRow.append(Key);
    }
    mainArea.children[i].append(tempRow);
}

mainArea.children[0].children[0].remove();
mainArea.children[2].children[0].remove();
mainArea.children[2].children[1].remove();
mainArea.children[3].children[0].remove();
mainArea.children[4].children[0].remove();
mainArea.children[4].children[1].remove();
mainArea.children[4].children[2].remove();
mainArea.children[4].children[3].remove();
mainArea.children[4].children[4].remove();
mainArea.children[4].children[5].remove();
mainArea.children[0].children[13].classList.add('Backspace');
mainArea.children[1].children[0].classList.add('Tab');
mainArea.children[1].children[14].classList.add('Delete');
mainArea.children[2].children[0].classList.add('CapsLock');
mainArea.children[2].children[12].classList.add('Enter');
mainArea.children[3].children[0].classList.add('ShiftLeft');
mainArea.children[3].children[12].classList.add('Arrow');
mainArea.children[3].children[13].classList.add('ShiftRight');
mainArea.children[4].children[0].classList.add('Control');
mainArea.children[4].children[1].classList.add('Windows');
mainArea.children[4].children[2].classList.add('Alt');
mainArea.children[4].children[3].classList.add('Space');
mainArea.children[4].children[4].classList.add('Alt');
mainArea.children[4].children[5].classList.add('Control');
mainArea.children[4].children[6].classList.add('Arrow');
mainArea.children[4].children[7].classList.add('Arrow');
mainArea.children[4].children[8].classList.add('Arrow');

const keyCodes = [
    [
        {
            Key_Code: 'Backquote', English: '`', Russian: 'ё', Output_Flag: true, CapsRus: 'Ё', CapsEng: '~',
        },
        {
            Key_Code: 'Digit1', English: '1', Russian: '1', Output_Flag: true, CapsRus: '!', CapsEng: '!',
        },
        {
            Key_Code: 'Digit2', English: '2', Russian: '2', Output_Flag: true, CapsRus: '"', CapsEng: '@',
        },
        {
            Key_Code: 'Digit3', English: '3', Russian: '3', Output_Flag: true, CapsRus: '№', CapsEng: '#',
        },
        {
            Key_Code: 'Digit4', English: '4', Russian: '4', Output_Flag: true, CapsRus: ';', CapsEng: '$',
        },
        {
            Key_Code: 'Digit5', English: '5', Russian: '5', Output_Flag: true, CapsRus: '%', CapsEng: '%',
        },
        {
            Key_Code: 'Digit6', English: '6', Russian: '6', Output_Flag: true, CapsRus: ':', CapsEng: '^',
        },
        {
            Key_Code: 'Digit7', English: '7', Russian: '7', Output_Flag: true, CapsRus: '?', CapsEng: '&',
        },
        {
            Key_Code: 'Digit8', English: '8', Russian: '8', Output_Flag: true, CapsRus: '*', CapsEng: '*',
        },
        {
            Key_Code: 'Digit9', English: '9', Russian: '9', Output_Flag: true, CapsRus: '(', CapsEng: '(',
        },
        {
            Key_Code: 'Digit0', English: '0', Russian: '0', Output_Flag: true, CapsRus: ')', CapsEng: ')',
        },
        {
            Key_Code: 'Minus', English: '-', Russian: '-', Output_Flag: true, CapsRus: '_', CapsEng: '_',
        },
        {
            Key_Code: 'Equal', English: '=', Russian: '=', Output_Flag: true, CapsRus: '+', CapsEng: '+',
        },
        {
            Key_Code: 'Backspace', English: 'Backspace', Russian: 'Backspace', Output_Flag: false, CapsRus: 'Backspace', CapsEng: 'Backspace',
        },
    ],

    [
        {
            Key_Code: 'Tab', English: 'Tab', Russian: 'Tab', Output_Flag: false, CapsRus: 'Tab', CapsEng: 'Tab',
        },
        {
            Key_Code: 'KeyQ', English: 'q', Russian: 'й', Output_Flag: true, CapsRus: 'Й', CapsEng: 'Q',
        },
        {
            Key_Code: 'KeyW', English: 'w', Russian: 'ц', Output_Flag: true, CapsRus: 'Ц', CapsEng: 'W',
        },
        {
            Key_Code: 'KeyE', English: 'e', Russian: 'у', Output_Flag: true, CapsRus: 'У', CapsEng: 'E',
        },
        {
            Key_Code: 'KeyR', English: 'r', Russian: 'к', Output_Flag: true, CapsRus: 'К', CapsEng: 'R',
        },
        {
            Key_Code: 'KeyT', English: 't', Russian: 'е', Output_Flag: true, CapsRus: 'Е', CapsEng: 'T',
        },
        {
            Key_Code: 'KeyY', English: 'y', Russian: 'н', Output_Flag: true, CapsRus: 'Н', CapsEng: 'Y',
        },
        {
            Key_Code: 'KeyU', English: 'u', Russian: 'г', Output_Flag: true, CapsRus: 'Г', CapsEng: 'U',
        },
        {
            Key_Code: 'KeyI', English: 'i', Russian: 'ш', Output_Flag: true, CapsRus: 'Ш', CapsEng: 'I',
        },
        {
            Key_Code: 'KeyO', English: 'o', Russian: 'щ', Output_Flag: true, CapsRus: 'Щ', CapsEng: 'O',
        },
        {
            Key_Code: 'KeyP', English: 'p', Russian: 'з', Output_Flag: true, CapsRus: 'З', CapsEng: 'P',
        },
        {
            Key_Code: 'BracketLeft', English: '[', Russian: 'х', Output_Flag: true, CapsRus: 'Х', CapsEng: '{',
        },
        {
            Key_Code: 'BracketRight', English: ']', Russian: 'ъ', Output_Flag: true, CapsRus: 'Ъ', CapsEng: '}',
        },
        {
            Key_Code: 'Backslash', English: '\\', Russian: '\\', Output_Flag: true, CapsRus: '/', CapsEng: '|',
        },
        {
            Key_Code: 'Delete', English: 'DEL', Russian: 'DEL', Output_Flag: false, CapsRus: 'DEL', CapsEng: 'DEL',
        },
    ],

    [
        {
            Key_Code: 'CapsLock', English: 'Caps Lock', Russian: 'Caps Lock', Output_Flag: false, CapsRus: 'Caps Lock', CapsEng: 'Caps Lock',
        },
        {
            Key_Code: 'KeyA', English: 'a', Russian: 'ф', Output_Flag: true, CapsRus: 'Ф', CapsEng: 'A',
        },
        {
            Key_Code: 'KeyS', English: 's', Russian: 'ы', Output_Flag: true, CapsRus: 'Ы', CapsEng: 'S',
        },
        {
            Key_Code: 'KeyD', English: 'd', Russian: 'в', Output_Flag: true, CapsRus: 'В', CapsEng: 'D',
        },
        {
            Key_Code: 'KeyF', English: 'f', Russian: 'а', Output_Flag: true, CapsRus: 'А', CapsEng: 'F',
        },
        {
            Key_Code: 'KeyG', English: 'g', Russian: 'п', Output_Flag: true, CapsRus: 'П', CapsEng: 'G',
        },
        {
            Key_Code: 'KeyH', English: 'h', Russian: 'р', Output_Flag: true, CapsRus: 'Р', CapsEng: 'H',
        },
        {
            Key_Code: 'KeyJ', English: 'j', Russian: 'о', Output_Flag: true, CapsRus: 'О', CapsEng: 'J',
        },
        {
            Key_Code: 'KeyK', English: 'k', Russian: 'л', Output_Flag: true, CapsRus: 'Л', CapsEng: 'K',
        },
        {
            Key_Code: 'KeyL', English: 'l', Russian: 'д', Output_Flag: true, CapsRus: 'Д', CapsEng: 'L',
        },
        {
            Key_Code: 'Semicolon', English: ';', Russian: 'ж', Output_Flag: true, CapsRus: 'Ж', CapsEng: ':',
        },
        {
            Key_Code: 'Quote', English: '\'', Russian: 'э', Output_Flag: true, CapsRus: 'Э', CapsEng: '"',
        },
        {
            Key_Code: 'Enter', English: 'Enter', Russian: 'Enter', Output_Flag: false, CapsRus: 'Enter', CapsEng: 'Enter',
        },
    ],

    [
        {
            Key_Code: 'ShiftLeft', English: 'Shift', Russian: 'Shift', Output_Flag: false, CapsRus: 'Shift', CapsEng: 'Shift',
        },
        {
            Key_Code: 'NoKey_Code', English: '\\', Russian: '\\', Output_Flag: true, CapsRus: '\\', CapsEng: '\\',
        },
        {
            Key_Code: 'KeyZ', English: 'z', Russian: 'я', Output_Flag: true, CapsRus: 'Я', CapsEng: 'Z',
        },
        {
            Key_Code: 'KeyX', English: 'x', Russian: 'ч', Output_Flag: true, CapsRus: 'Ч', CapsEng: 'X',
        },
        {
            Key_Code: 'KeyC', English: 'c', Russian: 'с', Output_Flag: true, CapsRus: 'С', CapsEng: 'C',
        },
        {
            Key_Code: 'KeyV', English: 'v', Russian: 'м', Output_Flag: true, CapsRus: 'М', CapsEng: 'V',
        },
        {
            Key_Code: 'KeyB', English: 'b', Russian: 'и', Output_Flag: true, CapsRus: 'И', CapsEng: 'B',
        },
        {
            Key_Code: 'KeyN', English: 'n', Russian: 'т', Output_Flag: true, CapsRus: 'Т', CapsEng: 'N',
        },
        {
            Key_Code: 'KeyM', English: 'm', Russian: 'ь', Output_Flag: true, CapsRus: 'Ь', CapsEng: 'M',
        },
        {
            Key_Code: 'Comma', English: ',', Russian: 'б', Output_Flag: true, CapsRus: 'Б', CapsEng: '<',
        },
        {
            Key_Code: 'Period', English: '.', Russian: 'ю', Output_Flag: true, CapsRus: 'Ю', CapsEng: '>',
        },
        {
            Key_Code: 'Slash', English: '/', Russian: '.', Output_Flag: true, CapsRus: ',', CapsEng: '?',
        },
        {
            Key_Code: 'ArrowUp', English: '▲', Russian: '▲', Output_Flag: true, CapsRus: '▲', CapsEng: '▲',
        },
        {
            Key_Code: 'ShiftRight', English: 'Shift', Russian: 'Shift', Output_Flag: false, CapsRus: 'Shift', CapsEng: 'Shift',
        },
    ],

    [
        {
            Key_Code: 'ControlLeft', English: 'Ctrl', Russian: 'Ctrl', Output_Flag: false, CapsRus: 'Ctrl', CapsEng: 'Ctrl',
        },
        {
            Key_Code: 'MetaLeft', English: 'En/Ru', Russian: 'En/Ru', Output_Flag: false, CapsRus: 'En/Ru', CapsEng: 'En/Ru',
        },
        {
            Key_Code: 'AltLeft', English: 'Alt', Russian: 'Alt', Output_Flag: false, CapsRus: 'Alt', CapsEng: 'Alt',
        },
        {
            Key_Code: 'Space', English: ' ', Russian: ' ', Output_Flag: true, CapsRus: ' ', CapsEng: ' ',
        },
        {
            Key_Code: 'AltRight', English: 'Alt', Russian: 'Alt', Output_Flag: false, CapsRus: 'Alt', CapsEng: 'Alt',
        },
        {
            Key_Code: 'ControlRight', English: 'Ctrl', Russian: 'Ctrl', Output_Flag: false, CapsRus: 'Ctrl', CapsEng: 'Ctrl',
        },
        {
            Key_Code: 'ArrowLeft', English: '◄', Russian: '◄', Output_Flag: true, CapsRus: '◄', CapsEng: '◄',
        },
        {
            Key_Code: 'ArrowDown', English: '▼', Russian: '▼', Output_Flag: true, CapsRus: '▼', CapsEng: '▼',
        },
        {
            Key_Code: 'ArrowRight', English: '►', Russian: '►', Output_Flag: true, CapsRus: '►', CapsEng: '►',
        },
    ],
];

function writeLettersOnKeys() {
    for (let i = 0; i < mainArea.children.length; i++) {
        for (let j = 0; j < mainArea.children[i].children.length; j++) {
            mainArea.children[i].children[j].dataset.Key_Code = keyCodes[i][j].Key_Code;
            mainArea.children[i].children[j].dataset.English = keyCodes[i][j].English;
            mainArea.children[i].children[j].dataset.Russian = keyCodes[i][j].Russian;
            mainArea.children[i].children[j].dataset.CapsEng = keyCodes[i][j].CapsEng;
            mainArea.children[i].children[j].dataset.CapsRus = keyCodes[i][j].CapsRus;
            mainArea.children[i].children[j].dataset.Output_Flag = keyCodes[i][j].Output_Flag;
            if (currentLanguage === 'English' && capsLockPressed === 'No') mainArea.children[i].children[j].textContent = keyCodes[i][j].English;
            if (currentLanguage === 'Russian' && capsLockPressed === 'No') mainArea.children[i].children[j].textContent = keyCodes[i][j].Russian;
            if (currentLanguage === 'English' && capsLockPressed === 'Yes') mainArea.children[i].children[j].textContent = keyCodes[i][j].CapsEng;
            if (currentLanguage === 'Russian' && capsLockPressed === 'Yes') mainArea.children[i].children[j].textContent = keyCodes[i][j].CapsRus;
        }
    }
}

function outputPrinting(letterForPrinting) {
    let Char = '';

    if (letterForPrinting.dataset.Output_Flag === 'false') return;
    if (currentLanguage === 'English' && capsLockPressed === 'No') Char = letterForPrinting.dataset.English;
    if (currentLanguage === 'Russian' && capsLockPressed === 'No') Char = letterForPrinting.dataset.Russian;
    if (currentLanguage === 'English' && capsLockPressed === 'Yes') Char = letterForPrinting.dataset.CapsEng;
    if (currentLanguage === 'Russian' && capsLockPressed === 'Yes') Char = letterForPrinting.dataset.CapsRus;

    outputTextarea.value += Char;
}

mainArea.addEventListener('mousedown', (event) => {
    let x = 0;

    if (event.target.classList.contains('Delete')) x = 1;
    if (event.target.classList.contains('Backspace')) x = 2;
    // if (event.target.classList.contains('Enter')) x = 3;
    if (event.target.classList.contains('ShiftLeft') || event.target.classList.contains('ShiftRight')) x = 4;
    if (event.target.classList.contains('Windows')) x = 5;
    switch (x) {
        case 1: // Delete
            {
                if (outputTextarea.selectionStart <= outputTextarea.value.length) {
                    outputTextarea.value = outputTextarea.value.slice(0, outputTextarea.selectionStart)
                        + outputTextarea.value.slice(outputTextarea.selectionStart, outputTextarea.value.length);
                    outputTextarea.setRangeText('', outputTextarea.selectionStart, outputTextarea.selectionStart + 1, 'end');
                }
                break;
            }
        case 2: // Backspace
            {
                let Text = outputTextarea.value;
                const selStart = outputTextarea.selectionStart;
                if (selStart > 0 && selStart <= Text.length) {
                    Text = Text.slice(0, selStart - 1) + Text.slice(selStart, Text.length);
                    outputTextarea.value = Text;
                    outputTextarea.selectionStart = selStart - 1;
                    outputTextarea.selectionEnd = selStart - 1;
                }
                break;
            }
        case 3: // Enter
            {
                outputTextarea.value += '\n';
                break;
            }
        case 4: // Shift
            {
                if (capsLockPressed === 'Yes') capsLockPressed = 'No';
                else capsLockPressed = 'Yes';
                writeLettersOnKeys();
                break;
            }
        case 5:
            {
                if (currentLanguage === 'English') {
                    currentLanguage = 'Russian';
                    localStorage.Stored_Language = 'Russian';
                } else {
                    currentLanguage = 'English';
                    localStorage.Stored_Language = 'English';
                }
                writeLettersOnKeys();
                break;
            }
    }
});

mainArea.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('Key')) {
        outputPrinting(event.target);
        event.target.classList.add('Button_Pressed');
    }
});

mainArea.addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('Key')) {
        event.target.classList.remove('Button_Pressed');
    }
});

mainArea.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('Key')) {
        event.target.classList.remove('Button_Pressed');
    }
});

mainArea.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('CapsLock')) {
        event.target.classList.add('Button_Pressed');
        if (capsLockPressed === 'Yes') capsLockPressed = 'No';
        else capsLockPressed = 'Yes';
        writeLettersOnKeys();
    }
});

mainArea.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('Tab')) {
        outputTextarea.value += '\t';
    }
});

mainArea.addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('ShiftLeft') || event.target.classList.contains('ShiftRight')) {
        if (capsLockPressed === 'Yes') capsLockPressed = 'No';
        else capsLockPressed = 'Yes';
        writeLettersOnKeys();
    }
});

writeLettersOnKeys();
