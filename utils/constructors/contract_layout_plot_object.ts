import {unnest}  from 'ramda'

const construct_layout_plot_object = (one_layout, layout_name) => {
  const one_layout_with_plots = one_layout.map(one_plot => {
    const { source } = one_plot

    const layout = layout_name
    const parts = source.split('/')
    const name = parts.pop()
    const path = parts.join('/')
    return { name, path, layout }
  })
  return one_layout_with_plots
}

export const construct_layout_plot_objects = (datas_and_layout_name) => {
  // console.log(datas_and_layout_name)
  const formatted_data =  datas_and_layout_name.map((one_layout) => construct_layout_plot_object(one_layout.datas, one_layout.layout_name)) 
  const plots = unnest(formatted_data)
    return plots
}