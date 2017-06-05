import browserFs from "../fs/singleton.js"
import Defer from "p-defer"
import fs from "mz/fs"
import pmap from "p-map"

import RequestHeaders from "./headers"
import { ContainerContext as default } from "./container-context"

const utf8Encoder = new TextEncoder()

class LinkedDataPlatform{

	constructor( opts){
		opts= opts|| {}
		this.prefix= opts.prefix|| ""
		this.path= opts.path|| "/"
		this._directoryHeaders= Object.clone({}, RequestHeaders, opts.directoryHeaders)
		["handler"].forEach( slot=> this[slot]= this[slot].bind(this))
	}

	handler(evt){
		var
		  requestUrl= new URL(event.request.url),
		  pathname= requestUrl.pathname
		// only hnalde this if the prefix matches
		if( !pathname.startsWith( this.prefix)){
			return
		}
		// strip out the prefix from lookups
		pathname= pathname.slice( this.prefix.length)

		// for now directories must end with /
		var isDirectory= requestUrl.pathname.endsWith( "/")
		if( evt.method=== "GET"){
			var response= isDirectory? this._readdir: this._readFile
			if( isDirectory){
				var
				  files= fs.readdir( pathnae),
				  response= this._convertReaddir( files, requestUrl.pathname)
				evt.respondWith( response)
			}else{
				var
				  file= fs.readFile( pathname)
				  response= this._read
			}
		}
	}

	async _readdir( fspath, id){
		var files= await fs.readdir( fspath)
		files.map(( f, i, arr)=> arr[ i]= id+ f)
		var
		  json= JSON.stringify({
			"@context": ContainerContext,
			"@id": id,
			"@type": [ "ldp:Container", "ldp:BasicContainer"],
			"contains": pathed
		  }),
		  response= new Response( JSON.stringify(json), this.directoryHeaders)
		return response
	}
	async _readFile( fspath, id){
		var file= await fs.readFile( fspath)
		
	}

	get directoryHeaders(){
		return this._directoryHeaders
	}
}
