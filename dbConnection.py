from flask import Flask, render_template
import pyodbc

carsales = Flask(__name__)


def connection():
    try:
        s = 'LAPTOP-AR1H4E0R\\SQLEXPRESS'  # Your server name
        d = 'chatbot'
        cstr = (
    r'DRIVER={SQL Server Native Client 11.0};'
    r'SERVER= LAPTOP-AR1H4E0R\SQLEXPRESS;'
    r'DATABASE=chatbot;'
    r'Trusted_Connection=yes;'
)
        conn = pyodbc.connect(cstr)
        cursor = conn.cursor()
        print(conn)
        # cursor = conn.cursor()
        if(conn):
            print("connected successfully")
        else:
            print("not success")

        return conn
    except Exception as e:
        print(e)
    

connection()
