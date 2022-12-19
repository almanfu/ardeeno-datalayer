import datetime as d
import numpy as np
import json

numsensori=200

# 80%/20=0.04, 19.00%/19=0.009995 , 1%/61=0.000163934426
temp_prob = [0.04 if 10 < i <= 30 else 0.01 if 30 <
                    i < 50 else 0.000163934426 for i in range(-20, 80)]

# 91%/70=0.013571428571428, 9%/30=0.003
hum_rel_prob = [0.013 if i > 30 else 0.003 for i in range(1, 101)]

# 96.2%/2600=0.00037, 3.8%/26206=1.4500496069602379*^-6
co2_prob = [0.00037 if i <
            3000 else 0.0000014500496069602379 for i in range(400, 29206)]

# 96.2%/2600=0.00037, 3.8%/26206=1.4500496069602379*^-6
o2_prob = [0.00037 if i <
            3000 else 0.0000014500496069602379 for i in range(400, 29206)]

# 90%/3000=0.0003, 10%/29768=0.000003359312012899758
tvoc_prob = [0.0003 if i <
             3000 else 0.000003359312012899758 for i in range(0, 32768)]

sensori_id = json.load(open('sensori_id.json', 'r'))
snapshots_ts = json.load(open('snapshots_ts.json', 'r'))

misurazioni = []

np.random.seed()

for ts in snapshots_ts:
  temp = np.random.choice(
    size=numsensori,
    a=range(-20, 80),
    p=temp_prob)

  hum_rel = np.random.choice(
    size=numsensori,
    a=range(1, 101),
    p=hum_rel_prob)

  co2 = np.random.choice(
    size=numsensori,
    a=range(400, 29206),
    p=co2_prob)

  o2 = np.random.choice(
    size=numsensori,
    a=range(400, 29206),
    p=co2_prob)

  tvoc = np.random.choice(
    size=numsensori,
    a=range(0, 32768),
    p=tvoc_prob)

  for i in range(0, numsensori):
    _id = sensori_id[i]
    valori = {'temp': float(temp[i]),'hum_rel': float(hum_rel[i]), 'CO2': float(co2[i]), 'O2': float(o2[i]), 'tvoc': float(tvoc[i])}
    misurazioni.append({'sensore':_id, 'timestamp':ts, 'valori':valori})

with open('misurazioni.json', 'w+') as outf:
  json.dump(misurazioni, outf)