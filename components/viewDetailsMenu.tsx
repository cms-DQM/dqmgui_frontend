import { Reference } from './reference'
import { ViewFiler } from './viewFilter'
import { SizeChanger } from './sizeChanger'

interface ViewDetailsMenuProps {
    dispatch: any
}

export const ViewDetailsMenu = ({ dispatch }: ViewDetailsMenuProps) => {
    return (
        <div>
            <Reference dispatch={dispatch} />
            <ViewFiler dispatch={dispatch} />
            <SizeChanger dispatch={dispatch} />
        </div>
    )
}