import { FOLDERS_OR_PLOTS_REDUCER } from '../components/constants'

import { sizes } from './constants'
import { setHeight, setWidth } from '../reducers/displayFolderOrPlot'

interface SizeChangerProps {
  dispatch(params: any): void;
}
export const SizeChanger = ({ dispatch }: SizeChangerProps) => {
  return (
    <>
      <button onClick={() => {
        setHeight(sizes.small.size.h)(dispatch)
        setWidth(sizes.small.size.w)(dispatch)
      }}>
        {sizes.small.label
        }
      </button>
      <button onClick={() => {
        setHeight(sizes.medium.size.h)(dispatch)
        setWidth(sizes.medium.size.w)(dispatch)
      }}>
        {sizes.medium.label
        }
      </button>
      <button onClick={() => {
        setHeight(sizes.large.size.h)(dispatch)
        setWidth(sizes.large.size.w)(dispatch)
      }}>
        {sizes.large.label
        }
      </button>
      <button onClick={() => {
        setHeight(sizes.fill.size.h)(dispatch)
        setWidth(sizes.fill.size.w)(dispatch)
      }}>
        {sizes.fill.label
        }
      </button>
    </>
  )
}