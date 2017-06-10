import IndexedDB from "browserfs-esnext/src/backend/IndexedDB"
import nodeFs from "browserfs/src/core/node_fs"
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





