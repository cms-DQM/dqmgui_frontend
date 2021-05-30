import { get_layouts_from_quick_collection } from "./get_layout_from_quick_collections"

export const get_plots_from_quick_collection =  (quickCollections) => {
    const plots_promisses =  quickCollections ? quickCollections.map(layout_name => {
        return get_layouts_from_quick_collection(layout_name)
            .then(response => response)
            .catch(error => console.error(error))
    }) : []
    const plots = Promise.all(plots_promisses)
    return plots
}