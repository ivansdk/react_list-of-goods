import { useState} from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
//  To avoid the original array mutation
  const visibleGoods = [...goods];

  if(sortType) {
    visibleGoods.sort((good1, good2) => {
      switch(sortType) {
        case SortType.ALPHABET:
          if(isReversed) {
            return good2.localeCompare(good1);
          }
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          if(isReversed) {
            return good2.length - good1.length;
          }
          return good1.length - good2.length;
      }
    })
  } else if(isReversed) {
    visibleGoods.reverse();
  }

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getReorderedGoods(goodsFromServer, {sortType, isReversed});
  console.log(sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button is-info", {"is-light": sortType !== SortType.ALPHABET})}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button is-success", {"is-light": sortType !== SortType.LENGTH})}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => {
            isReversed ? setIsReversed(false): setIsReversed(true);
          }}
        >
          Reverse
        </button>
        
        {(sortType !== SortType.NONE || isReversed) && (
          <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortType(SortType.NONE);
            setIsReversed(false);
          }}
        >
          Reset
        </button>
        )}
        
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good) => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
