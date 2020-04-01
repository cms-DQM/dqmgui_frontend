import { Reference } from '../reference'
import { ViewFiler } from './viewFilter'
import { SizeChanger } from '../sizeChanger'
import { setJSROOTMode } from '../../reducers/displayFolderOrPlot'

interface ViewDetailsMenuProps {
    dispatch: any
}

export const ViewDetailsMenu = ({ dispatch }: ViewDetailsMenuProps) => {
    return (
        <div>
            <Reference dispatch_gloabl={dispatch} />
            <div>
                <label>Enable JSROOT</label>
                <input type="checkbox" onChange={(e) => {
                    setJSROOTMode(e.target.checked)(dispatch)
                }
                }
                />
            </div>
            <ViewFiler dispatch={dispatch} />
            <SizeChanger dispatch={dispatch} />
        </div>
    )
}