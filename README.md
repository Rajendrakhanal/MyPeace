# <p align="center"><img src="" width=300 /></p>

<p align="center">
    <p align="center">
        <a href="https://github.com/Rajendrakhanal/MyPeace" target="blank">
            <img src="https://img.shields.io/github/watchers/Rajendrakhanal/MyPeace?style=for-the-badge&logo=appveyor" alt="Watchers"/>
        </a>
        <a href="https://github.com/Rajendrakhanal/MyPeace/fork" target="blank">
            <img src="https://img.shields.io/github/forks/Rajendrakhanal/MyPeace?style=for-the-badge&logo=appveyor" alt="Forks"/>
        </a>
        <a href="https://github.com/Rajendrakhanal/MyPeace/stargazers" target="blank">
            <img src="https://img.shields.io/github/stars/Rajendrakhanal/MyPeace?style=for-the-badge&logo=appveyor" alt="Star"/>
        </a>
    </p>
    <p align="center">
        <a href="https://github.com/Rajendrakhanal/MyPeace/issues" target="blank">
            <img src="https://img.shields.io/github/issues/Rajendrakhanal/MyPeace?style=for-the-badge&logo=appveyor" alt="Issue"/>
        </a>
        <a href="https://github.com/Rajendrakhanal/MyPeace/pulls" target="blank">
            <img src="https://img.shields.io/github/issues-pr/Rajendrakhanal/MyPeace?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
        </a>
    </p>
    <p align="center">
        <a href="https://github.com/Rajendrakhanal/MyPeace/blob/master/LICENSE" target="blank">
            <img src="https://img.shields.io/github/license/Rajendrakhanal/MyPeace?style=for-the-badge&logo=appveyor" alt="License" />
        </a>
    </p>
</p>

<p align="center">
</p>

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [License](#license)

## Features

  <details>
    <summary> </summary>
    <img src="" width=750/>
  </details>

  <details>
    <summary> </summary>
    <img src="" width=750/>
  </details>


  <details>
    <summary> </summary>
    <img src="" width=750/>
  </details>


## Demo

[Mypeace Project Demo Video]()

## Installation

### Prerequisites

Before running, Mypeace, you will need an OpenAI API key from Gemini Services. You can obtain an API key by registering on the Gemini platform.

### Setup

#### FrontEnd

1. Clone the repository:

   ```bash
   git clone 
   ```

2. Change directory to `frontend`

   ```bash
   cd client/
   ```

3. Installation of node packages

   ```bash
    npm i
   ```

4. Running the project:

   ```bash
   npm run dev
   ```

#### Backend

1. Change directory to `backend`

   ```bash
   cd backend/
   ```

2. Installation of node packages

   ```bash
    npm i
   ```

3. Setting up .env in root backend folder for saving openai api key

  - Create a .env file 
    
    ```bash 
      # inside .env file
    PORT=3000
    CONNECTION_STRING=mongodb://localhost:27017/mydatabase
    SECRET_KEY=********* # Your Secret_key
    OPENAI_API_KEY=******************************* # Your key 
    ```

4. Running the project:

   ```bash
   npm run dev
   ```


## Dependencies

### Frontend
- Vite
- React
- React Router
- React Icons
- shadcn/ui
- Tailwind CSS


### Backend
- nodejs


## License

This project is licensed under the [MIT License](/LICENSE).
