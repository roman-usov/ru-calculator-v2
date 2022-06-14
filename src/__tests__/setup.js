import { Window } from 'happy-dom';
import * as fs from 'fs';
import { htmlStr } from './DOM';

// import * as path from 'path';

// const pathName = '../../index.html';

// const filePath = path.join(__dirname, pathName);

const window = new Window();
const document = window.document;

document.body.innerHTML = htmlStr;
