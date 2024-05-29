import pandas as pd
from sklearn.cluster import KMeans

class Dashboard():

    def __init__(self, df_path="data/crimes_near_universities_beforeClustering.csv") -> None:

        # using crimes near university from San Francisco dataset
        self.df = pd.read_csv(df_path)
    

    def filter_school(self,bool_flag = True):
        """Filter df if school day / non school day."""
        df_school = self.df[(self.df['IsSchoolDay']==bool_flag)].groupby(["hour", 'IsWeekend']).size().reset_index(name="Occurrences")

        return df_school
    
    def filter_school_category(self, category, school_flag):
        """Filter df with both school day/ non school day and crime category."""
        df_school_category = self.df[(self.df['Incident Category']==category) & (self.df['IsSchoolDay']==school_flag)].groupby(["hour", 'IsWeekend']).size().reset_index(name="Occurrences")

        return df_school_category
    
    def cluster(self, df, n_cluster = 5, max_iter=100, n_init=20, random_state=2023):
        """Perform Kmeans clustering."""
        model = KMeans(n_clusters = n_cluster, max_iter=max_iter, n_init=n_init, random_state=random_state)
        model.fit(pd.get_dummies(df, columns=['IsWeekend']))
        df["kmeans_label"] = model.labels_

        return df

if __name__ == "__main__":
    db = Dashboard()
    print(db.df.head())
    df_school = db.cluster(df = db.filter_school(bool_flag= True))
    print(df_school)
