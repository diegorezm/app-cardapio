from flask import Flask, request
from flask_cors import CORS
import os
import psycopg2
from psycopg2 import OperationalError
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)

url = os.environ.get("DB_URL")


CREATE_FOOD_TABLE = (
    """CREATE TABLE IF NOT EXISTS cardapio(id SERIAL PRIMARY KEY, title TEXT, image_url TEXT, price INT)"""
)
INSERT_FOOD_TABLE = (
        """INSERT INTO cardapio (title, image_url, price) VALUES(%s,%s,%s) RETURNING id"""
        )

GET_FOOD = (
        """SELECT title FROM cardapio WHERE id=(%s)"""
        )

SELECT_ALL = "SELECT * FROM cardapio"
DELETE_FOOD = "DELETE FROM cardapio WHERE id = %s"

def create_connection():
    try:
        connection = psycopg2.connect(url)
        return connection
    except OperationalError as e:
        print(f"Error creating connection: {str(e)}")
        return None

def close_connection(connection):
    try:
        connection.close()
    except Exception as e:
        print(f"Error closing connection: {str(e)}")

@app.route("/api/food",methods=["GET"])
def get_food():
    conn = create_connection() 
    if not conn:
        return {"error": "Unable to establish a database connection."}, 500
    try:
        with conn:
            with conn.cursor() as curr:
                curr.execute(SELECT_ALL)
                rows = curr.fetchall()
        food_json = []
        for row in rows:
            item = {
                "id": row[0],
                "title": row[1],  
                "image_url": row[2],  
                "price": row[3],  
            }
            food_json.append(item)
        return {"Cardapio": food_json}
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": "An error occurred while fetching data."}
    finally:
        close_connection(conn)


@app.get("/api/food/<int:id>")
def get_food_id(id):
    conn = create_connection() 
    if not conn:
        return {"error": "Unable to establish a database connection."}, 500
    try:
        with conn:
            with conn.cursor() as curr:
                curr.execute(GET_FOOD,(id,))
                title = curr.fetchone()[0]
        return {"title": title}
    except Exception as e:
        return {"Error": str(e)}
    finally:
        close_connection(conn)

    
@app.post("/api/food")
def food_insert():
    conn = create_connection()
    if not conn:
        return {"error": "Unable to establish a database connection."}, 500
    try:
        data = request.get_json()
        title = data["title"]
        image = data["image_url"]
        price = data["price"]
        with conn:
            with conn.cursor() as curr:
                curr.execute(CREATE_FOOD_TABLE)
                curr.execute(INSERT_FOOD_TABLE, (title,image,price))
                id =  curr.fetchone()[0]
        return {"id": id, "message": f"Item {title} added to database."},201
    except Exception as e:
        return {"error":str(e)}
    finally:
        close_connection(conn)


@app.delete("/api/food/<int:id>")
def delete_food(id):
    conn = create_connection()    
    if not conn:
        return {"error": "Unable to establish a database connection."}, 500
    try:
     with conn:
        with conn.cursor() as curr:
            curr.execute(GET_FOOD,(id,))
            row = curr.fetchone()
            if not row:
                return {"message": f"Row with ID {id} not found"}, 404
            curr.execute(DELETE_FOOD,(id,))
        return {"message": f"Row with ID {id} deleted successfully"}, 200
    except Exception as e:
        return {"Error": str(e)}
    finally:
        close_connection(conn)

if __name__ == "__main__":
    app.run(debug=True)
