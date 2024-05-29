from flask import Flask, request, jsonify, make_response
import incident_creation.incidents as incidents
import json
import uuid
from llm.s2t import s2tsummarizer
from dashboard.dashboard import Dashboard
import plotly
from plotly.subplots import make_subplots
import plotly.express as px

app = Flask(__name__)

@app.route('/incidents', methods=["GET"])
@app.route('/incidents/incidents', methods=["GET"])
def get_all_incidents():
    return jsonify(incidents.get_all_incidents())

@app.route('/incidents/add_incident', methods=["PUT"])
def add_incident():
    return incidents.add_incident(request.form)

@app.route('/incidents/filter_incidents', methods=["GET"])
def filter_incidents():
    return jsonify(incidents.filter_incidents(request.args))

@app.route('/incidents/export_db', methods=["GET"])
def export_db():
    resp = make_response(incidents.export_db())
    resp.headers["Content-Disposition"] = "attachment; filename=incidents.csv"
    resp.headers["Content-Type"] = "text/csv"
    return resp

@app.route('/incidents/delete_incident', methods=['DELETE'])
def delete_incident():
    return incidents.delete_incident(request.get_json())

@app.route('/incidents/update_incident', methods=["POST"])
def update_incident():
    return incidents.update_incident(request.form)

@app.route("/summarize", methods=["POST"])
def summarize():
    # get audio file
    print("requesting audio file")
    audio_file = request.files["file"]
    file_name = uuid.uuid4().hex
    audio_file.save(file_name)

    print("transcribing and summarizing audio file")
    result = summarizer.s2t(audio_path=file_name)
    result = json.loads(result)
    final_result = summarizer.create_valid_report(report=result)
    
    return final_result

def isSchoolDay_plot(isSchoolDay):

    db = Dashboard(df_path="dashboard/data/crimes_near_universities_beforeClustering.csv")
    df_school = db.cluster(df = db.filter_school(bool_flag= isSchoolDay))

    fig = make_subplots(rows=2, cols=1, shared_xaxes=False, subplot_titles=['Crime Occurrences on a Weekend in a Semester', 'Crime Occurrences on a Weekday in a Semester'])
    # weekend plot
    fig.append_trace(
    px.bar(df_school[df_school['IsWeekend']==True], x="hour", y="Occurrences", color='kmeans_label').data[0],
    row=1, col=1
    )
    # weekday plot
    fig.append_trace(
    px.bar(df_school[df_school['IsWeekend']==False], x="hour", y="Occurrences", color='kmeans_label').data[0],
    row=2, col=1
    )
    fig = plotly.io.to_json(fig,pretty=True)

    return fig

def schoolday_category_plot(isSchoolDay, category, n_cluster):
    db = Dashboard(df_path="dashboard/data/crimes_near_universities_beforeClustering.csv")
    df = db.cluster(df = db.filter_school_category(school_flag= isSchoolDay,category=category), n_cluster=n_cluster)

    fig = make_subplots(rows=2, cols=1, shared_xaxes=False, subplot_titles=[f'{category} Occurrences on a Weekend in a Semester', f'{category} Occurrences on a Weekday in a Semester'])


    fig.append_trace(px.bar(df[(df['IsWeekend']==False)], x="hour", y="Occurrences",
             color='kmeans_label',
             height=400).data[0], row=1,col=1)

    fig.append_trace(px.bar(df[(df['IsWeekend']==True)], x="hour", y="Occurrences",
             color='kmeans_label',
             height=400).data[0], row=2, col=1)
    
    fig = plotly.io.to_json(fig,pretty=True)
    return fig
    
@app.route("/statistics", methods=["GET","POST"])
def get_statistical_plot():
    isSchoolDay = request.form.get("isSchoolDay", "True")
    if isSchoolDay == "True":
        isSchoolDay = True
    else:
        isSchoolDay = False

    # get request from FE for "category" params
    category = request.form.get("category", "Larceny Theft")
    # get request from FE for n_cluster
    n_cluster = request.form.get("n_cluster", 5)
    
    fig1 = isSchoolDay_plot(isSchoolDay)
    fig2 = schoolday_category_plot(isSchoolDay, category, n_cluster)

    return [fig1,fig2]

if __name__ == "__main__":
    # initalize model
    print("initializing model")
    summarizer = s2tsummarizer()
    app.run(host="0.0.0.0", port="5000", debug=False)
