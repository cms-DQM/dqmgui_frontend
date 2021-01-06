import * as React from 'react'
import { PlotsoverlaidSeparatelyProps } from '../../../../../containers/display/interfaces'

import { Reference as CustomReference } from '../../reference'

interface ReferenceProps {
  overlaid_separately_before_submit: PlotsoverlaidSeparatelyProps;
  disabled: boolean
}

export const Reference = ({ overlaid_separately_before_submit, disabled }: ReferenceProps) => {

  const [normalize, setNormaize] = React.useState<string>(overlaid_separately_before_submit.normalize)
  const [overlayPosition, setOverlayPosition] = React.useState<string>(overlaid_separately_before_submit.ref)
  const [stats, setStats] = React.useState<string>(overlaid_separately_before_submit.stats)

  React.useEffect(() => {
    overlaid_separately_before_submit.normalize = normalize
    overlaid_separately_before_submit.ref = overlayPosition
    overlaid_separately_before_submit.stats = stats
  }, [normalize, overlayPosition, stats])

  return (
    <CustomReference
      setNormalize={setNormaize}
      setPosition={setOverlayPosition}
      setStats={setStats}
      disabled={disabled}
      normalize={normalize}
      stats={stats}
      position={overlayPosition}
    />
  )

}