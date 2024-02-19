
# <p align="center"><img src="https://github.com/Rajendrakhanal/MyPeace/assets/95162952/bf1dc4ce-cb2e-4263-bac2-dcd5dabb0d13" width=300 /></p>


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

- Login and SignUp
  <details>
    <summary> </summary>
    <img src="https://github.com/Rajendrakhanal/MyPeace/assets/95162952/08bdfcb1-861a-451c-b69e-60c24b4fc0a4" width=750/>
  </details>

  <details>
    <summary> </summary>
    <img src="https://github.com/Rajendrakhanal/MyPeace/assets/95162952/0c7856f7-5bca-4145-8597-3818e294c58c" width=750/>
  </details>

  <details>
    <summary> </summary>
    <img src="https://github.com/Rajendrakhanal/MyPeace/assets/95162952/bebba8dd-1456-4b7a-ae96-cc0ae499474f" width=750/>
  </details>

- Personalized Mental Health System
  <details>
    <summary> </summary>
    <img src="https://github.com/Rajendrakhanal/MyPeace/assets/95162952/ea58c3a8-bcb4-4037-8bf0-4680e673e6e7" width=750/>
  </details>
- Empathetic Conversations
  <details>
    <summary> </summary>
    <img src="https://github.com/Rajendrakhanal/MyPeace/assets/95162952/d4fc2cf7-a1d4-4a0a-a655-917d2e039ef4" width=750/>
  </details>

## Demo


[Mypeace Project Demo Video](https://github.com/Rajendrakhanal/MyPeace/assets/95162952/ce006bc1-abac-4273-b8da-c56c5b1a9b38)


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
