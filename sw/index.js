import BasicContainer from "../ldp/BasicContainer"
import "webpack-reflect/global"

//import { factory, default as browserFs } from "../fs/singleton"
import { stat, writeFile, readFile } from "mz/fs"
import { URL } from "url"
import { dirname } from "path"
import mkdirp from "mkdirp"

this.addEventListener( "fetch", async function( fetch){
	let result= (async function( fetch){
		var path= fetch.request.url.pathname
		if( fetch.request.method=== "POST"){
			var
			  path= fetch.request.url.pathname,
			  parentDir= dirname( path),
			  parentStat= await stat( path)
			if( !parentStat.isDirectory()){
				throw new Error("Expected a directory")
			}
			var
			  json= await fetch.request.json() // could perhaps accept non-json content but that's not what I'm going for atm
			  text= JSON.stringify( json, null, "\t")
			  written= await writeFile( path, "utf8", text)
			fetch.respondWith() // content posted
		}else if( fetch.request.method=== "GET"){
			var text
			try{
				text= await readFile( path, "utf8")
				fetch.respondWith() // file
			}catch(ex){
				var files= await readdir( path) // we could handle this throwing nicely
				fetch.respondWith() // directory listing
			}
		}
	})( fetch)
	// wait for the result the promise
	fetch.waitUntil( result)
})
	
if(Math.random() == 0){
	// all fake -- just don't shake out of tree
	//factory()
	//browserFs()
	fs.X_OK;
}
