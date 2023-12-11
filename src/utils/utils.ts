import DBManager from './DBManager';
import { TTagMatch, Task } from '../store/reducer';
import { colors, punctuationMarks } from './const';

export function getRandomAlphanumericString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

interface IProportionFnArg {
  filteredTasksCount: number;
  allTasksCount: number;
}

export function tasksProportion({
  filteredTasksCount,
  allTasksCount,
}: IProportionFnArg) {
  return (filteredTasksCount / allTasksCount) * 100 + '%';
}

export function returnCompletedTaskCount(list: Task[]) {
  return list.filter((task) => task.isChecked).length;
}
export function returnActiveTaskCount(list: Task[]) {
  return list.filter((task) => !task.isChecked).length;
}

export function getColorClass(i: number) {
  const color = colors[i % 10];
  return `bg-${color}-50 text-${color}-700 ring-${color}-600/10 hover:bg-${color}-100 active:bg-${color}-200`;
}

export function getOriginalTags(value: string) {
  const tags = value
    .split(' ')
    .filter((word) => word.startsWith('#') && word.length > 1)
    .map((tag) => tag.replaceAll(punctuationMarks, ''));
  return [...new Set(tags)];
}
export function getFormattedTags(value: string = '', tagList: string[]) {
  const tags = value.split(' ').filter((word) => tagList.includes(word));
  return [...new Set(tags)];
}

export function getTagListAfterDeletion(
  tagList: string[],
  deletedTags: string[] = [],
  tagMatch: TTagMatch<(typeof tagList)[number]>
) {
  return tagList.filter((tag) => {
    return (
      !deletedTags?.includes(tag) ||
      (deletedTags?.includes(tag) && tagMatch[tag] !== 1)
    );
  });
}

const indexedDBManager = new DBManager('myDatabase', 'myStore');

export async function loadDataFromIndexedDB() {
  try {
    const db = await indexedDBManager.openDatabase();
    const transaction = db.transaction(['myStore'], 'readonly');
    const objectStore = transaction.objectStore('myStore');

    return new Promise((resolve, reject) => {
      const request = objectStore.get('todoListState');

      request.onsuccess = (event) => {
        const data = (event.target as any).result;
        resolve(data);
      };

      request.onerror = (event) => {
        reject((event.target as any).error);
      };
    });
  } catch (error) {
    console.error('Error opening IndexedDB:', error);
  }
}
