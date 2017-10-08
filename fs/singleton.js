import { default as IndexedDB } from "browserfs-esnext/backend/IndexedDB"
import { default as nodeFs } from "browserfs-esnext/core/node_fs"
import Defer from "p-defer"

export function factory(){
	var
	  defer= Defer(),
	  idb= new IndexedDB( defer.resolve, "ldspace"),
	  rootFs= new nodeFs.FS()
	rootFs.initialize( idb)
	rootFs.__ready= defer.promise
	return rootFs
}

var _singleton

export default function (){
	if( !_singleton){
		_singleton= factory()
	}
	return _singleton
}
