import fs from 'fs';
import lexer from './components/lexer.js';
import parser from './components/parser.js';

const npbAppName = process.argv[2];
const npbCompileName = npbAppName.replace('.npb', '.js');
const npbCode = fs.readFileSync(npbAppName, "utf-8");

const tokens = lexer(npbCode);
const ast = parser(tokens);

function generateValue(node) {
    if (node.type === "StringLiteral") {
        if (node.value.includes('${')) {
            return "`" + node.value + "`";
        } else {
            return JSON.stringify(node.value);
        }
    }
    if (node.type === "NumberLiteral") {
        return node.value;
    }
    if (node.type === "Identifier") {
        return node.name;
    }
    throw new Error(`Unknown value node type: ${node.type}`);
}

function transpilation(ast) {
    const code = [];

    for (const node of ast.body) {
        if (node.type === "VariableDeclaration") {
            if (node.kind === "val") {
                code.push(`const ${node.name} = ${generateValue(node.value)};`);
            } else if (node.kind === "var") {
                code.push(`let ${node.name} = ${generateValue(node.value)};`);
            } else {
                throw new Error(`Unknown variable declaration kind: ${node.kind}`);
            }
        } else if (node.type === "CallExpression") {
            if (node.callee === "writeL") {
                const args = node.arguments.map(generateValue).join(", ");
                code.push(`console.log(${args});`);
            } else {
                throw new Error(`Unknown call expression callee: ${node.callee}`);
            }
        }
    }

    return code.join("\n");
}

function compile() {
    fs.writeFileSync(npbCompileName, transpilation(ast), "utf-8");
    console.log(`${npbAppName} compiled successfully!`);
}

compile();