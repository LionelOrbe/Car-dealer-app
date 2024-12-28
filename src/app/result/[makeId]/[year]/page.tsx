import { Suspense } from 'react'
import Link from 'next/link'
import staticParamsData from '../../../../data/staticParams.json'
import { fetchModels } from '@/app/services/fetching'


export async function generateStaticParams() {
    const { popularMakes, years } = staticParamsData

    return popularMakes.flatMap((makeId: string) =>
        years.map((year: string) => ({
            makeId,
            year,
        }))
    )
}

export default async function ResultPage({ params }: { params: { makeId: string; year: string } }) {

    const models = await fetchModels(params.makeId, params.year)

    return (
        <div className="min-h-screen p-24">
            <h1 className="text-4xl font-bold mb-8">Vehicle Models</h1>
            <Suspense fallback={<div>Loading...</div>}>
                {models.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {models.map((model) => (
                            <div key={model.Model_ID + model.Model_Name} className="border p-4 rounded shadow">
                                <h2 className="text-xl font-semibold">{model.Model_Name}</h2>
                                <p>{model.Make_Name}</p>
                            </div>
                        ))}
                    </div> : <div>
                        <h2 className="text-xl font-semibold">No vehicles found for this year and maker</h2>
                    </div>
                }
            </Suspense>
            <Link href="/" className="mt-8 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Back to Filter
            </Link>
        </div>
    )
}

