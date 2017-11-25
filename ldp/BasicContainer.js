import ContainerContext from "./container-context"
import { factory, default as browserFs } from "../fs/singleton.js"

import fs from "mz/fs"
import merge from "lodash.merge"

const utf8Encoder = new TextEncoder()

async function toArray( iter){
	var out= []
	for( var o of iter){
		out.push( o)
	}
	return out
}

export default class BasicContainer{
	constructor( opts){
		var defaults= {
			_id: "",
			_type: [ "ldp:Resource", "ldp:Container", "ldp:BasicContainer"]
			baseDir: process.cwd()
		}
		Object.assign( this, defaults, opts)
		(this._bind|| []).forEach( slot=> this[ slot]= this[ slot].bind( this))
	}
	get [ "@type"](){
		return this._type
	}
	get [ "@id"](){
		return this._id
	}
	[Symbol.iterator]: async function*(){
		var files= await fs.readdir( this.baseDir)
		for( var filename of files){
			yield filename
		}
	}
	async get( itemName){
		var file= await fs.readFile( this.baseDir+ "/"+ itemName, "utf8")
		return JSON.parse( file)
	}
	async post( itemName, content){
		if( typeof( content)!== "string"){
			content= JSON.stringify( content)
		}
		var ok= fs.writeFile( this.baseDir+ "/"+ itemName, content)
	}
	async put( itemName, content){
		if( typeof( content)=== "string"){
			throw new Error( "Expected object content")
		}
		var current= await this.get( itemName)
		merge( current, content)
		return this.post( itemName, content)
	}
	async toJSON(){
		var
		  contains= await toArray( this),
		  prefix= this._id+ "/",
		  json= {
			"@context": ContainerContext,
			"@id": this._id,
			"@type": this._type,
			contains: contains.map( filename=> ({"@id": prefix+ filename}))
		  }
		return json
	}
}
