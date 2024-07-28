import xlsx, { IJsonSheet } from 'json-as-xlsx'

export function downloadToExcel(data: any){

let columns: IJsonSheet[] = [
  {
    sheet: 'Staffs',
    columns: [
      {label: "Title", value: 'Title'},
      {label: "Last Value", value: 'LatestValue'},
      {label: "Previous Value", value: 'PreviousValue'},
      {label: "Unit", value: 'Unit'},
      {label: "Category Group", value: 'CategoryGroup'},

    ],
    content: data

  }
]
let settings = {
  fileName: `Indicator SnapShot of ${data[1].Country} Excel`
}
xlsx(columns, settings)
}