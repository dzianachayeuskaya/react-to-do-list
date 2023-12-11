import { Reducer } from '@reduxjs/toolkit';
import {
  ADD_TASK,
  AddTaskAction,
  DELETE_TASK,
  DeleteTaskAction,
  CHANGE_FILTER_TAGS,
  ChangeFilterTagsAction,
  UPDATE_TASK,
  UPDATE_TASK_VALUE,
  UpdateTaskAction,
  UpdateTaskValueAction,
  EFilterActionKind,
  UpdateStateAction,
  UPDATE_STATE,
} from './actions';
import {
  getRandomAlphanumericString,
  getTagListAfterDeletion,
  getOriginalTags,
  getFormattedTags,
} from '../utils/utils';

export type Task = {
  id: string;
  value: string;
  isChecked: boolean;
};

export type RootState = {
  taskList: Task[];
  tagList: string[];
  filterTags: string[];
};

const initialState: RootState = {
  taskList: [],
  tagList: [],
  filterTags: [],
};

type Actions =
  | AddTaskAction
  | UpdateTaskAction
  | UpdateTaskValueAction
  | DeleteTaskAction
  | ChangeFilterTagsAction
  | UpdateStateAction;

export type TTagMatch<T extends string> = {
  [key in T]: number;
};
export const rootReducer: Reducer<RootState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TASK:
      const value = action.value;
      let newTags: string[] = [];

      if (value.includes('#')) {
        const tags = getOriginalTags(value);
        for (let newTag of tags) {
          if (!state.tagList.includes(newTag)) {
            newTags.push(newTag);
          }
        }
      }

      const newTask = {
        id: getRandomAlphanumericString(8),
        value: value.replaceAll('#', ''),
        isChecked: false,
      };

      return {
        ...state,
        taskList: [...state.taskList, newTask],
        tagList: [...state.tagList, ...newTags],
      };
    case UPDATE_TASK:
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.id === action.updatedTask.id) {
            return {
              ...task,
              isChecked:
                typeof action.updatedTask.isChecked !== 'undefined'
                  ? action.updatedTask.isChecked
                  : task.isChecked,
            };
          }
          return task;
        }),
      };
    case UPDATE_TASK_VALUE: {
      const deletedTags: Array<(typeof state.tagList)[number]> = [];
      const addedTags: string[] = [];
      const tagMatch: TTagMatch<(typeof state.tagList)[number]> = {};
      const updatedTags = getOriginalTags(action.updatedTask.value);

      const targetTask = state.taskList.find(
        (task) => task.id === action.updatedTask.id
      );
      const targetTags = getFormattedTags(targetTask?.value, state.tagList);
      targetTags.forEach((tag) => {
        if (!updatedTags.includes(tag)) {
          state.taskList.forEach((task) => {
            const tags = getFormattedTags(task.value, state.tagList);
            if (tags.includes(tag)) {
              tagMatch[tag] = (tagMatch[tag] || 0) + 1;
              deletedTags.push(tag);
            }
          });
        }
      });
      updatedTags.forEach((tag) => {
        if (!targetTags.includes(tag) && !state.tagList.includes(tag)) {
          addedTags.push(tag);
        }
      });

      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.id === action.updatedTask.id)
            return {
              ...task,
              value: action.updatedTask.value.replaceAll('#', ''),
            };
          else return task;
        }),
        tagList: [
          ...getTagListAfterDeletion(state.tagList, deletedTags, tagMatch),
          ...addedTags,
        ],
      };
    }
    case DELETE_TASK:
      const targetTagMatch: TTagMatch<(typeof state.tagList)[number]> = {};
      const targetTask = state.taskList.find((task) => task.id === action.id);
      const targetTags = getFormattedTags(targetTask?.value, state.tagList);
      state.tagList.forEach((tag) => {
        state.taskList.forEach((task) => {
          const tags = getFormattedTags(task.value, state.tagList);
          if (tags.includes(tag))
            targetTagMatch[tag] = (targetTagMatch[tag] || 0) + 1;
        });
      });

      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.id),
        tagList: getTagListAfterDeletion(
          state.tagList,
          targetTags,
          targetTagMatch
        ),
      };
    case CHANGE_FILTER_TAGS:
      switch (action.kind) {
        case EFilterActionKind.Add:
          return {
            ...state,
            filterTags: state.filterTags.includes(action.filterTag)
              ? [...state.filterTags]
              : [...state.filterTags, action.filterTag],
          };
        case EFilterActionKind.Delete:
          return {
            ...state,
            filterTags: state.filterTags.filter(
              (tag) => tag !== action.filterTag
            ),
          };
        default:
          return state;
      }
    case UPDATE_STATE:
      return {
        ...state,
        taskList: action.data.taskList,
        tagList: action.data.tagList,
      };
    default:
      return state;
  }
};
