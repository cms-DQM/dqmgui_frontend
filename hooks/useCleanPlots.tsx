import { useEffect } from "react"

interface useCleanPlotsProps {
  plotName: string;
  plotsArray: string[];
  action(plotName: string): void
  dispatch: any;
}

export const useCleanPlots = (
  plotName: string,
  plotsArray: string[],
  action: any,
  dispatch: any
) =>
  useEffect(() => {
    return () => {
      if (plotsArray.indexOf(plotName) >= 0) {
        action([])(dispatch)
      }
    }
  }, [plotsArray])