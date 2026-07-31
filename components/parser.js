export default function parser(tokens) {
    let pos = 0;
    let body = [];

    function parseVariableDeclaration() {
        const kind = tokens[pos].value;
        pos++;

        const name = tokens[pos].value;
        pos++;

        if (tokens[pos].type !== "EQUALS") {
            throw new Error(`Expected "=" but got ${tokens[pos].type}`);
        }
        pos++;

        const valueToken = tokens[pos];
        pos++;

        if (tokens[pos].type !== "SEMICOLON") {
            throw new Error(`Expected ";" but got ${tokens[pos].type}`);
        }
        pos++;

        let valueNode;
        if (valueToken.type === "NUMBER") {
            valueNode = { type: "NumberLiteral", value: parseFloat(valueToken.value) };
        } else if (valueToken.type === "STRING") {
            valueNode = { type: "StringLiteral", value: valueToken.value };
        } else {
            throw new Error(`Unexpected value token type: ${valueToken.type}`);
        }

        return { type: "VariableDeclaration", kind, name, value: valueNode };
    }

    function parseCallExpression() {
        const callee = tokens[pos].value;
        pos++;

        if (tokens[pos].type !== "LPAREN") {
            throw new Error(`Expected "(" but got ${tokens[pos].type}`);
        }
        pos++;

        const args = [];
        while (tokens[pos].type !== "RPAREN") {
            const argToken = tokens[pos];
            if (argToken.type === "STRING") {
                args.push({ type: "StringLiteral", value: argToken.value });
            } else if (argToken.type === "NUMBER") {
                args.push({ type: "NumberLiteral", value: parseFloat(argToken.value) });
            } else if (argToken.type === "IDENTIFIER") {
                args.push({ type: "Identifier", name: argToken.value });
            } else {
                throw new Error(`Unexpected argument token type: ${argToken.type}`);
            }
            pos++;
        }
        pos++;

        if (tokens[pos].type !== "SEMICOLON") {
            throw new Error(`Expected ";" but got ${tokens[pos].type}`);
        }
        pos++;

        return { type: "CallExpression", callee, arguments: args };
    }

    while (pos < tokens.length) {
        const token = tokens[pos];

        if (token.type === "KEYWORD" && (token.value === "val" || token.value === "var")) {
            body.push(parseVariableDeclaration());
            continue;
        }

        if (token.type === "KEYWORD" && token.value === "writeL") {
            body.push(parseCallExpression());
            continue;
        }

        throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
    }

    return { type: "Program", body: body };
}