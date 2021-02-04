import {dataCards, blockForTemplateCards} from './constants.js';
import Card from '../components/Card.js';

dataCards.forEach(({name, link}) => {
  renderCard(name, link);
});

// create new Card and add in block for template Cards
export function renderCard(name, link) {
  const card = new Card(name, link, '.grid__elements');
  const cardElement = card.generateCard();

  blockForTemplateCards.prepend(cardElement);
}