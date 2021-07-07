import { pathOr, unnest } from 'ramda'

interface FormHeaderProps {
  header_data: any
  subsystem: string
}

export const form_header = (props: FormHeaderProps) => {
  const data = pathOr({}, ['header_data'], props)
  data['subsystem'] = props.subsystem
  const keys = Object.keys(data)

  keys.forEach((key) => {
    if (key === 'reportSummary') {
      const parsed = parseFloat(data[key])
      const reportValue = !isNaN(parsed) ? (Number(parsed) * 100).toFixed(1) : '-'
      data['reportSummary'] = reportValue
    }
    else if (key === 'processTimeStamp') {
      const milisec = new Date(parseInt(data['processTimeStamp']) * 1000);
      const hours = milisec.getHours();
      const minutes = milisec.getMinutes();
      const seconds = milisec.getSeconds()

      const date_ = milisec.toDateString();
      // const milisec = parseInt(data[key]) * 1000;
      // const time = typeof (milisec) === 'number' ? milisec.toUTCString() : '-';
      data['processTimeStamp'] = `${date_}  ${hours}:${minutes}:${seconds}`
    } else {
      data[key] = data[key]
    }
  })
  return data
}