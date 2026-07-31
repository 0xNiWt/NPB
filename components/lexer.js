export default function lexer(fullCode) {
    const keywords = ["val", "var", "writeL"];
    let pos = 0;
    let tokens = [];

    while (pos < fullCode.length) {
        const char = fullCode[pos];
        
        // ПРОБЕЛЫ
        
        if (/\s/.test(char)) {
            pos++;
            continue;
        }

        // КЛЮЧИ

        if (/[a-zA-Zа-яА-Я_]/.test(char)) {
            let word = "";
            
            while (pos < fullCode.length && /[a-zA-Zа-яА-Я0-9_]/.test(fullCode[pos])) {
                word += fullCode[pos];
                pos++;
            }

            if (keywords.includes(word)) {
                tokens.push({ type: "KEYWORD", value: word });
            } else {
                tokens.push({ type: "IDENTIFIER", value: word });
            }
            continue;
        }

        // ЦИФРЫ

        if (/[0-9]/.test(char)) {
            let number = "";
            
            while (pos < fullCode.length && /[0-9.]/.test(fullCode[pos])) {
                number += fullCode[pos];
                pos++;
            }

            tokens.push({ type: "NUMBER", value: number });
            continue;
        }

        // СКОБКИ

        if (char === '(') {
            tokens.push({ type: "LPAREN", value: char });
            pos++;
            continue;
        }

        if (char === ')') {
            tokens.push({ type: "RPAREN", value: char });
            pos++;
            continue;
        }

        // СТРОКА

        if (char === '"') {
            pos++;
            let str = "";
            while (pos < fullCode.length && fullCode[pos] !== '"') {
                str += fullCode[pos];
                pos++;
            }
            pos++;
            tokens.push({ type: "STRING", value: str });
            continue;
        }

        // ПРИСВАИВАНИЕ

        if (char === '=') {
            tokens.push({ type: "EQUALS", value: char });
            pos++;
            continue;
        }

        // ТОЧКА С ЗАПЯТОЙ

        if (char === ';') {
            tokens.push({ type: "SEMICOLON", value: char });
            pos++;
            continue;
        }
    }

    return tokens;
};