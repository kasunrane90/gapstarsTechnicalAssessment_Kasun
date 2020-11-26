# Gapstars Technical Assessment - Kasun (Posts App)
Technical Assessment for Senior Frontend Developer (Vue.JS)

## Solution approach

1. To improve the readability of the code, divided the post list and action list as two separate components.
2. Keep all the logic in PostHandler to avoid repeating codes in separate components.
3. Placed arrayMove function in a shared folder, as it can be reused in any components. Even Though it is only used in the PostHandler component here in the assignment, I wanted to keep the best practice of reusing codes. Hence I implemented it in the same way. 
4. Placed api url in a URL.ts file to improve the readability of the code.


## 3rd Party Libraries

1. Used axios for make http requests
2. Used Tailwind css as requirement is to use this library for stylings and also it is easy to manage.


## Steps to run the project

1. npm install
> Note: Make sure you have a compatible node version (12+ recommended) installed in your system.
2. npm run serve


## Steps to run unit tests

1. npm run test:unit
> Note : Unit testing has been only written for the components and functions with logics as per the requirement.
