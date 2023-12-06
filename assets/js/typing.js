export async function type(node, ...args) {
    for (const arg of args) {
        switch (typeof arg) {
            case 'string':
                await edit(node, arg);
                break;
            case 'number':
                await wait(arg);
                break;
            case 'function':
                await arg(node, ...args);
                break;
            default:
                await arg;
        }
    }
}

async function edit(node, text) {
    const overlap = getOverlap(node.textContent, text);
    await perform(node, [...deleter(node.textContent, overlap), ...writer(text, overlap)]);
}

async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function perform(node, edits, speed = 60) {
    for (const op of editor(edits)) {
        op(node);
        await wait(speed + speed * (Math.random() - 0.5));
    }
}

export function* editor(edits) {
    for (const edit of edits) {
        yield (node) => requestAnimationFrame(() => node.textContent = edit);
    }
}

export function* writer([...text], startIndex = 0, endIndex = text.length) {
    while (startIndex < endIndex) {
        yield text.slice(0, ++startIndex).join('');
    }
}

export function* deleter([...text], startIndex = 0, endIndex = text.length) {
    while (endIndex > startIndex) {
        yield text.slice(0, --endIndex).join('');
    }
}

export function getOverlap(start, [...end]) {
    return [...start, NaN].findIndex((char, i) => end[i] !== char);
}

const target = document.getElementById('subtitle');
const steps = [
    2000, 'machine learning',
    2000, 'NLP',
    2000, 'time series',
    2000, 'Python ~3.11',
    2000, 'data analysis',
    2000, 'applied math',
    2000, 'Kotlin, Compose',
    2000, 'Java, Spring',
    2000, 'her cute smile',
];
type(target, ...steps, type);