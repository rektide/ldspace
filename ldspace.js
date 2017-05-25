import { pimSpace, ldp } from "./ns"

const _types= Object.freeze([ ldp.BasicContainer, ldp.Resource, pim.Workspace])

class LdSpace{
	get '@type'() {
		return _types
	}
}
