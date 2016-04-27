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

    tiny-compressor-cli -h

####Version

Current application version.

Example:

    tiny-compressor-cli -v

####Compress

Compress a single image or all images in a directory.

+ `-p` or `--path` Path to the image or the directory
+ `-k` or `--key` API key

Example:

    tiny-compressor-cli -p [path/to/your/folder] -k [API_KEY]

####Status
Check the current status (Total compression this month) of the given key

+ `-s` or `--status` Status of the api key
+ `-k` or `--key` API key

Example:

    tiny-compressor-cli -v -k [API_KEY]

##Related programs
Not available yet