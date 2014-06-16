[yaml-boot-bars](http://nathanrosspowell.github.io/yaml-boot-bars)
==============

A Twitter Boostrap based single page website which uses Handlebars.js templating with YAML data storage.


Installing
----------

### Unix

This project has a dependcy on [grunt](http://gruntjs.com) so the following will have to be done:

    apt-get install nodejs nodejs-legacy
    npm install -g grunt cli

Move into a parent directory for the project and execute the following:

    git clone https://github.com/nathanrosspowell/yaml-boot-bars
    cd yaml-boot-bars
    npm install
    
  
### Windows

For working on Window you will want to install the [GitHub for Windows](https://windows.github.com/) software.
You will also need to use the installer found at [nodejs.org](http://nodejs.org/).

You can use the GUI interface of the GitHub software to clone the project. Selecting the project will bring you to a screen that has a settings icon, that opens a dropdown with the option to `Open in Git Shell`. From there you can execute node and grunt. To finish the setup you need to execute `npm install`

  
Productivity
------------
    
The command to convert the source into the final website has been set up as the default grunt task.
Inside of the project folder you can simply execute `grunt` then open the file `build/index.html`.

Publishing to the web means moving everything from the `build/` folder into the `gh-pages` branch of the project.
The package [`grunt-gh-pages`](https://github.com/tschaub/grunt-gh-pages) has been set up to do this task.
Running `grunt gh-pages` will move these files across. The command `grunt deploy` does the whole workflow.


Bootstrap Playground
--------------------

There are many templates and snippets to be found at [bootply.com](http://www.bootply.com). For the main part of this page I have used the snippet found [here](http://www.bootply.com/qhVAkGSQgr). The idea is you can use this workflow with your own HTML.
