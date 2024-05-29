import mysql.connector
import pandas as pd
import requests
import json 

incident_columns = ["incident_num","student_name","student_contact_no","student_email", "category","datetime",
                    "additional_info","area","lon","lat","time_of_day","day_of_week","year",
                    "month","day","hour","minute","second","week_of_year","is_weekend","is_holiday",
                    "is_schoolday"] 

def establish_sql_connection():
    db = mysql.connector.connect(
    host="db",
    user="root",
    password="root",
    port="3306",
    database="SECURITY"
    )
    return db

def get_all_incidents():
    db = establish_sql_connection()
    cursor = db.cursor()

    query = "SELECT * \
        FROM incidents\
        ORDER BY incident_num DESC"
    
    result = pd.DataFrame(columns=incident_columns)

    try:
        cursor.execute(query)
        result = cursor.fetchall()
        result = pd.DataFrame(result, columns=incident_columns)
    except Exception as e:
        print("e")

    cursor.close()
    db.close()
    
    return result.to_json(orient="records")

def add_incident(form):
    student_name = form['student_name']
    student_contact_no = form['student_contact_no']
    category = form['category']
    datetime = form['datetime']
    student_email = form['student_email']
    area = form['area']
    lon = form.get("lon")
    lat = form.get("lat")
    additional_info = form.get("additional_info")

    db = establish_sql_connection()
    cursor = db.cursor()

    if not lon:
        query = "SELECT * \
            FROM nusareas"
        result = pd.DataFrame(columns=("id", "area_name", "lat", "lon"))
        try:
            cursor.execute(query)
            result = cursor.fetchall()
            result = pd.DataFrame(result, columns=("id:", "area_name", "lat", "lon"))
            lon = result.loc[result["area_name"]==area].iloc[0]["lon"]
            lat = result.loc[result["area_name"]==area].iloc[0]["lat"]
        except Exception as e:
            print(e)

    if not lon:
        try:
            # Using OneMap API
            response = requests.get(f'https://developers.onemap.sg/commonapi/search?searchVal={area}&returnGeom=Y&getAddrDetails=Y&pageNum=1')
            response = json.loads(response.text)
            lon = response["results"][0]["LONGITUDE"]
            lat = response["results"][0]["LATITUDE"]
        
        except Exception as e:
            print(e)

    if not lon:
        lon = "NULL"
    if not lat:
        lat = "NULL"
    if not additional_info:
        additional_info = "NULL"
    else:
        additional_info = f"'{additional_info}'"

    query = f"\
        INSERT INTO incidents\
            (student_name, student_contact_no, category, datetime, student_email, area, lon, lat, additional_info)\
            VALUES ('{student_name}', '{student_contact_no}', '{category}', '{datetime}', '{student_email}', '{area}', {lon}, {lat}, {additional_info})"
    
    try:
        cursor.execute(query)
        db.commit()

    except Exception as e:
        print(e)

    cursor.close()
    db.close()

    return "Incident created"

def filter_incidents(args):
    db = establish_sql_connection()
    cursor = db.cursor()

    where_query = ""

    num_filters = sum(bool(x) for x in args.values())

    if num_filters:
        where_query = "WHERE "

    flag = False 

    for key in args.keys():
        if args.get(key):
            if key == "end_date":
                continue
            if flag:
                where_query += " AND"
            else:
                flag = True
            if key == "start_date":
                where_query += f"  datetime >= '{args.get('start_date')}' AND datetime <= '{args.get('end_date')}'"
                continue
            where_query += f" {key} = '{args.get(key)}'"

    query = f"SELECT *\
        FROM incidents\
        {where_query};"
        
    cursor.execute(query)
    result = cursor.fetchall()
    df = pd.DataFrame(result, columns=incident_columns)

    cursor.close()
    db.close()

    return df.to_json(orient="records")
    
def export_db():
    all_incidents = pd.read_json(get_all_incidents())
    return all_incidents.to_csv()

def delete_incident(request_json):
    incident_num = int(request_json["incident_num"])

    db = establish_sql_connection()
    cursor = db.cursor()

    query = f"\
        DELETE FROM incidents\
        WHERE incident_num = {incident_num}"
    
    cursor.execute(query)
    db.commit()

    cursor.close()
    db.close()

    return f"Record {incident_num} deleted."

def update_incident(form):
    num_updates = sum(bool(x) for x in form.values())

    incident_num = form.get("incident_num")

    if not incident_num:
        return "No incident number specified"

    if num_updates < 2:
        return "No valid update fields"

    db = establish_sql_connection()
    cursor = db.cursor()

    set_query = "SET "

    flag = False 

    for key in form.keys():
        if key == "incident_num":
            continue
        if form.get(key):
            if flag:
                set_query += ","
            else:
                flag = True
            set_query += f" {key} = '{form.get(key)}'"

    query = f"\
        UPDATE incidents\
            {set_query}\
            WHERE incident_num = {incident_num}"

    cursor.execute(query)
    db.commit()

    cursor.close()
    db.close()

    return f"Incident {incident_num} updated"



