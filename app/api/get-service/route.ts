import { NextResponse, type NextRequest } from 'next/server'
import type { TechnotronApiResponse, TechnotronProgram } from '@/types/api'
import type { ApiErrorResponse } from '@/types'

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const serviceId = searchParams.get('serviceId')

  if (!serviceId) {
    return NextResponse.json<ApiErrorResponse>(
      { error: 'serviceId is required' },
      { status: 400 }
    )
  }

  try {
    const apiUrl = process.env.TECHNOTRON_API_URL
    const apiId = process.env.TECHNOTRON_API_ID
    const apiKey = process.env.TECHNOTRON_API_KEY

    if (!apiUrl || !apiId || !apiKey) {
      throw new Error('Missing API configuration')
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiId': apiId,
        'apiKey': apiKey,
      },
      body: JSON.stringify({
        scope: 'fetchAll',
        showPrice: 'min',
      }),
      cache: 'no-store',
    })

    const data: TechnotronApiResponse = (await response.json()) as TechnotronApiResponse

    if (!data.status) {
      return NextResponse.json<ApiErrorResponse>(
        { error: data.message },
        { status: response.status }
      )
    }

    // Filter only programs that are published to website
    const publishedPrograms = data.data.filter(
      (program) => program.publishToWebsite === true
    )

    // Try to find a matching program by name
    // serviceId format is like 'intraday-alpha-1m' — extract the family name
    const familyMap: Record<string, string> = {
      'intraday-alpha': 'Intraday Alpha',
      'btst-alpha': 'BTST Alpha',
      'positional-alpha': 'Positional Alpha',
    }

    const familyKey = Object.keys(familyMap).find((key) =>
      serviceId.startsWith(key)
    )
    const familyName = familyKey ? familyMap[familyKey] : null

    let matchedProgram: TechnotronProgram | undefined

    if (familyName) {
      matchedProgram = publishedPrograms.find((p) =>
        p.programName.toLowerCase().includes(familyName.toLowerCase())
      )
    }

    // If no match found return all published programs so frontend can handle it
    if (!matchedProgram) {
      return NextResponse.json({
        matched: false,
        programs: publishedPrograms,
      })
    }

    // Filter only published pricing plans and sort by planIdOrder
    const publishedPlans = matchedProgram.pricing
      .filter((plan) => plan.publishToWebsite === true)
      .sort((a, b) => a.planIdOrder - b.planIdOrder)

    return NextResponse.json({
      matched: true,
      program: {
        ...matchedProgram,
        pricing: publishedPlans,
      },
    })

  } catch (error) {
    console.error('Technotron API error:', error instanceof Error ? error.message : error)
    return NextResponse.json<ApiErrorResponse>(
      { error: 'Failed to fetch service data' },
      { status: 500 }
    )
  }
}
