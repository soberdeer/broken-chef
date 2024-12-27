import React from 'react';
import RelatedRecipe from './components/RelatedRecipe/RelatedRecipe';

export function replaceText(text) {
  if (text.includes('Prepare')) {
    console.log(text)
  }
  return text?.replaceAll('<br>', '')
    .replaceAll(/[\r\n]/gm, '<br>')
    .replaceAll('<br><br> <br><br>', '<br><br>')
    .replaceAll('<br><br><br>', '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold; padding-top: 20px">$1</span>')
    .replace(/\[c (.*?)\]/g, '$1°C')
    .replace(/\[c (.*?)\]/g, '$1°C')
    .replace(/\[f (.*?)\]/g, (match, p1) => `${((parseFloat(p1) - 32) * (5 / 9)).toFixed(1)}°C`)
    .replace(/\*(.*?)\*/g, '<span style="font-weight: bold">$1</span>')
    .replace(/\[([\s\S]*)\]\(([\s\S]*)\)/g, '<a href="$2">$1</a>') || ''
}

export default function fixText(text, setArr, setText) {
  let newText = replaceText(text);
  if (newText.match(/\[fetchActivity ([^\s]+)\]/g)) {
    const arr = newText.match(/\[fetchActivity ([^\s]+)\]/g).map((string, i, a) => (
      <RelatedRecipe
        key={i}
        className={''}
        link={string.replace(/\[fetchActivity ([^\s]+)\]/g, '$1')}
        last={i === a.length}
      />
    ));
    setArr(arr);
    newText = newText.replace(/\[fetchActivity ([^\s]+)\]/g, '');
  }
  if (newText.replaceAll('<br>', '').length === 0) {
    setText('');
  } else {
    setText(newText)
  }
}
