import { MainMenu } from './MainMenu';
import { ShowDeck } from './ShowDeck';

import { AddDate } from './AddDate';

import { AddCard } from './add/Add';
import { FillWord } from './add/FillWord';
import { FillTranscription } from './add/FillTranscription';
import { FillDescription } from './add/FillDescription';
import { FillPos } from './add/FillPos';
import { SaveCard } from './add/SaveCard';

import { SelectStrategy } from './play/SelectStrategy';
import { Playing } from './play/Playing';
import { Success } from './play/Success';
import { GameOver } from './play/GameOver';

export const states = {
  MainMenu,
  AddDate,
  ShowDeck,
  Playing,
  SelectStrategy,
  Success,
  GameOver,
  AddCard,
  FillTranscription,
  FillDescription,
  FillWord,
  SaveCard,
  FillPos,
};
