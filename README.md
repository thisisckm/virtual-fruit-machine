# Virtual Fruit Machine

This project demonstrates implementing Fruit Machine or Fruit Slot Machine in Node.js. This CLI application is interactive with the user using the TUI interface.

## Quick Start - Method 1:
This quick start steps for Ubuntu. 

### Prerequisite 
1. Install the latest node js version. 
```
$ sudo apt install node
```
2. Install the newest version of git
```
$ sudo apt install git -y
```

### Setup
1. Clone the source code of the application form git@github.com:thisisckm/virtual-fruit-machine.git
```
$ git clone git@github.com:thisisckm/virtual-fruit-machine.git
```
2. Change to the project folder
```
$ cd virtual-fruit-machine
```
3. Install the node packages
```
$ npm install --save
```

###Usage:
A simple step to run the application
```
$ node src/vfm.js
```
To test the code
```
$ npm run test

## Quick Start - Method 2:
This quick start steps for any OS with docker desktop. 

### Prerequisite 
1. Install the latest version of the docker desktop
2. Install the newest version of git

### Setup
1. Clone the source code of the application form git@github.com:thisisckm/virtual-fruit-machine.git
```
> git clone git@github.com:thisisckm/virtual-fruit-machine.git
```

2. Change to the project folder
```
> cd virtual-fruit-machine
```
3. Build the docker image
```
> docker build . -t virtual-fruit-machine
```

### Usage:
A simple step to run the application
```
> docker run -it virtual-fruit-machine node src/vfm.js
```
