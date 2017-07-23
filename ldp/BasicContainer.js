import { factory, default as browserFs } from "../fs/singleton.js"
import Defer from "p-defer"
import fs from "mz/fs"
import pmap from "p-map"

import { RequestHeaders } from "./headers"
import { default as ContainerContext } from "./container-context"

const utf8Encoder = new TextEncoder()

export default class BasicContainer{

	constructor( opts){
		opts= opts|| {}
		this.prefix= opts.prefix|| ""
		this.path= opts.path|| "/"
		this._headersDirectory= Object.clone({}, RequestHeaders, opts.headers, opts.headersDirectory)
		this._headersFile= Object.clone({}, RequestHeaders, opts.headers, opts.headersFile)
		this._type=[ "ldp:Resource", "ldp:Container", "ldp:BasicContainer"]
		["handler"].forEach( slot=> this[slot]= this[slot].bind(this))
	}
	get ["@type"](){
		return this._type
	}

	handler(evt){
		evt.requestUrl= new URL(event.request.url)
		var pathname= requestUrl.pathname
		// only hnalde this if the prefix matches
		if( !pathname.startsWith( this.prefix)){
			return
		}
		// strip out the prefix from lookups
		evt.pathname= pathname.slice( this.prefix.length)

		// for now directories must end with /
		var
		  isDirectory= evt.requestUrl.pathname.endsWith( "/"),
		  result
		if( evt.method=== "GET"){
			result= isDirectory? this._readDirectory( evt): this._readFile( evt)
		}else if( evt.method=== "POST"){
			result= isDirectory? this._makeDirectory( evt): this._makeFile( evt)
		}
		if( result){
			evt.respondWith( result)
		}
	}

	async _readDirectory( evt){
		var
		  // get files
		  files= await fs.readdir( evt.pathname),
		  // prefix files with the full name
		  basename= this.prefix+ evt.pathname
		files.forEach(( f, i, arr)=> arr[ i]= basename+ f)
		var
		  json= JSON.stringify({
			"@context": ContainerContext,
			"@id": evt.request.url,
			"@type": this._type,
			"contains": files
		  }),
		  response= new Response( JSON.stringify( json), this.headersDirectory)
		return response
	}
	async _readFile( evt){
		var
		  file= await fs.readFile( evt.pathname, "utf8"),
		  response= new Response( file, this.headersFile)
		return response
	}
	async _makeDirectory( evt){
		
	}
	async _makeFile( evt){
		
	}

	get headersDirectory(){
		return this._headersDirectory
	}
	get headersFile(){
		return this._headersFile
	}
}
