# Online Courses App
## Application for study

### The application consists of two pages:
- Preview courses page - which represents list of courses;
- Course details page - which represents the course details and lists of lessons.

By using react-router-dom implemented navigation between pages and redirecting.

### Preview courses page
The page displays a list of courses with pagination - 10 entities per page, sorted starting from the latest launch date.Each course preview card consists of a preview picture, a course title, a skills list, rating. On preview picture hover, if available, starts to play muted course preview video otherwise displays the course preview picture. Implemented fallback UI on videos and preview image load failure.
### Course details page
The page displays the course title, description, and list of lessons. Each lesson card consists of the lesson preview image, title, and description. Clicking on a video, if it's not locked, opens a modal window with the current video lesson which launches immediately. Implemented storing video progress, the point from which the video will launch next time. The video player control panel allows users to set video payback and enable picture-in-picture mode.
### State management
Redux store as a single source of truth keeps data from API calls and stores video progress state. In combination with Local Storage implemented logic to keep the data between sessions and set it to redux store, which allows to reduce API calls. Each entity saved to Local Storage has its own expiry date, if the data is outdated then API request is sent to update the content. 
### API calls
Redux thunks in combination with Axios are used in implementing API calls logics. Displays loader on loading status handles errors and displays its message. In order to get rid of redundant server calls and handle aborted requests implemented a logic that handles such cases with an Abort signal handler.
### Styles
Implemented simple responsive styles with Sass and BEM convention class naming. Responsiveness riched with grid, flex layout, and media queries.
### Additionally
In case of application crashing added Error Boundary to catch errors and show fallback UI.
