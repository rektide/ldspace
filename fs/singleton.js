import IndexedDB from "browserfs-esnext/ts/backend/IndexedDB"
import nodeFs from "browserfs/ts/core/node_fs"
import Defer from "p-defer"

export function factory(){
	var
	  defer= Defer()
	  rootFs= new IndexedDB( defer.resolve, "ldspace")
	nodeFs.initialize( rootFs)
	rootFs.ready= defer.promise
	return rootFs
}

var _singleton

export default function singleton(){
	if( !_singleton){
		_singleton= factory()
	}
	return _singleton
}






