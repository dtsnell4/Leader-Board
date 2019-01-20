## PGA Leader Board Project

## Demo
View the live demo [here](https://dtsnell4.github.io/Leader-Board/).

**Notes:**
* React components are seperated into two direcotries, "containers" for the stateful components, and "components" for the stateless/presentational components. 
* Added a "Loading" message while the app looks for any saved data.  If none is found it will display an empty state message. 
* The same modal is used for adding/editing.  The edit feature only allows editing the score (mainly for demonstration purposes, though I doubt players change their names in the middle of a tournament).
* Players are saved to localStorage for convenience.
* Wrote a function to sort the players object for demonstration purposes, rather than using a library like [sort-object](https://www.npmjs.com/package/sort-object).
* Used SASS for the CSS.

### Additional Packages Used

#### Bootstrap 4
Inlcudes Bootstrap 4 as the HTML and CSS framework.

#### Reactstrap
Includes [Reactstrap](https://reactstrap.github.io/components/alerts/) to import ready-made Bootstrap-React components.

#### Formik
[Formik](https://jaredpalmer.com/formik/docs/overview) is included as a simple React form builder, since redux would be overkill for this type of application.  
#### node-sass
Uses [node-sass](https://www.npmjs.com/package/node-sass) to compile SASS and import it as CSS into the project.

#### LocalForage
Since there is no backend to save data, I included [LocalForage](https://localforage.github.io/localForage/) to save the data locally.  This was simply to assist testing and evaluation, so you can refresh the page or close/reopen the window without having to type in all new data. 

