# pluralsightJS
Scripts to make some of Pluralsight's behavior less annoying (a/k/a "better").

## SkipWaits.js
In the Pluralsight app, lessons within a module move smoothly (and instantly) from one lesson to the next. In the desktop app, however, at the end of each lesson there is a prompt to move to the next lesson which will automatically trigger after a short delay (~3 seconds). I hate this delay.

This script uses a MutationObserver to monitor the node tree for changes, detect the display of the "Next lesson" button, and click it automatically. Similarly, at the end of each module, it will automatically start the next module.

### Usage
Launch a course, then copy and paste the script into the console in your web browser. 

By default, the properties `goToNextLesson` and `goToNextModule` are both true. If you only want to skip the wait after each lesson, and you don't automatically want to start the next module, set `skipWaits.goToNextModule=false;`. Similarly, if you want to keep the wait after each lesson, but automatically start the next module, set `skipWaits.goToNextLesson=false;`. To stop the script entirely, call `skipWaits.release();`.
