with open ("index.html", "r") as myfile:
    data=myfile.read().replace('\n', '')
    id = 9
    newData = data.replace('%', ''+str(id))
    text_file = open("index"+str(id)+".html", "w")
    text_file.write(newData)
    text_file.close()
