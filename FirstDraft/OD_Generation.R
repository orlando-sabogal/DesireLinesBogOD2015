
#ponderador_calibrado_viajes1

library(tidyverse)
setwd("~/Dropbox/IDB Uber Bog/Analysis_April2019/OriginalData")

Data <- readstata13::read.dta13("Viajes-Personas.dta")
Data <- as_tibble(Data)

MOD <- Data %>% filter(dia_habil1 =="S") %>% 
  mutate(zat_origen1 = as.numeric(zat_origen1),
         zat_destino1 = as.numeric(zat_destino1)) %>% 
  group_by(zat_origen1,zat_destino1, medio_predominante1) %>% 
  summarise(Total = sum(ponderador_calibrado_viajes1,na.rm = TRUE))


MOD <- MOD %>% pivot_wider(id_cols = c("zat_origen1","zat_destino1"),
                           names_from = medio_predominante1,
                           values_from = Total) %>% 
  replace(is.na(.),0)

names(MOD)
names(MOD)[c(1,2)] <- c("ZatOrigin","ZatDestination")
names(MOD)[7] <- "Bicicleta"
names(MOD)[4] <- "TPCySITP"
MOD <- MOD[complete.cases(MOD),]
MOD$Value <- 0


library(sf)
setwd("~/Dropbox/MyGitRepositories/DesireLinesBogOD2015")
Zats <- st_read("TAZ_Bogota/TAZ_Bogota_TEMP.shp")
#epsg = 4326
Zats2 <- st_transform(Zats, crs = 4326)

setwd("~/Dropbox/MyGitRepositories/DesireLinesBogOD2015")

MOD <- MOD %>% filter(ZatOrigin %in% Zats2$Zona_Num_N)

MOD <- MOD %>% filter(ZatDestination %in% Zats2$Zona_Num_N)

write_delim(MOD, "DataReal.csv", delim = ",")

