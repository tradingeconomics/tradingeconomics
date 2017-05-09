credCheck <- function(usersApiKey){
  pattern <- ":"
  if (!grepl(pattern, usersApiKey)) stop('Incorrect credentials format!')
}

#'Insert users APIkey
#'@export login
#'
#'
#'@param usersApiKey string.

login <- function(usersApiKey = NULL) {
    if (!is.null(usersApiKey)){
      credCheck(usersApiKey)
    } else {
      usersApiKey = 'guest:guest'
    }
     assign("apiKey", usersApiKey, envir = .GlobalEnv)
    return(apiKey)
  }


