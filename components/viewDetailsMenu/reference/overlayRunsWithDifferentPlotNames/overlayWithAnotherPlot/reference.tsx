import * as React from 'react'
import { ParamsForApiProps } from '../../../../../containers/display/interfaces'

import { Reference as CustomReference } from '../../reference'

interface ReferenceProps {
    params_for_api: ParamsForApiProps;
    disabled: boolean
}

export const Reference = ({ params_for_api, disabled }: ReferenceProps) => {
    const initial_normalize_value = params_for_api.normalize ? params_for_api.normalize : 'True'
    const initial_overlay_value = params_for_api.overlay ? params_for_api.overlay : 'overlay'
    const initial_stats_value = params_for_api.stats ? params_for_api.stats : ''

    const [normalize, setNormaize] = React.useState<string>(initial_normalize_value)
    const [overlayPosition, setOverlayPosition] = React.useState<string>(initial_overlay_value)
    const [stats, setStats] = React.useState<string>(initial_stats_value)

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