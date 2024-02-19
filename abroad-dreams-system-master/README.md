# Abroad Dreams ::: Consultancy Management System

## About

This is an academic project developed by Coders Brigade of Batch 33c (Softwarica College). It is a web application that allows students to view courses and upload profile information, and allows counselors to view their courses and students. Additionally, it allows admins to create courses, isntitution and assign students to courses.


### Install node modules

npm install


### Run the frontend

In terminal, run the following command to start the frontend server:

npm run dev

### Before running the backed


After successful run, change the value In application.properties, change 'spring.flyway.enabled=false' to 'spring.flyway.enabled=true' and re-run the project so that all the required credentials gets loaded into the project:

#Initial (First Run)
spring.flyway.enabled=false

#Second-Run:
spring.flyway.enabled=true


### Credentials
Email: abroad.dreams.com@gmail.com
Password: admin123

To reset, simply use the forgot-password feature. Reset link will be sent in email.
