export interface Model {
    Make_ID: number
    Make_Name: string
    Model_ID: number
    Model_Name: string
}

export interface Make {
    MakeId: number
    MakeName: string
  }
export async function fetchModels(makeId: string, year: string): Promise<Model[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_VEHICLE_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    )
    const data = await res.json()
    const models = Array.from(
        new Map(
            data.Results.map((item: Model) => [`${item.Model_ID}-${item.Model_Name}`, item])
        ).values()
    );
    return models as Model[]
}

export async function fetchMakes(): Promise<Make[]> {
    const makes = await fetch(`${process.env.NEXT_PUBLIC_VEHICLE_API_URL}/GetMakesForVehicleType/car?format=json`)
    .then(response => response.json())
    .then(data => data.Results)
    return makes
}
