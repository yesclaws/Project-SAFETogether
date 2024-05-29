from flask import Flask, request,send_file
import plotly
from plotly.subplots import make_subplots
import plotly.graph_objs as go
import plotly.express as px
from dashboard import Dashboard

app = Flask(__name__)

def isSchoolDay_plot(isSchoolDay):
    """To obtain general crime distribution plots for isSchoolday and isNotSchoolday based on parameter"""
    db = Dashboard(df_path="data/crimes_near_universities_beforeClustering.csv")
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
    """To obtain specific category crime distribution plots based on isSchoolDay/isNonSchoolDay and number of kmeans cluster."""
    db = Dashboard(df_path="data/crimes_near_universities_beforeClustering.csv")
    df = db.cluster(df = db.filter_school_category(school_flag= isSchoolDay,category=category), n_cluster=n_cluster)

    fig = make_subplots(rows=2, cols=1, shared_xaxes=False, subplot_titles=[f'{category} Occurrences on a Weekend in a Semester', f'{category} Occurrences on a Weekday in a Semester'])


    fig.append_trace(px.bar(df[(df['IsWeekend']==False)], x="hour", y="Occurrences",
             color='kmeans_label',
             height=400).data[0], row=1,col=1)

    fig.append_trace(px.bar(df[(df['IsWeekend']==True)], x="hour", y="Occurrences",
             color='kmeans_label',
             height=400).data[0], row=2, col=1)
    
    fig = plotly.io.to_json(fig,pretty=True)
    # fig.write_image(f"isSchoolDay_{isSchoolDay}_{category}_plots.png", engine="kaleido")

    # return send_file(f"isSchoolDay_{isSchoolDay}_{category}_plots.png", mimetype='img/png')
    return fig
    
@app.route("/statistics", methods=["GET"])
def get_statistical_plot():
    """API to get both plots"""

    # get request from FE for "isSchoolDay" bool param
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
    print("works")
    app.run(host="0.0.0.0", port="5001", debug=True) 
    


