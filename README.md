## My-Store: Fullstack Final JB Project

Welcome to My-store, an e-commerce final project. This fullstack project is a web application developed using Django as backend, and React+Vite+TypeScript+MUI+redux-toolkit as frontend.

## Getting Started

Before setting up the project, ensure that you have:

- Python 3.9+
- NodeJS 16+
- NPM
- pip (Python package manager)
  
# Setting Up Back-End

1. Navigate to the `backend` directory:

```bash
cd my-store/backend
```

2. Create a new Python virtual environment:

```bash
python -m venv myenv
```

3. Activate the virtual environment:

    * On Windows, run:
    
    ```bash
    myenv\Scripts\activate
    ```

    * On MacOS/Linux, run:

    ```bash
    source myenv/bin/activate
    ```

4. Install the required dependencies:

```bash
pip install -r requirements.txt
```

5. Run the Django server:

```bash
python manage.py runserver
```

The API should now be accessible on `http://localhost:8000`.

6. To load initial data, stop the server (if it's running) with CONTROL-C and run the following command:

```bash
python manage.py load_products
```

This command populates the database with product data.

7. Afterwards, you can restart the server:

## Setting Up Front-End

1. Navigate on another terminal to the 'my-store' directory and then to the 'frontend' directory:

    ```bash
    cd my-store/frontend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the React server:

    ```bash
    npm run dev
    ```

The app should now be up and running at `http://localhost:5173`.

## Features
Add/remove items from cart
Upload/update profile picture
Filter products by category
Review an item that was purchased by the user
Checkout

## Future improvements
App dockerization
Better authentication
Better models

## Contributing
Ailin

## License
All rights reserved to JB?