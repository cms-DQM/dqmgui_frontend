import { CUSTOMIZATION_DIALOG, OVERLAY_PLOT_MENU, PLOT_PORTAL } from './constants'

export const dialogsSwitch = (dialogName: string | boolean) => {
  switch (dialogName) {
    case CUSTOMIZATION_DIALOG:
      return {
        [CUSTOMIZATION_DIALOG]: true,
        [OVERLAY_PLOT_MENU]: false,
      }
    case OVERLAY_PLOT_MENU:
      return {
        [CUSTOMIZATION_DIALOG]: false,
        [OVERLAY_PLOT_MENU]: true,
      }
    default:
      return {
        [CUSTOMIZATION_DIALOG]: false,
        [OVERLAY_PLOT_MENU]: false,
      }
      break;
  }
}