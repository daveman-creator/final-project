## SKY

Sky App is an application aimed at improving communication between teachers, students, and parents. With this app, anyone involved in a student’s education can stay connected, informed and engaged throughout the learning process. Homework, class schedules etc could be shared ensuring that everyone is up-to-date on the latest development in the student’s education.

## Description

On our landing page the user sees what SKY does and also the benefits of it. Next is a registration form where a username, email and password is to provide. 
On pressing Register button the data gets saved into our database and a session token is created. The Teacher is now on the main page where the grade name and grade code is created. The grade code is attached to the student and saved in the database . We use cloudinary for a hosting solution where a teacher can add a photo.
After this, the teacher proceeds to add students to their class using the first and last name. The information is stored in the database using an API route. The teacher can edit or delete a student from the class.  In the post page, the teacher can make a post an assignment or other important information. 
The student can login using their first name, last name and the grade code. On clicking login, their date is being fetched from the data base and accessed to ensure that student’s details are valid. Once this is done, they are directed to their class post page, where they can see all the post made by their teacher and they can also comment on any of the post.
The parents also can login in using their child’s information. In the same way, they can comment on the post of the teachers. But mostly keeping track of the school work of their children.
The next phase of the project is to enable the teacher upload files to their class post page and also to update the class picture once it is created.

## Main Technonolies Used to Build the App

- Next.js 
- Node.js 
- Typescript 
- Tailwind CSS 
- Daisy UI Componenets 
- Postgres 
- Figma 
- DrawSQL
-  Cloudinary

## The application is fully deployed on:

- FLY.IO: Fly.io
- Sign up at Heroku: https://www.fly.io.com/.
- Create a new App
- Choose a name and select the "Europe" Region
- Click "Connect to GitHub"
- Search for your repository and click on "Connect". Click on "Enable Automatic Deploys"
- Go to the Overview tab and click "Configure Add-On"
- Search for "Postgres" and select "FLY.io Postgres"
- Trigger a deploy by pushing your repo to GitHub


## Setup instructions
- Clone the repository with git clone <repo>
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Create a new file .env
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with yarn add dotenv-cli
- Run yarn install in your command line
- Run the migrations with yarn migrate up
- Start the server by running yarn dev


## SOME VISUALS

  ![Screenshot 2023-04-03 094259](https://user-images.githubusercontent.com/113430910/229444896-57be02ca-4649-40e2-9a41-810ccb5ed280.png)
  ![Screenshot 2023-04-03 094329](https://user-images.githubusercontent.com/113430910/229452421-0d1060e2-854c-4fe8-ae4c-db02fa5c2c69.png)
  ![Screenshot 2023-04-03 094433](https://user-images.githubusercontent.com/113430910/229452749-23c7f50f-db24-4fcd-8278-85defb56f14c.png)
  ![Screenshot 2023-04-03 094518](https://user-images.githubusercontent.com/113430910/229452952-4ecfb12d-2804-48d4-9f83-b076ecc291d5.png)


## Thanks For Viewing


