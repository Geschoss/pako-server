import { All } from './all';
import { Some } from './some';
import { Latest } from './latest';

const all = new All();
const some = new Some();
const latest = new Latest();

export const strategies = [all, some, latest];
