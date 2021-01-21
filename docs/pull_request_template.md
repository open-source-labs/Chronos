References issue #. Please review this @teammember1, @teammember2.

# Types of changes
- [ ]  Bugfix (change which fixes an issue)
- [ ]  New feature (change which adds functionality)
- [ ]  Refactor (change which changes the codebase without affecting its external behavior)
- [ ]  Non-breaking change (fix or feature that would cause existing functionality to work as expected)
- [ ]  Breaking change (fix or feature that would cause existing functionality to not work as expected)
# Purpose
- Need to send either schema file or schema code to backend to generate new databases containing schema
- Generate and concat table and database list upon user instantiation of schema/database
- Enable modal interface for clear user input of schema
- Fix minor bugs causing lack of interaction with buttons/input fields
# Approach
- Removed the if else statement for changing databases within the query input ‘\c defaultDB’. At this time there is no way of changing databases in the application.
- Got rid of getConnectionString method on modal object and added that functionality into the changeDB method. No longer will have random console logged ‘undefined’ anymore.
- Created a getLists method on the modal object that queries the database twice. Once for the table list and second for the database list and returns them in an object of two arrays.
# Learning
- https://kb.objectrocket.com/postgresql/how-to-show-databases-in-postgresql-848#:~:text=The%20%5Cl%20command%20in%20psql,to%20achieve%20the%20same%20results.
- https://flaviocopes.com/postgres-how-to-list-tables-database/#:~:text=To%20list%20the%20tables%20in,SELECT%20table_name%20FROM%20information_schema.
# Screenshot(s)
![image](https://user-images.githubusercontent.com/9983876/104249836-10f3d000-5421-11eb-8b3e-a18646432d86.png)
