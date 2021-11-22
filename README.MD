*** MY REST API APP - MAXENCE QUINET ***

My application allows to link the data of a database to my application, and thus, using a get / post / delete request etc ... to act on this database from the application.

For example you can :

GET
return city informations with : /city/cityName (example : .../city/Paris)

POST
insert a city in DB with : /city + json city informations file

DELETE
delete a city in DB with : /city + json city name information file

PUT 
update a city in DB with : /city/cityName +json city informations file ( with your update )

You can find more informations of these request with my apidoc documentation. To find it, just put /apidoc at the end of the URL
