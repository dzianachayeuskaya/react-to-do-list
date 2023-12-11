import { ActionCreator } from 'redux';
import { RootState, Task } from './reducer';

export const ADD_TASK = 'ADD_TASK';
export type AddTaskAction = {
  type: typeof ADD_TASK;
  value: string;
};
export const addTask: ActionCreator<AddTaskAction> = (value: string) => ({
  type: ADD_TASK,
  value,
});

export const UPDATE_TASK = 'UPDATE_TASK';
export type UpdateTaskAction = {
  type: typeof UPDATE_TASK;
  updatedTask: Partial<Task>;
};
export const updateTask: ActionCreator<UpdateTaskAction> = (
  updatedTask: Partial<Task>
) => ({
  type: UPDATE_TASK,
  updatedTask,
});

export const UPDATE_TASK_VALUE = 'UPDATE_TASK_VALUE';
export type UpdateTaskValueAction = {
  type: typeof UPDATE_TASK_VALUE;
  updatedTask: Omit<Task, 'isChecked'>;
};
export const updateTaskValue: ActionCreator<UpdateTaskValueAction> = (
  updatedTask: Omit<Task, 'isChecked'>
) => ({
  type: UPDATE_TASK_VALUE,
  updatedTask,
});

export const DELETE_TASK = 'DELETE_TASK';
export type DeleteTaskAction = {
  type: typeof DELETE_TASK;
  id: string;
};
export const deleteTask: ActionCreator<DeleteTaskAction> = (id: string) => ({
  type: DELETE_TASK,
  id,
});

export enum EFilterActionKind {
  Add = 'Add',
  Delete = 'Delete',
}

export const CHANGE_FILTER_TAGS = 'CHANGE_FILTER_TAGS';
export type ChangeFilterTagsAction = {
  type: typeof CHANGE_FILTER_TAGS;
  filterTag: string;
  kind: EFilterActionKind;
};
export const changeFilterTags: ActionCreator<ChangeFilterTagsAction> = (
  filterTag: string,
  kind: EFilterActionKind
) => ({
  type: CHANGE_FILTER_TAGS,
  filterTag,
  kind,
});

export const UPDATE_STATE = 'UPDATE_STATE';
export type UpdateStateAction = {
  type: typeof UPDATE_STATE;
  data: RootState;
};
export const updateState: ActionCreator<UpdateStateAction> = (
  data: RootState
) => ({
  type: UPDATE_STATE,
  data,
});
