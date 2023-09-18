import React from 'react';
import RelatedRecipe from './components/RelatedRecipe/RelatedRecipe';


export default function fixText(text, setArr, setText) {
  let newText = text?.replaceAll('<br>', '')
    .replaceAll(/[\r\n]/gm, '<br>')
    .replaceAll('<br><br><br>', '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<p style="font-weight: bold; padding-top: 20px">$1</p>')
    .replace(/\[c (.*?)\]/g, '$1°C')
    .replace(/\[f (.*?)\]/g, (match, p1) => `${((parseFloat(p1) - 32) * (5 / 9)).toFixed(1)}°C`)
    .replace(/\*(.*?)\*/g, '<span style="font-weight: bold">$1</span>')
    .replace(/\[link ([^\s]+) (.*?)\]/g, '<a href="$1">$2</a>') || '';

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
  setText(newText);
}
