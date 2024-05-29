import requests

# Test URL
URL = "http://127.0.0.1:9001/statistics"

if __name__ == "__main__":
    values = {"isSchoolDay": True,"category":"Larceny Theft", "n_cluster":3}
    response = requests.get(URL,params=values )

    print(f"Let's see what comes out here {response}")
