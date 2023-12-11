# ToDoList

This application will allow you to organize your tasks and maintain a to-do list.

The app is available here: https://dzianachayeuskaya.github.io/react-to-do-list/

## Usage

**Creation**

To create a new case, you need to enter its description in the form. The case name must contain at least 4 characters. Adding to the list occurs by clicking on the Submit button or pressing Enter.

**Editing**

The description of a new task can be edited by clicking on the Pencil button; after changing the content of the task, saving occurs by clicking on Enter or by clicking outside the task. To-dos marked as completed become unavailable for editing. To make changes, you must uncheck the "Done" checkbox.

**Working with tags**

While creating and editing a note, the user can create tags using the # symbol. When editing a note, all words corresponding to tags are highlighted (the # symbol is added to the tag words). It is also possible to add new tags, delete old ones, and edit existing tags when editing the task description.

**Performance**

You can mark the completion of a task by clicking on the checkbox. Removing the progress status is implemented in the same way.

**Removal**

The task is deleted by clicking the Bin button.

**Displaying tasks of interest**

When creating and editing a note, it is possible to add new tags using the # symbol. All words corresponding to tags are highlighted when editing a note (the # symbol is added to the tag words). It is also possible to delete old and edit existing tags.

**Save on reboot**

When the page is reloaded, the tasks are saved.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
