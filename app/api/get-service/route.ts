export async function GET(): Promise<Response> {
  const apiUrl = process.env.TECHNOTRON_API_URL
  const apiId = process.env.TECHNOTRON_API_ID
  const apiKey = process.env.TECHNOTRON_API_KEY

  if (!apiUrl || !apiId || !apiKey) {
    return Response.json({ error: 'Missing env vars', hasUrl: !!apiUrl, hasId: !!apiId, hasKey: !!apiKey })
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiId': apiId,
        'apiKey': apiKey,
      },
      body: JSON.stringify({ scope: 'fetchAll' }),
      cache: 'no-store',
    })

    const rawText = await response.text()
    const data = JSON.parse(rawText)

    // Return raw response so we can see what Technotron sends back
    return Response.json({
      httpStatus: response.status,
      rawData: data
    })

  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : String(error)
    })
  }
}
