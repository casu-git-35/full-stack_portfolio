# backend/app.py

import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_db_connection():
    """Establishes a connection to the database and returns the connection object."""
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT") # <--- THIS IS THE NEW, IMPORTANT LINE
    )
    return conn

@app.route("/")
def home():
    """The root endpoint, provides a simple welcome message."""
    return {"message": "Hello from the Python backend!"}

@app.route("/api/messages")
def get_messages():
    """The endpoint to fetch all messages from the database."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, content, created_at FROM messages ORDER BY created_at DESC;")
        messages_raw = cur.fetchall()
        cur.close()

        messages = []
        for row in messages_raw:
            messages.append({
                "id": row[0],
                "content": row[1],
                "created_at": row[2].isoformat()
            })

        return jsonify(messages)

    except Exception as e:
        print(f"Error connecting to database or fetching data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    
    finally:
        if conn is not None:
            conn.close()

if __name__ == "__main__":
    app.run(debug=True)