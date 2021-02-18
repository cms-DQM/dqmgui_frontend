import * as React from 'react'

import { functions_config } from '../../../../config/config'
import { store } from '../../../../contexts/leftSideContext'
import { useBlink } from '../../../../hooks/useBlink'
import { LayoutName, LayoutWrapper, ParentWrapper } from './styledComponents'
import { Plot } from './plot'
import { decodePlotName } from '../../../utils'

interface OnePlotInLayout {
  layoutName: string;
  plots: any[];
  selected_plots: any,
  globalState: any,
  imageRefScrollDown: any,
  query: any,
}

export const OnePlotInLayout = ({ plots, globalState, imageRefScrollDown, layoutName, query, selected_plots }: OnePlotInLayout) => {
  const { size, notOlderThan } = React.useContext(store)
  const [nameOfLayout, setNameOfLayout] = React.useState(layoutName)
  const [tooLong, setTooLong] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const plotNameRef = React.useRef<any>(null)

  const imageRef = React.useRef(null);

  React.useEffect(() => {
    setNameOfLayout(layoutName)
  }, [layoutName])
  const plotsAmount =
    //in order to get tidy layout, has to be x^2 plots in one layout. In the layuts, where the plot number is 
    //less than x^2, we're adding peseudo plots (empty divs)
    (Math.ceil(Math.log(2) / Math.log(plots.length)) - (Math.log(2) / Math.log(plots.length)) !== 0) &&
      plots.length !== 1 // log(2)/log(1)=0, that's we need to avoid to add pseudo plots in layout when is just 1 plot in it
      //exception: need to plots.length^2, because when there is 2 plots in layout, we want to display it like 4 (2 real in 2 pseudo plots)
      // otherwise it won't fit in parent div.
      ? plots.length + Math.ceil(Math.sqrt(plots.length)) : plots.length ** 2

  const layoutArea = size.h * size.w
  const ratio = size.w / size.h
  const onePlotArea = layoutArea / plotsAmount
  const onePlotHeight = Math.floor(Math.sqrt(onePlotArea / ratio))
  const onePlotWidth = Math.floor(Math.sqrt(onePlotArea / ratio) * ratio)
  const howMuchInOneLine = Math.floor(size.w / onePlotWidth)
  const auto = []
  var i;

  const { blink } = useBlink(notOlderThan);

  for (i = 0; i < howMuchInOneLine; i++) {
    auto.push('auto')
  }

  React.useEffect(() => {
    setCount(count + 1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight])

  return (
    <ParentWrapper
      plotsAmount={plots.length}
      isLoading={blink.toString()}
      animation={(functions_config.mode === 'ONLINE').toString()}
      size={size}>
      <LayoutName ref={plotNameRef} >
        {decodePlotName(tooLong, nameOfLayout ? nameOfLayout : '')}
        </LayoutName>
      <LayoutWrapper
        size={size}
        auto={auto.join(' ')}
      >
        {
          plots.map((plot) => {
            return (
              <Plot
                globalState={globalState}
                query={query}
                plot={plot}
                onePlotHeight={onePlotHeight}
                onePlotWidth={onePlotWidth}
                selected_plots={selected_plots}
                imageRef={imageRef}
                imageRefScrollDown={imageRefScrollDown}
                blink={blink}
                updated_by_not_older_than={notOlderThan} />
            )
          })}
      </LayoutWrapper>
    </ParentWrapper>
  )
} 