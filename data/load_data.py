# -*- coding: utf-8 -*-
"""
Created on Fri Apr 19 17:25:23 2019

@author: Danielle
"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import scale

def merge_all_dols(arr):
    all_data = {'Right': [], 'Left': [], 'Rest': []}
    for dol in arr:
        all_data = merge_dols(all_data, dol)
    return all_data


def merge_dols(dol1, dol2):
    keys = set(dol1).union(dol2)
    no = []
    return dict((k, dol1.get(k, no) + dol2.get(k, no)) for k in keys)

def get_data(csvs, tmin=0):
    all_data = {'math': [], 'end': [], 'rest': []}
    for csv in csvs:
        print("loading " + csv)
        path_c = csv.split('/')
        fname = "/".join(path_c[:-1] + [csv_map[path_c[-1]]])
        df = pd.read_csv(csv)
        channel = (1, 2, 3, 4, 5, 6, 7, 8, 13)
        data = np.loadtxt(fname,
                          delimiter=',',
                          skiprows=7,
                          usecols=channel)
        eeg = data[:, :-1]
        timestamps = data[:, -1]
        prev = 0
        prev_direction = df['STATE'][prev]
        data = {'math': [], 'end': [], 'rest': []}
        '''
        # This was to see if we can normalize the EEG (didn't work)
        start = df['Time'][0]
        end = df['Time'].iloc[-1]
        indices = np.where(np.logical_and(timestamps >= start, timestamps <= end))
        start, end = indices[0][0] - tmin, indices[0][-1]
        eeg = scale(eeg[start:end+1])
        timestamps = timestamps[start:end+1]
        '''
        
        for idx, el in enumerate(df['STATE']):
            if el != prev_direction or idx == len(df.index) - 1:
                start = df['TIME'][prev]
                end = df['TIME'][idx]
                indices = np.where(np.logical_and(timestamps >= start, timestamps <= end))
                start, end = indices[0][0] - tmin, indices[0][-1]
                trial = eeg[start:end]
                all_data[prev_direction].append(trial)
                #print(idx - prev, prev_direction)
                # print(len(trial))
                prev = idx
                prev_direction = el
        all_data = merge_dols(all_data, data)
    return all_data
csvs = [
        [#"yoyo-garbage-last2countdownfrom100-2019-5-12-17-6-4.csv"
        #"2019-6-23-14-1-14.csv"
        "2019-6-23-14-47-36.csv"
        ]
        ]

all_csvs = [name for sublist in csvs for name in sublist]

csv_map = { "yoyo-garbage-last2countdownfrom100-2019-5-12-17-6-4.csv": "yoyo1-OpenBCI-RAW-2019-05-12_16-53-45.txt", #005
            "2019-6-23-14-1-14.csv": "marley-01-OpenBCI-RAW-2019-06-23_13-33-34.txt",
            "2019-6-23-14-47-36.csv": "OpenBCI-RAW-2019-06-23_14-38-09.txt",
           }

data_dict = {}
for csv in all_csvs:
    data_dict[csv] = get_data([csv])