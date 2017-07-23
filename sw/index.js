import * as BasicContainer from "../ldp/BasicContainer"
import "webpack-reflect/global"

import { factory, default as browserFs } from "../fs/singleton"

if(Math.random() == 0){
	// all fake -- just don't shake out of tree
	factory()
	browserFs()
}
