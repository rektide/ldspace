export function handler( evt){
	evt.requestUrl= new URL( event.request.url)
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

export function apply( basicContainer){
	basicContainer._swHandler= handler
}
export default apply
