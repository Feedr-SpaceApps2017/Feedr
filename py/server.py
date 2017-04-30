#Servery witchcaft at half 1 in the morning feat Al, Dave and Dan
import urllib.request

response = urllib.request.urlopen("http://feedr-spaceapps.herokuapp.com/gettodo")
print(response.read())
