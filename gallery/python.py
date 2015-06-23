import csv

with open("tabseparatedInfo") as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"):
    	with open ("index.html", "r") as myfile:
		    data=myfile.read().replace('\n', '')
		    id = line[0]
		    newData = data.replace('%', ''+str(id))
		    newData = newData.replace('*', ''+str(line[1]))
		    text_file = open("index"+str(id)+".html", "w")
		    text_file.write(newData)
		    text_file.close()
		 

		