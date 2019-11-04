# MDLive QA Challenge

## Table of Contents
- [About](#about)
- [Setup](#setup)
- [Endpoints](#endpoints)
- [Author](#author)

## About <a name = "about"></a>

## Setup <a name = "setup"></a>

### Installation

*   Clone the [repo]('https://github.com/alegomez1/MDLive-project/')
*   Use ```npm install``` or ```yarn install``` to install the necessary dependencies
*   Run the server using ```cd server``` followed by ```npm start``` or ```yarn start```
*   Run the optional client frontend using ```cd client``` followed by ```npm start``` or ```yarn start```
*   Open ```http://localhost:5000``` in your browser for the server and/or ```http://localhost:3000```

## Endpoints <a name = "endpoints"></a>

| Queries |
| --- |
| https://mdlive-project.herokuapp.com/apps |
| https://mdlive-project.herokuapp.com/apps?rangeBy=id&start=1&end=50 |
| https://mdlive-project.herokuapp.com/apps?rangeBy=name&start=my-app-001&end=my-app-050 |
| https://mdlive-project.herokuapp.com/apps?rangeBy=id&start=1&end=40&max=30&order=desc |
| https://mdlive-project.herokuapp.com/apps?rangeBy=id&start=30&end=50&max=7&order=asc |
| https://mdlive-project.herokuapp.com/apps?rangeBy=name&start=my-app-020&end=my-app-045&max=15&order=desc |
| https://mdlive-project.herokuapp.com/apps?rangeBy=name&start=my-app-040&end=my-app-045&max=3&order=asc |
| --- |
| Basic Frontend Interface |
| https://mdlive-project.herokuapp.com/ |

## Author <a name = "author"></a>
* [Alejandro Gomez](https://github.com/alegomez1)
