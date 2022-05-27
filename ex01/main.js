import {v2} from '@google-cloud/translate';
const {Translate} = v2;

import q from 'inquirer';

let text;
let target;

const args = process.argv.slice(2);
if (args.length === 2) {
  text = args[0];
  target = args[1];
} else {
  const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'Enter some text to translate:',
    },
    {
      type: 'input',
      name: 'target',
      message: 'What is the ISO-639-1 language code (https://cloud.google.com/translate/docs/languages)?',
    },
  ];
  ({text, target} = await q.prompt(questions));
}

const projectId = 'tpujals-node-client-demo';
const client = new Translate({projectId});

const [translation, md] = await client.translate(text, target);
console.log(translation);
