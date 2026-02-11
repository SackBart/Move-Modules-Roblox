# RePath

![](Demo.gif)

An Extension that automatically changes all paths on other scripts when moving modules

## How to use it
The extension automatically runs when opening a roblox project

## Requirements
Needs Rojo with its `default.package.json` file.

## Warning
The repathing doesn't work on multiple nested variables:

```luau
local Service = game:GetService("ServerScriptService")
local SubPath = Service.sub.path

local module = require(Service.SubPath.more.path)
```


