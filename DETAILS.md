# Paginated Table

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How To Run Code Locally](#how-to-run-code-locally)
- [How does this work](#how-does-this-work)
- [Contact](#contact)

<!-- OVERVIEW -->

## Overview

Demo site can be found [here](http://paginated-table.vercel.app/). This has been a fun project to work on so far.

### Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [TypeScript](https://www.typescriptlang.org/)
- [Parcel](https://parceljs.org/docs/)

## How To Run Code Locally

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/EstherSeyi/paginated-table.git

# Install dependencies
$ npm i

# Run the app
$ npm run start
```

## How does this work

- On the browser
  After running code locally or navigating to the [demo site](http://paginated-table.vercel.app/);

  1. Click on `Next` button to load and view next set of data and `Previous` to go back.
  2. Current page number is displayed beside the `next` and `previous` buttons.

- On the codebase

  - The helpers folder contains the;

    1. display-table file which exports the `displayTableData(data, tableRef, init)` function. This function displays and updates the rows of the table based on data provided to it. This functions accepts two compulsory(the `data` and `tableRef`) and one optional argument (an boolean which says if the function is being called on initial load or on click of the navigation buttons).

    2. fetch file which abtracts the fetching operation. It fetches data based on the config detail provided. It also handles fetching activies like error sand loading situations. It takes five arguments the `request url`, `onSuccess`, `onError`, `onLoad` and `stopLoad` handlers.

  - The types folder contains the types file which returns `User` and `Data` types.

  - The app.ts file contain all the relevant operations including the initial fetch, the next and previous click event handlers.

## Contact

- LinkedIn [Esther Ogundijo](https://www.linkedin.com/in/seyi-ogundijo/)
- GitHub [EstherSeyi](https://github.com/EstherSeyi)
