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

  const apiUrl = process.env.TECHNOTRON_API_URL
  const apiId = process.env.TECHNOTRON_API_ID
  const apiKey = process.env.TECHNOTRON_API_KEY

  // Log what we have — this will show in Vercel logs
  console.log('API Config check:', {
    hasUrl: !!apiUrl,
    hasId: !!apiId,
    hasKey: !!apiKey,
    url: apiUrl,
  })

  if (!apiUrl || !apiId || !apiKey) {
    console.error('Missing env vars:', { apiUrl, apiId: !!apiId, apiKey: !!apiKey })
    return NextResponse.json<ApiErrorResponse>(
      { error: 'Missing API configuration' },
      { status: 500 }
    )
  }

  try {
    console.log('Calling Technotron API...')

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

    console.log('Technotron response status:', response.status)

    const rawText = await response.text()
    console.log('Technotron raw response:', rawText.substring(0, 500))

    const data = JSON.parse(rawText) as TechnotronApiResponse

    if (data.status) {
      console.log('Program names from Technotron:', 
        data.data.map((p) => ({ 
          id: p.programId, 
          name: p.programName,
          published: p.publishToWebsite 
        }))
      )
    }

    if (!data.status) {
      console.error('Technotron API error:', data.message)
      return NextResponse.json<ApiErrorResponse>(
        { error: data.message },
        { status: response.status }
      )
    }

    // Filter only programs that are published to website
    const publishedPrograms = data.data.filter(
      (program) => program.publishToWebsite === true
    )

    const SERVICE_ID_TO_PROGRAM_NAME: Record<string, string> = {
      'intraday-alpha-1m': 'Intraday Alpha',
      'intraday-alpha-3m': 'Intraday Alpha',
      'intraday-alpha-1y': 'Intraday Alpha',
      'btst-alpha-1m': 'BTST ALPHA',
      'btst-alpha-3m': 'BTST ALPHA',
      'btst-alpha-1y': 'BTST ALPHA',
      'positional-alpha-1m': 'Positional Alpha',
      'positional-alpha-3m': 'Positional Alpha',
      'positional-alpha-1y': 'Positional Alpha',
      'free-demo-service': 'Free Demo Service',
    }

    const SERVICE_ID_TO_DURATION: Record<string, string | null> = {
      'intraday-alpha-1m': null,
      'intraday-alpha-3m': null,
      'intraday-alpha-1y': null,
      'btst-alpha-1m': null,
      'btst-alpha-3m': null,
      'btst-alpha-1y': null,
      'positional-alpha-1m': null,
      'positional-alpha-3m': null,
      'positional-alpha-1y': null,
      'free-demo-service': null,
    }

    const targetProgramName = SERVICE_ID_TO_PROGRAM_NAME[serviceId]

    let matchedProgram: TechnotronProgram | undefined

    if (targetProgramName) {
      matchedProgram = data.data.find(
        (p) => p.programName.toLowerCase() === targetProgramName.toLowerCase()
          && p.publishToWebsite === true
      )
    }

    // If no match found return all published programs so frontend can handle it
    if (!matchedProgram) {
      return NextResponse.json({
        matched: false,
        programs: publishedPrograms,
      })
    }

    const targetDuration = SERVICE_ID_TO_DURATION[serviceId]

    // Filter only published pricing plans and sort by planIdOrder
    let publishedPlans = matchedProgram.pricing
      .filter((plan) => plan.publishToWebsite === true)
      .sort((a, b) => a.planIdOrder - b.planIdOrder)

    if (targetDuration) {
      const exactPlan = publishedPlans.find(plan => plan.displayDuration === targetDuration)
      if (exactPlan) {
        publishedPlans = [exactPlan]
      }
    }

    return NextResponse.json({
      matched: true,
      program: {
        ...matchedProgram,
        pricing: publishedPlans,
      },
    })

  } catch (error) {
    console.error('Full error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return NextResponse.json<ApiErrorResponse>(
      { error: 'Failed to fetch service data' },
      { status: 500 }
    )
  }
}
