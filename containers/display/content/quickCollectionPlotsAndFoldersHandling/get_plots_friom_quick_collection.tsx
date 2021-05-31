import { get_layouts_or_plots_from_quick_collection } from "./get_layouts_or_plots_from_quick_collection"

export const get_plots_from_quick_collection = (quickCollections) => {
    const plots_promisses = quickCollections ? quickCollections.map(quick_collection => {
        const layout_name_or_plot_name = quick_collection.name
        return get_layouts_or_plots_from_quick_collection(layout_name_or_plot_name)
            .then(response => {
                if (response.length > 0) {
                    return response
                } else {
                    return { name: layout_name_or_plot_name, path: quick_collection.path }
                }
            })
            .catch(error => console.error(error))
    }) : []
    const plots = Promise.all(plots_promisses)
    return plots
}