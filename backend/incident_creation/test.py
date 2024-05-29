import requests
import json

def init_mock_data():
    ls = [
        {"student_name":"Test Student1", "student_contact_no":"12345678", "student_email": "1@gmail.com", "category": "TestCategory1", "datetime":"2023-10-30 14:30:00", "lat":"1.3002", "lon":"103.7707","area":"Faculty of Engineering"},
        {"student_name":"Test Student2", "student_contact_no":"87654321", "student_email": "2@gmail.com", "category": "TestCategory1", "datetime":"2023-10-31 08:30:00", "area":"Utown" ,"additional_info":"additional info here"},
        {"student_name":"Test Student1", "student_contact_no":"12345678", "student_email": "1@gmail.com", "category": "TestCategory2", "datetime":"2023-11-01 17:30:00", "area":"Faculty of Science"},
        {"student_name":"Test Student2", "student_contact_no":"87654321", "student_email": "2@gmail.com", "category": "TestCategory2", "datetime":"2023-11-02 21:30:00","area":"Faculty of Engineering", "additional_info":"additional info here"},
        {"student_name":"Test Student2", "student_contact_no":"87654321", "student_email": "2@gmail.com", "category": "TestCategory2", "datetime":"Tue, 14 Nov 2023 18:10:18 GMT","area":"Faculty of Engineering", "additional_info":"additional info here"},
    ]
    return ls

def test_add_incident():
        # INSERT INTO incidents (student_name, student_contact_no, category, datetime) VALUES ('Test Student', '1234567', 'TestCategory', '2023-10-30 14:30:00');
        for test_query in init_mock_data():
            response = requests.put("http://127.0.0.1:9001/incidents/add_incident", data=test_query)
            print(response.text)

def test_delete_incident():
    headers = {'content-type': 'application/json'}
    response = requests.delete("http://127.0.0.1:9001/incidents/delete_incident", data=json.dumps({"incident_num":"8"}), headers=headers)
    print(response.text)

def test_filter_incident():
    test_query = {"student_name":"Test Student2",
                  "start_date":"2023-10-30 12:00:00", 
                  "end_date":"2023-11-01 17:30:00", 
                #   "is_schoolday": 0
                  }
    response = requests.get("http://127.0.0.1:9001/incidents/filter_incidents", params=test_query)
    print(response.text)

def test_update_incident():
    test_query = {
                  "student_name":"Test Student3", 
                  "incident_num":"7",
                  "category":"TestCategory33",
                  }
    response = requests.post("http://127.0.0.1:9001/incidents/update_incident", data=test_query)
    print(response.text)

if __name__ == "__main__":
    test_add_incident()
    # test_delete_incident()
    # test_filter_incident()
    # test_update_incident()