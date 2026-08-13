STUDENT REGISTRATION & RESULT MANAGEMENT SYSTEM
================================================

Files
-----
index.html  - Page structure and student registration form
style.css   - Responsive styling for desktop and mobile
script.js   - Validation, calculation, JSON conversion and Local Storage
README.txt  - These instructions

HOW TO RUN
----------
1. Extract the ZIP file into a folder.
2. Open the folder in Visual Studio Code.
3. Open index.html.
4. Right-click index.html and choose "Open with Live Server" if you have the
   Live Server extension installed. Alternatively, open index.html directly
   in Google Chrome.
5. Enter student details and whole-number marks from 0 to 100.
6. Click "Calculate & save result".
7. Check the result summary, JSON object, and saved student records.

PASS / FAIL RULE
----------------
Each of the five subjects is out of 100. A student passes only when they score
at least 35 in every subject. Total maximum marks = 500. Percentage =
(total marks / 500) * 100.

LOCAL STORAGE
-------------
Student records are saved in this browser's Local Storage. They remain in the
same browser profile until cleared by the user or browser data is removed.
They are not uploaded to a server and will not automatically appear on another
device or browser.

TESTING SUGGESTIONS
-------------------
- Try marks such as 80, 75, 90, 85, 70: expected total 400, percentage 80%.
- Try one subject below 35, such as 80, 75, 20, 85, 70: expected result FAIL.
- Try a mark greater than 100 or a negative mark: it should be rejected.
- Try submitting the same roll number twice: it should be rejected.
