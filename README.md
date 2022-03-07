---
title: PAAS
author: Joshua Akande
date: today
...

# PAAS UI

This is the ui implementation  of PAAS

The UI was implemented with [Next.js](https://nextjs.org/), the programming language used was TypeScript

## Setting up the project

After cloning from the repo
- you would see a `.env.sample` file, ensure to duuplicate the file and rename the duplicate to `.env.local` the project needs the file to set up the App.

- run  
    ```bash
        npm install
        # or
        yarn install
    ```
    to install its node_module packages.
## Running the code

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Understanding the code
Below are the baisc the requirement the developer needs to have
- Framer 

    I used framer for animation my components and texts. It is a rich library for animation.
- Chakra ui
 
    The components consist of chakra ui components, It helps simplifcation of UI. I highly leveraged on the theming options that is css orchestration
- SWR 

    A React Hooks library for data fetching
- Typrscript which is the programming language used for the application
- Nextjs

    React framework

I added readme.md in each folder to give a brief explanation for how some components work for the the application