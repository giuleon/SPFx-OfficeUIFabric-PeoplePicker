export interface IPeopleDataResult {
      RelevantResults: {
        TotalRows: number,
        Table: {
            Rows: [{
                Cells: [{
                    Key: string,
                    Value: string,
                    ValueType: string,
                }]
            }]
        }
      }
    // [
    //     {
    //     id: string,
    //     main: string,
    //     description: string,
    //     icon: string,
    //     temp: string
    //     }
    // ],
}