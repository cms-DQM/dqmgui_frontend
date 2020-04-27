import { PlotDataProps } from "../../../../containers/display/interfaces"
import cleanDeep from "clean-deep"

export const removePlotFromSelectedPlots = (plotsQuery: string | undefined, plotName: PlotDataProps) => {
    const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : []
    const fileterdPlotsAndDirs = plotsWithDirs.map((plotWithDir: string) => {
        const plotAndDir = plotWithDir.split('/')
        if (plotAndDir[plotAndDir.length - 1] !== plotName.name) {
            return plotWithDir
        }
    })
    const cleanedFileterdPlotsAndDirs = cleanDeep(fileterdPlotsAndDirs)
    const plotsForQuery = cleanedFileterdPlotsAndDirs.join('&')
    return plotsForQuery
}

export const addToSelectedPlots = (plotsQuery: string | undefined, plot: PlotDataProps) => `${plotsQuery ? plotsQuery + '&' : ''}${plot.dir}/${plot.name}`