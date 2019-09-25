library(sf)
library(geojsonio)

Zats <- st_read("TAZ_Bogota/TAZ_Bogota_TEMP.shp")
#epsg = 4326
Zats2 <- st_transform(Zats, crs = 4326)

topojson_write(Zats2, file = "BogotaZats.topojson")
st_write(Zats2,"BogotaZats.geojson")


#Rotated Map

ZatsRotated <- st_read("TAZ_BogotaRotate/TAZ_Bogota_TEMP.shp")
ZatsRotated <- st_transform(ZatsRotated, crs = 4326)
st_write(ZatsRotated,"BogotaZatsRotated.geojson")



