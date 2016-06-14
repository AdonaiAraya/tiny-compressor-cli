#Tiny Compressor CLI
A command line JPG and PNG image compressor using [tinypng.com](https://tinypng.com) compress API.

##Installing
####NPM
First you need to install [node](https://nodejs.org/en/).

Once you installed node run this command on the terminal:

    npm install -g tiny-compressor-cli

####Windows
Not available yet

####MAC
Not available yet

####Linux
Not available yet

##Prerequisites

**Tiny compressor cli** works with [tinypng](https://tinypng.com) to compress your images without losing quality.

First you need to get an API key from tinypng.com.

+ Go to [https://tinypng.com/developers](https://tinypng.com/developers)
+ Fill the form and click on *Get your API Key*
+ An email is sent to the email address with a link to get your API key
+ Saves this key for later use (you can always click the link again to get your API Key)


##Usage

####Help

Request help about the application.

Example:

    tinycompressor -h

####Version

Current application version.

Example:

    tinycompressor -v

####Key

Set the API key for later uses. This is mandatory to execute the other commands

    tinycompressor key [apikey]

####Compress

Compress a single image or all images in a directory. This will create a folder name *compressed* with all the compresed images.

***Warning:*** You must set an API key before you can execute this command

    tinycompressor compress [path]

####Status
Check the current status (Total compression this month)

***Warning:*** You must set an API key before you can execute this command

    tinycompressor status

##Related programs
Not available yet