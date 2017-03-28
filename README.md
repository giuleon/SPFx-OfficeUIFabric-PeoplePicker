# SharePoint Framework Office UI Fabric People Picker

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

![alt text](Preview1.gif "SharePoint Framework PeoplePicker")

If you lost the previous article please take a look here [Office UI Fabric People Picker and SharePoint search better together part 1 - SharePoint Add-In](http://www.delucagiuliano.com/office-ui-fabric-people-picker-and-sharepoint-search-better-together-part-1/).
As promise, I released a SharePoint Framework solution with the Office UI Fabric People Picker, like for the Add-In solution, the App across the SharePoint Search API is able to retrieve people.

[Here the article on my blog](http://www.delucagiuliano.com/office-ui-fabric-people-picker-and-sharepoint-search-better-together-part-2-sharepoint-framework/)
