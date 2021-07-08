#Shared functions




dateCheck <- function(some_date){
  pattern <- "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
  if (!grepl(pattern, some_date)) stop('Incorrect date format!')
}


checkForNull <- function(values){
  c = 1
  for (z in values){
    count = 1
    for (i in z){
      if(is.null(i)){
        values[[c]][count] = ""
      }
      count = count + 1
    }
    c = c + 1
  }
  return(values)
}



checkRequestStatus <- function(status_msg){
  if (status_msg != "Success: (200) OK") {
    stop(paste('Something went wrong: ', status_msg, sep=" "))
  }
}




